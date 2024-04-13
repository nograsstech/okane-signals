<script lang="ts">
	import StrategyTable from '@/components/strategy/strategy-table.svelte';
	import PageContainer from '@/components/ui/container/page-container.svelte';
	import { page } from '$app/stores';

	export let data;
</script>

<PageContainer>
	{#if $page.data.session}
		<StrategyTable data={data.strategyList} />
	{:else}
		<div>Partial data for non logged in users (WIP)</div>
		<StrategyTable data={data.strategyList} />
	{/if}
</PageContainer>
