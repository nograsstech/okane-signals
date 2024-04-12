<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import LandingNavbar from '@/components/ui/navbar/landing-navbar.svelte';
	import { enhance } from '$app/forms';
	import { invalidate, invalidateAll, goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	$: ({ supabase } = data);

	let className: string | undefined | null = undefined;

	onMount(async () => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			// If you want to fain grain which routes should rerun their load function
			// when onAuthStateChange changges
			// use invalidate('supabase:auth')
			// which is linked to +layout.js depends('supabase:auth').
			// This should mainly concern all routes
			//that should be accesible only for logged in user.
			// Otherwise use invalidateAll()
			// which will rerun every load function of you app.
			invalidate('supabase:auth');
			invalidateAll();
		});
		return () => subscription.unsubscribe();
	});

	const submitLogout = async ({ cancel }) => {
		const { error } = await data.supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
		await goto('/');
	};
</script>

<ModeWatcher />
<LandingNavbar />
<div class="pt-20"></div>
<a href="/">Home</a>
<a href="/subscription">Subscriptions</a>

<span id="auth_header">
    {#if !data.session}
        <a href="/login">login</a> / <a href="/register">signup</a>
    {:else}
        <a href="/user_profile">User profile</a>
        <form action="/logout?/logout" method="POST" use:enhance={submitLogout}>
            <button type="submit">Logout</button>
        </form>
    {/if}
</span>
<slot />


<style>
	#auth_header {
			float: right;
	}
	form {
			display: inline;
	}
</style>
