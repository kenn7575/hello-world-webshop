// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userId: string | null;
			user: UserData;
			userRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
