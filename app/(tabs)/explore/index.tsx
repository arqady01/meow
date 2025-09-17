import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

const TOOL_ENTRIES = [
  {
    key: 'age',
    title: '年龄换算',
    subtitle: 'CAT ↔ HUMAN AGE',
    badge: 'AGE LAB',
    accent: '#FCD34D',
    accentStrong: '#EA580C',
    href: '/(tabs)/explore/age',
  },
  {
    key: 'weight',
    title: '质量换算',
    subtitle: 'KG ↔ LB QUICK CONVERT',
    badge: 'MASS LAB',
    accent: '#60A5FA',
    accentStrong: '#1D4ED8',
    href: '/(tabs)/explore/weight',
  },
];

export default function ToolsHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.pageInner} className="px-4 pt-12">
          <View style={styles.hero}>
            <Text style={styles.heroTag}>MEOW LAB</Text>
            <ThemedText type="title" style={styles.heroTitle}>meow工具台</ThemedText>
            <Text style={styles.heroSubtitle}>宝箱纳玲琅，贴心又闪亮。主子躺成王，与猫共斜阳。</Text>
          </View>

          <View style={styles.toolGrid}>
            {TOOL_ENTRIES.map((tool, index) => (
              <Link key={tool.key} href={tool.href} asChild>
                <Pressable style={({ pressed }) => [
                  styles.toolCard,
                  {
                    backgroundColor: tool.accent,
                    shadowColor: '#0F172A',
                  },
                  pressed && styles.toolCardPressed,
                ]}>
                  <View style={styles.toolCardFrame}>
                    <View style={styles.toolCardBadgeWrap}>
                      <Text style={styles.toolCardBadge}>{tool.badge}</Text>
                      <Text style={styles.toolCardIndex}>{index + 1}</Text>
                    </View>
                    <ThemedText type="subtitle" style={styles.toolCardTitle}>{tool.title}</ThemedText>
                    <Text style={styles.toolCardSubtitle}>{tool.subtitle}</Text>
                    <View style={[styles.toolCardAction, { backgroundColor: tool.accentStrong }]}> 
                      <IconSymbol name="arrow.up.right" size={18} color="#FFFFFF" />
                      <Text style={styles.toolCardActionText}>GO</Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF3EA' },
  scrollView: { flex: 1 },
  pageInner: { flex: 1 },
  hero: {
    backgroundColor: '#0F172A',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#09090B',
    padding: 24,
    gap: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.4,
    shadowOffset: { width: 6, height: 6 },
    shadowRadius: 0,
    elevation: 6,
    marginBottom: 24,
  },
  heroTag: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#FACC15',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#F8FAFC',
    textTransform: 'uppercase',
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#CBD5F5',
    lineHeight: 20,
  },
  toolGrid: {
    flexDirection: 'column',
    gap: 20,
  },
  toolCard: {
    borderRadius: 22,
    borderWidth: 5,
    borderColor: '#0F172A',
    padding: 24,
    shadowOpacity: 0.4,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 0,
    elevation: 6,
    transform: [{ translateX: 0 }, { translateY: 0 }],
  },
  toolCardPressed: {
    transform: [{ translateX: 4 }, { translateY: 4 }],
    shadowOffset: { width: 4, height: 4 },
  },
  toolCardFrame: { gap: 16 },
  toolCardBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolCardBadge: {
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#0F172A',
  },
  toolCardIndex: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
  },
  toolCardTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0F172A',
  },
  toolCardSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  toolCardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  toolCardActionText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});
