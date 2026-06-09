import React from 'react';
import { StyleSheet, View } from 'react-native';
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

const jobs = [
  ['Grave Site Cleaning', '$75', 'Cemetery Cleaning', 'Memorial Gardens Cemetery', 'Nov 5, 2025 at 9:00 AM', '2 hours ago', '3.2 miles away', 'Sarah Johnson', 'Need thorough cleaning of grave site including headstone washing, weed removal, and general maintenance.'],
  ['Flower Arrangement & Decoration', '$120', 'Florist Services', 'Peaceful Rest Cemetery', 'Nov 6, 2025 at 2:00 PM', '5 hours ago', '5.8 miles away', 'Michael Chen', 'Looking for fresh flower arrangement and decoration service for memorial visit.'],
  ['Headstone Repair & Maintenance', '$200', 'Maintenance & Repair', 'Green Valley Memorial Park', 'Nov 8, 2025 at 10:00 AM', '1 day ago', '7.5 miles away', 'Emily Davis', 'Headstone needs repair and cleaning. Some cracks need to be filled.'],
];

const VendorAvailableJobsScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.content}>
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <AppIcon name="arrow-back" color={AppColors.white} size={24} style={styles.backIcon} />
        <View>
          <AppText style={styles.headerTitle}>Available Jobs</AppText>
          <AppText style={styles.headerSub}>3 jobs near you</AppText>
        </View>
      </View>
    </View>
    <View style={styles.body}>
      <View style={styles.infoBanner}>
        <AppText style={styles.infoBannerText}>
          Jobs are posted by clients from their app and matched with your services and location
        </AppText>
      </View>
      {jobs.map(job => (
        <JobCard
          key={job[0]}
          job={job}
          onPress={() => navigation.navigate('VendorJobDetails', { job })}
        />
      ))}
    </View>
  </ScreenWrapper>
);

const JobCard = ({ job, onPress }) => (
  <GlassCard onPress={onPress} contentStyle={styles.jobCard}>
    <View style={styles.jobTop}>
      <AppText style={styles.jobTitle}>{job[0]}</AppText>
      <AppText style={styles.price}>{job[1]}</AppText>
    </View>
    <LineBreak height={0.85} />
    <View style={styles.categoryBadge}><AppText style={styles.categoryText}>{job[2]}</AppText></View>
    <LineBreak height={1.2} />
    <InfoLine icon="location-on" text={job[3]} />
    <InfoLine icon="calendar-today" text={job[4]} />
    <LineBreak height={1.4} />
    <View style={styles.footerRow}>
      <AppText style={styles.caption}>{job[5]}</AppText>
      <AppText style={styles.caption}>{job[6]}</AppText>
    </View>
  </GlassCard>
);

const InfoLine = ({ icon, text }) => (
  <View style={styles.infoLine}>
    <AppIcon name={icon} color={AppColors.homeTextMuted} size={16} />
    <AppText numberOfLines={1} style={styles.infoText}>{text}</AppText>
  </View>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  header: { padding: responsiveWidth(4), backgroundColor: 'rgba(4,47,103,0.5)' },
  headerRow: { alignItems: 'center', flexDirection: 'row' },
  backIcon: { marginRight: responsiveWidth(3) },
  headerTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.8), fontWeight: '700' },
  headerSub: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1), marginTop: responsiveHeight(0.25) },
  body: { padding: responsiveWidth(4) },
  infoBanner: { padding: responsiveWidth(4), marginBottom: responsiveHeight(1.6), borderRadius: 12, backgroundColor: AppColors.onboardingButton },
  infoBannerText: { color: AppColors.white, fontSize: responsiveFontSize(1.25), lineHeight: responsiveHeight(2) },
  jobCard: { marginBottom: responsiveHeight(1.5), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  jobTop: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  jobTitle: { flex: 1, color: AppColors.white, fontSize: responsiveFontSize(1.65), fontWeight: '700', paddingRight: responsiveWidth(3) },
  price: { color: AppColors.onboardingButton, fontSize: responsiveFontSize(1.8), fontWeight: '700' },
  categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(0.55), borderRadius: 16, borderWidth: 0.5, borderColor: AppColors.white, backgroundColor: 'rgba(255,255,255,0.12)' },
  categoryText: { color: AppColors.white, fontSize: responsiveFontSize(1.05), fontWeight: '700' },
  infoLine: { alignItems: 'center', flexDirection: 'row', marginTop: responsiveHeight(0.65) },
  infoText: { flex: 1, color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18), marginLeft: responsiveWidth(1.2) },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between' },
  caption: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05) },
});

export default VendorAvailableJobsScreen;
