import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import LineBreak from '../components/LineBreak';
import OtpInput from '../components/OtpInput';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppAssets } from '../utils/AppAssets';
import { AppColors } from '../utils/AppColors';
import { showToast } from '../utils/Toast';
import { setProfileCreated } from '../redux/slices/authSlice';
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from '../redux/api/authApi';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const RESEND_SECONDS = 60;

const EmailConfirmationScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [resendOtp] = useResendOtpMutation();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const email = route?.params?.email || 'your@email.com';
  const purpose = route?.params?.purpose || 'email-verification';
  const role = route?.params?.role || 'user';
  const userId = route?.params?.userId;
  const canResend = resendTimer === 0;
  const isResetPasswordFlow = purpose === 'reset-password';

  useEffect(() => {
    if (resendTimer === 0) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setResendTimer(value => Math.max(value - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendTimer]);

  const navigateMain = () => {
    let rootNavigation = navigation;

    while (rootNavigation.getParent?.()) {
      rootNavigation = rootNavigation.getParent();
    }

    rootNavigation.reset({
      index: 0,
      routes: [{ name: 'MainStack' }],
    });
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      showToast('Invalid code', 'Enter a 6-digit code.');
      return;
    }

    if (!userId) {
      showToast('Missing user', 'Unable to verify this account.');
      return;
    }

    try {
      const response = await verifyOtp({ otp, role, userId }).unwrap();
      showToast(
        'Email verified',
        response?.message || 'Your account verification is ready.',
      );
      if (role === 'vendor') {
        dispatch(setProfileCreated(true));
      }
      navigateMain();
    } catch (error) {
      showToast('Verification failed', error?.message || 'Invalid OTP.');
    }
  };

  const goToLogin = () => {
    navigation.navigate(role === 'vendor' ? 'VendorLogin' : 'Login');
  };

  const handleResend = async () => {
    if (!canResend) {
      return;
    }

    if (!userId) {
      showToast('Missing user', 'Unable to resend OTP.');
      return;
    }

    try {
      const response = await resendOtp(userId).unwrap();
      setResendTimer(RESEND_SECONDS);
      showToast('OTP resent', response?.message || `A new code has been sent to ${email}.`);
    } catch (error) {
      showToast('Resend failed', error?.message || 'Unable to resend OTP.');
    }
  };

  if (isResetPasswordFlow) {
    return (
      <ScreenWrapper
        isGradient
        isKeyboardAvoiding
        isScroll
        contentContainerStyle={styles.container}
      >
        <Image
          source={AppAssets.images.authLogo}
          style={styles.logo}
          resizeMode="cover"
        />

        <LineBreak height={3.7} />
        <AppText variant="largeTitle" style={styles.title}>
          Reset Link Sent
        </AppText>
        <LineBreak height={1.5} />
        <AppText variant="bodyDim" style={styles.resetSubtitle}>
          Password reset link sent to your email.
        </AppText>
        <LineBreak height={0.5} />
        <AppText style={styles.email}>{email}</AppText>
        <LineBreak height={4.9} />
        <AppButton onPress={goToLogin} style={styles.verifyButton}>
          Back to Sign In
        </AppButton>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      isGradient
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.container}
    >
      <Image
        source={AppAssets.images.authLogo}
        style={styles.logo}
        resizeMode="cover"
      />

      <LineBreak height={3.7} />
      <AppText variant="largeTitle" style={styles.title}>
        Verification
      </AppText>
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
        style={styles.verifyButton}
      >
        Verify Email
      </AppButton>

      <LineBreak height={2.95} />
      <View style={styles.resendRow}>
        <AppText variant="bodyDim" style={styles.resendMuted}>
          Didn't receive code?{' '}
        </AppText>
        <Pressable disabled={!canResend} onPress={handleResend}>
          <AppText
            style={[styles.resendAction, !canResend && styles.resendDisabled]}
          >
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
  resetSubtitle: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
    lineHeight: responsiveHeight(2.4),
    textAlign: 'center',
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
