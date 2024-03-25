<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { firebaseAuth } from '$lib/functions/firebase';
	import { sendPasswordResetEmail } from 'firebase/auth';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { goto } from '$app/navigation';

	let email = '';
	let errorMessage = '';

	async function resetEmail() {
		if (!email) {
			errorMessage = 'Please enter your email';
			return;
		}
		await sendPasswordResetEmail(firebaseAuth, email);
		goto('/signin/forgotten-password/success');
	}
</script>

<main class="w-full flex mt-32 justify-center">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Reset your email address</Card.Title>
			<Card.Description>Enter your e-mail address and we'll send you a reset link.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="grid w-full items-center gap-4">
					<div class="flex flex-col space-y-1.5">
						<Label for="email">Name</Label>
						<Input id="email" bind:value={email} type="email" placeholder="example@gmail.com" />
					</div>
				</div>
			</form>
			{#if errorMessage}
				<p class="text-red-500">{errorMessage}</p>
			{/if}
		</Card.Content>
		<Card.Footer class="flex justify-between">
			<Button on:click={resetEmail} class="ml-auto">Send reset link</Button>
		</Card.Footer>
	</Card.Root>
</main>
