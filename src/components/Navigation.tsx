import React from 'react';
import { BarChart3, Target, Settings, Megaphone, ChevronDown } from 'lucide-react';
import { usePopupBuilder } from '../hooks/usePopupBuilder';
import { NavigationTab } from '../types';

const navigationItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
  { id: 'placements', label: 'Placements', icon: <Target className="w-5 h-5" /> },
  { id: 'campaigns', label: 'Campaigns', icon: <Megaphone className="w-5 h-5" /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'integrations', label: 'Integrations', icon: <Settings className="w-5 h-5" /> },
];

export function Navigation() {
  const { activeTab, setActiveTab } = usePopupBuilder();
  const [selectedTenant, setSelectedTenant] = React.useState('Group');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const tenantOptions = ['Group', 'Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {/* Vanilla Sky - Left side, vertically centered */}
          <div className="flex-shrink-0 mr-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Vanilla Sky
            </h1>
          </div>
          
          {/* Right side content */}
          <div className="flex-1 flex flex-col justify-center space-y-2">
            {/* Tenant Dropdown - Above the line */}
            <div className="flex items-center justify-start">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <span>{selectedTenant}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="py-1">
                      {tenantOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSelectedTenant(option);
                            setIsDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                            selectedTenant === option
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Horizontal Rule */}
            <div className="border-b border-gray-200 -mx-2"></div>
            
            {/* Main Navigation and Settings - Below the line */}
            <div className="flex items-center justify-between">
              <nav className="flex space-x-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                      ${activeTab === item.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              
              <button className="p-1.5 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}