import { isJSXSpreadAttribute } from "@babel/types"

export interface Character {
    id: number;
    name: string;
    gold: number;
    equipment: Equipment[];
    attributes: ValuedAttribute[];
}

export interface Equipment {
    id: number;
    name: string;
    bonuses: ValuedAttribute[];
    price: number;
    type: 'trinket' | 'weapon' | 'armor';
}

/** Attribute with magnitude */
export interface ValuedAttribute {
    attribute: Attribute;
    modifier: number;
}

export interface Attribute {
    id: number;
    name: string;
}