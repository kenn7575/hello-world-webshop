<script lang="ts">
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
	import '../app.pcss';
	import { cart } from '$lib/functions/shoppingCart';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	const cartData = data.cart as CartItem[] | null;
	if (cartData) $cart = cartData;
	$: console.log($cart, 'cart');
	$: console.log(data, 'data');

	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon, GithubLogo, HamburgerMenu, Person } from 'radix-icons-svelte';
	import {
		CircleHelp,
		Github,
		Handshake,
		Instagram,
		Linkedin,
		LogIn,
		ShoppingBag,
		ShoppingCart,
		UserRound
	} from 'lucide-svelte';

	import { toggleMode } from 'mode-watcher';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Separator } from '$lib/components/ui/separator';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { page } from '$app/stores';
	import { user, signOutUser } from '$lib/functions/firebase';
	import * as Card from '$lib/components/ui/card';
	import type { CartItem } from '$lib/types';
	import * as Alert from '$lib/components/ui/alert';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import gsap from 'gsap/dist/gsap';
	import Flip from 'gsap/dist/Flip';
	import { Toaster } from '$lib/components/ui/sonner';
	let state: any;

	onMount(() => {
		gsap.registerPlugin(Flip);
	});
	beforeNavigate(() => {
		state = Flip.getState('.cover');
	});

	afterNavigate(() => {
		if (state) {
			Flip.from(state, {
				duration: 0.5,
				ease: 'easeInOut',
				scale: true,
				targets: '.cover',
				simple: true
			});
		}
	});

	function totalPrice(items: CartItem[]) {
		if (items.length === 0) return 0;
		return Math.round(items.reduce((acc, item) => acc + item.price, 0) * 100) / 100;
	}

	let showSheet = false;
</script>

