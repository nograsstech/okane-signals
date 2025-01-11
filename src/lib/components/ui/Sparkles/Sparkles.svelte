<script lang="ts">
	import { cn } from '@/utils';
	import { Motion } from 'svelte-motion';
	let randomMove = () => Math.random() * 4 - 2;

	interface Props {
		minSize?: number;
		maxSize?: number;
		speed?: number;
		particleColor?: string;
		particleDensity?: number | undefined;
		className?: string | undefined;
	}

	let {
		minSize = 0.6,
		maxSize = 1.5,
		speed = 3,
		particleColor = '#ffffff',
		particleDensity = 200,
		className = undefined
	}: Props = $props();

	function getRandomValue() {
		return minSize + Math.random() * (maxSize - minSize);
	}
</script>

<div class={cn('relative h-48', className)}>
	<div class="absolute inset-0">
		{#each [...Array(particleDensity)] as _, i (`star-${i}`)}
			<Motion
				
				animate={{
					top: `calc(${Math.random() * 100}% + ${randomMove()}px)`,
					left: `calc(${Math.random() * 100}% + ${randomMove()}px)`,
					opacity: Math.random(),
					scale: [1, 1.2, 0]
				}}
				transition={{
					duration: Math.random() * 10 + speed,
					repeat: Infinity,
					ease: 'linear'
				}}
			>
				{#snippet children({ motion })}
								<span
						use:motion
						class="inline-block"
						style={`position: absolute; width: ${getRandomValue()}px; height: ${getRandomValue()}px; background-color: ${particleColor}; border-radius: 50%; top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;`}
					></span>
											{/snippet}
						</Motion>
		{/each}
	</div>
</div>