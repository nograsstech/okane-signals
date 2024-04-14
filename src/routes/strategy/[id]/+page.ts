import type { KeyStrategyBacktestStats } from '@/interfaces/strategy.js';
import { error } from '@sveltejs/kit';

// export const ssr = false
// export const csr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const strategyID = params.id;

	if (strategyID) {
		const basePath = '/api/strategy?';
		const params = new URLSearchParams({ id: strategyID });
		return {
			backtestData: fetch(basePath + params).then((res) => res.json()) as Promise<KeyStrategyBacktestStats[]>,
		};
	}

	error(404, 'Not found');
}
