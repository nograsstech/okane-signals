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
		type Node,
		type Edge,

		type NodeTypes

	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import ColorPickerNode from '@/components/svelte-flow/ColorPickerNode.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Sheet from '$lib/components/ui/sheet';
	import '@xyflow/svelte/dist/style.css';
	import { addNode } from './svelteFlowUtils/nodeManipulation';
	import PlusIcon from 'lucide-svelte/icons/plus';
	import {
		SAMPLE_SVELTE_FLOW_DATA,
		SAMPLE_SVELTE_FLOW_EDGE_DATA
	} from '@/constants/sampleSvelteFlowData';
	import { debounce } from '@/utils/debounce';
	import InteractiveNode from './InteractiveNode.svelte';

	// Node types
	const nodeTypes = {
		'color-picker': ColorPickerNode,
		'interactive-node': InteractiveNode
	} as unknown as NodeTypes;

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
	const edges = writable(
		(JSON.parse(window.localStorage.getItem('editor-edges') ?? '[]') as Edge[]) ??
			SAMPLE_SVELTE_FLOW_EDGE_DATA
	);
	const nodeData = useNodesData($nodes?.map((node) => node.id));
	const edgesData = useEdges();

	// Modify the nodes and edges
	function onAddNode(e: MouseEvent) {
		$nodes = addNode(e, $nodes, nodeDefaults, pageX, pageY);
	}

	$: {
		debounce(() => {
			console.log($nodeData, $edgesData);
			window.localStorage.setItem('editor-nodes', JSON.stringify($nodes));
			window.localStorage.setItem('editor-edges', JSON.stringify($edges));
		}, 300);
	}
</script>

<svelte:window on:mousemove={(e) => ({ pageX, pageY } = e)} />
<ContextMenu.Root>
	<Sheet.Root>
		<!-- SvelteFlow Editor Area -->
		<ContextMenu.Trigger>
			<main class="h-screen pt-16 text-black">
				<SvelteFlow {nodes} {edges} {nodeTypes}>
					<Background />
					<Controls />
					<MiniMap nodeStrokeWidth={3} />
				</SvelteFlow>
			</main>
		</ContextMenu.Trigger>

		<!-- Context Menu -->
		<ContextMenu.Content>
			<ContextMenu.Item on:click={onAddNode}>
				<PlusIcon />
				Add Node
			</ContextMenu.Item>
		</ContextMenu.Content>

		<!-- Sheets Content -->
		<Sheet.Content>
			<Sheet.Header>
				<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
				<Sheet.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</Sheet.Description>
			</Sheet.Header>
		</Sheet.Content>

	</Sheet.Root>
</ContextMenu.Root>
