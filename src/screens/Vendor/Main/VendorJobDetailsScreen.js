import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
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

const fallbackJob = ['Grave Site Cleaning', '$75', 'Cemetery Cleaning', 'Memorial Gardens Cemetery', 'Nov 5, 2025 at 9:00 AM', '2 hours ago', '3.2 miles away', 'Sarah Johnson', 'Need thorough cleaning of grave site including headstone washing, weed removal, and general maintenance.'];

const VendorJobDetailsScreen = ({ navigation, route }) => {
  const job = route?.params?.job || fallbackJob;
  const [date, time = '9:00 AM'] = job[4].split(' at ');

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.backRow}>
          <AppIcon name="arrow-back" color={AppColors.white} size={24} />
          <AppText onPress={() => navigation.goBack()} style={styles.backText}>Job Details</AppText>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <AppText style={styles.title}>{job[0]}</AppText>
          <View style={styles.priceWrap}>
            <AppText style={styles.price}>{job[1]}</AppText>
            <AppText style={styles.posted}>{job[5]}</AppText>
          </View>
        </View>
        <LineBreak height={1.2} />
        <View style={styles.categoryBadge}><AppText style={styles.categoryText}>{job[2]}</AppText></View>
        <LineBreak height={2.4} />
        <GlassCard contentStyle={styles.clientCard}>
          <View style={styles.clientAvatar}><AppIcon name="person" color={AppColors.themeColor} size={24} /></View>
          <View>
            <AppText style={styles.clientName}>{job[7]}</AppText>
            <AppText style={styles.muted}>Client</AppText>
          </View>
        </GlassCard>
        <LineBreak height={2.4} />
        <InfoSection icon="location-on" title="Location" subtitle={job[3]} detail={job[6]} />
        <InfoSection icon="calendar-today" title="Scheduled Date" subtitle={date} />
        <InfoSection icon="access-time" title="Scheduled Time" subtitle={time} />
        <LineBreak height={2} />
        <AppText style={styles.sectionTitle}>Job Description</AppText>
        <LineBreak height={1.1} />
        <GlassCard contentStyle={styles.descriptionCard}>
          <AppText style={styles.description}>{job[8]}</AppText>
        </GlassCard>
        <LineBreak height={2.4} />
        <View style={styles.paymentCard}>
          <AppText style={styles.paymentLabel}>Payment Amount</AppText>
          <AppText style={styles.paymentValue}>{job[1]}</AppText>
        </View>
        <LineBreak height={2.4} />
        <View style={styles.actionRow}>
          <AppButton style={styles.declineButton} onPress={() => navigation.goBack()}>Decline</AppButton>
          <AppButton style={styles.acceptButton} onPress={() => navigation.popToTop()}>Accept Job</AppButton>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const InfoSection = ({ detail, icon, subtitle, title }) => (
  <GlassCard contentStyle={styles.infoSection}>
    <View style={styles.infoIcon}><AppIcon name={icon} color={AppColors.white} size={22} /></View>
    <View style={styles.infoCopy}>
      <AppText style={styles.infoTitle}>{title}</AppText>
      <AppText style={styles.infoSubtitle}>{subtitle}</AppText>
      {detail ? <AppText style={styles.infoDetail}>{detail}</AppText> : null}
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  header: { padding: responsiveWidth(4), backgroundColor: 'rgba(4,47,103,0.5)' },
  backRow: { alignItems: 'center', flexDirection: 'row' },
  backText: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700', marginLeft: responsiveWidth(3) },
  body: { padding: responsiveWidth(4) },
  titleRow: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  title: { flex: 1, color: AppColors.white, fontSize: responsiveFontSize(2), fontWeight: '700', paddingRight: responsiveWidth(3) },
  priceWrap: { alignItems: 'flex-end' },
  price: { color: AppColors.onboardingButton, fontSize: responsiveFontSize(2.3), fontWeight: '700' },
  posted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05), marginTop: responsiveHeight(0.35) },
  categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(0.55), borderRadius: 16, borderWidth: 0.5, borderColor: AppColors.white, backgroundColor: 'rgba(255,255,255,0.12)' },
  categoryText: { color: AppColors.white, fontSize: responsiveFontSize(1.05), fontWeight: '700' },
  clientCard: { alignItems: 'center', flexDirection: 'row', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  clientAvatar: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(6), backgroundColor: AppColors.white, marginRight: responsiveWidth(3) },
  clientName: { color: AppColors.white, fontSize: responsiveFontSize(1.5), fontWeight: '700' },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginTop: responsiveHeight(0.3) },
  infoSection: { flexDirection: 'row', marginBottom: responsiveHeight(1.3), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  infoIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(5), backgroundColor: 'rgba(255,255,255,0.12)' },
  infoCopy: { flex: 1, marginLeft: responsiveWidth(3) },
  infoTitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15) },
  infoSubtitle: { color: AppColors.white, fontSize: responsiveFontSize(1.4), marginTop: responsiveHeight(0.35) },
  infoDetail: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1), marginTop: responsiveHeight(0.3) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.7), fontWeight: '700' },
  descriptionCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  description: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.3), lineHeight: responsiveHeight(2.25) },
  paymentCard: { padding: responsiveWidth(5), borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.16)' },
  paymentLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25) },
  paymentValue: { color: AppColors.white, fontSize: responsiveFontSize(2.3), fontWeight: '700', marginTop: responsiveHeight(0.6) },
  actionRow: { flexDirection: 'row', gap: responsiveWidth(3) },
  declineButton: { flex: 1, backgroundColor: AppColors.memorialMutedButton },
  acceptButton: { flex: 1, backgroundColor: AppColors.onboardingButton },
});

export default VendorJobDetailsScreen;
