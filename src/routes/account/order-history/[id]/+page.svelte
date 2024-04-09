<script lang="ts">
	import type { PageData } from './$types';
	import { blur, fade, fly } from 'svelte/transition';
	import { quintOut, quadIn } from 'svelte/easing';

	export let data: PageData;
	console.log('🚀 ~ data:', data);

	async function getPurchase(id: string) {
		const response = await fetch(`/api/account/purchases/${id}`);
		const json = await response.json();
		if (response.ok) {
			console.log('🚀 ~ data:', json);
			const data: Purchase = json;
			return data;
		} else {
			throw new Error(json.message);
		}
	}

	import type { CartItem, Purchase } from '$lib/types';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { uppercaseFirstLetter, unixToDate, stringShortner, getCartItem } from '$lib/utils';
	import { ArrowLeft, ClipboardList, LoaderCircle, TriangleAlert } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Refund from '$lib/components/refund.svelte';

	function createReceipt(url: string | string | undefined | null) {
		if (!url) {
			toast.error('Sorry, no receipt was found', {
				duration: 5000,
				description: 'Contact support for help!'
			});
			return;
		}
		loading = true;

		fetch(`/api/receipts?url=${encodeURIComponent(url)}`) // Ensure URL is encoded
			.then((response) => response.blob())
			.then((data) => {
				let blob = new Blob([data], { type: 'octet/stream' });
				console.log('🚀 ~ .then ~ blob:', blob);
				// Create a URL for the blob
				const blobUrl = window.URL.createObjectURL(blob); // Changed variable name to `blobUrl`
				console.log('🚀 ~ .then ~ blobUrl:', blobUrl); // Log using the updated variable name
				// Create a link to download it
				const a = document.createElement('a');
				a.href = blobUrl; // Use the updated variable name
				a.download = 'webpage.pdf';
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(blobUrl); // Use the updated variable name for cleanup
				document.body.removeChild(a);
				loading = false;
			})
			.catch((error) => console.error('Error:', error));
	}

	let loading: boolean = false;
	enum RefundStatus {
		NONE = 'none',
		PROCESSING = 'processing',
		REFUNDED = 'refunded'
	}
	let refunded: RefundStatus = RefundStatus.NONE;
</script>

