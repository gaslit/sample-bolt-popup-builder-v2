import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NavigationTab, PlacementStep, CustomizeTab, Placement, Template, LayoutType } from '../types';

interface PopupBuilderState {
  // Navigation
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  
  // Placement workflow
  currentStep: PlacementStep;
  setCurrentStep: (step: PlacementStep) => void;
  
  // Customize tabs
  activeCustomizeTab: CustomizeTab;
  setActiveCustomizeTab: (tab: CustomizeTab) => void;
  
  // Current placement being edited
  currentPlacement: Partial<Placement> | null;
  setCurrentPlacement: (placement: Partial<Placement> | null) => void;
  updateCurrentPlacement: (updates: Partial<Placement>) => void;
  
  // Selected layout and template
  selectedLayout: LayoutType | null;
  setSelectedLayout: (layout: LayoutType) => void;
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template) => void;
  
  // Placements list
  placements: Placement[];
  addPlacement: (placement: Placement) => void;
  updatePlacement: (id: string, updates: Partial<Placement>) => void;
  deletePlacement: (id: string) => void;
  
  // UI states
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const usePopupBuilder = create<PopupBuilderState>()(
  persist(
    (set, get) => ({
      // Navigation
      activeTab: 'placements',
      setActiveTab: (tab) => set({ activeTab: tab }),
      
      // Placement workflow
      currentStep: 'layout',
      setCurrentStep: (step) => set({ currentStep: step }),
      
      // Customize tabs
      activeCustomizeTab: 'content',
      setActiveCustomizeTab: (tab) => set({ activeCustomizeTab: tab }),
      
      // Current placement
      currentPlacement: null,
      setCurrentPlacement: (placement) => set({ currentPlacement: placement }),
      updateCurrentPlacement: (updates) => {
        const current = get().currentPlacement;
        if (current) {
          set({ currentPlacement: { ...current, ...updates } });
        }
      },
      
      // Selected layout and template
      selectedLayout: null,
      setSelectedLayout: (layout) => set({ selectedLayout: layout }),
      selectedTemplate: null,
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      
      // Placements
      placements: [],
      addPlacement: (placement) => set((state) => ({ 
        placements: [...state.placements, placement] 
      })),
      updatePlacement: (id, updates) => set((state) => ({
        placements: state.placements.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      deletePlacement: (id) => set((state) => ({
        placements: state.placements.filter(p => p.id !== id)
      })),
      
      // UI states
      showPreview: false,
      setShowPreview: (show) => set({ showPreview: show }),
    }),
    {
      name: 'popup-builder-storage',
      partialize: (state) => ({
        placements: state.placements,
      }),
    }
  )
);