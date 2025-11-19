<script lang="ts">
  import CustomizationSidebar from './CustomizationSidebar.svelte';
  import PreviewPanel from './PreviewPanel.svelte';
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
  <!-- Sidebar -->
  <div class="lg:col-span-1">
    <CustomizationSidebar />
  </div>

  <!-- Preview -->
  <div class="lg:col-span-2 h-full">
    <PreviewPanel />
  </div>
</div>
