import { Slot } from 'expo-router';

import React from 'react';


export default function RootLayout() {


  // ✅ Иначе показываем онбординг (первый экран по умолчанию)
  // Slot рендерит текущий маршрут из файловой системы
  return <Slot />;
}
