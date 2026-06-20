import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import {
  useCreateClientMemorialPostMutation,
  useGetClientMemorialsQuery,
  useSelectMemorialMutation,
} from '../../../redux/api/userApi';
import { showToast } from '../../../utils/Toast';

const categories = ['Tribute', 'Visit', 'Celebration', 'Memory', 'Gratitude'];
const firstValue = (...values) => values.find(value => value !== undefined && value !== null && value !== '') || '';
const getSelectedMemorial = memorials => memorials?.find(item => item?.is_selected === true || item?.selected === true) || memorials?.[0];

const UserPostMemoryScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tribute');
  const [memoryOf, setMemoryOf] = useState('');
  const [location, setLocation] = useState('');
  const [memory, setMemory] = useState('');
  const { data: memorials = [] } = useGetClientMemorialsQuery();
  const selectedMemorial = getSelectedMemorial(memorials);
  const memorialId = firstValue(selectedMemorial?.id, selectedMemorial?.memorial_id);
  const [selectMemorial] = useSelectMemorialMutation();
  const [createPost, { isLoading: isSubmitting }] = useCreateClientMemorialPostMutation();
  const shareSheetRef = useRef(null);
  const shareSnapPoints = useMemo(() => ['90%'], []);

  const openShareSheet = useCallback(() => {
    shareSheetRef.current?.present();
  }, []);

  const closeShareSheet = useCallback(() => {
    shareSheetRef.current?.dismiss();
  }, []);

  const handleShareMemory = async () => {
    const body = memory.trim();
    if (!memorialId) {
      showToast('Community', 'Please select a memorial first');
      return;
    }
    if (!body) {
      showToast('Community', 'Please write your memory');
      return;
    }

    try {
      if (selectedMemorial?.is_selected !== true && selectedMemorial?.selected !== true) {
        await selectMemorial(memorialId).unwrap();
      }
      await createPost({
        memorialId,
        body: {
          body,
          category: selectedCategory,
          location: location.trim(),
          title: memoryOf.trim(),
          visibility: 'family',
        },
      }).unwrap();
      openShareSheet();
    } catch (error) {
      showToast('Community', error?.message || 'Unable to post now');
    }
  };

  return (
    <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Share Your Memory"
        subtitle="Honor your loved one with a tribute"
        height={responsiveHeight(20.6)}
      />
      <View style={styles.body}>
        <View style={styles.userRow}>
          <Image source={AppAssets.images.profilePic} style={styles.avatar} />
          <View>
            <AppText style={styles.userName}>John</AppText>
            <AppText style={styles.userSub}>Posting to Community</AppText>
          </View>
        </View>

        <LineBreak height={2.4} />
        <AppText style={styles.label}>Category</AppText>
        <View style={styles.chipWrap}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              activeOpacity={0.82}
              onPress={() => setSelectedCategory(category)}
              style={[styles.chip, selectedCategory === category && styles.chipActive]}>
              <AppText style={[styles.chipText, selectedCategory === category && styles.chipTextActive]}>{category}</AppText>
            </TouchableOpacity>
          ))}
        </View>

        <Field label="In Memory Of" placeholder="e.g., John Smith - Beloved Father" value={memoryOf} onChangeText={setMemoryOf} />
        <Field label="Cemetery Location (Optional)" placeholder="e.g., Green Meadows Cemetery" icon="location-on" value={location} onChangeText={setLocation} />
        <AppText style={styles.label}>Your Memory</AppText>
        <LineBreak height={0.85} />
        <TextInput
          multiline
          value={memory}
          onChangeText={setMemory}
          placeholder="Share your thoughts, memories, or tribute..."
          placeholderTextColor="rgba(255,255,255,0.42)"
          selectionColor={AppColors.white}
          style={styles.memoryField}
        />
        <View style={styles.toolsRow}>
          <AppText style={styles.counter}>{memory.length} characters</AppText>
          <View style={styles.toolsIcons}>
            <AppIcon name="emoji-emotions" color={AppColors.homeTextMuted} size={20} />
            <AppIcon name="tag" color={AppColors.homeTextMuted} size={20} />
          </View>
        </View>

        <LineBreak height={2.2} />
        <AppText style={styles.label}>Photos</AppText>
        <LineBreak height={1.1} />
        <View style={styles.photoRow}>
          <PhotoButton icon="photo-camera" title="Take Photo" />
          <PhotoButton icon="image" title={'Choose from\nGallery'} />
        </View>

        <LineBreak height={2.4} />
        <View style={styles.guidelinesCard}>
          <View style={styles.guidelinesIcon}>
            <AppIcon name="info-outline" color={AppColors.themeColor} size={16} />
          </View>
          <View style={styles.guidelinesCopy}>
            <AppText style={styles.guidelinesTitle}>Community Guidelines</AppText>
            <LineBreak height={0.4} />
            <AppText style={styles.guidelinesText}>
              Your post will be visible to all Memorial Care community members. Please ensure your content is respectful and appropriate.
            </AppText>
          </View>
        </View>
        <LineBreak height={2.6} />
        <AppButton
          style={styles.postButton}
          disabled={isSubmitting}
          onPress={handleShareMemory}>
          {isSubmitting ? 'Sharing...' : 'Share Memory'}
        </AppButton>
      </View>
      <SharePostMemorySheet
        bottomSheetRef={shareSheetRef}
        onClose={closeShareSheet}
        snapPoints={shareSnapPoints}
      />
    </ScreenWrapper>
  );
};

