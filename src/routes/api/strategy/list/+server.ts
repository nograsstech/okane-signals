import { db } from '@/drizzle/db.js';
import { backtestStats } from '@/drizzle/schemas/backtestStats';
import { json } from '@sveltejs/kit';

export async function GET({ setHeaders }) {
	const strategyList = await db
		.selectDistinct({
			id: backtestStats.id,
			start_time: backtestStats.startTime,
			end_time: backtestStats.endTime,
			ticker: backtestStats.ticker,
			strategy: backtestStats.strategy,
			period: backtestStats.period,
			interval: backtestStats.interval,
			averageDrawdownPercentage: backtestStats.averageDrawdownPercentage,
			maxDrawdownDuration: backtestStats.maxDrawdownDuration,
			duration: backtestStats.duration,
			returnPercentage: backtestStats.returnPercentage,
			returnAnnualized: backtestStats.returnAnnualized,
			buyAndHoldReturn: backtestStats.buyAndHoldReturn,
			sharpeRatio: backtestStats.sharpeRatio,
			sortinoRatio: backtestStats.sortinoRatio,
			calmarRatio: backtestStats.calmarRatio,
			winRate: backtestStats.winRate,
			avgTrade: backtestStats.avgTrade,
			worstTrade: backtestStats.worstTrade,
			notificationsOn: backtestStats.notificationsOn,
			bestTrade: backtestStats.calmarRatio,
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

	setHeaders({ 'cache-control': 'max-age=20' });

  // Convert the map to an array
  const uniqueStrategyList = Array.from(strategyMap.values());

	return json(uniqueStrategyList);
}
