import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CarListing } from '../types';

interface SavedState {
  savedListings: CarListing[];
  toggleSaved: (listing: CarListing) => void;
  isSaved: (id: string) => boolean;
  clearSaved: () => void;
}

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      savedListings: [],

      toggleSaved: (listing) =>
        set((state) => {
          const exists = state.savedListings.some((l) => l.id === listing.id);
          return {
            savedListings: exists
              ? state.savedListings.filter((l) => l.id !== listing.id)
              : [...state.savedListings, listing],
          };
        }),

      isSaved: (id) => get().savedListings.some((l) => l.id === id),

      clearSaved: () => set({ savedListings: [] }),
    }),
    {
      name: 'toyota-saved-listings', // persisted to localStorage
    }
  )
);
