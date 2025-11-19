<script lang="ts">
  import { popupBuilder } from '$lib/stores/popupBuilder.svelte';
  import PlacementsSection from '$lib/components/sections/PlacementsSection.svelte';
  import CampaignsSection from '$lib/components/sections/CampaignsSection.svelte';
  import AnalyticsSection from '$lib/components/sections/AnalyticsSection.svelte';
  import IntegrationsSection from '$lib/components/sections/IntegrationsSection.svelte';
</script>

{#if popupBuilder.activeTab === 'placements'}
  <PlacementsSection />
{:else if popupBuilder.activeTab === 'campaigns'}
  <CampaignsSection />
{:else if popupBuilder.activeTab === 'analytics'}
  <AnalyticsSection />
{:else if popupBuilder.activeTab === 'integrations'}
  <IntegrationsSection />
{/if}
