<script lang="ts">
  import { ArrowRight } from 'carbon-icons-svelte';
  import { popupBuilder } from '$lib/stores/popupBuilder.svelte';
  import { layoutTypes } from '$lib/data/templates';
  import type { LayoutType } from '$lib/types';

  function handleLayoutSelect(layout: LayoutType) {
    popupBuilder.setSelectedLayout(layout);
    popupBuilder.setCurrentStep('theme');
  }
</script>

<div>
  <div class="text-center mb-12">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Choose Your Popup Layout
    </h3>
    <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Select the layout type that best fits your needs. Each layout offers different user experiences and use cases.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
    {#each layoutTypes as layout}
      <div
        onclick={() => handleLayoutSelect(layout.id)}
        class={`
          relative group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl
          ${popupBuilder.selectedLayout === layout.id
            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900 shadow-xl'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }
        `}
      >
        <!-- Layout Preview -->
        <div class="mb-6 h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
          <div class="text-6xl font-bold text-gray-300 dark:text-gray-600">
            {layout.icon}
          </div>
        </div>

        <!-- Content -->
        <div class="text-center">
          <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {layout.name}
          </h4>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {layout.description}
          </p>
        </div>

        <!-- Selection Indicator -->
        {#if popupBuilder.selectedLayout === layout.id}
          <div class="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <div class="w-3 h-3 bg-white rounded-full" />
          </div>
        {/if}

        <!-- Hover Effect -->
        <div class="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-5 rounded-2xl transition-all duration-300" />
      </div>
    {/each}
  </div>

  {#if popupBuilder.selectedLayout}
    <div class="text-center mt-12">
      <button
        onclick={() => popupBuilder.setCurrentStep('theme')}
        class="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        <span>Continue to Theme Selection</span>
        <ArrowRight size={20} />
      </button>
    </div>
  {/if}
</div>
