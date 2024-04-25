<!-- MARK: Script -->
<script lang="ts">
	import { createTable, DataBodyRow, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import ArrowUpIcon from 'lucide-svelte/icons/arrow-up-from-dot';
	import ArrowDownIcon from 'lucide-svelte/icons/arrow-down-to-dot';
	import { Input } from '$lib/components/ui/input';
	import type { KeyStrategyBacktestStats, TradeAction } from '@/interfaces/strategy';
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Skeleton from '../ui/skeleton/skeleton.svelte';
	import type { SignalResponseDTO } from '@/okane-finance-api/generated';

	export let tradeActionsData: TradeAction[];

	const formattedData = tradeActionsData
		.map((action) => {
			return {
				...action,
				gmtTime: new Date(action.datetime)
			};
		})
	// States
	let mounted = false;

	// Theme
	let selectedTheme = '';
	mode.subscribe((theme) => {
		if (theme) selectedTheme = theme;
	});

	// Table Configurations
	const table = createTable(readable(formattedData), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});

	const columns = table.createColumns([
		table.column({
			accessor: 'gmtTime',
			header: 'Time'
		}),
		table.column({
			accessor: 'trade_action',
			header: 'Trade Action'
		}),
		table.column({
			accessor: 'entry_price',
			header: 'Entry Price',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'price',
			header: 'Price',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'tp',
			header: 'Take Profit',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'sl',
			header: 'Stop Loss',
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'size',
			header: 'Size',
			plugins: {
				filter: {
					exclude: true
				}
			}
		})
	]);

	// Computed
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { pageSize, pageIndex, pageCount, hasPreviousPage, hasNextPage } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	// Methods
	const handleClick = (row: any) => {
		row = row as DataBodyRow<KeyStrategyBacktestStats>;

		window.location.pathname = `/strategy/${row.original.id}`;
		// goto(`/strategy/${row.original.id}`);
	};

	// Event Handler
	onMount(() => {
		mounted = true;
	});
</script>

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
		<Input class="max-w-sm" placeholder="Filter by date" type="text" bind:value={$filterValue} />
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
									<Table.Head {...attrs} class="pl-2">
										<Render of={cell.render()} />
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
						<Table.Row {...rowAttrs} class="relative">
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs} class="h-14 p-0">
										{#if cell.column.id === 'gmtTime'}
											<div class="lg:text-md py-2 pl-2 text-xs lg:py-0">
												<div>{new Date(cell.render().toString()).toLocaleString()}</div>
											</div>
										{:else if cell.column.id === 'totalSignal'}
											<div class="pl-2">
												{#if cell.render() === '2'}
													<Badge class="flex w-fit gap-2 bg-positive py-1 pr-4"
														><ArrowUpIcon class="h-4 w-4" /><span>Buy</span></Badge
													>
												{:else if cell.render() === '1'}
													<Badge class="flex w-fit gap-2 bg-negative py-1 pr-4"
														><ArrowDownIcon class="h-4 w-4" /><span>Sell</span></Badge
													>
												{/if}
											</div>
										{:else}
											<div class="pl-2">
												{#if cell.render() !== "null"}
													 <Render of={cell.render()} />
												{:else}
													<span class="text-gray-500">N/A</span>
												{/if}
											</div>
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
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
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
{/if}
