import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { SoundGrid } from '@/components/sound-grid';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#FFF3EA" />
      <SoundGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3EA',
  },
});
