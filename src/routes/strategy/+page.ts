import type { KeyStrategyBacktestStats } from '@/interfaces/strategy';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, setHeaders }) {
	try {
		const strategyListRequest = await fetch(`/api/strategy/list`);
		
		if (!strategyListRequest.ok) {
			throw error(strategyListRequest.status, "Could not fetch movies")
		}
		
		const data: KeyStrategyBacktestStats[] = await strategyListRequest.json();
		
		setHeaders({ "cache-control": "max-age=20" })
		
		return {
			strategyList: data
		};
	} catch (error) {
		// redirect
		redirect(307, '/signin');
	}
}
