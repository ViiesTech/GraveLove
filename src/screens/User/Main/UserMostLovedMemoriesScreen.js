import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {
  useCommentOnClientPostMutation,
  useGetClientMemorialPostsQuery,
  useGetClientMemorialsQuery,
  useReactToClientPostMutation,
  useShareClientPostMutation,
} from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const filters = ['Recent', 'Most Loved'];

const firstValue = (...values) => values.find(value => value !== undefined && value !== null && value !== '') || '';
const remoteImage = (url, fallback) => (url ? { uri: url } : fallback);

const getSelectedMemorial = memorials => {
  if (!memorials?.length) {
    return null;
  }
  return memorials.find(item => item?.is_selected === true || item?.selected === true) || memorials[0];
};

const mapCommunityPost = (post, selectedMemorial) => {
  const likes = firstValue(post?.likes_count, post?.reactions_count, post?.hearts, 0);
  const comments = firstValue(post?.comments_count, post?.comments, 0);
  const image = firstValue(post?.image_url, post?.image, post?.photo_url, post?.photo);
  return {
    badgeLabel: firstValue(post?.category, post?.type, 'Tribute'),
    commentCount: `${comments} comments`,
    content: firstValue(post?.body, post?.content, post?.message, ''),
    id: firstValue(post?.id, post?.created_at),
    likeCount: `${likes}`,
    location: firstValue(post?.location, post?.memorial?.cemetery_name, selectedMemorial?.cemetery_name, ''),
    postImage: remoteImage(image, AppAssets.images.userDashboardFront),
    timeAgo: firstValue(post?.time_ago, post?.created_at_human, post?.created_at, ''),
    tributeTarget: firstValue(post?.title, `In loving memory of ${firstValue(selectedMemorial?.name, selectedMemorial?.full_name, 'Loved One')}`),
    userImage: remoteImage(firstValue(post?.user?.avatar_url, post?.user?.profile_picture, post?.author?.profile_picture), AppAssets.images.profilePic),
    userName: firstValue(post?.author_name, post?.user?.name, post?.author?.name, 'Community Member'),
  };
};

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
  const [commentPost, setCommentPost] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const { data: memorials = [], isLoading: isMemorialsLoading, isFetching: isMemorialsFetching } = useGetClientMemorialsQuery();
  const selectedMemorial = getSelectedMemorial(memorials);
  const memorialId = firstValue(selectedMemorial?.id, selectedMemorial?.memorial_id);
  const { data: postsData = [], isLoading, isFetching, isError } = useGetClientMemorialPostsQuery(memorialId, { skip: !memorialId });
  const isLoadingCommunity = isMemorialsLoading || isMemorialsFetching || isLoading || isFetching;
  const [reactToPost] = useReactToClientPostMutation();
  const [commentOnPost, { isLoading: isCommenting }] = useCommentOnClientPostMutation();
  const [sharePost] = useShareClientPostMutation();
  const communityPosts = useMemo(
    () => postsData.map(post => mapCommunityPost(post, selectedMemorial)),
    [postsData, selectedMemorial],
  );

  useEffect(() => {
    if (!memorialId) {
      console.log('[COMMUNITY STORIES SKIPPED]', {
        memorialsCount: memorials.length,
        reason: 'No memorial id available',
      });
      return;
    }
    console.log('[COMMUNITY STORIES RESPONSE]', {
      memorialId,
      posts: postsData,
      total: postsData.length,
    });
  }, [memorialId, memorials.length, postsData]);

  const feed = useMemo(() => {
    const sortedPosts =
      selectedFilter === 'Most Loved'
        ? [...communityPosts].sort(
            (a, b) => Number(b.likeCount) - Number(a.likeCount),
          )
        : communityPosts;

    if (!sortedPosts.length) {
      return [];
    }

    const mixed = [];
    mixed.push({ data: sortedPosts[0], type: 'post' });
    mixed.push({ data: ads[0], type: 'ad' });
    sortedPosts.slice(1).forEach((post, index) => {
      mixed.push({ data: post, type: 'post' });
      if ((index + 1) % 2 === 0) {
        mixed.push({ data: ads[(index + 1) % ads.length], type: 'ad' });
      }
    });
    return mixed;
  }, [communityPosts, selectedFilter]);

  const handleLove = async post => {
    if (!post?.id) {
      return;
    }
    try {
      await reactToPost({ postId: post.id, body: { reaction: 'heart' } }).unwrap();
    } catch (error) {
      showToast('Community', error?.message || 'Unable to react right now');
    }
  };

  const handleShare = async post => {
    if (!post?.id) {
      return;
    }
    try {
      await sharePost({ postId: post.id, body: { channel: 'app' } }).unwrap();
      showToast('Post shared successfully');
    } catch (error) {
      showToast('Community', error?.message || 'Unable to share right now');
    }
  };

  const openComment = post => {
    setCommentPost(post);
    setCommentBody('');
  };

  const closeComment = () => {
    setCommentPost(null);
    setCommentBody('');
  };

  const handleComment = async () => {
    const body = commentBody.trim();
    if (!body || !commentPost?.id) {
      return;
    }
    try {
      await commentOnPost({ postId: commentPost.id, body: { body } }).unwrap();
      showToast('Comment posted');
      closeComment();
    } catch (error) {
      showToast('Community', error?.message || 'Unable to comment right now');
    }
  };

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
        {isLoadingCommunity ? <Loader /> : null}
        {isError ? <AppText style={styles.emptyText}>Unable to load community stories.</AppText> : null}
        {!isLoadingCommunity && !isError && feed.length ? (
          feed.map((item, index) =>
            item.type === 'post' ? (
              <CommunityPostCard
                key={item.data.id}
                onComment={() => openComment(item.data)}
                onLove={() => handleLove(item.data)}
                onShare={() => handleShare(item.data)}
                post={item.data}
              />
            ) : (
              <SponsoredCard key={`${item.data.title}-${index}`} ad={item.data} />
            ),
          )
        ) : !isLoadingCommunity && !isError ? (
          <AppText style={styles.emptyText}>No community stories yet.</AppText>
        ) : null}
        <AppButton style={styles.loadMoreButton}>Load More Stories</AppButton>
      </ScreenWrapper>
      <CommentModal
        body={commentBody}
        loading={isCommenting}
        onChangeBody={setCommentBody}
        onClose={closeComment}
        onSubmit={handleComment}
        visible={Boolean(commentPost)}
      />
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
              name={filter === 'Recent' ? 'access-time' : 'trending-up'}
              color={AppColors.white}
              size={filter === 'Recent' ? 16 : 18}
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
      <View style={styles.shareIconCircle}>
        <AppIcon name="local-florist" color={AppColors.memorialCard} size={responsiveWidth(5.8)} />
      </View>
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

