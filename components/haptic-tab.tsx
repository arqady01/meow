import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  const [focused, setFocused] = React.useState(false);
  return (
    <PlatformPressable
      {...props}
      accessibilityRole="tab"
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      onFocus={(e) => {
        setFocused(true);
        // @ts-expect-error React Navigation types may not include onFocus here
        // but PlatformPressable supports it — pass through if provided.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (props as any).onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (props as any).onBlur?.(e);
      }}
      className="rounded-md"
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
      style={[props.style as any, focused && { transform: [{ translateY: -1 }] }]}
    />
  );
}
