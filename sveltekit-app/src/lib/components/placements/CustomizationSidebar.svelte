<script lang="ts">
  import { TextFont, ColorPalette, Laptop, Calendar, Target, Settings } from 'carbon-icons-svelte';
  import { popupBuilder } from '$lib/stores/popupBuilder.svelte';
  import ContentTab from './tabs/ContentTab.svelte';
  import StyleTab from './tabs/StyleTab.svelte';
  import DisplayTab from './tabs/DisplayTab.svelte';
  import ScheduleTab from './tabs/ScheduleTab.svelte';
  import TargetingTab from './tabs/TargetingTab.svelte';
  import BehaviorTab from './tabs/BehaviorTab.svelte';
  import type { CustomizeTab } from '$lib/types';

  const tabs: { id: CustomizeTab; label: string; icon: any }[] = [
    { id: 'content', label: 'Content', icon: TextFont },
    { id: 'style', label: 'Style', icon: ColorPalette },
    { id: 'display', label: 'Display', icon: Laptop },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'targeting', label: 'Targeting', icon: Target },
    { id: 'analytics', label: 'Behavior', icon: Settings },
  ];
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
  <!-- Tab Navigation -->
  <div class="border-b border-gray-200 dark:border-gray-700">
    <div class="grid grid-cols-3 lg:grid-cols-1">
      {#each tabs as tab}
        <button
          onclick={() => popupBuilder.setActiveCustomizeTab(tab.id)}
          class={`
            flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-200
            ${popupBuilder.activeCustomizeTab === tab.id
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
            }
           ${popupBuilder.activeCustomizeTab === tab.id && tab.id === 'content' ? 'rounded-tl-xl' : ''}
           ${popupBuilder.activeCustomizeTab === tab.id && tab.id === 'analytics' ? 'rounded-bl-xl' : ''}
          `}
        >
          <svelte:component this={tab.icon} size={16} />
          <span class="hidden lg:block">{tab.label}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Tab Content -->
  <div class="p-3 flex-1 overflow-y-auto">
    {#if popupBuilder.activeCustomizeTab === 'content'}
      <ContentTab />
    {:else if popupBuilder.activeCustomizeTab === 'style'}
      <StyleTab />
    {:else if popupBuilder.activeCustomizeTab === 'display'}
      <DisplayTab />
    {:else if popupBuilder.activeCustomizeTab === 'schedule'}
      <ScheduleTab />
    {:else if popupBuilder.activeCustomizeTab === 'targeting'}
      <TargetingTab />
    {:else if popupBuilder.activeCustomizeTab === 'analytics'}
      <BehaviorTab />
    {/if}
  </div>
</div>
