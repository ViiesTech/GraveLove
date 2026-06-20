import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {
  useGetClientMemorialAlertsQuery,
  useGetClientMemorialsQuery,
  useGetClientNotificationsQuery,
  useGetClientNotificationsUnreadCountQuery,
  useMarkAllClientNotificationsReadMutation,
  useUpdateClientMemorialAlertsMutation,
} from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const firstValue = (...values) =>
  values.find(value => value !== undefined && value !== null && value !== '');

const iconForType = type => {
  const key = type?.toString().toLowerCase() || '';

  if (key.includes('service') || key.includes('booking')) {
    return 'calendar-today';
  }
  if (key.includes('payment')) {
    return 'payments';
  }
  if (key.includes('post') || key.includes('memorial')) {
    return 'favorite-border';
  }

  return 'notifications-none';
};

const mapNotification = item => ({
  badge: firstValue(
    item?.memorial_name,
    item?.memorial?.name,
    item?.data?.memorial_name,
    item?.data?.badge,
    item?.category,
    '',
  ),
  body: firstValue(item?.body, item?.message, item?.data?.message, item?.description, ''),
  icon: iconForType(firstValue(item?.type, item?.data?.type, item?.category)),
  id: firstValue(item?.id, item?.notification_id, item?.created_at, item?.title),
  read: Boolean(firstValue(item?.read_at, item?.is_read, item?.read, false)),
  time: firstValue(item?.time, item?.created_at_human, item?.created_at, item?.date, ''),
  title: firstValue(item?.title, item?.data?.title, item?.type, 'Notification'),
});

const preferences = [
  { key: 'daily_inspiration', title: 'Daily Inspiration', subtitle: 'Receive uplifting quotes each morning' },
  { key: 'service_updates', title: 'Service Updates', subtitle: 'Notifications about scheduled services' },
  { key: 'visit_reminders', title: 'Visit Reminders', subtitle: 'Gentle prompts for memorial visits' },
  { key: 'memorial_activity', title: 'Memorial Activity', subtitle: 'Updates from memorial wall posts' },
];

const fallbackNotifications = [
  {
    badge: 'Robert James Thompson (Father)',
    body: 'Love never fades — it transforms into eternal memory...',
    icon: 'favorite-border',
    id: 'fallback-daily-inspiration',
    read: false,
    time: 'Today, 8:00 AM',
    title: 'Daily Inspiration',
  },
  {
    badge: 'Robert James Thompson (Father)',
    body: 'Your flower placement service is scheduled for tomorrow.',
    icon: 'calendar-today',
    id: 'fallback-upcoming-service',
    read: false,
    time: 'Yesterday, 3:30 PM',
    title: 'Upcoming Service',
  },
  {
    badge: 'Margaret Anne Thompson (Mother)',
    body: 'Garden Care Services has completed your grave cleaning.',
    icon: 'local-florist',
    id: 'fallback-service-completed',
    read: true,
    time: '2 days ago',
    title: 'Service Completed',
  },
  {
    badge: 'Michael David Thompson (Brother)',
    body: "It's been a month since your last visit to Forest Lawn.",
    icon: 'favorite-border',
    id: 'fallback-visit-reminder',
    read: true,
    time: '3 days ago',
    title: 'Visit Reminder',
  },
  {
    badge: 'Robert James Thompson (Father)',
    body: 'Emily Thompson shared a memory on the memorial wall.',
    icon: 'chat-bubble-outline',
    id: 'fallback-new-post',
    read: true,
    time: '5 days ago',
    title: 'New Memorial Post',
  },
  {
    badge: 'Margaret Anne Thompson (Mother)',
    body: 'Monthly upkeep service scheduled for next week at Oakwood Gardens',
    icon: 'calendar-today',
    id: 'fallback-service-reminder',
    read: true,
    time: '1 week ago',
    title: 'Service Reminder',
  },
];

const readAlertValue = (alerts, key, fallback) => {
  const camelKey = key.replace(/_([a-z])/g, (_match, letter) => letter.toUpperCase());
  return Boolean(firstValue(alerts?.[key], alerts?.[camelKey], fallback));
};

