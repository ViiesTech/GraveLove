import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
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

const BookingServiceStep4 = ({ navigation }) => {
  const summary = {
    service: 'Memorial Upkeep',
    cemetery: 'Green Meadows',
    graveNumber: 'Plot C, #45',
    date: '10/29/2025',
    time: '10:00 AM',
    vendor: 'Garden Care Services',
  };

  return (
  <ScreenWrapper
    style={styles.screen}
    contentContainerStyle={styles.content}>
    <View style={styles.iconCircle}>
      <AppIcon name="check" color={AppColors.white} size={34} />
    </View>
    <LineBreak height={2.15} />
    <AppText style={styles.title}>Service Scheduled!</AppText>
    <LineBreak height={1.29} />
    <AppText style={styles.subtitle}>
      Your memorial care service has been successfully scheduled. You'll receive a confirmation email shortly.
    </AppText>
    <LineBreak height={3.43} />
    <GlassCard contentStyle={styles.summaryCard}>
      <SummaryLine label="Service" value={summary.service} />
      <SummaryLine label="Cemetery" value={summary.cemetery} />
      <SummaryLine label="Grave Number" value={summary.graveNumber} />
      <SummaryLine label="Date" value={summary.date} />
      <SummaryLine label="Time" value={summary.time} />
      <SummaryLine label="Vendor" value={summary.vendor} />
    </GlassCard>
    <LineBreak height={3.43} />
    <AppButton
      onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'UserTabs', params: { screen: 'UserHome' } }],
      })}
      style={styles.button}>
      Back to Home
    </AppButton>
  </ScreenWrapper>
  );
};

const SummaryLine = ({ label, value }) => (
  <View style={styles.summaryLine}>
    <AppText style={styles.summaryLabel}>{label}</AppText>
    <AppText style={styles.summaryValue}>{value}</AppText>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.homeBody,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(12),
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderRadius: responsiveWidth(12),
    height: responsiveWidth(24),
    justifyContent: 'center',
    shadowColor: AppColors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    width: responsiveWidth(24),
  },
  title: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.85),
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.42),
    lineHeight: responsiveFontSize(2.05),
    textAlign: 'center',
  },
  summaryCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(6.76),
    paddingVertical: responsiveHeight(2.15),
    width: '100%',
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1.5),
  },
  summaryLabel: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.38),
  },
  summaryValue: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.38),
    textAlign: 'right',
  },
  button: {
    backgroundColor: AppColors.homeActionCard,
    width: '100%',
  },
});

export default BookingServiceStep4;
