import { onSnapshot, collection, where, query, orderBy } from 'firebase/firestore';
import { firebaseDb } from '../functions/firebase';
import { writable } from 'svelte/store';

// Custom store to get a document from Firestore
export function colStore<T>(path: string, filters?: any[], _orderBy?: any) {
	let unsubscribe: () => void;

	// ! Get a reference to the firestore collection
	const collectionRef = collection(firebaseDb, path);

	// Create a query based on the provided filters and orderBy
	let _query;
	if (filters && filters.length === 3) {
		_query = query(
			collectionRef,
			where(filters[0], filters[1], filters[2]),
			orderBy(_orderBy, 'asc')
		);
	} else {
		_query = collectionRef;
	}

	// ! writable store
	const { subscribe } = writable<T | null>(null, (set) => {
		// ! Firebase onSnapshot listener to get the documents
		unsubscribe = onSnapshot(_query, (snapshot) => {
			const documents = [];
			snapshot.forEach((doc) => {
				documents.push({ ...doc.data(), id: doc.id });
			});
			// ! Update the store
			set(documents as T | null);
		});
		// ! Unsubscribe from the onSnapshot listener when the store is unsubscribed
		return () => unsubscribe();
	});
	return {
		subscribe
	};
}
