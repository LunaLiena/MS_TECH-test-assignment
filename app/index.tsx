import { Redirect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { isSubscribed } from '@/store/SubscriptionStore';

export default function IndexScreen() {
  const [checked, setChecked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      try {
        const result = await isSubscribed();
        if (mounted) {
          setSubscribed(result);
          setChecked(true);
        }
      } catch (e) {
        console.error('Error checking subscription:', e);
        if (mounted) setChecked(true);
      }
    };
    check();
    return () => { mounted = false; };
  }, []);

  // Пока проверяем — лоадер
  if (!checked) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // 🔥 Редирект на нужный экран
  return <Redirect href={subscribed ? '/main' : '/onboarding'} />;
}