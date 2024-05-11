<!-- MARK: Script -->
<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import Skeleton from '@/components/ui/skeleton/skeleton.svelte';

	// Icons Import
	import BackIcon from 'lucide-svelte/icons/chevron-left';
	import StrategyStats from '@/components/strategy/strategy-stats.svelte';
	import StrategyStatsLoadingSkeleton from '@/components/strategy/strategy-stats-loading-skeleton.svelte';
	import SignalsTable from '@/components/strategy/signals-table.svelte';
	import TableLoadingSkeleton from '@/components/strategy/table-loading-skeleton.svelte';
	import TradeActionsTable from '@/components/strategy/trade-actions-table.svelte';
	import TradingviewIframe from '@/components/iframes/tradingview-iframe.svelte';
	import TradingviewAnalysisWidget from '@/components/iframes/tradingview-analysis-widget.svelte';

	// Data
	export let data;
</script>

<Button href="/strategy" variant="link" class="my-4 px-0">
	<BackIcon />
	<span>Strategy</span>
</Button>

{#await data.backtestData}
	<StrategyStatsLoadingSkeleton />
{:then backtestData}
	<StrategyStats backtestData={backtestData[0]} />
{:catch error}
	<p>error loading backtest stats: {error.message}</p>
{/await}

<Tabs.Root value="account" class="w-full mt-8">
	<Tabs.List>
		<Tabs.Trigger value="account">Trade Actions</Tabs.Trigger>
		<Tabs.Trigger value="password">Signals</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="account">
		{#await data.tradeActionsData}
			<TableLoadingSkeleton />
		{:then tradeActionsData}
			<div class="mt-8 flex gap-4">
				<h2 class="text-2xl">Trade Actions</h2>
			</div>
			<TradeActionsTable tradeActionsData={tradeActionsData.tradeActionsList} />
		{:catch error}
			<p>error loading signals</p>
		{/await}
	</Tabs.Content>
	<Tabs.Content value="password">
		{#await data.signalsData}
			<TableLoadingSkeleton />
		{:then signalsData}
			<div class="mt-8 flex gap-4">
				<h2 class="text-2xl">Trade Signals</h2>
			</div>
			<SignalsTable {signalsData} />
		{:catch error}
			<p>error loading signals</p>
		{/await}
	</Tabs.Content>
</Tabs.Root>

<TradingviewIframe app='stock' url='https://th.tradingview.com/symbols/BTCUSD/' />
<TradingviewAnalysisWidget />
