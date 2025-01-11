<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="mx-auto max-w-7xl px-6 lg:px-8">
  {@render children?.()}
</div>