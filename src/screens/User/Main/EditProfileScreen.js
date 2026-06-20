import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {
  useGetClientProfileQuery,
  useUpdateClientProfileMutation,
} from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import { showToast } from '../../../utils/Toast';

const firstValue = (...values) => values.find(value => value !== undefined && value !== null && value !== '') || '';
const profileImageSource = image => (image?.uri ? { uri: image.uri } : image ? { uri: image } : AppAssets.images.profilePic);

const EditProfileScreen = ({ navigation }) => {
  const { data: profile, refetch: refetchProfile } = useGetClientProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateClientProfileMutation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const pickerSheetRef = useRef(null);
  const pickerSnapPoints = useMemo(() => ['30%'], []);

  useEffect(() => {
    if (!profile) {
      return;
    }
    setName(firstValue(profile?.full_name, profile?.name, profile?.user?.full_name, profile?.user?.name));
    setEmail(firstValue(profile?.email, profile?.user?.email));
    setPhone(firstValue(profile?.phone_number, profile?.phone, profile?.user?.phone_number, profile?.user?.phone));
    const image = firstValue(profile?.profile_picture, profile?.avatar_url, profile?.avatar, profile?.user?.profile_picture);
    setProfileImage(image ? { uri: image } : null);
  }, [profile]);

  const openPickerSheet = useCallback(() => {
    console.log('[EDIT PROFILE IMAGE PICKER OPEN]');
    pickerSheetRef.current?.present();
  }, []);

  const closePickerSheet = useCallback(() => {
    pickerSheetRef.current?.dismiss();
  }, []);

  const handlePickImage = async source => {
    closePickerSheet();
    const picker = source === 'camera' ? launchCamera : launchImageLibrary;

    setTimeout(async () => {
      try {
      const result = await picker({
        includeBase64: false,
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel) {
        return;
      }
      if (result.errorCode) {
        showToast('Profile', result.errorMessage || (source === 'camera' ? 'Camera is not available on this device.' : 'Unable to open gallery.'));
        return;
      }
      const asset = result.assets?.[0];
      if (!asset?.uri) {
        showToast('Profile', source === 'camera' ? 'Camera did not return an image.' : 'Unable to select image.');
        return;
      }
      setProfileImage({
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        fileName: asset.fileName || `profile-${Date.now()}.jpg`,
      });
      } catch (error) {
        showToast('Profile', error?.message || 'Unable to open image picker.');
      }
    }, 260);
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      showToast('Profile', 'Full name is required.');
      return;
    }

    try {
      const response = await updateProfile({
        fields: {
          full_name: name.trim(),
          name: name.trim(),
          email: email.trim(),
          phone_number: phone.trim(),
          phone: phone.trim(),
        },
        profileImage: profileImage?.fileName ? profileImage : null,
      }).unwrap();
      console.log('[EDIT PROFILE RESPONSE]', response);
      const refreshedProfile = await refetchProfile().unwrap();
      console.log('[EDIT PROFILE REFRESHED PROFILE]', refreshedProfile);
      showToast('Profile', response?.message || 'Profile updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.log('[EDIT PROFILE ERROR]', error);
      showToast('Profile', error?.message || 'Unable to update profile.');
    }
  };

  return (
    <>
      <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
        <AppImageHeader
          image={AppAssets.images.userDashboardFront}
          onBack={() => navigation.goBack()}
          title="Edit Profile"
          subtitle="Update your personal information"
          height={responsiveHeight(25.8)}
        />

        <TouchableOpacity activeOpacity={0.82} hitSlop={12} onPress={openPickerSheet} style={styles.avatarWrap}>
          <Image source={profileImageSource(profileImage)} style={styles.avatar} />
          <View pointerEvents="none" style={styles.cameraBadge}>
            <AppIcon name="photo-camera" color={AppColors.white} size={18} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.82} hitSlop={10} onPress={openPickerSheet}>
          <AppText style={styles.photoHint}>Tap to change photo</AppText>
        </TouchableOpacity>

        <LineBreak height={2.4} />
        <Field label="Full Name" icon="person-outline" value={name} onChangeText={setName} placeholder="Sarah Thompson" />
        <Field label="Email Address" icon="email" value={email} onChangeText={setEmail} placeholder="sarah.thompson@email.com" helper="We'll send booking confirmations to this email" keyboardType="email-address" autoCapitalize="none" />
        <Field label="Phone Number" icon="phone" value={phone} onChangeText={setPhone} placeholder="+1 (555) 123-4567" helper="Vendors may contact you at this number" keyboardType="phone-pad" />

        <GlassCard contentStyle={styles.privacyBox}>
          <AppText style={styles.privacyText}>
            Your information is kept secure and will only be shared with vendors when you book a service.
          </AppText>
        </GlassCard>

        <View style={styles.buttonRow}>
          <AppButton isLoading={isLoading} style={styles.secondaryButton} onPress={handleUpdate}>Update</AppButton>
          <AppButton style={styles.cancelButton} textStyle={styles.cancelText} onPress={() => navigation.goBack()}>Cancel</AppButton>
        </View>
      </ScreenWrapper>
      <ImagePickerModal
        bottomSheetRef={pickerSheetRef}
        onClose={closePickerSheet}
        onCamera={() => handlePickImage('camera')}
        onGallery={() => handlePickImage('gallery')}
        snapPoints={pickerSnapPoints}
      />
    </>
  );
};

