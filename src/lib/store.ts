import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SavedName {
  id: string;
  name: string;
  styleName: string;
  timestamp: number;
  likes: number;
}

interface NickStylixStore {
  // Input state
  inputName: string;
  setInputName: (name: string) => void;

  // Symbols
  prefixSymbols: string[];
  suffixSymbols: string[];
  addPrefixSymbol: (s: string) => void;
  addSuffixSymbol: (s: string) => void;
  removePrefixSymbol: (i: number) => void;
  removeSuffixSymbol: (i: number) => void;
  clearSymbols: () => void;

  // Favorites
  favorites: SavedName[];
  addFavorite: (name: SavedName) => void;
  removeFavorite: (id: string) => void;
  toggleLike: (id: string) => void;

  // Recent searches
  recentSearches: string[];
  addRecentSearch: (name: string) => void;
  clearRecent: () => void;

  // User submitted names
  userNames: SavedName[];
  submitName: (name: SavedName) => void;

  // Settings
  darkMode: boolean;
  toggleDarkMode: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  vibrationEnabled: boolean;
  toggleVibration: () => void;

  // UI state
  filterCategory: string;
  setFilterCategory: (c: string) => void;
  filterLength: 'all' | 'short' | 'medium' | 'long';
  setFilterLength: (f: 'all' | 'short' | 'medium' | 'long') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Copy count (for trending)
  copyCount: Record<string, number>;
  incrementCopy: (name: string) => void;
}

export const useStore = create<NickStylixStore>()(
  persist(
    (set, get) => ({
      inputName: '',
      setInputName: (name) => {
        set({ inputName: name });
        if (name.trim().length >= 3) get().addRecentSearch(name.trim());
      },

      prefixSymbols: [],
      suffixSymbols: [],
      addPrefixSymbol: (s) => set(st => ({ prefixSymbols: [...st.prefixSymbols, s] })),
      addSuffixSymbol: (s) => set(st => ({ suffixSymbols: [...st.suffixSymbols, s] })),
      removePrefixSymbol: (i) => set(st => ({ prefixSymbols: st.prefixSymbols.filter((_, idx) => idx !== i) })),
      removeSuffixSymbol: (i) => set(st => ({ suffixSymbols: st.suffixSymbols.filter((_, idx) => idx !== i) })),
      clearSymbols: () => set({ prefixSymbols: [], suffixSymbols: [] }),

      favorites: [],
      addFavorite: (name) => set(st => {
        if (st.favorites.find(f => f.id === name.id)) return st;
        return { favorites: [name, ...st.favorites].slice(0, 50) };
      }),
      removeFavorite: (id) => set(st => ({ favorites: st.favorites.filter(f => f.id !== id) })),
      toggleLike: (id) => set(st => ({
        favorites: st.favorites.map(f => f.id === id ? { ...f, likes: f.likes + 1 } : f),
      })),

      recentSearches: [],
      addRecentSearch: (name) => set(st => ({
        recentSearches: [name, ...st.recentSearches.filter(r => r !== name)].slice(0, 10),
      })),
      clearRecent: () => set({ recentSearches: [] }),

      userNames: [],
      submitName: (name) => set(st => ({ userNames: [name, ...st.userNames].slice(0, 100) })),

      darkMode: true,
      toggleDarkMode: () => set(st => ({ darkMode: !st.darkMode })),
      soundEnabled: true,
      toggleSound: () => set(st => ({ soundEnabled: !st.soundEnabled })),
      vibrationEnabled: true,
      toggleVibration: () => set(st => ({ vibrationEnabled: !st.vibrationEnabled })),

      filterCategory: 'All',
      setFilterCategory: (c) => set({ filterCategory: c }),
      filterLength: 'all',
      setFilterLength: (f) => set({ filterLength: f }),
      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),

      copyCount: {},
      incrementCopy: (name) => set(st => ({
        copyCount: { ...st.copyCount, [name]: (st.copyCount[name] || 0) + 1 },
      })),
    }),
    {
      name: 'nickstylix-storage',
      partialize: (st) => ({
        favorites: st.favorites,
        recentSearches: st.recentSearches,
        userNames: st.userNames,
        darkMode: st.darkMode,
        soundEnabled: st.soundEnabled,
        vibrationEnabled: st.vibrationEnabled,
        copyCount: st.copyCount,
      }),
    }
  )
);