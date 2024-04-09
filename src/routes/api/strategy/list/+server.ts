import { db } from '@/drizzle/db.js';
import { backtestStats } from '@/drizzle/schema.js';
import { json } from '@sveltejs/kit';

export async function GET() {
	const strategyList = await db
		.selectDistinct({
			id: backtestStats.id,
			ticker: backtestStats.ticker,
			strategy: backtestStats.strategy,
			period: backtestStats.period,
			interval: backtestStats.interval,
			averageDrawdownPercentage: backtestStats.averageDrawdownPercentage,
			duration: backtestStats.duration,
			returnPercentage: backtestStats.returnPercentage,
			buyAndHoldReturn: backtestStats.buyAndHoldReturn,
			sharpeRatio: backtestStats.sharpeRatio,
			sortinoRatio: backtestStats.sortinoRatio,
			calmarRatio: backtestStats.calmarRatio,
			created_at: backtestStats.created_at
		})
		.from(backtestStats);

	// For each entry, only the return the latest backtest data based on the created_at timestamp
	const strategyMap = new Map();
	for (const item of strategyList) {
		const key = `${item.ticker}-${item.strategy}-${item.period}-${item.interval}`;
		if (
			item.created_at !== null &&
			(!strategyMap.has(key) || strategyMap.get(key).created_at < item.created_at)
		) {
			strategyMap.set(key, item);
		}
	}

  // Convert the map to an array
  const uniqueStrategyList = Array.from(strategyMap.values());

	return json(uniqueStrategyList);
}
