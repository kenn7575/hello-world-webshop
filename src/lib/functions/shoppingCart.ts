//svelte writable
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CartItem, Purchase } from '$lib/types';
import { messages } from '$lib/functions/messageManager';

export const cart = writable([]) as Writable<CartItem[]>;
export async function addItemToCart(product: CartItem) {
	let cartItems: CartItem[] = [];
	cart.update((items) => {
		//if item already exists in cart, increase quantity
		const existingItem = items.find((item) => item.id === product.id);
		if (existingItem) {
			messages.addMessage({
				title: 'Item was already in cart',
				text: 'you can now go to the checkout page to complete your order',
				type: 'success',
				timeout: 4000
			});
			cartItems = [...items];
			return cartItems;
		} else {
			messages.addMessage({
				title: 'Item added to cart',
				text: 'you can now go to the checkout page to complete your order',
				type: 'success',
				timeout: 4000
			});
			cartItems = [
				...items,
				{
					id: product.id,
					title: product.title,
					price: product.price,
					image: product.image,
					image_small: product.image_small,
					description: product.description
				}
			];
			return cartItems;
		}
	});

	// update localstorage
	const ids = cartItems.map((item) => item.id);
	document.cookie = `cart=${JSON.stringify(ids)}; path=/; samesite=strict; secure=true`;
}
export async function removeItemFromCart(id: string) {
	// update cart
	let cartItems: CartItem[] = [];
	cart.update((items) => {
		cartItems = items.filter((item) => item.id !== id);
		return cartItems;
	});

	// update localstorage
	const ids = cartItems.map((item) => item.id);
	document.cookie = `cart=${JSON.stringify(ids)}; path=/; samesite=strict; secure=true`;
}
