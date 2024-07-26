<script lang="ts">
	import { afterUpdate, onDestroy, onMount } from 'svelte';

	export let symbol;

	const stuff = {
		interval: '30m',
		width: '100%',
		isTransparent: false,
		height: 450,
		symbol: symbol,
		showIntervalTabs: true,
		displayMode: 'single',
		locale: 'en',
		colorTheme: 'dark'
	};

	let widgetContainer: HTMLDivElement;

	onMount(() => {
		console.log(`Mounted`);
		console.log(symbol);
		createWidget();
	});

	afterUpdate(() => {
		console.log(`Updated`);
		createWidget();
	});

	onDestroy(() => {
		console.log(`Destroyed`);
	});

	function createWidget() {
		if (widgetContainer) {
			widgetContainer.innerHTML = '';
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
			script.async = true;
			script.innerHTML = JSON.stringify(stuff);
			widgetContainer.appendChild(script);
		}
	}
</script>

<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container" bind:this={widgetContainer}>
	<div class="tradingview-widget-container__widget"></div>
</div>
<!-- TradingView Widget END -->
