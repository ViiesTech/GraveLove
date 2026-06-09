import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import LineBreak from '../components/LineBreak';
import OtpInput from '../components/OtpInput';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppAssets } from '../utils/AppAssets';
import { AppColors } from '../utils/AppColors';
import { showToast } from '../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const RESEND_SECONDS = 60;

const EmailConfirmationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [isLoading, setIsLoading] = useState(false);

  const email = route?.params?.email || 'your@email.com';
  const purpose = route?.params?.purpose || 'email-verification';
  const role = route?.params?.role || 'user';
  const canResend = resendTimer === 0;

  useEffect(() => {
    if (resendTimer === 0) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setResendTimer(value => Math.max(value - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendTimer]);

  const navigateMain = routeName => {
    let rootNavigation = navigation;

    while (rootNavigation.getParent?.()) {
      rootNavigation = rootNavigation.getParent();
    }

    rootNavigation.navigate('MainStack', { screen: routeName });
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      showToast('Invalid code', 'Enter a 6-digit code.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (purpose === 'reset-password') {
        showToast('Code verified', 'Create your new password.');
        navigation.navigate('ResetPassword', { email, role });
        return;
      }

      showToast('Email verified', 'Your account verification is ready.');
      navigateMain(role === 'vendor' ? 'VendorMain' : 'UserMain');
    }, 700);
  };

  const handleResend = () => {
    if (!canResend) {
      return;
    }

    setResendTimer(RESEND_SECONDS);
    showToast('OTP resent', `A new code has been sent to ${email}.`);
  };

  return (
    <ScreenWrapper
      isGradient
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.container}>
      <Image
        source={AppAssets.images.authLogo}
        style={styles.logo}
        resizeMode="cover"
      />

      <LineBreak height={3.7} />
      <AppText variant="largeTitle" style={styles.title}>Verification</AppText>
      <LineBreak height={1.5} />
      <AppText variant="bodyDim" style={styles.subtitle}>
        Enter the 6-digit code sent to
      </AppText>
      <LineBreak height={0.5} />
      <AppText style={styles.email}>{email}</AppText>

      <LineBreak height={4.9} />
      <OtpInput value={otp} onChangeText={setOtp} style={styles.otpInput} />

      <LineBreak height={3.7} />
      <AppButton
        isLoading={isLoading}
        onPress={handleVerify}
        style={styles.verifyButton}>
        Verify Email
      </AppButton>

      <LineBreak height={2.95} />
      <View style={styles.resendRow}>
        <AppText variant="bodyDim" style={styles.resendMuted}>
          Didn't receive code?{' '}
        </AppText>
        <Pressable disabled={!canResend} onPress={handleResend}>
          <AppText style={[styles.resendAction, !canResend && styles.resendDisabled]}>
            {canResend ? 'Resend' : `Wait ${resendTimer}s`}
          </AppText>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(7.4),
    paddingBottom: responsiveHeight(4.9),
  },
  logo: {
    width: responsiveWidth(22),
    height: responsiveHeight(10.8),
    borderRadius: responsiveWidth(2),
  },
  title: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.55),
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
  },
  email: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  otpInput: {},
  verifyButton: {
    width: '100%',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendMuted: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
  },
  resendAction: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  resendDisabled: {
    color: 'rgba(248, 251, 255, 0.34)',
  },
});

export default EmailConfirmationScreen;
