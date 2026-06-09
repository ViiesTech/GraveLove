import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
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

const bookings = [
  {
    amount: '$60',
    date: 'October 30, 2025 at 10:00 AM',
    location: 'Peaceful Gardens Cemetery - Rose Section, Block B',
    provider: 'Garden Care Services',
    service: 'Fresh Flowers Placement',
    status: 'Pending',
  },
  {
    amount: '$80',
    date: 'November 2, 2025 at 02:00 PM',
    location: 'Forest Lawn Memorial Park, Section A',
    provider: 'Wilson Care House',
    service: 'Grave Cleaning',
    status: 'In Progress',
  },
];

const UserBookingsScreen = ({ navigation }) => (
  <ScreenWrapper
    isScroll
    style={styles.screen}
    contentContainerStyle={styles.scrollContent}>
    <AppImageHeader
      image={AppAssets.images.userDashboardFront}
      onBack={() => navigation.goBack()}
      title="My Bookings"
      subtitle="Track and manage your service bookings"
    />
    <View style={styles.content}>
      {bookings.map(booking => (
        <BookingCard
          key={`${booking.service}-${booking.date}`}
          booking={booking}
          onPress={() => navigation.navigate('UpcomingServiceDetails', { booking })}
        />
      ))}
    </View>
  </ScreenWrapper>
);

const BookingCard = ({ booking, onPress }) => {
  const isProgress = booking.status === 'In Progress';
  return (
    <GlassCard contentStyle={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.iconWrap}>
          <AppIcon name="sync" color={AppColors.white} size={24} />
        </View>
        <View style={styles.cardCopy}>
          <View style={styles.titleRow}>
            <AppText numberOfLines={1} style={styles.serviceTitle}>
              {booking.service}
            </AppText>
            <View style={[styles.statusBadge, isProgress && styles.statusProgress]}>
              <AppIcon
                name={isProgress ? 'timelapse' : 'access-time'}
                color={AppColors.white}
                size={12}
              />
              <AppText style={styles.statusText}>{booking.status}</AppText>
            </View>
          </View>
          <AppText style={styles.provider}>{booking.provider}</AppText>
        </View>
      </View>
      <LineBreak height={1.72} />
      <View style={styles.details}>
        <DetailLine icon="location-on" text={booking.location} />
        <LineBreak height={0.85} />
        <DetailLine icon="calendar-today" text={booking.date} />
        <LineBreak height={1.72} />
        <View style={styles.amountRow}>
          <AppText style={styles.amountLabel}>Total Amount</AppText>
          <AppText style={styles.amount}>{booking.amount}</AppText>
        </View>
      </View>
      <LineBreak height={2.15} />
      <View style={styles.buttonRow}>
        <AppButton onPress={onPress} style={styles.viewButton} textStyle={styles.viewButtonText}>
          {isProgress ? 'View Progress' : 'View Details'}
        </AppButton>
        <AppButton style={styles.cancelButton} textStyle={styles.cancelText}>
          Cancel
        </AppButton>
      </View>
    </GlassCard>
  );
};

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
  card: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    marginBottom: responsiveHeight(1.72),
    padding: responsiveWidth(4.83),
  },
  cardTop: { alignItems: 'flex-start', flexDirection: 'row' },
  iconWrap: { paddingTop: responsiveHeight(0.4) },
  cardCopy: { flex: 1, marginLeft: responsiveWidth(2.9) },
  titleRow: { alignItems: 'center', flexDirection: 'row' },
  serviceTitle: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
  },
  provider: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    marginTop: responsiveHeight(0.42),
  },
  statusBadge: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialMutedButton,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(2.4),
    paddingVertical: responsiveHeight(0.42),
  },
  statusProgress: { backgroundColor: '#3F6F79' },
  statusText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1),
    marginLeft: responsiveWidth(1),
  },
  details: { paddingLeft: responsiveWidth(10.15) },
  detailLine: { alignItems: 'flex-start', flexDirection: 'row' },
  detailText: {
    color: AppColors.homeTextMuted,
    flex: 1,
    fontSize: responsiveFontSize(1.25),
    lineHeight: responsiveHeight(2),
    marginLeft: responsiveWidth(1.93),
  },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between' },
  amountLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35) },
  amount: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  buttonRow: { flexDirection: 'row', gap: responsiveWidth(2.9) },
  viewButton: {
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    flex: 2,
    height: responsiveHeight(5.15),
  },
  viewButtonText: { color: AppColors.white, fontWeight: '700' },
  cancelButton: {
    backgroundColor: 'transparent',
    borderColor: AppColors.homeBorder,
    borderRadius: 30,
    borderWidth: 1,
    flex: 1,
    height: responsiveHeight(5.15),
  },
  cancelText: { color: AppColors.white },
});

export default UserBookingsScreen;
