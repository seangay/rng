<script lang="ts">
	import type { PositiveNumber } from '$lib/numbers';
	import type { Writable } from 'svelte/store';
	import { difficulties } from './game';

	export let difficulty: Writable<PositiveNumber>;

	const [easy, medium, hard] = difficulties;
</script>

<h2 class="h2">Select Difficulty</h2>
<div class="flex items-end gap-4 font-bold">
	<button
		type="button"
		class="btn variant-filled bg-primary-50-900-token text-primary-600-300-token"
		on:click={() => ($difficulty = easy)}
	>
		Easy {easy}
	</button>
	<button
		type="button"
		class="btn variant-filled bg-warning-50-900-token text-warning-600-300-token"
		on:click={() => ($difficulty = medium)}
	>
		Medium {medium}
	</button>
	<button
		type="button"
		class="btn variant-filled bg-error-50-900-token text-error-600-300-token"
		on:click={() => ($difficulty = hard)}
	>
		Hard {hard}
	</button>
</div>
