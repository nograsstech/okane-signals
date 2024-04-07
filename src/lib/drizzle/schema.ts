import { pgTable, serial, text, varchar, numeric, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	fullName: text('full_name'),
	phone: varchar('phone', { length: 256 })
});

export const backtestStats = pgTable('backtest_stats', {
  ticker: text('ticker'),
  maxDrawdownPercentage: numeric('max_drawdown_percentage'),
  start_time: text('start'),
  end_time: text('end'),
  duration: text('duration'),
  exposureTimePercentage: numeric('exposure_time_percentage'),
  finalEquity: numeric('final_equity'),
  peakEquity: numeric('peak_equity'),
  returnPercentage: numeric('return_percentage'),
  buyAndHoldReturn: numeric('buy_and_hold_return'),
  returnAnnualized: numeric('return_annualized'),
  volatilityAnnualized: numeric('volatility_annualized'),
  sharpeRatio: numeric('sharpe_ratio'),
  sortinoRatio: numeric('sortino_ratio'),
  calmarRatio: numeric('calmar_ratio'),
  averageDrawdownPercentage: numeric('average_drawdown_percentage'),
  maxDrawdownDuration: text('max_drawdown_duration'),
  averageDrawdownDuration: text('average_drawdown_duration'),
  tradeCount: numeric('trade_count'),
  winRate: numeric('win_rate'),
  bestTrade: numeric('best_trade'),
  worstTrade: numeric('worst_trade'),
  avgTrade: numeric('avg_trade'),
  maxTradeDuration: text('max_trade_duration'),
  averageTradeDuration: text('average_trade_duration'),
  profitFactor: numeric('profit_factor'),
  html: text('html'),
  created_at: timestamp('created_at')
});