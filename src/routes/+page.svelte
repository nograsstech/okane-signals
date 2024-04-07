<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { KEY_FEATURES } from '$lib/constants/landing';
	import PageContainer from '@/components/ui/container/page-container.svelte';
	import LandingFooter from '@/components/ui/footer/landing-footer.svelte';


	export let data
</script>

<!-- src/routes/+page.svelte -->
<div class=" overflow-hidden py-24 sm:py-32">
	<div class="relative mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:text-center">
			<h2 class="text-base font-semibold leading-7">okane signals</h2>
			<p class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
				Build Winning Trading Strategies<br /> with Precision
			</p>
			<p class="mt-6 text-lg leading-8 opacity-60">
				Create custom trading strategies tailored to your preferences and risk appetite. Adjust
				parameters, backtest your strategies, and get trading notifications.
			</p>
			<div class="mt-10 flex items-center gap-x-6 lg:justify-center">
				<Button href="/get-started" variant="default" size="lg">Get started</Button>
				<Button href="/learn-more" variant="link" size="lg" class="">Learn more</Button>
			</div>
		</div>
	</div>
	<div
		class="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden blur-2xl sm:inset-x-0 md:inset-x-auto md:inset-y-auto md:w-full"
		aria-hidden="true"
	>
		<div
			class="animate-gradient relative bottom-24 left-1/2 -z-10 aspect-[1155/678] w-[36rem] max-w-none rotate-[30deg] rounded-full bg-gradient-to-br from-[#ff6b6b] via-[#ff8a8a] to-[#ff6b6b] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%);"
		/>
	</div>
</div>

<div class="relative overflow-hidden py-24 sm:py-32">
	<PageContainer>
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
		>
			<div class="lg:pr-8 lg:pt-4">
				<div class="lg:max-w-lg">
					<h2 class="text-base font-semibold leading-7 text-indigo-600">Key Features</h2>
					<p class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
						A better workflow for modern development
					</p>
					<p class="mt-6 text-lg leading-8 text-gray-600">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, nulla vel quisquam
						earum accusantium.
					</p>
					<dl class="mt-10 max-w-xl space-y-8 text-base leading-7  lg:max-w-none">
						{#each KEY_FEATURES as feature}
							<div class="flex gap-4">
								<svelte:component this={feature.icon} class="inline-block h-10 w-10" />
								<div class="relative">
									<dt class="inline font-semibold opacity-80">
										{feature.title}
									</dt>
									<br />
									<dd class="inline text-gray-600">
										{feature.description}
									</dd>
								</div>
							</div>
						{/each}
					</dl>
				</div>
			</div>
			<Card.Root class="mt-40 pt-6 h-fit">
				<Card.Content class="h-fit">
					<img
						src="/images/initial-idea.svg"
						alt="Product screenshot"
						class="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10"
					/>
				</Card.Content>
			</Card.Root>
		</div>
	</PageContainer>
</div>
<LandingFooter date={data.time} />
