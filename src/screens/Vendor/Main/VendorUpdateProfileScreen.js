import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const bullets = [
  'Clients will post jobs from their app',
  'Jobs matching your services will appear in your dashboard',
  'Review job details and accept or decline',
  'Complete tasks and receive payments',
];

const VendorUpdateProfileScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('Garden Care Services');
  const [experience, setExperience] = useState('5 Years');
  const [location, setLocation] = useState('Forest Lawn Memorial Park');
  const [phone, setPhone] = useState('+1 (555) 880-1200');

  return (
    <ScreenWrapper
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.goBack()}>
          <AppIcon name="arrow-back" color={AppColors.white} size={24} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Setup Your Profile</AppText>
      </View>

      <View style={styles.avatarWrap}>
        <TouchableOpacity activeOpacity={0.82} style={styles.avatar}>
          <AppIcon name="person" color={AppColors.themeColor} size={48} />
          <View style={styles.cameraBadge}>
            <AppIcon name="photo-camera" color={AppColors.white} size={16} />
          </View>
        </TouchableOpacity>
        <AppText style={styles.uploadText}>Upload Profile Picture</AppText>
      </View>

      <ProfileField
        label="Business Name *"
        value={businessName}
        onChangeText={setBusinessName}
        placeholder="Enter your business name"
      />
      <ProfileField
        label="Years of Experience"
        value={experience}
        onChangeText={setExperience}
        placeholder="e.g., 5 Years"
      />
      <ProfileField
        label="Service Location *"
        value={location}
        onChangeText={setLocation}
        placeholder="City, State"
      />
      <ProfileField
        keyboardType="phone-pad"
        label="Phone Number *"
        value={phone}
        onChangeText={setPhone}
        placeholder="+1 (555) 000-0000"
      />

      <GlassCard contentStyle={styles.howCard}>
        <AppText style={styles.howTitle}>How it works</AppText>
        <LineBreak height={1.2} />
        {bullets.map(item => (
          <View key={item} style={styles.bulletRow}>
            <AppText style={styles.bulletDot}>{'\u2022'}</AppText>
            <AppText style={styles.bulletText}>{item}</AppText>
          </View>
        ))}
      </GlassCard>

      <LineBreak height={1.4} />
      <AppText style={styles.required}>* Required fields</AppText>
      <LineBreak height={1.8} />
      <AppButton style={styles.primaryButton} onPress={() => navigation.goBack()}>
        Update Profile
      </AppButton>
    </ScreenWrapper>
  );
};

const ProfileField = ({ label, ...inputProps }) => (
  <View style={styles.field}>
    <AppText style={styles.label}>{label}</AppText>
    <LineBreak height={0.7} />
    <AppTextInput
      {...inputProps}
      gradientColors={['rgba(4,47,103,0.5)', 'rgba(4,47,103,0.5)']}
      style={styles.input}
      inputStyle={styles.inputText}
    />
  </View>
);

const styles = StyleSheet.create({
  content: {
    padding: responsiveWidth(5),
    paddingBottom: responsiveHeight(6),
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: responsiveHeight(3),
  },
  headerTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.15),
    marginLeft: responsiveWidth(4),
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: responsiveWidth(12.5),
    backgroundColor: AppColors.white,
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    borderWidth: 2,
    borderColor: AppColors.themeColor,
    backgroundColor: AppColors.onboardingButton,
  },
  uploadText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.3),
    marginTop: responsiveHeight(0.8),
  },
  field: {
    marginBottom: responsiveHeight(1.8),
  },
  label: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.42),
  },
  input: {
    height: responsiveHeight(4.8),
    borderRadius: 8,
    borderColor: AppColors.homeBorder,
  },
  inputText: {
    paddingHorizontal: responsiveWidth(3.5),
    fontSize: responsiveFontSize(1.32),
  },
  howCard: {
    marginTop: responsiveHeight(1),
    backgroundColor: 'rgba(4,47,103,0.5)',
    borderColor: AppColors.homeBorder,
  },
  howTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.72),
    fontWeight: '700',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(0.8),
  },
  bulletDot: {
    width: responsiveWidth(5),
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
  },
  bulletText: {
    flex: 1,
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.25),
    lineHeight: responsiveFontSize(1.75),
  },
  required: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: AppColors.onboardingButton,
    borderRadius: 12,
  },
});

export default VendorUpdateProfileScreen;
