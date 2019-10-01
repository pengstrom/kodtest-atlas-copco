import React, { Component } from 'react';
import { Character, Equipment, ValuedAttribute } from '../objects/Store';
import _ from 'lodash';
import { EquipmentItem } from './EquipmentItem';

export interface CharacterProps {
  character: Character;
}

export class CharacterInfo extends Component<CharacterProps> {
  static displayName = CharacterInfo.name;

  constructor(props: CharacterProps) {
    super(props);
  }

  render() {
    const bonuses = this.bonuses();
    const character = this.props.character;
    return (
      <div className="mt-3 row">
        <div className="col-md-5 col-lg-4 mb-3">
          <h2>{character.name}</h2>

          <p>Wealth: <strong>{character.gold}</strong> Au</p>

          <h5 className="mt-3">Attributes</h5>

          { this.renderAttributes(character.attributes, bonuses) }
        </div>

        <div className="col-md-7 col-lg-8 mb-3">
          <h2>Equipment</h2>
          { this.renderEquipment(character.equipment) }
        </div>
      </div>
    );
  }

  private renderAttributes(attributes: ValuedAttribute[], bonuses: { [id: number]: number}) {
    return (
      <div>
        <div className="border-bottom"></div>
        {attributes.map(({ attribute, modifier}) => {
          const bonus = bonuses[attribute.id] || 0;
          return (<div className="border-bottom py-3" key={attribute.id}>
            <div>
              {attribute.name}: {modifier} + <span className="text-success">{bonus}</span> = <span className="text-primary">{modifier + bonus}</span>
            </div>
          </div>);
        }) }
      </div>
    );
  }

  private renderEquipment(equipment: Equipment[]) {
    if (equipment.length === 0) {
      return (
        <div>Character has no equipment.</div>
      )
    }

    return (
      <div>
        <div className="border-bottom mt-3"></div>
        { equipment.map(eq => {
          const { name, price, id, type } = eq;
          return <EquipmentItem key={eq.id} equipment={eq} afford={true} showButton={false} />
        }) }
      </div>
    )
  }

  private bonuses() {
    const equipment = this.props.character.equipment;
    const bonuses: { [id: number]: number } = {};

    for (const eq of equipment) {
      for (const b of eq.bonuses) {
        const id = b.attribute.id;
        bonuses[id] = (bonuses[id] || 0) + b.modifier;
      }
    }

    return bonuses;
  }
}
