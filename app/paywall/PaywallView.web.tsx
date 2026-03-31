// app/paywall/PaywallView.web.tsx
import React, { useState } from 'react';
import { SubscriptionService } from '@/services/SubscriptionService';

type Plan = 'month' | 'year';

export const PaywallView = () => {
  const [selected, setSelected] = useState<Plan>('year');

  const handleSubscribe = async () => {
    await SubscriptionService.activateSubscription(selected);
    window.location.href = '/main';
  };

  const plans = {
    month: { price: '$9.99', period: '/мес', discount: null },
    year: { price: '$79.99', period: '/год', discount: '−33%' },
  } as const;

  return (
    <div style={webStyles.container}>
      <div style={webStyles.content}>
        <h3 style={webStyles.title}>Выберите подписку</h3>
        <h3 style={webStyles.subtitle}>Доступ ко всем функциям</h3>

        {(Object.entries(plans) as [Plan, typeof plans[Plan]][]).map(([key, plan]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            style={{
              ...webStyles.plan,
              ...(selected === key ? webStyles.planSelected : {}),
            }}
          >
            <div style={webStyles.planHeader}>
              <h3 style={webStyles.planName}>{key === 'month' ? 'Месяц' : 'Год'}</h3>
              {plan.discount && (
                <span style={webStyles.badge}>
                  <h3 style={webStyles.badgeText}>{plan.discount}</h3>
                </span>
              )}
            </div>
            <h3 style={webStyles.planPrice}>
              {plan.price}
              <h3 style={webStyles.planPeriod}>{plan.period}</h3>
            </h3>
          </button>
        ))}

        <button onClick={handleSubscribe} style={webStyles.button}>
          Продолжить
        </button>
      </div>
    </div>
  );
}

const webStyles: Record<string, React.CSSProperties> = {
  container: { flex: 1, backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  content: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  plan: {
    padding: 20,
    borderRadius: 16,
    border: '2px solid #E0E0E0',
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
  },
  planSelected: { borderColor: '#007AFF', backgroundColor: '#F0F7FF' },
  planHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  planName: { fontSize: 18, fontWeight: '600' },
  planPrice: { fontSize: 24, fontWeight: 'bold' },
  planPeriod: { fontSize: 14, color: '#666', fontWeight: 'normal' },
  badge: { backgroundColor: '#4CAF50', padding: '4px 10px', borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  button: {
    backgroundColor: '#007AFF',
    padding: '16px',
    borderRadius: 12,
    marginTop: 24,
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'inherit',
    width: '100%',
  },
};
