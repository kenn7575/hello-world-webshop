import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	return { purchaseId: params.id };
}) satisfies PageServerLoad;
