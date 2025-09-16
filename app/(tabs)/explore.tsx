import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ThemedText } from '@/components/themed-text';

export default function ToolsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.pageInner} className="px-4 pt-10">
          {/* 头部 */}
          <View style={styles.header} className="items-start">
            <ThemedText type="title" style={styles.appTitle}>猫咪工具箱</ThemedText>
          </View>

          {/* 年龄换算器 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <IconSymbol name="book.fill" size={24} color="#10B981" />
              <ThemedText type="subtitle" style={styles.cardTitle}>年龄换算</ThemedText>
            </View>
            <AgeConverter />
          </View>

          {/* 质量换算器 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <IconSymbol name="scalemass.fill" size={24} color="#F59E0B" />
              <ThemedText type="subtitle" style={styles.cardTitle}>质量换算</ThemedText>
            </View>
            <WeightConverter />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AgeConverter() {
  const [catAgeText, setCatAgeText] = useState('');
  const [humanAgeText, setHumanAgeText] = useState('');

  const format = (n: number) => {
    if (!isFinite(n)) return '';
    const fixed = Math.round(n * 10) / 10; // 1 位小数
    return fixed.toString();
  };

  const catToHuman = (cat: number) => {
    if (cat <= 0) return 0;
    if (cat <= 1) return 15 * cat; // 0-1 岁线性过渡
    if (cat <= 2) return 15 + (cat - 1) * 9; // 1-2 岁线性过渡
    return 24 + (cat - 2) * 4; // 2 岁后每年≈4人岁
  };

  const humanToCat = (human: number) => {
    if (human <= 0) return 0;
    if (human <= 15) return human / 15; // 0-1 岁
    if (human <= 24) return 1 + (human - 15) / 9; // 1-2 岁
    return 2 + (human - 24) / 4; // 2 岁后
  };

  const onCatAgeChange = (t: string) => {
    const cleaned = t.replace(/[^0-9.]/g, '');
    setCatAgeText(cleaned);
    if (cleaned === '') {
      setHumanAgeText('');
      return;
    }
    const n = parseFloat(cleaned);
    if (isNaN(n)) return;
    const human = catToHuman(n);
    setHumanAgeText(format(human));
  };

  const onHumanAgeChange = (t: string) => {
    const cleaned = t.replace(/[^0-9.]/g, '');
    setHumanAgeText(cleaned);
    if (cleaned === '') {
      setCatAgeText('');
      return;
    }
    const n = parseFloat(cleaned);
    if (isNaN(n)) return;
    const cat = humanToCat(n);
    setCatAgeText(format(cat));
  };

  const tips = useMemo(() => {
    const human = parseFloat(humanAgeText);
    if (!isFinite(human)) return '';
    if (human < 2) return '幼猫期（需精心照料）';
    if (human < 15) return '少年到青年期';
    if (human < 45) return '壮年期';
    return '老年期（注意保健）';
  }, [humanAgeText]);

  return (
    <View style={styles.converter}>
      <View style={styles.inputRow}>
        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>猫咪年龄（岁）</Text>
          <TextInput
            value={catAgeText}
            onChangeText={onCatAgeChange}
            keyboardType="numeric"
            placeholder="例如 2.5"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
        </View>
        <View style={styles.eqBlock}>
          <Text style={styles.eqText}>=</Text>
        </View>
        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>人类年龄（岁）</Text>
          <TextInput
            value={humanAgeText}
            onChangeText={onHumanAgeChange}
            keyboardType="numeric"
            placeholder="例如 28"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
        </View>
      </View>

      {tips ? <Text style={styles.tips}>{tips}</Text> : null}
    </View>
  );
}

function WeightConverter() {
  const [kgText, setKgText] = useState('');
  const [lbText, setLbText] = useState('');

  const format = (n: number) => {
    if (!isFinite(n)) return '';
    const fixed = Math.round(n * 10) / 10; // 1 位小数
    return fixed.toString();
  };

  const KG_TO_LB = 2.20462262185; // 千克→磅

  const onKgChange = (t: string) => {
    const cleaned = t.replace(/[^0-9.]/g, '');
    setKgText(cleaned);
    if (cleaned === '') { setLbText(''); return; }
    const n = parseFloat(cleaned);
    if (isNaN(n)) return;
    setLbText(format(n * KG_TO_LB));
  };

  const onLbChange = (t: string) => {
    const cleaned = t.replace(/[^0-9.]/g, '');
    setLbText(cleaned);
    if (cleaned === '') { setKgText(''); return; }
    const n = parseFloat(cleaned);
    if (isNaN(n)) return;
    setKgText(format(n / KG_TO_LB));
  };

  return (
    <View style={styles.converter}>
      <View style={styles.inputRow}>
        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>千克（kg）</Text>
          <TextInput
            value={kgText}
            onChangeText={onKgChange}
            keyboardType="numeric"
            placeholder="例如 4.2"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
        </View>
        <View style={styles.eqBlock}>
          <Text style={styles.eqText}>=</Text>
        </View>
        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>磅（lb）</Text>
          <TextInput
            value={lbText}
            onChangeText={onLbChange}
            keyboardType="numeric"
            placeholder="例如 9.3"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FEF3C7' },
  scrollView: { flex: 1 },

  pageInner: { flex: 1 },
  header: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#18181B',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    textAlign: 'left',
    marginBottom: 4,
  },
  versionText: { fontSize: 14, color: '#374151', fontWeight: '700' },

  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    marginHorizontal: 0,
    borderWidth: 4,
    borderColor: '#18181B',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '900', color: '#111827' },

  converter: { gap: 14 },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 },
  inputBlock: { flex: 1 },
  eqBlock: { width: 40, alignItems: 'center', justifyContent: 'center' },
  eqText: { fontSize: 24, fontWeight: '900', color: '#111827' },

  inputLabel: { fontSize: 12, fontWeight: '900', color: '#111827', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#18181B',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },

  tips: { marginTop: 8, fontSize: 12, color: '#1F2937', fontWeight: '700' },
});
