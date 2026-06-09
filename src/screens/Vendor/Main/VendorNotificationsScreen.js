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

const notifications = [
  ['assignment', 'New Task Assigned', 'New task assigned: Plot 54, Section C', '5m ago', false],
  ['check-circle-outline', 'Task Approved', 'Client approved your last submission', '2h ago', false],
  ['attach-money', 'Payment Released', 'Payment of $85.00 released', '1 day ago', true],
  ['info-outline', 'System Update', 'System update scheduled for Sunday', '2 days ago', true],
];

const VendorNotificationsScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.content}>
    <View style={styles.header}>
      <View style={styles.backRow}>
        <AppIcon name="arrow-back" color={AppColors.white} size={24} />
        <AppText onPress={() => navigation.goBack()} style={styles.backText}>Back</AppText>
      </View>
      <LineBreak height={1.4} />
      <AppText style={styles.title}>Notifications</AppText>
    </View>
    <View style={styles.body}>
      {notifications.map(item => <NotificationCard key={item[1]} item={item} />)}
    </View>
  </ScreenWrapper>
);

const NotificationCard = ({ item }) => (
  <GlassCard contentStyle={[styles.card, item[4] && styles.readCard]}>
    <View style={[styles.iconCircle, item[4] && styles.readIcon]}>
      <AppIcon name={item[0]} color={AppColors.themeColor} size={20} />
    </View>
    <View style={styles.copy}>
      <View style={styles.topRow}>
        <AppText style={[styles.cardTitle, item[4] && styles.readText]}>{item[1]}</AppText>
        <AppText style={styles.time}>{item[3]}</AppText>
      </View>
      <AppText style={[styles.message, item[4] && styles.readText]}>{item[2]}</AppText>
    </View>
    {!item[4] ? <View style={styles.dot} /> : null}
  </GlassCard>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  header: { padding: responsiveWidth(4), backgroundColor: 'rgba(4,47,103,0.5)' },
  backRow: { alignItems: 'center', flexDirection: 'row' },
  backText: { color: AppColors.white, fontSize: responsiveFontSize(1.3), marginLeft: responsiveWidth(3) },
  title: { color: AppColors.white, fontSize: responsiveFontSize(2.4), fontWeight: '700' },
  body: { padding: responsiveWidth(4) },
  card: { alignItems: 'flex-start', flexDirection: 'row', marginBottom: responsiveHeight(1.2), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  readCard: { opacity: 0.74 },
  iconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(5), backgroundColor: AppColors.white },
  readIcon: { opacity: 0.72 },
  copy: { flex: 1, marginLeft: responsiveWidth(3) },
  topRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  cardTitle: { flex: 1, color: AppColors.white, fontSize: responsiveFontSize(1.4), fontWeight: '700' },
  time: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.02), marginLeft: responsiveWidth(2) },
  message: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2), marginTop: responsiveHeight(0.4) },
  readText: { color: AppColors.homeTextMuted },
  dot: { width: 8, height: 8, borderRadius: 4, marginLeft: responsiveWidth(2), backgroundColor: AppColors.onboardingButton },
});

export default VendorNotificationsScreen;
