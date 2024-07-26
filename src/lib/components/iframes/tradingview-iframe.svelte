<script>
  function createWidget() {
    return (`<div class="tradingview-widget-container">
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
        <\/script>
      </div>`);
  }
</script>

<!-- svelte-ignore css-unused-selector -->
<style>
  iframe {
    width: 100%;
    height: 1000px;
  }
</style>

{@html createWidget()}