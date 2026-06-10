import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
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

const record = {
  bookingId: 'BK-2025-001',
  completedDate: 'Oct 25, 2025 at 11:00 AM',
  customer: 'Sarah Thompson',
  location: 'Forest Lawn Memorial Park - Garden of Peace, Section A',
  price: '$45.00',
  relation: 'Robert James Thompson (Father)',
  service: 'Grave Cleaning',
  status: 'In Progress',
  summary:
    'Completed thorough cleaning of headstone and surrounding area. Stone inscription is now clearly visible. Fresh flowers have been placed as requested.',
  vendor: {
    company: 'Professional Memorial ...',
    image: AppAssets.images.vendor1,
    name: 'John Smith',
    rating: '4.9',
  },
};

const VendorServiceRecordsScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
    <AppImageHeader
      image={AppAssets.images.vendorHeader}
      onBack={() => navigation.goBack()}
      title="Service Record"
      subtitle="View completed services and payment status"
    />
    <View style={styles.content}>
      <GlassCard contentStyle={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.flex}>
            <AppText style={styles.title}>{record.service}</AppText>
            <AppText style={styles.muted}>Booking ID: {record.bookingId}</AppText>
          </View>
          <View style={styles.priceBlock}>
            <View style={styles.statusPill}><AppText style={styles.statusText}>{record.status}</AppText></View>
            <AppText style={styles.price}>{record.price}</AppText>
            <AppText style={styles.mutedTiny}>Service Fee</AppText>
          </View>
        </View>

        <LineBreak height={2.3} />
        <InfoRow label="Customer" value={record.customer} />
        <LineBreak height={0.8} />
        <View style={styles.relationBadge}><AppText style={styles.relationText}>{record.relation}</AppText></View>
        <LineBreak height={1.4} />
        <IconLine icon="location-on" text={record.location} />
        <IconLine icon="calendar-today" text={`Completed: ${record.completedDate}`} />

        <LineBreak height={2.2} />
        <View style={styles.summaryBox}>
          <AppText style={styles.summaryText}>
            <AppText style={styles.summaryBold}>Service Summary: </AppText>
            {record.summary}
          </AppText>
        </View>

        <LineBreak height={2.3} />
        <View style={styles.vendorBox}>
          <View style={styles.topRow}>
            <AppText style={styles.cardTitle}>Assigned Vendor</AppText>
            <View style={styles.ratingPill}>
              <AppIcon name="star" color={AppColors.starYellow} size={12} />
              <AppText style={styles.statusText}>{record.vendor.rating}</AppText>
            </View>
          </View>
          <LineBreak height={1.5} />
          <View style={styles.vendorRow}>
            <Image source={record.vendor.image} style={styles.avatar} />
            <View style={styles.flex}>
              <AppText style={styles.vendorName}>{record.vendor.name}</AppText>
              <AppText style={styles.muted}>{record.vendor.company}</AppText>
            </View>
          </View>
          <LineBreak height={1.6} />
          <AppButton
            style={styles.smallPrimary}
            onPress={() => navigation.navigate('VendorPersonalChat', {
              clientName: 'James Anderson',
              service: 'Grave Cleaning - Plot 54',
            })}
          >
            Chat
          </AppButton>
        </View>

        <LineBreak height={2.3} />
        <View style={styles.inlineTitle}>
          <AppIcon name="photo-camera" color={AppColors.white} size={18} />
          <AppText style={styles.cardTitle}>Service Photos</AppText>
        </View>
        <LineBreak height={0.8} />
        <View style={styles.photoLabels}>
          <AppText style={styles.mutedTiny}>Before (1)</AppText>
          <AppText style={styles.mutedTiny}>After (1)</AppText>
        </View>
        <LineBreak height={0.8} />
        <View style={styles.photoRow}>
          <PhotoItem label="Before" image={AppAssets.images.vendor1} />
          <PhotoItem label="After" image={AppAssets.images.headerImage} after />
        </View>
      </GlassCard>
      <LineBreak height={2} />
      <AppButton
        style={styles.paymentButton}
        onPress={() => navigation.navigate('ServicePayment')}
      >
        Send Payment
      </AppButton>
    </View>
  </ScreenWrapper>
);

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <AppText style={styles.muted}>{label}</AppText>
    <AppText style={styles.value}>{value}</AppText>
  </View>
);

