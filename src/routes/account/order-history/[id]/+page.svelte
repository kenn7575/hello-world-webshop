<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log('🚀 ~ data:', data);

	async function getPurchase(id: string) {
		// const response = await fetch(`/api/account/purchases/${id}`);
		// const json = await response.json();
		// if (response.ok) {
		// 	console.log('🚀 ~ data:', json);
		// 	const data: Purchase = json;
		// 	return data;
		// } else {
		// 	throw new Error(json.message);
		// }
		return {
			date: 1712141989,
			lineItems: [
				{
					amount: 250,
					quantity: 1,
					stripe_line_item_id: 'li_1P1RXlBT36pHQIUNXvTCEckI',
					stripe_prod_id: 'prod_PoE3cwbHncVXgh',
					product_id: 'MO2FAYfguBV80XEekQXn',
					stripe_price_id: 'price_1OybbTBT36pHQIUNP1uHCqCT'
				}
			],
			amount: 250,
			stripe_payment_intent_id: 'pi_3P1Rc0BT36pHQIUN1KzzPYMi',
			refunded: false,
			stripe_checkout_session_id:
				'cs_test_a1aGip9MhIzbcBynqC5xAuo5noH4BD98XacqcHHl9Lw8zX4Czz1bVbKMQh',
			stripe_charge_id: 'py_3P1Rc0BT36pHQIUN1glBVclZ',
			id: 'Ama9n6Sy0Vo8Aqxb7Abm',
			session: {
				id: 'cs_test_a1aGip9MhIzbcBynqC5xAuo5noH4BD98XacqcHHl9Lw8zX4Czz1bVbKMQh',
				object: 'checkout.session',
				after_expiration: null,
				allow_promotion_codes: null,
				amount_subtotal: 250,
				amount_total: 250,
				automatic_tax: {
					enabled: true,
					liability: {
						type: 'self'
					},
					status: 'complete'
				},
				billing_address_collection: null,
				cancel_url: 'http://localhost:5173/account',
				client_reference_id: null,
				client_secret: null,
				consent: null,
				consent_collection: null,
				created: 1712141989,
				currency: 'dkk',
				currency_conversion: null,
				custom_fields: [],
				custom_text: {
					after_submit: null,
					shipping_address: null,
					submit: null,
					terms_of_service_acceptance: null
				},
				customer: 'cus_Pr9q3GN2Jo1TfT',
				customer_creation: null,
				customer_details: {
					address: {
						city: null,
						country: 'DK',
						line1: null,
						line2: null,
						postal_code: null,
						state: null
					},
					email: 'kenn7575@gmail.com',
					name: 'Kenni Kollemorten',
					phone: null,
					tax_exempt: 'none',
					tax_ids: []
				},
				customer_email: null,
				expires_at: 1712228389,
				invoice: null,
				invoice_creation: {
					enabled: false,
					invoice_data: {
						account_tax_ids: null,
						custom_fields: null,
						description: null,
						footer: null,
						issuer: null,
						metadata: {},
						rendering_options: null
					}
				},
				livemode: false,
				locale: null,
				metadata: {
					firebaseUID: 'TDk2L6MA7LNm9gUHXVBk50V2kah1'
				},
				mode: 'payment',
				payment_intent: 'pi_3P1Rc0BT36pHQIUN1KzzPYMi',
				payment_link: null,
				payment_method_collection: 'if_required',
				payment_method_configuration_details: {
					id: 'pmc_1OJY8xBT36pHQIUNfHqGjBvS',
					parent: null
				},
				payment_method_options: {},
				payment_method_types: ['card', 'klarna', 'link'],
				payment_status: 'paid',
				phone_number_collection: {
					enabled: false
				},
				recovered_from: null,
				setup_intent: null,
				shipping_address_collection: {
					allowed_countries: ['DK', 'SE', 'NO', 'FI']
				},
				shipping_cost: null,
				shipping_details: {
					address: {
						city: 'Svendborg',
						country: 'DK',
						line1: 'Kullinggade 6a',
						line2: null,
						postal_code: '5700',
						state: ''
					},
					name: 'kenni kollemorten'
				},
				shipping_options: [],
				status: 'complete',
				submit_type: null,
				subscription: null,
				success_url: 'http://localhost:5173/thanks',
				total_details: {
					amount_discount: 0,
					amount_shipping: 0,
					amount_tax: 0
				},
				ui_mode: 'hosted',
				url: null
			},
			paymentIntent: {
				id: 'pi_3P1Rc0BT36pHQIUN1KzzPYMi',
				object: 'payment_intent',
				amount: 250,
				amount_capturable: 0,
				amount_details: {
					tip: {}
				},
				amount_received: 250,
				application: null,
				application_fee_amount: null,
				automatic_payment_methods: null,
				canceled_at: null,
				cancellation_reason: null,
				capture_method: 'automatic',
				client_secret: 'pi_3P1Rc0BT36pHQIUN1KzzPYMi_secret_IiiqR3OiUtfljO4WJlc06KWSp',
				confirmation_method: 'automatic',
				created: 1712142252,
				currency: 'dkk',
				customer: 'cus_Pr9q3GN2Jo1TfT',
				description: null,
				invoice: null,
				last_payment_error: null,
				latest_charge: 'py_3P1Rc0BT36pHQIUN1glBVclZ',
				livemode: false,
				metadata: {},
				next_action: null,
				on_behalf_of: null,
				payment_method: 'pm_1P1Rc0BT36pHQIUN9OwIDFPE',
				payment_method_configuration_details: null,
				payment_method_options: {
					link: {
						persistent_token: null
					}
				},
				payment_method_types: ['link'],
				processing: null,
				receipt_email: 'kenn7575@gmail.com',
				review: null,
				setup_future_usage: null,
				shipping: {
					address: {
						city: 'Svendborg',
						country: 'DK',
						line1: 'Kullinggade 6a',
						line2: null,
						postal_code: '5700',
						state: ''
					},
					carrier: null,
					name: 'kenni kollemorten',
					phone: null,
					tracking_number: null
				},
				source: null,
				statement_descriptor: null,
				statement_descriptor_suffix: null,
				status: 'succeeded',
				transfer_data: null,
				transfer_group: null
			},
			charge: {
				id: 'py_3P1Rc0BT36pHQIUN1glBVclZ',
				object: 'charge',
				amount: 250,
				amount_captured: 250,
				amount_refunded: 0,
				application: null,
				application_fee: null,
				application_fee_amount: null,
				balance_transaction: 'txn_3P1Rc0BT36pHQIUN1n2Kb8ZL',
				billing_details: {
					address: {
						city: null,
						country: 'DK',
						line1: null,
						line2: null,
						postal_code: null,
						state: null
					},
					email: 'kenn7575@gmail.com',
					name: 'kenni kollemorten',
					phone: null
				},
				calculated_statement_descriptor: null,
				captured: true,
				created: 1712142255,
				currency: 'dkk',
				customer: 'cus_Pr9q3GN2Jo1TfT',
				description: null,
				destination: null,
				dispute: null,
				disputed: false,
				failure_balance_transaction: null,
				failure_code: null,
				failure_message: null,
				fraud_details: {},
				invoice: null,
				livemode: false,
				metadata: {},
				on_behalf_of: null,
				order: null,
				outcome: {
					network_status: 'approved_by_network',
					reason: null,
					risk_level: 'normal',
					risk_score: 6,
					seller_message: 'Payment complete.',
					type: 'authorized'
				},
				paid: true,
				payment_intent: 'pi_3P1Rc0BT36pHQIUN1KzzPYMi',
				payment_method: 'pm_1P1Rc0BT36pHQIUN9OwIDFPE',
				payment_method_details: {
					link: {
						country: 'US'
					},
					type: 'link'
				},
				radar_options: {},
				receipt_email: 'kenn7575@gmail.com',
				receipt_number: null,
				receipt_url:
					'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xT0dnTFNCVDM2cEhRSVVOKMCVtbAGMgbgm2RWFJA6LBbH5GDYvGI_O-zgOWAEzrlkvwHHoFPVjyXr7xRdF9jHYy7UPWoKS1dDw1M5',
				refunded: false,
				review: null,
				shipping: {
					address: {
						city: 'Svendborg',
						country: 'DK',
						line1: 'Kullinggade 6a',
						line2: null,
						postal_code: '5700',
						state: ''
					},
					carrier: null,
					name: 'kenni kollemorten',
					phone: null,
					tracking_number: null
				},
				source: null,
				source_transfer: null,
				statement_descriptor: null,
				statement_descriptor_suffix: null,
				status: 'succeeded',
				transfer_data: null,
				transfer_group: null
			}
		};
	}

	import type { CartItem, Purchase } from '$lib/types';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { uppercaseFirstLetter, unixToDate, stringShortner, getCartItem } from '$lib/utils';
	import { ArrowLeft, ClipboardList, LoaderCircle, TriangleAlert } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	function createReceipt(url: string | string | undefined | null) {
		if (!url) {
			toast.error('Sorry, no receipt was found', {
				duration: 5000,
				description: 'Contact support for help!'
			});
			return;
		}
		loading = true;

		fetch(`/api/receipts?url=${encodeURIComponent(url)}`) // Ensure URL is encoded
			.then((response) => response.blob())
			.then((data) => {
				let blob = new Blob([data], { type: 'octet/stream' });
				console.log('🚀 ~ .then ~ blob:', blob);
				// Create a URL for the blob
				const blobUrl = window.URL.createObjectURL(blob); // Changed variable name to `blobUrl`
				console.log('🚀 ~ .then ~ blobUrl:', blobUrl); // Log using the updated variable name
				// Create a link to download it
				const a = document.createElement('a');
				a.href = blobUrl; // Use the updated variable name
				a.download = 'webpage.pdf';
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(blobUrl); // Use the updated variable name for cleanup
				document.body.removeChild(a);
				loading = false;
			})
			.catch((error) => console.error('Error:', error));
	}

	let loading: boolean = false;
