// services/SubscriptionService.ts
import { Platform } from 'react-native';
import { Subscription, PlanType, createSubscription, createEmptySubscription } from '@/models/Subscription';

const STORAGE_KEY = '@subscription_data';

// 🔹 Абстракция над хранилищем (работает и на вебе, и на мобильных)
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return Promise.resolve(window.localStorage.getItem(key));
    }
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    return AsyncStorage.default.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      window.localStorage.setItem(key, value);
      return Promise.resolve();
    }
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    return AsyncStorage.default.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      window.localStorage.removeItem(key);
      return Promise.resolve();
    }
    const AsyncStorage = await import('@react-native-async-storage/async-storage');
    return AsyncStorage.default.removeItem(key);
  },
};

export const SubscriptionService = {
  /** Проверка подписки */
  checkSubscription: async (): Promise<Subscription> => {
    try {
      const raw = await storage.getItem(STORAGE_KEY);
      if (!raw) return createEmptySubscription();

      const parsed = JSON.parse(raw) as Subscription;
      // Валидация данных
      if (typeof parsed.isActive !== 'boolean') return createEmptySubscription();
      return parsed;
    } catch {
      return createEmptySubscription();
    }
  },

  /** Активация подписки */
  activateSubscription: async (plan: PlanType): Promise<void> => {
    const subscription = createSubscription(plan);
    await storage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  },

  /** Сброс подписки */
  resetSubscription: async (): Promise<void> => {
    await storage.removeItem(STORAGE_KEY);
  },
};