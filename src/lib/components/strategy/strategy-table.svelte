<!-- MARK: Script -->
<script lang="ts">
	import { createTable, DataBodyRow, Render, Subscribe } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		type SortKey
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import { Input } from '$lib/components/ui/input';
	import type { KeyStrategyBacktestStats } from '@/interfaces/strategy';
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';
	import { cn } from '@/utils';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Skeleton from '../ui/skeleton/skeleton.svelte';
	import { NUMBER_REGEX } from '$lib/constants/regex';
	import { notypecheck } from '@/utils/notypecheck';
	import { browser } from '$app/environment';
	import { redirect } from '@sveltejs/kit';
	import { Router } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	export let data: KeyStrategyBacktestStats[];
	export let initialSortKeys: SortKey[] = [];
	export let initialPageIndex: number = 0;

	console.log(data)

	data = data.map((strategy, index) => {
		strategy['✨'] = '';
		if (strategy.sharpeRatio > 1.5 && strategy.winRate >= 50) strategy['✨'] += '✨ ';
		if (strategy.sharpeRatio > 1.5) strategy['✨'] += '↑SR ';
		if (strategy.winRate >= 50) strategy['✨'] += '↑WR ';
		
		if (strategy.notificationsOn) strategy['🔔'] = '🔔';
		else strategy['🔔'] = '';
		return strategy;
	});

	// States
	let mounted = false;

	// Theme
	let selectedTheme = '';
	mode.subscribe((theme) => {
		if (theme) selectedTheme = theme;
	});

	// Table Configurations
	const table = createTable(readable(data), {
		page: addPagination({
			initialPageSize: 10,
			initialPageIndex: initialPageIndex ? initialPageIndex : 0
		}),
		sort: addSortBy({
			initialSortKeys: initialSortKeys.length ? initialSortKeys : [{ id: 'winRate', order: 'desc' }]
		}),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const NUMBER_SORTING = {
		compareFn: (leftValue: number, rightValue: number) => {
			return leftValue - rightValue;
		}
	};

	const columns = table.createColumns([
		table.column({
			accessor: '🔔',
			header: '🔔',
		}),
		table.column({
			accessor: '✨',
			header: '✨ Top Performer',
		}),
		table.column({
			accessor: 'strategy',
			header: 'Strategy'
		}),
		table.column({
			accessor: 'ticker',
			header: 'Ticker'
		}),
		table.column({
			accessor: 'period',
			header: 'Period'
		}),
		table.column({
			accessor: 'interval',
			header: 'Interval'
		}),
		table.column({
			accessor: 'winRate',
			header: 'Win Rate %',
			plugins: {
				filter: {
					exclude: true
				},
				sort: NUMBER_SORTING
			}
		}),
		table.column({
			accessor: 'returnPercentage',
			header: 'Return %',
			plugins: {
				filter: {
					exclude: true
				},
				sort: NUMBER_SORTING
			}
		}),
		table.column({
			accessor: 'averageDrawdownPercentage',
			header: 'Avg. Drawdown %',
			plugins: {
				filter: {
					exclude: true
				},
				sort: NUMBER_SORTING
			}
		}),
		table.column({
			accessor: 'sharpeRatio',
			header: 'Sharpe Ratio',
			plugins: {
				filter: {
					exclude: true
				},
				sort: NUMBER_SORTING
			}
		})
	]);

	// Computed
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { pageSize, pageIndex, pageCount, hasPreviousPage, hasNextPage } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { sortKeys } = pluginStates.sort;

	// Methods
	const handleClick = (row: any) => {
		row = row as DataBodyRow<KeyStrategyBacktestStats & { '✨': any }>;

		window.location.pathname = `/strategy/${row.original.id}`;
	};

	// Event Handler
	onMount(() => {
		mounted = true;
	});

	$: if (browser) {
		window.localStorage.setItem('sortkeys', JSON.stringify($sortKeys));
		window.sessionStorage.setItem('initialStrategyPageIndex', JSON.stringify($pageIndex));
	}
</script>

<div class="mt-8">
	<h2 class="text-4xl">Trading Strategies</h2>
</div>
<!-- MARK: Template -->
{#if !mounted}
	<Skeleton class="mb-12 h-8 w-64 rounded-full" />
	<Skeleton class="mb-1 h-12 w-full rounded-full" />
	<Skeleton class="mb-1 h-12 w-full rounded-full" />
	<Skeleton class="mb-1 h-12 w-full rounded-full" />
	<Skeleton class="mb-1 h-12 w-full rounded-full" />
{:else}
	<div
		class="relative flex items-center py-4"
		transition:fly={{
			delay: 0,
			duration: 600,
			x: 0,
			y: 50,
			opacity: 0,
			easing: quintOut
		}}
	>
		<Input
			class="max-w-sm"
			placeholder="Filter Okane Signals..."
			type="text"
			bind:value={$filterValue}
		/>
	</div>
	<div
		class="rounded-md border"
		transition:fade={{
			delay: 250,
			duration: 800
		}}
	>
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class=" p-0">
										<Button variant="ghost" on:click={props.sort.toggle}>
											<Render of={cell.render()} />
											{#if props.sort.order}
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											{/if}
										</Button>
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row, i (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} class="relative" on:click={() => goto(`/strategy/${notypecheck(row).original.id}`)}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs} class="h-14 p-0">
										<a
											data-sveltekit-preload-code="off"
											href={`/strategy/${notypecheck(row).original.id}`}
											class={cn(
												'pl-4 ',
												// General Styling
												NUMBER_REGEX.test(cell.render().toString()) &&
													parseFloat(cell.render().toString()) > 0 &&
													'text-positive',
												NUMBER_REGEX.test(cell.render().toString()) &&
													parseFloat(cell.render().toString()) < 0 &&
													'text-negative',
												// Win rate styling
												cell.id === 'winRate' &&
													parseFloat(cell.render().toString()) >= 50 &&
													'text-positive',
												cell.id === 'winRate' &&
													parseFloat(cell.render().toString()) < 50 &&
													'text-negative',
												// Drawdown styling
												cell.id === 'averageDrawdownPercentage' &&
													parseFloat(cell.render().toString()) >= -10 &&
													'text-positive',
												cell.id === 'averageDrawdownPercentage' &&
													parseFloat(cell.render().toString()) < -10 &&
													'text-negative'
											)}
										>
											<Render of={cell.render()} />
										</a>
									</Table.Cell>
								</Subscribe>
							{/each}
							<a
								data-sveltekit-preload-code="off"
								href={`/strategy/${notypecheck(row).original.id}`}
								class="absolute left-0 h-14 w-full">&nbsp;</a
							>
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<span>
			Page {$pageIndex + 1} of {$pageCount}
		</span>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = parseInt($pageIndex.toString()) + 1)}>Next</Button
		>
	</div>
{/if}
