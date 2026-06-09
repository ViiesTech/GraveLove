import React from 'react';
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

const BookingServiceStep4 = ({ navigation }) => (
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
      <SummaryLine label="Service" value="Memorial Upkeep" />
      <SummaryLine label="Cemetery" value="a" />
      <SummaryLine label="Grave Number" value="a" />
      <SummaryLine label="Date" value="10/29/2025" />
      <SummaryLine label="Time" value="10:00 AM" />
      <SummaryLine label="Vendor" value="Garden Care Services" />
    </GlassCard>
    <LineBreak height={3.43} />
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={() => navigation.navigate('UserHome')}
      style={styles.button}>
      <AppText style={styles.buttonText}>Back to Home</AppText>
    </TouchableOpacity>
  </ScreenWrapper>
);

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
    fontSize: responsiveFontSize(1.35),
    fontWeight: '600',
  },
  subtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
    lineHeight: responsiveHeight(2.35),
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
    fontSize: responsiveFontSize(1.25),
  },
  summaryValue: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.25),
    textAlign: 'right',
  },
  button: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    paddingVertical: responsiveHeight(1.35),
    width: '100%',
  },
  buttonText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.12),
  },
});

export default BookingServiceStep4;
