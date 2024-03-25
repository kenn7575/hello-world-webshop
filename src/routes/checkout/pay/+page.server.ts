import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, cookies }) => {
	const uid = locals.userId;
	if (!uid) {
		console.log('no uid ❌');
		throw redirect(302, '/checkout/account ');
	}
	const puchase = cookies.get('cart');
	if (!puchase || puchase.length === 0) {
		console.log('no puchase ❌');
		throw redirect(302, '/checkout');
	}
}) satisfies PageServerLoad;
