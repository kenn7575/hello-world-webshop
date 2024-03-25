import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ url, params }) => {
	//if url is /products redirect to /
	const urlPath = url.pathname;

	if (urlPath === '/product') {
		console.log('redirecting to /');
		throw redirect(302, '/');
	}
}) satisfies PageServerLoad;
