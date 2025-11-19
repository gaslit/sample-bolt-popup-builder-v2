import React from 'react';
import { usePopupBuilder } from '../../hooks/usePopupBuilder';
import { CustomizationSidebar } from './CustomizationSidebar';
import { PreviewPanel } from './PreviewPanel';

export function ContentCustomization() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <CustomizationSidebar />
      </div>
      
      {/* Preview */}
      <div className="lg:col-span-2 h-full">
        <PreviewPanel />
      </div>
    </div>
  );
}