import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppBackButton from '../components/AppBackButton';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import LineBreak from '../components/LineBreak';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppColors } from '../utils/AppColors';
import { showToast } from '../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const ResetPasswordScreen = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const role = route?.params?.role || 'user';

  const goToLogin = () => {
    if (role === 'vendor') {
      navigation.navigate('VendorLogin');
      return;
    }

    navigation.navigate('Login');
  };

  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      showToast('Missing password', 'Please enter and confirm your new password.');
      return;
    }

    if (password.length < 6) {
      showToast('Weak password', 'Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Password mismatch', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Password updated', 'Please sign in with your new password.');
      goToLogin();
    }, 700);
  };

  return (
    <ScreenWrapper
      isGradient
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.container}>
      <AppBackButton onPress={() => navigation.goBack()} />

      <LineBreak height={3} />
      <View style={styles.header}>
        <AppText variant="title" style={styles.title}>Reset Password</AppText>
        <LineBreak height={1} />
        <AppText variant="bodyDim" style={styles.subtitle}>
          Create a new password for your account.
        </AppText>
      </View>

      <LineBreak height={4.9} />
      <View style={styles.form}>
        <AppText variant="label" style={styles.label}>New Password</AppText>
        <LineBreak height={1} />
        <AppTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter new password"
          secureTextEntry={!isPasswordVisible}
          iconName="lock-outline"
          rightIconSet="ion"
          rightIconName={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
          onRightPress={() => setIsPasswordVisible(value => !value)}
        />

        <LineBreak height={2.45} />
        <AppText variant="label" style={styles.label}>Confirm Password</AppText>
        <LineBreak height={1} />
        <AppTextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Re-enter new password"
          secureTextEntry={!isConfirmPasswordVisible}
          iconName="lock-outline"
          rightIconSet="ion"
          rightIconName={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
          onRightPress={() => setIsConfirmPasswordVisible(value => !value)}
        />

        <LineBreak height={4.9} />
        <AppButton
          isLoading={isLoading}
          onPress={handleResetPassword}
          style={styles.submitButton}>
          Update Password
        </AppButton>
      </View>

      <LineBreak height={3.9} />
      <View style={styles.footer}>
        <AppText variant="bodyDim" style={styles.footerMuted}>
          Remember your password?{' '}
        </AppText>
        <Pressable onPress={goToLogin}>
          <AppText style={styles.footerLink}>Sign In</AppText>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(1.2),
    paddingBottom: responsiveHeight(4.9),
  },
  header: {},
  title: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.15),
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
    lineHeight: responsiveHeight(2.7),
  },
  form: {},
  label: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
  },
  submitButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerMuted: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
  },
  footerLink: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
});

export default ResetPasswordScreen;
