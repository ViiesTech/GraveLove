import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AuthHeader from '../components/AuthHeader';
import AuthSocialButton from '../components/AuthSocialButton';
import LineBreak from '../components/LineBreak';
import ScreenWrapper from '../components/ScreenWrapper';
import { showToast } from '../utils/Toast';
import { AppAssets } from '../utils/AppAssets';
import { AppColors } from '../utils/AppColors';
import { useLoginUserMutation } from '../redux/api/authApi';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const getRootNavigation = () => {
    let rootNavigation = navigation;

    while (rootNavigation.getParent?.()) {
      rootNavigation = rootNavigation.getParent();
    }

    return rootNavigation;
  };

  const navigateMain = () => {
    getRootNavigation().reset({
      index: 0,
      routes: [{ name: 'MainStack' }],
    });
  };

  const navigateAuth = routeName => {
    getRootNavigation().navigate('AuthStack', { screen: routeName });
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      showToast('Missing details', 'Please enter your email and password.');
      return;
    }

    try {
      const response = await loginUser({
        email: email.trim(),
        password,
      }).unwrap();

      showToast('Login successful', response?.message || 'Welcome back.');
      navigateMain();
    } catch (error) {
      showToast('Login failed', error?.message || 'Invalid email or password.');
    }
  };

  return (
    <ScreenWrapper
      isGradient
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.scrollContent}
    >
      <AuthHeader title="Welcome Back" subtitle="Sign in to continue" />

      <LineBreak height={4.9} />
      <View style={styles.form}>
        <FieldLabel text="Email" />
        <LineBreak height={1} />
        <AppTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          iconName="email"
        />

        <LineBreak height={2.95} />
        <FieldLabel text="Password" />
        <LineBreak height={1} />
        <AppTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="........"
          secureTextEntry={!isPasswordVisible}
          iconName="lock-outline"
          rightIconSet="ion"
          rightIconName={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
          onRightPress={() => setIsPasswordVisible(value => !value)}
        />

        <Pressable
          style={styles.forgotButton}
          onPress={() =>
            navigation.navigate('ForgotPassword', { role: 'user' })
          }
        >
          <AppText style={styles.forgotText}>Forgot password?</AppText>
        </Pressable>

        <LineBreak height={1.2} />
        <AppButton
          isLoading={isLoading}
          onPress={handleSignIn}
          style={styles.signInButton}
        >
          Sign In
        </AppButton>
      </View>

      <LineBreak height={4.9} />
      <View style={styles.signupRow}>
        <AppText variant="bodyDim" style={styles.signupMuted}>
          Don't have an account?{' '}
        </AppText>
        <Pressable onPress={() => navigation.navigate('RoleSelection')}>
          <AppText style={styles.signupText}>Sign Up</AppText>
        </Pressable>
      </View>

      <LineBreak height={4.9} />
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <View style={styles.dividerLabel}>
          <AppText style={styles.dividerText}>Or continue with</AppText>
        </View>
        <View style={styles.divider} />
      </View>

      <LineBreak height={3.7} />
      <AuthSocialButton
        label="Apple ID"
        iconSvg={AppAssets.icons.appleLogo}
        style={styles.socialButton}
      />
      <LineBreak height={2} />
      <AuthSocialButton
        label="Google"
        iconSvg={AppAssets.icons.googleLogo}
        style={styles.googleButton}
      />

      <LineBreak height={2.45} />
      <Pressable
        style={styles.vendorButton}
        onPress={() => navigateAuth('VendorAuth')}
      >
        <AppText style={styles.vendorText}>Are you Vendor?</AppText>
      </Pressable>
    </ScreenWrapper>
  );
};

const FieldLabel = ({ text, style }) => (
  <AppText style={[styles.label, style]}>{text}</AppText>
);

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5.8),
    paddingVertical: responsiveHeight(4),
  },
  form: {
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
  },
  forgotButton: {
    alignSelf: 'flex-end',
    paddingVertical: responsiveHeight(1.5),
  },
  forgotText: {
    color: AppColors.forgotPass,
    fontSize: responsiveFontSize(1.52),
  },
  signInButton: {
    width: '100%',
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupMuted: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
  },
  signupText: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.border,
  },
  dividerLabel: {
    paddingHorizontal: responsiveWidth(3.9),
    paddingVertical: responsiveHeight(0.5),
    // borderRadius: 4,
    backgroundColor: 'rgba(248, 251, 255, 0.9)',
  },
  dividerText: {
    color: AppColors.continueWith,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
  },
  socialButton: {},
  googleButton: {},
  vendorButton: {
    paddingVertical: responsiveHeight(1),
  },
  vendorText: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
  },
});

export default LoginScreen;
