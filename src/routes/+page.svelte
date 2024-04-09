<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import * as Card from '$lib/components/ui/card';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import type { CartItem } from '$lib/types';
	let products = data.products as CartItem[];
	import { Badge } from '$lib/components/ui/badge';

	//get user collection and all purchases from user/purchases when $user is set

	import { userPurchases, userData } from '$lib/functions/firebase';
	$: console.log($userPurchases, 'user purchases');
	$: console.log($userData, 'user data');

	function formatPrice(price: number) {
		return price.toFixed(2);
	}

	//// :
</script>

<div class="mt-4 flex w-full justify-center px-4 xl:px-40">
	<div class="g grid w-full gap-4">
		{#each products as product}
			<a href="/product/{product.id}">
				<Card.Root class="">
					<Card.Header>
						<Card.Title>{product.title}</Card.Title>
						<Card.Description>{product.description}</Card.Description>
					</Card.Header>
					<Card.Content>
						<AspectRatio
							ratio={1 / 1}
							class="cover bg-muted bg-transparent"
							data-flip-id="cover-{product.id}"
						>
							<img
								src={product.image}
								alt={product.title}
								class="h-full w-full rounded-md object-contain"
							/>
						</AspectRatio>
					</Card.Content>
					<Card.Footer class="flex justify-between">
						<p><strong>{formatPrice(product.price)},- DKK</strong></p>
						<!-- Display if the item is owened by the current user  -->
						{#if $userPurchases && $userPurchases.find( (purchase) => purchase.lineItems.find((item) => item.product_id === product.id) )}
							<Badge variant="default">Purchased</Badge>
						{/if}
					</Card.Footer>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>

<style>
	.g {
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	}
</style>
