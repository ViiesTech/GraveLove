import React, { useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
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

const notifications = [
  {
    badge: 'Robert James Thompson (Father)',
    body: 'Love never fades — it transforms into eternal memory...',
    icon: 'favorite-border',
    read: false,
    time: 'Today, 8:00 AM',
    title: 'Daily Inspiration',
  },
  {
    badge: 'Robert James Thompson (Father)',
    body: 'Your flower placement service is scheduled for tomorrow.',
    icon: 'calendar-today',
    read: false,
    time: 'Yesterday, 3:30 PM',
    title: 'Upcoming Service',
  },
  {
    badge: 'Margaret Anne Thompson (Mother)',
    body: 'Garden Care Services has completed your grave cleaning.',
    icon: 'local-florist',
    read: true,
    time: '2 days ago',
    title: 'Service Completed',
  },
];

const preferences = [
  ['Daily Inspiration', 'Receive uplifting quotes each morning'],
  ['Visit Reminders', 'Gentle prompts for memorial visits'],
  ['Service Updates', 'Notifications about scheduled services'],
  ['Memorial Activity', 'Updates from memorial wall posts'],
];

const UserAlertsScreen = ({ navigation }) => {
  const [enabled, setEnabled] = useState({
    'Daily Inspiration': true,
    'Memorial Activity': false,
    'Service Updates': true,
    'Visit Reminders': true,
  });

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Notifications"
        subtitle="2 unread • Stay connected and informed"
      />
      <View style={styles.content}>
        <TouchableOpacity activeOpacity={0.82} style={styles.markAll}>
          <AppText style={styles.markAllText}>Mark all as read</AppText>
        </TouchableOpacity>
        <LineBreak height={1.72} />
        {notifications.map(item => (
          <NotificationCard key={item.title} item={item} />
        ))}
        <LineBreak height={2.58} />
        <AppText style={styles.sectionTitle}>Notification Preferences</AppText>
        <LineBreak height={1.72} />
        <GlassCard contentStyle={styles.prefCard}>
          {preferences.map(([title, subtitle]) => (
            <View key={title} style={styles.prefRow}>
              <View style={styles.prefCopy}>
                <AppText style={styles.prefTitle}>{title}</AppText>
                <AppText style={styles.prefSubtitle}>{subtitle}</AppText>
              </View>
              <Switch
                value={enabled[title]}
                onValueChange={() => setEnabled(prev => ({ ...prev, [title]: !prev[title] }))}
                thumbColor={AppColors.white}
                trackColor={{ false: AppColors.memorialMutedButton, true: AppColors.homeActionCard }}
              />
            </View>
          ))}
        </GlassCard>
      </View>
    </ScreenWrapper>
  );
};

const NotificationCard = ({ item }) => (
  <GlassCard contentStyle={[styles.notificationCard, !item.read && styles.unreadCard]}>
    <View style={styles.notificationTop}>
      <View style={styles.notificationIcon}>
        <AppIcon name={item.icon} color={AppColors.memorialCard} size={22} />
      </View>
      <View style={styles.notificationCopy}>
        <View style={styles.notificationTitleRow}>
          <AppText style={styles.notificationTitle}>{item.title}</AppText>
          {!item.read ? <View style={styles.unreadDot} /> : null}
        </View>
        <AppText style={styles.notificationBody}>{item.body}</AppText>
        <LineBreak height={0.85} />
        <View style={styles.badge}>
          <AppText style={styles.badgeText}>{item.badge}</AppText>
        </View>
        <AppText style={styles.time}>{item.time}</AppText>
      </View>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.homeBody },
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8) },
  markAll: { alignSelf: 'flex-start' },
  markAllText: { color: AppColors.white, fontSize: responsiveFontSize(1.3), fontWeight: '700' },
  notificationCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    marginBottom: responsiveHeight(1.29),
    padding: responsiveWidth(3.86),
  },
  unreadCard: { borderColor: AppColors.homeActionCard },
  notificationTop: { flexDirection: 'row' },
  notificationIcon: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(5),
    height: responsiveWidth(10),
    justifyContent: 'center',
    width: responsiveWidth(10),
  },
  notificationCopy: { flex: 1, marginLeft: responsiveWidth(3.86) },
  notificationTitleRow: { alignItems: 'center', flexDirection: 'row' },
  notificationTitle: { color: AppColors.white, flex: 1, fontSize: responsiveFontSize(1.5), fontWeight: '700' },
  unreadDot: { backgroundColor: AppColors.homeActionCard, borderRadius: 5, height: 10, width: 10 },
  notificationBody: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), lineHeight: responsiveHeight(2.1), marginTop: responsiveHeight(0.42) },
  badge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 8, paddingHorizontal: responsiveWidth(2.4), paddingVertical: responsiveHeight(0.42) },
  badgeText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05) },
  time: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05), marginTop: responsiveHeight(0.85) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  prefCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, padding: responsiveWidth(4.83) },
  prefRow: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1.72) },
  prefCopy: { flex: 1 },
  prefTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  prefSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12), marginTop: responsiveHeight(0.42) },
});

export default UserAlertsScreen;
