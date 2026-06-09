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

const ForgotPasswordScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const role = route?.params?.role || 'user';

  const handlePasswordReset = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      showToast('Email required', 'Please enter your email address.');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      showToast('Invalid email', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('EmailConfirmation', {
        email: trimmedEmail,
        purpose: 'reset-password',
        role,
      });
    }, 800);
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
        <AppText variant="title" style={styles.title}>Forgot Password?</AppText>
        <LineBreak height={1} />
        <AppText variant="bodyDim" style={styles.subtitle}>
          No worries! Enter your email and we'll send you a reset link.
        </AppText>
      </View>

      <LineBreak height={4.9} />
      <View style={styles.form}>
        <AppText variant="label" style={styles.label}>Email Address</AppText>
        <LineBreak height={1} />
        <AppTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          iconName="email"
        />

        <LineBreak height={4.9} />
        <AppButton
          isLoading={isLoading}
          onPress={handlePasswordReset}
          style={styles.submitButton}>
          Send Reset Link
        </AppButton>
      </View>

      <LineBreak height={3.9} />
      <View style={styles.footer}>
        <AppText variant="bodyDim" style={styles.footerMuted}>
          Remember your password?{' '}
        </AppText>
        <Pressable onPress={() => navigation.goBack()}>
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

export default ForgotPasswordScreen;
