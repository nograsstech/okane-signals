import {
	SAMPLE_SVELTE_FLOW_DATA,
	SAMPLE_SVELTE_FLOW_EDGE_DATA
} from '@/constants/sampleSvelteFlowData';
import { type Node, type Edge } from '@xyflow/svelte';
import { writable } from 'svelte/store';

export const selectedContext = writable('');
export const nodeContext = writable<Node>();
export const edgeContext = writable<Node>();

export const nodes = writable<Node[]>(
	(JSON.parse(window.localStorage.getItem('editor-nodes') ?? '[]') as Node[]) ??
		SAMPLE_SVELTE_FLOW_DATA
);
export const edges = writable(
	(JSON.parse(window.localStorage.getItem('editor-edges') ?? '[]') as Edge[]) ??
		SAMPLE_SVELTE_FLOW_EDGE_DATA
);
// Debugging Logs

if (import.meta.env.MODE === 'development' && import.meta.env.VITE_DEBUG === 'true') {
	selectedContext.subscribe((value) => {
		console.log('selectedContext:', value);
	});
	nodeContext.subscribe((value) => {
		console.log('nodeContextData:', value);
	});
	edgeContext.subscribe((value) => {
		console.log('edgeContextData:', value);
	});
}
