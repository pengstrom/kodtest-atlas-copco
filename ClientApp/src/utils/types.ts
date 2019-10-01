export interface Fetchable<T> {
    fetching: boolean;
    value?: T;
}

export function fetchableInit<T>(fetching: boolean): Fetchable<T> {
    return { fetching };
}

export function fetchableResolve<T>(value: T): Fetchable<T> {
    return { fetching: false, value };
}