const IconLine = ({ icon, text }) => (
  <View style={styles.iconLine}>
    <AppIcon name={icon} color={AppColors.homeTextMuted} size={16} />
    <AppText style={styles.iconText}>{text}</AppText>
  </View>
);

const PhotoItem = ({ after = false, image, label }) => (
  <View style={[styles.photoItem, after && styles.photoAfter]}>
    <Image source={image} style={styles.photoImage} />
    <View style={[styles.photoBadge, after && styles.photoBadgeAfter]}>
      <AppText style={[styles.photoBadgeText, after && styles.photoBadgeAfterText]}>{label}</AppText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(8) },
  card: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 24, padding: responsiveWidth(5) },
  topRow: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  flex: { flex: 1 },
  title: { color: AppColors.white, fontSize: responsiveFontSize(1.95), fontWeight: '700' },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '600' },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18) },
  mutedTiny: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  priceBlock: { alignItems: 'flex-end', marginLeft: responsiveWidth(3) },
  statusPill: { borderRadius: 8, paddingHorizontal: responsiveWidth(2.4), paddingVertical: responsiveHeight(0.45), backgroundColor: 'rgba(255,255,255,0.12)' },
  statusText: { color: AppColors.white, fontSize: responsiveFontSize(1), fontWeight: '600' },
  price: { color: AppColors.white, fontSize: responsiveFontSize(1.72), fontWeight: '700', marginTop: responsiveHeight(0.8) },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  value: { color: AppColors.white, fontSize: responsiveFontSize(1.26), fontWeight: '600' },
  relationBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.4), backgroundColor: AppColors.memorialMutedButton },
  relationText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  iconLine: { alignItems: 'flex-start', flexDirection: 'row', marginBottom: responsiveHeight(1) },
  iconText: { color: AppColors.homeTextMuted, flex: 1, fontSize: responsiveFontSize(1.2), lineHeight: responsiveFontSize(1.75), marginLeft: responsiveWidth(2) },
  summaryBox: { padding: responsiveWidth(4), borderRadius: 16, backgroundColor: AppColors.memorialMutedButton },
  summaryText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2), lineHeight: responsiveFontSize(1.85) },
  summaryBold: { color: AppColors.white, fontWeight: '700' },
  vendorBox: { padding: responsiveWidth(4), borderRadius: 16, borderWidth: 0.5, borderColor: AppColors.homeBorder, backgroundColor: 'rgba(0,0,0,0.1)' },
  ratingPill: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(1), borderRadius: 8, paddingHorizontal: responsiveWidth(2.4), paddingVertical: responsiveHeight(0.45), backgroundColor: AppColors.memorialMutedButton },
  vendorRow: { alignItems: 'center', flexDirection: 'row' },
  avatar: { width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(6), marginRight: responsiveWidth(4) },
  vendorName: { color: AppColors.white, fontSize: responsiveFontSize(1.42), fontWeight: '600' },
  smallPrimary: { height: responsiveHeight(4.8), borderRadius: 12, backgroundColor: AppColors.onboardingButton },
  inlineTitle: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(2) },
  photoLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  photoRow: { flexDirection: 'row', gap: responsiveWidth(3) },
  photoItem: { flex: 1, height: responsiveHeight(11), borderRadius: 16, overflow: 'hidden', borderWidth: 0.5, borderColor: AppColors.homeBorder },
  photoAfter: { borderColor: AppColors.white },
  photoImage: { width: '100%', height: '100%' },
  photoBadge: { position: 'absolute', left: responsiveWidth(2), bottom: responsiveHeight(0.8), borderRadius: 20, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.25), backgroundColor: AppColors.memorialCard },
  photoBadgeAfter: { backgroundColor: AppColors.white },
  photoBadgeText: { color: AppColors.white, fontSize: responsiveFontSize(1), fontWeight: '700' },
  photoBadgeAfterText: { color: AppColors.themeColor },
  paymentButton: { backgroundColor: AppColors.memorialMutedButton, borderRadius: 30 },
});

export default VendorServiceRecordsScreen;
