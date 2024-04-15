<!-- MARK: Script -->
<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Skeleton from '@/components/ui/skeleton/skeleton.svelte';

	// Icons Import
	import BackIcon from 'lucide-svelte/icons/chevron-left';
	import StrategyStats from '@/components/strategy/strategy-stats.svelte';
	import StrategyStatsLoadingSkeleton from '@/components/strategy/strategy-stats-loading-skeleton.svelte';

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
	<p>error loading comments: {error.message}</p>
{/await}

<div>
	<script>
		// Any interactivity should be done here since CSR is disabled for this route
	</script>
</div>
