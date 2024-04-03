// src/routes/api/generate-pdf.ts
import { error, json, type RequestHandler } from '@sveltejs/kit';
import puppeteer from 'puppeteer';

export const GET: RequestHandler = async ({ url }) => {
	const webpageUrl = url.searchParams.get('url');
	if (!webpageUrl) {
		return error(400, 'Bad Request: Missing URL query parameter');
	}
	console.log('webpageUrl', webpageUrl);
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(webpageUrl, { waitUntil: 'networkidle2' });
		// await page.waitForNetworkIdle({ idleTime: 500 });

		const pdf = await page.pdf();

		await browser.close();

		return new Response(pdf);
	} catch (err) {
		console.error(err);
		return error(500, 'Internal Server Error');
	}
};
