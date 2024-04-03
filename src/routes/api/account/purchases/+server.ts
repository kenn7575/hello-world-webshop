import type { RequestHandler } from './$types';
import { adminDB } from '$lib/server/admin';
import { redirect, json, error } from '@sveltejs/kit';
import type { Purchase, UserData } from '$lib/types';
import { adminStripe } from '$lib/server/admin';

export const GET: RequestHandler = async ({ locals, url }) => {
	const uid = locals.userId;
	if (!uid) {
		const fromURL = url.pathname;
		throw redirect(302, '/signin?redirect=' + fromURL);
	}
	try {
		//get user docs
		const purchaseRef = await locals.userRef.collection('purchases');
		const purchaseSnapshot = await purchaseRef.get();
		const purchases = purchaseSnapshot.docs.map((doc) => doc.data()) as Purchase[];

		//add id to purchases
		for (let index = 0; index < purchases.length; index++) {
			purchases[index].id = purchaseSnapshot.docs[index].id;
			purchases[index].session = await adminStripe.checkout.sessions.retrieve(
				purchases[index].stripe_checkout_session_id
			);
		}

		return json(purchases);
	} catch (err) {
		console.error(err);
		return error(500, 'Internal Server Error');
	}
};
