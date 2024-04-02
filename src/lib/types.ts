import type { Stripe } from 'stripe';

export interface CartItem {
	id: string;
	image: string;
	image_small: string;
	title: string;
	price: number;
	description: string;
	stripe_prod_id: string;
	stripe_price_id: string;
}
export interface Product extends CartItem {
	file: string;
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
	stripe_checkout_session_id: string;
	stripe_charge_id: string;
	stripe_payment_intent_id: string;
	amount: number;
	date: number;
	lineItems: LineItem[];
	session?: Stripe.Checkout.Session;
	paymentIntent?: Stripe.PaymentIntent;
	charge?: Stripe.Charge;
}
export interface LineItem {
	amount: string;
	quantity: number;
	product_id: string;
	stripe_prod_id: string;
	stripe_price_id: string;
	stripe_line_item_id: string;
}
