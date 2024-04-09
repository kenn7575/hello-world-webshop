import type { RequestHandler } from './$types';
import { adminStripe as stripe } from '$lib/server/admin';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import Stripe from 'stripe';
import { error, json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';
import { user } from '$lib/functions/firebase';
import type { LineItem } from '$lib/types';
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
	console.log('event \n', event);
	console.log('\n \n \n \n \n \n \n \n \n \n \n \n \n ');

	if (event.type === 'checkout.session.completed') {
		// get data object
		const session = event.data.object as Stripe.Checkout.Session;
		const firebaseUID = session.metadata?.firebaseUID as string;

		addPurchaseToUser(firebaseUID, session);
	}

	// return a 200 with an empty JSON response
	return json({ success: true, status: 200 });
};

async function addPurchaseToUser(firebaseUID: string, session: Stripe.Checkout.Session) {
	const firebaseUserRef = adminDB.collection('users').doc(firebaseUID);
	const firebaseUserPurchasesRef = firebaseUserRef.collection('purchases');

	const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent as string);
	const charge = await stripe.charges.retrieve(paymentIntent.latest_charge as string);

	const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

	await firebaseUserPurchasesRef.add({
		stripe_checkout_session_id: session.id,
		stripe_charge_id: charge.id,
		stripe_payment_intent_id: paymentIntent.id,
		refunded: false,
		amount: session.amount_total,
		date: session.created,
		lineItems: lineItems.data.map((item) => {
			return {
				amount: item.amount_total,
				quantity: item.quantity,
				product_id: item.price?.metadata?.firebase_product_id as string,
				stripe_line_item_id: item.id as string,
				stripe_prod_id: item.price?.product as string,
				stripe_price_id: item.price?.id as string,
				refunded: false
			};
		})
	});
}
