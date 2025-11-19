import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PlacementsSection } from './components/placements/PlacementsSection';
import { CampaignsSection } from './components/campaigns/CampaignsSection';
import { AnalyticsSection } from './components/analytics/AnalyticsSection';
import { IntegrationsSection } from './components/integrations/IntegrationsSection';
import { usePopupBuilder } from './hooks/usePopupBuilder';

function App() {
  const { activeTab } = usePopupBuilder();

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'placements':
        return <PlacementsSection />;
      case 'campaigns':
        return <CampaignsSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'integrations':
        return <IntegrationsSection />;
      default:
        return <PlacementsSection />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1">
        {renderActiveSection()}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            VANILLA SKY (C) Starkle Inc. Licensed to BFG Pte Ltd. 2025. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;