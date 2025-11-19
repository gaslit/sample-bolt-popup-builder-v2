<script lang="ts">
  import { ArrowRight } from 'carbon-icons-svelte';
  import { popupBuilder } from '$lib/stores/popupBuilder.svelte';
  import { templates, templateCategories } from '$lib/data/templates';
  import type { TemplateCategory } from '$lib/types';

  let filteredTemplates = $derived(templates.filter(template => {
    const matchesLayout = !popupBuilder.selectedLayout || template.layout === popupBuilder.selectedLayout;
    return matchesLayout;
  }));

  function handleTemplateSelect(template: typeof templates[0]) {
    popupBuilder.setSelectedTemplate(template);
  }

  function handleContinue() {
    popupBuilder.setCurrentStep('customize');
  }

  function getTemplateEmoji(template: typeof templates[0]) {
    const categoryEmojis: Record<string, string> = {
      'lead-generation': '📧',
      'sales': '💰',
      'announcements': '📢',
      'onboarding': '🚀',
      'system': '⚙️',
      'compliance': '🛡️',
      'conversion': '🎯',
      'social-proof': '⭐'
    };
    return categoryEmojis[template.category] || '📄';
  }
</script>

<div>
  <div class="text-center mb-12">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Choose Your Template
    </h3>
    <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Select a professionally designed template that matches your goals. You can customize everything later.
    </p>
  </div>

  <!-- Templates Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredTemplates as template}
      <div
        onclick={() => handleTemplateSelect(template)}
        class={`
          relative group cursor-pointer bg-white dark:bg-gray-800 rounded-xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl
          ${popupBuilder.selectedTemplate?.id === template.id
            ? 'border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900 shadow-lg'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }
        `}
      >
        <!-- Template Type Pill - Upper Right -->
        <div class="absolute top-3 right-3 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full uppercase tracking-wide">
          {template.layout}
        </div>

        <!-- Template Emoji -->
        <div class="text-center mb-4 pt-6">
          <div class="text-4xl mb-3 h-12 flex items-center justify-center">
            {getTemplateEmoji(template)}
          </div>
        </div>

        <!-- Template Info -->
        <div class="text-center">
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {template.name}
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {template.description}
          </p>
        </div>

      </div>
    {/each}
  </div>

  {#if filteredTemplates.length === 0}
    <div class="text-center py-16">
      <p class="text-gray-500 dark:text-gray-400">
        No templates found for the selected layout.
      </p>
    </div>
  {/if}

  {#if popupBuilder.selectedTemplate}
    <div class="text-center mt-12">
      <button
        onclick={handleContinue}
        class="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        <span>Customize Template</span>
        <ArrowRight size={20} />
      </button>
    </div>
  {/if}
</div>
