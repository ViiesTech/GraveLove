import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useUpdateClientProfilePasswordMutation } from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const options = [
  ['lock-outline', 'Change Password', 'change-password', false],
  ['shield', 'Privacy Policy', 'PrivacyPolicy', false],
  ['warning-amber', 'Delete Account', null, true],
];

const PrivacySecurityScreen = ({ navigation }) => {
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatePassword, { isLoading }] = useUpdateClientProfilePasswordMutation();

  const handleOptionPress = routeName => {
    if (routeName === 'change-password') {
      setIsPasswordFormOpen(value => !value);
      return;
    }

    if (!routeName) {
      navigation.goBack();
      return;
    }

    navigation.navigate(routeName);
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Missing details', 'Please fill all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Password mismatch', 'New password and confirmation do not match.');
      return;
    }

    try {
      const response = await updatePassword({
        current_password: currentPassword,
        new_password: newPassword,
        password_confirmation: confirmPassword,
      }).unwrap();

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsPasswordFormOpen(false);
      showToast('Password updated', response?.message || 'Your password has been updated.');
    } catch (error) {
      showToast('Password update failed', error?.message || 'Unable to update password.');
    }
  };

  return (
    <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Privacy & Security"
        subtitle="Manage your account security"
        titleIconName="lock-outline"
        titleIconSet="ion"
        height={responsiveHeight(22)}
      />
      <View style={styles.body}>
        <AppText style={styles.sectionTitle}>Security Settings</AppText>
        <LineBreak height={1.6} />
        {options.map(item => (
          <View key={item[1]}>
            <GlassCard
              onPress={() => handleOptionPress(item[2])}
              contentStyle={styles.optionCard}>
              <View style={styles.iconCircle}>
                <AppIcon name={item[0]} color={item[3] ? AppColors.red : AppColors.themeColor} size={24} />
              </View>
              <AppText style={[styles.optionTitle, item[3] && styles.destructive]}>{item[1]}</AppText>
            </GlassCard>
            {item[2] === 'change-password' && isPasswordFormOpen ? (
              <PasswordForm
                confirmPassword={confirmPassword}
                currentPassword={currentPassword}
                isLoading={isLoading}
                newPassword={newPassword}
                onConfirmPassword={setConfirmPassword}
                onCurrentPassword={setCurrentPassword}
                onNewPassword={setNewPassword}
                onSubmit={handleUpdatePassword}
              />
            ) : null}
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
};

const PasswordForm = ({
  confirmPassword,
  currentPassword,
  isLoading,
  newPassword,
  onConfirmPassword,
  onCurrentPassword,
  onNewPassword,
  onSubmit,
}) => (
  <GlassCard contentStyle={styles.passwordCard}>
    <PasswordField label="Current Password" onChangeText={onCurrentPassword} value={currentPassword} />
    <PasswordField label="New Password" onChangeText={onNewPassword} value={newPassword} />
    <PasswordField label="Confirm Password" onChangeText={onConfirmPassword} value={confirmPassword} />
    <LineBreak height={1.2} />
    <AppButton isLoading={isLoading} onPress={onSubmit} style={styles.updateButton}>
      Update Password
    </AppButton>
  </GlassCard>
);

const PasswordField = ({ label, ...props }) => (
  <View style={styles.passwordField}>
    <AppText style={styles.passwordLabel}>{label}</AppText>
    <LineBreak height={0.8} />
    <AppTextInput
      {...props}
      placeholder="........"
      secureTextEntry
      inputStyle={styles.passwordInputText}
      style={styles.passwordInput}
    />
  </View>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55) },
  optionCard: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1.6), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  iconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11), height: responsiveWidth(11), borderRadius: responsiveWidth(5.5), backgroundColor: AppColors.white },
  optionTitle: { flex: 1, color: AppColors.white, fontSize: responsiveFontSize(1.5), fontWeight: '600', marginLeft: responsiveWidth(3.8) },
  destructive: { color: AppColors.white },
  passwordCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, marginBottom: responsiveHeight(1.6) },
  passwordField: { marginBottom: responsiveHeight(1.4) },
  passwordLabel: { color: AppColors.white, fontSize: responsiveFontSize(1.25) },
  passwordInput: { borderColor: AppColors.homeBorder, height: responsiveHeight(5.2) },
  passwordInputText: { color: AppColors.white, paddingHorizontal: responsiveWidth(3.8) },
  updateButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 16, width: '100%' },
});

export default PrivacySecurityScreen;
