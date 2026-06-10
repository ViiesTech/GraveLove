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

const posts = [
  {
    avatar: AppAssets.images.profilePic,
    comments: 8,
    content: 'Dad, your strength and wisdom continue to guide me every day. Thank you for teaching me the value of hard work and family. The roses in the garden are blooming beautifully this year - just as you always loved them. Missing you deeply.',
    hearts: 24,
    image: AppAssets.images.vendor4,
    name: 'Sarah Thompson',
    role: 'Daughter',
    time: '2 days ago',
    type: 'photo',
  },
  {
    avatar: AppAssets.images.vendor2,
    comments: 5,
    content: "Robert was a true gentleman and a pillar of our community. His kindness touched so many lives. I'll never forget his warm smile and encouraging words. Rest peacefully, dear friend.",
    hearts: 18,
    name: 'Emily Martinez',
    role: 'Family Friend',
    time: '5 days ago',
    type: 'tribute',
  },
  {
    avatar: AppAssets.images.vendor3,
    comments: 12,
    content: "Visited the memorial today and felt such peace. The inscription on the headstone is perfect - 'A loving father, devoted husband, cherished friend.' Those words capture who he was.",
    hearts: 31,
    image: AppAssets.images.headerImage,
    name: 'James Wilson',
    role: 'Colleague',
    time: '1 week ago',
    type: 'photo',
  },
  {
    avatar: AppAssets.images.vendor1,
    comments: 15,
    content: "My darling, 45 years together wasn't enough. Your love gave me strength, your laughter filled our home with joy. I carry you in my heart always. Until we meet again.",
    hearts: 42,
    name: 'Linda Thompson',
    role: 'Wife',
    time: '2 weeks ago',
    type: 'tribute',
  },
];

const tabs = [
  ['all', 'All (4)', null],
  ['photo', 'Photos (2)', 'image'],
  ['tribute', 'Tributes (2)', 'favorite-border'],
];

const MemorialWallScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all');
  const visiblePosts = filter === 'all' ? posts : posts.filter(post => post.type === filter);

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Robert James Thompson"
        subtitle="Father"
      />
      <View style={styles.headerBody}>
        <View style={styles.wallBadge}><AppText style={styles.badgeText}>Memorial Wall</AppText></View>
        <LineBreak height={2.2} />
        <View style={styles.statsRow}>
          <Stat value="4" label="Total Posts" />
          <Stat value="2" label="Photos" />
          <Stat value="2" label="Tributes" />
          <Stat value="115" label="Hearts" />
        </View>
      </View>

      <View style={styles.tabsRow}>
        {tabs.map(([key, label, icon]) => (
          <TouchableOpacity
            activeOpacity={0.78}
            key={key}
            onPress={() => setFilter(key)}
            style={[styles.tab, filter === key && styles.activeTab]}
          >
            {icon ? (
              <AppIcon
                name={icon}
                color={filter === key ? AppColors.themeColor : AppColors.white}
                size={15}
              />
            ) : null}
            <AppText style={[styles.tabText, filter === key && styles.activeTabText]}>
              {label}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {visiblePosts.map(post => <PostCard key={`${post.name}-${post.time}`} post={post} />)}
      </View>

      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => navigation.navigate('AddTribute')}
        style={styles.fab}
      >
        <AppIcon name="add" color={AppColors.themeColor} size={30} />
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <AppText style={styles.statValue}>{value}</AppText>
    <AppText style={styles.statLabel}>{label}</AppText>
  </View>
);

const PostCard = ({ post }) => (
  <GlassCard contentStyle={styles.postCard}>
    <View style={styles.postTop}>
      <Image source={post.avatar} style={styles.avatar} />
      <View style={styles.flex}>
        <AppText style={styles.postName}>{post.name}</AppText>
        <AppText style={styles.postMeta}>{post.role} • {post.time}</AppText>
      </View>
    </View>
    <LineBreak height={1.4} />
    <AppText style={styles.postBody}>{post.content}</AppText>
    {post.image ? (
      <>
        <LineBreak height={1.4} />
        <Image source={post.image} style={styles.postImage} />
      </>
    ) : null}
    <LineBreak height={1.4} />
    <View style={styles.actionsRow}>
      <Action icon="favorite-border" value={post.hearts} />
      <Action icon="chat-bubble-outline" value={post.comments} />
    </View>
  </GlassCard>
);

const Action = ({ icon, value }) => (
  <View style={styles.action}>
    <AppIcon name={icon} color={AppColors.homeTextMuted} size={18} />
    <AppText style={styles.actionText}>{value}</AppText>
  </View>
);

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1, paddingBottom: responsiveHeight(10) },
  headerBody: { paddingHorizontal: responsiveWidth(5.8), paddingBottom: responsiveHeight(2), backgroundColor: 'rgba(4,47,103,0.45)' },
  wallBadge: { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(0.6), backgroundColor: 'rgba(255,255,255,0.12)' },
  badgeText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12) },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center' },
  statValue: { color: AppColors.white, fontSize: responsiveFontSize(1.72), fontWeight: '700' },
  statLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05) },
  tabsRow: { flexDirection: 'row', gap: responsiveWidth(2), padding: responsiveWidth(5.8), backgroundColor: AppColors.bgDark },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', minHeight: responsiveHeight(4.2), borderRadius: 30, borderWidth: 0.5, borderColor: AppColors.homeBorder },
  activeTab: { backgroundColor: AppColors.white, borderColor: AppColors.white },
  tabText: { color: AppColors.white, fontSize: responsiveFontSize(1.02), marginLeft: responsiveWidth(1) },
  activeTabText: { color: AppColors.themeColor, fontWeight: '700' },
  content: { paddingHorizontal: responsiveWidth(5.8) },
  postCard: { marginBottom: responsiveHeight(1.6), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 20 },
  postTop: { alignItems: 'center', flexDirection: 'row' },
  avatar: { width: responsiveWidth(11), height: responsiveWidth(11), borderRadius: responsiveWidth(5.5), marginRight: responsiveWidth(3) },
  flex: { flex: 1 },
  postName: { color: AppColors.white, fontSize: responsiveFontSize(1.42), fontWeight: '700' },
  postMeta: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05), marginTop: responsiveHeight(0.25) },
  postBody: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), lineHeight: responsiveFontSize(1.85) },
  postImage: { width: '100%', height: responsiveHeight(19), borderRadius: 16 },
  actionsRow: { flexDirection: 'row', gap: responsiveWidth(5) },
  action: { alignItems: 'center', flexDirection: 'row' },
  actionText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12), marginLeft: responsiveWidth(1) },
  fab: { position: 'absolute', right: responsiveWidth(5.8), bottom: responsiveHeight(3), alignItems: 'center', justifyContent: 'center', width: responsiveWidth(14), height: responsiveWidth(14), borderRadius: responsiveWidth(7), backgroundColor: AppColors.white },
});

export default MemorialWallScreen;
