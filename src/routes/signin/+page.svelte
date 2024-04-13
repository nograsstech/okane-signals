<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { SignIn } from '@auth/sveltekit/components';

	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';

	let visible = false;
	
	// on mount, set visibel to true
	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});
</script>

<div class="w-md h-screen pt-16 lg:grid lg:grid-cols-2">
	<div class="flex items-center py-12">
		{#if visible}
			<div
				class="mx-auto grid w-[350px] gap-6"
				transition:fly={{ delay: 250, duration: 800, x: 0, y: 200, opacity: 0, easing: quintOut }}
			>
				<Card.Root class="p-4 w-fit">
					<div class="grid gap-2">
						<h1 class="text-3xl font-bold">Login</h1>
						<p class="text-balance text-muted-foreground">Choose your login provider to continue</p>
					</div>
					<div class="grid gap-4 mt-4">
						<SignIn provider="google">
							<div slot="submitButton">
								<Button variant="outline" class="relative w-72">
									<img
										src="/images/icons/google.svg"
										alt="Sign in with Google"
										class="absolute left-2 h-5 w-5"
									/>
									<span>Sign in with Google</span>
								</Button>
							</div>
						</SignIn>
						<SignIn provider="github">
							<div slot="submitButton">
								<Button variant="outline" class="relative w-72">
									<img
										src="/images/icons/github.svg"
										alt="Sign in with GitHub"
										class="absolute left-2 h-5 w-5 rounded-xl bg-white"
									/>
									<span>Sign in with GitHub</span>
								</Button>
							</div>
						</SignIn>
					</div>
				</Card.Root>
			</div>
		{/if}
	</div>
	<div class="hidden dark:bg-muted lg:block">
		<img
			src="/images/login-page-cover.svg"
			alt="placeholder"
			class="h-[calc(100vh-64px)] w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
