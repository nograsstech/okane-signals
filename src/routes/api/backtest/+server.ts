import { error } from '@sveltejs/kit';
import { okaneClient } from '@/okane-finance-api/oakne-client.js';
import type { BacktestResponseDTO } from '@/okane-finance-api/generated/index.js';
import { db } from '@/drizzle/db.js';
import { backtestStats } from '@/drizzle/schema.js';

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
			...backtest_data.data,
			ticker: backtest_data.data.ticker,
			strategy,
			period,
			interval,
			start_time: backtest_data.data.startTime,
			end_time: backtest_data.data.endTime,
		} as unknown as typeof backtestStats.$inferInsert;

		const result = await db.insert(backtestStats).values(data).returning();

		if (!backtest_data) {
			error(400, 'Bad Request');
		}

		return new Response(JSON.stringify(result));
	} catch (e) {
		error(400, `Unable to save backtest data. Error: ${e}`);
	}
}
