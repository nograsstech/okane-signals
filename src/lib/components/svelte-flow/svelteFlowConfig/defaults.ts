import { Position, type NodeTypes, type EdgeTypes } from '@xyflow/svelte';
import ColorPickerNode from '../nodes/ColorPickerNode.svelte';
import InteractiveNode from '../nodes/InteractiveNode.svelte';
import TickerNode from '../nodes/TickerNode.svelte';
import StrategyNode from '../nodes/StrategyNode.svelte';
import SimpleFloatingEdge from '../edges/SimpleFloatingEdge.svelte';

export const nodeTypes = {
	'color-picker': ColorPickerNode,
	'interactive-node': InteractiveNode,
	'ticker-node': TickerNode,
	'strategy-node': StrategyNode
} as unknown as NodeTypes;

export const edgeTypes = {
	floating: SimpleFloatingEdge
} as unknown as EdgeTypes;

export const nodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left
};
