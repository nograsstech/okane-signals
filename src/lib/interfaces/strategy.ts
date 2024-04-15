import type { BacktestStats } from '@/okane-finance-api/generated';

type BacktestStatPicked = Pick<
	BacktestStats,
	| 'ticker'
	| 'startTime'
	| 'endTime'
	| 'averageDrawdownPercentage'
	| 'maxDrawdownPercentage'
	| 'duration'
	| 'returnPercentage'
	| 'returnAnnualized'
	| 'buyAndHoldReturn'
	| 'sharpeRatio'
	| 'sortinoRatio'
	| 'calmarRatio'
	| 'winRate'
	| 'avgTrade'
	| 'worstTrade'
	| 'bestTrade'
	| 'html'
>;
export interface KeyStrategyBacktestStats extends BacktestStatPicked {
	id: string;
	strategy: string;
	period: string;
	interval: string;
	created_at: Date;
}
