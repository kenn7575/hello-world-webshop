import type { RequestHandler } from './$types';

import { adminDB } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import type { Purchase } from '$lib/types';
import { adminStripe } from '$lib/server/admin';

export const GET: RequestHandler = async ({ params, locals }) => {
	if (!params.id) throw error(400, 'Not found');
	if (!locals.userId) throw error(401, 'Unauthorized');

	const purchaseId = params.id;

	const purchaseRef = await locals.userRef.collection('purchases').doc(purchaseId);
	const purchaseSnapshot = await purchaseRef.get();
	if (!purchaseSnapshot.exists) throw error(404, 'Not found');
	const purchase = purchaseSnapshot.data() as Purchase;

	purchase.id = purchaseSnapshot.id;
	purchase.session = await adminStripe.checkout.sessions.retrieve(
		purchase.stripe_checkout_session_id
	);
	purchase.paymentIntent = await adminStripe.paymentIntents.retrieve(
		purchase.stripe_payment_intent_id
	);
	purchase.charge = await adminStripe.charges.retrieve(purchase.stripe_charge_id);
	return json(purchase);
};
