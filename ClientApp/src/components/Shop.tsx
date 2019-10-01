import { Component } from "react";
import { Equipment, Character } from "../objects/Store";
import { Fetchable, fetchableInit, fetchableResolve } from "../utils/types";
import { Api, FetchException as RequestException } from "../utils/api";
import React from "react";
import { EquipmentItem } from "./EquipmentItem";
import _ from "lodash";

export interface StoreState {
    inventory: Fetchable<Equipment[]>;
    character: Fetchable<Character>;
    buying: {
        processing: boolean;
        lastBought?: Equipment;
        error?: string;
    }
}

export class Shop extends Component<{}, StoreState> {
    private api = new Api();

    constructor(props: {}) {
        super(props);

        this.state = {
            inventory: fetchableInit(true),
            character: fetchableInit(true),
            buying: { processing: false },
        };
    }

    public componentDidMount() {
        this.refresh();
    }

    public render() {
        const character = this.state.character.value;
        return (
            <div>
                <h1>Shop</h1>
                <p>The best deals here!</p>

                { character && <p>You have {character.gold} gold. See character page for refinancing.</p> }

                <button onClick={() => this.restock() }>Restock</button>

                { this.renderBuying() }

                <h2>Inventory</h2>
                { this.renderInventory() }
            </div>
        )
    }

    private renderBuying() {
        const buying = this.state.buying;
        if (buying.processing) {
            return (
                <div>Buying...</div>
            );
        }

        if (buying.error) {
            return (
                <div>Error: {buying.error}</div>
            )
        }

        if (!buying.lastBought) {
            return (
                <div>Nothing bought yet!</div>
            )
        }

        const eq = buying.lastBought;
        return (
            <div>Last bought: {eq.name} for {eq.price}.</div>
        )
    }

    private renderInventory() {
        if (this.state.inventory.fetching && !this.state.inventory.value) {
            return (
                <div>Fetching inventory...</div>
            );
        }

        // Used for calculating what's affordable
        const character = this.state.character.value;

        return (
            <div>
                {this.orderedInventory().map(eq => {
                    let afford = true;
                    let showButton = false;

                    if (character) {
                        showButton = true;

                        if (character.gold < eq.price) {
                            afford = false;
                        }
                    }

                    return <EquipmentItem showButton={showButton} onBuy={(eq) => this.handleBuy(eq)} afford={afford} equipment={eq} key={eq.id} />
                })}
            </div>
        )
    }

    private async handleBuy(equipment: Equipment): Promise<void> {
        this.setState({ buying: { processing: true }})

        const character = this.state.character.value!;
        try {
            await this.api.purchase(character.id, equipment.id);
            this.setState({
                buying: {
                    processing: false,
                    lastBought: equipment,
                    error: undefined,
                }
            }, this.refresh);
        } catch (e) {
            if (e instanceof RequestException && e.status === 400) {
                this.setState({
                    buying: {
                        processing: false,
                        lastBought: equipment,
                        error: e.message
                    },
                });
            } else {
                throw e;
            }
        }
    }

    private async restock() {
        await this.api.restock();
        this.fetchInventory();
    }

    private orderedInventory() {
        if (!this.state.inventory.value) {
            return [];
        }
        return _.orderBy(this.state.inventory.value, 'name');
    }

    private async fetchInventory() {
        const inventory = await this.api.getInventory();
        this.setState({ inventory: fetchableResolve(inventory) })
    }

    private async fetchCharcter() {
        const character = await this.api.getCharacter();
        this.setState({ character: fetchableResolve(character) });
    }

    private refresh() {
        this.fetchInventory();
        this.fetchCharcter();
    }
}