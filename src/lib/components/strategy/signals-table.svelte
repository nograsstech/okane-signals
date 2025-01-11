<!-- MARK: Script -->
<script lang="ts">
	import { createTable, DataBodyRow, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from "$lib/components/ui/badge";
	import ArrowUpIcon from 'lucide-svelte/icons/arrow-up-from-dot';
	import ArrowDownIcon from 'lucide-svelte/icons/arrow-down-to-dot';
	import { Input } from '$lib/components/ui/input';
	import type { KeyStrategyBacktestStats } from '@/interfaces/strategy';
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Skeleton from '../ui/skeleton/skeleton.svelte';
	import type { SignalResponseDTO } from '@/okane-finance-api/generated';

	interface Props {
		signalsData: { signals: SignalResponseDTO };
	}

	let { signalsData }: Props = $props();

	const formattedData = signalsData.signals.data.signals.allSignals.map((signal) => {
		return {
			...signal,
			gmtTime: new Date(signal.gmtTime)
		};
	}).reverse();
	// States
	let mounted = $state(false);

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
			accessor: 'totalSignal',
			header: 'Trade Signal',
			plugins: {
				filter: {
          exclude: true,
        },
			}
		}),
		table.column({
			accessor: 'gmtTime',
			header: 'Time'
		}),
		table.column({
			accessor: 'open',
			header: 'Open',
			plugins: {
				filter: {
          exclude: true,
        },
			}
		}),
		table.column({
			accessor: 'high',
			header: 'High',
			plugins: {
				filter: {
          exclude: true,
        },
			}
		}),
		table.column({
			accessor: 'low',
			header: 'Low',
			plugins: {
				filter: {
          exclude: true,
        },
			}
		}),
		table.column({
			accessor: 'close',
			header: 'Close',
			plugins: {
				filter: {
          exclude: true,
        },
			}
		}),
		table.column({
			accessor: 'volume',
			header: 'Volume',
			plugins: {
				filter: {
          exclude: true,
        },
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
		<Input
			class="max-w-sm"
			placeholder="Filter by date"
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
								<Subscribe attrs={cell.attrs()}  props={cell.props()} >
									{#snippet children({ attrs, props })}
																		<Table.Head {...attrs} class="pl-2">
											<Render of={cell.render()} />
										</Table.Head>
																										{/snippet}
																</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row, i (row.id)}
					<Subscribe rowAttrs={row.attrs()} >
						{#snippet children({ rowAttrs })}
												<Table.Row {...rowAttrs} class="relative">
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} >
										{#snippet children({ attrs })}
																		<Table.Cell {...attrs} class="h-14 p-0">
												{#if cell.column.id === 'gmtTime'}
													<div class="pl-2 text-xs py-2 lg:text-md lg:py-0">
														<div>{new Date(cell.render().toString()).toLocaleString()}</div>
													</div>
												{:else if cell.column.id === 'totalSignal'}
													<div class="pl-2">
														{#if cell.render() === "2"}
															<Badge class="flex gap-2 w-fit pr-4 py-1 bg-positive"><ArrowUpIcon class="h-4 w-4"/><span>Buy</span></Badge>
														{:else if cell.render() === "1"}
														<Badge class="flex gap-2 w-fit pr-4 py-1 bg-negative"><ArrowDownIcon class="h-4 w-4"/><span>Sell</span></Badge>
														{/if}
													</div>
												{:else}
													<div class="pl-2">
														<Render of={cell.render()} />
													</div>
												{/if}
											</Table.Cell>
																											{/snippet}
																</Subscribe>
								{/each}
							</Table.Row>
																	{/snippet}
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
