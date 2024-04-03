<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
</script>

<div class="mt-32 flex w-full justify-center">
	<Card.Root class="w-[350px]">
		<Card.Header>
			<Card.Title>Reset email send!</Card.Title>
			<Card.Description
				>Check you e-mail and press the reset link, to change your password.</Card.Description
			>
		</Card.Header>

		<Card.Footer class="flex justify-between">
			<Button
				on:click={() => {
					goto('/signin');
				}}
				class="ml-auto">Return to signin</Button
			>
		</Card.Footer>
	</Card.Root>
</div>
