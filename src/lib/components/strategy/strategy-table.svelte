<!-- MARK: Script -->
<script lang="ts">
	import { BodyRow, createTable, DataBodyRow, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import { Input } from '$lib/components/ui/input';
	import type { KeyStrategyBacktestStats } from '@/interfaces/strategy';
	import { goto } from '$app/navigation';
	import type { error } from '@sveltejs/kit';

	export let data: KeyStrategyBacktestStats[];

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
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
			header: 'Share Ratio',
			plugins: {
				filter: {
					exclude: true
				},
				sort: NUMBER_SORTING
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { pageSize, pageIndex, pageCount, hasPreviousPage, hasNextPage } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const handleClick = (row: any) => {
		row = row as DataBodyRow<KeyStrategyBacktestStats>;

		goto(`/strategy/${row.original.id}`);
	};
</script>

<!-- MARK: Template -->
<div class="mt-8">
	<h2 class="text-4xl">Trading Strategies</h2>
	<div class="flex items-center py-4">
		<Input
			class="max-w-sm"
			placeholder="Filter Okane Signals..."
			type="text"
			bind:value={$filterValue}
		/>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs}>
										<Button variant="ghost" on:click={props.sort.toggle}>
											<Render of={cell.render()} />
											<ArrowUpDown class={'ml-2 h-4 w-4'} />
										</Button>
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} on:click={() => handleClick(row)}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs} class="">
										<div class="pl-4">
											<Render of={cell.render()} />
										</div>
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
</div>
