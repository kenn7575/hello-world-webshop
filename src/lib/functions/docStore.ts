import { doc, onSnapshot } from 'firebase/firestore';
import { writable } from 'svelte/store';
import { firebaseDb } from '$lib/functions/firebase';

export function docStore<T>(path: string) {
	let unsubscribe: () => void;

	const docRef = doc(firebaseDb, path);

	const { subscribe } = writable<T | null>(null, (set) => {
		unsubscribe = onSnapshot(docRef, (snapshot) => {
			set((snapshot.data() as T) ?? null);
		});

		return () => unsubscribe();
	});

	return {
		subscribe,
		ref: docRef,
		id: docRef.id
	};
}
