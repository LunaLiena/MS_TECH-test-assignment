// app/onboarding/index.tsx
import { Platform } from 'react-native';

import { OnboardingView as OnboardingViewWeb } from './OnboardingView.web';
import OnboardingView from './OnboardingView.native';
import React from 'react';

export default function OnboardingScreen() {

  if (Platform.OS === 'web') {
    return <OnboardingViewWeb />;
  }
  return <OnboardingView />;

}