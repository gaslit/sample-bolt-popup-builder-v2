import React from 'react';
import { Target, Globe, Monitor, Users } from 'lucide-react';
import { usePopupBuilder } from '../../../hooks/usePopupBuilder';

export function TargetingTab() {
  const { currentPlacement, updateCurrentPlacement } = usePopupBuilder();

  const handleTargetingChange = (field: string, value: any) => {
    // Ensure targeting object is always properly initialized
    const currentTargetingWithDefaults = {
      ...defaultTargeting,
      ...currentPlacement?.targeting
    };

    updateCurrentPlacement({
      targeting: {
        ...currentTargetingWithDefaults,
        [field]: value
      }
    });
  };

  const defaultTargeting = {
    urlPatterns: [],
    deviceTypes: ['desktop', 'tablet', 'mobile'] as ('desktop' | 'tablet' | 'mobile')[],
    geoLocation: [],
    userBehavior: {
      newVisitor: true,
      returningVisitor: true,
      referralSources: [],
      utmParameters: {}
    }
  };

  const currentTargeting = currentPlacement?.targeting || defaultTargeting;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
          <Target className="w-4 h-4" />
          <span>Targeting Rules</span>
        </h4>

        <div className="space-y-6">
          {/* URL Patterns */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>URL Patterns</span>
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter URL patterns, one per line:&#10;/product/*&#10;/checkout&#10;https://example.com/landing"
              value={currentTargeting.urlPatterns.join('\n')}
              onChange={(e) => handleTargetingChange('urlPatterns', e.target.value.split('\n').filter(Boolean))}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Use wildcards (*) for flexible matching. Leave empty to show on all pages.
            </p>
          </div>

          {/* Device Types */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-1">
              <Monitor className="w-4 h-4" />
              <span>Device Types</span>
            </label>
            <div className="space-y-2">
              {['desktop', 'tablet', 'mobile'].map((device) => (
                <label key={device} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    checked={currentTargeting.deviceTypes.includes(device as any)}
                    onChange={(e) => {
                      const devices = e.target.checked
                        ? [...currentTargeting.deviceTypes, device]
                        : currentTargeting.deviceTypes.filter(d => d !== device);
                      handleTargetingChange('deviceTypes', devices);
                    }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{device}</span>
                </label>
              ))}
            </div>
          </div>

          {/* User Behavior */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>User Behavior</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  checked={currentTargeting.userBehavior.newVisitor}
                  onChange={(e) => handleTargetingChange('userBehavior', {
                    ...currentTargeting.userBehavior,
                    newVisitor: e.target.checked
                  })}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">New Visitors</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  checked={currentTargeting.userBehavior.returningVisitor}
                  onChange={(e) => handleTargetingChange('userBehavior', {
                    ...currentTargeting.userBehavior,
                    returningVisitor: e.target.checked
                  })}
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Returning Visitors</span>
              </label>
            </div>
          </div>

          {/* Geographic Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Geographic Location
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter countries or regions (e.g., US, UK, Europe)"
              value={currentTargeting.geoLocation.join(', ')}
              onChange={(e) => handleTargetingChange('geoLocation', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Leave empty to target all locations. Separate multiple locations with commas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}