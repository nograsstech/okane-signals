import { Position } from '@xyflow/svelte';

const nodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left
};

export const SAMPLE_SVELTE_FLOW_DATA = [
	{
		id: '1', // required and needs to be a string
		position: { x: 0, y: 0 }, // required
		data: { label: 'hey' }, // required
		...nodeDefaults
	},
	{
		id: '2',
		position: { x: 100, y: 100 },
		data: { label: 'world' },
		...nodeDefaults
	}
	// {
	//   id: '3',
	//   type: 'color-picker',
	//   position: { x: 100, y: 100 },
	//   data: { color: writable('#ff4000') },
	//   ...nodeDefaults
	// }
];

export const SAMPLE_SVELTE_FLOW_EDGE_DATA = [
	{ id: '1-2', source: '1', target: '2', animated: true }
];
