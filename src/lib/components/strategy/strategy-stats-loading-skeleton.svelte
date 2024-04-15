<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import Skeleton from '@/components/ui/skeleton/skeleton.svelte';
</script>

<Card.Root>
  <Card.Header>
    <Card.Title><Skeleton class="h-[20px] w-[100px] rounded-full" /></Card.Title>
    <Card.Description><Skeleton class="h-[20px] w-[200px] rounded-full" /></Card.Description>
  </Card.Header>
  <Card.Content>
    <Skeleton class="mb-1 h-8 w-[200px] rounded-md my-4" />
    <div class="flex gap-4">
      <Skeleton class="mb-1 h-24 w-[200px] rounded-md" />
      <Skeleton class="mb-1 h-24 w-[200px] rounded-md" />
    </div>
    <Skeleton class="mb-1 h-8 w-[200px] rounded-md my-4" />
    <div class="flex gap-4">
      <Skeleton class="mb-1 h-24 w-[200px] rounded-md" />
      <Skeleton class="mb-1 h-24 w-[200px] rounded-md" />
    </div>
  </Card.Content>
</Card.Root>