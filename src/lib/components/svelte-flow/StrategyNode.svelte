<script lang="ts">
	// @ts-nocheck
	import { Handle, Position } from '@xyflow/svelte';

	import InteractiveNode from './InteractiveNode.svelte';

	import * as Sheet from '$lib/components/ui/sheet';
	import Button from '../ui/button/button.svelte';

	type $$Props = NodeProps;

	export let id: $$Props['id'];
	id;
	export let data: $$Props['data'];
	data;
	export let dragHandle: $$Props['dragHandle'] = undefined;
	dragHandle;
	export let type: $$Props['type'] = undefined;
	type;
	export let selected: $$Props['selected'] = undefined;
	selected;
	export let isConnectable: $$Props['isConnectable'] = undefined;
	isConnectable;
	export let zIndex: $$Props['zIndex'] = undefined;
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
	export let positionAbsoluteX: $$Props['positionAbsoluteX'] = undefined;
	positionAbsoluteX;
	export let positionAbsoluteY: $$Props['positionAbsoluteY'] = undefined;
	positionAbsoluteY;
</script>

<InteractiveNode {...$$props}>
	<Handle type="target" position={Position.Left} class="h-8 w-2 rounded-sm  border-2" />
	<div class="flex h-fit w-fit flex-col rounded-sm border border-black bg-slate-200 p-2">
		<div>Strategy Node</div>
		<Sheet.Trigger class="h-fit w-fit">
			<Button variant="ghost" class="mt-2">View Details</Button>
		</Sheet.Trigger>
	</div>
	<Handle type="source" position={Position.Right} class="h-8 w-2 rounded-sm border-2" />
</InteractiveNode>
