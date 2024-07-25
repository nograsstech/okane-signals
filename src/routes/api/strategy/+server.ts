import { error, json } from '@sveltejs/kit';
import { okaneClient } from '@/okane-finance-api/oakne-client.js';
import type { BacktestResponseDTO } from '@/okane-finance-api/generated/index.js';
import { db } from '@/drizzle/db.js';
import { backtestStats } from '@/drizzle/schemas/backtestStats';
import { and, desc, eq, getTableColumns } from 'drizzle-orm';

/** @type {import('./$types').RequestHandler} */
/**
 * Performs a GET request to retrieve backtest data based on the provided parameters.
 * @param {Object} options - The options object containing the URL and other parameters.
 * @param {URL} options.url - The URL object containing the query parameters.
 * @returns {Promise<Response>} A promise that resolves to the backtest data response.
 */
export async function GET({ url, setHeaders }) {
	const ticker = url.searchParams.get('ticker') ?? '';
	const period = url.searchParams.get('period') ?? '';
	const interval = url.searchParams.get('interval') ?? '';
	const strategy = url.searchParams.get('strategy') ?? '';
	const strategyID = url.searchParams.get('id') ?? '';
	const withHTML = url.searchParams.get('html') ?? '';

	////////
	// Fetch for existing backtest data using strategyID, if provided and if exists in the DB
	////////

	if (strategyID) {
		const { html, ...rest } = getTableColumns(backtestStats);
		const selectParam = withHTML ? { html, ...rest } : rest;

		setHeaders({ 'cache-control': 'max-age=20' });
		
		const strategy = await db
			.select(selectParam)
			.from(backtestStats)
			.where(and(
				eq(backtestStats.id, Number(strategyID)) // Convert strategyID to number
			))
			.limit(1);
		if (!strategy.length) {
			error(404, 'Not Found');
		}
		return json(strategy);
	
	}

	if (!ticker || !period || !interval || !strategy) {
		error(400, 'Bad Request');
	}
	////////
	// If there's no strategyID provided, fetch the backtest data using the ticker, period, interval, and strategy
	////////

	// Fetch for existing backtest data using ticker, strategy, period, and interval
	const existingBacktestData = await db
		.select()
		.from(backtestStats)
		.where(
			and(
				eq(backtestStats.ticker, ticker),
				eq(backtestStats.period, period),
				eq(backtestStats.interval, interval),
				eq(backtestStats.strategy, strategy)
			)
		)
		.orderBy(desc(backtestStats.created_at))
		.limit(1);

	const today = new Date();
	today.setHours(0, 0, 0, 0); // set the time to 00:00:00

	const createdAt = existingBacktestData[0]?.created_at;
	if (createdAt) {
		createdAt.setHours(0, 0, 0, 0); // set the time to 00:00:00
	}

	console.log("💀", existingBacktestData)

	if (existingBacktestData.length && createdAt && +createdAt === +today) {
		setHeaders({ 'cache-control': 'max-age=20' });
		return json(existingBacktestData);
	}

	////////
	// If there's no existing backtest data, fetch the new backtest data from the Okane Finance API
	////////

	try {
		const backtest_data: BacktestResponseDTO = await okaneClient.backtestSignalsBacktestGet({
			ticker,
			period,
			interval,
			strategy
		});

		// Save the backtest data to the database
		const data = {
			...backtest_data.data,
			ticker: backtest_data.data.ticker,
			strategy,
			period,
			interval,
			start_time: backtest_data.data.startTime,
			end_time: backtest_data.data.endTime
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
