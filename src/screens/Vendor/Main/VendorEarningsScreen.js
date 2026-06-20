import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const filters = ['All', 'Monthly', 'Weekly'];
const transactions = [
  ['Grave Cleaning', '25 Oct', '$85', 'Paid'],
  ['Flower Service', '20 Oct', '$120', 'Pending'],
  ['Grave Decoration', '15 Oct', '$95', 'Paid'],
  ['Maintenance', '10 Oct', '$150', 'Paid'],
];

const VendorEarningsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <LineBreak height={1.6} />
        <AppText style={styles.title}>Earnings Dashboard</AppText>
      </View>
      <View style={styles.body}>
        <View style={styles.earningsCard}>
          <View>
            <AppText style={styles.earningsLabel}>Current Earnings</AppText>
            <AppText style={styles.earningsValue}>$330</AppText>
          </View>
          <View style={styles.moneyCircle}><AppIcon name="attach-money" color={AppColors.white} size={32} /></View>
        </View>
        <LineBreak height={1.6} />
        <View style={styles.statsRow}>
          <StatCard icon="check-circle-outline" label="Completed" value="3 Tasks" />
          <StatCard icon="access-time" label="Pending" value="$120" />
        </View>
        <LineBreak height={2.4} />
        <AppText style={styles.sectionTitle}>Transaction History</AppText>
        <LineBreak height={1.5} />
        <View style={styles.filterRow}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              activeOpacity={0.82}
              onPress={() => setSelectedFilter(filter)}
              style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]}>
              <AppText style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</AppText>
            </TouchableOpacity>
          ))}
        </View>
        <LineBreak height={1.6} />
        {transactions.map(tx => <Transaction key={tx[0]} tx={tx} />)}
      </View>
    </ScreenWrapper>
  );
};

const StatCard = ({ icon, label, value }) => (
  <GlassCard contentStyle={styles.statCard}>
    <View style={styles.statIcon}><AppIcon name={icon} color={AppColors.white} size={20} /></View>
    <View style={styles.statCopy}>
      <AppText style={styles.statLabel}>{label}</AppText>
      <AppText style={styles.statValue}>{value}</AppText>
    </View>
  </GlassCard>
);

const Transaction = ({ tx }) => (
  <GlassCard contentStyle={styles.transaction}>
    <View style={styles.transactionCopy}>
      <AppText style={styles.transactionTitle}>{tx[0]}</AppText>
      <AppText style={styles.transactionDate}>{tx[1]}</AppText>
    </View>
    <View style={styles.transactionRight}>
      <AppText style={styles.amount}>{tx[2]}</AppText>
      <AppText style={styles.status}>{tx[3]}</AppText>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(9) },
  header: { padding: responsiveWidth(4), backgroundColor: 'rgba(4,47,103,0.5)' },
  title: { color: AppColors.white, fontSize: responsiveFontSize(2.45), fontWeight: '700' },
  body: { padding: responsiveWidth(4) },
  earningsCard: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: responsiveWidth(5), borderRadius: 16, backgroundColor: AppColors.memorialCard },
  earningsLabel: { color: AppColors.white, fontSize: responsiveFontSize(1.35) },
  earningsValue: { color: AppColors.white, fontSize: responsiveFontSize(3.2), fontWeight: '700', marginTop: responsiveHeight(0.6) },
  moneyCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(14), height: responsiveWidth(14), borderRadius: responsiveWidth(7), backgroundColor: AppColors.onboardingButton },
  statsRow: { flexDirection: 'row', gap: responsiveWidth(3) },
  statCard: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  statIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(9.5), height: responsiveWidth(9.5), borderRadius: responsiveWidth(4.75), backgroundColor: AppColors.onboardingButton },
  statCopy: { flex: 1, marginLeft: responsiveWidth(2.5) },
  statLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.08) },
  statValue: { color: AppColors.white, fontSize: responsiveFontSize(1.25), fontWeight: '700', marginTop: responsiveHeight(0.3) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.8), fontWeight: '700' },
  filterRow: { flexDirection: 'row', gap: responsiveWidth(2) },
  filterChip: { paddingHorizontal: responsiveWidth(3.8), paddingVertical: responsiveHeight(0.9), borderRadius: 20, borderWidth: 0.5, borderColor: AppColors.homeBorder, backgroundColor: AppColors.onboardingButton },
  filterChipActive: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.memorialCard },
  filterText: { color: AppColors.white, fontSize: responsiveFontSize(1.15) },
  filterTextActive: { color: AppColors.white, fontWeight: '700' },
  transaction: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(1.2), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  transactionCopy: { flex: 1 },
  transactionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  transactionDate: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginTop: responsiveHeight(0.35) },
  transactionRight: { alignItems: 'flex-end' },
  amount: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  status: { overflow: 'hidden', color: AppColors.white, fontSize: responsiveFontSize(1.02), marginTop: responsiveHeight(0.35), paddingHorizontal: responsiveWidth(2.2), paddingVertical: responsiveHeight(0.35), borderRadius: 8, backgroundColor: '#4F6D95' },
});

export default VendorEarningsScreen;
