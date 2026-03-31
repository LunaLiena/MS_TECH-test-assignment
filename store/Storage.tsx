import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔥 Для веба используем localStorage напрямую
const isWeb = Platform.OS === 'web';

export const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (isWeb) {
      return localStorage.getItem(key);
    }
    return AsyncStorage.getItem(key);
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (isWeb) {
      localStorage.setItem(key, value);
      return Promise.resolve();
    }
    return AsyncStorage.setItem(key, value);
  },

  removeItem: async (key: string): Promise<void> => {
    if (isWeb) {
      localStorage.removeItem(key);
      return Promise.resolve();
    }
    return AsyncStorage.removeItem(key);
  },

  clear: async (): Promise<void> => {
    if (isWeb) {
      localStorage.clear();
      return Promise.resolve();
    }
    return AsyncStorage.clear();
  },
};