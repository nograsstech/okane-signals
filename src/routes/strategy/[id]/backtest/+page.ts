import type { KeyStrategyBacktestStats } from '@/interfaces/strategy.js';
import { error } from '@sveltejs/kit';
import pako from 'pako';

// export const ssr = false
export const csr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const strategyID = params.id;

	if (strategyID) {
		const basePath = '/api/strategy?';
		const params = new URLSearchParams({ id: strategyID, html: 'true' });
		const strategyList = await fetch(basePath + params);
		const data: KeyStrategyBacktestStats[] = await strategyList.json();
		try {
			// Example compressed data (base64 encoded, from Python)
			const compressedBase64 = data[0].html;

			// Decode the base64 string to a byte array
			const compressedData = Uint8Array.from(atob(compressedBase64), (c) => c.charCodeAt(0));

			// Decompress the data using pako
			const decompressedData = pako.inflate(compressedData, { to: 'string' });
			return {
				backtestHTML: decompressedData
			};
		} catch (error) {
			console.error('Decompression failed:', error);
		}
	}

	error(404, 'Not found');
}
