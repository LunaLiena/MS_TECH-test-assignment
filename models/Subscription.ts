// models/Subscription.ts
export type PlanType = 'month' | 'year';

export interface Subscription {
  isActive: boolean;
  plan: PlanType | null;
  purchasedAt: number | null;
}

export const createSubscription = (plan: PlanType): Subscription => ({
  isActive: true,
  plan,
  purchasedAt: Date.now(),
});

export const createEmptySubscription = (): Subscription => ({
  isActive: false,
  plan: null,
  purchasedAt: null,
});