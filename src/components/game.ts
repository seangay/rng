import { positive, type PositiveNumber } from '$lib/numbers';
import { randomNumbers } from '$lib/rng';
import { localStorageStore } from '@skeletonlabs/skeleton';

import { derived, writable } from 'svelte/store';

const isSorted = (arr: number[]) => {
	const filtered = arr.filter(Boolean);
	for (let i = 0; i < filtered.length - 1; i++) {
		if (filtered[i] > filtered[i + 1]) return false;
	}
	return true;
};

type GameState = {
	numbers: number[];
	number: number;
	guesses: number[];
	slots: number[];
	gameFailed: boolean;
	gameWon: boolean;
	gameOver: boolean;
	score: number;
	difficulty: PositiveNumber;
};

const defaultState = (difficulty: PositiveNumber): GameState => {
	const numbers = randomNumbers(difficulty);

	return {
		numbers,
		number: numbers[0],
		guesses: [],
		slots: new Array<number>(10).fill(0),
		gameFailed: false,
		gameWon: false,
		gameOver: false,
		score: 0,
		difficulty,
	};
};

export const difficulties = [10, 20, 30].map(positive);

export const createGame = () => {
	const highScores = localStorageStore<Record<PositiveNumber, number>>('highScores', {});
	const gameState = writable<GameState>(defaultState(difficulties[0]));
	const readonlyGameState = derived([gameState, highScores], ([$gameState, $highScores]) => {
		return {
			...$gameState,
			highScores: $highScores,
		};
	});

	return {
		...readonlyGameState,
		guessSlot: (slot: number, guess: number) => {
			gameState.update((state) => {
				if (state.slots[slot]) return state;

				state.guesses.push(guess);
				state.slots[slot] = guess;

				if (isSorted(state.slots)) {
					state.score = state.guesses.length;

					if (state.guesses.length === state.numbers.length) {
						state.gameWon = true;
						state.gameOver = true;
					}
				} else {
					state.gameFailed = true;
					state.gameOver = true;
					state.score = state.guesses.length - 1;
				}

				highScores.update((highScores) => {
					if (!highScores[state.difficulty] || state.score > highScores[state.difficulty]) {
						highScores[state.difficulty] = state.score;
					}
					return highScores;
				});

				state.number = state.numbers[state.guesses.length];

				return state;
			});
		},
		difficulty: (level: PositiveNumber) => gameState.set(defaultState(level)),
		restart: () => gameState.update((state) => defaultState(state.difficulty)),
		resetHighScores: () => highScores.set({}),
	};
};

export type RngGame = ReturnType<typeof createGame>;
