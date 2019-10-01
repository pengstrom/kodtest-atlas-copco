import { Component } from "react";
import { Equipment } from '../objects/Store';
import React from "react";

interface EquipmentItemProps {
    /** The equipment object to render */
    equipment: Equipment;
    /** Should the item be rendered as afforded */
    afford: boolean;
    /** Show the buy-button */
    showButton: boolean;
    /**
     * Callback for when the buy-button is clicked.
     * 
     * @param equipment The clicked equipment.
     */
    onBuy(equipment: Equipment): void;
}

/**
 * Render one equipment
 */
export class EquipmentItem extends Component<EquipmentItemProps> {
    constructor(props: EquipmentItemProps) {
        super(props);
    }

    render() {
        const eq = this.props.equipment;
        return (
            <div>
                <p>
                    <strong>{ eq.name }</strong> - {eq.price} Gold
                </p>
                <ul>
                    {eq.bonuses.map(b => {
                        const att  = b.attribute;
                        const value = b.modifier;
                        return (
                            <li key={att.id}>
                                {att.name}: +{value}
                            </li>
                        );
                    }) }
                </ul>

                { this.props.showButton && this.renderButton(eq) }
            </div>
        )
    }

    private renderButton(eq: Equipment) {
        return (
            <button
                onClick={() => this.props.onBuy(eq)}
                disabled={!this.props.afford} >
                {this.props.afford ? 'Buy' : 'Insufficient funds'}
            </button>
        );
    }
}