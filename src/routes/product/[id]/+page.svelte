<script lang="ts">
	import type { PageData } from '../[id]/$types';
	export let data: PageData;
	import { addItemToCart, cart, removeItemFromCart } from '$lib/functions/shoppingCart';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import type { CartItem, Purchase } from '$lib/types';

	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Face } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';

	import '../../../app.pcss';
	import { PackageCheck, PackageMinus } from 'lucide-svelte';

	//product
	let product = data.product as CartItem;
	let purchasesFromServer = data.purchases as Purchase[] | null;
	$: userOwnsProduct = purchasesFromServer?.find((purchase) =>
		purchase.lineItems.find((item) => item.product_id === product.id)
	);
	$: productAlreadyInCart = $cart.find((item) => item.id === product.id);
</script>

<main>
	<article class="flex flex-col-reverse lg:flex-row">
		<div
			class="relative flex w-full items-center justify-center bg-secondary lg:w-1/2"
			id="product-image"
		>
			<div class="h-96 w-96">
				<AspectRatio
					ratio={1 / 1}
					class="cover aspect-square bg-muted bg-transparent"
					data-flip-id={'cover-' + product.id}
				>
					<img
						src={product.image}
						alt={product.title}
						class="h-full w-full rounded-md object-contain"
					/>
				</AspectRatio>
				<h2 class="mt-8 font-light text-secondary-foreground">{product.description}</h2>
			</div>
		</div>
		<div class="flex w-full flex-col justify-between p-8 lg:w-1/2">
			<div>
				<h1 class="text-4xl font-bold">{product.title}</h1>
				<p class="mt-2 text-sm font-light text-foreground">
					<span class="mr-2 font-bold">Product id:</span>
					{product.id}
				</p>

				<Accordion.Root class="my-16 w-full">
					<Accordion.Item value="item-1">
						<Accordion.Trigger>Product description</Accordion.Trigger>
						<Accordion.Content>{product.description}</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger>Reviews</Accordion.Trigger>
						<Accordion.Content>
							<p class="text-foreground">No reviews yet</p>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger>Product details</Accordion.Trigger>
						<Accordion.Content>
							<p>
								You will get the source code through your account page as well as a downloadable
								text file.
							</p>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
			<div class="@container flex items-center justify-start">
				{#if userOwnsProduct}
					<Alert.Root class="@2xl:flex-row flex flex-col justify-between gap-8">
						<div class="flex gap-4">
							<Face class="h-4 w-4" />
							<div>
								<Alert.Title>congratulations! You have full access to this product.</Alert.Title>
								<Alert.Description>
									You can download the source code and the text file from your account page.
								</Alert.Description>
							</div>
						</div>

						<Button variant="default" href="/account">View product</Button>
					</Alert.Root>
				{:else if productAlreadyInCart}
					<Alert.Root class=" flex max-w-72 flex-col justify-between gap-4">
						<div class="flex items-center gap-4">
							<PackageCheck class="h-6 w-6" />
							<Alert.Title>Product added to cart</Alert.Title>
						</div>

						<div class="flex w-full gap-2">
							<Button variant="default" href="/checkout" class="w-1/2">View cart</Button>
							<Button
								variant="secondary"
								on:click={() => {
									removeItemFromCart(product.id);
								}}
								class="w-1/2"
							>
								<PackageMinus class="mr-2 h-5 w-5" /> Remove
							</Button>
						</div>
					</Alert.Root>
				{:else}
					<div class="flex w-full justify-between">
						<h2 class="text-2xl font-bold">{product.price.toFixed(2)},- DKK</h2>

						<Button
							class="mt-2 w-fit px-16 xl:px-32"
							size="lg"
							on:click={() => {
								addItemToCart(product);
							}}
						>
							Add to cart
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</article>
</main>

<style>
	#product-image {
		height: calc(100vh - 4rem);
	}
</style>
