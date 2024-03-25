<script lang="ts">
	import type { PageData } from '../[id]/$types';
	import { addItemToCart } from '$lib/functions/shoppingCart';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import type { CartItem, Purchase } from '$lib/types';

	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Face } from 'radix-icons-svelte';
	import * as Alert from '$lib/components/ui/alert';
	export let data: PageData;

	import '../../../app.pcss';

	//product
	let product = data.product as CartItem;
	let purchasesFromServer = data.purchases as Purchase[] | null;
	$: userOwnsProduct = purchasesFromServer?.find((item) => item.product_id == product.id);
</script>

<main>
	<article class="lg:flex-row flex flex-col-reverse">
		<div
			class="lg:w-1/2 w-full bg-secondary flex justify-center items-center relative"
			id="product-image"
		>
			<div class="h-96 w-96">
				<AspectRatio
					ratio={1 / 1}
					class="bg-muted cover aspect-square bg-transparent"
					data-flip-id={'cover-' + product.id}
				>
					<img
						src={product.image}
						alt={product.title}
						class="rounded-md object-contain h-full w-full"
					/>
				</AspectRatio>
				<h2 class="text-foreground mt-8 font-light">{product.description}</h2>
			</div>
		</div>
		<div class="lg:w-1/2 w-full p-8 flex flex-col justify-between">
			<div>
				<h1 class="text-4xl font-bold">{product.title}</h1>
				<p class="text-sm text-foreground mt-2 font-light">
					<span class="font-bold mr-2">Product id:</span>
					{product.id}
				</p>
				<script lang="ts">
					import * as Accordion from '$lib/components/ui/accordion';
				</script>

				<Accordion.Root class="w-full my-16">
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
								You will get the source code throug your account page as well as a downloadable text
								file.
							</p>
						</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
			<div class="flex justify-between items-center @container">
				{#if userOwnsProduct}
					<Alert.Root class="flex flex-col justify-between gap-8 @2xl:flex-row">
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
				{:else}
					<h2 class="text-2xl">{product.price.toFixed(2)},- DKK</h2>

					<Button
						class="w-fit px-16 xl:px-32 mt-2"
						size="lg"
						on:click={() => {
							addItemToCart(product);
						}}
					>
						Add to cart
					</Button>
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
