import { redirect, type RequestHandler } from '@sveltejs/kit';
import pako from 'pako';

export const GET: RequestHandler = async ({ params, fetch, locals }) => {
	const session = await locals.auth();
	if (!session) {
		throw redirect(303, '/signin');
	}

	const strategyID = params.id;

	if (strategyID) {
		const basePath = '/api/strategy?';
		const params = new URLSearchParams({ id: strategyID, html: 'true' });
		const strategyList = await fetch(basePath + params);
		const data = await strategyList.json();

		try {
			// Example compressed data (base64 encoded, from Python)
			const compressedBase64 = data[0].html;

			// Decode the base64 string to a byte array
			const compressedData = Uint8Array.from(atob(compressedBase64), (c) => c.charCodeAt(0));

			// Decompress the data using pako
			const decompressedData = pako.inflate(compressedData, { to: 'string' });

			// Return the HTML content directly
			return new Response(decompressedData, {
				headers: { 'Content-Type': 'text/html' }
			});
		} catch (error) {
			console.error('Decompression failed:', error);
			return new Response('Decompression failed', { status: 500 });
		}
	}

	return new Response('Not found', { status: 404 });
};
