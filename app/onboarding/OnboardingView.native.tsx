// app/onboarding/OnboardingView.native.tsx
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OnboardingView() {
  const handleContinue = () => router.push('/paywall');

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎯</Text>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <Text style={styles.desc}>
        Это приложение поможет вам{'\n'}оставаться продуктивным.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Продолжить →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 64, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  desc: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  button: { backgroundColor: '#007AFF', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});