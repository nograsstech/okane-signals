<!-- MARK: Script -->
<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { navigating } from '$app/stores';
	import type { KeyStrategyBacktestStats } from '@/interfaces/strategy.js';
	import { onMount } from 'svelte';
	import Skeleton from '@/components/ui/skeleton/skeleton.svelte';

	export let data;
	let htmlContent = data.backtestHTML;
</script>

<div class="fixed left-0 top-0 h-screen w-screen pt-20">
	{@html htmlContent}
</div>

<div>
	<script>
		// Any interactivity should be done here since CSR is disabled for this route
	</script>
</div>
