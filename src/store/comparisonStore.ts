import { create } from 'zustand';
import type { Vehicle } from '../types';

interface ComparisonState {
  selectedVehicles: Vehicle[];
  addToComparison: (vehicle: Vehicle) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  selectedVehicles: [],
  addToComparison: (vehicle) =>
    set((state) => {
      // Check if already selected
      if (state.selectedVehicles.some((v) => v.id === vehicle.id)) return state;
      // Cap at 3 vehicles
      if (state.selectedVehicles.length >= 3) return state;
      return { selectedVehicles: [...state.selectedVehicles, vehicle] };
    }),
  removeFromComparison: (id) =>
    set((state) => ({
      selectedVehicles: state.selectedVehicles.filter((v) => v.id !== id),
    })),
  clearComparison: () => set({ selectedVehicles: [] }),
}));
