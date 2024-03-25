<script lang="ts">
	import type { CartItem } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	const cartData = data.puchase as CartItem[];

	import { Confetti } from 'svelte-confetti';
	import Image from '$lib/img/Successful-purchase.svg';

	import { Button } from '$lib/components/ui/button';
</script>

<div class="reduce-motion">
	<div
		class="fixed w-screen h-screen -top-12 flex justify-center overflow-hidden pointer-events-none"
	>
		>
		<Confetti
			colorArray={['#E01D47', '#1DE03C', '#E0AE1D', '#1D45E0', '#8B4151']}
			x={[-5, 5]}
			y={[0, 0.1]}
			delay={[0, 5000]}
			duration={5000}
			amount={500}
			fallDistance="100vh"
			size={16}
		/>
	</div>
</div>

<div class="w-full flex justify-center items-center flex-col py-16 gap-2">
	<div class=" w-fit relative">
		<h1 class="text-4xl font-semibold text-center">Thanks you for your purchase</h1>
	</div>
	<h2>Your products will be available in your account page.</h2>

	<Button class="mt-8" href="/account">View account</Button>

	<img src={Image} class="w-[32rem] object-contain" alt="Shopping cart celebration" />
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		.reduce-motion {
			display: none;
		}
	}
</style>
