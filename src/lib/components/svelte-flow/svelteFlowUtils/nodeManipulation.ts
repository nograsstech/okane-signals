import type { Node, Position } from '@xyflow/svelte';

/**
 * Adds a new node at the current mouse position.
 *
 * @param e - The mouse event.
 * @param nodes - The current list of nodes.
 * @param nodeDefaults - The default properties for a new node.
 * @param pageX - The X coordinate of the mouse event.
 * @param pageY - The Y coordinate of the mouse event.
 * @returns The new list of nodes.
 */
export function addNode(
	e: MouseEvent,
	nodes: Node[],
	nodeDefaults: {
		sourcePosition: Position;
		targetPosition: Position;
	},
	pageX: number,
	pageY: number
) {
	return [
		...nodes,
		{
			id: String(nodes.length + 1),
			position: { x: pageX, y: pageY },
			data: { label: 'new' },
			...nodeDefaults
		}
	];
}
