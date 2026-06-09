import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
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

const EditProfileScreen = ({ navigation }) => (
  <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
    <AppImageHeader
      image={AppAssets.images.userDashboardFront}
      onBack={() => navigation.goBack()}
      title="Edit Profile"
      subtitle="Update your personal information"
      height={responsiveHeight(25.8)}
    />

    <View style={styles.avatarWrap}>
      <Image source={AppAssets.images.profilePic} style={styles.avatar} />
      <View style={styles.cameraBadge}>
        <AppIcon name="photo-camera" color={AppColors.white} size={18} />
      </View>
    </View>
    <AppText style={styles.photoHint}>Tap to change photo</AppText>

    <LineBreak height={2.4} />
    <Field label="Full Name" icon="person-outline" placeholder="Sarah Thompson" />
    <Field label="Email Address" icon="email" placeholder="sarah.thompson@email.com" helper="We'll send booking confirmations to this email" keyboardType="email-address" />
    <Field label="Phone Number" icon="phone" placeholder="+1 (555) 123-4567" helper="Vendors may contact you at this number" keyboardType="phone-pad" />

    <GlassCard contentStyle={styles.privacyBox}>
      <AppText style={styles.privacyText}>
        Your information is kept secure and will only be shared with vendors when you book a service.
      </AppText>
    </GlassCard>

    <View style={styles.buttonRow}>
      <AppButton style={styles.secondaryButton} onPress={() => navigation.goBack()}>Update</AppButton>
      <AppButton style={styles.cancelButton} textStyle={styles.cancelText} onPress={() => navigation.goBack()}>Cancel</AppButton>
    </View>
  </ScreenWrapper>
);

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
});

export default EditProfileScreen;
