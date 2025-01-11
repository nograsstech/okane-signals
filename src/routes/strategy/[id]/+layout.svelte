<script lang="ts">
	import PageContainer from '@/components/ui/container/page-container.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<PageContainer>
	{@render children?.()}
</PageContainer>
