import React, { Component } from 'react';
import { Character, Attribute } from '../objects/Store';

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
    return (
      <div>
        <h1>{this.props.character.name}</h1>

        <p>Id: {this.props.character.id}</p>

        <p>Gold: {this.props.character.gold}</p>

        <h2>Attributes</h2>

        {this.props.character.attributes.map(({ attribute, modifier}) => {
          return <div key={ attribute.id }>
            <h3>{ attribute.name }</h3>
            <p>Id: { attribute.id }</p>
            <p>Value: { modifier }</p>
            <p>Effective value: { modifier + (bonuses[attribute.id] || 0) }</p>
          </div>;
        })}

        <h2>Equipment</h2>

        {this.props.character.equipment.map(eq => {
          const { name, price, id } = eq;
          return <div key={ id }>
            <h3>{name}</h3>
            <p>Id: {id}</p>
            <p>Price: {price}</p>

            <h4>Bonuses</h4>
            {eq.bonuses.map(bonus => {
              return <div key={bonus.attribute.id}>
                <h5>{bonus.attribute.name}</h5>
                <p>Modifier: {bonus.modifier}</p>
              </div>
            })}
          </div>
        })}
      </div>
    );
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
