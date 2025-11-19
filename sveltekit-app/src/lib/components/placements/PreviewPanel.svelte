<script lang="ts">
  import { View, Laptop, Tablet, Phone } from 'carbon-icons-svelte';
  import { popupBuilder } from '$lib/stores/popupBuilder.svelte';

  type DeviceType = 'desktop' | 'tablet' | 'mobile';

  let activeDevice = $state<DeviceType>('desktop');

  const devices = [
    { id: 'desktop' as DeviceType, label: 'Desktop', icon: Laptop },
    { id: 'tablet' as DeviceType, label: 'Tablet', icon: Tablet },
    { id: 'mobile' as DeviceType, label: 'Mobile', icon: Phone },
  ];

  function getDeviceClass() {
    switch (activeDevice) {
      case 'mobile':
        return 'w-80 h-96';
      case 'tablet':
        return 'w-96 h-80';
      default:
        return 'w-full h-96';
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
  <!-- Preview Header -->
  <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center space-x-2">
      <View size={20} class="text-gray-500" />
      <h3 class="font-semibold text-gray-900 dark:text-white">Preview</h3>
    </div>

    <div class="flex items-center space-x-2">
      {#each devices as device}
        <button
          onclick={() => activeDevice = device.id}
          class={`
            flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
            ${activeDevice === device.id
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
            }
          `}
        >
          <svelte:component this={device.icon} size={16} />
          <span class="hidden sm:block">{device.label}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Preview Content -->
  <div class="flex-1 p-6 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div class="mx-auto" style={`max-width: ${activeDevice === 'mobile' ? '320px' : activeDevice === 'tablet' ? '768px' : '100%'}`}>
      {#if popupBuilder.selectedTemplate}
        <div
          class={`mx-auto transition-all duration-300 ${getDeviceClass()} relative`}
          style={`background-color: ${popupBuilder.selectedTemplate.style.backgroundColor}; border-radius: ${popupBuilder.selectedTemplate.style.borderRadius}px; color: ${popupBuilder.selectedTemplate.style.textColor};`}
        >
          <div class="p-6 h-full flex flex-col justify-center text-center space-y-4 relative z-10">
            <!-- Image -->
            {#if popupBuilder.selectedTemplate.content.imageUrl}
              <div class="flex justify-center mb-4">
                <img
                  src={popupBuilder.selectedTemplate.content.imageUrl}
                  alt="Popup content"
                  class="h-32 w-32 object-contain rounded-lg"
                />
              </div>
            {/if}

            <!-- Title -->
            <h2
              class="text-2xl font-bold"
              style={`font-size: ${popupBuilder.selectedTemplate.style.fontSize}; color: ${popupBuilder.selectedTemplate.style.textColor};`}
            >
              {popupBuilder.selectedTemplate.content.title}
            </h2>

            <!-- Description -->
            <p
              class="opacity-80"
              style={`color: ${popupBuilder.selectedTemplate.style.textColor};`}
            >
              {popupBuilder.selectedTemplate.content.description}
            </p>

            <!-- Button -->
            <button
              class="px-6 py-3 rounded-lg font-medium transition-colors duration-200 mt-4"
              style={`background-color: ${popupBuilder.selectedTemplate.style.primaryColor}; color: #FFFFFF; border-radius: ${popupBuilder.selectedTemplate.style.borderRadius}px;`}
            >
              {popupBuilder.selectedTemplate.content.buttonText}
            </button>
          </div>
        </div>
      {:else}
        <div class="flex items-center justify-center h-96 text-gray-500 dark:text-gray-400">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <View size={32} />
            </div>
            <p>Select a template to see the preview</p>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
