<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from "mode-watcher";
	import LandingNavbar from '@/components/ui/navbar/landing-navbar.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	let className: string | undefined | null = undefined;
	// export { className as class };
</script>

<ModeWatcher />
<LandingNavbar />
{@render children?.()}
