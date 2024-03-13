import { type NodeProps } from '@xyflow/svelte';

// Supress unknown props warnings
type NodePropsType = NodeProps;
export const id: NodePropsType['id'] = '';
export const data: NodePropsType['data'] = {};
export const dragHandle: NodePropsType['dragHandle'] = undefined;
export const type: NodePropsType['type'] = undefined;
export const selected: NodePropsType['selected'] = undefined;
export const isConnectable: NodePropsType['isConnectable'] = true;
export const zIndex: NodePropsType['zIndex'] = 0;
export const width: NodePropsType['width'] = undefined;
export const height: NodePropsType['height'] = undefined;
export const dragging: NodePropsType['dragging'] = false;
export const targetPosition: NodePropsType['targetPosition'] = undefined;
export const sourcePosition: NodePropsType['sourcePosition'] = undefined;

export const SvelteFlowNodeProps = {
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
};
