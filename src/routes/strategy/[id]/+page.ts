import type { KeyStrategyBacktestStats, TradeAction } from '@/interfaces/strategy.js';
import type { SignalResponseDTO } from '@/okane-finance-api/generated/index.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, setHeaders }) {
	const strategyID = params.id;

	if (strategyID) {
		const backtestBasePath = '/api/strategy?';
		const signalsBasePath = '/api/strategy/signals?';
		const tradeActionsBasePath = '/api/strategy/tradeActions?';
		const params = new URLSearchParams({ id: strategyID });

		// Backtest Stats
		const backtestPromise = fetch(backtestBasePath + params).then((res) => res.json()) as Promise<
			KeyStrategyBacktestStats[]
		>;

		// Trade Actions
		const tradeActionsPromise = fetch(
			tradeActionsBasePath +
				new URLSearchParams({
					backtest_id: strategyID
				})
		).then((res) => res.json()) as Promise<{ tradeActionsList: TradeAction[]}>;

		setHeaders({ 'cache-control': 'max-age=300' });

		// Return the promises
		return {
			backtestData: backtestPromise,
			signalsData: backtestPromise.then((res: KeyStrategyBacktestStats[]) => {
				const params = new URLSearchParams({
					ticker: res[0].ticker,
					period: res[0].period,
					interval: res[0].interval,
					strategy: res[0].strategy
				});
				return fetch(signalsBasePath + params).then((res) => res.json()) as Promise<{
					signals: SignalResponseDTO;
				}>;
			}),
			tradeActionsData: tradeActionsPromise
		};
	}

	error(404, 'Not found');
}
