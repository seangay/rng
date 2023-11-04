<script lang="ts">
	import { randomNumbers } from '$lib/rng';
	import type { PositiveNumber } from '$lib/numbers';
	import { onMount } from 'svelte';
	import DifficultySelect from './DifficultySelect.svelte';
	import MyNumber from './MyNumber.svelte';
	import GuessSlots from './GuessSlots.svelte';
	import ScoreBoard from './ScoreBoard.svelte';

	let numbers: number[];
	let number: number;
	let slots = new Array<number>(10).fill(0);
	let guesses: number[];
	let difficulty: PositiveNumber;

	const newGame = (difficulty: PositiveNumber) => {
		numbers = randomNumbers(difficulty);
		slots = slots.fill(0);
		guesses = [];
	};

	onMount(() => newGame(difficulty));

	const restart = () => newGame(difficulty);

	const isSorted = (arr: number[]) => {
		const filtered = arr.filter(Boolean);
		for (let i = 0; i < filtered.length - 1; i++) {
			if (filtered[i] > filtered[i + 1]) return false;
		}
		return true;
	};

	$: newGame(difficulty);
	$: number = numbers[guesses.length];
	$: gameFailed = !isSorted(slots);
	$: gameWon = !!(isSorted(slots) && !number);
	$: gameActive = !gameFailed && !gameWon;
	$: score = guesses?.length ?? 0;
	$: if (gameFailed) score = score - 1;
</script>

<div
	role="application"
	class="flex flex-col items-center justify-center gap-4 min-h-full p-4 select-none"
	on:dragover|preventDefault
>
	<h1 class="h1 place-self-start">RNG Game</h1>

	<DifficultySelect bind:difficulty />

	{#if gameActive}
		<MyNumber {number} />
	{:else}
		<button
			class="btn variant-filled bg-primary-50-900-token text-primary-600-300-token"
			on:click={restart}
		>
			Restart
		</button>
	{/if}

	<GuessSlots
		{gameActive}
		{gameWon}
		{gameFailed}
		bind:slots
		on:dragdrop={(e) => {
			const { guess } = e.detail;
			guesses.push(guess);
			guesses = guesses;
		}}
	/>

	<ScoreBoard {gameFailed} {gameWon} {score} difficulty={numbers?.length} />
</div>
