<script lang="ts">
	import { localStorageStore } from '@skeletonlabs/skeleton';
	import * as object from '$lib/objects';
	import type { RngGame } from './game';

	export let game: RngGame;

	const { score, difficulty, gameFailed, gameWon } = game;

	const highScores = localStorageStore<Record<number, number>>('score', {});

	const updateHighScores = () => {
		const previousScore = $highScores[$difficulty] ?? 0;
		if ($score > previousScore) $highScores[$difficulty] = $score;
	};

	$: if ($gameWon || $gameFailed) updateHighScores();
</script>

<h2 class="h2">Score {$score}</h2>
{#if object.entries($highScores).length}
	<h3 class="h3">High scores</h3>
	<ol class="flex flex-col gap-2">
		{#each object.entries($highScores) as [key, value]}
			<li class="flex justify-between gap-4">
				<span>Difficulty {key}</span>
				<span>Score {value}</span>
			</li>
		{/each}
	</ol>
	<button
		class="btn variant-filled bg-primary-50-900-token text-primary-600-300-token"
		on:click={() => ($highScores = {})}
	>
		Reset high scores
	</button>
{/if}
