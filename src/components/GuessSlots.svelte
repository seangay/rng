<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { RngGame } from './game';

	export let game: RngGame;

	const { slots, gameFailed, gameWon, gameActive } = game;

	const dispatch = createEventDispatcher<{ dragdrop: { guess: number } }>();

	const handleDragDrop = (e: DragEvent, index: number) => {
		const guess = e.dataTransfer?.getData('guess');
		if (!guess) return;
		if ($slots[index]) return;

		dispatch('dragdrop', { guess: +guess });

		$slots[index] = +guess;
	};
</script>

{#if $slots}
	<ol
		class="flex gap-2 p-4 rounded-lg"
		class:bg-error-50-900-token={$gameFailed}
		class:bg-success-400-500-token={$gameWon}
	>
		{#each $slots as slot, i}
			<li
				on:drop={(e) => handleDragDrop(e, i)}
				class="rounded-lg chip variant-soft hover:variant-filled cursor-pointer w-20 aspect-square font-bold"
				class:bg-primary-200-700-token={$gameActive && slot}
			>
				{#if slot}{slot}{/if}
			</li>
		{/each}
	</ol>
{/if}
