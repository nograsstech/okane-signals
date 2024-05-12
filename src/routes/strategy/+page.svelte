<script lang="ts">
	import StrategyTable from '@/components/strategy/strategy-table.svelte';
	import PageContainer from '@/components/ui/container/page-container.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import type { SortKey } from 'svelte-headless-table/plugins';

	export let data;

	let initialSortKeys: SortKey[] = [];
	let initialPageIndex: number = 0;

	$: if (browser) {
		try {
			initialSortKeys = JSON.parse(window.localStorage.getItem('sortkeys') ?? '[]');
			initialPageIndex = JSON.parse(
				window.sessionStorage.getItem('initialStrategyPageIndex') ?? '[]'
			);
		} catch (error) {
			console.error('Unable to parse saved sort keys', error);
		}
	}
</script>

<PageContainer>
	{#if $page.data.session}
		<StrategyTable data={data.strategyList} {initialSortKeys} {initialPageIndex} />
	{:else}
		<div>Partial data for non logged in users (WIP)</div>
		<StrategyTable data={data.strategyList} />
	{/if}
</PageContainer>
