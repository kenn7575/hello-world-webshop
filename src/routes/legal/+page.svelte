<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import Terms from '$lib/components/ui/terms.svelte';
</script>

<main class="my-16 px-4 justify-center flex">
	<div class="max-w-3xl">
		<Terms />
	</div>
</main>
