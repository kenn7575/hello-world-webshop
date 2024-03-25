import type { RequestHandler } from './$types';
import { adminDB } from '$lib/server/admin';
import { json, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	//get id from body
	const id = request.body ? request.body : null;
	if (!id) throw error(400, 'Missing ID');

	//get user data

	const purchasesRef = await adminDB.collection(id + '/purchases').get();
	const purchases = purchasesRef.docs.map((doc) => doc.data());
	if (purchasesRef.empty) {
		return json({ purchases: [] });
	} else {
		return json({ purchases });
	}
};
