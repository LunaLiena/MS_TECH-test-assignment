import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

import { setSubscribed } from '@/store/SubscriptionStore';

type Plan = 'month' | 'year';

export default function PaywallScreen() {
  const [selected, setSelected] = useState<Plan>('year');

  const handleSubscribe = async () => {
    // 🔥 Эмуляция покупки: просто сохраняем подписку
    await setSubscribed(true);
    // ✅ Переходим на главный экран
    router.replace('/main');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Выберите подписку</Text>
      <Text style={styles.subtitle}>Доступ ко всем функциям</Text>

      {/* Месяц */}
      <TouchableOpacity
        style={[styles.plan, selected === 'month' && styles.planSelected]}
        onPress={() => setSelected('month')}
      >
        <Text style={styles.planName}>Месяц</Text>
        <Text style={styles.planPrice}>$9.99<Text style={styles.period}>/мес</Text></Text>
      </TouchableOpacity>

      {/* Год со скидкой */}
      <TouchableOpacity
        style={[styles.plan, selected === 'year' && styles.planSelected]}
        onPress={() => setSelected('year')}
      >
        <View style={styles.planHeader}>
          <Text style={styles.planName}>Год</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>−33%</Text></View>
        </View>
        <Text style={styles.planPrice}>$79.99<Text style={styles.period}>/год</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
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
  period: { fontSize: 14, color: '#666', fontWeight: 'normal' },
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