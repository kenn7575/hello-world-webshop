<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log('🚀 ~ file: +page.svelte:5 ~ data:', data);
	import * as Table from '$lib/components/ui/table';
	import type { CartItem } from '$lib/types';

	function getProduct(id: string): CartItem | undefined {
		const product = data.products.find((product) => product.id === id);

		return product;
	}

	function unixToDate(unixTimestamp: number): string {
		const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
		const day = ('0' + date.getDate()).slice(-2);
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const year = date.getFullYear();
		const hours = ('0' + date.getHours()).slice(-2);
		const minutes = ('0' + date.getMinutes()).slice(-2);
		const seconds = ('0' + date.getSeconds()).slice(-2);

		const displayDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
		return displayDate;
	}
</script>

<Table.Root class="mt-8">
	<Table.Caption>A list of your all your placed orders.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Product</Table.Head>
			<Table.Head>Date <span class="opacity-50">(dd-mm-yyyy hh:mm:ss)</span></Table.Head>
			<Table.Head>Charge Id</Table.Head>
			<Table.Head class="text-right">Price</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.purchases as purchas (purchas.id)}
			<Table.Row>
				<Table.Cell class="font-medium"
					>{getProduct(purchas.product_id)?.title ?? 'error'}</Table.Cell
				>
				<Table.Cell>{unixToDate(purchas.created)}</Table.Cell>
				<Table.Cell>{purchas.charge_id}</Table.Cell>
				<Table.Cell class="text-right">{(purchas.amount / 100).toFixed(2)} DKK</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
