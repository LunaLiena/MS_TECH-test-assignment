import React from 'react';
// import MainView from './MainView';

import { MainView as MainViewWeb } from './MainView.web';
import MainView from './MainView.native';
import { Platform } from 'react-native';


export default function MainScreen() {

  if (Platform.OS === 'web') {
    return <MainViewWeb />;
  }
  return <MainView />;

}