<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import type { CartItem, Purchase } from '$lib/types';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { uppercaseFirstLetter, unixToDate, getCartItem } from '$lib/utils';
	import { TriangleAlert } from 'lucide-svelte';

	console.log('🚀 ~ data:', data);

	async function getPurchases() {
		const response = await fetch('/api/account/purchases');
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data.message);
		}
	}
</script>

<div class="mx-auto flex w-full max-w-5xl flex-col gap-4">
	{#await getPurchases()}
		{#each [0, 1, 2, 3] as skeleton}
			<Card.Root
				class="flex w-full  flex-col items-start justify-between gap-y-4 border-2 bg-transparent p-6 sm:flex-row"
			>
				<div class="flex flex-row items-start gap-4">
					<div class=" flex flex-col gap-2">
						<Skeleton class="h-5 w-14 rounded-sm bg-foreground/20" />
						<Skeleton class="h-3 w-20 rounded-full bg-foreground/20" />
					</div>
					<Separator orientation="vertical" class="h-12 bg-foreground/25" />
					<div class=" flex flex-col gap-2">
						<Skeleton class="h-5 w-14 rounded-sm bg-foreground/20" />
						<Skeleton class="h-3 w-20 rounded-full bg-foreground/20" />
					</div>
				</div>
				<Separator orientation="horizontal" class="bg-foreground/25  sm:hidden" />

				<Separator orientation="vertical" class="mx-4 hidden h-24 bg-foreground/25 sm:block" />
				<div class=" mr-auto flex flex-col gap-2">
					<Skeleton class="h-5 w-20 rounded-sm bg-foreground/20" />
					{#each [0, 1] as skeletonItem}
						<div class="mt-2 flex items-center gap-4">
							<Skeleton class="aspect-square h-8 w-8 rounded-full bg-foreground/20" />
							<div class="flex flex-col gap-2">
								<Skeleton class="h-4 w-28 rounded-sm bg-foreground/20" />
							</div>
						</div>
					{/each}
				</div>
				<Separator orientation="horizontal" class="bg-foreground/25  sm:hidden" />

				<div class="flex flex-col items-end justify-around gap-4 p-0">
					<Skeleton class="h-9 w-[7.25rem] rounded-md bg-foreground/20" />

					<Skeleton class="h-8 w-20 rounded-md bg-foreground/20" />
				</div>
			</Card.Root>
		{/each}
	{:then purchases}
		{#if purchases.length === 0}
			<Card.Root
				class="flex w-full flex-col items-start justify-between gap-y-4 bg-card p-6 sm:flex-row"
			>
				<Card.Header>
					<Card.Title>You have not purchased anything yet</Card.Title>
					<Card.Description
						>When you purchase a product, the ordre will apper on this page</Card.Description
					>
				</Card.Header>
			</Card.Root>
		{:else}
			{#each purchases as purchase}
				<Card.Root
					class="flex w-full flex-col items-start justify-between gap-y-4 bg-card p-6 sm:flex-row"
				>
					<div class="flex flex-row items-start gap-4">
						<div class=" flex flex-col gap-2">
							<Badge class="w-fit border-foreground" variant="outline">Status</Badge>
							<p class="text-sm font-normal">{uppercaseFirstLetter(purchase?.session?.status)}</p>
						</div>
						<Separator orientation="vertical" class="h-12 " />
						<div class="flex flex-col gap-2">
							<Badge class="w-fit border-foreground" variant="outline">Date</Badge>
							<p class="text-sm font-normal">{unixToDate(purchase?.date)}</p>
						</div>
					</div>
					<Separator orientation="horizontal" class="sm:hidden" />

					<Separator orientation="vertical" class="mx-4 hidden h-24 bg-foreground/25 sm:block" />
					<div class=" mr-auto flex flex-col gap-2">
						<Badge class="w-fit border-foreground" variant="outline">Products</Badge>
						{#each purchase.lineItems as lineItem}
							<div class="mt-2 flex items-center gap-4">
								<img
									src={getCartItem(lineItem.product_id, data.products)?.image}
									alt={lineItem.product_id}
									class="aspect-square h-8 w-8 object-contain"
								/>
								<div class="flex flex-col gap-2">
									<p class="text-base font-medium">
										{getCartItem(lineItem.product_id, data.products)?.title}
									</p>
								</div>
							</div>
						{/each}
					</div>
					<Separator orientation="horizontal" class="bg-foreground/25  sm:hidden" />

					<div class="flex flex-col items-end justify-around gap-4 p-0">
						<Button href="/account/order-history/{purchase.id}" variant="secondary"
							>Ordre details</Button
						>
						<p class="text-3xl font-bold">{purchase.amount / 100} kr.</p>
					</div>
				</Card.Root>
			{/each}
		{/if}
	{:catch error}
		<Alert.Root variant="destructive">
			<TriangleAlert class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{error.message}</Alert.Description>
		</Alert.Root>
	{/await}
</div>
