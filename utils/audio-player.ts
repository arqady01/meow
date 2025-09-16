import { Audio } from 'expo-av';

export interface SoundFile {
  id: string;
  name: string; // 全名
  label: string; // 圆形按钮下的短标签（2-5字）
  icon: string; // SF Symbol 名，用于区分不同音效
  filename: string;
  description: string;
  // 静态资源模块，使用 require 引入，供 Audio 使用
  source: any;
  // 可选：本地图片资源，优先展示为圆形按钮内的图
  image?: any;
}

export const soundFiles: SoundFile[] = [
  {
    id: '1',
    name: '经典喵叫',
    label: '开心叫',
    icon: 'cat.fill',
    filename: 'classic-meow.m4a',
    description: '传统的猫叫声，适合日常互动',
    source: require('../assets/sounds/classic-meow.m4a'),
    image: require('../assets/images/sounds/img1.png'),
  },
  {
    id: '2',
    name: '撒娇喵叫',
    label: '陪我玩',
    icon: 'hand.tap.fill',
    filename: 'demanding-meow.m4a',
    description: '撒娇式的叫声，吸引猫咪注意',
    source: require('../assets/sounds/demanding-meow.m4a'),
    image: require('../assets/images/sounds/img2.png'),
  },
  {
    id: '3',
    name: '满足呼噜',
    label: '呼噜声',
    icon: 'heart.fill',
    filename: 'gentle-purr.m4a',
    description: '满足的呼噜声，让猫咪感到安心',
    source: require('../assets/sounds/gentle-purr.m4a'),
    image: require('../assets/images/sounds/img3.png'),
  }
];

export class AudioPlayer {
  private static instance: AudioPlayer;
  private currentSound: Audio.Sound | null = null;
  private audioInitialized: boolean = false;

  private constructor() {}

  static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  }

  private async initializeAudio(): Promise<void> {
    if (!this.audioInitialized) {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      this.audioInitialized = true;
    }
  }

  async playSound(filename: string): Promise<void> {
    try {
      await this.initializeAudio();

      // 停止当前播放的音频
      if (this.currentSound) {
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      }

      // 在 soundFiles 中查找对应的资源
      const file = soundFiles.find((f) => f.filename === filename);
      if (!file) {
        throw new Error('未知的音频文件');
      }

      const { sound } = await Audio.Sound.createAsync(file.source);
      this.currentSound = sound;

      await sound.playAsync();

      // 播放完成后自动卸载
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          this.currentSound?.unloadAsync();
          this.currentSound = null;
        }
      });
    } catch (error) {
      console.error('播放音频时出错:', error);
      throw error;
    }
  }

  async stopSound(): Promise<void> {
    if (this.currentSound) {
      try {
        await this.currentSound.stopAsync();
        await this.currentSound.unloadAsync();
        this.currentSound = null;
      } catch (error) {
        console.error('停止音频时出错:', error);
      }
    }
  }

  isPlaying(): boolean {
    return this.currentSound !== null;
  }

  getSoundFiles(): SoundFile[] {
    return soundFiles;
  }
}

export const audioPlayer = AudioPlayer.getInstance();
