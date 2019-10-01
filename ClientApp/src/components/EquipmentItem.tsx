import { Component } from "react";
import { Equipment, ValuedAttribute } from '../objects/Store';
import React from "react";
import _ from "lodash";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";

interface EquipmentItemProps {
    /** The equipment object to render */
    equipment: Equipment;
    /** Should the item be rendered as afforded */
    afford: boolean;
    /** Show the buy-button */
    showButton?: boolean;
    /**
     * Callback for when the buy-button is clicked.
     * 
     * @param equipment The clicked equipment.
     */
    onBuy?: (equipment: Equipment) => void;
}

/**
 * Render one equipment
 */
export class EquipmentItem extends Component<EquipmentItemProps> {
    constructor(props: EquipmentItemProps) {
        super(props);
    }

    render() {
        const { id, type, price, bonuses, name } = this.props.equipment;
        return (
            <div className="border-bottom py-3 row" key={ id }>
                <div className="col-md-10">
                    <div>
                        <strong>{ name}</strong> ({ _.capitalize(type)}): { price } Au
                    </div>

                    { this.renderBonuses(bonuses) }

                    { !this.props.afford && <span className="text-danger">Insufficient funds</span>}
                </div>

                <div className="col-md-2">
                    { this.props.showButton && this.renderButton(this.props.equipment) }
                </div>
            </div>
        )
    }

    private renderBonuses(bonuses: ValuedAttribute[]) {
        if (bonuses.length === 0) {
            return <div></div>
        }
        
        return (
            <div>
                { bonuses.map(bonus => {
                return <span className="mr-3" key={bonus.attribute.id}>
                    { bonus.attribute.name }: <span className="text-success">+{bonus.modifier}</span>
                </span>
                })}
            </div>
        );
    }

    private renderButton(eq: Equipment) {
        return (
                <button
                    className="btn btn-success mt-2 mt-md-0"
                    onClick={() => this.props.onBuy!(eq)}
                    disabled={!this.props.afford} >
                    Buy
                </button>
        );
    }
}