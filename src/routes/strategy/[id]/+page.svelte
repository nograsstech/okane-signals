<!-- MARK: Script -->
<script lang="ts">
	import type { KeyStrategyBacktestStats } from '@/interfaces/strategy.js';
	import { onMount } from 'svelte';

  export let data
  let htmlContent = data.data.html;

  let showHTML = false

</script>

<!-- MARK: HTML -->
<h1>Strategy</h1>

{@html htmlContent}

<div>
  <script>
    // Any interactivity should be done here since CSR is disabled for this route
  </script>
</div>