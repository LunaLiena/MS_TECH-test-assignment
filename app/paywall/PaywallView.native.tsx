// app/paywall/PaywallView.native.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SubscriptionService } from '@/services/SubscriptionService';

type Plan = 'month' | 'year';

export default function PaywallView() {
  const [selected, setSelected] = useState<Plan>('year');

  const handleSubscribe = async () => {
    await SubscriptionService.activateSubscription(selected);
    router.replace('/main');
  };

  const plans = {
    month: { price: '$9.99', period: '/мес', discount: null },
    year: { price: '$79.99', period: '/год', discount: '−33%' },
  } as const;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Выберите подписку</Text>
      <Text style={styles.subtitle}>Доступ ко всем функциям</Text>

      {(Object.entries(plans) as [Plan, typeof plans[Plan]][]).map(([key, plan]) => (
        <TouchableOpacity
          key={key}
          style={[styles.plan, selected === key && styles.planSelected]}
          onPress={() => setSelected(key)}
          activeOpacity={0.7}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{key === 'month' ? 'Месяц' : 'Год'}</Text>
            {plan.discount && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{plan.discount}</Text>
              </View>
            )}
          </View>
          <Text style={styles.planPrice}>
            {plan.price}
            <Text style={styles.planPeriod}>{plan.period}</Text>
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubscribe} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Продолжить</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  plan: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  planSelected: { borderColor: '#007AFF', backgroundColor: '#F0F7FF' },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  planName: { fontSize: 18, fontWeight: '600' },
  planPrice: { fontSize: 24, fontWeight: 'bold' },
  planPeriod: { fontSize: 14, color: '#666', fontWeight: 'normal' },
  badge: { backgroundColor: '#4CAF50', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});