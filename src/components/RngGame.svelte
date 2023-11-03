<script lang="ts">
	import { createRng } from '$lib/rng';
	import { positive } from '$lib/numbers';

	let max = 10;
	let rangeGenerator: ReturnType<typeof createRng>;

	const newGame = () => {
		rangeGenerator = createRng(positive(max));
	};

	$: max, newGame();
</script>

<div class="flex flex-col items-center justify-center gap-4 min-h-full">
	<h1 class="h1">RNG Game</h1>

	<label>Max <input class="input" type="number" bind:value={max} /></label>

	<button class="btn variant-filled" on:click={newGame}>Generate New Set</button>

	{#if rangeGenerator}
		<ul class="flex gap-2">
			{#each Array(max) as _}
				<li>
					{rangeGenerator.getNextRandomNumber()}
				</li>
			{/each}
		</ul>
	{/if}
</div>
