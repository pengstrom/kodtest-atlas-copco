import { Character, Equipment, Attribute } from "../objects/Store";
import { isString } from "util";

export class Api {
    public baseUrl?: string;
    
    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl;
    } 


    public async getCharacter() {
        return this.get<Character>('character/me');
    }

    public async getFunding(id: number) {
        return this.post<number>(`character/refinance/${id}`);
    }

    public getInventory() {
        return this.get<Equipment[]>(`store/inventory`);
    }

    public getAttributes() {
        return this.get<Attribute[]>(`store/attributes`);
    }

    public purchase(characterId: number, attributeId: number) {
        return this.post<Equipment>(`store/buy/${characterId}/${attributeId}`);
    }

    public restock() {
        return this.post<Equipment[]>(`store/restock`);
    }


    public async get<T>(url: string): Promise<T> {
        const response = await fetch('api/' + url);

        if (response.status >= 400) {
            let message = await response.json() as string;

            throw new FetchException(response, message);
        }

        return response.json();
    }

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