const Field = ({ helper, icon, label, ...props }) => (
  <View style={styles.field}>
    <View style={styles.labelRow}>
      <AppIcon name={icon} color={AppColors.white} size={16} />
      <AppText style={styles.label}>{label}</AppText>
    </View>
    <LineBreak height={0.85} />
    <AppTextInput inputStyle={styles.inputText} {...props} />
    {helper ? <AppText style={styles.helper}>{helper}</AppText> : null}
  </View>
);

const ImagePickerModal = ({ bottomSheetRef, onCamera, onClose, onGallery, snapPoints }) => {
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
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.dragHandle}
      handleStyle={styles.sheetHandle}
      enablePanDownToClose
      enableDynamicSizing={false}
      stackBehavior="push">
      <View style={styles.pickerCard}>
        <View style={styles.pickerHeader}>
          <AppText style={styles.pickerTitle}>Change Profile Photo</AppText>
          <TouchableOpacity activeOpacity={0.75} onPress={onClose}>
            <AppIcon name="close" color={AppColors.homeTextMuted} size={22} />
          </TouchableOpacity>
        </View>
        <LineBreak height={1.8} />
        <PickerOption icon="photo-camera" label="Take Photo" onPress={onCamera} />
        <LineBreak height={1.1} />
        <PickerOption icon="image" label="Choose from Gallery" onPress={onGallery} />
      </View>
    </BottomSheetModal>
  );
};

const PickerOption = ({ icon, label, onPress }) => (
  <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.pickerOption}>
    <View style={styles.pickerIcon}>
      <AppIcon name={icon} color={AppColors.white} size={22} />
    </View>
    <AppText style={styles.pickerOptionText}>{label}</AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  content: {
    paddingBottom: responsiveHeight(5),
  },
  avatarWrap: {
    alignSelf: 'center',
    marginTop: -responsiveHeight(6),
  },
  avatar: {
    width: responsiveWidth(29),
    height: responsiveWidth(29),
    borderRadius: responsiveWidth(14.5),
    borderWidth: 4,
    borderColor: AppColors.white,
  },
  cameraBadge: {
    position: 'absolute',
    right: responsiveWidth(1),
    bottom: responsiveWidth(1),
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(9),
    height: responsiveWidth(9),
    borderRadius: responsiveWidth(4.5),
    borderWidth: 2,
    borderColor: AppColors.white,
    backgroundColor: AppColors.themeColor,
  },
  photoHint: {
    alignSelf: 'center',
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.25),
    marginTop: responsiveHeight(1.2),
  },
  field: {
    marginHorizontal: responsiveWidth(5.8),
    marginBottom: responsiveHeight(2.35),
  },
  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.45),
    marginLeft: responsiveWidth(2),
  },
  inputText: {
    paddingHorizontal: responsiveWidth(4),
  },
  helper: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.15),
    marginTop: responsiveHeight(0.85),
  },
  privacyBox: {
    marginHorizontal: responsiveWidth(5.8),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  privacyText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    lineHeight: responsiveHeight(2.25),
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: responsiveWidth(3.8),
    marginHorizontal: responsiveWidth(5.8),
    marginTop: responsiveHeight(3),
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: AppColors.memorialCard,
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: AppColors.onboardingButton,
  },
  cancelText: {
    color: AppColors.white,
    fontWeight: '700',
  },
  sheetBackground: { backgroundColor: AppColors.memorialCard },
  sheetHandle: { paddingBottom: responsiveHeight(1.2), paddingTop: responsiveHeight(1.4) },
  dragHandle: { backgroundColor: 'rgba(255,255,255,0.28)', borderRadius: 2, height: 4, width: responsiveWidth(10) },
  pickerCard: {
    backgroundColor: AppColors.memorialCard,
    paddingBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5.8),
    width: '100%',
  },
  pickerHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
  },
  pickerOption: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    flexDirection: 'row',
    padding: responsiveWidth(4),
  },
  pickerIcon: {
    alignItems: 'center',
    backgroundColor: AppColors.onboardingButton,
    borderRadius: responsiveWidth(5),
    height: responsiveWidth(10),
    justifyContent: 'center',
    marginRight: responsiveWidth(3.5),
    width: responsiveWidth(10),
  },
  pickerOptionText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.4),
    fontWeight: '700',
  },
});

export default EditProfileScreen;
