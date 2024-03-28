import type { RequestHandler } from './$types';
import { adminStripe } from '$lib/server/admin';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const cartItemsRaw = cookies.get('cart');
	const cartItemList = cartItemsRaw ? (JSON.parse(cartItemsRaw) as Array<string>) : [];
	const lineItems: Array<{ price: string; quantity: number }> = cartItemList.map((item) => {
		return {
			price: item,
			quantity: 1
		};
	});
	console.log('cartItems from cookies', lineItems);

	const devMode = process.env.NODE_ENV === 'development';
	const YOUR_DOMAIN = devMode ? 'http://localhost:5173' : 'https://webshop.kennik.dk';
	const session = await adminStripe.checkout.sessions.create({
		line_items: lineItems,
		metadata: { data: 'data' },
		currency: 'dkk',
		mode: 'payment',
		success_url: `${YOUR_DOMAIN}/thanks`,
		cancel_url: `${YOUR_DOMAIN}/cancel`,
		automatic_tax: { enabled: true }
	});

	return json(session);
};
