export interface CartItem {
	id: string;
	image: string;
	image_small: string;
	title: string;
	price: number;
	description: string;
}
export interface MessageNoId {
	title: string;
	text: string;
	type: string;
	timeout: number;
}
export interface Message extends MessageNoId {
	id: number;
}
export interface UserData {
	uid: string;
	email: string;
	displayName: string;
	phoneNumber: string;
	purchases: string[];
	stripeCustomerId: string;
}
export interface Purchase {
	id: string;
	charge_id: string;
	amount: number;
	currency: string;
	product_id: string;
	created: number;
}
