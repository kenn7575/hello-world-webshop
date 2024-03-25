import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import { adminAuth } from '$lib/server/admin';

export const POST: RequestHandler = async ({ cookies, request }) => {
	const { idToken } = await request.json();
	const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
	const decodedToken = await adminAuth.verifyIdToken(idToken);

	if (new Date().getTime() / 1000 - decodedToken.auth_time < 5 * 60) {
		const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
		const options = {
			maxAge: expiresIn,
			httpOnly: true,
			secure: true,
			path: '/'
		};

		cookies.set('__session', cookie, options);
		return json({ status: 'signedIn' });
	} else {
		throw error(401, 'Require recent login');
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete('__session', { path: '/' });
	return json({ status: 'signedOut' });
};
