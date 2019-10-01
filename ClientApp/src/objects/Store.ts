export interface Character {
    id: number;
    name: string;
    gold: number;
    equipment: Equipment[];
    attributes: { attribute: Attribute, modifier: number }[];
}

export interface Equipment {
    id: number;
    name: string;
    bonuses: Bonus[];
    price: number;
}

export interface Bonus {
    attribute: Attribute;
    modifier: number;
}

export interface Attribute {
    id: number;
    name: string;
}