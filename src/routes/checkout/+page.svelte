<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { cart } from '$lib/functions/shoppingCart';
	import { Button } from '$lib/components/ui/button';
	import { Trash, ArrowTopRight } from 'radix-icons-svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { goto } from '$app/navigation';
	import { removeItemFromCart } from '$lib/functions/shoppingCart';
</script>

<div class="mt-8 flex flex-col items-center px-32">
	<Table.Root class="mx-auto w-full">
		<Table.Header>
			<Table.Row>
				<Table.Head>Image</Table.Head>
				<Table.Head>Name</Table.Head>

				<Table.Head>Price</Table.Head>
				<Table.Head class="text-right">Total</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each $cart as item, i (i)}
				<Table.Row>
					<Table.Cell>
						<a
							href="/product/{item.id}"
							on:click|stopPropagation={() => {
								goto(`/product/${item.id}`);
							}}
						>
							<img src={item.image_small} alt={item.title} class="h-10 w-10" />
						</a>
					</Table.Cell>
					<Table.Cell>{item.title}</Table.Cell>

					<Table.Cell>{item.price} Kr</Table.Cell>
					<Table.Cell class="text-right">{item.price} Kr</Table.Cell>
					<Table.Cell class="text-right">
						<AlertDialog.Root>
							<AlertDialog.Trigger asChild let:builder>
								<Button builders={[builder]} variant="ghost" size="icon">
									<Trash class="h-5 w-5" />
								</Button>
							</AlertDialog.Trigger>
							<AlertDialog.Content>
								<AlertDialog.Header>
									<AlertDialog.Title>Remove item from cart?</AlertDialog.Title>
									<AlertDialog.Description>
										Are you sure you want to remove this item from your cart?
									</AlertDialog.Description>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
									<AlertDialog.Action asChild let:builder>
										<Button builders={[builder]} on:click={() => removeItemFromCart(item.id)}>
											Remove
										</Button>
									</AlertDialog.Action>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<div class="mt-16 w-full">
		<div class="flex w-full justify-between gap-2">
			<Button variant="secondary" href="/">Keep shopping</Button>
			{#if $cart.length > 0}
				<Button href="/checkout/account">Next</Button>
			{:else}
				<Button disabled>Next</Button>
			{/if}
		</div>
	</div>
</div>
