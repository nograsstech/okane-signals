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
	| 'html'
>;
export interface KeyStrategyBacktestStats extends BacktestStatPicked {
	id: string;
	strategy: string;
	period: string;
	interval: string;
	created_at: Date;
}
