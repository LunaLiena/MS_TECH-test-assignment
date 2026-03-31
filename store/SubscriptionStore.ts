import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = "@subscription_active";

export const isSubscribed = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(KEY);
    return value === 'true';
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
};

export const setSubscribed = async (active: boolean): Promise<void> => {
  await AsyncStorage.setItem(KEY, active ? 'true' : 'false');
}

export const resetSubscription = async (): Promise<void> => {
  await AsyncStorage.removeItem(KEY);
};