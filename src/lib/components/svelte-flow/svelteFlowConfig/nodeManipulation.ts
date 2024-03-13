import type { Node, Position } from '@xyflow/svelte';
import { nodes as nodesList } from '$lib/../store/ContextStore';

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
	type: string,
	nodes: Node[],
	nodeDefaults: {
		sourcePosition: Position;
		targetPosition: Position;
		data: { [label: string]: string };
	},
	pageX: number,
	pageY: number
) {
	const result = [
		...nodes,
		{
			id: String(nodes.length + 1),
			position: { x: pageX, y: pageY - 120 },
			type: type ?? 'interactive-node',
			...nodeDefaults
		}
	];
	nodesList.set(result)
}

export function deleteNode(nodeId: string, nodes: Node[]) {
	const result = nodes.filter((node) => node.id !== nodeId);
	nodesList.set(result)
	return result
}
