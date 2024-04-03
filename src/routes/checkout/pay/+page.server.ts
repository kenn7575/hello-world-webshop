import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { adminDB, adminStripe } from '$lib/server/admin';

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

	try {
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
			cancel_url: `${YOUR_DOMAIN}/account`,
			automatic_tax: { enabled: true },
			//update customer address if needed
			shipping_address_collection: {
				allowed_countries: [
					'AU',
					'AT',
					'BE',
					'BG',
					'CA',
					'CL',
					'CO',
					'HR',
					'CY',
					'CZ',
					'DK',
					'EE',
					'FI',
					'FR',
					'DE',
					'GR',
					'HK',
					'HU',
					'IS',
					'ID',
					'IE',
					'IT',
					'JP',
					'LV',
					'LT',
					'LU',
					'MY',
					'MT',
					'MX',
					'NL',
					'NZ',
					'NO',
					'PL',
					'PT',
					'RO',
					'SA',
					'SG',
					'SK',
					'SI',
					'ZA',
					'KR',
					'ES',
					'SE',
					'CH',
					'TH',
					'TR',
					'AE',
					'US',
					'VN',
					'GB'
				]
			},
			customer_update: {
				address: 'auto',
				shipping: 'auto'
			}
		});

		return { session: session };
	} catch (err) {
		console.log('error ❌', err);
		throw error(500, 'Internal Server Error');
	}
}) satisfies PageServerLoad;
