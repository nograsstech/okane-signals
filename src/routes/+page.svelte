<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { KEY_FEATURES } from '$lib/constants/landing';
	import GridAndDotBackgrounds from '@/components/ui/GridAndDotBackground/GridAndDotBackgrounds.svelte';
	import Sparkles from '@/components/ui/Sparkles/Sparkles.svelte';
	import CardBody from '@/components/ui/ThreeDCardEffect/CardBody.svelte';
	import CardContainer from '@/components/ui/ThreeDCardEffect/CardContainer.svelte';
	import CardItem from '@/components/ui/ThreeDCardEffect/CardItem.svelte';
	import PageContainer from '@/components/ui/container/page-container.svelte';
	import LandingFooter from '@/components/ui/footer/landing-footer.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let { data } = $props();

	let ready = $state(false);
	let isMouseEntered = $state(false);
  
	onMount(() => ready = true);
</script>

<section class="relative h-[1000px] md:h-[1200px]">
	<div
		class="-z-1 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 transform"
		aria-hidden="true"
	></div>

	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="pb-12 pt-32 md:pb-20 md:pt-40">
			<div class="pb-12 text-center md:pb-16">

					<h1
						class="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl"
						data-aos="zoom-y-out"
					>
						Build <span
							class="bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent"
							>Winning</span
						>
						Trading Strategies
					</h1>
					<div class="mx-auto max-w-3xl">
						<p class="mb-8 text-xl text-gray-600" data-aos="zoom-y-out" data-aos-delay="150">
							Create custom trading strategies tailored to your preferences and risk appetite. Adjust
							parameters, backtest your strategies, and get trading notifications.
						</p>
						<div
							class="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center"
							data-aos="zoom-y-out"
							data-aos-delay="300"
						>
							<div class="mt-4 flex items-center gap-x-6 lg:justify-center">
								<Button href="/get-started" variant="default" size="lg">Get started</Button>
								<Button href="/learn-more" variant="link" size="lg" class="">Learn more</Button>
							</div>
						</div>
					</div>
				<div class="h-24 md:h-48"></div>
				{#if ready}
					<div class="h-96" in:fly={{ duration: 800, y: 100 }}>
						<GridAndDotBackgrounds>
							<CardContainer bind:isMouseEntered className="inter-var" containerClassName=" text-start">
								<CardBody
									className="bg-gray-50 relative group/card bg-gradient-to-r from-teal-200 to-teal-500  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black  w-auto lg:w-[800rem] max-w-3xl h-auto rounded-xl p-2 border  "
								>
									<CardItem {isMouseEntered} translateZ="100" className="w-full relative">
										<div class="relative">
											<img
												src="/images/landing/strategy.webp"
												height="528"
												width="750"
												class="h-full w-full rounded-xl object-cover group-hover/card:shadow-xl"
												alt="thumbnail"
											/>
											<div
												class="absolute -right-40 top-32 scale-[0.4] rounded-md shadow-xl lg:-right-96 lg:top-12"
											>
												<img
													src="/images/landing/backtest.webp"
													height="292"
													width="454"
													class="scale-5 h-full w-full rounded-xl object-cover group-hover/card:shadow-2xl"
													alt="thumbnail"
												/>
											</div>
										</div>
									</CardItem>
								</CardBody>
							</CardContainer>
						</GridAndDotBackgrounds>
					</div>
				{:else}
					<div class="h-96"></div>
				{/if}

			</div>
		</div>
	</div>
</section>

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
					<dl class="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
						{#each KEY_FEATURES as feature}
							<div class="flex gap-4">
								<feature.icon class="inline-block h-10 w-10" />
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
			<Card.Root class="mt-40 h-fit pt-6">
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
