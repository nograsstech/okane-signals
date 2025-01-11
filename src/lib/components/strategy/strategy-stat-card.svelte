<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	
	import type { ComponentType } from 'svelte';

	interface Props {
		field: string;
		value: string | number;
		description: string;
		icon?: ComponentType | undefined;
		textColor?: "positive" | "negative" | "neutral";
	}

	let {
		field,
		value,
		description,
		icon = undefined,
		textColor = "neutral"
	}: Props = $props();
</script>

<Card.Root
	data-x-chunk-name="dashboard-01-chunk-0"
	data-x-chunk-description="The interval in which the backtest data was pulled."
>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 p-3 pb-0">
		<Card.Title class="text-sm font-medium">{field}</Card.Title>
    {#if icon}
      {@const SvelteComponent = icon}
      <SvelteComponent class="text-muted-foreground h-4 w-4 ml-1" />
    {/if}
	</Card.Header>
	<Card.Content class="p-3">
    {#if (typeof value === 'number') && (textColor === 'positive')}
      <div class="text-2xl font-bold text-positive">{value.toFixed(2)}</div>
    {:else if (typeof value === 'number') && (textColor === 'negative')}
      <div class="text-2xl font-bold text-negative">{value.toFixed(2)}</div>
    {:else if (typeof value === 'number')}
      <div class="text-2xl font-bold">{value.toFixed(2)}</div>
    {:else}
      <div class="text-2xl font-bold">{value}</div>
    {/if}
		<p class="text-muted-foreground text-xs max-w-24 md:max-w-48 mt-2">{description}</p>
	</Card.Content>
</Card.Root>
