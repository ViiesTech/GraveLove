import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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

const services = [
  ['Flower Placement', 'Eternal Blooms', '4.9', '$60.00', 'Completed', 'October 30, 2025 at 10:00 AM', 'Fresh white roses placed at Forest Lawn. The memorial looks beautiful.', [AppAssets.images.vendor1, AppAssets.images.vendor4]],
  ['Grave Cleaning', 'Memorial Care Pro', '4.8', '$45.00', 'Completed', 'October 15, 2025 at 2:00 PM', 'Headstone cleaned and polished at Garden of Peace. Surrounding area maintained.', [AppAssets.images.headerImage, AppAssets.images.vendor3]],
  ['Memorial Upkeep', 'Garden of Peace Services', '4.7', '$75.00', 'Completed', 'September 20, 2025 at 11:30 AM', 'Complete upkeep service including grass trimming and flower bed maintenance.', [AppAssets.images.vendor2]],
  ['Flower Placement', 'Eternal Blooms', '4.9', '$50.00', 'Scheduled', 'November 5, 2025 at 9:00 AM', "Scheduled for upcoming Father's remembrance day.", []],
];

const ViewMemorialServiceInfoScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
    <AppImageHeader
      image={AppAssets.images.userDashboardFront}
      onBack={() => navigation.goBack()}
      title="Service History"
      subtitle="All memorial care services"
    />
    <View style={styles.content}>
      <View style={styles.statRow}>
        <StatCard icon="check-circle-outline" label="Completed" value="3" />
        <StatCard icon="calendar-today" label="Next Service" value="Nov 5, 2025" />
      </View>
      <LineBreak height={2.4} />
      <AppButton style={styles.primaryButton} onPress={() => navigation.navigate('BookService')}>
        Book New Service
      </AppButton>
      <LineBreak height={2.4} />
      <AppText style={styles.sectionTitle}>Service Timeline</AppText>
      <LineBreak height={1.5} />
      {services.map(service => (
        <ServiceCard
          key={`${service[0]}-${service[5]}`}
          data={service}
          navigation={navigation}
        />
      ))}
      <GlassCard contentStyle={styles.summaryCard}>
        <AppText style={styles.cardTitle}>Service Summary</AppText>
        <LineBreak height={1.5} />
        <SummaryRow label="Total Services Completed" value="3" />
        <SummaryRow label="Total Investment" value="$180.00" />
        <SummaryRow label="Last Service" value="Oct 30, 2025" />
        <SummaryRow label="Upcoming Service" value="Nov 5, 2025" />
      </GlassCard>
    </View>
  </ScreenWrapper>
);

const StatCard = ({ icon, label, value }) => (
  <GlassCard contentStyle={styles.statCard}>
    <View style={styles.statTop}>
      <View style={styles.statIcon}><AppIcon name={icon} color={AppColors.themeColor} size={14} /></View>
      <AppText style={styles.statLabel}>{label}</AppText>
    </View>
    <LineBreak height={1.2} />
    <AppText style={styles.statValue}>{value}</AppText>
  </GlassCard>
);

