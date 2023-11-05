import { describe, it, expect } from 'vitest';
import { createGame } from './game';
import { get } from 'svelte/store';

import { positive } from '$lib/numbers';

describe('createGame', () => {
	it('starts with the correct default state', () => {
		const game = createGame();
		const gameState = get(game);

		expect(gameState.number).toBe(gameState.numbers[0]);
		expect(gameState.slots).toEqual(new Array<number>(10).fill(0));
		expect(gameState.guesses).toEqual([]);
		expect(gameState.gameOver).toBe(false);
		expect(gameState.gameWon).toBe(false);
		expect(gameState.gameFailed).toBe(false);
		expect(gameState.score).toBe(0);
		expect(gameState.difficulty).toBe(10);
		expect(gameState.numbers.length).toBe(10);
		expect(gameState.highScores).toEqual({});
	});

	it('updates the state correctly when a guess is made', () => {
		const game = createGame();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { number: initialNumber, ...initialGameState } = get(game);

		const [big, small] = [
			Math.max(initialGameState.numbers[0], initialGameState.numbers[1]),
			Math.min(initialGameState.numbers[0], initialGameState.numbers[1]),
		];

		game.guessSlot(0, small);
		game.guessSlot(1, big);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { number, ...gameState } = get(game);

		expect(gameState).toEqual({
			...initialGameState,
			score: 2,
			guesses: [small, big],
			slots: [small, big, ...new Array(8).fill(0)],
		});
	});

	it('updates the state correctly when a guess is incorrect', () => {
		const game = createGame();

		game.guessSlot(0, 2);
		game.guessSlot(1, 1);

		const gameState = get(game);
		expect(gameState.gameOver).toBe(true);
		expect(gameState.gameWon).toBe(false);
		expect(gameState.gameFailed).toBe(true);
		expect(gameState.score).toBe(1);
	});

	it('resets the state correctly when restart is called', () => {
		const game = createGame();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { numbers: initialNumbers, number: initialNumber, ...initialGameState } = get(game);

		game.restart();

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { numbers, number, ...gameState } = get(game);

		expect(gameState).toEqual(initialGameState);
	});

	it('resets the high scores correctly when resetHighScores is called', () => {
		const game = createGame();

		game.resetHighScores();

		const gameState = get(game);

		game.guessSlot(0, 1);

		expect(gameState.highScores).toEqual({ 10: 1 });
		game.resetHighScores();

		const updatedGameState = get(game);

		expect(updatedGameState.highScores).toEqual({});
	});

	it('updates the state correctly when the difficulty is changed', () => {
		const game = createGame();

		game.difficulty(positive(2));

		const gameState = get(game);
		expect(gameState.numbers.length).toBe(2);
	});
});
