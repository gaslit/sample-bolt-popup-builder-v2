import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { usePopupBuilder } from '../../hooks/usePopupBuilder';
import { LayoutSelection } from './LayoutSelection';
import { ThemeSelection } from './ThemeSelection';
import { ContentCustomization } from './ContentCustomization';

interface StepWorkflowProps {
  onBack: () => void;
}

const steps = [
  { id: 'layout', label: 'Select Layout', description: 'Choose your popup style' },
  { id: 'theme', label: 'Select Theme', description: 'Pick a template' },
  { id: 'customize', label: 'Customize Content', description: 'Personalize your popup' },
];

export function StepWorkflow({ onBack }: StepWorkflowProps) {
  const { currentStep, setCurrentStep, selectedLayout, selectedTemplate } = usePopupBuilder();
  
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleStepClick = (stepId: string, index: number) => {
    if (index <= currentStepIndex || (stepId === 'theme' && selectedLayout) || (stepId === 'customize' && selectedTemplate)) {
      setCurrentStep(stepId as any);
    }
  };

  const handleSaveDraft = () => {
    // TODO: Implement save draft functionality
    console.log('Save draft');
  };

  const handleSaveAndPublish = () => {
    // TODO: Implement save and publish functionality
    console.log('Save and publish');
  };

  return (
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Placements</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors duration-200"
            >
              Save Draft
            </button>
            <button
              onClick={handleSaveAndPublish}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Save and Publish
            </button>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Placement</h2>
      </div>

      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-center">
          <div className="flex items-center max-w-4xl w-full">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1 justify-center">
              <div className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.id, index)}
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-200
                    ${index <= currentStepIndex
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-gray-300 dark:border-gray-600 dark:text-gray-600'
                    }
                    ${(index < currentStepIndex || 
                       (step.id === 'theme' && selectedLayout) || 
                       (step.id === 'customize' && selectedTemplate))
                      ? 'hover:bg-blue-700 hover:border-blue-700 cursor-pointer'
                      : 'cursor-not-allowed'
                    }
                  `}
                >
                  {index < currentStepIndex ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                <div className="ml-4">
                  <p className={`font-medium ${index <= currentStepIndex ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                    {step.label}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-8 min-w-[2rem] ${index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
              )}
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 h-full overflow-hidden">
        {currentStep === 'layout' && <LayoutSelection />}
        {currentStep === 'theme' && <ThemeSelection />}
        {currentStep === 'customize' && <ContentCustomization />}
      </div>
    </div>
  );
}