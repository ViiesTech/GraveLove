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

const timeline = [
  ['Booking Confirmed', 'Oct 28, 9:00 AM', true],
  ['Vendor Assigned', 'Oct 28, 9:15 AM', true],
  ['Service In Progress', 'Started: 10:05 AM', true],
  ['Service Completed', 'Estimated: 11:30 AM', false],
];

const ViewBookingDetailsScreen = ({ navigation, route }) => {
  const isCompleted = route?.params?.isCompleted || false;

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title={isCompleted ? 'Service Completed' : 'Service Progress'}
        subtitle={isCompleted ? 'Oct 25, 2025 at 12:30 PM' : 'Track your service in real-time'}
      />
      <View style={styles.content}>
        {isCompleted ? <CompletedCard /> : <ProgressCard />}
        <LineBreak height={2.4} />
        {isCompleted ? <BeforeAfterSection /> : <TimelineSection />}
        <LineBreak height={2.4} />
        {isCompleted ? <VendorNoteCard /> : <VendorInfoCard />}
        <LineBreak height={2.4} />
        <LocationCard isCompleted={isCompleted} />
        <LineBreak height={3} />
        {isCompleted ? (
          <>
            <AppButton
              style={styles.primaryButton}
              onPress={() => navigation.navigate('FeedbackToVendor')}
            >
              Thank Vendor & Give Feedback
            </AppButton>
            <LineBreak height={1.4} />
            <AppButton style={styles.outlineButton} onPress={() => navigation.navigate('BookService')}>
              Book Again
            </AppButton>
          </>
        ) : (
          <SupportCard />
        )}
      </View>
    </ScreenWrapper>
  );
};

const ProgressCard = () => (
  <GlassCard contentStyle={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.statusPill}>
        <AppIcon name="sync" color={AppColors.white} size={14} />
        <AppText style={styles.statusText}>In Progress</AppText>
      </View>
      <AppText style={styles.miniText}>Service ID: #MC912</AppText>
    </View>
    <LineBreak height={2.4} />
    <AppText style={styles.cardTitle}>Grave Cleaning</AppText>
    <LineBreak height={1.6} />
    <DetailLine icon="location-on" text="Green Meadows Cemetery" />
    <DetailLine icon="access-time" text="Oct 28, 2025 at 10:00 AM" />
    <DetailLine icon="push-pin" text="Plot C, Grave #45" />
    <LineBreak height={2.2} />
    <View style={styles.innerPanel}>
      <AppText style={styles.muted}>Estimated Completion</AppText>
      <AppText style={styles.cardTitleSmall}>11:30 AM</AppText>
    </View>
  </GlassCard>
);

const CompletedCard = () => (
  <GlassCard contentStyle={styles.card}>
    <AppText style={styles.cardTitle}>Service Details</AppText>
    <LineBreak height={2.2} />
    <DetailRow label="Service" value="Grave Cleaning" />
    <DetailRow label="Vendor" value="Garden Care Services" />
    <DetailRow label="Location" value={'Green Meadows Cemetery\nPlot C, Grave #45'} />
    <DetailRow label="Scheduled" value="Oct 25, 2025 at 11:00 AM" />
    <View style={styles.divider} />
    <View style={styles.totalRow}>
      <AppText style={styles.cardTitleSmall}>Total Paid</AppText>
      <AppText style={styles.cardTitleSmall}>$45.00</AppText>
    </View>
  </GlassCard>
);

const TimelineSection = () => (
  <GlassCard contentStyle={styles.card}>
    <AppText style={styles.cardTitle}>Service Timeline</AppText>
    <LineBreak height={2.2} />
    {timeline.map(([title, time, done], index) => (
      <View key={title} style={styles.timelineRow}>
        <View style={styles.timelineMarkWrap}>
          <View style={[styles.timelineMark, done && styles.timelineMarkDone]}>
            {done ? <AppIcon name="check" color={AppColors.themeColor} size={13} /> : null}
          </View>
          {index < timeline.length - 1 ? <View style={styles.timelineLine} /> : null}
        </View>
        <View style={styles.timelineCopy}>
          <AppText style={styles.timelineTitle}>{title}</AppText>
          <AppText style={styles.miniText}>{time}</AppText>
        </View>
      </View>
    ))}
  </GlassCard>
);

const BeforeAfterSection = () => (
  <View>
    <View style={styles.sectionRow}>
      <AppText style={styles.cardTitle}>Before & After Photos</AppText>
      <AppText style={styles.muted}>Download</AppText>
    </View>
    <LineBreak height={1.4} />
    <View style={styles.photoRow}>
      <PhotoBox label="Before" image={AppAssets.images.vendor1} />
      <PhotoBox label="After" image={AppAssets.images.vendor4} after />
    </View>
  </View>
);

const VendorInfoCard = () => (
  <GlassCard contentStyle={styles.card}>
    <View style={styles.cardHeader}>
      <AppText style={styles.muted}>Assigned Vendor</AppText>
      <View style={styles.statusPill}><AppIcon name="star" color={AppColors.starYellow} size={12} /><AppText style={styles.statusText}>4.9</AppText></View>
    </View>
    <LineBreak height={1.6} />
    <View style={styles.vendorRow}>
      <View style={styles.avatar} />
      <View style={styles.flex}>
        <AppText style={styles.cardTitle}>John Smith</AppText>
        <AppText style={styles.miniText}>Professional Memorial Caretaker</AppText>
      </View>
    </View>
    <LineBreak height={2.1} />
    <View style={styles.actionRow}>
      <AppButton style={styles.primaryButton}>Chat</AppButton>
      <AppButton style={styles.outlineButton}>Call</AppButton>
    </View>
  </GlassCard>
);

