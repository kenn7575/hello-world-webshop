import type { LayoutServerLoad } from './$types';
import { adminDB } from '$lib/server/admin';
import { redirect } from '@sveltejs/kit';
import type { Purchase, UserData } from '$lib/types';
import { adminStripe } from '$lib/server/admin';

export const load = (async ({ locals, url }) => {
	// const uid = locals.userId;
	// if (!uid) {
	// 	const fromURL = url.pathname;
	// 	throw redirect(302, '/signin?redirect=' + fromURL);
	// }
	// //get user docs
	// const purchaseRef = await locals.userRef.collection('purchases');
	// const purchaseSnapshot = await purchaseRef.get();
	// const purchases = purchaseSnapshot.docs.map((doc) => doc.data()) as Purchase[];
	// //add id to purchases
	// for (let index = 0; index < purchases.length; index++) {
	// 	purchases[index].id = purchaseSnapshot.docs[index].id;
	// 	purchases[index].session = await adminStripe.checkout.sessions.retrieve(
	// 		purchases[index].stripe_checkout_session_id
	// 	);
	// 	// purchases[index].charge = await adminStripe.charges.retrieve(purchases[index].stripe_charge_id);
	// 	purchases[index].paymentIntent = await adminStripe.paymentIntents.retrieve(
	// 		purchases[index].stripe_payment_intent_id as string
	// 	);
	// 	purchases[index].charge = await adminStripe.charges.retrieve(
	// 		purchases[index].paymentIntent?.latest_charge as string
	// 	);
	// }
	// return { user: locals.user, purchases };
}) satisfies LayoutServerLoad;
