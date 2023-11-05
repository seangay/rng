<script lang="ts">
	import * as object from '$lib/objects';
	import { createGame, difficulties } from './game';

	const game = createGame();
	const [easy, medium, hard] = difficulties;

	const handleDragStart = (e: DragEvent, guess: number) => {
		if (!guess) return;
		e.dataTransfer?.setData('guess', guess.toString());
	};

	const handleDragDrop = (e: DragEvent, index: number) => {
		const guess = e.dataTransfer?.getData('guess');
		if (!guess) return;
		game.guessSlot(index, +guess);
	};
</script>

<div
	role="application"
	class="flex flex-col items-center gap-4 min-h-full p-4 select-none"
	on:dragover|preventDefault
>
	<h1 class="h1 place-self-start">RNG Game</h1>

	<h2 class="h2">Select Difficulty</h2>
	<div class="flex items-end gap-4 font-bold">
		<button
			type="button"
			class="btn variant-filled bg-primary-50-900-token text-primary-600-300-token"
			on:click={() => game.difficulty(easy)}
		>
			Easy {easy}
		</button>
		<button
			type="button"
			class="btn variant-filled bg-warning-50-900-token text-warning-600-300-token"
			on:click={() => game.difficulty(medium)}
		>
			Medium {medium}
		</button>
		<button
			type="button"
			class="btn variant-filled bg-error-50-900-token text-error-600-300-token"
			on:click={() => game.difficulty(hard)}
		>
			Hard {hard}
		</button>
	</div>

	<h2 class="h2">Your number</h2>
	<div
		role="none"
		class="rounded-lg chip variant-soft hover:variant-filled w-16 aspect-square"
		draggable={$game.gameOver ? 'false' : 'true'}
		class:bg-primary-50-900-token={$game.difficulty === easy}
		class:text-primary-600-300-token={$game.difficulty === easy}
		class:bg-warning-50-900-token={$game.difficulty === medium}
		class:text-warning-600-300-token={$game.difficulty === medium}
		class:bg-error-50-900-token={$game.difficulty === hard}
		class:text-error-600-300-token={$game.difficulty === hard}
		on:dragstart={(e) => handleDragStart(e, $game.number)}
	>
		{$game.number ?? 'Done'}
	</div>

	{#if $game.slots}
		<ol
			class="flex gap-2 p-4 rounded-lg"
			class:bg-error-50-900-token={$game.gameFailed}
			class:bg-success-400-500-token={$game.gameWon}
		>
			{#each $game.slots as slot, i}
				<li
					on:drop={(e) => handleDragDrop(e, i)}
					class="rounded-lg chip variant-soft hover:variant-filled cursor-pointer w-20 aspect-square font-bold"
					class:bg-primary-200-700-token={!$game.gameOver && slot}
				>
					{#if slot}{slot}{/if}
				</li>
			{/each}
		</ol>
	{/if}

	<h2 class="h2">Score {$game.score}</h2>
	{#if object.entries($game.highScores).length}
		<h3 class="h3">High scores</h3>
		<ol class="flex flex-col gap-2">
			{#each object.entries($game.highScores) as [key, value]}
				<li class="flex justify-between gap-4">
					<span>Difficulty {key}</span>
					<span>Score {value}</span>
				</li>
			{/each}
		</ol>
		<button
			class="btn variant-filled bg-primary-50-900-token text-primary-600-300-token"
			on:click={game.resetHighScores}
		>
			Reset high scores
		</button>
	{/if}
</div>
