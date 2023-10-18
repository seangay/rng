// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	declare const __brand: unique symbol;
	type Brand<B> = { [__brand]: B };
	type Branded<T, B> = T & Brand<B>;
}

export {};
