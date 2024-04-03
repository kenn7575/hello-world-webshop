<script lang="ts">
	import type { PageData } from './$types';

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
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { uppercaseFirstLetter, unixToDate } from '$lib/utils';
	import { ArrowLeft, LoaderCircle, TriangleAlert } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

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
</script>

<div class="mx-auto flex w-full max-w-5xl flex-col gap-4">
	<Button variant="outline" class="w-fit gap-1  pr-6">
		<ArrowLeft class="h-4 w-4" />
		Back
	</Button>
	{#await getPurchase(data.purchaseId)}
		loading
	{:then purchase}
		<div class="flex flex-wrap justify-between gap-4">
			<h2 class="text-3xl">Thank you for your purchase!</h2>
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
	{:catch error}
		<Alert.Root variant="destructive">
			<TriangleAlert class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{error.message}</Alert.Description>
		</Alert.Root>
	{/await}
</div>
