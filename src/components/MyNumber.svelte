<script lang="ts">
	import type { Readable } from 'svelte/store';
	import { difficulties } from './game';
	import type { PositiveNumber } from '$lib/numbers';

	export let number: Readable<number>;
	export let difficulty: Readable<PositiveNumber>;

	const [easy, medium, hard] = difficulties;

	const handleDragStart = (e: DragEvent, guess: number) => {
		if (!guess) return;

		e.dataTransfer?.setData('guess', guess.toString());
	};
</script>

<h2 class="h2">Your number</h2>
<div
	role="none"
	class="rounded-lg chip variant-soft hover:variant-filled w-16 aspect-square"
	draggable="true"
	class:bg-primary-50-900-token={$difficulty === easy}
	class:text-primary-600-300-token={$difficulty === easy}
	class:bg-warning-50-900-token={$difficulty === medium}
	class:text-warning-600-300-token={$difficulty === medium}
	class:bg-error-50-900-token={$difficulty === hard}
	class:text-error-600-300-token={$difficulty === hard}
	on:dragstart={(e) => handleDragStart(e, $number)}
>
	{$number ?? 'Done'}
</div>
