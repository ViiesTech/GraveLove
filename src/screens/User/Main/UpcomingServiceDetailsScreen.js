import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useGetClientBookingDetailQuery } from '../../../redux/api/userApi';
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

const firstValue = (...values) =>
  values.find(value => value !== undefined && value !== null && value !== '');

const pickService = booking =>
  firstValue(
    booking?.service,
    booking?.service_name,
    booking?.vendor_service?.name,
    booking?.vendor_service?.service_name,
    booking?.title,
    'Fresh Flowers Placement',
  );

const pickProvider = booking =>
  firstValue(
    booking?.provider,
    booking?.vendor_name,
    booking?.vendor?.vendor_business?.business_name,
    booking?.vendor?.business_name,
    booking?.vendor?.name,
    'Garden Care Services',
  );

const pickAmount = booking =>
  firstValue(booking?.amount, booking?.total_amount, booking?.price, '$60.00');

const pickDate = booking =>
  firstValue(
    booking?.date,
    booking?.formatted_date,
    booking?.date_time,
    booking?.scheduled_at,
    booking?.scheduled_date,
    'October 30, 2025 at 10:00 AM',
  );

const pickLocation = booking =>
  firstValue(
    booking?.location,
    booking?.cemetery_name,
    booking?.memorial?.address,
    booking?.memorial?.cemetery_name,
    'Peaceful Gardens Cemetery - Rose Section, Block B',
  );

const pickCustomer = booking =>
  firstValue(booking?.customer_name, booking?.client?.name, booking?.user?.name, 'Michael Chen');

const pickMemorial = booking =>
  firstValue(booking?.memorial_name, booking?.memorial?.name, 'Elizabeth Chen (Mother)');

const UpcomingServiceDetailsScreen = ({ navigation, route }) => {
  const routeBooking = route?.params?.booking ?? defaultBooking;
  const bookingId = firstValue(route?.params?.bookingId, routeBooking?.id, routeBooking?.booking_id);
  const { data: bookingDetail } = useGetClientBookingDetailQuery(bookingId, { skip: !bookingId });
  const booking = bookingDetail || routeBooking;

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
              <AppText style={styles.title}>{pickService(booking)}</AppText>
              <View style={styles.providerRow}>
                <AppText style={styles.muted}>{pickProvider(booking)}</AppText>
                <AppIcon name="star" color={AppColors.starYellow} size={12} />
                <AppText style={styles.rating}>{firstValue(booking?.rating, booking?.vendor?.rating, '4.9')}</AppText>
              </View>
            </View>
            <View style={styles.priceWrap}>
              <View style={styles.status}>
                <AppText style={styles.statusText}>Scheduled</AppText>
              </View>
              <AppText style={styles.price}>{pickAmount(booking)}</AppText>
            </View>
          </View>
          <LineBreak height={3.43} />
          <InfoRow label="Customer" value={pickCustomer(booking)} />
          <LineBreak height={1.29} />
          <View style={styles.memorialPill}>
            <AppText style={styles.memorialText}>{pickMemorial(booking)}</AppText>
          </View>
          <LineBreak height={2.58} />
          <DetailLine icon="location-on" text={pickLocation(booking)} />
          <LineBreak height={1.72} />
          <DetailLine icon="calendar-today" text={pickDate(booking)} />
          <LineBreak height={1.72} />
          <AppText style={styles.note}>
            {firstValue(booking?.instructions, booking?.notes, 'Fresh white roses placed at Forest Lawn. The memorial looks beautiful.')}
          </AppText>
          <LineBreak height={2.58} />
          <View style={styles.summaryBox}>
            <AppText style={styles.summaryText}>
              {firstValue(booking?.summary, booking?.service_summary, 'Service Summary: Placed fresh rose bouquet arrangement. Removed old wilted flowers. Cleaned vase and surrounding area.')}
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
