import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { AppSvgAssets } from '../../../utils/AppSvgAssets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const filters = ['Recent', 'Most Loved'];

const communityPosts = [
  {
    badgeLabel: 'Tribute',
    commentCount: '18 comments',
    content:
      'Dad taught us that love is shown in small steady acts. We miss him every day.',
    id: 'p1',
    likeCount: '124',
    location: 'Forest Lawn Memorial Park',
    postImage: AppAssets.images.userDashboardFront,
    timeAgo: '2h ago',
    tributeTarget: 'Robert James Thompson - In Loving Memory',
    userImage: AppAssets.images.profilePic,
    userName: 'Sarah Thompson',
  },
  {
    badgeLabel: 'Memory',
    commentCount: '12 comments',
    content:
      'Her flowers were always bright, and somehow so was every room she entered.',
    id: 'p2',
    likeCount: '98',
    location: 'Oakwood Memorial Gardens',
    postImage: AppAssets.images.memorialImage,
    timeAgo: '1d ago',
    tributeTarget: 'Margaret Anne Thompson - A Garden of Kindness',
    userImage: AppAssets.images.vendor4,
    userName: 'Michael Reed',
  },
];

const ads = [
  {
    ctaText: 'Learn More',
    image: AppAssets.images.vendor1,
    subtitle: 'Beautiful flower arrangements for your loved ones',
    title: 'Professional Memorial Services',
  },
  {
    ctaText: 'Get Quote',
    image: AppAssets.images.vendor2,
    subtitle: 'Personalized memorials that last forever',
    title: 'Memorial Stone Engraving',
  },
];

const UserMostLovedMemoriesScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('Recent');

  const feed = useMemo(() => {
    const sortedPosts =
      selectedFilter === 'Most Loved'
        ? [...communityPosts].sort(
            (a, b) => Number(b.likeCount) - Number(a.likeCount),
          )
        : communityPosts;

    const mixed = [];
    if (sortedPosts[0]) {
      mixed.push({ data: sortedPosts[0], type: 'post' });
    }
    mixed.push({ data: ads[0], type: 'ad' });
    sortedPosts.slice(1).forEach((post, index) => {
      mixed.push({ data: post, type: 'post' });
      if ((index + 1) % 2 === 0) {
        mixed.push({ data: ads[(index + 1) % ads.length], type: 'ad' });
      }
    });
    return mixed;
  }, [selectedFilter]);

  return (
    <ScreenWrapper style={styles.screen}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        showBack={false}
        title="Community Stories"
        subtitle="Share memories and find comfort together"
        height={responsiveHeight(22)}
      />
      <ScreenWrapper
        isScroll
        safeAreaEdges={[]}
        useBackgroundImage={false}
        style={styles.scrollWrapper}
        contentContainerStyle={styles.content}>
        <FilterSection
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />
        <LineBreak height={2.4} />
        <ShareMemoryCard onPress={() => navigation.navigate('UserPostMemory')} />
        <LineBreak height={0.8} />
        {feed.length ? (
          feed.map((item, index) =>
            item.type === 'post' ? (
              <CommunityPostCard key={item.data.id} post={item.data} />
            ) : (
              <SponsoredCard key={`${item.data.title}-${index}`} ad={item.data} />
            ),
          )
        ) : (
          <AppText style={styles.emptyText}>No community stories yet.</AppText>
        )}
        <AppButton style={styles.loadMoreButton}>Load More Stories</AppButton>
      </ScreenWrapper>
    </ScreenWrapper>
  );
};

