import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const fallbackJob = ['Grave Site Cleaning', '$75', 'Cemetery Cleaning', 'Memorial Gardens Cemetery', 'Nov 5, 2025 at 9:00 AM', '2 hours ago', '3.2 miles away', 'Sarah Johnson', 'Need thorough cleaning of grave site including headstone washing, weed removal, and general maintenance.'];

const VendorJobDetailsScreen = ({ navigation, route }) => {
  const [processingAction, setProcessingAction] = useState(null);
  const job = route?.params?.job || fallbackJob;
  const [date, time = '9:00 AM'] = job[4].split(' at ');

  const closeToDashboard = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    setTimeout(() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }, 0);
  };

  const handleAcceptJob = async () => {
    setProcessingAction('accept');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProcessingAction(null);
    showToast('Job accepted successfully!');
    closeToDashboard();
  };

  const handleDeclineJob = async () => {
    setProcessingAction('decline');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProcessingAction(null);
    showToast('Job declined');
    closeToDashboard();
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.goBack()} style={styles.backRow}>
          <AppIcon name="arrow-back" color={AppColors.white} size={24} />
          <AppText style={styles.backText}>Job Details</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.flex}>
        <ScreenWrapper
          isScroll
          safeAreaEdges={[]}
          useBackgroundImage={false}
          contentContainerStyle={styles.body}
          style={styles.transparent}
        >
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
          <View style={styles.paymentTop}>
            <AppText style={styles.paymentLabel}>Payment Amount</AppText>
            <AppText style={styles.paymentValue}>{job[1]}</AppText>
          </View>
          <LineBreak height={0.8} />
          <AppText style={styles.paymentHint}>
            Payment will be released upon client approval of completed work
          </AppText>
        </View>
        <LineBreak height={2.4} />
        </ScreenWrapper>
        <View style={styles.actionArea}>
          <AppButton
            disabled={!!processingAction}
            isLoading={processingAction === 'accept'}
            style={styles.acceptButton}
            onPress={handleAcceptJob}
          >
            Accept Job
          </AppButton>
          <LineBreak height={1.2} />
          <TouchableOpacity
            activeOpacity={0.82}
            disabled={!!processingAction}
            onPress={handleDeclineJob}
            style={styles.declineButton}
          >
            {processingAction === 'decline' ? (
              <AppIcon name="hourglass-empty" color={AppColors.white} size={22} />
            ) : (
              <AppText style={styles.declineText}>Decline</AppText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const InfoSection = ({ detail, icon, subtitle, title }) => (
  <View style={styles.infoSection}>
    <View style={styles.infoIcon}><AppIcon name={icon} color={AppColors.white} size={22} /></View>
    <View style={styles.infoCopy}>
      <AppText style={styles.infoTitle}>{title}</AppText>
      <AppText style={styles.infoSubtitle}>{subtitle}</AppText>
      {detail ? <AppText style={styles.infoDetail}>{detail}</AppText> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  transparent: { flex: 1, backgroundColor: 'transparent' },
  header: { padding: responsiveWidth(4), backgroundColor: 'transparent' },
  backRow: { alignItems: 'center', flexDirection: 'row' },
  backText: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700', marginLeft: responsiveWidth(3) },
  body: { padding: responsiveWidth(4), paddingBottom: responsiveHeight(2) },
  titleRow: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  title: { flex: 1, color: AppColors.white, fontSize: responsiveFontSize(2), fontWeight: '700', paddingRight: responsiveWidth(3) },
  priceWrap: { alignItems: 'flex-end' },
  price: { color: AppColors.white, fontSize: responsiveFontSize(2.3), fontWeight: '700' },
  posted: { color: AppColors.white, fontSize: responsiveFontSize(1.05), marginTop: responsiveHeight(0.35) },
  categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(0.55), borderRadius: 16, backgroundColor: '#6C94BA' },
  categoryText: { color: AppColors.white, fontSize: responsiveFontSize(1.05), fontWeight: '700' },
  clientCard: { alignItems: 'center', flexDirection: 'row', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  clientAvatar: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(6), backgroundColor: AppColors.white, marginRight: responsiveWidth(3) },
  clientName: { color: AppColors.white, fontSize: responsiveFontSize(1.5), fontWeight: '700' },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginTop: responsiveHeight(0.3) },
  infoSection: { flexDirection: 'row', marginBottom: responsiveHeight(1.6) },
  infoIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.12)' },
  infoCopy: { flex: 1, marginLeft: responsiveWidth(3) },
  infoTitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15) },
  infoSubtitle: { color: AppColors.white, fontSize: responsiveFontSize(1.4), marginTop: responsiveHeight(0.35) },
  infoDetail: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1), marginTop: responsiveHeight(0.3) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.7), fontWeight: '700' },
  descriptionCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  description: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.3), lineHeight: responsiveHeight(2.25) },
  paymentCard: { padding: responsiveWidth(5), borderRadius: 12, backgroundColor: '#738FB1' },
  paymentTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  paymentLabel: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  paymentValue: { color: AppColors.white, fontSize: responsiveFontSize(2.05), fontWeight: '700' },
  paymentHint: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05), lineHeight: responsiveFontSize(1.55) },
  actionArea: { padding: responsiveWidth(4) },
  declineButton: { alignItems: 'center', justifyContent: 'center', height: responsiveHeight(5.9), borderRadius: 12, backgroundColor: 'transparent' },
  declineText: { color: AppColors.white, fontSize: responsiveFontSize(1.65), fontWeight: '700' },
  acceptButton: { width: '100%', backgroundColor: AppColors.onboardingButton, borderRadius: 12 },
});

export default VendorJobDetailsScreen;
