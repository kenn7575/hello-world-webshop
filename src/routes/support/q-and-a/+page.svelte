<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-center p-2 sm:p-4">
	<h1 class="mt-8 text-3xl font-bold">Welcome to the Q&A</h1>
	<p class="text-muted-foreground">Get the answers to all your questions.</p>

	<div class="w-full py-16 sm:max-w-[70%]">
		<h2 class="mr-auto text-xl font-bold">Products</h2>
		<Accordion.Root class=" w-full">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>What do I get?</Accordion.Trigger>
				<Accordion.Content
					>You get the source code, to print out <b>"hello world"</b> in specific the programming language,
					you purchased. The code can be downloaded as a file or viewed on your account page.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Where do I access my purchases?</Accordion.Trigger>
				<Accordion.Content>
					When your purchase is completed, you can access your purchases in your account. Go to your
					account where you can find your purchased products and a complete order history. Go to
					your <Button href="/account" variant="link" class="p-0 text-blue-500">account</Button>.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>What if am not satisfied with the product?</Accordion.Trigger>
				<Accordion.Content>
					If you are not satisfied with the product, you can request a refund from the support page.
					See more <Button href="/support/refund" variant="link" class="p-0 text-blue-500"
						>Here</Button
					>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<h2 class="mr-auto mt-16 text-xl font-bold">Refunds</h2>
		<Accordion.Root class="w-full  ">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Can I refund my purchase?</Accordion.Trigger>
				<Accordion.Content
					>Yes, we have free refunds. And we guarantee 100% customer satisfaction. If you are not
					satisfied with the product, you can request a refund from the support page. See more <Button
						href="/support/refund"
						variant="link"
						class="p-0 text-blue-500">Here</Button
					>.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2">
				<Accordion.Trigger>Where do I access my purchases?</Accordion.Trigger>
				<Accordion.Content>
					When your purchase is completed, you can access your purchases in your account. Go to your
					account where you can find your purchased products and a complete order history. Go to
					your <Button href="/account" variant="link" class="p-0 text-blue-500">account</Button>.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3">
				<Accordion.Trigger>What if am not satisfied with the product?</Accordion.Trigger>
				<Accordion.Content>
					If you are not satisfied with the product, you can request a refund from the support page.
					See more <Button href="/support/refund" variant="link" class="p-0 text-blue-500"
						>Here</Button
					>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<h2 class="mr-auto mt-16 text-xl font-bold">Company</h2>
		<Accordion.Root class=" w-full  ">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Who are we?</Accordion.Trigger>
				<Accordion.Content>
					My name is <b>Kenni Kollemorten</b> and I am the creator of this website. I am a
					full-stack web developer and I wanted to create a Stripe-powered webshop. I didn't exactly
					have anything to sell so I decided to sell the source code to print out "Hello World" in
					different programming languages. I hope you enjoy the website. Feel free to reach out to
					me on
					<Button
						href="https://www.linkedin.com/in/kenni-kollemorten/"
						variant="link"
						class="p-0 text-blue-500">LinkedIn</Button
					>.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>

		<h2 class="mr-auto mt-16 text-xl font-bold">Privacy & Data Protection</h2>
		<Accordion.Root class=" w-full  ">
			<Accordion.Item value="item-1">
				<Accordion.Trigger>Do we use cookies?</Accordion.Trigger>
				<Accordion.Content>
					<b>YES!</b> But only for storing your shopping cart items and other essential features
					necessary for the application to work. We may also use cookies for analytics, and crash
					reports. We do not use cookies for marketing or tracking. See our <Button
						href="/privacy"
						variant="link"
						class="p-0 text-blue-500">Privacy Policy</Button
					> for more information.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</div>
</div>
