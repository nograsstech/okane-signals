<script lang="ts">
	type Props = {
		date: number;
	};
	interface Props {
		date: number;
	}

	let { date }: Props = $props();
</script>

<footer class="">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<div class="xl:grid xl:grid-cols-3 xl:gap-8">
			<div class="space-y-8 xl:col-span-1">
				<img class="h-10" src="/images/okane-logo.png" alt="Company name" />
				<p class="text-base text-gray-400">
					Empowering traders with custom strategies and real-time insights.
				</p>
				<div class="flex space-x-6">
					<a href="/" class="text-gray-400 hover:text-gray-300">
						<span class="sr-only">Facebook</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<!-- Facebook SVG icon -->
						</svg>
					</a>
					<a href="/" class="text-gray-400 hover:text-gray-300">
						<span class="sr-only">Twitter</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<!-- Twitter SVG icon -->
						</svg>
					</a>
					<a href="/" class="text-gray-400 hover:text-gray-300">
						<span class="sr-only">Instagram</span>
						<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<!-- Instagram SVG icon -->
						</svg>
					</a>
				</div>
			</div>
			<div class="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
				<div class="md:grid md:grid-cols-2 md:gap-8">
					<div>
						<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">Products</h3>
						<ul class="mt-4 space-y-4">
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Trading Strategies </a>
							</li>
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Market Insights </a>
							</li>
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100">
									Educational Resources
								</a>
							</li>
						</ul>
					</div>
					<div class="mt-12 md:mt-0">
						<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">Support</h3>
						<ul class="mt-4 space-y-4">
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> FAQs </a>
							</li>
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Contact Us </a>
							</li>
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Terms of Service </a>
							</li>
						</ul>
					</div>
				</div>
				<div class="md:grid md:grid-cols-2 md:gap-8">
					<div>
						<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">Company</h3>
						<ul class="mt-4 space-y-4">
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> About </a>
							</li>
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Careers </a>
							</li>
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Press </a>
							</li>
						</ul>
					</div>
					<div class="mt-12 md:mt-0">
						<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
						<ul class="mt-4 space-y-4">
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Privacy Policy </a>
							</li>
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Terms & Conditions </a>
							</li>
							<li>
								<a href="/" class="text-base opacity-60 hover:opacity-100"> Disclaimer </a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-12 border-t border-gray-700 pt-8">
			<p class="text-base text-gray-400 xl:text-center">
				&copy; {new Date(date).getFullYear()} Your Company Name. All rights reserved.
			</p>
		</div>
	</div>
</footer>
