import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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

const staticPosts = [
  {
    avatar: AppAssets.images.profilePic,
    comments: 8,
    content: 'Dad, your strength and wisdom continue to guide me every day. Thank you for teaching me the value of hard work and family. The roses in the garden are blooming beautifully this year - just as you always loved them. Missing you deeply. 🌹',
    hearts: 24,
    id: 'sarah-photo',
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
    id: 'emily-tribute',
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
    id: 'james-photo',
    image: AppAssets.images.headerImage,
    name: 'James Wilson',
    role: 'Colleague',
    time: '1 week ago',
    type: 'photo',
  },
  {
    avatar: AppAssets.images.vendor1,
    comments: 15,
    content: "My darling, 45 years together wasn't enough. Your love gave me strength, your laughter filled our home with joy. I carry you in my heart always. Until we meet again. 💕",
    hearts: 42,
    id: 'linda-tribute',
    name: 'Linda Thompson',
    role: 'Wife',
    time: '2 weeks ago',
    type: 'tribute',
  },
];

const MemorialWallScreen = ({ navigation, route }) => {
  const [filter, setFilter] = useState('all');
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const posts = staticPosts;
  const photoCount = posts.filter(post => post.type === 'photo').length;
  const tributeCount = posts.filter(post => post.type === 'tribute').length;
  const heartsCount = posts.reduce((total, post) => total + post.hearts, 0);
  const visiblePosts = filter === 'all' ? posts : posts.filter(post => post.type === filter);
  const tabs = [
    ['all', `All (${posts.length})`, null],
    ['photo', `Photos (${photoCount})`, 'image'],
    ['tribute', `Tributes (${tributeCount})`, 'favorite-border'],
  ];

  return (
    <ScreenWrapper contentContainerStyle={styles.rootContent}>
      <ScrollView
        bounces
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <AppImageHeader
          bottomOverlay
          image={AppAssets.images.headerImage}
          onBack={() => navigation.goBack()}
          overlayBaseColor="rgba(0, 0, 0, 0.12)"
          overlayColors={[
            'rgba(0, 0, 0, 0)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(0, 0, 0, 0.64)',
            'rgba(0, 0, 0, 1)',
          ]}
          overlayLocations={[0, 0.36, 0.72, 1]}
          title="Robert James Thompson"
          subtitle="Father"
          footerSlotStyle={styles.wallHeaderSlot}
          height={responsiveHeight(30)}>
          <View style={styles.headerFooter}>
            <View style={styles.wallBadge}><AppText style={styles.badgeText}>Memorial Wall</AppText></View>
            <View style={styles.statsRow}>
              <Stat value={posts.length} label="Total Posts" />
              <Stat value={photoCount} label="Photos" />
              <Stat value={tributeCount} label="Tributes" />
              <Stat value={heartsCount} label="Hearts" />
            </View>
          </View>
        </AppImageHeader>

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
                  color={AppColors.white}
                  size={15}
                />
              ) : null}
              <AppText style={[styles.tabText, filter === key && styles.activeTabText]}>{label}</AppText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          {visiblePosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => setIsMemoryOpen(true)}
        style={styles.fab}
      >
        <AppIcon name="add" color={AppColors.themeColor} size={30} />
      </TouchableOpacity>
      <NewMemoryModal visible={isMemoryOpen} onClose={() => setIsMemoryOpen(false)} />
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
        <View style={styles.authorRow}>
          <AppText style={styles.postName}>{post.name}</AppText>
          <View style={styles.roleBadge}>
            <AppText style={styles.roleText}>{post.role}</AppText>
          </View>
        </View>
        <AppText style={styles.postMeta}>{post.time}</AppText>
      </View>
      <TouchableOpacity activeOpacity={0.78}>
        <AppIcon name="share" color={AppColors.homeTextMuted} size={18} />
      </TouchableOpacity>
    </View>
    <LineBreak height={1.4} />
    <AppText style={styles.postBody}>{post.content}</AppText>
    {post.image ? (
      <>
        <LineBreak height={1.4} />
        <View style={styles.imageWrap}>
          <Image source={post.image} style={styles.postImage} />
          <View style={styles.photoBadge}>
            <AppIcon name="photo-camera" color={AppColors.white} size={14} />
            <AppText style={styles.photoBadgeText}>Photo</AppText>
          </View>
        </View>
      </>
    ) : null}
    <LineBreak height={1.4} />
    <View style={styles.actionsRow}>
      <Action icon="favorite" value={post.hearts} />
      <Action icon="chat-bubble-outline" value={post.comments} />
    </View>
  </GlassCard>
);

