import type { RequestHandler } from './$types';
import { adminStripe } from '$lib/server/admin';
import { error, json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';

export const DELETE: RequestHandler = async ({ url, locals }) => {
	const chargeId = url.searchParams.get('chargeId');
	const firebasePurchaseId = url.searchParams.get('sessionId');
	if (!chargeId && !firebasePurchaseId) {
		return error(400, 'Bad Request: Missing URL query parameter');
	}
	try {
		const charge = await adminStripe.charges.retrieve(chargeId as string);

		if (!charge) {
			return error(404, 'Charge not found');
		}
		if (charge.refunded) {
			return error(400, 'Charge already refunded');
		}

		//check if the purchase exists
		const purchaseRef = locals.userRef.collection('purchases').doc(firebasePurchaseId as string);
		const purchase = await purchaseRef.get();
		if (!purchase.exists) {
			return error(404, 'Purchase not found');
		}
		//update the doc's
		await purchaseRef.update({ refunded: true });

		const refund = await adminStripe.refunds.create({
			charge: charge.id
		});
		return json(refund);
	} catch (err) {
		console.error(err);
		return error(500, 'Internal Server Error');
	}
};
