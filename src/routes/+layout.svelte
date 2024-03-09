<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from "mode-watcher";
	import LandingNavbar from '@/components/ui/navbar/landing-navbar.svelte';
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<ModeWatcher />
<LandingNavbar />
<slot />
