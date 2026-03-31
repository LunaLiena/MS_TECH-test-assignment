// app/paywall/index.tsx
import React from 'react';
// import PaywallView from './PaywallView';
import { Platform } from 'react-native';

import { PaywallView as PaywallViewWeb } from './PaywallView.web';
import PaywallView from './PaywallView.native';

export default function PaywallScreen() {

  if (Platform.OS === 'web') {
    return <PaywallViewWeb />;
  }
  return <PaywallView />;
}