const VendorNoteCard = () => (
  <GlassCard contentStyle={styles.card}>
    <View style={styles.inlineTitle}>
      <AppIcon name="chat-bubble-outline" color={AppColors.white} size={18} />
      <AppText style={styles.cardTitle}>Vendor's Note</AppText>
    </View>
    <LineBreak height={1.6} />
    <AppText style={styles.bodyText}>
      Service completed successfully. The gravestone has been thoroughly cleaned and fresh flowers have been placed. The surrounding area has been tidied up as well.
    </AppText>
  </GlassCard>
);

const LocationCard = ({ isCompleted }) => (
  <GlassCard contentStyle={styles.locationCard}>
    <AppIcon name="location-on" color={AppColors.white} size={40} />
    <LineBreak height={1.1} />
    <AppText style={styles.cardTitle}>{isCompleted ? 'Location' : 'Live Location Tracking'}</AppText>
    <AppText style={styles.mutedCenter}>{isCompleted ? 'Green Meadows Cemetery\nPlot C, Grave #45' : 'Vendor is at the cemetery'}</AppText>
  </GlassCard>
);

const SupportCard = () => (
  <GlassCard contentStyle={styles.supportCard}>
    <AppIcon name="chat-bubble-outline" color={AppColors.homeTextMuted} size={24} />
    <View style={styles.flex}>
      <AppText style={styles.cardTitleSmall}>Need Help?</AppText>
      <AppText style={styles.muted}>Contact Support →</AppText>
    </View>
  </GlassCard>
);

const DetailLine = ({ icon, text }) => (
  <View style={styles.detailLine}>
    <AppIcon name={icon} color={AppColors.homeTextMuted} size={16} />
    <AppText style={styles.bodyText}>{text}</AppText>
  </View>
);

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <AppText style={styles.muted}>{label}</AppText>
    <AppText style={styles.detailValue}>{value}</AppText>
  </View>
);

const PhotoBox = ({ after = false, image, label }) => (
  <View style={styles.photoColumn}>
    <View style={styles.photoBadge}><AppText style={styles.photoBadgeText}>{label}</AppText></View>
    <LineBreak height={0.8} />
    <Image source={image} style={[styles.photo, after && styles.photoAfter]} />
  </View>
);

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(8) },
  card: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 20 },
  cardHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  statusPill: { alignItems: 'center', flexDirection: 'row', paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.45), borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.12)' },
  statusText: { color: AppColors.white, fontSize: responsiveFontSize(1), marginLeft: responsiveWidth(1) },
  miniText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12) },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25) },
  mutedCenter: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginTop: responsiveHeight(0.5), textAlign: 'center' },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.65), fontWeight: '700' },
  cardTitleSmall: { color: AppColors.white, fontSize: responsiveFontSize(1.42), fontWeight: '700' },
  bodyText: { color: AppColors.homeTextMuted, flex: 1, fontSize: responsiveFontSize(1.28), lineHeight: responsiveFontSize(1.9), marginLeft: responsiveWidth(2) },
  innerPanel: { padding: responsiveWidth(4), borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)' },
  detailLine: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(0.9) },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(1.1) },
  detailValue: { color: AppColors.homeTextMuted, flex: 1, fontSize: responsiveFontSize(1.25), textAlign: 'right' },
  divider: { height: 0.5, backgroundColor: AppColors.homeBorder, marginVertical: responsiveHeight(1.2) },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  timelineRow: { flexDirection: 'row' },
  timelineMarkWrap: { alignItems: 'center' },
  timelineMark: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(6), height: responsiveWidth(6), borderRadius: responsiveWidth(3), borderWidth: 1, borderColor: AppColors.white },
  timelineMarkDone: { backgroundColor: AppColors.white },
  timelineLine: { flex: 1, width: 2, minHeight: responsiveHeight(3), backgroundColor: AppColors.homeBorder },
  timelineCopy: { flex: 1, paddingBottom: responsiveHeight(2), marginLeft: responsiveWidth(4) },
  timelineTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.32), fontWeight: '700' },
  sectionRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  photoRow: { flexDirection: 'row', gap: responsiveWidth(4) },
  photoColumn: { flex: 1 },
  photoBadge: { alignSelf: 'flex-start', borderRadius: 12, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.35), backgroundColor: 'rgba(255,255,255,0.12)' },
  photoBadgeText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  photo: { width: '100%', height: responsiveHeight(12.5), borderRadius: 16, borderWidth: 0.5, borderColor: AppColors.homeBorder },
  photoAfter: { borderColor: AppColors.white },
  vendorRow: { alignItems: 'center', flexDirection: 'row' },
  avatar: { width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(6), backgroundColor: AppColors.white },
  flex: { flex: 1, marginLeft: responsiveWidth(3.5) },
  actionRow: { flexDirection: 'row', gap: responsiveWidth(3) },
  primaryButton: { flex: 1, backgroundColor: AppColors.onboardingButton, borderRadius: 30 },
  outlineButton: { flex: 1, backgroundColor: 'transparent', borderColor: AppColors.homeBorder, borderWidth: 1, borderRadius: 30 },
  inlineTitle: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(2) },
  locationCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 20, paddingVertical: responsiveHeight(3) },
  supportCard: { alignItems: 'center', flexDirection: 'row', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 20 },
});

export default ViewBookingDetailsScreen;
