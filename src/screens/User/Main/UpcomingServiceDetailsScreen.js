import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const defaultBooking = {
  amount: '$60.00',
  date: 'October 30, 2025 at 10:00 AM',
  location: 'Peaceful Gardens Cemetery - Rose Section, Block B',
  provider: 'Garden Care Services',
  service: 'Fresh Flowers Placement',
};

const UpcomingServiceDetailsScreen = ({ navigation, route }) => {
  const booking = route?.params?.booking ?? defaultBooking;

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Upcoming Service"
        subtitle="View job information"
      />
      <View style={styles.content}>
        <GlassCard contentStyle={styles.card}>
          <View style={styles.topRow}>
            <View style={styles.flowerIcon}>
              <AppIcon name="local-florist" color={AppColors.memorialCard} size={28} />
            </View>
            <View style={styles.titleCopy}>
              <AppText style={styles.title}>{booking.service}</AppText>
              <View style={styles.providerRow}>
                <AppText style={styles.muted}>{booking.provider}</AppText>
                <AppIcon name="star" color={AppColors.starYellow} size={12} />
                <AppText style={styles.rating}>4.9</AppText>
              </View>
            </View>
            <View style={styles.priceWrap}>
              <View style={styles.status}>
                <AppText style={styles.statusText}>Scheduled</AppText>
              </View>
              <AppText style={styles.price}>{booking.amount}</AppText>
            </View>
          </View>
          <LineBreak height={3.43} />
          <InfoRow label="Customer" value="Michael Chen" />
          <LineBreak height={1.29} />
          <View style={styles.memorialPill}>
            <AppText style={styles.memorialText}>Elizabeth Chen (Mother)</AppText>
          </View>
          <LineBreak height={2.58} />
          <DetailLine icon="location-on" text={booking.location} />
          <LineBreak height={1.72} />
          <DetailLine icon="calendar-today" text={booking.date} />
          <LineBreak height={1.72} />
          <AppText style={styles.note}>
            Fresh white roses placed at Forest Lawn. The memorial looks beautiful.
          </AppText>
          <LineBreak height={2.58} />
          <View style={styles.summaryBox}>
            <AppText style={styles.summaryText}>
              Service Summary: Placed fresh rose bouquet arrangement. Removed old wilted flowers. Cleaned vase and surrounding area.
            </AppText>
          </View>
        </GlassCard>
      </View>
    </ScreenWrapper>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <AppText style={styles.infoLabel}>{label}</AppText>
    <AppText style={styles.infoValue}>{value}</AppText>
  </View>
);

const DetailLine = ({ icon, text }) => (
  <View style={styles.detailLine}>
    <AppIcon name={icon} color={AppColors.homeTextMuted} size={16} />
    <AppText style={styles.detailText}>{text}</AppText>
  </View>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.homeBody },
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8) },
  card: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, padding: responsiveWidth(5.8) },
  topRow: { alignItems: 'flex-start', flexDirection: 'row' },
  flowerIcon: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(6),
    height: responsiveWidth(12),
    justifyContent: 'center',
    width: responsiveWidth(12),
  },
  titleCopy: { flex: 1, marginLeft: responsiveWidth(3.86) },
  title: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  providerRow: { alignItems: 'center', flexDirection: 'row', marginTop: responsiveHeight(0.42) },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18), marginRight: responsiveWidth(1.93) },
  rating: { color: AppColors.white, fontSize: responsiveFontSize(1.18), fontWeight: '700', marginLeft: responsiveWidth(0.6) },
  priceWrap: { alignItems: 'flex-end' },
  status: { backgroundColor: AppColors.memorialMutedButton, borderRadius: 8, paddingHorizontal: responsiveWidth(2.4), paddingVertical: responsiveHeight(0.42) },
  statusText: { color: AppColors.white, fontSize: responsiveFontSize(1) },
  price: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700', marginTop: responsiveHeight(0.85) },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  infoLabel: { color: AppColors.white, fontSize: responsiveFontSize(1.35) },
  infoValue: { color: AppColors.white, fontSize: responsiveFontSize(1.35) },
  memorialPill: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 8, paddingHorizontal: responsiveWidth(2.9), paddingVertical: responsiveHeight(0.65) },
  memorialText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18) },
  detailLine: { alignItems: 'flex-start', flexDirection: 'row' },
  detailText: { color: AppColors.homeTextMuted, flex: 1, fontSize: responsiveFontSize(1.35), lineHeight: responsiveHeight(2.25), marginLeft: responsiveWidth(2.9) },
  note: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), fontStyle: 'italic', lineHeight: responsiveHeight(2.35), marginLeft: responsiveWidth(6.76) },
  summaryBox: { backgroundColor: AppColors.memorialMutedButton, borderRadius: 16, padding: responsiveWidth(3.86) },
  summaryText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), lineHeight: responsiveHeight(2.35) },
});

export default UpcomingServiceDetailsScreen;