</script>

<div class="mx-auto flex w-full max-w-5xl flex-col gap-4">
	<Button variant="outline" class="w-fit gap-1  pr-6">
		<ArrowLeft class="h-4 w-4" />
		Back
	</Button>
	{#await getPurchase(data.purchaseId)}
		loading
	{:then purchase}
		<div class="flex flex-wrap justify-between gap-4">
			<h2 class="text-3xl">Thank you for your purchase!</h2>
			<div class="flex flex-row items-start gap-4">
				<div class=" flex flex-col gap-2">
					<Badge class="w-fit border-foreground" variant="outline">Status</Badge>
					<p class="text-sm font-normal">{uppercaseFirstLetter(purchase?.session?.status)}</p>
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class="flex flex-col gap-2">
					<Badge class="w-fit border-foreground" variant="outline">Date</Badge>
					<p class="text-sm font-normal">{unixToDate(purchase?.date)}</p>
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class="flex flex-col gap-2">
					<Badge class="w-fit border-foreground" variant="outline">Ordre ID</Badge>
					<div class="flex gap-1">
						<p class="text-sm font-normal lg:hidden">{stringShortner(purchase?.id, 7)}</p>
						<p class="hidden text-sm font-normal lg:block">{purchase?.id}</p>

						<button
							on:click={() => {
								navigator.clipboard.writeText(purchase?.id);
								toast.success(`Copied order ID ${purchase?.id} copied to clipboard`, {
									duration: 5000,
									description: 'You can use this ID to track your order'
								});
							}}
						>
							<ClipboardList class="h-4 w-4" />
						</button>
					</div>
				</div>
				<Separator orientation="vertical" class="h-12 " />
				<div class="flex flex-col gap-2">
					<Badge class="w-fit border-foreground" variant="outline">Receipt</Badge>
					<Button
						disabled={loading}
						variant="link"
						class="h-min p-0 text-sm font-normal text-foreground underline"
						on:click={() => createReceipt(purchase.charge?.receipt_url)}
						>{loading ? 'Processing' : 'Download'}
						<LoaderCircle class="ml-1 h-4 w-4 animate-spin  {loading ? 'block' : 'hidden '}" />
					</Button>
				</div>
			</div>
		</div>
		<div class="grid w-full grid-cols-4 gap-2">
			<Card.Root>
				<Card.Header>
					<Card.Title>Shipping address</Card.Title>
					<Card.Description>Used for tax calculation.</Card.Description>
				</Card.Header>
				<Card.Content class="text-sm">
					<p>
						{purchase.session?.shipping_details?.address?.line1}
					</p>
					<p>
						{purchase.session?.shipping_details?.address?.line2}
					</p>
					<p>
						{purchase.session?.shipping_details?.address?.city}
					</p>
					<p>
						{purchase.session?.shipping_details?.address?.postal_code}
					</p>
					<p>
						{purchase.session?.shipping_details?.address?.country}
					</p>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header>
					<Card.Title>Customer info</Card.Title>
					<Card.Description>Associated with this purchase</Card.Description>
				</Card.Header>
				<Card.Content class="text-sm">
					<div class="grid w-full max-w-sm items-center gap-1.5">
						<Label for="email">Email</Label>
						<Input
							type="email"
							value={purchase.session?.customer_details?.email ?? 'None'}
							id="email"
							disabled={true}
						/>
					</div>
					<div class="grid w-full max-w-sm items-center gap-1.5">
						<Label for="name">Name</Label>
						<Input
							type="text"
							value={purchase.session?.customer_details?.name ?? 'None'}
							id="name"
							disabled={true}
						/>
					</div>
					<div class="grid w-full max-w-sm items-center gap-1.5">
						<Label for="name">Phone</Label>
						<Input
							type={purchase.session?.customer_details?.phone ? 'tel' : 'text'}
							value={purchase.session?.customer_details?.phone ?? 'None'}
							id="name"
							disabled={true}
						/>
					</div>
				</Card.Content>
			</Card.Root>
			<Card.Root class="col-span-2 row-span-2">
				<Card.Header>
					<Card.Title>Customer info</Card.Title>
					<Card.Description>Associated with this purchase</Card.Description>
				</Card.Header>
				<Card.Content class="text-sm">
					{#each purchase.lineItems as lineItem}
						<div class="mt-2 flex items-center gap-4">
							<img
								src={getCartItem(lineItem.product_id, data.products)?.image}
								alt={lineItem.product_id}
								class="aspect-square h-8 w-8 object-contain"
							/>
							<div class="flex flex-col gap-2">
								<p class="text-base font-medium">
									{getCartItem(lineItem.product_id, data.products)?.title}
								</p>
							</div>
						</div>
					{/each}
				</Card.Content>
			</Card.Root>
			<Card.Root class="col-span-2">
				<Card.Header>
					<Card.Title>Refund</Card.Title>
					<Card.Description></Card.Description>
				</Card.Header>
				<Card.Content class="text-sm">
					<p>
						If you want to refund this order, you can do so by clicking the button below. We will
						refund the full amount to your original payment method.
					</p>
					<p>
						Read more about our
						<Button variant="link" class="p-0 underline" href="/refund">refund policy</Button>
					</p>
				</Card.Content>
				<Card.Footer>
					<Button variant="destructive">Refund</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	{:catch error}
		<Alert.Root variant="destructive">
			<TriangleAlert class="h-4 w-4" />
			<Alert.Title>Error</Alert.Title>
			<Alert.Description>{error.message}</Alert.Description>
		</Alert.Root>
	{/await}
</div>
