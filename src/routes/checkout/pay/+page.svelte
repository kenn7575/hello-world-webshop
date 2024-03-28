<script lang="ts">
	import { onMount } from 'svelte';
	// import { goto } from '$app/navigation';
	// import { onMount } from 'svelte';
	// import { loadStripe } from '@stripe/stripe-js';
	// import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	// import { Elements, PaymentElement, LinkAuthenticationElement } from 'svelte-stripe';
	// import Button from '$lib/components/ui/button/button.svelte';
	// import Climate from '$lib/img/StripeClimateBadge.svg';
	// import type Stripe from 'stripe';
	// import { cart } from '$lib/functions/shoppingCart';

	// let stripe: any = null;
	// let clientSecret: any = null;
	// let error: any = null;
	// let elements: any;
	// let processing = false;
	// let amount = 0;

	// onMount(async () => {
	// 	stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	// 	clientSecret = await createPaymentIntent();

	// 	//get theme from localstorage
	// 	theme = localStorage.getItem('mode');
	// 	if (theme == 'light') {
	// 		variables = {
	// 			colorPrimary: '#E11D48',
	// 			colorBackground: '#ffffff',
	// 			colorText: '#000000',
	// 			colorDanger: '#7F1D1D'
	// 		};
	// 	} else {
	// 		variables = {
	// 			colorPrimary: '#E11D48',
	// 			colorBackground: '#27272A',
	// 			colorText: '#ffffff',
	// 			colorDanger: '#7F1D1D'
	// 		};
	// 	}
	// });

	// async function createPaymentIntent() {
	// 	const response = await fetch('/api/stripe/payment-intent', {
	// 		method: 'POST',
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		},
	// 		body: JSON.stringify({})
	// 	});
	// 	if (!response.ok) {
	// 		error = await response.json();
	// 		return;
	// 	} else {
	// 		const paymentIntent = (await response.json()) as Stripe.PaymentIntent;
	// 		amount = paymentIntent.amount;
	// 		return paymentIntent.client_secret;
	// 	}
	// }
	// async function submit() {
	// 	// avoid processing duplicates
	// 	if (processing) return;
	// 	processing = true;

	// 	// confirm payment with stripe
	// 	const result = await stripe.confirmPayment({
	// 		elements,
	// 		redirect: 'if_required'
	// 	});
	// 	if (result.error) {
	// 		// payment failed, notify user
	// 		error = result.error;
	// 		processing = false;
	// 	} else {
	// 		//delete cart
	// 		document.cookie = `cart=; path=/; samesite=strict; secure=true; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	// 		$cart = [];
	// 		goto('/thanks');
	// 	}
	// }
	// let theme: string | null = null;
	// let variables: {};
	import type { PageData } from './$types';
	export let data: PageData;
	function makeLinkAndGoto(url: string) {
		const link = document.createElement('a');
		link.href = url;
		link.click();
	}

	onMount(() => {
		makeLinkAndGoto(data.session?.url);
	});
</script>

<!-- 
{#if error}
	<p class="error">{error.message} Please try again.</p>
{/if}
<main class="flex w-full justify-center py-32">
	{#if clientSecret}
		<div class="w-[40rem] px-4">
			<Elements {stripe} {clientSecret} {variables} labels="floating" bind:elements>
				<form on:submit|preventDefault={submit}>
					<LinkAuthenticationElement />
					<PaymentElement />

					<Button class="mt-2 w-full p-4" disabled={processing} on:click={submit}>
						{#if processing}
							Processing...
						{:else}
							Pay
						{/if}
					</Button>
				</form>
			</Elements>
			<div class="mt-8 flex gap-8">
				<img src={Climate} alt="Stripe climate logo" height="50" width="50" />
				<div class="⚙ as9d ⚙tccuz8">
					<span class="text-foreground/60"
						>We'll contribute <b>50% of your purchase</b> to remove CO₂ from the atmosphere.</span
					>
				</div>
			</div>
		</div>
	{:else if error}
		<Button
			variant="secondary"
			on:click={() => {
				location.reload();
			}}>Retry</Button
		>
	{:else}
		Loading...
	{/if}
</main>

<style>
	.error {
		color: tomato;
		margin: 2rem 0 0;
	}
</style> -->
