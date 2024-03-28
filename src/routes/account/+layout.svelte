<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '$lib/components/ui/separator';

	import { user } from '$lib/functions/firebase';
	import { userData } from '$lib/functions/firebase';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
</script>

<main class="mt-16 px-2 sm:px-8 md:px-32">
	<h1 class="text-3xl font-bold">
		Hey, {$userData?.displayName.split(' ')[0] ??
			$user?.displayName?.split(' ')[0] ??
			data.user.displayName.split(' ')[0] ??
			'user'}
	</h1>
	<Separator class="my-4" orientation="horizontal" />

	<Tabs.Root value="overview">
		<Tabs.List class="grid w-full grid-cols-5">
			<Tabs.Trigger
				on:click={() => {
					goto('/account');
				}}
				value="overview">Overview</Tabs.Trigger
			>
			<Tabs.Trigger
				on:click={() => {
					goto('/account/my-info');
				}}
				value="my_info">My info</Tabs.Trigger
			>
			<Tabs.Trigger
				on:click={() => {
					goto('/account/your-products');
				}}
				value="your_products">Your products</Tabs.Trigger
			>
			<Tabs.Trigger
				on:click={() => {
					goto('/account/order-history');
				}}
				value="order_history">Order history</Tabs.Trigger
			>
			<Tabs.Trigger
				on:click={() => {
					goto('/account/user-data');
				}}
				value="user_data">User data</Tabs.Trigger
			>
		</Tabs.List>
	</Tabs.Root>
	<slot />
</main>
