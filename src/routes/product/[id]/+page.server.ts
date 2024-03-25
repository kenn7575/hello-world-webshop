import type { PageServerLoad } from './$types';
import { adminDB } from '$lib/server/admin';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	const productId = params.id;
	const docRef = await adminDB.collection('products').doc(productId).get();
	const product = docRef.data();
	if (!product) throw error(400, 'Product not found');
	product.id = docRef.id;

	//get users/uid/purchases docs
	const uid = locals.userId;
	if (uid) {
		const userRef = await adminDB.collection('users').doc(uid);
		const purchaseRef = await userRef.collection('purchases');
		const purchaseSnapshot = await purchaseRef.get();
		const purchases = purchaseSnapshot.docs.map((doc) => doc.data());
		return { product, purchases };
	} else {
		return { product };
	}
}) satisfies PageServerLoad;
