<script lang="ts">
	import { type Writable } from 'svelte/store';
	import {
		SvelteFlow,
		Background,
		Controls,
		useNodesData,
		useEdges,
		type Node,
		type Edge,
		type NodeTypes
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import ColorPickerNode from '@/components/svelte-flow/ColorPickerNode.svelte';

	export let nodes: Writable<Node[]>;

	export let edges: Writable<Edge[]>;

	const nodeTypes: NodeTypes = {
		'color-picker': ColorPickerNode
	};

	const nodeData = useNodesData($nodes.map((node) => node.id));
	const edgesData = useEdges();

	$: {
		console.log($nodeData, $edgesData);
	}
</script>

<main class="text-black">
	<SvelteFlow {nodes} {edges} {nodeTypes}>
		<Background />
		<Controls />
	</SvelteFlow>
</main>

<style>
	main {
		height: 100vh;
	}
</style>