const FilterSection = ({ onSelect, selectedFilter }) => (
  <View style={styles.filterSection}>
    <View style={styles.filterContent}>
      {filters.map(filter => {
        const isSelected = selectedFilter === filter;
        return (
          <TouchableOpacity
            key={filter}
            activeOpacity={0.82}
            onPress={() => onSelect(filter)}
            style={[styles.filterChip, isSelected && styles.filterChipActive]}>
            <AppIcon
              name={filter === 'Recent' ? 'access-time' : 'favorite'}
              color={isSelected ? AppColors.white : AppColors.themeColor}
              size={16}
            />
            <AppText
              style={[
                styles.filterText,
                isSelected && styles.filterTextActive,
              ]}>
              {filter}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const ShareMemoryCard = ({ onPress }) => (
  <View style={styles.cardShell}>
    <View style={styles.shareMemoryCard}>
      <AppIcon svg={AppSvgAssets.flower} size={responsiveWidth(9.66)} />
      <View style={styles.shareCopy}>
        <AppText style={styles.shareTitle}>Share Your Memory</AppText>
        <AppText numberOfLines={1} style={styles.shareSub}>
          Honor your loved one with a tribute
        </AppText>
      </View>
      <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.smallPostBtn}>
        <AppText style={styles.smallPostText}>Post</AppText>
      </TouchableOpacity>
    </View>
  </View>
);

const CommunityPostCard = ({ post }) => (
  <View style={styles.cardShell}>
    <View style={styles.postCard}>
      <View style={styles.postTop}>
        <Image source={post.userImage} style={styles.avatar} />
        <View style={styles.postAuthor}>
          <AppText numberOfLines={1} style={styles.authorName}>
            {post.userName}
          </AppText>
          <View style={styles.iconTextRow}>
            <AppIcon name="location-on" color={AppColors.homeTextMuted} size={12} />
            <AppText numberOfLines={1} style={styles.iconText}>
              {post.location}
            </AppText>
          </View>
          <AppText numberOfLines={1} style={styles.tributeTarget}>
            {post.tributeTarget}
          </AppText>
        </View>
        <View style={styles.postMeta}>
          <View style={styles.badge}>
            <AppText style={styles.badgeText}>{post.badgeLabel}</AppText>
          </View>
          <AppText style={styles.timeAgo}>{post.timeAgo}</AppText>
        </View>
      </View>
      <AppText style={styles.postContent}>{post.content}</AppText>
      <LineBreak height={1.2} />
      <Image source={post.postImage} style={styles.postImage} />
      <PostActions post={post} />
    </View>
  </View>
);

const PostActions = ({ post }) => (
  <View>
    <View style={styles.postStats}>
      <AppIcon name="favorite" color={AppColors.white} size={14} />
      <AppText style={styles.statText}>{post.likeCount}</AppText>
      <AppText style={styles.commentCount}>{post.commentCount}</AppText>
    </View>
    <View style={styles.divider} />
    <View style={styles.actionRow}>
      <InteractionButton icon="favorite-border" label="Love" />
      <InteractionButton icon="chat-bubble-outline" label="Comment" />
      <InteractionButton icon="share" label="Share" />
    </View>
  </View>
);

const InteractionButton = ({ icon, label }) => (
  <TouchableOpacity activeOpacity={0.82} style={styles.interactionBtn}>
    <AppIcon name={icon} color={AppColors.white} size={20} />
    <AppText style={styles.interactionText}>{label}</AppText>
  </TouchableOpacity>
);

const SponsoredCard = ({ ad }) => (
  <View style={styles.cardShell}>
    <View style={styles.adCard}>
      <View style={styles.sponsoredBadge}>
        <AppText style={styles.sponsoredText}>Sponsored</AppText>
      </View>
      <LineBreak height={1.2} />
      <View style={styles.adRow}>
        <Image source={ad.image} style={styles.adImage} />
        <View style={styles.adCopy}>
          <AppText numberOfLines={2} style={styles.adTitle}>
            {ad.title}
          </AppText>
          <AppText numberOfLines={2} style={styles.adSubtitle}>
            {ad.subtitle}
          </AppText>
          <TouchableOpacity activeOpacity={0.82} style={styles.adButton}>
            <AppText style={styles.adButtonText}>{ad.ctaText}</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.homeBody,
  },
  scrollWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingBottom: responsiveHeight(8),
  },
  filterSection: {
    paddingVertical: responsiveHeight(1.6),
    backgroundColor: 'rgba(255,255,255,0.96)',
  },
  filterContent: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5.8),
  },
  filterChip: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: responsiveWidth(2.9),
    paddingHorizontal: responsiveWidth(3.86),
    paddingVertical: responsiveHeight(0.85),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(4,47,103,0.22)',
  },
  filterChipActive: {
    backgroundColor: AppColors.themeColor,
    borderColor: AppColors.themeColor,
  },
  filterText: {
    color: AppColors.themeColor,
    fontSize: responsiveFontSize(1.18),
    marginLeft: responsiveWidth(1.8),
  },
  filterTextActive: {
    color: AppColors.white,
    fontWeight: '700',
  },
  cardShell: {
    paddingHorizontal: responsiveWidth(5.8),
  },
  shareMemoryCard: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    backgroundColor: AppColors.memorialCard,
  },
  shareCopy: {
    flex: 1,
    marginHorizontal: responsiveWidth(2.9),
  },
  shareTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
  },
  shareSub: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.1),
    marginTop: responsiveHeight(0.35),
  },
  smallPostBtn: {
    paddingHorizontal: responsiveWidth(3.86),
    paddingVertical: responsiveHeight(0.85),
    borderRadius: 100,
    backgroundColor: AppColors.onboardingButton,
  },
  smallPostText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.08),
    fontWeight: '700',
  },
  postCard: {
    overflow: 'hidden',
    marginBottom: responsiveHeight(2),
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    backgroundColor: AppColors.memorialCard,
  },
  postTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
  },
  avatar: {
    width: responsiveWidth(11.6),
    height: responsiveWidth(11.6),
    borderRadius: responsiveWidth(5.8),
    backgroundColor: AppColors.memorialMutedButton,
  },
  postAuthor: {
    flex: 1,
    marginLeft: responsiveWidth(2.9),
  },
  authorName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.45),
    fontWeight: '700',
  },
  iconTextRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: responsiveHeight(0.35),
  },
  iconText: {
    color: AppColors.homeTextMuted,
    flex: 1,
    fontSize: responsiveFontSize(1.05),
    marginLeft: responsiveWidth(1),
  },
  tributeTarget: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.05),
    fontStyle: 'italic',
    marginTop: responsiveHeight(0.25),
  },
  postMeta: {
    alignItems: 'flex-end',
    marginLeft: responsiveWidth(2),
  },
  badge: {
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.4),
    borderRadius: 6,
    backgroundColor: AppColors.memorialMutedButton,
  },
  badgeText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(0.95),
    fontWeight: '700',
  },
  timeAgo: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(0.98),
    marginTop: responsiveHeight(0.45),
  },
  postContent: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.28),
    lineHeight: responsiveHeight(2.25),
    paddingHorizontal: responsiveWidth(3.86),
  },
  postImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  postStats: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
  },
  statText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.05),
    marginLeft: responsiveWidth(1),
    marginRight: responsiveWidth(4),
  },
  commentCount: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.05),
  },
  divider: {
    height: 1,
    backgroundColor: AppColors.homeBorder,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: responsiveHeight(0.8),
  },
  interactionBtn: {
    alignItems: 'center',
    flex: 1,
  },
  interactionText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.05),
    marginTop: responsiveHeight(0.35),
  },
  adCard: {
    marginBottom: responsiveHeight(2),
    padding: responsiveWidth(3.86),
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    backgroundColor: AppColors.memorialCard,
  },
  sponsoredBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.4),
    borderRadius: 4,
    backgroundColor: AppColors.memorialMutedButton,
  },
  sponsoredText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(0.95),
    fontWeight: '700',
  },
  adRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  adImage: {
    width: responsiveWidth(19.3),
    height: responsiveWidth(19.3),
    borderRadius: 8,
  },
  adCopy: {
    flex: 1,
    marginLeft: responsiveWidth(2.9),
  },
  adTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.45),
    fontWeight: '700',
  },
  adSubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.15),
    lineHeight: responsiveHeight(1.75),
    marginTop: responsiveHeight(0.35),
  },
  adButton: {
    alignSelf: 'flex-start',
    marginTop: responsiveHeight(0.8),
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.65),
    borderRadius: 20,
    backgroundColor: AppColors.onboardingButton,
  },
  adButtonText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.05),
    fontWeight: '700',
  },
  emptyText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
    textAlign: 'center',
  },
  loadMoreButton: {
    marginHorizontal: responsiveWidth(5.8),
    marginTop: responsiveHeight(0.4),
    backgroundColor: AppColors.onboardingButton,
  },
});

export default UserMostLovedMemoriesScreen;