const Field = ({ icon, label, onChangeText, placeholder, value }) => (
  <View style={styles.field}>
    <View style={styles.labelRow}>
      {icon ? <AppIcon name={icon} color={AppColors.white} size={16} /> : null}
      <AppText style={styles.label}>{label}</AppText>
    </View>
    <LineBreak height={0.85} />
    <AppTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      gradientColors={['#749FC6', '#749FC6']}
      style={styles.input}
      inputStyle={styles.inputText}
    />
  </View>
);

const PhotoButton = ({ icon, title }) => (
  <TouchableOpacity activeOpacity={0.82} style={styles.photoBtn}>
    <AppIcon name={icon} color="#91ABC6" size={24} />
    <AppText style={styles.photoText}>{title}</AppText>
  </TouchableOpacity>
);

const SharePostMemorySheet = ({ bottomSheetRef, onClose, snapPoints }) => {
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.45}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.shareSheetBackground}
      handleIndicatorStyle={styles.dragHandle}
      handleStyle={styles.sheetHandle}
      enablePanDownToClose
      keyboardBlurBehavior="restore"
      keyboardBehavior="interactive">
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={styles.shareScroll}
        contentContainerStyle={styles.shareScrollContent}>
        <View style={styles.previewCard}>
          <View style={styles.previewUserRow}>
            <Image source={AppAssets.images.profilePic} style={styles.previewAvatar} />
            <View>
              <AppText style={styles.previewName}>Sarah Johnson</AppText>
              <AppText style={styles.previewSub}>In loving memory of Robert Johnson</AppText>
            </View>
          </View>
          <LineBreak height={1.6} />
          <AppText style={styles.previewText}>
            Today marks one year since we said goodbye. Your laughter still echoes in our hearts...
          </AppText>
          <LineBreak height={1.6} />
          <Image source={AppAssets.images.headerImage} style={styles.previewImage} />
        </View>
        <LineBreak height={3.2} />
        <AppText style={styles.shareLabel}>Share via:</AppText>
        <LineBreak height={1.6} />
        <View style={styles.shareIconRow}>
          <ShareIcon icon="facebook" label="Facebook" />
          <ShareIcon icon="chat-bubble-outline" label="Twitter" />
          <ShareIcon icon="chat" label="WhatsApp" />
          <ShareIcon icon="email" label="Email" />
        </View>
        <LineBreak height={2.4} />
        <AppText style={styles.shareLabel}>Send to friends:</AppText>
        <LineBreak height={1.2} />
        <View style={styles.friendBox}>
          <View style={styles.friendIcon}>
            <AppIcon name="send" color={AppColors.white} size={20} />
          </View>
          <View>
            <AppText style={styles.previewName}>Send to Memorial Care Friends</AppText>
            <AppText style={styles.previewSub}>Share privately within the app</AppText>
          </View>
        </View>
        <LineBreak height={2.4} />
        <AppText style={styles.shareLabel}>Add a personal message (optional):</AppText>
        <LineBreak height={0.8} />
        <TextInput
          placeholder="Write a message to share with this memory..."
          placeholderTextColor={AppColors.homeTextMuted}
          style={styles.shareMessage}
        />
        <LineBreak height={2.4} />
        <AppText style={styles.shareLabel}>Or copy link:</AppText>
        <LineBreak height={0.8} />
        <View style={styles.copyRow}>
          <View style={styles.copyInput}>
            <AppText numberOfLines={1} style={styles.previewSub}>
              https://memorialcare.app/post/1...
            </AppText>
          </View>
          <TouchableOpacity activeOpacity={0.82} onPress={onClose} style={styles.copyButton}>
            <AppIcon name="content-copy" color={AppColors.white} size={16} />
            <AppText style={styles.copyText}>Copy</AppText>
          </TouchableOpacity>
        </View>
        <LineBreak height={3.2} />
        <View style={styles.disclaimer}>
          <AppIcon name="info-outline" color={AppColors.white} size={20} />
          <View style={styles.disclaimerCopy}>
            <AppText style={styles.previewName}>Sharing with Respect</AppText>
            <AppText style={styles.previewSub}>
              Please be thoughtful when sharing memories. Ensure you have permission to share content.
            </AppText>
          </View>
        </View>
      </BottomSheetScrollView>
      <View style={styles.sheetFooter}>
        <AppButton style={styles.postButton} onPress={onClose}>Cancel</AppButton>
      </View>
    </BottomSheetModal>
  );
};

