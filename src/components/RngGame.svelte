<script lang="ts">
	import { createRng } from '$lib/rng';
	import { assertsPositiveNumber } from '$lib/branded';

	let max = 10;
	let rangeGenerator: ReturnType<typeof createRng>;

	const newGame = () => {
		assertsPositiveNumber(max)
		rangeGenerator = createRng(max)
	}

	$: {
		assertsPositiveNumber(max)
		rangeGenerator = createRng(max)
	}

</script>

<h1>RNG Game</h1>

<input type="number" bind:value={max} />

<button on:click={newGame}>Generate New Set</button>

{#if rangeGenerator}
	<ul>
	{#each {length:max} as _}
		<li>
			{rangeGenerator.getNextRandomNumber()}
		</li>
	{/each}
	</ul>
{/if}

<style>
	div {
		background-color: teal;
		padding: 1em;
	}
</style>
