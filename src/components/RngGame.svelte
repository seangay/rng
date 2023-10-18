<script lang="ts">
	import { createRng } from '$lib/rng';
	import { positive } from '$lib/numbers';
	import { onMount } from 'svelte';

	let max = 10;
	let rangeGenerator: ReturnType<typeof createRng>;

	const newGame = () => {
		rangeGenerator = createRng(positive(max));
	};

	$: rangeGenerator = createRng(positive(max));

	onMount(newGame);
</script>

<h1>RNG Game</h1>

<input type="number" bind:value={max} />

<button on:click={newGame}>Generate New Set</button>

{#if rangeGenerator}
	<ul>
		{#each Array(max) as _}
			<li>
				{rangeGenerator.getNextRandomNumber()}
			</li>
		{/each}
	</ul>
{/if}
