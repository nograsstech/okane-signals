<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import Input from '@/components/ui/input/input.svelte';
	import { cn, generateThreadId } from '../../lib/utils';
	import Button from '@/components/ui/button/button.svelte';
	// @ts-ignore
	import { marked } from 'marked';
	// States
	let messages: string[] = [];
	let inputValue: string = '';
	let threadId: string = '';
	let loading: boolean = false;

	// Ref
	let chatWindow: HTMLDivElement;

	// Add scroll function
	const scrollToBottom = () => {
		requestAnimationFrame(() => {
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'instant'
			});
		});
	};

	onMount(() => {
		const storedThreadId = localStorage.getItem('threadId');
		if (storedThreadId) {
			threadId = storedThreadId;
		} else {
			const newThreadId = generateThreadId();
			localStorage.setItem('threadId', newThreadId);
			threadId = newThreadId;
		}

		// Call the /chat endpoint to get the initial chat history
		fetch(`http://localhost:8000/ai/chat?thread_id=${threadId}`)
			.then((response) => response.json())
			.then((data) => {
				console.log('Initial chat history:', data);
				if (data && data.content && Array.isArray(data.content)) {
					messages = [data.content]; // Wrap in array to match streaming format
				}
			})
			.catch((error) => {
				console.error('Error fetching initial chat history:', error);
			});
	});

	const clearThread = () => {
		localStorage.removeItem('threadId');
		const newThreadId = generateThreadId();
		localStorage.setItem('threadId', newThreadId);
		threadId = newThreadId;
		messages = [];
	};

	const getChatResponse = (inputValue: string) => {
		loading = true;
		fetch('http://localhost:8000/ai/chatbot-with-tool', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: inputValue,
				thread_id: threadId
			})
		})
			.then((response) => {
				const reader = response.body?.getReader();
				const decoder = new TextDecoder();

				const push = () => {
					reader
						?.read()
						.then(({ done, value }) => {
							if (done) {
								loading = false;
								scrollToBottom(); // Final scroll after stream complete
								return;
							}
							const chunk = decoder.decode(value);
							const lines = chunk.split('---END---').filter((line) => line.trim() !== '');
							lines.forEach((line) => {
								try {
									const messageData = JSON.parse(line);
									if (messageData.status === 'streaming') {
										messages = [...messages, messageData.content];
										setTimeout(() => {
											scrollToBottom(); // Scroll after each message
										}, 0);
									}
								} catch (e) {
									console.error('Error parsing JSON:', line, e);
								}
							});
							push();
						})
						.catch((error) => {
							console.error('Streaming error:', error);
							reader?.cancel();
						});
				};

				push();
			})
			.catch((error) => {
				console.error('Fetch error:', error);
				loading = false;
			});
	};

	const parseMessage = (messages: any, index: number = 0) => {
		try {
			if (messages && (messages.at(-1) ?? []).at(index).role === 'values') {
				return JSON.stringify((messages.at(-1) ?? []).at(index).content.messages, null, 2);
			}
		} catch (e) {}
	};

	const parseContent = (content: any) => {
		try {
			return JSON.stringify(JSON.parse(content), null, 2);
		} catch (e) {
			return content;
		}
	};
</script>

<div class="container relative mx-auto h-screen p-4 pt-16 max-w-screen-xl">
	<div class="chat-window h-fit overflow-y-auto pb-32" bind:this={chatWindow}>
		{#if messages && messages.at(-1) && parseMessage(messages, -1)}
			<Collapsible.Root class="w-full flex flex-col items-center justify-center mb-4">
				<Collapsible.Trigger
					><Button variant="link" size="sm" class="w-full text-xs hover:underline p-1 py-0">
						View Details
					</Button></Collapsible.Trigger
				>
				<Collapsible.Content>
					<div class="bg-muted p-2 text-xs">
						<pre class="text-wrap" style="text-wrap: wrap;">{parseMessage(messages, -1)}</pre>
					</div></Collapsible.Content
				>
			</Collapsible.Root>
			{#each JSON.parse(parseMessage(messages, -1) as string) as message, index}
				<Card
					class={cn(
						'message mb-2',
						message.role === 'user' ? 'ml-auto !w-fit max-w-screen-lg bg-slate-500/20' : 'border-none '
					)}
				>
					<CardContent class="w-fit p-4">
						<!-- <pre class="text-wrap" style="text-wrap: wrap;">{parseContent(message.content)}</pre> -->
						<div class="preview">{@html marked(parseContent(message.content))}</div>
					</CardContent>
				</Card>
			{/each}
			{#if loading}
				<div class="flex items-center justify-center">
					<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-500"></div>
				</div>
			{/if}
		{/if}
	</div>
	<div
		class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-4 pb-6 bg-background border-t border-muted"
	>
		<div class="mx-auto max-w-3xl">
			<!-- Thread info and controls -->
			<div class="mb-2 flex items-center justify-between px-1 text-xs text-muted-foreground">
				<span>Thread ID: {threadId}</span>
				<button
					on:click={clearThread}
					class="flex items-center transition-colors hover:text-foreground"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-1"
						><path d="M12 20v-8"></path><path d="M18 20V8"></path><path d="M6 20V8"></path><path
							d="M18 4H6"
						></path></svg
					>
					Start new thread
				</button>
			</div>

			<!-- Main input form -->
			<div class="">
				<form
					on:submit={(e) => {
						e.preventDefault();
						getChatResponse(inputValue);
						inputValue = '';
					}}
					class="relative"
				>
					<div
						class="relative flex items-center rounded-lg border bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring"
					>
						<Input
							name="input"
							placeholder="Message Okane AI..."
							bind:value={inputValue}
							class="flex-1 border-0 py-3 pl-4 pr-12 shadow-none focus-visible:ring-2 focus-visible:ring-transparent"
						/>
						<Button
							type="submit"
							variant="ghost"
							size="icon"
							class="absolute right-2 h-8 w-8 text-primary hover:bg-primary/10"
							disabled={!inputValue.trim()}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg
							>
							<span class="sr-only">Send</span>
						</Button>
					</div>

					<!-- System message -->
					<p class="mt-2 text-center text-xs text-muted-foreground">
						Okane AI can provide financial insights and information to help with your investment
						decisions.
					</p>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
	.chat-window {
		display: flex;
		flex-direction: column; /* To show latest messages at the bottom */
	}
</style>
