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
	| 'tpslRatio'
	| 'slCoef'
	| 'notificationsOn'
>;
export interface KeyStrategyBacktestStats extends BacktestStatPicked {
	id: string;
	strategy: string;
	period: string;
	interval: string;
	created_at: Date;
	updated_at: Date;
	tpsl_ratio: number;
	slCoef: number;
	'✨': string;
	'🔔': string;
	'notificationsOn': boolean;
}

export interface TradeAction {
	id: string;
	crated_at: Date;
	backtest_id: string;
	datetime: Date;
	trade_action: string;
	entry_price: number;
	price: number;
	sl: number;
	tp: number;
	size: number;
}