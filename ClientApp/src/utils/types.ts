/** A promise-like struct for fetching flow */
export interface Fetchable<T> {
    fetching: boolean;
    value?: T;
}

/**
 * Created an initial `Fetchable`.
 * @param fetching The initial value of 'fetching'
 */
export function fetchableInit<T>(fetching: boolean): Fetchable<T> {
    return { fetching };
}

/**
 * Resolve the fetch
 * @param value Value to resolve to
 */
export function fetchableResolve<T>(value: T): Fetchable<T> {
    return { fetching: false, value };
}