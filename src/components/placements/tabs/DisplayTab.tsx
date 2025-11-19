import React from 'react';
import { Monitor, X, Eye } from 'lucide-react';
import { usePopupBuilder } from '../../../hooks/usePopupBuilder';

export function DisplayTab() {
  const { selectedTemplate, currentPlacement, updateCurrentPlacement } = usePopupBuilder();

  const handleDisplayChange = (field: string, value: string | boolean | number) => {
    updateCurrentPlacement({
      display: {
        ...currentPlacement?.display,
        [field]: value
      }
    });
  };

  if (!selectedTemplate) return null;

  const currentDisplay = currentPlacement?.display || selectedTemplate.display;

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <Monitor className="w-4 h-4" />
          <span>Display Settings</span>
        </h4>

        <div className="space-y-3">
          {/* Position */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Position
            </label>
            <select
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              value={currentDisplay.position}
              onChange={(e) => handleDisplayChange('position', e.target.value)}
            >
              <option value="center">Center</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          {/* Overlay */}
          <div className="flex items-center justify-between py-1">
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Show Overlay
              </label>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-2">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={currentDisplay.overlay}
                onChange={(e) => handleDisplayChange('overlay', e.target.checked)}
              />
              <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Close Button */}
          <div className="flex items-center justify-between py-1">
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-1">
                <X className="w-4 h-4" />
                <span>Show Close Button</span>
              </label>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-2">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={currentDisplay.closeButton}
                onChange={(e) => handleDisplayChange('closeButton', e.target.checked)}
              />
              <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Click Outside to Close */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Click outside to close
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Close popup when clicking outside
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={false}
                onChange={(e) => handleDisplayChange('clickOutsideToClose', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Width */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Width
            </label>
            <input
              type="text"
              className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="480px, 50%, auto"
              value={currentDisplay.width}
              onChange={(e) => handleDisplayChange('width', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}