import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const puchase = cookies.get('puchase');
	if (puchase) {
		return { puchase: JSON.parse(puchase) };
	}
	return {};
}) satisfies PageServerLoad;
