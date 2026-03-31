// app/onboarding/OnboardingView.web.tsx
import { router } from 'expo-router';
import React from 'react';

export const OnboardingView = () => {
  const handleContinue = () => router.push('/paywall');

  return (
    <div style={webStyles.container}>
      <h3 style={webStyles.emoji}>🎯</h3>
      <h3 style={webStyles.title}>Добро пожаловать!</h3>
      <h3 style={webStyles.desc}>
        Это приложение поможет вам{'\n'}оставаться продуктивным.
      </h3>
      <button onClick={handleContinue} style={webStyles.button}>
        Продолжить →
      </button>
    </div>
  );
}

const webStyles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  emoji: { fontSize: 64, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  desc: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40, lineHeight: 22 },
  button: {
    backgroundColor: '#007AFF',
    padding: '16px 32px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'inherit',
  },
};