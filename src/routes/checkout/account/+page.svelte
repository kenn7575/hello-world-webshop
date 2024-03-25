<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Avatar from '$lib/components/ui/avatar';
	import { user } from '$lib/functions/firebase';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ArrowRight } from 'radix-icons-svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { goto } from '$app/navigation';
	import { signOutUser } from '$lib/functions/firebase';

	let email = '';
	let phone = '';
	let name = '';

	function changeUser() {
		signOutUser();
		//wait 500 ms
		setTimeout(() => {
			goto('/signin?redirect=/checkout/pay');
		}, 500);
	}
</script>

<main class="flex justify-center w-full py-32">
	<Card.Root class="w-96 min-h">
		<Card.Header>
			<Card.Title>Account</Card.Title>
			<Card.Description>
				Your purchases will be linked to this account. You can find your purchases in your account
				page at any time.
			</Card.Description>
		</Card.Header>
		<Separator class="mb-4" />
		<Card.Content class="space-y-2">
			{#if $user}
				<div class="flex items-center gap-2">
					<Avatar.Root>
						<Avatar.Image src={$user.photoURL} alt="profile" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex flex-col">
						<span class="font-bold">{$user.displayName}</span>
						<span class="text-gray-500">{$user.email}</span>
					</div>
				</div>
			{:else}
				<div>
					<p>Sign in to continue checkout.</p>
				</div>
			{/if}
		</Card.Content>
		<Card.Footer class="flex gap-2 justify-between">
			{#if $user}
				<Button variant="secondary" on:click={changeUser}>Change account</Button>
				<Button href="/checkout/pay">
					Go to checkout
					<ArrowRight class="h-4 w-4 ml-2" />
				</Button>
			{:else}
				<Button href="/signin?redirect=/checkout/pay" class="ml-auto">
					Sign in
					<ArrowRight class="h-4 w-4 ml-2" />
				</Button>
			{/if}
		</Card.Footer>
	</Card.Root>
</main>
