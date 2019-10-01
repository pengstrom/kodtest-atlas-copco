import { Character, Equipment, Attribute } from "../objects/Store";
import { isString } from "util";

/**
 * Backend API
 */
export class Api {
    public baseUrl?: string;
    
    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl;
    } 


    /**
     * Get your character
     */
    public async getCharacter() {
        return this.get<Character>('character/me');
    }

    /**
     * Add gold to target character.
     * @param id ID of character to target.
     */
    public async getFunding(id: number) {
        return this.post<number>(`character/refinance/${id}`);
    }

    /**
     * Get equipment in store inventory.
     */
    public getInventory() {
        return this.get<Equipment[]>(`store/inventory`);
    }

    /**
     * Get possible store attributes.
     */
    public getAttributes() {
        return this.get<Attribute[]>(`store/attributes`);
    }

    /**
     * Buy the item. Removes the item from the inventory and gives it to the player.
     * @param characterId ID of buying character.
     * @param attributeId ID of equipment bought.
     */
    public purchase(characterId: number, attributeId: number) {
        return this.post<Equipment>(`store/buy/${characterId}/${attributeId}`);
    }

    /**
     * Add some new items to the store inventory.
     */
    public restock() {
        return this.post<Equipment[]>(`store/restock`);
    }


    /**
     * Make a GET request for the given `url`. 400- or 500-series gives exceptions.
     * @param url Path on backend API.
     */
    public async get<T>(url: string): Promise<T> {
        const response = await fetch('api/' + url);

        if (response.status >= 400) {
            let message = await response.json() as string;

            throw new FetchException(response, message);
        }

        return response.json();
    }

    /**
     * Make a POST request for the given `url` and `body`. 400- or 500-series gives exceptions.
     * @param url Path on backend API.
     * @param body JSON-serialisable data.
     */
    public async post<T = undefined>(url: string, body?: any): Promise<T> {
        const response = await fetch('api/' + url, {
            method: 'post',
            mode: 'same-origin',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: body ? JSON.stringify(body) : '',
        });

        if (response.status >= 400) {
            const message = await response.json() as string;
            throw new FetchException(response, message);
        }

        return response.json();
    }
}

export class FetchException extends Error {
    private response: Response;
    
    public status: number;

    constructor(response: Response, message: string) {
        super(message);
        
        this.response = response;
        this.status = response.status;
    }
}