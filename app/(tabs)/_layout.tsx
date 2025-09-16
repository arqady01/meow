import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '音效',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
              <IconSymbol size={24} name={focused ? "speaker.wave.2.fill" : "speaker.wave.2"} color={focused ? "#9A3412" : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '关于',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
              <IconSymbol size={24} name={focused ? "info.circle.fill" : "info.circle"} color={focused ? "#9A3412" : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // New-brutalist bottom bar: flat surface, hard border, chunky spacing
  tabBar: {
    backgroundColor: '#FEF3C7',
    borderTopWidth: 3,
    borderTopColor: '#18181B',
    elevation: 0,
    shadowColor: '#000',
    shadowOpacity: 0,
    paddingBottom: 10,
    paddingTop: 10,
    height: 78,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
    color: '#1F2937',
  },
  tabBarItem: {
    padding: 2,
  },
  tabIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 4,
    borderWidth: 3,
    borderColor: '#18181B',
  },
  tabIconContainerFocused: {
    backgroundColor: '#FDBA74', // orange-300
    transform: [{ scale: 1.0 }],
    borderColor: '#18181B',
  },
  
});
