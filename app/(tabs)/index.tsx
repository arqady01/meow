import React from 'react';
import { View, StatusBar } from 'react-native';
import { SoundGrid } from '@/components/sound-grid';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background-warning-50">
      <StatusBar style="auto" backgroundColor="#FEF3C7" />
      <SoundGrid />
    </View>
  );
}
