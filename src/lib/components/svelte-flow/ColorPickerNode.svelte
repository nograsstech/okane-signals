<script lang="ts">
	import { debounce } from '@/utils/debounce';
	import { Handle, Position, useSvelteFlow, type NodeProps } from '@xyflow/svelte';
	import type { Writable } from 'svelte/store';

	export let data: { color: Writable<string> };
	export let id: $$Props['id'];

	type $$Props = NodeProps & { data: { color: Writable<string> } };
	type InputChangeEvent = Event & {
		target?: EventTarget & HTMLInputElement;
	};
	
	const { updateNodeData } = useSvelteFlow();

	const handleInput = (evt: unknown) => {
		const changeEvent = evt as InputChangeEvent;
		debounce(
			() => updateNodeData(id, { color: changeEvent.target ? changeEvent.target.value : '' }),
			300
		);
	};

	const { color } = data;
</script>

<div class="colorpicker">
	<Handle type="target" position={Position.Left} />
	<div class="h-24 w-24 rounded-sm border border-black bg-slate-200 p-2">
		color: <strong>{$color}</strong>
		<input class="nodrag" type="color" on:input={handleInput} value={$color} />
	</div>
	<Handle type="source" position={Position.Right} />
</div>
