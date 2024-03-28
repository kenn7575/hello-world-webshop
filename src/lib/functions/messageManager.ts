// import { writable } from 'svelte/store';
// import type { Message, MessageNoId } from '$lib/types';

// // Custom store for managing toast messages
// function toastStore() {
// 	// Create a writable store for holding messages
// 	const { subscribe, update } = writable<Message[]>([]);

// 	// Function to add a new message to the store
// 	const addMessage = (messageNoId: MessageNoId) => {
// 		// Generate a random ID
// 		const id = Math.floor(Math.random() * 1000);

// 		// Add the message to the store
// 		const message = { ...messageNoId, id };

// 		update((messages) => [...messages, message]);

// 		// Automatically dismiss the message after the specified timeout
// 		setTimeout(() => dismissMessage(message), message.timeout);
// 	};

// 	// Function to dismiss a message from the store
// 	const dismissMessage = (message: Message) => {
// 		update((messages) => messages.filter((m) => m !== message));
// 	};

// 	return {
// 		subscribe,
// 		addMessage,
// 		dismissMessage
// 	};
// }

// // Create an instance of the store
// export const messages = toastStore();
