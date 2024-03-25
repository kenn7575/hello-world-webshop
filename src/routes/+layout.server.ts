import { adminDB } from '$lib/server/admin';
import type { LayoutServerLoad } from './$types';
import type { CartItem } from '$lib/types';

export const load = (async ({ cookies }) => {
	//also get all products for the catalog
	const productsRef = await adminDB.collection('products').get();
	const catalog = productsRef.docs.map((doc) => doc.data()) as CartItem[];
	catalog.forEach((product, index) => {
		product.id = productsRef.docs[index].id;
	});

	const productIds = cookies.get('cart');
	if (productIds && productIds.length > 0) {
		const colRef = await adminDB.collection('products').get();
		let products = colRef.docs.map((doc) => doc.data());
		//get ids and add to products
		products.forEach((product, index) => {
			product.id = colRef.docs[index].id;
		});
		const cart = products.filter((product) => productIds.includes(product.id));

		return { cart, products: catalog };
	}

	//retreive all purchases documents from users collection

	return {
		products: catalog
	};
}) satisfies LayoutServerLoad;