<div class="mx-auto flex w-full max-w-5xl flex-col gap-4">
	<Button variant="outline" class="w-fit gap-1  pr-6" href="/account/order-history">
		<ArrowLeft class="h-4 w-4" />
		Back
	</Button>
	{#await getPurchase(data.purchaseId)}
		<div out:fade={{ duration: 250 }} class="flex flex-wrap justify-between gap-4">
			<div>
				<Skeleton class="h-6 w-96 rounded-full bg-foreground/20" />
			</div>
			<div class="flex flex-row items-start gap-4">
				<div class=" flex flex-col gap-2">
					<Skeleton class="h-5 w-14 rounded-sm bg-foreground/20" />
					<Skeleton class="h-3 w-20 rounded-full bg-foreground/20" />
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class=" flex flex-col gap-2">
					<Skeleton class="h-5 w-14 rounded-sm bg-foreground/20" />
					<Skeleton class="h-3 w-20 rounded-full bg-foreground/20" />
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class=" flex flex-col gap-2">
					<Skeleton class="h-5 w-14 rounded-sm bg-foreground/20" />
					<Skeleton class="h-3 w-28 rounded-full bg-foreground/20" />
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class=" flex flex-col gap-2">
					<Skeleton class="h-5 w-14 rounded-sm bg-foreground/20" />
					<Skeleton class="h-3 w-20 rounded-full bg-foreground/20" />
				</div>
			</div>
		</div>
		<div class="grid w-full grid-cols-4 gap-2">
			<div out:fade={{ duration: 250 }}>
				<Card.Root class="h-full  border-2 bg-transparent">
					<Card.Header>
						<Skeleton class="h-4 w-32 rounded-sm bg-foreground/20" />
						<Skeleton class="h-3 w-40 rounded-sm bg-foreground/20" />
					</Card.Header>
					<Card.Content class="text-sm">
						<Skeleton class="mb-2 h-3 w-24 rounded-sm bg-foreground/20" />
						<Skeleton class="mb-2 h-3 w-20 rounded-sm bg-foreground/20" />
						<Skeleton class="mb-2 h-3 w-12 rounded-sm bg-foreground/20" />
						<Skeleton class="mb-2 h-3 w-8 rounded-sm bg-foreground/20" />
					</Card.Content>
				</Card.Root>
			</div>
			<div out:fade={{ duration: 250 }}>
				<Card.Root class="border-2  bg-transparent">
					<Card.Header>
						<Skeleton class="mb-1 h-4 w-24 rounded-sm bg-foreground/20" />

						<Skeleton class="h-3 w-48 rounded-sm bg-foreground/20" />
					</Card.Header>
					<Card.Content class="flex flex-col gap-2 text-sm">
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Skeleton class="h-3 w-10 rounded-sm bg-foreground/20" />

							<Skeleton class="h-8 w-full rounded-sm bg-foreground/20" />
						</div>
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Skeleton class="h-3 w-10 rounded-sm bg-foreground/20" />

							<Skeleton class="h-8 w-full rounded-sm bg-foreground/20" />
						</div>
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Skeleton class="h-3 w-12 rounded-sm bg-foreground/20" />

							<Skeleton class="h-8 w-full rounded-sm bg-foreground/20" />
						</div>
					</Card.Content>
				</Card.Root>
			</div>

			<div class="col-span-2 row-span-2" out:fade={{ duration: 250 }}>
				<Card.Root class="flex h-full flex-col justify-between border-2 bg-transparent">
					<Card.Header>
						<Skeleton class="mb-1 h-4 w-24 rounded-sm bg-foreground/20" />

						<Skeleton class="h-3 w-48 rounded-sm bg-foreground/20" />
					</Card.Header>
					<Card.Content class="mb-auto flex flex-col gap-2 text-sm">
						{#each [1, 2, 3] as lineItem}
							<div class="mt-2 flex items-center gap-4">
								<Skeleton class="h-8 w-8 rounded-full bg-foreground/20" />

								<div class="flex flex-col gap-2">
									<Skeleton class="h-3 w-32 rounded-sm bg-foreground/20" />
								</div>
							</div>
						{/each}
						<Separator class="mt-4 bg-foreground" />
					</Card.Content>
					<Card.Footer class="flex flex-col">
						<div class="flex w-full flex-row items-center justify-between gap-4">
							<Skeleton class="h-3 w-20 rounded-sm bg-foreground/20" />

							<Skeleton class="h-5 w-16 rounded-sm bg-foreground/20" />
						</div>

						<div class="mt-4 flex w-full flex-row items-center justify-between gap-3">
							<Skeleton class="h-3 w-20 rounded-sm bg-foreground/20" />

							<Skeleton class="h-5 w-16 rounded-sm bg-foreground/20" />
						</div>

						<Separator class="my-4 bg-foreground" />

						<div class="flex w-full flex-row items-center justify-between gap-4">
							<Skeleton class="h-5 w-16 rounded-sm bg-foreground/20" />

							<Skeleton class="h-8 w-28 rounded-sm bg-foreground/20" />
						</div>
					</Card.Footer>
				</Card.Root>
			</div>

			<div out:fade={{ duration: 250 }} class="col-span-2">
				<Card.Root class=" border-2  bg-transparent">
					<Card.Header>
						<Skeleton class="mb-1 h-4 w-20 rounded-sm bg-foreground/20" />
					</Card.Header>
					<Card.Content class="text-sm">
						<Skeleton class="mb-2 h-3 w-full rounded-sm bg-foreground/20" />
						<Skeleton class="h-3 w-10/12 rounded-sm bg-foreground/20" />

						<Skeleton class="mt-4 h-3 w-64 rounded-sm bg-foreground/20" />
					</Card.Content>
					<Card.Footer>
						<Skeleton class="h-9 w-20 rounded-sm bg-foreground/20" />
					</Card.Footer>
				</Card.Root>
			</div>
		</div>
	{:then purchase}
		<div in:fade={{ duration: 250, delay: 250 }} class="flex flex-wrap justify-between gap-4">
			<h2 class="text-3xl">Thank you for your purchase!</h2>
			<div class="flex flex-row items-start gap-4">
				<div class=" flex flex-col gap-2">
					<Badge class="w-fit border-foreground" variant="outline">Status</Badge>
					<p class="text-sm font-normal">
						{purchase.charge?.refunded || refunded === RefundStatus.REFUNDED
							? 'Refunded'
							: uppercaseFirstLetter(purchase?.session?.status)}
					</p>
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class="flex flex-col gap-2">
					<Badge class="w-fit border-foreground" variant="outline">Date</Badge>
					<p class="text-sm font-normal">{unixToDate(purchase?.date)}</p>
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class="flex flex-col gap-2">
					<Badge class="w-fit border-foreground" variant="outline">Order ID</Badge>
					<div class="flex gap-1">
						<p class="text-sm font-normal lg:hidden">{stringShortner(purchase?.id, 7)}</p>
						<p class="hidden text-sm font-normal lg:block">{purchase?.id}</p>

						<button
							on:click={() => {
								navigator.clipboard.writeText(purchase?.id);
								toast.success(`Copied order ID ${purchase?.id} copied to clipboard`, {
									duration: 5000,
									description: 'You can use this ID to track your order'
								});
							}}
						>
							<ClipboardList class="h-4 w-4" />
						</button>
					</div>
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class="flex flex-col gap-2">
					<Badge class="w-fit border-foreground" variant="outline">Receipt</Badge>
					<Button
						disabled={loading}
						variant="link"
						class="h-min p-0 text-sm font-normal text-foreground underline"
						on:click={() => createReceipt(purchase.charge?.receipt_url)}
						>{loading ? 'Processing' : 'Download'}
						<LoaderCircle class="ml-1 h-4 w-4 animate-spin  {loading ? 'block' : 'hidden '}" />
					</Button>
				</div>
			</div>
		</div>
		<div class="grid w-full grid-cols-4 gap-2">
			<div in:fade={{ duration: 250, delay: 250 }}>
				<Card.Root class="h-full">
					<Card.Header>
						<Card.Title>Shipping address</Card.Title>
						<Card.Description>Used for tax calculation.</Card.Description>
					</Card.Header>
					<Card.Content class="text-sm">
						<p>
							{purchase.session?.shipping_details?.address?.line1}
						</p>
						<p>
							{purchase.session?.shipping_details?.address?.line2}
						</p>
						<p>
							{purchase.session?.shipping_details?.address?.city}
						</p>
						<p>
							{purchase.session?.shipping_details?.address?.postal_code}
						</p>
						<p>
							{purchase.session?.shipping_details?.address?.country}
						</p>
					</Card.Content>
				</Card.Root>
			</div>
			<div in:fade={{ duration: 250, delay: 250 }}>
				<Card.Root>
					<Card.Header>
						<Card.Title>Customer info</Card.Title>
						<Card.Description>Associated with this purchase</Card.Description>
					</Card.Header>
					<Card.Content class="flex flex-col gap-2 text-sm">
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Label for="email">Email</Label>
							<Input
								type="email"
								value={purchase.session?.customer_details?.email ?? 'None'}
								id="email"
								disabled={true}
							/>
						</div>
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Label for="name">Name</Label>
							<Input
								type="text"
								value={purchase.session?.customer_details?.name ?? 'None'}
								id="name"
								disabled={true}
							/>
						</div>
						<div class="grid w-full max-w-sm items-center gap-1.5">
							<Label for="name">Phone</Label>
							<Input
								type={purchase.session?.customer_details?.phone ? 'tel' : 'text'}
								value={purchase.session?.customer_details?.phone ?? 'None'}
								id="name"
								disabled={true}
							/>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
			<div class="col-span-2 row-span-2" in:fade={{ duration: 250, delay: 250 }}>
				<Card.Root class="flex h-full flex-col justify-between">
					<Card.Header>
						<Card.Title>Pruducts</Card.Title>
						<Card.Description>Associated with this purchase</Card.Description>
					</Card.Header>
					<Card.Content class="mb-auto flex flex-col gap-2 text-sm">
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
						<Separator class="mt-4 bg-foreground" />
					</Card.Content>
					<Card.Footer class="flex flex-col">
						<div class="flex w-full flex-row items-center justify-between gap-4">
							<p class="text-sm font-normal">Subtotal</p>
							<p class="text-lg font-semibold">
								{(purchase.session?.amount_subtotal || 0) / 100} DKK
							</p>
						</div>
						{#if (purchase.session?.total_details?.amount_discount || 0) > 0}
							<div class="flex w-full flex-row items-center justify-between gap-4">
								<p class="text-sm font-normal">Discount</p>
								<p class="text-lg font-semibold">
									{(purchase.session?.total_details?.amount_discount || 0) / 100} DKK
								</p>
							</div>
						{/if}
						<div class="flex w-full flex-row items-center justify-between gap-4">
							<p class="text-sm font-normal">Tax</p>
							<p class="text-lg font-semibold">
								{(purchase.session?.total_details?.amount_tax || 0) / 100} DKK
							</p>
						</div>

						<Separator class="my-4 bg-foreground" />

						<div class="flex w-full flex-row items-center justify-between gap-4">
							<p class="text-lg font-medium">Total</p>
							<p class="text-3xl font-bold">{(purchase.session?.amount_total || 0) / 100} DKK</p>
						</div>
					</Card.Footer>
				</Card.Root>
			</div>
			<div class="col-span-2" in:fade={{ duration: 250, delay: 250 }}>
				<Card.Root>
					<Card.Header>
						<Card.Title>Refund</Card.Title>
						<Card.Description></Card.Description>
					</Card.Header>
					<Card.Content class="text-sm">
						<p>
							If you want to refund this order, you can do so by clicking the button below. We will
							refund the full amount to your original payment method.
						</p>
						<p>
							Read more about our
							<Button variant="link" class="p-0 underline" href="/refund">refund policy</Button>
							here.
						</p>
					</Card.Content>
					<Card.Footer>
						<AlertDialog.Root>
							<AlertDialog.Trigger asChild let:builder>
								<Button
									builders={[builder]}
									variant="destructive"
									disabled={purchase.charge?.amount === purchase.charge?.amount_refunded ||
										refunded === RefundStatus.REFUNDED}
									>{purchase.charge?.amount === purchase.charge?.amount_refunded ||
									refunded === RefundStatus.REFUNDED
										? 'Refunded'
										: 'Refund'}
								</Button>
							</AlertDialog.Trigger>
							<AlertDialog.Content class="rounded-lg">
								<AlertDialog.Header>
									<AlertDialog.Title
										>Are you sure you want to refund this purchase?</AlertDialog.Title
									>
									<AlertDialog.Description>
										You will receive a full refund to your original payment method. Furthermore, you
										will lose access to the products associated with this purchase. <p>
											Read more about our
											<Button variant="link" class="p-0 underline" href="/refund"
												>refund policy</Button
											> here.
										</p>
									</AlertDialog.Description>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
									<AlertDialog.Action
										on:click={async () => {
											refunded = RefundStatus.PROCESSING;
											try {
												await fetch(`/api/stripe/refund?chargeId=${purchase.stripe_charge_id}`, {
													method: 'DELETE'
												});
												refunded = RefundStatus.REFUNDED;
												toast.success('Refund processed successfully', {
													duration: 5000,
													description:
														'The money will be refunded to your original payment method shortly.'
												});
											} catch (err) {
												refunded = RefundStatus.NONE;
												toast.error('An error occurred while processing your refund', {
													duration: 5000,
													description: 'Please try again or contact support.'
												});
											}
										}}
										class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
										>REQUEST REFUND</AlertDialog.Action
									>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</Card.Footer>
				</Card.Root>
			</div>
		</div>
	{:catch error}
		<Alert.Root variant="destructive">
			<TriangleAlert class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{error.message}</Alert.Description>
		</Alert.Root>
	{/await}
</div>
