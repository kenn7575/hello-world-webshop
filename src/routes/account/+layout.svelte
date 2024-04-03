<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '$lib/components/ui/separator';

	import { user } from '$lib/functions/firebase';
	import { userData } from '$lib/functions/firebase';

	import { goto } from '$app/navigation';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<h1 class="text-3xl font-bold">
	Hey, {$userData?.displayName.split(' ')[0] ??
		$user?.displayName?.split(' ')[0] ??
		data.user.displayName.split(' ')[0] ??
		'user'}
</h1>
<Separator class="my-4" orientation="horizontal" />

<Tabs.Root value="overview" class="mb-4 hidden overflow-x-auto sm:block">
	<Tabs.List class="gap-6">
		<Tabs.Trigger
			class="md:w-28"
			on:click={() => {
				goto('/account');
			}}
			value="overview">Overview</Tabs.Trigger
		>
		<Tabs.Trigger
			class="md:w-28"
			on:click={() => {
				goto('/account/my-info');
			}}
			value="my_info">My info</Tabs.Trigger
		>
		<Tabs.Trigger
			class="md:w-28"
			on:click={() => {
				goto('/account/your-products');
			}}
			value="your_products">Your products</Tabs.Trigger
		>
		<Tabs.Trigger
			class="md:w-28"
			on:click={() => {
				goto('/account/order-history');
			}}
			value="order_history">Order history</Tabs.Trigger
		>
		<Tabs.Trigger
			class="md:w-28"
			on:click={() => {
				goto('/account/user-data');
			}}
			value="user_data">User data</Tabs.Trigger
		>
	</Tabs.List>
</Tabs.Root>
<slot />