<Toaster />
<ModeWatcher />
<nav class="sticky top-0 z-50 w-full bg-background">
	<div class="flex h-16 w-full items-center justify-between px-4">
		<Sheet.Root bind:open={showSheet}>
			<Sheet.Trigger asChild let:builder>
				<Button size="icon" builders={[builder]} variant="outline">
					<HamburgerMenu class="h-[1.2rem] w-[1.2rem]" />
					<span class="sr-only">Open side menu</span>
				</Button>
			</Sheet.Trigger>

			<Sheet.Content side="left">
				<Sheet.Header>
					<Sheet.Title></Sheet.Title>
					<Sheet.Description class="flex flex-col gap-2">
						<Button
							variant="outline"
							size="lg"
							class="mt-8 w-full  justify-start gap-8 "
							href="/"
							on:click={() => (showSheet = false)}
						>
							<ShoppingBag class="h-6 w-6" />
							Products
						</Button>
						<Button
							variant="outline"
							size="lg"
							class=" w-full  justify-start gap-8 "
							href="/account"
							on:click={() => (showSheet = false)}
						>
							<UserRound class="h-6 w-6" />
							Account
						</Button>
						<Button
							variant="outline"
							size="lg"
							class="w-full  justify-start gap-8"
							href="/about"
							on:click={() => (showSheet = false)}
						>
							<CircleHelp class="h-6 w-6" />
							About
						</Button>
						<Button
							variant="outline"
							size="lg"
							class="w-full  justify-start gap-8"
							href="/support"
							on:click={() => (showSheet = false)}
						>
							<Handshake class="h-6 w-6" />
							Support
						</Button>
					</Sheet.Description>
				</Sheet.Header>
				<!-- more... -->
			</Sheet.Content>
		</Sheet.Root>
		<div class="hidden gap-4 md:flex">
			<Button variant="ghost" href="/">Products</Button>
			<Button variant="ghost" href="/about" class=" duration-300">About</Button>
			<Button variant="ghost" href="/support" class=" duration-300">Support</Button>
		</div>

		<div class="flex gap-2">
			<Button
				target="_blank"
				href="https://github.com/kenn7575/hello-world-webshop"
				variant="outline"
				size="icon"
			>
				<GithubLogo class="h-[1.2rem] w-[1.2rem]" />
				<span class="sr-only">Link to github repo</span>
			</Button>

			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
			{#if !$user && !data.user}
				<Button href="/signin" variant="secondary" class="flex  gap-3">
					<LogIn class="h-[1.2rem] w-[1.2rem]" />
					<span class="hidden sm:block"> Sign in </span>
					<span class="sr-only">Sign in</span>
				</Button>
			{:else if $user || data.user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} href="/signin" variant="secondary" class="flex gap-3">
							<Person class="line-clamp-1 h-[1.2rem] w-[1.2rem]" />
							<span class="hidden sm:block">{$user?.displayName || data.user?.displayName}</span>

							<span class="sr-only">
								Logged in as {$user?.displayName || data.user?.displayName}
							</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56">
						<DropdownMenu.Item href="/account" class="cursor-pointer">My account</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={signOutUser} class="cursor-pointer ">
							Log out
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}

			<div class="group relative">
				<Button href="/checkout" class="flex gap-3 ">
					<ShoppingCart class="h-5 w-5" />
					<strong>
						{$cart.length}
					</strong>

					<span class="sr-only">Cart</span>
				</Button>

				{#if $page.route.id !== '/checkout'}
					<div class="absolute right-0 hidden w-96 flex-col transition-opacity group-hover:flex">
						<span class="h-4 w-full bg-transparent" />
						<Card.Root>
							<Card.Header>
								<Card.Title>Shopping cart</Card.Title>
								<Card.Description
									>{$cart.length > 0
										? `You have added ${$cart.length} to the cart`
										: ''}</Card.Description
								>
							</Card.Header>
							<Separator />

							<Card.Content class="mt-2">
								{#if $cart.length === 0}
									<Card.Description>Your cart is empty</Card.Description>
								{:else}
									<div class="flex flex-col gap-2">
										{#each $cart as item}
											<div class="flex items-center justify-between gap-2">
												<img class="h-5 w-5" src={item.image_small} alt="" />
												<p class="w-full text-start">{item.title}</p>
												<p>{item.price},-</p>
											</div>
										{/each}
									</div>
								{/if}
							</Card.Content>
							{#if $cart.length > 0}
								<Separator />
								<Card.Footer class="mt-2">
									<div class="flex w-full items-center justify-between gap-2">
										<p><strong>{totalPrice($cart)} DKK</strong></p>

										<Button href="/checkout">Checkout</Button>
									</div>
								</Card.Footer>
							{/if}
						</Card.Root>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<Separator />
</nav>
<main class="w-screen overflow-hidden px-2 md:px-4">
	<slot />
</main>
<!-- <div class="clip h-40 bg-secondary"></div>
 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"
	><path
		class="fill-secondary"
		fill-opacity="1"
		d="M0,288L120,272C240,256,480,224,720,213.3C960,203,1200,213,1320,218.7L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
	></path></svg
>
<footer
	class=" flex min-h-72 w-full items-center bg-secondary px-4 text-secondary-foreground sm:px-8"
>
	<div class="flex w-full flex-wrap items-start justify-around gap-4">
		<div>
			<strong>Pages</strong>
			<ul class="mt-4 flex flex-col gap-4">
				<li>
					<Button
						variant="link"
						href="/"
						class="h-min p-0 text-secondary-foreground/80 hover:underline">Products</Button
					>
				</li>
				<li>
					<Button
						variant="link"
						href="/account"
						class="h-min p-0 text-secondary-foreground/80 hover:underline">Account</Button
					>
				</li>
				<li>
					<Button
						variant="link"
						href="/about"
						class="h-min p-0 text-secondary-foreground/80 hover:underline"
					>
						About
					</Button>
				</li>
				<li>
					<Button
						variant="link"
						href="/support"
						class="h-min p-0 text-secondary-foreground/80 hover:underline"
					>
						Support
					</Button>
				</li>
			</ul>
		</div>
		<div>
			<strong>Legal</strong>
			<ul class="mt-4 flex flex-col gap-4">
				<li>
					<Button
						variant="link"
						href="/terms"
						class="h-min p-0 text-secondary-foreground/80 hover:underline"
					>
						Terms of service
					</Button>
				</li>
				<li>
					<Button
						variant="link"
						href="/privacy"
						class="h-min p-0 text-secondary-foreground/80 hover:underline"
					>
						Privacy policy
					</Button>
				</li>
			</ul>
		</div>
		<div>
			<strong>Support</strong>
			<ul class="mt-4 flex flex-col gap-4">
				<li>
					<Button
						variant="link"
						href="/support/q-and-a"
						class="h-min p-0 text-secondary-foreground/80 hover:underline"
					>
						Q & A
					</Button>
				</li>
				<li>
					<Button
						variant="link"
						href="/support/refund"
						class="h-min p-0 text-secondary-foreground/80 hover:underline"
					>
						Refund
					</Button>
				</li>
				<li>
					<Button
						variant="link"
						href="/support/contact"
						class="h-min p-0 text-secondary-foreground/80 hover:underline"
					>
						Contact
					</Button>
				</li>
			</ul>
		</div>
		<div>
			<strong>Socials</strong>
			<ul class="mt-4 flex flex-col gap-2">
				<li>
					<a href="https://www.linkedin.com/in/kenni-kollemorten/">
						<Linkedin class="h-6 w-6 text-secondary-foreground" />
					</a>
				</li>
				<li>
					<a href="https://www.github.com/kenn7575">
						<Github class="h-6 w-6 text-secondary-foreground" />
					</a>
				</li>
				<li>
					<a href="https://www.instagram.com/kennikollemorten/">
						<Instagram class="h-6 w-6 text-secondary-foreground" />
					</a>
				</li>
			</ul>
		</div>
	</div>
</footer>

<style>
	.clip {
		clip-path: polygon(52% 84%, 68% 92%, 100% 81%, 100% 100%, 0 100%, 0 84%, 16% 95%);
	}
</style>
