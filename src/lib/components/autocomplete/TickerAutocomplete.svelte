<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import listing_status from '$lib/../data/listing_status.json';
	import { debounce } from '@/utils/debounce';

	// TODO: Since the combobox requires all the available options and can't limit the maximum number of options displayed, we need to limit the number of options displayed here.
	// Instead of using the combobox with all availabel options, we can debounce user input to query the backend for the available options and display them in a list instead.
	let tickers = listing_status.slice(0, 0);
	let open = false;
	let label = '';

	$: selectedValue = tickers.find((f) => f.label === label)?.label ?? 'Select a ticker...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	// States
	let tickerSearchInput = '';
	
	// Form Values
	let value = '';

	function searchTicker(input: string) {
		if (!input) return;
		console.info('searching for ticker...', input);
		tickers = listing_status.slice(0, 4);
	}

	// Listens to changes in the form and debounces the value setting
	$: debounce(() => {
		tickerSearchInput = value;
	}, 300);

	// Update the list of tickers when the debounced value changes
	$: {
		searchTicker(tickerSearchInput);
	}
</script>

<div class="w-96 overflow-hidden overflow-ellipsis">
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="secondary"
				role="combobox"
				aria-expanded={open}
				class="w-full justify-between"
			>
				{selectedValue}
				<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-96 p-0">
			<Command.Root>
				<Command.Input placeholder="Search framework..." bind:value />
				<!-- <Command.Input placeholder="Search framework..." on:inputTicker={(e) => console.info(e)}/> -->
				<Command.Empty>No framework found.</Command.Empty>
				<Command.Group class="flex-start">
					{#each tickers as framework}
						<Command.Item
							value={framework.label}
							onSelect={(currentValue) => {
								label = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
						>
							<Check
								class={cn(
									'mr-2 flex h-4 w-4 !items-start text-start',
									label !== framework.label && 'text-transparent'
								)}
							/>
							{framework.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
