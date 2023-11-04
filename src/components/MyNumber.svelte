<script lang="ts">
	export let number: number;

	const handleDragStart = (e: DragEvent, guess: number) => {
		if (!guess) return;

		e.dataTransfer?.setData('guess', guess.toString());
	};
</script>

<h2 class="h2">Your number</h2>
<div
	role="none"
	class="rounded-lg chip variant-soft hover:variant-filled bg-secondary-400-500-token w-16 aspect-square"
	draggable="true"
	on:dragstart={(e) => handleDragStart(e, number)}
>
	{number ?? 'Done'}
</div>
