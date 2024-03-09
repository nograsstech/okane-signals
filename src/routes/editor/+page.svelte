<script lang="ts">
	import { writable } from 'svelte/store';
	import { SvelteFlowProvider, Position } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import ColorPickerNode from '@/components/svelte-flow/ColorPickerNode.svelte';
	import SvelteFlowEditor from '@/components/svelte-flow/svelte-flow-editor.svelte';

	const nodeTypes = {
		'color-picker': ColorPickerNode
	};

	const nodeDefaults = {
		sourcePosition: Position.Right,
		targetPosition: Position.Left
	};

	const nodes = writable([
		{
			id: '1', // required and needs to be a string
			position: { x: 0, y: 0 }, // required
			data: { label: 'hey' }, // required
			...nodeDefaults
		},
		{
			id: '2',
			position: { x: 100, y: 100 },
			data: { label: 'world' },
			...nodeDefaults
		},
		{
			id: '3',
			type: 'color-picker',
			position: { x: 100, y: 100 },
			data: { color: writable('#ff4000') },
			...nodeDefaults
		}
	]);
	const edges = writable([{ id: '1-2', source: '1', target: '2', animated: true }]);
</script>

<main class="text-black">
  <SvelteFlowProvider>
    <SvelteFlowEditor {nodes} {edges} />
  </SvelteFlowProvider>
</main>

<style>
	main {
		height: 100vh;
	}
</style>
