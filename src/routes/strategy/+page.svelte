<script lang="ts">
	import StrategyTable from '@/components/strategy/strategy-table.svelte';
	import PageContainer from '@/components/ui/container/page-container.svelte'; 
  
	export let data;
</script>

<PageContainer>
	<StrategyTable data={data.strategyList}/>
</PageContainer>
