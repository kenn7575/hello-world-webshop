import type { RequestHandler } from './$types';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
const stripe = new Stripe(SECRET_STRIPE_KEY);
import { error, json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';
import { user } from '$lib/functions/firebase';
export const POST: RequestHandler = async ({ request }) => {
	// extract body
	const body = await request.text();

	// get the signature from the header
	const signature = request.headers.get('stripe-signature');
	if (!signature) {
		throw error(400, 'Invalid request');
	}

	// var to hold event data
	let event;

	// verify it
	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET) as Stripe.Event;
	} catch (err: any) {
		// signature is invalid!
		console.warn('⚠️  Webhook signature verification failed.', err.message);

		// return, because it's a bad request
		throw error(400, 'Invalid request');
	}

	//get the customer id

	if (event.type === 'charge.succeeded') {
		// get data object
		const charge = event.data.object as Stripe.Charge;
		const firebaseUID = charge.metadata.firebaseUID;
		const userRef = await adminDB.collection('users').doc(firebaseUID);
		const purchaseRef = await userRef.collection('purchases');
		const ids = JSON.parse(charge.metadata.cart ?? '[]') as string[];
		ids.forEach(async (id) => {
			await purchaseRef.add({
				charge_id: charge.id,
				created: charge.created,
				product_id: id,
				amount: charge.amount,
				currency: charge.currency
			});
		});
	}

	// return a 200 with an empty JSON response
	return json({ success: true, status: 200 });
};