const UserAlertsScreen = ({ navigation }) => {
  const { data: notificationsData = [], isError, isLoading } = useGetClientNotificationsQuery();
  const { data: unreadCount = 0 } = useGetClientNotificationsUnreadCountQuery();
  const { data: memorials = [] } = useGetClientMemorialsQuery();
  const primaryMemorialId = firstValue(memorials?.[0]?.id, memorials?.[0]?.memorial_id);
  const { data: memorialAlerts = {} } = useGetClientMemorialAlertsQuery(primaryMemorialId, { skip: !primaryMemorialId });
  const [markAllRead, { isLoading: isMarking }] = useMarkAllClientNotificationsReadMutation();
  const [updateMemorialAlerts] = useUpdateClientMemorialAlertsMutation();
  const [enabled, setEnabled] = useState({
    'Daily Inspiration': true,
    'Memorial Activity': false,
    'Service Updates': true,
    'Visit Reminders': true,
  });
  const apiNotifications = notificationsData.map(mapNotification);
  const notifications = apiNotifications.length ? apiNotifications : fallbackNotifications;

  const handleMarkAll = async () => {
    try {
      const response = await markAllRead().unwrap();
      showToast('Notifications', response?.message || 'All notifications marked as read.');
    } catch (error) {
      showToast('Notifications', error?.message || 'Unable to update notifications.');
    }
  };

  const handleNotificationPress = async item => {
    return item;
  };

  const handlePreferenceToggle = async item => {
    const nextValue = !readAlertValue(memorialAlerts, item.key, enabled[item.title]);
    const nextEnabled = { ...enabled, [item.title]: nextValue };
    setEnabled(nextEnabled);

    if (!primaryMemorialId) {
      return;
    }

    const body = preferences.reduce((payload, preference) => {
      payload[preference.key] = preference.key === item.key
        ? nextValue
        : readAlertValue(memorialAlerts, preference.key, nextEnabled[preference.title]);
      return payload;
    }, {});

    try {
      await updateMemorialAlerts({ memorialId: primaryMemorialId, body }).unwrap();
    } catch (error) {
      setEnabled(prev => ({ ...prev, [item.title]: !nextValue }));
    }
  };

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Notifications"
        subtitle={`${unreadCount} unread • Stay connected and informed`}
      />
      <View style={styles.content}>
        <GlassCard contentStyle={styles.prefCard}>
          <AppText style={styles.sectionTitle}>Notification Preferences</AppText>
          <LineBreak height={2.15} />
          {preferences.map(item => (
            <View key={item.title} style={styles.prefRow}>
              <View style={styles.prefCopy}>
                <AppText style={styles.prefTitle}>{item.title}</AppText>
                <AppText style={styles.prefSubtitle}>{item.subtitle}</AppText>
              </View>
              <PreferenceSwitch
                isActive={readAlertValue(memorialAlerts, item.key, enabled[item.title])}
                onPress={() => handlePreferenceToggle(item)}
              />
            </View>
          ))}
        </GlassCard>
        <LineBreak height={2.58} />

        {isLoading ? <StateText text="Loading notifications..." /> : null}
        {isError ? <StateText text="Unable to load notifications." /> : null}
        {!isLoading ? (
          <>
            <View style={styles.sectionHeaderRow}>
              <AppText style={styles.sectionTitle}>Recent Notifications</AppText>
              <TouchableOpacity
                activeOpacity={0.82}
                disabled={isMarking}
                onPress={handleMarkAll}>
                <AppText style={styles.markAllText}>{isMarking ? 'Updating...' : 'Mark all as read'}</AppText>
              </TouchableOpacity>
            </View>
            <LineBreak height={1.72} />
            {notifications.map(item => (
              <NotificationCard
                key={item.id || item.title}
                item={item}
                onPress={() => handleNotificationPress(item)}
              />
            ))}
            <QuoteCard />
          </>
        ) : null}
      </View>
    </ScreenWrapper>
  );
};

const StateText = ({ text }) => (
  <GlassCard contentStyle={styles.emptyCard}>
    <AppText style={styles.emptyText}>{text}</AppText>
  </GlassCard>
);

const NotificationCard = ({ item, onPress }) => (
  <GlassCard
    onPress={onPress}
    contentStyle={[styles.notificationCard, !item.read && styles.unreadCard]}>
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

const PreferenceSwitch = ({ isActive, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.82}
    onPress={onPress}
    style={[styles.preferenceSwitch, isActive && styles.preferenceSwitchActive]}>
    <View style={[styles.preferenceKnob, isActive && styles.preferenceKnobActive]} />
  </TouchableOpacity>
);

const QuoteCard = () => (
  <GlassCard contentStyle={styles.quoteCard}>
    <View style={styles.notificationIcon}>
      <AppIcon name="favorite-border" color={AppColors.memorialCard} size={22} />
    </View>
    <View style={styles.notificationCopy}>
      <AppText style={styles.time}>Quote of the Day</AppText>
      <LineBreak height={0.85} />
      <AppText style={styles.quoteText}>
        "What we have once enjoyed deeply we can never lose. All that we love deeply becomes a part of us."
      </AppText>
      <LineBreak height={0.85} />
      <AppText style={styles.time}>— Helen Keller</AppText>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.homeBody },
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8) },
  markAll: { alignSelf: 'flex-start' },
  markAllText: { color: AppColors.white, fontSize: responsiveFontSize(1.3), fontWeight: '700' },
  emptyCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, marginBottom: responsiveHeight(1.29) },
  emptyText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.3), textAlign: 'center' },
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
  sectionHeaderRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  prefCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, padding: responsiveWidth(4.83) },
  prefRow: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1.72) },
  prefCopy: { flex: 1 },
  prefTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  prefSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12), marginTop: responsiveHeight(0.42) },
  preferenceSwitch: {
    alignItems: 'flex-start',
    backgroundColor: AppColors.memorialMutedButton,
    borderColor: AppColors.homeBorder,
    borderRadius: responsiveWidth(4.2),
    borderWidth: 1,
    height: responsiveHeight(2.25),
    justifyContent: 'center',
    marginLeft: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(0.55),
    width: responsiveWidth(8.7),
  },
  preferenceSwitchActive: {
    alignItems: 'flex-end',
    backgroundColor: AppColors.homeActionCard,
    borderColor: AppColors.homeActionCard,
  },
  preferenceKnob: {
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(1.45),
    height: responsiveWidth(2.9),
    width: responsiveWidth(2.9),
  },
  preferenceKnobActive: {
    backgroundColor: AppColors.white,
  },
  quoteCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
  },
  quoteText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    fontStyle: 'italic',
    lineHeight: responsiveHeight(2.25),
  },
});

export default UserAlertsScreen;
