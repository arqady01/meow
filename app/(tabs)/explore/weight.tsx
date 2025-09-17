import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

const KG_TO_LB = 2.20462262185; // 千克→磅

export default function WeightToolScreen() {
  const [kgText, setKgText] = useState('');
  const [lbText, setLbText] = useState('');

  const format = (n: number) => {
    if (!isFinite(n)) return '';
    const fixed = Math.round(n * 10) / 10; // 1 位小数
    return fixed.toString();
  };

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.pageInner} className="px-4 pt-10">
          <View style={styles.header} className="items-start">
            <View style={styles.cardHeader}>
              <IconSymbol name="scalemass.fill" size={28} color="#F59E0B" />
              <ThemedText type="title" style={styles.appTitle}>质量换算</ThemedText>
            </View>
            <Text style={styles.helperText}>千克与磅实时换算，方便记录猫咪体重</Text>
          </View>

          <View style={styles.card}>
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
  header: {
    alignItems: 'flex-start',
    marginTop: 8,
    marginBottom: 16,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  appTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 6,
  },
  helperText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 4,
    borderColor: '#18181B',
  },
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
});
