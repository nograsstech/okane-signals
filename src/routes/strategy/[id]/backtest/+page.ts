import type { KeyStrategyBacktestStats } from '@/interfaces/strategy.js';
import { error } from '@sveltejs/kit';

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
		return {
			backtestData: data
		};
	}

	error(404, 'Not found');
}
