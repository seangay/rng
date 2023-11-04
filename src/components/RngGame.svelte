<script lang="ts">
	import DifficultySelect from './DifficultySelect.svelte';
	import MyNumber from './MyNumber.svelte';
	import GuessSlots from './GuessSlots.svelte';
	import ScoreBoard from './ScoreBoard.svelte';
	import { createGame } from './game';

	const game = createGame();

	const { number, guesses, difficulty, restart } = game;

	$: $difficulty, restart();
</script>

<div
	role="application"
	class="flex flex-col items-center gap-4 min-h-full p-4 select-none"
	on:dragover|preventDefault
>
	<h1 class="h1 place-self-start">RNG Game</h1>

	<DifficultySelect {difficulty} />

	<button
		class="btn variant-filled bg-primary-50-900-token text-primary-600-300-token"
		on:click={restart}
	>
		Restart
	</button>

	<MyNumber {difficulty} {number} />

	<GuessSlots
		{game}
		on:dragdrop={(e) => {
			const { guess } = e.detail;
			$guesses.push(guess);
			$guesses = $guesses;
		}}
	/>

	<ScoreBoard {game} />
</div>
