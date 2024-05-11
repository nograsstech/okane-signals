<script lang="ts">
	import { afterUpdate, onDestroy, onMount } from 'svelte';

	onMount(() => {
		console.log(`Mounted`);
	});

	afterUpdate(() => {
		console.log(`Updated`);
	});

	onDestroy(() => {
		console.log(`Destroyed`);
	});
</script>

<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
	<div class="tradingview-widget-container__widget"></div>
	<script
		type="text/javascript"
		src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
		async
	>
  {
  "interval": "1m",
  "width": "100%",
  "isTransparent": false,
  "height": 450,
  "symbol": "NASDAQ:AAPL",
  "showIntervalTabs": true,
  "displayMode": "single",
  "locale": "en",
  "colorTheme": "dark"
}
	</script>
</div>
<!-- TradingView Widget END -->
