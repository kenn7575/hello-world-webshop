<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { DoubleArrowRight, CheckCircled } from 'radix-icons-svelte';
	import { user } from '$lib/functions/firebase';
	import { cart } from '$lib/functions/shoppingCart';
	export let data: LayoutData;
	import Button from '$lib/components/ui/button/button.svelte';

	$: url = $page.url.pathname;

	enum Color {
		secondary = 'secondary',
		ghost = 'ghost'
	}

	$: color1 = url == '/checkout' ? Color.secondary : Color.ghost;
	$: color2 = url == '/checkout/account' ? Color.secondary : Color.ghost;
	$: color3 = url == '/checkout/pay' ? Color.secondary : Color.ghost;
</script>

{#key url}
	<div class="flex items-center gap-4 justify-center mt-4">
		<Button variant={color1} href="/checkout" class=" w-44">
			{#if $cart.length > 0}
				<CheckCircled class="h-5 w-5 text-success mr-2" />
			{/if}
			Shopping cart
		</Button>
		<DoubleArrowRight class="h-6 w-6 " />

		{#if $cart.length > 0}
			<Button variant={color2} href="/checkout/account" class=" w-44">
				<!-- <CheckCircled class="h-5 w-5 text-success mr-2" /> -->
				Account
			</Button>
		{:else}
			<Button variant={color2} disabled class=" w-44">
				<!-- <CheckCircled class="h-5 w-5 text-success mr-2" /> -->
				Account
			</Button>
		{/if}

		<DoubleArrowRight class="h-6 w-6 " />

		{#if $cart.length > 0 && $user}
			<Button variant={color3} href="/checkout/pay" class="w-44">Payment</Button>
		{:else}
			<Button variant={color3} disabled class="w-44">Payment</Button>
		{/if}
	</div>
{/key}

<slot />
