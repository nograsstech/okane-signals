<!-- MARK: Script -->
<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Skeleton from '@/components/ui/skeleton/skeleton.svelte';

	// Icons Import
	import BackIcon from 'lucide-svelte/icons/chevron-left';
	import StrategyStats from '@/components/strategy/strategy-stats.svelte';
	import StrategyStatsLoadingSkeleton from '@/components/strategy/strategy-stats-loading-skeleton.svelte';
	import SignalsTable from '@/components/strategy/signals-table.svelte';

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

{#await data.signalsData}
	<div class="mt-8 flex gap-4 items-center">
		<h2 class="text-2xl">Trade Signals</h2>
		<img src="/images/icons/loading-signals.gif" alt="loading" class="w-6 h-6" />
	</div>
	<Skeleton class="mb-12 h-8 w-64 rounded-full mt-8" />
	<Skeleton class="mb-1 h-12 w-full rounded-full" />
	<Skeleton class="mb-1 h-12 w-full rounded-full" />
	<Skeleton class="mb-1 h-12 w-full rounded-full" />
	<Skeleton class="mb-1 h-12 w-full rounded-full" />
{:then signalsData}
	<div class="mt-8 flex gap-4">
		<h2 class="text-2xl">Trade Signals</h2>
	</div>
	<SignalsTable signalsData={signalsData} />
{:catch error}
	<p>error loading signals</p>
{/await}
