import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { adminDB, adminStripe } from '$lib/server/admin';
import { json } from '@sveltejs/kit';

export const load = (async ({ locals, cookies }) => {
	const uid = locals.userId;
	if (!uid) {
		console.log('no uid ❌');
		throw redirect(302, '/checkout/account ');
	}
	const puchase = cookies.get('cart');
	if (!puchase || puchase.length === 0) {
		console.log('no puchase ❌');
		throw redirect(302, '/checkout');
	}

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

	//get the user from firebase
	const userRef = await adminDB.collection('users').doc(uid).get();
	const user = userRef.data();

	const session = await adminStripe.checkout.sessions.create({
		line_items: lineItems,
		metadata: { firebaseUID: uid },
		currency: 'dkk',
		mode: 'payment',
		customer: user?.stripeCustomerId,
		success_url: `${YOUR_DOMAIN}/thanks`,
		cancel_url: `${YOUR_DOMAIN}/cancel`
	});

	return { session: session };
}) satisfies PageServerLoad;
