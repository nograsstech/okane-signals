<script>
	import * as Sheet from '$lib/components/ui/sheet';
	import { onMount } from 'svelte';
	import Button from '../button/button.svelte';
	import ThemeToggle from '../toggle/theme-toggle.svelte';
	import { cn } from '@/utils';
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar';
	import { navigating } from '$app/stores';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { SignOut } from "@auth/sveltekit/components"

	export let className = '';

	// States
	let scrolled = false;

	let open = false;
	$: if ($navigating) open = false;

	// Constants
	const scrolledStyle = 'shadow-sm bg-opacity-80 backdrop-blur-xl';
	const defaultStyle = 'bg-opacity-90';

	// If the scroll position is greater than 0, add a shadow to the navbar in svelte
	onMount(() => {
		scrolled = window.scrollY > 0;
		const updateScroll = () => {
			scrolled = window.scrollY > 0;
		};
		window.addEventListener('scroll', updateScroll);
		return () => {
			window.removeEventListener('scroll', updateScroll);
		};
	});

	// disable dynamic navbar
	const disableNavbarRegex = /^\/strategy\/\d+\/backtest$/;
	const pathname = $page.url.pathname;
	const disableNavbar = disableNavbarRegex.test(pathname);
</script>

<Sheet.Root bind:open>
	<nav
		class={cn(
			`fixed z-50 w-screen bg-primary-foreground shadow-sm transition-all duration-200 ease-in ${className.toString()}`,
			scrolled ? scrolledStyle : defaultStyle
		)}
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex">
					<div class="flex w-32 items-center">
						<a href="/" class="flex-shrink-0">
							<img class="h-8 w-auto" src="/images/okane-logo.png" alt="okane signals" />
						</a>
					</div>
					<div class="hidden content-center items-center justify-center sm:flex lg:space-x-2">
						<Button href="/strategy" variant="ghost">Strategy</Button>
						<Button href="/editor" variant="ghost">Editor</Button>
					</div>
				</div>
				<div class="flex w-48 items-center justify-end gap-4">
					{#if !disableNavbar}
						<ThemeToggle  />
						{#if $page?.data?.session}
							{#if $page.data.session.user?.image}
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<Avatar.Root>
											<Avatar.Image src={$page.data.session.user.image} alt="Profile Image" />
											<Avatar.Fallback>CN</Avatar.Fallback>
										</Avatar.Root>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content>
										<DropdownMenu.Group>
											<DropdownMenu.Label>My Okane Account</DropdownMenu.Label>
											<DropdownMenu.Separator />
											<DropdownMenu.Item>Profile</DropdownMenu.Item>
											<DropdownMenu.Item>Preferences</DropdownMenu.Item>
											<DropdownMenu.Separator />
											<SignOut>
												<DropdownMenu.Item slot="submitButton" class="text-red-900 w-[200px]">Sign Out</DropdownMenu.Item>
											</SignOut>
										</DropdownMenu.Group>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							{/if}
						{:else}
							<Button
								href="/signin"
								variant="outline"
								class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium "
							>
								Log in
							</Button>
						{/if}
					{/if}
					<div class="lg:hidden">
						<div
							class="flex h-9 w-9 justify-center rounded-sm bg-opacity-50 transition-all hover:bg-slate-500"
						>
							<Sheet.Trigger>
								<svg
									class="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
									/>
								</svg>
							</Sheet.Trigger>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Sheet.Content>
			<Sheet.Header>
				<Sheet.Title>Okene Signals</Sheet.Title>
				<Sheet.Description></Sheet.Description>
			</Sheet.Header>
			<div class="space-y-1 px-2 pb-3 pt-2">
				<Sheet.Trigger asChild>
					<Button href="/strategy" variant="ghost" class="w-full">Strategy</Button>
				</Sheet.Trigger>
				<Button href="/editor" variant="ghost" class="w-full">Editor</Button>
			</div>
		</Sheet.Content>
	</nav>
</Sheet.Root>
