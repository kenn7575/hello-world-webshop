<script lang="ts">
	import { onMount } from 'svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	function makeLinkAndGoto(url: string) {
		const link = document.createElement('a');
		link.href = url;
		link.click();
	}

	onMount(() => {
		makeLinkAndGoto(data.session?.url || '');
	});
</script>
