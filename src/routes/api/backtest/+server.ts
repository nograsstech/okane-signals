import { error } from '@sveltejs/kit';
import { okaneClient } from '@/okane-finance-api/oakne-client.js';
import { supabase } from '@/supabase/supabaseClient.js';
import type { BacktestResponseDTO, BacktestStats } from '@/okane-finance-api/generated/index.js';

/** @type {import('./$types').RequestHandler} */
/**
 * Performs a GET request to retrieve backtest data based on the provided parameters.
 * @param {Object} options - The options object containing the URL and other parameters.
 * @param {URL} options.url - The URL object containing the query parameters.
 * @returns {Promise<Response>} A promise that resolves to the backtest data response.
 */
export async function GET({ url }) {
	const ticker = url.searchParams.get('ticker') ?? '';
	const period = url.searchParams.get('period') ?? '';
	const interval = url.searchParams.get('interval') ?? '';
	const strategy = url.searchParams.get('strategy') ?? '';

	if (!ticker || !period || !interval || !strategy) {
		error(400, 'Bad Request');
	}

	const backtest_data: BacktestResponseDTO = await okaneClient.backtestSignalsBacktestGet({
		ticker,
		period,
		interval,
		strategy
	});

	try {
		const data = {
			backtest_id: `${ticker}-${strategy}-${new Date().toLocaleDateString()}`,
			period,
			interval,
			strategy,
			...backtest_data.data
		};
	} catch (e) {
		error(400, `Unable to save backtest data. Error: ${e}`);
	}

	if (!backtest_data) {
		error(400, 'Bad Request');
	}

	return new Response(JSON.stringify(backtest_data));
}
