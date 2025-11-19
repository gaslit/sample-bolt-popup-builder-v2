import React from 'react';
import { Megaphone, Plus } from 'lucide-react';

export function CampaignsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
          <Megaphone className="w-12 h-12 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Campaign Management
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Create sophisticated multi-placement campaigns with sequencing, A/B testing, and advanced orchestration. 
          Group your popups into cohesive user journeys and optimize performance across touchpoints.
        </p>
        <div className="space-y-4">
          <button className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            <Plus className="w-5 h-5" />
            <span>Create Campaign</span>
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Coming in the next update - advanced campaign features
          </div>
        </div>
      </div>
    </div>
  );
}