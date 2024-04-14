<!-- MARK: Script -->
<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Skeleton from '@/components/ui/skeleton/skeleton.svelte';

	// Icons Import
	import BackIcon from 'lucide-svelte/icons/chevron-left';
	import IntervalIcon from 'lucide-svelte/icons/timer-reset';

	// Data
	export let data;
</script>

<Button href="/strategy" variant="link" class="my-4 px-0">
	<BackIcon />
	<span>Strategy</span>
</Button>

{#await data.backtestData}
	<!-- MARK: Loading Skeleton -->
	<Card.Root>
		<Card.Header>
			<Card.Title><Skeleton class="h-[20px] w-[100px] rounded-full" /></Card.Title>
			<Card.Description><Skeleton class="h-[20px] w-[200px] rounded-full" /></Card.Description>
		</Card.Header>
		<Card.Content>
			<Skeleton class="mb-1 h-[20px] w-[200px] rounded-full" />
			<Skeleton class="mb-1 h-[20px] w-[200px] rounded-full" />
			<Skeleton class="mb-1 h-[20px] w-[200px] rounded-full" />
			<Skeleton class="mb-1 h-[20px] w-[200px] rounded-full" />
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
{:then backtestData}
	<!-- MARK: Backtest Stats -->
	<Card.Root>
		<Card.Header>
			<Card.Title>{backtestData[0].ticker} | {backtestData[0].strategy}</Card.Title>
			<Card.Description>Card Description</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Interval: {backtestData[0].interval}</p>
			<p>Period: {backtestData[0].period}</p>
			<p>Return %: {backtestData[0].returnPercentage}</p>
		</Card.Content>

		<div class="flex">
			<Card.Root
				data-x-chunk-name="dashboard-01-chunk-0"
				data-x-chunk-description="The interval in which the backtest data was pulled."
			>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Terminal</Card.Title>
					<IntervalIcon class="text-muted-foreground h-4 w-4" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{backtestData[0].interval}</div>
					<p class="text-muted-foreground text-xs">Interval</p>
				</Card.Content>
			</Card.Root>
		</div>

		<Card.Footer>
			<Button variant="outline" href={`/strategy/${backtestData[0].id}/backtest`} target="_blank">
				View Backtest Performance
			</Button>
		</Card.Footer>
	</Card.Root>
{:catch error}
	<p>error loading comments: {error.message}</p>
{/await}
<div>
	<script>
		// Any interactivity should be done here since CSR is disabled for this route
	</script>
</div>
