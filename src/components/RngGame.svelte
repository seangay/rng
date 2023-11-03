<script lang="ts">
	import { randomNumbers } from '$lib/rng';
	import { positive } from '$lib/numbers';
	import { fly } from 'svelte/transition';

	let max = 10;

	let numbers = randomNumbers(positive(max));

	let error = '';

	const newGame = () => {
		error = '';
		try {
			numbers = randomNumbers(positive(max));
		} catch (e) {
			if (e instanceof Error) {
				error = e.message;
			}
		}
	};

	$: max, newGame();
</script>

<div class="flex flex-col items-center justify-center gap-4 min-h-full">
	<h1 class="h1">RNG Game</h1>

	<label>Max <input class="input" type="number" bind:value={max} /></label>

	<button class="btn variant-filled" on:click={newGame}> Generate New Set </button>

	{#if numbers}
		<ul class="flex gap-2">
			{#each numbers as n}
				<li>{n}</li>
			{/each}
		</ul>
	{/if}

	{#if error}<div transition:fly class="bg-error-400-500-token p-4 rounded">{error}</div>{/if}
</div>
