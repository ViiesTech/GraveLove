import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
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

const chats = [
  ['Wilson Care House', 'Hi, Are you there?', '12:03 AM', 3],
  ['Henry Care House', 'Hi, Are you there?', '09:20 AM', 0],
  ['David Care House', 'Hi, Are you there?', 'Yesterday', 0],
];

const jobs = [
  ['Grave Cleaning', 'Sarah Thompson', '$45', 'Pending'],
  ['Flower Placement', 'Sarah Thompson', '$60', 'Pending'],
];

const UserVendorsScreen = ({ navigation }) => (
  <ScreenWrapper style={styles.screen} contentContainerStyle={styles.root}>
    <ImageBackground source={AppAssets.images.vendorHeader} resizeMode="cover" style={styles.header}>
      <View style={styles.headerOverlay} />
      <View style={styles.headerTop}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.goBack()}>
          <AppIcon iconSet="ion" name="chevron-back" color={AppColors.white} size={22} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.82} style={styles.paymentPill}>
          <AppText style={styles.paymentText}>Payment Status</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.headerCopy}>
        <AppText style={styles.headerTitle}>Vendor Dashboard</AppText>
        <AppText style={styles.headerSubtitle}>Manage your memorial care services</AppText>
        <LineBreak height={2.15} />
        <View style={styles.statsRow}>
          <SmallStat icon="attach-money" label="This Month" value="$1,240" />
          <SmallStat icon="star" label="Rating" value="4.9 ★" />
        </View>
      </View>
    </ImageBackground>
    <ScreenWrapper
      isScroll
      safeAreaEdges={[]}
      useBackgroundImage={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}>
      <Section title="Recent Chats">
        {chats.map(([name, message, time, unread]) => (
          <ChatCard key={name} name={name} message={message} time={time} unread={unread} />
        ))}
      </Section>
      <Section title="Pending Requests">
        {jobs.map(([name, client, price, status]) => (
          <JobCard key={name} client={client} name={name} price={price} status={status} />
        ))}
      </Section>
      <Section title="Active Jobs">
        <JobCard client="Sarah Thompson" name="Grave Cleaning" price="$45" status="In Progress" />
      </Section>
      <Section title="Recently Completed">
        <JobCard client="Emily Thompson" name="Flower Placement" price="$60" status="Completed" />
      </Section>
      <LineBreak height={4.3} />
    </ScreenWrapper>
  </ScreenWrapper>
);

const SmallStat = ({ icon, label, value }) => (
  <GlassCard contentStyle={styles.smallStat}>
    <AppIcon name={icon} color={AppColors.memorialCard} size={18} />
    <View style={styles.smallStatCopy}>
      <AppText style={styles.smallStatLabel}>{label}</AppText>
      <AppText style={styles.smallStatValue}>{value}</AppText>
    </View>
  </GlassCard>
);

const Section = ({ children, title }) => (
  <View>
    <AppText style={styles.sectionTitle}>{title}</AppText>
    <LineBreak height={1.29} />
    {children}
    <LineBreak height={2.58} />
  </View>
);

const ChatCard = ({ message, name, time, unread }) => (
  <GlassCard contentStyle={styles.chatCard}>
    <View style={styles.avatar}><AppText style={styles.avatarText}>GL</AppText></View>
    <View style={styles.cardCopy}>
      <AppText style={styles.cardTitle}>{name}</AppText>
      <AppText style={styles.cardSubtitle}>{message}</AppText>
    </View>
    <View style={styles.chatRight}>
      <AppText style={styles.time}>{time}</AppText>
      {unread ? <View style={styles.unreadBadge}><AppText style={styles.unreadText}>{unread}</AppText></View> : null}
    </View>
  </GlassCard>
);

const JobCard = ({ client, name, price, status }) => (
  <GlassCard contentStyle={styles.jobCard}>
    <View style={styles.jobTop}>
      <AppIcon name="inventory-2" color={AppColors.white} size={24} />
      <View style={styles.cardCopy}>
        <AppText style={styles.cardTitle}>{name}</AppText>
        <AppText style={styles.cardSubtitle}>{client}</AppText>
      </View>
      <View style={styles.statusPill}><AppText style={styles.statusText}>{status}</AppText></View>
    </View>
    <LineBreak height={1.29} />
    <View style={styles.jobBottom}>
      <AppText style={styles.cardSubtitle}>Nov 3, 2025 at 10:00 AM</AppText>
      <AppText style={styles.price}>{price}</AppText>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.homeBody },
  root: { flex: 1 },
  header: { height: responsiveHeight(30), paddingHorizontal: responsiveWidth(5.8), paddingTop: responsiveHeight(1.72) },
  headerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(4,47,103,0.70)' },
  headerTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  paymentPill: { backgroundColor: AppColors.white, borderRadius: 20, paddingHorizontal: responsiveWidth(2.4), paddingVertical: responsiveHeight(0.65) },
  paymentText: { color: AppColors.memorialCard, fontSize: responsiveFontSize(1.05), fontWeight: '700' },
  headerCopy: { marginTop: 'auto', paddingBottom: responsiveHeight(2.58) },
  headerTitle: { color: AppColors.white, fontSize: responsiveFontSize(2), fontWeight: '700' },
  headerSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), marginTop: responsiveHeight(0.42) },
  statsRow: { flexDirection: 'row', gap: responsiveWidth(3.86) },
  smallStat: { alignItems: 'center', backgroundColor: AppColors.white, borderColor: 'transparent', flex: 1, flexDirection: 'row', padding: responsiveWidth(3) },
  smallStatCopy: { marginLeft: responsiveWidth(2.4) },
  smallStatLabel: { color: AppColors.memorialCard, fontSize: responsiveFontSize(1.05) },
  smallStatValue: { color: AppColors.memorialCard, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  scroll: { backgroundColor: 'transparent', flex: 1 },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(6) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  chatCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, flexDirection: 'row', marginBottom: responsiveHeight(1.29), padding: responsiveWidth(3.86) },
  avatar: { alignItems: 'center', backgroundColor: AppColors.memorialMutedButton, borderRadius: responsiveWidth(5.8), height: responsiveWidth(11.6), justifyContent: 'center', width: responsiveWidth(11.6) },
  avatarText: { color: AppColors.white, fontWeight: '700' },
  cardCopy: { flex: 1, marginLeft: responsiveWidth(3.86) },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  cardSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18), marginTop: responsiveHeight(0.42) },
  chatRight: { alignItems: 'flex-end' },
  time: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  unreadBadge: { alignItems: 'center', backgroundColor: AppColors.homeActionCard, borderRadius: 10, height: 20, justifyContent: 'center', marginTop: responsiveHeight(0.65), width: 20 },
  unreadText: { color: AppColors.white, fontSize: responsiveFontSize(1), fontWeight: '700' },
  jobCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, marginBottom: responsiveHeight(1.29), padding: responsiveWidth(3.86) },
  jobTop: { alignItems: 'center', flexDirection: 'row' },
  statusPill: { backgroundColor: AppColors.memorialMutedButton, borderRadius: 12, paddingHorizontal: responsiveWidth(2.4), paddingVertical: responsiveHeight(0.42) },
  statusText: { color: AppColors.white, fontSize: responsiveFontSize(1) },
  jobBottom: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  price: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
});

export default UserVendorsScreen;
