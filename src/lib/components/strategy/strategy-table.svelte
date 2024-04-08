<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
  import { Input } from "$lib/components/ui/input";


	type Payment = {
		id: string;
		amount: number;
		status: 'pending' | 'processing' | 'success' | 'failed';
		email: string;
	};

	const data: Payment[] = [
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'success',
			email: 'ken99@yahoo.com'
		},
		{
			id: 'a8hj76k2',
			amount: 512,
			status: 'success',
			email: 'john.doe@example.com'
		},
		{
			id: 'b3nm45p7',
			amount: 128,
			status: 'failed',
			email: 'jane.smith@example.com'
		},
		{
			id: 'z9xy12w3',
			amount: 256,
			status: 'processing',
			email: 'test@example.com'
		},
		{
			id: 'z9xy12w3',
			amount: 256,
			status: 'processing',
			email: 'test@example.com'
		},
		{
			id: 'z9xy12w3',
			amount: 256,
			status: 'processing',
			email: 'test@example.com'
		},
		{
			id: 'z9xy12w3',
			amount: 256,
			status: 'processing',
			email: 'test@example.com'
		},
		{
			id: 'z9xy12w3',
			amount: 256,
			status: 'processing',
			email: 'test@example.com'
		},
		{
			id: 'z9xy12w3',
			amount: 256,
			status: 'processing',
			email: 'test@example.com'
		},
		{
			id: 'z9xy12w3',
			amount: 256,
			status: 'processing',
			email: 'test@example.com'
		},
		{
			id: 'z9xy12w3',
			amount: 256,
			status: 'processing',
			email: 'test@example.com'
		},
		{
			id: 'q7we89r4',
			amount: 64,
			status: 'pending',
			email: 'user@example.com'
		}
	];

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),

	});

	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID'
			// plugins: {
			// 	sort: {
			// 		disable: true
			// 	}
			// }
		}),
		table.column({
			accessor: 'status',
			header: 'Status'
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'amount',
			header: 'Amount',
			plugins: {
				filter: {
          exclude: true,
        },
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { pageSize, pageIndex, pageCount, hasPreviousPage, hasNextPage } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

</script>

<!-- MARK: Template -->
<div class="mt-8">
	<h2 class="text-4xl">Trading Strategies</h2>
	<div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter emails..."
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
						<Table.Row {...rowAttrs}>
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
