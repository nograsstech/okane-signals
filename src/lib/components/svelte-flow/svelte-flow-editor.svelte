<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		SvelteFlow,
		Background,
		Controls,
		useNodesData,
		useEdges,
		MiniMap,
		Position,
		type Node
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import ColorPickerNode from '@/components/svelte-flow/ColorPickerNode.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import '@xyflow/svelte/dist/style.css';
	import { addNode } from './svelteFlowUtils/nodeManipulation';
	import PlusIcon from 'lucide-svelte/icons/plus';
	import { SAMPLE_SVELTE_FLOW_DATA } from '@/constants/sampleSvelteFlowData';

	// Node types
	const nodeTypes = {
		'color-picker': ColorPickerNode
	};

	const nodeDefaults = {
		sourcePosition: Position.Right,
		targetPosition: Position.Left
	};

	// States
	let pageX = 0;
	let pageY = 0;

	const nodes = writable<Node[]>(
		(JSON.parse(window.localStorage.getItem('editor-nodes') ?? '[]') as Node[]) ??
			SAMPLE_SVELTE_FLOW_DATA
	);
	const edges = writable([{ id: '1-2', source: '1', target: '2', animated: true }]);
	const nodeData = useNodesData($nodes?.map((node) => node.id));
	const edgesData = useEdges();

	// Modify the nodes and edges
	function onAddNode(e: MouseEvent) {
		$nodes = addNode(e, $nodes, nodeDefaults, pageX, pageY);
	}

	$: {
		console.log($nodeData, $edgesData);
		window.localStorage.setItem('editor-nodes', JSON.stringify($nodes));
	}
</script>

<svelte:window on:mousemove={(e) => ({ pageX, pageY } = e)} />
<ContextMenu.Root>
	<ContextMenu.Trigger>
		<!-- SvelteFlow Editor Area -->
		<main class="h-screen pt-16 text-black">
			<SvelteFlow {nodes} {edges} {nodeTypes}>
				<Background />
				<Controls />
				<MiniMap nodeStrokeWidth={3} />
			</SvelteFlow>
		</main>
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item on:click={onAddNode}>
			<PlusIcon />
			Add Node
		</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu.Root>
