<script lang="ts">
	// Components
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import StrategyStatCard from './strategy-stat-card.svelte';
	import IntervalIcon from 'lucide-svelte/icons/timer-reset';

	// Types
	import type { KeyStrategyBacktestStats } from '@/interfaces/strategy';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Props
	export let backtestData: KeyStrategyBacktestStats;
</script>

<Card.Root>
	<Card.Header class="flex flex-col md:flex-row justify-between items-start">
		<div class="w-fit">
			<Card.Title class="w-fit text-xl">{backtestData.ticker} | {backtestData.strategy}</Card.Title>
			<Card.Description class="w-fit">Card Description</Card.Description>
		</div>
		<Button variant="secondary" href={`/strategy/${backtestData.id}/backtest`} target="_blank" class="mt-0">
			View Backtest Performance
		</Button>
	</Card.Header>
  
	<Card.Content>
		<div
			class="flex flex-wrap gap-4"
			transition:fly={{
				delay: 0,
				duration: 600,
				x: 0,
				y: 50,
				opacity: 0,
				easing: quintOut
			}}
		>
			<StrategyStatCard
				field="Period"
				value={backtestData.period}
				description={`${new Date(backtestData.startTime).toLocaleString()} -> ${new Date(backtestData.endTime).toLocaleString()}`}
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Interval"
				value={backtestData.interval}
				description="The interval in which the price data is pulled"
				icon={IntervalIcon}
			/>
		</div>

    <hr class="mt-6 mx-[-24px]"/>

		<h3 class="py-4 text-lg font-semibold">Returns</h3>
		<div
			class="flex flex-wrap gap-4"
			transition:fly={{
				delay: 200,
				duration: 600,
				x: 0,
				y: 50,
				opacity: 0,
				easing: quintOut
			}}
		>
			<StrategyStatCard
				field="Return %"
				value={parseFloat(backtestData.returnPercentage.toString())}
				description="Return percentage within this trading period"
				textColor={parseFloat(backtestData.returnPercentage.toString()) < 0
					? 'negative'
					: 'positive'}
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Buy and Hold Return %"
				value={parseFloat(backtestData.buyAndHoldReturn.toString())}
				description="How much you would gain / lose if you bought and held the asset for the same period"
				textColor={parseFloat(backtestData.buyAndHoldReturn.toString()) < 0
					? 'negative'
					: 'positive'}
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Hypothetical Annual Return %"
				value={parseFloat(backtestData.returnAnnualized.toString())}
				description="How much you would hypothetically gain / lose if you follow this trading strategy for a year"
				textColor={parseFloat(backtestData.returnAnnualized.toString()) < 0
					? 'negative'
					: 'positive'}
				icon={IntervalIcon}
			/>
		</div>

		<h3 class="py-4 text-lg font-semibold">Drawdown</h3>
		<div
			class="flex flex-wrap gap-4"
			transition:fly={{
				delay: 300,
				duration: 600,
				x: 0,
				y: 50,
				opacity: 0,
				easing: quintOut
			}}
		>
			<StrategyStatCard
				field="Max Drawdown %"
				value={parseFloat(backtestData.maxDrawdownPercentage.toString())}
				description="Maximum drawdown percentage"
				textColor={parseFloat(backtestData.maxDrawdownPercentage.toString()) < 0
					? 'negative'
					: 'positive'}
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Max Drawdown %"
				value={parseFloat(backtestData.averageDrawdownPercentage.toString())}
				description="Maximum drawdown percentage"
				textColor={parseFloat(backtestData.averageDrawdownPercentage.toString()) < 0
					? 'negative'
					: 'positive'}
				icon={IntervalIcon}
			/>
		</div>

		<h3 class="py-4 text-lg font-semibold">Performance</h3>
		<div
			class="flex flex-wrap gap-4"
			transition:fly={{
				delay: 400,
				duration: 600,
				x: 0,
				y: 50,
				opacity: 0,
				easing: quintOut
			}}
		>
			<StrategyStatCard
				field="Sharpe Ratio"
				value={parseFloat(backtestData.sharpeRatio.toString())}
				description="A higher Sharpe ratio indicates better risk-adjusted performance"
				textColor="neutral"
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Sortino Ratio"
				value={parseFloat(backtestData.sortinoRatio.toString())}
				description="A higher Sortino ratio indicates better risk-adjusted performance, specifically in terms of downside risk"
				textColor="neutral"
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Calmar Ratio"
				value={parseFloat(backtestData.calmarRatio.toString())}
				description="Average compounded annual rate of return to its maximum drawdown"
				textColor="neutral"
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Win Rate %"
				value={parseFloat(backtestData.winRate.toString())}
				description="Percentage of capital"
				textColor="neutral"
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Average Trade %"
				value={parseFloat(backtestData.avgTrade.toString())}
				description="Percentage of capital"
				textColor="neutral"
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Worst Trade %"
				value={parseFloat(backtestData.worstTrade.toString())}
				description="Percentage of capital"
				textColor="neutral"
				icon={IntervalIcon}
			/>
			<StrategyStatCard
				field="Best Trade %"
				value={parseFloat(backtestData.bestTrade.toString())}
				description="Percentage of capital"
				textColor="neutral"
				icon={IntervalIcon}
			/>
		</div>
	</Card.Content>
</Card.Root>
