export { default as equals } from 'fast-deep-equal';

type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

export const entries = <T extends object>(obj: T) => Object.entries(obj) as Entries<T>;

export const values = <T extends object>(obj: T) => Object.values(obj) as T[keyof T][];
