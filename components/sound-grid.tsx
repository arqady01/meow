import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Alert, Animated, Text } from 'react-native';
import { Image } from 'expo-image';
// Removed ThemedView in circular layout
import { IconSymbol } from '@/components/ui/icon-symbol';
import { audioPlayer, SoundFile, soundFiles } from '@/utils/audio-player';

interface CircleSoundButtonProps {
  sound: SoundFile;
  isPlaying: boolean;
  isPressed: boolean;
  onPlay: (filename: string) => void;
  onStop: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
}

const CIRCLE_SIZE = 92;

const CircleSoundButton: React.FC<CircleSoundButtonProps> = ({
  sound,
  isPlaying,
  isPressed,
  onPlay,
  onStop,
  onPressIn,
  onPressOut,
}) => {
  const handlePress = () => {
    if (isPlaying) {
      onStop();
    } else {
      onPlay(sound.filename);
    }
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${isPlaying ? '停止' : '播放'}：${sound.label}`}
      accessibilityState={{ selected: isPlaying, busy: isPlaying }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={({ pressed }) => [
        styles.item,
        (pressed || isPressed) && styles.itemPressed,
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          isPlaying ? styles.circlePlaying : styles.circleDefault,
        ]}
      >
        {sound.image ? (
          <Image
            source={sound.image}
            style={styles.circleImage}
            contentFit="contain"
            fadeDuration={150}
          />
        ) : (
          <IconSymbol
            name={sound.icon as any}
            size={32}
            color={isPlaying ? '#7C2D12' : '#1D4ED8'}
          />
        )}
      </Animated.View>
      <Text style={styles.itemLabel} numberOfLines={1}>
        {sound.label}
      </Text>
    </Pressable>
  );
};

export const SoundGrid: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [pressedCard, setPressedCard] = useState<string | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePlay = async (filename: string) => {
    try {
      // 添加按压动画
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentlyPlaying(filename);
      await audioPlayer.playSound(filename);
    } catch (error) {
      console.error('播放失败:', error);
      Alert.alert('播放失败', '无法播放音频文件，请检查文件是否存在。');
      setCurrentlyPlaying(null);
    }
  };

  const handleStop = async () => {
    try {
      await audioPlayer.stopSound();
      setCurrentlyPlaying(null);
    } catch (error) {
      console.error('停止失败:', error);
    }
  };

  const handlePressIn = (soundId: string) => {
    setPressedCard(soundId);
  };

  const handlePressOut = () => {
    setPressedCard(null);
  };

  return (
    <View style={styles.container} className="px-4 pt-10">
      {/* 标题区域 */}
      <View style={styles.mainHeader} className="items-start">
        <Text style={styles.mainTitle}>🐱 猫咪音效库</Text>
        <Text style={styles.subtitle}>与您的爱宠互动，享受美好时光</Text>
      </View>

      {/* 三列圆形网格 */}
      <View style={styles.circleGrid}>
        {soundFiles.map((sound: SoundFile) => (
          <Animated.View
            key={sound.id}
            style={{
              transform: [
                { scale: currentlyPlaying === sound.filename ? scaleAnim : 1 },
              ],
            }}
          >
            <CircleSoundButton
              sound={sound}
              isPlaying={currentlyPlaying === sound.filename}
              isPressed={pressedCard === sound.id}
              onPlay={handlePlay}
              onStop={handleStop}
              onPressIn={() => handlePressIn(sound.id)}
              onPressOut={handlePressOut}
            />
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
  },
  mainHeader: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#18181B',
    textAlign: 'left',
    marginBottom: 6,
    textShadowColor: 'transparent',
  },
  subtitle: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'left',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'column',
    gap: 16,
    marginBottom: 80,
  },
  // New circular grid styles
  circleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 18,
    columnGap: 0,
  },
  item: {
    width: '32%',
    alignItems: 'center',
  },
  itemPressed: {
    transform: [{ scale: 0.98 }],
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 4,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  circleDefault: {
    backgroundColor: '#FEF3C7', // match page background
  },
  circlePlaying: {
    backgroundColor: '#FDBA74', // orange-300
    borderColor: '#7C2D12',
  },
  circleImage: {
    width: 44,
    height: 44,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
    width: CIRCLE_SIZE,
    textAlign: 'center',
  },
});
