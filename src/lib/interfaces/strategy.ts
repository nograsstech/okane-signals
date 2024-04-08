import type { BacktestStats } from '@/okane-finance-api/generated';

type BacktestStatPicked = Pick<
	BacktestStats,
	| 'ticker'
	| 'averageDrawdownPercentage'
	| 'duration'
	| 'returnPercentage'
	| 'buyAndHoldReturn'
	| 'sharpeRatio'
	| 'sortinoRatio'
	| 'calmarRatio'
>;
export interface KeyStrategyBacktestStats extends BacktestStatPicked {
	strategy: string;
	period: string;
	interval: string;
	created_at: Date;
}
