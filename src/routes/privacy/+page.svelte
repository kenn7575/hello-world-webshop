<script lang="ts">
	import type { PageData } from '../legal/$types';

	export let data: PageData;
	import Terms from '$lib/components/ui/terms.svelte';
</script>

<main class="my-16 flex justify-center px-4">
	<div class="max-w-3xl">
		<Terms />
	</div>
</main>
