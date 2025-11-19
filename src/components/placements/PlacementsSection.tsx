import React from 'react';
import { Plus, Layers } from 'lucide-react';
import { usePopupBuilder } from '../../hooks/usePopupBuilder';
import { StepWorkflow } from './StepWorkflow';
import { PlacementsList } from './PlacementsList';

export function PlacementsSection() {
  const { currentPlacement, setCurrentPlacement, setCurrentStep, placements } = usePopupBuilder();

  const handleAddNewPlacement = () => {
    setCurrentPlacement({
      id: `placement-${Date.now()}`,
      name: 'New Placement',
      status: 'draft'
    });
    setCurrentStep('layout');
  };

  const handleBackToList = () => {
    setCurrentPlacement(null);
    setCurrentStep('layout');
  };

  if (currentPlacement) {
    return <StepWorkflow onBack={handleBackToList} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Placements</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Create and manage your popup placements
            </p>
          </div>
          
          <button
            onClick={handleAddNewPlacement}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Placement</span>
          </button>
        </div>
      </div>

      {placements.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Layers className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No placements yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
            Get started by creating your first popup placement. Choose from various layouts and customize them to match your brand.
          </p>
          <button
            onClick={handleAddNewPlacement}
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Placement</span>
          </button>
        </div>
      ) : (
        <PlacementsList />
      )}
    </div>
  );
}