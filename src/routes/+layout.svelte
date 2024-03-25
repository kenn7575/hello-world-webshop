<script lang="ts">
	import '../app.pcss';
	import { cart } from '$lib/functions/shoppingCart';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	const cartData = data.cart as CartItem[] | null;
	if (cartData) $cart = cartData;

	import { messages } from '$lib/functions/messageManager';
	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import {
		Sun,
		Moon,
		GithubLogo,
		HamburgerMenu,
		Person,
		Check,
		ExclamationTriangle,
		Cross2
	} from 'radix-icons-svelte';
	import * as Dialog from '$lib/components/ui/dialog';
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

	import { beforeNavigate, afterNavigate } from '$app/navigation';

	import gsap from 'gsap/dist/gsap';
	import Flip from 'gsap/dist/Flip';

	let state: any;

	gsap.registerPlugin(Flip);
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

	import { flip } from 'svelte/animate';
</script>

<div class="fixed bottom-4 right-4 z-40">
	{#if $cart.length > 0}
		{#each $messages as message (message.id)}
			<div in:fly={{ y: 200, opacity: 0.5 }} class="transition-all duration-500" animate:flip>
				<Alert.Root class="w-96">
					{#if message.type === 'warning'}
						<ExclamationTriangle class="w-6 h-6 !text-error" />
					{:else if message.type === 'success'}
						<Check class="w-6 h-6 !text-success" />
					{:else}
						<Cross2 class="w-6 h-6 !text-error" />
					{/if}
					<Alert.Title>{message.title}</Alert.Title>
					<Alert.Description>{message.text}</Alert.Description>
				</Alert.Root>
			</div>
		{/each}
	{/if}
</div>

<ModeWatcher />
<nav class="w-full sticky top-0 bg-background z-50">
	<div class="w-full px-4 items-center flex justify-between h-16">
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button size="icon" builders={[builder]} variant="outline">
					<HamburgerMenu class="h-[1.2rem] w-[1.2rem]" />
					<span class="sr-only">Open side menu</span>
				</Button>
			</Sheet.Trigger>

			<Sheet.Content side="left">
				<Sheet.Header>
					<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
					<Sheet.Description>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</Sheet.Description>
				</Sheet.Header>
				<!-- more... -->
			</Sheet.Content>
		</Sheet.Root>
		<div class="hidden md:flex gap-4">
			<Button variant="ghost" href="/">Products</Button>
			<Button variant="ghost" href="/about" class=" duration-300">About</Button>
			<Button variant="ghost" href="/support" class=" duration-300">Support</Button>
		</div>

		<div class="flex gap-2">
			<Button
				target="_blank"
				href="https://github.com/kenn7575/Stripe-webshop"
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
			{#if !$user}
				<Button href="/signin" variant="secondary" class="flex gap-3">
					<Person class="h-[1.2rem] w-[1.2rem]" />
					Sign in

					<span class="sr-only">Sign in</span>
				</Button>
			{:else}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} href="/signin" variant="secondary" class="flex gap-3">
							<Person class="h-[1.2rem] w-[1.2rem] line-clamp-1" />
							{$user.displayName}

							<span class="sr-only">Sign in</span>
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
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="23.3984"
						height="20.5762"
					>
						<g>
							<rect height="20.5762" opacity="0" width="23.3984" x="0" y="0" />
							<path
								d="M7.93945 15.8301L19.3359 15.8301C19.7168 15.8301 20.0488 15.5176 20.0488 15.0977C20.0488 14.6777 19.7168 14.3652 19.3359 14.3652L8.10547 14.3652C7.54883 14.3652 7.20703 13.9746 7.11914 13.3789L5.51758 2.50977C5.41992 1.75781 5.14648 1.37695 4.15039 1.37695L0.722656 1.37695C0.332031 1.37695 0 1.71875 0 2.10938C0 2.50977 0.332031 2.85156 0.722656 2.85156L4.02344 2.85156L5.58594 13.5742C5.79102 14.9609 6.52344 15.8301 7.93945 15.8301ZM6.14258 12.3535L19.3555 12.3535C20.7812 12.3535 21.5137 11.4746 21.7188 10.0781L22.5 4.91211C22.5195 4.78516 22.5391 4.62891 22.5391 4.54102C22.5391 4.07227 22.1875 3.75 21.6504 3.75L5.29297 3.75L5.30273 5.22461L20.8789 5.22461L20.1855 9.90234C20.1074 10.5078 19.7852 10.8887 19.209 10.8887L6.12305 10.8887ZM8.71094 20.5762C9.58984 20.5762 10.293 19.8828 10.293 18.9941C10.293 18.1152 9.58984 17.4121 8.71094 17.4121C7.82227 17.4121 7.11914 18.1152 7.11914 18.9941C7.11914 19.8828 7.82227 20.5762 8.71094 20.5762ZM17.8418 20.5762C18.7305 20.5762 19.4336 19.8828 19.4336 18.9941C19.4336 18.1152 18.7305 17.4121 17.8418 17.4121C16.9629 17.4121 16.25 18.1152 16.25 18.9941C16.25 19.8828 16.9629 20.5762 17.8418 20.5762Z"
								fill="#ffffff"
								fill-opacity="0.85"
							/>
						</g>
					</svg>
					Shopping cart

					<span class="sr-only">Cart</span>
				</Button>

				{#if $page.route.id !== '/checkout'}
					<div class="w-96 hidden group-hover:flex flex-col absolute right-0 transition-opacity">
						<span class="bg-transparent w-full h-4" />
						<Card.Root>
							<Card.Header>
								<Card.Title>Shopping cart</Card.Title>
								<Card.Description>You have added {$cart.length} to the cart</Card.Description>
							</Card.Header>
							<Separator />

							<Card.Content class="mt-2">
								{#if $cart.length === 0}
									<Card.Description>Your cart is empty</Card.Description>
								{:else}
									<div class="flex flex-col gap-2">
										{#each $cart as item}
											<div class="flex justify-between items-center gap-2">
												<img class="w-5 h-5" src={item.image_small} alt="" />
												<p class="text-start w-full">{item.title}</p>
												<p>{item.price},-</p>
											</div>
										{/each}
									</div>
								{/if}
							</Card.Content>
							{#if $cart.length > 0}
								<Separator />
								<Card.Footer class="mt-2">
									<div class="flex justify-between gap-2 w-full items-center">
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
<slot />
