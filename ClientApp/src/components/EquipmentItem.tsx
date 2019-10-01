import { Component } from "react";
import { Equipment } from '../objects/Store';
import React from "react";
import _ from "lodash";

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
                <div className="col-sm-9">
                    <div>
                        <strong>{ name}</strong> ({ _.capitalize(type)}): { price } Au
                    </div>
                    { bonuses.length > 0 && <div>
                        {bonuses.map(bonus => {
                        return <span className="mr-3" key={bonus.attribute.id}>
                            { bonus.attribute.name }: <span className="text-success">+{bonus.modifier}</span>
                        </span>
                        })}
                    </div> }
                </div>
                <div className="col-sm-3">
                    { this.props.showButton && this.renderButton(this.props.equipment) }
                </div>
            </div>
        )
    }

    private renderButton(eq: Equipment) {
        return (
                <button
                    className="btn btn-danger mt-2 mt-sm-0 float-right"
                    onClick={() => this.props.onBuy!(eq)}
                    disabled={!this.props.afford} >
                    {this.props.afford ? `Buy for ${eq.price} Au` : 'Insufficient funds'}
                </button>
        );
    }
}