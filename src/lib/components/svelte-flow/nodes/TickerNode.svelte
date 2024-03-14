<script lang="ts">
	// @ts-nocheck
	import { Handle, Position } from '@xyflow/svelte';

	import InteractiveNode from './InteractiveNode.svelte';

	import * as Sheet from '$lib/components/ui/sheet';
	import Button from '../../ui/button/button.svelte';
	import { cn } from '@/utils';
	import TickerAutocomplete from '@/components/autocomplete/TickerAutocomplete.svelte';

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

	const tickerNodeHandleStyle = 'h-8 w-2 rounded-sm border-2';
</script>

<InteractiveNode {...$$props}>
	<div class="node light ">
		<div class="flex justify-start items-start h-fit w-fit flex-col rounded-sm border border-black bg-slate-200 p-2">
			<div class="w-96 flex flex-col justify-start items-start">
				<div>Ticker Node</div>
				<TickerAutocomplete />
				<Sheet.Trigger class="h-fit w-fit">
					<Button variant="ghost" class="mt-2">View Details</Button>
				</Sheet.Trigger>
			</div>
		</div>
		<Handle type="source" position={Position.Right} class="ticker-node-source-handle" />
	</div>
</InteractiveNode>
