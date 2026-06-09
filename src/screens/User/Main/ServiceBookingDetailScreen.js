import React, { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
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

const dates = ['Oct 28', 'Oct 29', 'Oct 30', 'Oct 31', 'Nov 1'];
const times = ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:30 PM'];

const ServiceBookingDetailScreen = ({ navigation, route }) => {
  const service = route?.params?.service ?? {
    description: 'Fresh seasonal flowers arranged and placed with care at the memorial site',
    price: '$90',
    title: 'Flower Service',
  };
  const [selectedDate, setSelectedDate] = useState(2);
  const [selectedTime, setSelectedTime] = useState(0);

  return (
    <ScreenWrapper safeAreaEdges={[]} useBackgroundImage={false} style={styles.screen}>
      <ImageBackground
        source={AppAssets.images.userDashboardFront}
        resizeMode="cover"
        style={styles.headerBg}
      />
      <View style={styles.overlay} />

      <View style={styles.safeContent}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <AppIcon iconSet="ion" name="chevron-back" color={AppColors.white} size={22} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Book Service</AppText>
        </View>

        <ScreenWrapper
          isScroll
          safeAreaEdges={[]}
          useBackgroundImage={false}
          style={styles.scrollWrapper}
          contentContainerStyle={styles.scrollContent}>
          <VendorMiniCard />
          <LineBreak height={3.43} />
          <SectionIcon icon="check-circle" text={service.title} />
          <LineBreak height={1.72} />
          <AppText style={styles.description}>{service.description}</AppText>
          <LineBreak height={3.43} />
          <SectionIcon icon="calendar-today" text="Select Date" />
          <LineBreak height={1.72} />
          <View style={styles.dateRow}>
            {dates.map((date, index) => {
              const [month, day] = date.split(' ');
              const selected = selectedDate === index;
              return (
                <TouchableOpacity
                  key={date}
                  activeOpacity={0.82}
                  onPress={() => setSelectedDate(index)}
                  style={[styles.dateChip, selected && styles.activeChip]}>
                  <AppText style={[styles.dateMonth, selected && styles.activeText]}>
                    {month}
                  </AppText>
                  <AppText style={[styles.dateDay, selected && styles.activeText]}>
                    {day}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
          <LineBreak height={3.43} />
          <SectionIcon icon="access-time" text="Select Time" />
          <LineBreak height={1.72} />
          <View style={styles.timeRow}>
            {times.map((time, index) => {
              const selected = selectedTime === index;
              return (
                <TouchableOpacity
                  key={time}
                  activeOpacity={0.82}
                  onPress={() => setSelectedTime(index)}
                  style={[styles.timeChip, selected && styles.activeChip]}>
                  <AppText style={[styles.timeText, selected && styles.activeText]}>
                    {time}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
          <LineBreak height={12} />
        </ScreenWrapper>
      </View>

      <View style={styles.bottomBar}>
        <View>
          <AppText style={styles.totalLabel}>Total Price</AppText>
          <AppText style={styles.totalPrice}>{service.price}</AppText>
        </View>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('VendorCheckout')}
          style={styles.bookNowButton}>
          <AppText style={styles.bookNowText}>Book Now</AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const VendorMiniCard = () => (
  <GlassCard contentStyle={styles.vendorCard}>
    <View style={styles.vendorImageStub}>
      <AppText style={styles.vendorImageText}>GL</AppText>
    </View>
    <View style={styles.vendorCopy}>
      <AppText style={styles.vendorName}>Wilson Care House</AppText>
      <View style={styles.ratingRow}>
        <AppIcon name="star" color={AppColors.starYellow} size={14} />
        <AppText style={styles.muted}>4.9 • 328 reviews</AppText>
      </View>
    </View>
    <View style={styles.badge}>
      <AppText style={styles.badgeText}>Top Rated</AppText>
    </View>
  </GlassCard>
);

const SectionIcon = ({ icon, text }) => (
  <View style={styles.sectionIcon}>
    <AppIcon name={icon} color={AppColors.white} size={20} />
    <AppText style={styles.sectionText}>{text}</AppText>
  </View>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.memorialCard },
  headerBg: {
    height: responsiveHeight(27.9),
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  overlay: {
    backgroundColor: 'rgba(4, 47, 103, 0.72)',
    height: responsiveHeight(27.9),
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  safeContent: { flex: 1, paddingTop: responsiveHeight(5.15) },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5.8),
    paddingVertical: responsiveHeight(1.72),
  },
  backButton: { height: responsiveWidth(8), justifyContent: 'center', width: responsiveWidth(8) },
  headerTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
    marginLeft: responsiveWidth(3.86),
  },
  scrollWrapper: { backgroundColor: 'transparent' },
  scrollContent: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(1.72),
  },
  vendorCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
  },
  vendorImageStub: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialMutedButton,
    borderRadius: 12,
    height: responsiveWidth(12),
    justifyContent: 'center',
    width: responsiveWidth(12),
  },
  vendorImageText: { color: AppColors.white, fontWeight: '700' },
  vendorCopy: { flex: 1, marginLeft: responsiveWidth(3.86) },
  vendorName: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  ratingRow: { alignItems: 'center', flexDirection: 'row', marginTop: responsiveHeight(0.42) },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginLeft: responsiveWidth(1) },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(1.93),
    paddingVertical: responsiveHeight(0.42),
  },
  badgeText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  sectionIcon: { alignItems: 'center', flexDirection: 'row' },
  sectionText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
    marginLeft: responsiveWidth(2.9),
  },
  description: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
    lineHeight: responsiveHeight(2.25),
  },
  dateRow: { flexDirection: 'row', gap: responsiveWidth(2.9) },
  dateChip: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    height: responsiveHeight(7.5),
    justifyContent: 'center',
    width: responsiveWidth(14.5),
  },
  activeChip: { backgroundColor: AppColors.white, borderColor: AppColors.white },
  dateMonth: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05) },
  dateDay: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  activeText: { color: AppColors.memorialCard },
  timeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: responsiveWidth(2.9) },
  timeChip: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(4.83),
    paddingVertical: responsiveHeight(1.29),
  },
  timeText: { color: AppColors.white, fontSize: responsiveFontSize(1.25), fontWeight: '600' },
  bottomBar: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 0,
    padding: responsiveWidth(5.8),
    position: 'absolute',
    right: 0,
  },
  totalLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15) },
  totalPrice: { color: AppColors.white, fontSize: responsiveFontSize(2.35), fontWeight: '700' },
  bookNowButton: {
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    paddingHorizontal: responsiveWidth(9.66),
    paddingVertical: responsiveHeight(1.5),
  },
  bookNowText: { color: AppColors.black, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
});

export default ServiceBookingDetailScreen;
