<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import {
		CreditCard,
		MessageSquareQuote,
		Cookie,
		Lock,
		Mail,
		HandCoins,
		Handshake
	} from 'lucide-svelte';
</script>

<h1 class="mt-8 text-center text-3xl font-bold">Welcome to the support center!</h1>

<div class="g mt-16 grid w-full gap-4 xl:px-8">
	<a href="/support/q-and-a">
		<Card.Root class="h-full min-h-40">
			<Card.Header class="relative">
				<Card.Title>Q & A</Card.Title>
				<Card.Description>Frequently asked questions.</Card.Description>
				<MessageSquareQuote class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
			</Card.Header>
		</Card.Root>
	</a>
	<a href="/refund">
		<Card.Root class="h-full min-h-40">
			<Card.Header class="relative">
				<Card.Title>Refund policy</Card.Title>
				<Card.Description>And how to request a refund.</Card.Description>
				<HandCoins class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
			</Card.Header>
		</Card.Root>
	</a>
	<a href="mailto:kontakt@kennik.dk">
		<Card.Root class="h-full min-h-40">
			<Card.Header class="relative">
				<Card.Title>Support email</Card.Title>
				<Card.Description>Contact email support.</Card.Description>
				<Mail class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
			</Card.Header>
		</Card.Root>
	</a>

	<a href="/privacy">
		<Card.Root class="h-full min-h-40">
			<Card.Header class="relative">
				<Card.Title>Privacy policy</Card.Title>
				<Card.Description>Delete account and more.</Card.Description>
				<Lock class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
			</Card.Header>
		</Card.Root>
	</a>
	<a href="/payment-terms">
		<Card.Root class="h-full min-h-40">
			<Card.Header class="relative">
				<Card.Title>Payment Terms and Conditions:</Card.Title>
				<Card.Description>How we collect and process your payment information.</Card.Description>
				<Handshake class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
			</Card.Header>
		</Card.Root>
	</a>
</div>

<style>
	.g {
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	}
</style>
