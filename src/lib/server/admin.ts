import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

import { FB_PROJECT_ID, FB_PRIVATE_KEY, FB_CLIENT_EMAIL } from '$env/static/private';
import pkg from 'firebase-admin';

try {
	// Vercel
	const raw = FB_PRIVATE_KEY;
	const key = raw?.replaceAll('[REPLACE]', '\n');

	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FB_PROJECT_ID,
			privateKey: key,
			clientEmail: FB_CLIENT_EMAIL
		})
	});
} catch (error: any) {
	if (!/already exists/u.test(error.message)) {
		console.error('Firebase admin initialization error', error.stack);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
export const adminStorage = getStorage();

//stripe
import { SECRET_STRIPE_KEY } from '$env/static/private';
import Stripe from 'stripe';
export const adminStripe = new Stripe(SECRET_STRIPE_KEY);
