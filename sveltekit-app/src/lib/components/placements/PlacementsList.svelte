<script lang="ts">
  import { Play, Pause, Edit, TrashCan, OverflowMenuVertical } from 'carbon-icons-svelte';
  import { popupBuilder } from '$lib/stores/popupBuilder.svelte';

  function handleStatusToggle(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    popupBuilder.updatePlacement(id, { status: newStatus as any });
  }

  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this placement?')) {
      popupBuilder.deletePlacement(id);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Name
          </th>
          <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Type
          </th>
          <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Status
          </th>
          <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Performance
          </th>
          <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
        {#each popupBuilder.placements as placement}
          <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td class="px-6 py-4 whitespace-nowrap">
              <div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {placement.name}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Created recently
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 capitalize">
                {placement.layout}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(placement.status)}`}>
                {placement.status}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              <div class="flex space-x-4">
                <span>Views: 0</span>
                <span>CTR: 0%</span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end space-x-2">
                <button
                  onclick={() => handleStatusToggle(placement.id, placement.status)}
                  class={`p-2 rounded-lg transition-colors duration-200 ${
                    placement.status === 'active'
                      ? 'text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900'
                      : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900'
                  }`}
                  title={placement.status === 'active' ? 'Pause' : 'Activate'}
                >
                  {#if placement.status === 'active'}
                    <Pause size={16} />
                  {:else}
                    <Play size={16} />
                  {/if}
                </button>

                <button
                  class="p-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>

                <button
                  onclick={() => handleDelete(placement.id)}
                  class="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200"
                  title="Delete"
                >
                  <TrashCan size={16} />
                </button>

                <button class="p-2 rounded-lg text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
                  <OverflowMenuVertical size={16} />
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
