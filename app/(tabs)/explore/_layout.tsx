import { Stack } from 'expo-router';
import React from 'react';

export default function ExploreStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFF3EA' },
        headerTintColor: '#111827',
        headerTitleStyle: { fontWeight: '900', fontSize: 18 },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="age" options={{ title: '年龄换算' }} />
      <Stack.Screen name="weight" options={{ title: '质量换算' }} />
    </Stack>
  );
}
