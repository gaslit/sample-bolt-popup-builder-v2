<script lang="ts">
  import { ArrowLeft, Checkmark } from 'carbon-icons-svelte';
  import { popupBuilder } from '$lib/stores/popupBuilder.svelte';
  import LayoutSelection from './LayoutSelection.svelte';
  import ThemeSelection from './ThemeSelection.svelte';
  import ContentCustomization from './ContentCustomization.svelte';

  interface Props {
    onBack: () => void;
  }

  let { onBack }: Props = $props();

  const steps = [
    { id: 'layout', label: 'Select Layout', description: 'Choose your popup style' },
    { id: 'theme', label: 'Select Theme', description: 'Pick a template' },
    { id: 'customize', label: 'Customize Content', description: 'Personalize your popup' },
  ];

  let currentStepIndex = $derived(steps.findIndex(step => step.id === popupBuilder.currentStep));

  function handleStepClick(stepId: string, index: number) {
    if (index <= currentStepIndex ||
        (stepId === 'theme' && popupBuilder.selectedLayout) ||
        (stepId === 'customize' && popupBuilder.selectedTemplate)) {
      popupBuilder.setCurrentStep(stepId as any);
    }
  }

  function handleSaveDraft() {
    // TODO: Implement save draft functionality
    console.log('Save draft');
  }

  function handleSaveAndPublish() {
    // TODO: Implement save and publish functionality
    console.log('Save and publish');
  }
</script>

<div class="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
  <!-- Header -->
  <div class="mb-8">
    <div class="flex items-center justify-between mb-6">
      <button
        onclick={onBack}
        class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
      >
        <ArrowLeft size={20} />
        <span>Back to Placements</span>
      </button>

      <div class="flex items-center space-x-3">
        <button
          onclick={handleSaveDraft}
          class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors duration-200"
        >
          Save Draft
        </button>
        <button
          onclick={handleSaveAndPublish}
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Save and Publish
        </button>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Create New Placement</h2>
  </div>

  <!-- Progress Indicator -->
  <div class="mb-12">
    <div class="flex items-center justify-center">
      <div class="flex items-center max-w-4xl w-full">
      {#each steps as step, index}
        <div class="flex items-center flex-1 justify-center">
          <div class="flex items-center">
            <button
              onclick={() => handleStepClick(step.id, index)}
              class={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-200
                ${index <= currentStepIndex
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600'
                }
                ${(index < currentStepIndex ||
                   (step.id === 'theme' && popupBuilder.selectedLayout) ||
                   (step.id === 'customize' && popupBuilder.selectedTemplate))
                  ? 'hover:bg-blue-700 hover:border-blue-700 cursor-pointer'
                  : 'cursor-not-allowed'
                }
              `}
            >
              {#if index < currentStepIndex}
                <Checkmark size={20} />
              {:else}
                <span>{index + 1}</span>
              {/if}
            </button>
            <div class="ml-4">
              <p class={`font-medium ${index <= currentStepIndex ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                {step.label}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
            </div>
          </div>

          {#if index < steps.length - 1}
            <div class={`flex-1 h-0.5 mx-8 min-w-[2rem] ${index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
          {/if}
        </div>
      {/each}
      </div>
    </div>
  </div>

  <!-- Step Content -->
  <div class="flex-1 h-full overflow-hidden">
    {#if popupBuilder.currentStep === 'layout'}
      <LayoutSelection />
    {:else if popupBuilder.currentStep === 'theme'}
      <ThemeSelection />
    {:else if popupBuilder.currentStep === 'customize'}
      <ContentCustomization />
    {/if}
  </div>
</div>