const ServiceCard = ({ data, navigation }) => {
  const [title, vendor, rating, price, status, date, desc, photos] = data;
  const scheduled = status === 'Scheduled';
  return (
    <GlassCard contentStyle={styles.serviceCard}>
      <View style={styles.serviceTop}>
        <View style={styles.storeIcon}><AppIcon name="store" color={AppColors.themeColor} size={24} /></View>
        <View style={styles.flex}>
          <AppText style={styles.serviceTitle}>{title}</AppText>
          <View style={styles.vendorLine}>
            <AppText style={styles.muted}>{vendor}</AppText>
            <AppIcon name="star" color={AppColors.starYellow} size={12} />
            <AppText style={styles.muted}>{rating}</AppText>
          </View>
        </View>
        <View style={styles.priceBlock}>
          <View style={[styles.statusPill, scheduled && styles.scheduledPill]}><AppText style={styles.statusText}>{status}</AppText></View>
          <AppText style={styles.price}>{price}</AppText>
        </View>
      </View>
      <LineBreak height={1.4} />
      <View style={styles.iconLine}><AppIcon name="calendar-today" color={AppColors.homeTextMuted} size={14} /><AppText style={styles.muted}>{date}</AppText></View>
      <LineBreak height={1.2} />
      <AppText style={styles.desc}>{desc}</AppText>
      {photos.length ? (
        <>
          <LineBreak height={1.4} />
          <AppText style={styles.photosTitle}>Service Photos</AppText>
          <LineBreak height={0.8} />
          <View style={styles.photoRow}>
            {photos.map((photo, index) => <Image key={index} source={photo} style={styles.photo} />)}
          </View>
        </>
      ) : null}
      <LineBreak height={1.6} />
      <View style={styles.cardButtons}>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('BookService')}
          style={styles.viewButton}
        >
          <AppText style={styles.viewButtonText}>{scheduled ? 'Reschedule' : 'View Details'}</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => !scheduled && navigation.navigate('BookingServiceStep3', {
            bookingDraft: {
              isStaticRebook: true,
              service: { name: title },
              vendorName: vendor,
              cemeteryName: 'Forest Lawn',
              graveNumber: 'Garden of Peace, Section A, Plot 142',
            },
          })}
          style={styles.bookAgainButton}
        >
          <AppText style={styles.bookAgainText}>{scheduled ? 'Delete' : 'Book Again'}</AppText>
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
};

const SummaryRow = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <AppText style={styles.muted}>{label}</AppText>
    <AppText style={styles.summaryValue}>{value}</AppText>
  </View>
);

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  content: {
    marginTop: -responsiveHeight(4.1),
    paddingHorizontal: responsiveWidth(5.8),
    paddingBottom: responsiveHeight(8),
  },
  statRow: {
    flexDirection: 'row',
    gap: responsiveWidth(4),
    zIndex: 2,
    elevation: 2,
  },
  statCard: { flex: 1, backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 12 },
  statTop: { alignItems: 'center', flexDirection: 'row' },
  statIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(6), height: responsiveWidth(6), borderRadius: responsiveWidth(3), backgroundColor: AppColors.white, marginRight: responsiveWidth(2) },
  statLabel: { color: AppColors.white, fontSize: responsiveFontSize(1) },
  statValue: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  primaryButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 30 },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  serviceCard: { marginBottom: responsiveHeight(2.4), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16 },
  serviceTop: { alignItems: 'flex-start', flexDirection: 'row' },
  storeIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(5), backgroundColor: AppColors.white, marginRight: responsiveWidth(3) },
  flex: { flex: 1 },
  serviceTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  vendorLine: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(1), marginTop: responsiveHeight(0.4) },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12) },
  priceBlock: { alignItems: 'flex-end' },
  price: { color: AppColors.white, fontSize: responsiveFontSize(1.32), fontWeight: '700', marginTop: responsiveHeight(0.42) },
  statusPill: { borderRadius: 12, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.35), backgroundColor: AppColors.memorialMutedButton },
  scheduledPill: { backgroundColor: AppColors.onboardingButton },
  statusText: { color: AppColors.white, fontSize: responsiveFontSize(0.9) },
  iconLine: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(2) },
  desc: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), lineHeight: responsiveFontSize(1.7) },
  photoRow: { flexDirection: 'row', gap: responsiveWidth(2) },
  photo: { width: responsiveWidth(18), height: responsiveHeight(7), borderRadius: 10 },
  photosTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.1), fontWeight: '600' },
  cardButtons: { flexDirection: 'row', gap: responsiveWidth(3) },
  viewButton: { alignItems: 'center', backgroundColor: AppColors.onboardingButton, borderRadius: 20, flex: 1, justifyContent: 'center', paddingVertical: responsiveHeight(1.32) },
  viewButtonText: { color: AppColors.white, fontSize: responsiveFontSize(1.12), fontWeight: '700' },
  bookAgainButton: { alignItems: 'center', backgroundColor: '#4F6D95', borderRadius: 20, flex: 1, justifyContent: 'center', paddingVertical: responsiveHeight(1.32) },
  bookAgainText: { color: AppColors.white, fontSize: responsiveFontSize(1.12), fontWeight: '700' },
  summaryCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16 },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(1) },
  summaryValue: { color: AppColors.white, fontSize: responsiveFontSize(1.12), fontWeight: '700' },
});

export default ViewMemorialServiceInfoScreen;