const NewMemoryModal = ({ onClose, visible }) => (
  <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
    <View style={styles.commentBackdrop}>
      <View style={styles.commentModal}>
        <View style={styles.commentHeader}>
          <AppText style={styles.commentTitle}>Share a Memory</AppText>
          <TouchableOpacity activeOpacity={0.75} onPress={onClose}>
            <AppIcon name="add" color={AppColors.white} size={28} />
          </TouchableOpacity>
        </View>
        <LineBreak height={1.6} />
        <TextInput
          multiline
          placeholder="Share your thoughts, memories, or tribute..."
          placeholderTextColor={AppColors.homeTextMuted}
          style={styles.commentInput}
        />
        <LineBreak height={1.8} />
        <View style={styles.memoryActions}>
          <TouchableOpacity activeOpacity={0.82} style={styles.memoryMediaPrimary}>
            <AppIcon name="photo-camera" color={AppColors.themeColor} size={18} />
            <AppText style={styles.memoryMediaPrimaryText}>Add Photo</AppText>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.82} style={styles.memoryMediaSecondary}>
            <AppIcon name="image" color={AppColors.white} size={18} />
            <AppText style={styles.memoryMediaSecondaryText}>Gallery</AppText>
          </TouchableOpacity>
        </View>
        <LineBreak height={2.4} />
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={onClose}
          style={styles.commentButton}
        >
          <AppText style={styles.commentButtonText}>Post Memory</AppText>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const Action = ({ icon, value }) => (
  <TouchableOpacity activeOpacity={0.78} style={styles.action}>
    <AppIcon name={icon} color={AppColors.homeTextMuted} size={18} />
    <AppText style={styles.actionText}>{value}</AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  rootContent: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: responsiveHeight(10) },
  wallHeaderSlot: { flex: 1, marginTop: 0 },
  headerFooter: { flex: 1, position: 'relative' },
  wallBadge: { alignSelf: 'flex-start', backgroundColor: '#7999B1', borderRadius: 20, marginTop: responsiveHeight(2.2), paddingHorizontal: responsiveWidth(3.2), paddingVertical: responsiveHeight(0.68) },
  badgeText: { color: AppColors.white, fontSize: responsiveFontSize(1.12), fontWeight: '600' },
  statsRow: { bottom: responsiveHeight(1.1), flexDirection: 'row', justifyContent: 'space-between', left: 0, position: 'absolute', right: 0 },
  stat: { alignItems: 'center' },
  statValue: { color: AppColors.white, fontSize: responsiveFontSize(1.72), fontWeight: '700' },
  statLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05) },
  tabsRow: { flexDirection: 'row', gap: responsiveWidth(2), padding: responsiveWidth(5.8), backgroundColor: AppColors.bgDark, marginTop: responsiveHeight(1.2) },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', minHeight: responsiveHeight(4.2), borderRadius: 30, borderWidth: 0.5, borderColor: AppColors.homeBorder },
  activeTab: { backgroundColor: AppColors.homeActionCard, borderColor: AppColors.homeActionCard },
  tabText: { color: AppColors.white, fontSize: responsiveFontSize(1.02), marginLeft: responsiveWidth(1) },
  activeTabText: { color: AppColors.white, fontWeight: '700' },
  content: { paddingHorizontal: responsiveWidth(5.8), paddingTop: responsiveHeight(0.85) },
  stateText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.3), marginBottom: responsiveHeight(1.6), textAlign: 'center' },
  postCard: { marginBottom: responsiveHeight(1.6), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 20 },
  postTop: { alignItems: 'center', flexDirection: 'row' },
  avatar: { width: responsiveWidth(11), height: responsiveWidth(11), borderRadius: responsiveWidth(5.5), marginRight: responsiveWidth(3) },
  flex: { flex: 1 },
  postName: { color: AppColors.white, fontSize: responsiveFontSize(1.42), fontWeight: '700' },
  postMeta: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05), marginTop: responsiveHeight(0.25) },
  postBody: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), lineHeight: responsiveFontSize(1.85) },
  authorRow: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' },
  roleBadge: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 8, marginLeft: responsiveWidth(1.9), paddingHorizontal: responsiveWidth(1.9), paddingVertical: responsiveHeight(0.22) },
  roleText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(0.92) },
  imageWrap: { overflow: 'hidden', position: 'relative' },
  postImage: { width: '100%', height: responsiveHeight(23.6) },
  photoBadge: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 20, flexDirection: 'row', paddingHorizontal: responsiveWidth(2.4), paddingVertical: responsiveHeight(0.62), position: 'absolute', right: responsiveWidth(3), top: responsiveHeight(1.3) },
  photoBadgeText: { color: AppColors.white, fontSize: responsiveFontSize(1.05), marginLeft: responsiveWidth(1.2) },
  actionsRow: { flexDirection: 'row', gap: responsiveWidth(5) },
  action: { alignItems: 'center', flexDirection: 'row' },
  actionText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12), marginLeft: responsiveWidth(1) },
  fab: { position: 'absolute', right: responsiveWidth(5.8), bottom: responsiveHeight(3), alignItems: 'center', justifyContent: 'center', width: responsiveWidth(14), height: responsiveWidth(14), borderRadius: responsiveWidth(7), backgroundColor: AppColors.white },
  commentBackdrop: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.55)', flex: 1, justifyContent: 'center', padding: responsiveWidth(5.8) },
  commentModal: { backgroundColor: AppColors.memorialCard, borderRadius: 24, padding: responsiveWidth(5.8), width: '100%' },
  commentHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  commentTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  commentInput: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, color: AppColors.white, fontSize: responsiveFontSize(1.3), minHeight: responsiveHeight(12), padding: responsiveWidth(4), textAlignVertical: 'top' },
  memoryActions: { flexDirection: 'row', gap: responsiveWidth(3) },
  memoryMediaPrimary: { alignItems: 'center', backgroundColor: AppColors.white, borderRadius: 12, flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: responsiveHeight(1.28) },
  memoryMediaPrimaryText: { color: AppColors.themeColor, fontSize: responsiveFontSize(1.25), fontWeight: '700', marginLeft: responsiveWidth(1.5) },
  memoryMediaSecondary: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, flex: 1, flexDirection: 'row', justifyContent: 'center', paddingVertical: responsiveHeight(1.28) },
  memoryMediaSecondaryText: { color: AppColors.white, fontSize: responsiveFontSize(1.25), fontWeight: '700', marginLeft: responsiveWidth(1.5) },
  commentButton: { alignItems: 'center', backgroundColor: AppColors.homeActionCard, borderRadius: 24, height: responsiveHeight(5.4), justifyContent: 'center' },
  commentButtonDisabled: { opacity: 0.55 },
  commentButtonText: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
});

export default MemorialWallScreen;
