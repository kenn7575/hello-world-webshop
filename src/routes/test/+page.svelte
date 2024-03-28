<script lang="ts">
	import { goto } from '$app/navigation';

	function makeLinkAndGoto(url: string) {
		const link = document.createElement('a');
		link.href = url;
		link.target = '_blank';
		link.click();
	}
</script>

<button
	on:click={async () => {
		const res = await fetch('/api/stripe/payment-flow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.ok) {
			const session = await res.json();

			makeLinkAndGoto(session.url);
		}
	}}>PAY</button
>
