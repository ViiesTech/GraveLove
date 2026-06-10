import React, { useState } from 'react';
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

const pendingJobs = [
  {
    bookingId: 'BK-2025-001',
    completedDate: 'Oct 25, 2025 at 11:00 AM',
    customer: 'Sarah Thompson',
    location: 'Forest Lawn Memorial Park - Garden of Peace, Section A',
    price: '$45.00',
    relation: 'Robert James Thompson (Father)',
    service: 'Grave Cleaning',
    summary: 'Completed thorough cleaning of headstone and surrounding area. Stone inscription is now clearly visible. Fresh flowers have been placed as requested.',
  },
  {
    bookingId: 'BK-2025-002',
    completedDate: 'Oct 24, 2025 at 2:00 PM',
    customer: 'Michael Chen',
    location: 'Peaceful Gardens Cemetery - Rose Section, Block B',
    price: '$35.00',
    relation: 'Elizabeth Chen (Mother)',
    service: 'Flower Placement',
    summary: 'Placed fresh rose bouquet arrangement. Removed old wilted flowers. Cleaned vase and surrounding area.',
  },
];

const paidJobs = [
  {
    bookingId: 'BK-2025-000',
    completedDate: 'Oct 10, 2025 at 10:00 AM',
    customer: 'Sarah Thompson',
    location: 'Forest Lawn Memorial Park',
    price: '$60.00',
    relation: 'Robert James Thompson (Father)',
    service: 'Grave Maintenance',
    summary: 'Regular maintenance completed.',
  },
];

