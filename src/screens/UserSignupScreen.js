import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AuthHeader from '../components/AuthHeader';
import AuthSocialButton from '../components/AuthSocialButton';
import LineBreak from '../components/LineBreak';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppAssets } from '../utils/AppAssets';
import { AppColors } from '../utils/AppColors';
import { showToast } from '../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const UserSignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigateMain = routeName => {
    let rootNavigation = navigation;

    while (rootNavigation.getParent?.()) {
      rootNavigation = rootNavigation.getParent();
    }

    rootNavigation.navigate('MainStack', { screen: routeName });
  };

  const handleSignup = () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      showToast('Missing details', 'Please fill all required fields.');
      return;
    }

    if (!email.includes('@')) {
      showToast('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Password mismatch', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Account created', 'Welcome to Grave Love.');
      navigateMain('UserMain');
    }, 700);
  };

  return (
    <ScreenWrapper
      isGradient
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.container}>
      <AuthHeader title="Join Memorial Care" subtitle="Create Account" />

      <LineBreak height={3.9} />
      <FieldLabel text="Full Name" />
      <LineBreak height={1} />
      <AppTextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="John Doe"
        autoCapitalize="words"
        iconName="person-outline"
      />

      <LineBreak height={2} />
      <FieldLabel text="Email Address" />
      <LineBreak height={1} />
      <AppTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="your@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        iconName="email"
      />

      <LineBreak height={2} />
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

      <LineBreak height={2} />
      <FieldLabel text="Confirm Password" />
      <LineBreak height={1} />
      <AppTextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="........"
        secureTextEntry={!isConfirmPasswordVisible}
        iconName="lock-outline"
        rightIconSet="ion"
        rightIconName={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
        onRightPress={() => setIsConfirmPasswordVisible(value => !value)}
      />

      <LineBreak height={3.9} />
      <AppButton
        isLoading={isLoading}
        onPress={handleSignup}
        style={styles.fullWidth}>
        Create Account
      </AppButton>

      <LineBreak height={3.9} />
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <AppText variant="bodyDim" style={styles.dividerText}>
          or continue with
        </AppText>
        <View style={styles.divider} />
      </View>

      <LineBreak height={2.95} />
      <View style={styles.socialRow}>
        <AuthSocialButton
          label="Google"
          iconSvg={AppAssets.icons.googleLogo}
          style={styles.socialButton}
        />
        <LineBreak height={0} style={styles.socialGap} />
        <AuthSocialButton
          label="Apple ID"
          iconSvg={AppAssets.icons.appleLogo}
          style={styles.socialButton}
        />
      </View>

      <LineBreak height={3.9} />
      <View style={styles.footerRow}>
        <AppText variant="bodyDim" style={styles.footerMuted}>
          Already have an account?{' '}
        </AppText>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <AppText style={styles.footerLink}>Sign In</AppText>
        </Pressable>
      </View>

      <LineBreak height={2.95} />
      <AppText variant="bodyDim" style={styles.termsText}>
        By creating an account, you agree to our{' '}
        <AppText style={styles.termsLink}>Terms</AppText>
        {' and\n'}
        <AppText style={styles.termsLink}>Privacy Policy</AppText>
      </AppText>
    </ScreenWrapper>
  );
};

const FieldLabel = ({ text }) => (
  <AppText style={styles.label}>{text}</AppText>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(7.8),
    paddingTop: responsiveHeight(4.9),
    paddingBottom: responsiveHeight(4.9),
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
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
  dividerText: {
    paddingHorizontal: responsiveWidth(3.9),
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
  },
  socialRow: {
    flexDirection: 'row',
    width: '100%',
  },
  socialButton: {
    flex: 1,
  },
  socialGap: {
    width: responsiveWidth(3.9),
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerMuted: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.75),
  },
  footerLink: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
  },
  termsText: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
    lineHeight: responsiveHeight(2.7),
    textAlign: 'center',
  },
  termsLink: {
    color: AppColors.gold,
    textDecorationLine: 'underline',
  },
});

export default UserSignupScreen;
