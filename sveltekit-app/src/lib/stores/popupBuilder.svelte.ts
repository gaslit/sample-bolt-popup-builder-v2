import type { NavigationTab, PlacementStep, CustomizeTab, Placement, Template, LayoutType } from '$lib/types';

interface PopupBuilderState {
  // Navigation
  activeTab: NavigationTab;

  // Placement workflow
  currentStep: PlacementStep;

  // Customize tabs
  activeCustomizeTab: CustomizeTab;

  // Current placement being edited
  currentPlacement: Partial<Placement> | null;

  // Selected layout and template
  selectedLayout: LayoutType | null;
  selectedTemplate: Template | null;

  // Placements list
  placements: Placement[];

  // UI states
  showPreview: boolean;
}

// Load initial state from localStorage
function loadFromStorage(): Partial<PopupBuilderState> {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem('popup-builder-storage');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save state to localStorage
function saveToStorage(state: Partial<PopupBuilderState>) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('popup-builder-storage', JSON.stringify({
      placements: state.placements || []
    }));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

// Initialize state
const stored = loadFromStorage();

// Create reactive state using Svelte 5 runes
class PopupBuilderStore {
  activeTab = $state<NavigationTab>('placements');
  currentStep = $state<PlacementStep>('layout');
  activeCustomizeTab = $state<CustomizeTab>('content');
  currentPlacement = $state<Partial<Placement> | null>(null);
  selectedLayout = $state<LayoutType | null>(null);
  selectedTemplate = $state<Template | null>(null);
  placements = $state<Placement[]>(stored.placements || []);
  showPreview = $state<boolean>(false);

  // Navigation methods
  setActiveTab(tab: NavigationTab) {
    this.activeTab = tab;
  }

  // Placement workflow methods
  setCurrentStep(step: PlacementStep) {
    this.currentStep = step;
  }

  // Customize tabs methods
  setActiveCustomizeTab(tab: CustomizeTab) {
    this.activeCustomizeTab = tab;
  }

  // Current placement methods
  setCurrentPlacement(placement: Partial<Placement> | null) {
    this.currentPlacement = placement;
  }

  updateCurrentPlacement(updates: Partial<Placement>) {
    if (this.currentPlacement) {
      this.currentPlacement = { ...this.currentPlacement, ...updates };
    }
  }

  // Layout and template methods
  setSelectedLayout(layout: LayoutType) {
    this.selectedLayout = layout;
  }

  setSelectedTemplate(template: Template) {
    this.selectedTemplate = template;
  }

  // Placements methods
  addPlacement(placement: Placement) {
    this.placements = [...this.placements, placement];
    this.savePlacements();
  }

  updatePlacement(id: string, updates: Partial<Placement>) {
    this.placements = this.placements.map(p =>
      p.id === id ? { ...p, ...updates } : p
    );
    this.savePlacements();
  }

  deletePlacement(id: string) {
    this.placements = this.placements.filter(p => p.id !== id);
    this.savePlacements();
  }

  // UI state methods
  setShowPreview(show: boolean) {
    this.showPreview = show;
  }

  // Persistence
  private savePlacements() {
    saveToStorage({ placements: this.placements });
  }
}

// Export singleton instance
export const popupBuilder = new PopupBuilderStore();
