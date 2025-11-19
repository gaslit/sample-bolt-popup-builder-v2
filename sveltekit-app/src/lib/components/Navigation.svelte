<script lang="ts">
  import { ChartLineData, Bullhorn, Settings, Target, ChevronDown } from 'carbon-icons-svelte';
  import { popupBuilder } from '$lib/stores/popupBuilder.svelte';
  import type { NavigationTab } from '$lib/types';

  const navigationItems: { id: NavigationTab; label: string; icon: any }[] = [
    { id: 'placements', label: 'Placements', icon: Target },
    { id: 'campaigns', label: 'Campaigns', icon: Bullhorn },
    { id: 'analytics', label: 'Analytics', icon: ChartLineData },
    { id: 'integrations', label: 'Integrations', icon: Settings },
  ];

  let selectedTenant = $state('Group');
  let isDropdownOpen = $state(false);

  const tenantOptions = ['Group', 'Item 1', 'Item 2', 'Item 3', 'Item 4'];

  function setActiveTab(tab: NavigationTab) {
    popupBuilder.setActiveTab(tab);
  }
</script>

<div class="bg-white border-b border-gray-200 py-3">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center">
      <!-- Vanilla Sky - Left side, vertically centered -->
      <div class="flex-shrink-0 mr-8">
        <h1 class="text-2xl font-bold text-gray-900">
          Vanilla Sky
        </h1>
      </div>

      <!-- Right side content -->
      <div class="flex-1 flex flex-col justify-center space-y-2">
        <!-- Tenant Dropdown - Above the line -->
        <div class="flex items-center justify-start">
          <div class="relative">
            <button
              onclick={() => isDropdownOpen = !isDropdownOpen}
              class="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <span>{selectedTenant}</span>
              <ChevronDown size={16} />
            </button>

            {#if isDropdownOpen}
              <div class="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div class="py-1">
                  {#each tenantOptions as option}
                    <button
                      onclick={() => {
                        selectedTenant = option;
                        isDropdownOpen = false;
                      }}
                      class={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                        selectedTenant === option
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Horizontal Rule -->
        <div class="border-b border-gray-200 -mx-2"></div>

        <!-- Main Navigation and Settings - Below the line -->
        <div class="flex items-center justify-between">
          <nav class="flex space-x-1">
            {#each navigationItems as item}
              <button
                onclick={() => setActiveTab(item.id)}
                class={`
                  flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${popupBuilder.activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <svelte:component this={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            {/each}
          </nav>

          <button class="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
