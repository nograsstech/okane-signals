<script lang="ts">
  import { run } from 'svelte/legacy';

  import { getBezierPath, useNodes, type Node, type EdgeProps } from '@xyflow/svelte';
  import { getEdgeParams } from './utils';

  type $$Props = EdgeProps;

  interface Props {
    source: $$Props['source'];
    target: $$Props['target'];
    id: $$Props['id'];
  }

  let { source, target, id }: Props = $props();

  const nodes = useNodes();

  let sourceNode: Node | undefined = $state();
  let targetNode: Node | undefined = $state();

  let edgePath: string | undefined = $state();

  run(() => {
    $nodes.forEach((node) => {
      if (node.id === source) sourceNode = node;
      if (node.id === target) targetNode = node;
    });
    if (sourceNode && targetNode) {
      const edgeParams = getEdgeParams(sourceNode, targetNode);
      edgePath = getBezierPath({
        sourceX: edgeParams.sx,
        sourceY: edgeParams.sy,
        sourcePosition: edgeParams.sourcePos,
        targetPosition: edgeParams.targetPos,
        targetX: edgeParams.tx,
        targetY: edgeParams.ty
      })[0];
    } else {
      edgePath = undefined;
    }
  });
</script>

<path class="svelte-flow__edge-path" {id} d={edgePath} />