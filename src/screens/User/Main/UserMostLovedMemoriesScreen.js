import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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

const tabs = ['Today', 'This Week', 'This Month', 'All Time'];

const posts = [
  ['Sarah Thompson', 'Tribute', '2h ago', 'Robert James Thompson', 'In Loving Memory', 'Dad taught us that love is shown in small steady acts. We miss him every day.', '124', '18'],
  ['Michael Reed', 'Memory', '1d ago', 'Margaret Anne Thompson', 'A Garden of Kindness', 'Her flowers were always bright, and somehow so was every room she entered.', '98', '12'],
];

const UserMostLovedMemoriesScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Most Loved"
        subtitle="Top memories from our community"
        height={responsiveHeight(22)}
      />
      <View style={styles.body}>
        <View style={styles.tabsScroll}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.82}
              onPress={() => setSelectedTab(index)}
              style={[styles.filterTab, selectedTab === index && styles.filterTabActive]}>
              <AppText style={[styles.filterText, selectedTab === index && styles.filterTextActive]}>{tab}</AppText>
            </TouchableOpacity>
          ))}
        </View>
        <LineBreak height={2.2} />
        <GlassCard contentStyle={styles.statsCard}>
          <Stat value="2.4k" label="Hearts" />
          <Stat value="486" label="Comments" />
          <Stat value="128" label="Shares" />
        </GlassCard>
        <LineBreak height={2.2} />
        {posts.map(post => <MemoryCard key={post[4]} post={post} />)}
      </View>
    </ScreenWrapper>
  );
};

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <AppText style={styles.statValue}>{value}</AppText>
    <AppText style={styles.statLabel}>{label}</AppText>
  </View>
);

const MemoryCard = ({ post }) => (
  <GlassCard contentStyle={styles.memoryCard}>
    <View style={styles.authorRow}>
      <Image source={AppAssets.images.profilePic} style={styles.avatar} />
      <View style={styles.authorCopy}>
        <AppText style={styles.author}>{post[0]}</AppText>
        <AppText style={styles.meta}>{post[1]} • {post[2]}</AppText>
      </View>
      <View style={styles.categoryPill}><AppText style={styles.categoryText}>{post[1]}</AppText></View>
    </View>
    <LineBreak height={1.4} />
    <AppText style={styles.deceased}>{post[3]}</AppText>
    <AppText style={styles.memoryTitle}>{post[4]}</AppText>
    <AppText style={styles.bodyText}>{post[5]}</AppText>
    <LineBreak height={1.6} />
    <View style={styles.reactionRow}>
      <Reaction icon="favorite" value={post[6]} />
      <Reaction icon="chat-bubble-outline" value={post[7]} />
      <Reaction icon="share" value="Share" />
    </View>
  </GlassCard>
);

const Reaction = ({ icon, value }) => (
  <View style={styles.reaction}>
    <AppIcon name={icon} color={AppColors.white} size={17} />
    <AppText style={styles.reactionText}>{value}</AppText>
  </View>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  tabsScroll: { flexDirection: 'row', flexWrap: 'wrap', gap: responsiveWidth(2.4) },
  filterTab: { paddingHorizontal: responsiveWidth(4.8), paddingVertical: responsiveHeight(1.05), borderRadius: 20, backgroundColor: AppColors.white },
  filterTabActive: { backgroundColor: AppColors.themeColor },
  filterText: { color: AppColors.themeColor, fontSize: responsiveFontSize(1.18), fontWeight: '700' },
  filterTextActive: { color: AppColors.white },
  statsCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { color: AppColors.white, fontSize: responsiveFontSize(1.8), fontWeight: '700' },
  statLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginTop: responsiveHeight(0.35) },
  memoryCard: { marginBottom: responsiveHeight(1.6), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  authorRow: { alignItems: 'center', flexDirection: 'row' },
  avatar: { width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(5) },
  authorCopy: { flex: 1, marginLeft: responsiveWidth(3) },
  author: { color: AppColors.white, fontSize: responsiveFontSize(1.4), fontWeight: '700' },
  meta: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1), marginTop: responsiveHeight(0.25) },
  categoryPill: { paddingHorizontal: responsiveWidth(2.5), paddingVertical: responsiveHeight(0.45), borderRadius: 12, backgroundColor: AppColors.memorialMutedButton },
  categoryText: { color: AppColors.white, fontSize: responsiveFontSize(1.02) },
  deceased: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18) },
  memoryTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.65), fontWeight: '700', marginTop: responsiveHeight(0.65) },
  bodyText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.3), lineHeight: responsiveHeight(2.2), marginTop: responsiveHeight(0.8) },
  reactionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  reaction: { alignItems: 'center', flexDirection: 'row' },
  reactionText: { color: AppColors.white, fontSize: responsiveFontSize(1.15), marginLeft: responsiveWidth(1.2) },
});

export default UserMostLovedMemoriesScreen;
