//svelte writable
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CartItem, Purchase } from '$lib/types';

import { toast } from 'svelte-sonner';
export const cart = writable([]) as Writable<CartItem[]>;
export async function addItemToCart(product: CartItem) {
	let cartItems: CartItem[] = [];
	cart.update((items) => {
		//if item already exists in cart, increase quantity
		const existingItem = items.find((item) => item.id === product.id);
		if (existingItem) {
			toast('Item was already in cart', {
				duration: 4000,
				description: 'you can now go to the checkout page to complete your order'
			});

			cartItems = [...items];
			return cartItems;
		} else {
			toast('Item added to cart', {
				duration: 4000,
				description: 'you can now go to the checkout page to complete your order'
			});
			cartItems = [
				...items,
				{
					id: product.id,
					title: product.title,
					price: product.price,
					image: product.image,
					image_small: product.image_small,
					description: product.description,
					stripe_prod_id: product.stripe_prod_id,
					stripe_price_id: product.stripe_price_id
				}
			];

			return cartItems;
		}
	});

	// update localstorage
	const priceIds = cartItems.map((item) => item.stripe_price_id);
	document.cookie = `cart=${JSON.stringify(priceIds)}; path=/; samesite=strict; secure=true`;
}

export async function removeItemFromCart(id: string) {
	// update cart
	let cartItems: CartItem[] = [];
	cart.update((items) => {
		cartItems = items.filter((item) => item.id !== id);
		return cartItems;
	});

	// update localstorage
	const priceIds = cartItems.map((item) => item.stripe_price_id);
	document.cookie = `cart=${JSON.stringify(priceIds)}; path=/; samesite=strict; secure=true`;
}
