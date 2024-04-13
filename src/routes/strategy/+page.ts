import type { KeyStrategyBacktestStats } from '@/interfaces/strategy';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	try {
		const strategyList = await fetch(`/api/strategy/list`);
		const data: KeyStrategyBacktestStats[] = await strategyList.json();
		return {
			strategyList: data
		};
	} catch (error) {
		// redirect
		redirect(307, '/signin');
	}
}
