// viewmodels/usePaywallViewModel.ts
import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { PlanType } from '@/models/Subscription';
import { SubscriptionService } from '@/services/SubscriptionService';

export interface PaywallViewModel {
  selectedPlan: PlanType;
  plans: Record<PlanType, { price: string; period: string; discount: string | null }>;
  selectPlan: (plan: PlanType) => void;
  handleSubscribe: () => Promise<void>;
}

export const usePaywallViewModel = (): PaywallViewModel => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('year');

  const plans: PaywallViewModel['plans'] = {
    month: { price: '$9.99', period: '/мес', discount: null },
    year: { price: '$79.99', period: '/год', discount: '−33%' },
  };

  const selectPlan = useCallback((plan: PlanType) => {
    setSelectedPlan(plan);
  }, []);

  const handleSubscribe = useCallback(async () => {
    await SubscriptionService.activateSubscription(selectedPlan);

    if (Platform.OS === 'web') {
      window.location.href = '/main';
    } else {
      router.replace('/main');
    }
  }, [selectedPlan]);

  return {
    selectedPlan,
    plans,
    selectPlan,
    handleSubscribe,
  };
};