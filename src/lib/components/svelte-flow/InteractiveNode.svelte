<script lang="ts">
	import { Handle, Position } from '@xyflow/svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Button from '../ui/button/button.svelte';
</script>

<div class="colorpicker">
	<Handle type="target" position={Position.Left} />
	<div class="h-fit w-fit flex flex-col rounded-sm border border-black bg-slate-200 p-2">
    <div>Hello</div>

		<Sheet.Trigger class="w-fit h-fit">
			<Button variant="ghost" class="mt-2">
				View Details
			</Button>
		</Sheet.Trigger>
	</div>
	<Handle type="source" position={Position.Right} />
</div>
