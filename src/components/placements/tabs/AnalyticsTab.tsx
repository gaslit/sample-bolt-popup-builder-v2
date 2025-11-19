import React from 'react';
import { BarChart3, TrendingUp, Users, MousePointer } from 'lucide-react';
import { usePopupBuilder } from '../../../hooks/usePopupBuilder';

export function AnalyticsTab() {
  // Mock analytics data for demonstration
  const mockAnalytics = {
    views: 12547,
    clicks: 1834,
    conversions: 156,
    ctr: 14.6,
    conversionRate: 8.5,
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-4 h-4" />
          <span>Analytics Preview</span>
        </h4>

        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Views</span>
              </div>
              <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                {mockAnalytics.views.toLocaleString()}
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-1">
                <MousePointer className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium text-green-600 dark:text-green-400">Clicks</span>
              </div>
              <p className="text-lg font-bold text-green-900 dark:text-green-100">
                {mockAnalytics.clicks.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Click-through Rate</span>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="font-bold text-green-600 dark:text-green-400">{mockAnalytics.ctr}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Conversion Rate</span>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="font-bold text-blue-600 dark:text-blue-400">{mockAnalytics.conversionRate}%</span>
              </div>
            </div>
          </div>

          {/* Trigger Configuration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Trigger Settings
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Exit Intent</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="75"
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">75%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Time Delay (seconds)</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    defaultValue="5"
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">5s</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Scroll Depth</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">50%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              Analytics data will be available after your placement is published and starts receiving traffic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}