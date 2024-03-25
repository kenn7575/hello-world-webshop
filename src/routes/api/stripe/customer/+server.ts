import type { RequestHandler } from './$types';
import { adminStripe, adminDB } from '$lib/server/admin';
import type Stripe from 'stripe';
import { json } from '@sveltejs/kit';
import type { User } from 'firebase/auth';

export const POST: RequestHandler = async ({ request }) => {
	const user = (await request.json()) as User;
	const email = user.email?.toString();

	const userRef = await adminDB.collection('users').doc(user.uid);
	const userSnapshot = await userRef.get();

	//get reference to user in firestore instead
	if (userSnapshot.exists) {
		// ? user exists
		const { stripeCustomerId } = userSnapshot.data() ?? {};
		if (!stripeCustomerId) {
			// ? user exists but missing stripeCustomerId
			const customer = (await adminStripe.customers.create({
				email,
				metadata: {
					firebaseUID: user.uid
				},
				name: user.displayName?.toString(),
				phone: user.phoneNumber?.toString()
			})) as Stripe.Customer;
			const data = {
				stripeCustomerId: customer.id,
				uid: user.uid,
				email,
				displayName: user.displayName,
				phoneNumber: user.phoneNumber,
				purchases: []
			};

			await userRef.set(data);
			return json(customer);
		} else {
			// ? user exists and has stripeCustomerId
			return json(await adminStripe.customers.retrieve(stripeCustomerId));
		}
	} else {
		// ? user does not exist
		const customer = (await adminStripe.customers.create({
			email,
			metadata: {
				firebaseUID: user.uid
			},
			name: user.displayName?.toString(),
			phone: user.phoneNumber?.toString()
		})) as Stripe.Customer;

		// ? create user in firestore
		const data = {
			stripeCustomerId: customer.id,
			uid: user.uid,
			email,
			displayName: user.displayName,
			phoneNumber: user.phoneNumber,
			purchases: []
		};
		await userRef.set(data);
		return json(customer);
	}
};
