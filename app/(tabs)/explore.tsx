import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} className="bg-background-warning-50">
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* 应用标题和版本 */}
        <View style={styles.header} className="items-start px-5">
          <View style={styles.iconContainer}>
            <IconSymbol name="cat.fill" size={64} color="#9A3412" />
          </View>
          <ThemedText type="title" style={styles.appTitle}>
            🐱 猫咪音效
          </ThemedText>
          <ThemedText style={styles.versionText}>
            版本 1.0.0
          </ThemedText>
        </View>

        {/* 应用介绍卡片 */}
        <ThemedView style={styles.card} className="shadow-hard-2">
          <View style={styles.cardHeader}>
            <IconSymbol name="info.circle.fill" size={24} color="#3B82F6" />
            <ThemedText type="subtitle" style={styles.cardTitle}>
              应用介绍
            </ThemedText>
          </View>
          <ThemedText style={styles.cardContent}>
            猫咪音效是一款专为宠物主人设计的手机应用，通过播放不同类型的猫叫声来增强您与宠物的互动体验。让每一次互动都充满乐趣和温馨。
          </ThemedText>
        </ThemedView>

        {/* 功能特点卡片 */}
        <ThemedView style={styles.card} className="shadow-hard-2">
          <View style={styles.cardHeader}>
            <IconSymbol name="star.fill" size={24} color="#F59E0B" />
            <ThemedText type="subtitle" style={styles.cardTitle}>
              功能特点
            </ThemedText>
          </View>
          <View style={styles.featuresList}>
            <FeatureItem icon="speaker.wave.2.fill" text="3种精心挑选的猫咪音效" />
            <FeatureItem icon="hand.tap.fill" text="一键播放，操作简单" />
            <FeatureItem icon="wifi.slash" text="离线使用，无需网络" />
            <FeatureItem icon="folder.fill" text="本地存储，音效随时可用" />
          </View>
        </ThemedView>

        {/* 使用方法卡片 */}
        <ThemedView style={styles.card} className="shadow-hard-2">
          <View style={styles.cardHeader}>
            <IconSymbol name="book.fill" size={24} color="#10B981" />
            <ThemedText type="subtitle" style={styles.cardTitle}>
              使用方法
            </ThemedText>
          </View>
          <View style={styles.stepsList}>
            <StepItem number="1" text="在主界面选择想要的猫咪音效" />
            <StepItem number="2" text="点击&ldquo;播放&rdquo;按钮开始播放" />
            <StepItem number="3" text="播放时可点击&ldquo;停止&rdquo;按钮停止" />
            <StepItem number="4" text="观察您的猫咪反应，享受互动乐趣" />
          </View>
        </ThemedView>

        {/* 技术信息卡片 */}
        <ThemedView style={styles.card} className="shadow-hard-2">
          <View style={styles.cardHeader}>
            <IconSymbol name="gearshape.fill" size={24} color="#8B5CF6" />
            <ThemedText type="subtitle" style={styles.cardTitle}>
              技术信息
            </ThemedText>
          </View>
          <View style={styles.techInfo}>
            <TechInfoItem label="开发框架" value="React Native + Expo" />
            <TechInfoItem label="样式系统" value="NativeWind + Tailwind CSS" />
            <TechInfoItem label="音频格式" value="M4A" />
            <TechInfoItem label="构建工具" value="TypeScript" />
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

// 功能项组件
const FeatureItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <IconSymbol name={icon} size={20} color="#F97316" />
    <ThemedText style={styles.featureText}>{text}</ThemedText>
  </View>
);

// 步骤项组件
const StepItem: React.FC<{ number: number; text: string }> = ({ number, text }) => (
  <View style={styles.stepItem}>
    <View style={styles.stepNumber}>
      <ThemedText style={styles.stepNumberText}>{number}</ThemedText>
    </View>
    <ThemedText style={styles.stepText}>{text}</ThemedText>
  </View>
);

// 技术信息项组件
const TechInfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <View style={styles.techInfoItem}>
    <ThemedText style={styles.techLabel}>{label}</ThemedText>
    <ThemedText style={styles.techValue}>{value}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
  },
  scrollView: {
    flex: 1,
  },
  // 移除顶部与底部的装饰圆点，突出“块面+描边”的新粗野主义
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#18181B',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111827',
    textAlign: 'left',
    marginBottom: 4,
  },
  versionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '700',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    marginHorizontal: 20,
    borderWidth: 4,
    borderColor: '#18181B',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },
  cardContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1F2937',
    fontWeight: '600',
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 2,
  },
  featureText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '700',
    flex: 1,
  },
  stepsList: {
    gap: 14,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FDBA74',
    borderWidth: 3,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },
  stepText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#1F2937',
    fontWeight: '700',
    flex: 1,
    paddingTop: 2,
  },
  techInfo: {
    gap: 10,
  },
  techInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#18181B',
  },
  techLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },
  techValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '700',
  },
});
