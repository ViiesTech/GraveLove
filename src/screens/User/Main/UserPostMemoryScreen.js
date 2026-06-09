import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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

const categories = ['Tribute', 'Visit', 'Celebration', 'Memory', 'Gratitude'];

const UserPostMemoryScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tribute');

  return (
    <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Post a Memory"
        subtitle="Share a tribute with the community"
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

        <Field label="In Memory Of" placeholder="e.g., John Smith - Beloved Father" />
        <Field label="Cemetery Location (Optional)" placeholder="e.g., Green Meadows Cemetery" icon="location-on" />
        <AppText style={styles.label}>Your Memory</AppText>
        <LineBreak height={0.85} />
        <AppTextInput
          multiline
          placeholder="Share your thoughts, memories, or tribute..."
          style={styles.memoryField}
          inputStyle={styles.memoryInput}
        />
        <View style={styles.toolsRow}>
          <AppText style={styles.counter}>0 characters</AppText>
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
        <LineBreak height={2.6} />
        <AppButton
          style={styles.postButton}
          onPress={() => navigation.navigate('UserTabs', { screen: 'UserHome' })}>
          Share Memory
        </AppButton>
      </View>
    </ScreenWrapper>
  );
};

const Field = ({ icon, label, placeholder }) => (
  <View style={styles.field}>
    <View style={styles.labelRow}>
      {icon ? <AppIcon name={icon} color={AppColors.white} size={16} /> : null}
      <AppText style={styles.label}>{label}</AppText>
    </View>
    <LineBreak height={0.85} />
    <AppTextInput placeholder={placeholder} inputStyle={styles.inputText} />
  </View>
);

const PhotoButton = ({ icon, title }) => (
  <TouchableOpacity activeOpacity={0.82} style={styles.photoBtn}>
    <AppIcon name={icon} color={AppColors.white} size={24} />
    <AppText style={styles.photoText}>{title}</AppText>
  </TouchableOpacity>
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
  chip: { paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(0.9), borderRadius: 18, backgroundColor: AppColors.memorialCard, borderWidth: 0.5, borderColor: AppColors.homeBorder },
  chipActive: { backgroundColor: AppColors.onboardingButton, borderColor: AppColors.onboardingButton },
  chipText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2), fontWeight: '700' },
  chipTextActive: { color: AppColors.white },
  field: { marginBottom: responsiveHeight(1.8) },
  labelRow: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(1.5) },
  inputText: { paddingHorizontal: responsiveWidth(4) },
  memoryField: { height: responsiveHeight(16), alignItems: 'flex-start', borderRadius: 16, paddingTop: responsiveHeight(1.2) },
  memoryInput: { height: '100%', paddingHorizontal: responsiveWidth(4), textAlignVertical: 'top' },
  toolsRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(0.85) },
  counter: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1) },
  toolsIcons: { flexDirection: 'row', gap: responsiveWidth(4) },
  photoRow: { flexDirection: 'row', gap: responsiveWidth(3.8) },
  photoBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: responsiveHeight(8.2), borderRadius: 16, backgroundColor: AppColors.memorialCard, borderWidth: 0.5, borderColor: AppColors.homeBorder },
  photoText: { color: AppColors.white, fontSize: responsiveFontSize(1.25), marginTop: responsiveHeight(0.6), textAlign: 'center' },
  postButton: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
});

export default UserPostMemoryScreen;
