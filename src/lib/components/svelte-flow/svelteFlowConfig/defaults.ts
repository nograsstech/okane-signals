import { Position, type NodeTypes } from '@xyflow/svelte';
import ColorPickerNode from '../ColorPickerNode.svelte';
import InteractiveNode from '../InteractiveNode.svelte';
import TickerNode from '../TickerNode.svelte';
import StrategyNode from '../StrategyNode.svelte';

export const nodeTypes = {
	'color-picker': ColorPickerNode,
	'interactive-node': InteractiveNode,
	'ticker-node': TickerNode,
	'strategy-node': StrategyNode
} as unknown as NodeTypes;

export const nodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left
};
