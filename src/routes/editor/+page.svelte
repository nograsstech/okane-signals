<script lang="ts">
	import { SvelteFlowProvider } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import SvelteFlowEditor from '@/components/svelte-flow/svelte-flow-editor.svelte';

	
</script>

<main class="text-black">
  <SvelteFlowProvider>
    <SvelteFlowEditor />
  </SvelteFlowProvider>
</main>

<style>
	main {
		height: 100vh;
	}
</style>
