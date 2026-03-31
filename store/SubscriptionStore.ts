
import { storage } from './Storage';

const KEY = "@subscription_active";

export const isSubscribed = async (): Promise<boolean> => {
  try {
    const value = await storage.getItem(KEY);
    return value === 'true';
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
};

export const setSubscribed = async (active: boolean): Promise<void> => {
  await storage.setItem(KEY, active ? 'true' : 'false');
}

export const resetSubscription = async (): Promise<void> => {
  await storage.removeItem(KEY);
};