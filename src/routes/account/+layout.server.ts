import type { LayoutServerLoad } from './$types';
import { adminDB } from '$lib/server/admin';
import { redirect } from '@sveltejs/kit';
import type { Purchase, UserData } from '$lib/types';

export const load = (async ({ locals, url }) => {
	const uid = locals.userId;
	if (!uid) {
		const fromURL = url.pathname;
		throw redirect(302, '/signin?redirect=' + fromURL);
	}
	//get user docs
	const userRef = await adminDB.collection('users').doc(uid);
	const userSnapshot = await userRef.get();
	const user = userSnapshot.data() as UserData;
	const purchaseRef = await userRef.collection('purchases');
	const purchaseSnapshot = await purchaseRef.get();
	const purchases = purchaseSnapshot.docs.map((doc) => doc.data()) as Purchase[];
	//add id to purchases
	purchases.forEach((purchase, index) => {
		purchase.id = purchaseSnapshot.docs[index].id;
	});

	return { user, purchases };
}) satisfies LayoutServerLoad;
