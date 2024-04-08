import type { KeyStrategyBacktestStats } from '@/interfaces/strategy';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const strategyList = await fetch(`/api/backtest/list`);
	const data: KeyStrategyBacktestStats[] = await strategyList.json();

	return {
		strategyList: data
	};
}
