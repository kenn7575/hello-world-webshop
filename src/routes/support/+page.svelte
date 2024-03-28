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

<div class="g mt-16 grid w-full gap-4">
	<a href="/support/q-and-a">
		<Card.Root class="h-full">
			<Card.Header class="relative">
				<Card.Title>Q & A</Card.Title>
				<Card.Description>Frequently asked questions.</Card.Description>
				<MessageSquareQuote class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
			</Card.Header>
		</Card.Root>
	</a>
	<Card.Root>
		<Card.Header class="relative">
			<Card.Title>Refund</Card.Title>
			<Card.Description>Request a refund.</Card.Description>
			<HandCoins class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
		</Card.Header>
		<Card.Content>content</Card.Content>
	</Card.Root><Card.Root>
		<Card.Header class="relative">
			<Card.Title>Support email</Card.Title>
			<Card.Description>Contact email support.</Card.Description>
			<Mail class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
		</Card.Header>
		<Card.Content>content</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="relative">
			<Card.Title>Cookie policy</Card.Title>
			<Card.Description>Recall your consent or view how we use your cookies.</Card.Description>
			<Cookie class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
		</Card.Header>
		<Card.Content>content</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="relative">
			<Card.Title>Privacy policy</Card.Title>
			<Card.Description>Delete account and more.</Card.Description>
			<Lock class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
		</Card.Header>
		<Card.Content>content</Card.Content>
	</Card.Root><Card.Root>
		<Card.Header class="relative">
			<Card.Title>Payment Terms and Conditions:</Card.Title>
			<Card.Description>How we collect and process your payment information.</Card.Description>
			<Handshake class="absolute right-4 top-2 h-[2rem] w-[2rem]" />
		</Card.Header>
		<Card.Content>content</Card.Content>
	</Card.Root>
</div>

<style>
	.g {
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	}
</style>
