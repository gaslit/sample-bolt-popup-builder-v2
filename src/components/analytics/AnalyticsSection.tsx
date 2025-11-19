import React from 'react';
import { BarChart3, TrendingUp, Users, MousePointer, Eye, Target } from 'lucide-react';

const mockData = {
  totalViews: 45672,
  totalClicks: 6834,
  totalConversions: 892,
  avgCTR: 15.2,
  avgConversionRate: 13.1,
  topPerformingPlacements: [
    { name: 'Exit Intent Newsletter', views: 12547, clicks: 1834, ctr: 14.6 },
    { name: 'Homepage Welcome', views: 8932, clicks: 1245, ctr: 13.9 },
    { name: 'Checkout Discount', views: 6743, clicks: 987, ctr: 14.6 },
  ]
};

export function AnalyticsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Track performance and optimize your popup campaigns
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Views</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockData.totalViews.toLocaleString()}
          </p>
          <div className="flex items-center mt-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+12.5%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <MousePointer className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Clicks</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockData.totalClicks.toLocaleString()}
          </p>
          <div className="flex items-center mt-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+8.3%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Conversions</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockData.totalConversions.toLocaleString()}
          </p>
          <div className="flex items-center mt-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+15.7%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Avg CTR</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockData.avgCTR}%
          </p>
          <div className="flex items-center mt-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+2.1%</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Conv. Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockData.avgConversionRate}%
          </p>
          <div className="flex items-center mt-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+3.8%</span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Trends</h3>
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Interactive charts coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Placements</h3>
          <div className="space-y-4">
            {mockData.topPerformingPlacements.map((placement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{placement.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {placement.views.toLocaleString()} views • {placement.clicks.toLocaleString()} clicks
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{placement.ctr}%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CTR</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics Features */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Advanced Analytics Features
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Unlock deeper insights with heatmaps, user journey tracking, cohort analysis, and custom reporting. 
            Export data to integrate with your existing analytics stack.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm text-blue-700 dark:text-blue-300">Real-time tracking</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-sm text-green-700 dark:text-green-300">A/B test insights</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-sm text-purple-700 dark:text-purple-300">Custom events</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}