import { adminAuth } from '$lib/server/admin';
import type { Handle } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';
import type { UserData } from '$lib/types';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('__session');

	try {
		const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
		event.locals.userId = decodedClaims.uid;
		const userRef = await adminDB.collection('users').doc(decodedClaims.uid);
		const userSnapshot = await userRef.get();
		const user = userSnapshot.data() as UserData;
		event.locals.user = user;
		event.locals.userRef = userRef;
	} catch (e) {
		event.locals.userId = null;
		return resolve(event);
	}
	return resolve(event);
}) satisfies Handle;
