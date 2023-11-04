import { positive, type PositiveNumber } from '$lib/numbers';
import { randomNumbers } from '$lib/rng';

import { derived, get, readonly, writable } from 'svelte/store';

const isSorted = (arr: number[]) => {
	const filtered = arr.filter(Boolean);
	for (let i = 0; i < filtered.length - 1; i++) {
		if (filtered[i] > filtered[i + 1]) return false;
	}
	return true;
};

export const difficulties = [10, 20, 30].map(positive);

export const createGame = () => {
	const numbers = writable<number[]>([]);
	const guesses = writable<number[]>([]);
	const slots = writable<number[]>(new Array(10).fill(0));

	const difficulty = writable<PositiveNumber>(difficulties[0]);

	const restart = () => {
		numbers.set(randomNumbers(get(difficulty)));
		slots.update((slots) => slots.fill(0));
		guesses.set([]);
	};

	restart();

	const number = derived([numbers, guesses], ([$numbers, $guesses]) => $numbers[$guesses.length]);
	const gameFailed = derived(slots, ($slots) => !isSorted($slots));
	const gameWon = derived([slots, number], ([$slots, $number]) => !isSorted($slots) && !$number);
	const gameActive = derived(
		[gameFailed, gameWon],
		([$gameFailed, $gameWon]) => !$gameFailed && !$gameWon
	);
	const score = derived([guesses, gameFailed], ([$guesses, $gameFailed]) => {
		let score = $guesses?.length ?? 0;
		if ($gameFailed) score -= 1;
		return score;
	});

	return {
		restart,
		number: readonly(number),
		guesses,
		slots,
		gameFailed,
		gameWon,
		gameActive,
		score,
		difficulty,
		difficulties,
	};
};

export type RngGame = ReturnType<typeof createGame>;