const ShareIcon = ({ icon, label }) => (
  <View style={styles.shareIconItem}>
    <View style={styles.shareIconCircle}>
      <AppIcon name={icon} color={AppColors.themeColor} size={24} />
    </View>
    <AppText style={styles.shareIconLabel}>{label}</AppText>
  </View>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  userRow: { alignItems: 'center', flexDirection: 'row' },
  avatar: { width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(5), marginRight: responsiveWidth(3) },
  userName: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  userSub: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginTop: responsiveHeight(0.3) },
  label: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '600' },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: responsiveWidth(2.4), marginTop: responsiveHeight(1.2), marginBottom: responsiveHeight(2.4) },
  chip: { paddingHorizontal: responsiveWidth(4.4), paddingVertical: responsiveHeight(1.05), borderRadius: 16, backgroundColor: AppColors.memorialCard, borderWidth: 0.5, borderColor: AppColors.homeBorder },
  chipActive: { backgroundColor: AppColors.onboardingButton, borderColor: AppColors.onboardingButton },
  chipText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.32), fontWeight: '700' },
  chipTextActive: { color: AppColors.white },
  field: { marginBottom: responsiveHeight(1.8) },
  labelRow: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(1.5) },
  input: { backgroundColor: '#749FC6', borderColor: 'transparent', borderRadius: 12 },
  inputText: { color: AppColors.white, paddingHorizontal: responsiveWidth(4) },
  memoryField: { backgroundColor: '#749FC6', borderColor: 'transparent', borderRadius: 12, borderWidth: 0, color: AppColors.white, fontSize: responsiveFontSize(1.45), height: responsiveHeight(16), paddingHorizontal: responsiveWidth(4), paddingTop: responsiveHeight(1.2), textAlignVertical: 'top' },
  toolsRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(0.85) },
  counter: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1) },
  toolsIcons: { flexDirection: 'row', gap: responsiveWidth(4) },
  photoRow: { flexDirection: 'row', gap: responsiveWidth(3.8) },
  photoBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: responsiveHeight(8.2), borderRadius: 14, backgroundColor: '#6489B1', borderWidth: 0 },
  photoText: { color: '#91ABC6', fontSize: responsiveFontSize(1.25), fontWeight: '600', marginTop: responsiveHeight(0.6), textAlign: 'center' },
  guidelinesCard: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: responsiveWidth(4),
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    backgroundColor: AppColors.memorialCard,
  },
  guidelinesIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    borderRadius: responsiveWidth(3),
    backgroundColor: AppColors.white,
    marginRight: responsiveWidth(3),
  },
  guidelinesCopy: {
    flex: 1,
  },
  guidelinesTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.48),
    fontWeight: '700',
  },
  guidelinesText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.25),
    lineHeight: responsiveFontSize(1.82),
  },
  postButton: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
  shareSheetBackground: {
    backgroundColor: AppColors.memorialCard,
  },
  sheetHandle: {
    paddingBottom: responsiveHeight(1.2),
    paddingTop: responsiveHeight(1.4),
  },
  dragHandle: {
    width: responsiveWidth(10),
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  shareScroll: {
    flex: 1,
  },
  shareScrollContent: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingBottom: responsiveHeight(2.4),
  },
  sheetFooter: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingBottom: responsiveHeight(2),
    paddingTop: responsiveHeight(1.2),
    backgroundColor: AppColors.memorialCard,
  },
  previewCard: {
    padding: responsiveWidth(4),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  previewUserRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  previewAvatar: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    marginRight: responsiveWidth(3),
  },
  previewName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.25),
    fontWeight: '700',
  },
  previewSub: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1),
  },
  previewText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.22),
    lineHeight: responsiveFontSize(1.8),
  },
  previewImage: {
    width: '100%',
    height: responsiveHeight(14),
    borderRadius: 12,
  },
  shareLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.25),
  },
  shareIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  shareIconItem: {
    alignItems: 'center',
  },
  shareIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(6.5),
    backgroundColor: AppColors.white,
  },
  shareIconLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.05),
    marginTop: responsiveHeight(0.8),
  },
  friendBox: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(4),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  friendIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(4.5),
    marginRight: responsiveWidth(4),
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  shareMessage: {
    height: responsiveHeight(6.5),
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 12,
    color: AppColors.white,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  copyRow: {
    flexDirection: 'row',
    gap: responsiveWidth(3),
  },
  copyInput: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(4),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  copyButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(4),
    borderRadius: 12,
    backgroundColor: AppColors.onboardingButton,
  },
  copyText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.15),
    fontWeight: '700',
    marginLeft: responsiveWidth(2),
  },
  disclaimer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: responsiveWidth(3),
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  disclaimerCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3),
  },
});

export default UserPostMemoryScreen;
