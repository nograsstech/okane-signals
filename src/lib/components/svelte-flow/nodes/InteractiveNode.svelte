<script lang="ts">
	import { Handle, Position, type NodeProps, type Node } from '@xyflow/svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import Button from '../../ui/button/button.svelte';
	import { nodeContext, selectedContext } from '../../../../store/ContextStore';
	import { cn } from '@/utils';

	// Supress unknown props warnings
	type $$Props = NodeProps;
	export let id: $$Props['id'];
	id;
	export let data: $$Props['data'];
	data as { label: string };
	export let dragHandle: $$Props['dragHandle'] = undefined;
	dragHandle;
	export let type: $$Props['type'] = undefined;
	type;
	export let selected: $$Props['selected'] = undefined;
	selected;
	export let isConnectable: $$Props['isConnectable'] = true;
	isConnectable;
	export let zIndex: $$Props['zIndex'] = 0;
	zIndex;
	export let width: $$Props['width'] = undefined;
	width;
	export let height: $$Props['height'] = undefined;
	height;
	export let dragging: $$Props['dragging'];
	dragging;
	export let targetPosition: $$Props['targetPosition'] = undefined;
	targetPosition;
	export let sourcePosition: $$Props['sourcePosition'] = undefined;
	sourcePosition;
	let buttonElement: HTMLButtonElement;

	function setNodeContext() {
		selectedContext.set('node');
		nodeContext.set({
			id,
			data,
			dragHandle,
			type,
			selected,
			isConnectable,
			zIndex,
			width,
			height,
			dragging,
			targetPosition,
			sourcePosition
		} as unknown as Node);
	}
</script>

<div
	class={cn('node rounded-sm overflow-hidden', selected && 'shadow-lg shadow-slate-500')}
>
	<button
		bind:this={buttonElement}
		on:contextmenu|stopPropagation={setNodeContext}
		on:click={setNodeContext}
	>
		<ContextMenu.Trigger>
			<slot />
		</ContextMenu.Trigger>
	</button>
</div>