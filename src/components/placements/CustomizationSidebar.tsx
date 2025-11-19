import React from 'react';
import { Type, Palette, Monitor, Calendar, Target, Settings } from 'lucide-react';
import { usePopupBuilder } from '../../hooks/usePopupBuilder';
import { ContentTab } from './tabs/ContentTab';
import { StyleTab } from './tabs/StyleTab';
import { DisplayTab } from './tabs/DisplayTab';
import { ScheduleTab } from './tabs/ScheduleTab';
import { TargetingTab } from './tabs/TargetingTab';
import { BehaviorTab } from './tabs/BehaviorTab';
import { CustomizeTab } from '../../types';

const tabs: { id: CustomizeTab; label: string; icon: React.ReactNode }[] = [
  { id: 'content', label: 'Content', icon: <Type className="w-4 h-4" /> },
  { id: 'style', label: 'Style', icon: <Palette className="w-4 h-4" /> },
  { id: 'display', label: 'Display', icon: <Monitor className="w-4 h-4" /> },
  { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
  { id: 'targeting', label: 'Targeting', icon: <Target className="w-4 h-4" /> },
  { id: 'analytics', label: 'Behavior', icon: <Settings className="w-4 h-4" /> },
];

export function CustomizationSidebar() {
  const { activeCustomizeTab, setActiveCustomizeTab } = usePopupBuilder();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 lg:grid-cols-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCustomizeTab(tab.id)}
              className={`
                flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors duration-200
                ${activeCustomizeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                }
               ${activeCustomizeTab === tab.id && tab.id === 'content' ? 'rounded-tl-xl' : ''}
               ${activeCustomizeTab === tab.id && tab.id === 'analytics' ? 'rounded-bl-xl' : ''}
              `}
            >
              {tab.icon}
              <span className="hidden lg:block">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-3 flex-1 overflow-y-auto">
        {activeCustomizeTab === 'content' && <ContentTab />}
        {activeCustomizeTab === 'style' && <StyleTab />}
        {activeCustomizeTab === 'display' && <DisplayTab />}
        {activeCustomizeTab === 'schedule' && <ScheduleTab />}
        {activeCustomizeTab === 'targeting' && <TargetingTab />}
        {activeCustomizeTab === 'analytics' && <BehaviorTab />}
      </div>
    </div>
  );
}