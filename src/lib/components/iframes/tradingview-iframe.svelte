<script lang="ts">
	import { afterUpdate, onDestroy, onMount } from 'svelte';

	export let app;
	export let url;

	onMount(() => {
		console.log(`Mounted ${app}`);
	});

	afterUpdate(() => {
		console.log(`Updated ${app}`);
	});

	onDestroy(() => {
		console.log(`Destroyed ${app}`);
	});
</script>

<!-- <iframe title={app} id="microapp-{app}" frameborder="0" scrolling="no" src={url}></iframe> -->

<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
	<div class="tradingview-widget-container__widget"></div>
	<script
		type="text/javascript"
		src="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
		async
	>
  {
  "colorTheme": "dark",
  "isTransparent": false,
  "width": "100%",
  "height": "550",
  "locale": "en",
  "importanceFilter": "-1,0,1",
  "countryFilter": "ar,au,br,ca,cn,fr,de,in,id,it,jp,kr,mx,ru,sa,za,tr,gb,us,eu"
}
	</script>
</div>

<!-- TradingView Widget END -->

<style>
	iframe {
		width: 100%;
		height: 1000px;
	}
</style>
