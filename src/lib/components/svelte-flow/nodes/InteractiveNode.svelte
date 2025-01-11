<script lang="ts">
	import { stopPropagation } from 'svelte/legacy';

	import { Handle, Position, type NodeProps, type Node } from '@xyflow/svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import Button from '../../ui/button/button.svelte';
	import { nodeContext, selectedContext } from '../../../../store/ContextStore';
	import { cn } from '@/utils';

	// Supress unknown props warnings
	type $$Props = NodeProps;
	id;
	data as { label: string };
	dragHandle;
	type;
	selected;
	isConnectable;
	zIndex;
	width;
	height;
	dragging;
	targetPosition;
	interface Props {
		id: $$Props['id'];
		data: $$Props['data'];
		dragHandle?: $$Props['dragHandle'];
		type?: $$Props['type'];
		selected?: $$Props['selected'];
		isConnectable?: $$Props['isConnectable'];
		zIndex?: $$Props['zIndex'];
		width?: $$Props['width'];
		height?: $$Props['height'];
		dragging: $$Props['dragging'];
		targetPosition?: $$Props['targetPosition'];
		sourcePosition?: $$Props['sourcePosition'];
		children?: import('svelte').Snippet;
	}

	let {
		id,
		data,
		dragHandle = undefined,
		type = undefined,
		selected = undefined,
		isConnectable = true,
		zIndex = 0,
		width = undefined,
		height = undefined,
		dragging,
		targetPosition = undefined,
		sourcePosition = undefined,
		children
	}: Props = $props();
	sourcePosition;
	let buttonElement: HTMLButtonElement = $state();

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
		oncontextmenu={stopPropagation(setNodeContext)}
		onclick={setNodeContext}
	>
		<ContextMenu.Trigger>
			{@render children?.()}
		</ContextMenu.Trigger>
	</button>
</div>