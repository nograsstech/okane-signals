<script lang="ts">
	import { run } from 'svelte/legacy';

	import {
		SvelteFlow,
		Background,
		Controls,
		useNodesData,
		useEdges,
		MiniMap,
		Position,
		type NodeTypes
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import ColorPickerNode from '@/components/svelte-flow/nodes/ColorPickerNode.svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import * as Sheet from '$lib/components/ui/sheet';
	import '@xyflow/svelte/dist/style.css';
	import { addNode, deleteNode } from './svelteFlowConfig/nodeManipulation';
	import PlusIcon from 'lucide-svelte/icons/plus';
	import { debounce } from '@/utils/debounce';
	import InteractiveNode from './nodes/InteractiveNode.svelte';
	import { nodes, edges, selectedContext, nodeContext } from '../../../store/ContextStore';
	import { ContextMenuContext } from '@/enums/contextMenu';
	import TickerNode from './nodes/TickerNode.svelte';
	import type { OkaneNodeType } from '@/enums/nodeTypes';
	import { nodeDefaults, nodeTypes, edgeTypes } from './svelteFlowConfig/defaults';
	import { OkaneNodeOptions } from './svelteFlowConfig/nodeOptions';
	import SimpleFloatingEdge from './edges/SimpleFloatingEdge.svelte';

	const defaultEdgeOptions = {
		animated: true,
		floating: SimpleFloatingEdge
	};

	// States
	let pageX = $state(0);
	let pageY = $state(0);

	const nodeData = useNodesData($nodes?.map((node) => node.id));
	const edgesData = useEdges();

	// Modify the nodes and edges
	function handleAddNode(type: string | OkaneNodeType) {
		addNode(type, $nodes, {
			...nodeDefaults,
			data: {
				dateCreated: new Date().toISOString()
			}
		}, pageX, pageY);
	}

	run(() => {
		debounce(() => {
			console.log($nodeData, $edgesData);
			window.localStorage.setItem('editor-nodes', JSON.stringify($nodes));
			window.localStorage.setItem('editor-edges', JSON.stringify($edges));
		}, 300);
	});

	function handleDeleteNode() {
		deleteNode($nodeContext.id, $nodes);
	}

	function clickButton() {
		selectedContext.set('canvas');
	}
</script>

<svelte:window onmousemove={(e) => ({ pageX, pageY } = e)} />
<ContextMenu.Root>
	<Sheet.Root>
		<!-- SvelteFlow Editor Area -->
		<div role="button" tabindex={0} onkeyup={null} oncontextmenu={clickButton}>
			<ContextMenu.Trigger>
				<ContextMenu.Root>
					<main class="h-screen pt-16 text-black">
						<SvelteFlow {nodes} {edges} {nodeTypes} {edgeTypes} {defaultEdgeOptions}>
							<Background />
							<Controls />
							<MiniMap nodeStrokeWidth={3} />
						</SvelteFlow>
					</main>

					<!-- SvelteFlow Node Context Menu -->
					{#if $selectedContext === ContextMenuContext.NODE}
						<ContextMenu.Content>
							<ContextMenu.Item on:click={handleDeleteNode}>Delete</ContextMenu.Item>
						</ContextMenu.Content>
					{/if}
				</ContextMenu.Root>
			</ContextMenu.Trigger>
		</div>

		<!-- SvelteFlow Canvas Context Menu -->
		{#if $selectedContext === ContextMenuContext.CANVAS}
			<ContextMenu.Content>
				{#each OkaneNodeOptions as option}
					<ContextMenu.Item on:click={() => handleAddNode(option.nodeType)}>
						<option.icon class="h-4 w-4 mr-3" />
						{option.label}</ContextMenu.Item
					>
				{/each}
			</ContextMenu.Content>
		{/if}

		<!-- Sheets Content -->
		<Sheet.Content>
			<Sheet.Header>
				<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
				<Sheet.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</Sheet.Description>
			</Sheet.Header>
			{#if $nodeContext && $nodeContext.data}
				<div class="flex w-full justify-start">
					<div class="w-full text-start">
						{JSON.stringify($nodeContext).trim()}
					</div>
				</div>
			{/if}
		</Sheet.Content>
	</Sheet.Root>
</ContextMenu.Root>