const PaymentStatusScreen = ({ navigation }) => {
  const [tab, setTab] = useState('pending');
  const isPending = tab === 'pending';
  const jobs = isPending ? pendingJobs : paidJobs;

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.vendorHeader}
        onBack={() => navigation.goBack()}
        title="Payment status"
        subtitle="View completed services and payment status"
        style={styles.header}
      />
      <View style={styles.headerExtra}>
        <View style={styles.statsRow}>
          <StatCard count={pendingJobs.length} icon="access-time" label="Pending" />
          <StatCard count={paidJobs.length} icon="check-circle-outline" label="Paid" />
        </View>
        <LineBreak height={1.6} />
        <View style={styles.tabBar}>
          <TabButton active={isPending} label={`Pending Payment (${pendingJobs.length})`} onPress={() => setTab('pending')} />
          <TabButton active={!isPending} label={`Paid (${paidJobs.length})`} onPress={() => setTab('paid')} />
        </View>
      </View>
      <View style={styles.content}>
        {jobs.map(job => (
          <JobCard
            isPending={isPending}
            job={job}
            key={job.bookingId}
            onAction={() => navigation.navigate(isPending ? 'ServicePayment' : 'VendorFeedback')}
            onBookAgain={() => navigation.navigate('UserVendors')}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

const StatCard = ({ count, icon, label }) => (
  <GlassCard contentStyle={styles.statCard}>
    <View style={styles.statIcon}><AppIcon name={icon} color={AppColors.themeColor} size={16} /></View>
    <View>
      <AppText style={styles.statCount}>{count}</AppText>
      <AppText style={styles.statLabel}>{label}</AppText>
    </View>
  </GlassCard>
);

const TabButton = ({ active, label, onPress }) => (
  <TouchableOpacity activeOpacity={0.78} onPress={onPress} style={[styles.tabButton, active && styles.tabActive]}>
    <AppText style={[styles.tabText, active && styles.tabTextActive]}>{label}</AppText>
  </TouchableOpacity>
);

const JobCard = ({ isPending, job, onAction, onBookAgain }) => (
  <GlassCard contentStyle={styles.jobCard}>
    <View style={styles.jobTop}>
      <View style={styles.flex}>
        <AppText style={styles.jobTitle}>{job.service}</AppText>
        <AppText style={styles.muted}>Booking ID: {job.bookingId}</AppText>
      </View>
      <View style={styles.priceBlock}>
        <View style={styles.statusPill}>
          <AppIcon name={isPending ? 'access-time' : 'check-circle-outline'} color={AppColors.white} size={10} />
          <AppText style={styles.statusText}>{isPending ? 'Payment Pending' : 'Paid'}</AppText>
        </View>
        <AppText style={styles.price}>{job.price}</AppText>
        <AppText style={styles.mutedTiny}>Service Fee</AppText>
      </View>
    </View>
    <LineBreak height={1.8} />
    <View style={styles.rowBetween}>
      <AppText style={styles.muted}>Customer</AppText>
      <AppText style={styles.value}>{job.customer}</AppText>
    </View>
    <LineBreak height={0.8} />
    <View style={styles.relationBadge}><AppText style={styles.relationText}>{job.relation}</AppText></View>
    <LineBreak height={1.2} />
    <IconLine icon="location-on" text={job.location} />
    <IconLine icon="calendar-today" text={`Completed: ${job.completedDate}`} />
    <LineBreak height={1.8} />
    <View style={styles.summaryBox}>
      <AppText style={styles.summaryText}>
        <AppText style={styles.summaryBold}>Service Summary: </AppText>
        {job.summary}
      </AppText>
    </View>
    <LineBreak height={1.8} />
    <View style={styles.inlineTitle}>
      <AppIcon name="photo-camera" color={AppColors.white} size={16} />
      <AppText style={styles.cardTitleSmall}>Service Photos</AppText>
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
    {!isPending ? (
      <>
        <LineBreak height={2} />
        <View style={styles.paidBox}>
          <View style={styles.inlineTitle}>
            <AppIcon name="check-circle-outline" color={AppColors.white} size={20} />
            <AppText style={styles.cardTitleSmall}>Paid on Oct 21, 2025</AppText>
          </View>
          <AppText style={styles.muted}>Payment released to your account</AppText>
        </View>
      </>
    ) : null}
    <LineBreak height={2.2} />
    <AppButton style={styles.primaryButton} onPress={onAction}>
      {isPending ? 'Send Payment' : 'Thank Vendor & Give Feedback'}
    </AppButton>
    {!isPending ? (
      <>
        <LineBreak height={1.2} />
        <AppButton style={styles.outlineButton} onPress={onBookAgain}>Book Again</AppButton>
      </>
    ) : null}
  </GlassCard>
);

const IconLine = ({ icon, text }) => (
  <View style={styles.iconLine}>
    <AppIcon name={icon} color={AppColors.homeTextMuted} size={14} />
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
  header: { height: responsiveHeight(19) },
  headerExtra: { paddingHorizontal: responsiveWidth(5.8), paddingBottom: responsiveHeight(1.8), backgroundColor: 'rgba(4,47,103,0.4)' },
  statsRow: { flexDirection: 'row', gap: responsiveWidth(4) },
  statCard: { flex: 1, alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.08)', borderColor: AppColors.homeBorder, padding: responsiveWidth(3) },
  statIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(7), height: responsiveWidth(7), borderRadius: responsiveWidth(3.5), backgroundColor: AppColors.white, marginRight: responsiveWidth(3) },
  statCount: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  statLabel: { color: AppColors.white, fontSize: responsiveFontSize(1) },
  tabBar: { flexDirection: 'row', height: responsiveHeight(4.6), borderRadius: 22, backgroundColor: AppColors.memorialMutedButton, padding: 3 },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 20 },
  tabActive: { backgroundColor: AppColors.white },
  tabText: { color: AppColors.white, fontSize: responsiveFontSize(1.03), fontWeight: '700' },
  tabTextActive: { color: AppColors.themeColor },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(8) },
  jobCard: { marginBottom: responsiveHeight(2.4), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 24, padding: responsiveWidth(5) },
  jobTop: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  flex: { flex: 1 },
  jobTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18) },
  mutedTiny: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  priceBlock: { alignItems: 'flex-end', marginLeft: responsiveWidth(3) },
  statusPill: { alignItems: 'center', flexDirection: 'row', borderRadius: 8, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.4), backgroundColor: 'rgba(255,255,255,0.12)' },
  statusText: { color: AppColors.white, fontSize: responsiveFontSize(0.9), marginLeft: responsiveWidth(1) },
  price: { color: AppColors.white, fontSize: responsiveFontSize(1.72), fontWeight: '700', marginTop: responsiveHeight(0.8) },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between' },
  value: { color: AppColors.white, fontSize: responsiveFontSize(1.22), fontWeight: '600' },
  relationBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.4), backgroundColor: AppColors.memorialMutedButton },
  relationText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  iconLine: { alignItems: 'flex-start', flexDirection: 'row', marginBottom: responsiveHeight(0.8) },
  iconText: { color: AppColors.homeTextMuted, flex: 1, fontSize: responsiveFontSize(1.12), marginLeft: responsiveWidth(2), lineHeight: responsiveFontSize(1.65) },
  summaryBox: { padding: responsiveWidth(3), borderRadius: 12, backgroundColor: AppColors.memorialMutedButton },
  summaryText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12), lineHeight: responsiveFontSize(1.7) },
  summaryBold: { color: AppColors.white, fontWeight: '700' },
  inlineTitle: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(2) },
  cardTitleSmall: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  photoLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  photoRow: { flexDirection: 'row', gap: responsiveWidth(3) },
  photoItem: { flex: 1, height: responsiveHeight(11), borderRadius: 16, overflow: 'hidden', borderWidth: 0.5, borderColor: AppColors.homeBorder },
  photoAfter: { borderColor: AppColors.white },
  photoImage: { width: '100%', height: '100%' },
  photoBadge: { position: 'absolute', left: responsiveWidth(2), bottom: responsiveHeight(0.8), borderRadius: 20, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.25), backgroundColor: AppColors.memorialCard },
  photoBadgeAfter: { backgroundColor: AppColors.white },
  photoBadgeText: { color: AppColors.white, fontSize: responsiveFontSize(0.95), fontWeight: '700' },
  photoBadgeAfterText: { color: AppColors.themeColor },
  paidBox: { padding: responsiveWidth(4), borderRadius: 20, borderWidth: 0.5, borderColor: AppColors.homeBorder },
  primaryButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 30 },
  outlineButton: { backgroundColor: 'transparent', borderColor: AppColors.homeBorder, borderWidth: 1, borderRadius: 30 },
});

export default PaymentStatusScreen;