const Loader = () => (
  <View style={styles.loaderWrap}>
    <ActivityIndicator color={AppColors.onboardingButton} size="large" />
  </View>
);

const CommunityPostCard = ({ onComment, onLove, onShare, post }) => (
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
      <PostActions onComment={onComment} onLove={onLove} onShare={onShare} post={post} />
    </View>
  </View>
);

const PostActions = ({ onComment, onLove, onShare, post }) => (
  <View>
    <View style={styles.postStats}>
      <AppIcon name="favorite" color={AppColors.white} size={14} />
      <AppText style={styles.statText}>{post.likeCount}</AppText>
      <AppText style={styles.commentCount}>{post.commentCount}</AppText>
    </View>
    <View style={styles.divider} />
    <View style={styles.actionRow}>
      <InteractionButton icon="favorite-border" label="Love" onPress={onLove} />
      <InteractionButton icon="chat-bubble-outline" label="Comment" onPress={onComment} />
      <InteractionButton icon="share" label="Share" onPress={onShare} />
    </View>
  </View>
);

const InteractionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.interactionBtn}>
    <AppIcon name={icon} color={AppColors.white} size={20} />
    <AppText style={styles.interactionText}>{label}</AppText>
  </TouchableOpacity>
);

const CommentModal = ({ body, loading, onChangeBody, onClose, onSubmit, visible }) => (
  <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
    <View style={styles.commentBackdrop}>
      <View style={styles.commentModal}>
        <View style={styles.commentHeader}>
          <AppText style={styles.commentTitle}>Add Comment</AppText>
          <TouchableOpacity activeOpacity={0.75} onPress={onClose}>
            <AppIcon name="close" color={AppColors.homeTextMuted} size={20} />
          </TouchableOpacity>
        </View>
        <LineBreak height={1.6} />
        <TextInput
          multiline
          value={body}
          onChangeText={onChangeBody}
          placeholder="Write your comment..."
          placeholderTextColor={AppColors.homeTextMuted}
          style={styles.commentInput}
        />
        <LineBreak height={1.8} />
        <TouchableOpacity
          activeOpacity={0.82}
          disabled={loading || !body.trim()}
          onPress={onSubmit}
          style={[styles.commentButton, (loading || !body.trim()) && styles.commentButtonDisabled]}
        >
          <AppText style={styles.commentButtonText}>{loading ? 'Posting...' : 'Post'}</AppText>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
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
    backgroundColor: AppColors.memorialCard,
  },
  filterContent: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5.8),
  },
  filterChip: {
    alignItems: 'center',
    borderColor: '#102D5B',
    borderWidth: 1,
    flexDirection: 'row',
    marginRight: responsiveWidth(2.9),
    paddingHorizontal: responsiveWidth(4.2),
    paddingVertical: responsiveHeight(1),
    borderRadius: 100,
  },
  filterChipActive: {
    backgroundColor: AppColors.onboardingButton,
    borderColor: AppColors.onboardingButton,
  },
  filterText: {
    color: AppColors.white,
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
  shareIconCircle: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(5.2),
    height: responsiveWidth(10.4),
    justifyContent: 'center',
    width: responsiveWidth(10.4),
  },
  shareTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
  shareSub: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.22),
    marginTop: responsiveHeight(0.35),
  },
  smallPostBtn: {
    paddingHorizontal: responsiveWidth(3.86),
    paddingVertical: responsiveHeight(0.95),
    borderRadius: 100,
    backgroundColor: AppColors.white,
  },
  smallPostText: {
    color: AppColors.memorialCard,
    fontSize: responsiveFontSize(1.16),
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
    marginBottom: responsiveHeight(1.8),
    marginTop: responsiveHeight(2.2),
    textAlign: 'center',
  },
  loaderWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(3),
  },
  loadMoreButton: {
    marginHorizontal: responsiveWidth(5.8),
    marginTop: responsiveHeight(0.4),
    backgroundColor: AppColors.onboardingButton,
  },
  commentBackdrop: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.55)', flex: 1, justifyContent: 'center', padding: responsiveWidth(5.8) },
  commentModal: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 24, borderWidth: 0.5, padding: responsiveWidth(5.8), width: '100%' },
  commentHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  commentTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  commentInput: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 16, color: AppColors.white, fontSize: responsiveFontSize(1.3), minHeight: responsiveHeight(12), padding: responsiveWidth(4), textAlignVertical: 'top' },
  commentButton: { alignItems: 'center', backgroundColor: AppColors.onboardingButton, borderRadius: 24, height: responsiveHeight(5.4), justifyContent: 'center' },
  commentButtonDisabled: { opacity: 0.55 },
  commentButtonText: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
});

export default UserMostLovedMemoriesScreen;
