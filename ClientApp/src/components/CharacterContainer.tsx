import { Component } from "react";
import { Character } from "../objects/Store";
import React from "react";
import { CharacterInfo } from "./CharacterInfo";
import { Api } from "../utils/api";
import { fetchableResolve, Fetchable, fetchableInit } from "../utils/types";

interface CharacterContainerState {
    character: Fetchable<Character>;
    funding: [number, number][];
    gettingFunding: boolean;
}

export class CharacterContainer extends Component<{}, CharacterContainerState> {

    private api: Api = new Api();

    constructor(props: {}) {
        super(props);

        this.state = {
            character: fetchableInit(true),
            funding: [],
            gettingFunding: false,
        };
    }

    componentDidMount() {
        this.fetchCharachter();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-9">
                    <h1 className="border-bottom border-primary pb-2">Character</h1>
                    { this.renderCharacter() }
                </div>
                <div className="col-md-3">
                    <h1 className="border-bottom border-primary pb-2">Funding</h1>
                    { this.renderFunding() }
                </div>
            </div>
        )
    }

    private renderCharacter() {
        const character = this.state.character;
        if (character.fetching) {
            return (
                <div>
                    Fetching character...
                </div>
            )
        }

        if (!character.value) {
            throw new Error(`Fetched, but character not set!`);
        }

        return (
            <div>
                <CharacterInfo character={character.value} />
            </div>
        )
    }

    private renderFunding() {
        const funding = this.state.funding;

        if (this.state.gettingFunding) {
            return (
                <div>
                    Getting funding...
                </div>
            )
        }

        const last = funding.length > 0 && funding[funding.length - 1];
        return (

            <div>
                <p>Use the button to get additional funding.</p>
                <button className="btn btn-warning mb-3" onClick={() => this.getFunding()}>Get funding</button>
                {last && <p>{last[1]} Au ({last[0]} Au added).</p>}
            </div>
        )
    }

    private async fetchCharachter(): Promise<Character> {
        this.setState({ character: { fetching: true }})

        const character = await this.api.getCharacter();

        this.setState({
            character: fetchableResolve(character),
        });

        if (this.state.funding.length === 0) {
            this.logFunding(character.gold, character.gold);
        }

        return character;
    }

    private async getFunding() {
        this.setState({ gettingFunding: true });

        const character = this.state.character.value
        if (!character) {
            throw new Error(`No character available. Cannot get funding!`);
        }

        const id = character.id;
        const gold = await this.api.getFunding(id);

        const updatedCharacter = await this.fetchCharachter();

        const totalGold = updatedCharacter.gold;
        this.logFunding(gold, totalGold);

        this.setState({ gettingFunding: false });
    }

    private logFunding(newGold: number, totalGold: number) {
        const log = this.state.funding;
        const newLog: [number, number][] = [...log, [newGold, totalGold]];

        this.setState({ funding: newLog });
    }
}
