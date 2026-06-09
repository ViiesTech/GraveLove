import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../../components/AppButton';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import VendorAuthCard from '../../../components/VendorAuthCard';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const VendorLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigateMain = routeName => {
    let rootNavigation = navigation;

    while (rootNavigation.getParent?.()) {
      rootNavigation = rootNavigation.getParent();
    }

    rootNavigation.navigate('MainStack', { screen: routeName });
  };

  const handleLogin = () => {
    if (!email.includes('@')) {
      showToast('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 4) {
      showToast('Password too short', 'Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Vendor login successful', 'Welcome to dashboard.');
      navigateMain('VendorMain');
    }, 700);
  };

  return (
    <ScreenWrapper isGradient style={styles.screen}>
      <ImageBackground
        source={AppAssets.images.vendorHeader}
        resizeMode="cover"
        imageStyle={styles.headerImage}
        style={styles.header}>
        <View style={styles.headerTint} />
        <LinearGradient
          colors={['rgba(61, 139, 198, 0.18)', AppColors.bgDark]}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.headerCenter}>
          <Image
            source={AppAssets.images.authLogo}
            style={styles.logo}
            resizeMode="cover"
          />
          <LineBreak height={1} />
          <AppText variant="title" style={styles.headerTitle}>
            Welcome Back
          </AppText>
          <LineBreak height={0.25} />
          <AppText variant="bodyDim" style={styles.headerSubtitle}>
            Login to start your assigned services
          </AppText>
        </View>
      </ImageBackground>

      <ScreenWrapper
        isKeyboardAvoiding
        isScroll
        safeAreaEdges={[]}
        useBackgroundImage={false}
        scrollProps={{ bounces: false }}
        style={styles.formScroller}
        contentContainerStyle={styles.formScrollContent}>
        <VendorAuthCard style={styles.card}>
          <FieldLabel text="Email Address" />
          <LineBreak height={1} />
          <AppTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="your.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            inputStyle={styles.noIconInputText}
            style={styles.inputWrap}
          />

          <LineBreak height={2} />
          <FieldLabel text="Password" />
          <LineBreak height={1} />
          <AppTextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            inputStyle={styles.noIconInputText}
            rightIconName={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            rightIconSet="ion"
            rightIconColor="rgba(248, 251, 255, 0.42)"
            onRightPress={() => setIsPasswordVisible(value => !value)}
            style={styles.inputWrap}
          />

          <LineBreak height={2} />
          <Pressable
            onPress={() =>
              navigation.navigate('VendorForgotPassword', { role: 'vendor' })
            }>
            <AppText style={styles.forgotText}>Forgot Password?</AppText>
          </Pressable>

          <LineBreak height={2.95} />
          <AppButton
            isLoading={isLoading}
            onPress={handleLogin}
            style={styles.signInButton}
            textStyle={styles.signInText}>
            Sign In
          </AppButton>

          <LineBreak height={2.95} />
          <View style={styles.registerRow}>
            <AppText variant="bodyDim" style={styles.registerMuted}>
              New vendor?{' '}
            </AppText>
            <Pressable onPress={() => navigation.navigate('VendorSignup')}>
              <AppText style={styles.registerLink}>Register here</AppText>
            </Pressable>
          </View>
        </VendorAuthCard>

        <LineBreak height={2.95} />
        <AppText variant="bodyDim" style={styles.supportText}>
          Having trouble logging in? Contact Admin Support
        </AppText>
      </ScreenWrapper>
    </ScreenWrapper>
  );
};

const FieldLabel = ({ text }) => (
  <AppText variant="label" style={styles.label}>
    {text}
  </AppText>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.bgDark,
  },
  header: {
    height: responsiveHeight(20.2),
    overflow: 'hidden',
    backgroundColor: AppColors.bgDark,
  },
  headerImage: {
    opacity: 0.35,
  },
  headerTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 31, 75, 0.52)',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5.8),
  },
  logo: {
    width: responsiveWidth(19),
    height: responsiveWidth(19),
    borderRadius: responsiveWidth(2),
  },
  headerTitle: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '400',
  },
  headerSubtitle: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.4),
    textAlign: 'center',
  },
  formScroller: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  formScrollContent: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(7.1),
    paddingTop: responsiveHeight(3.9),
    paddingBottom: responsiveHeight(4.9),
  },
  card: {
    maxWidth: 420,
  },
  label: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
  },
  inputWrap: {
    borderColor: AppColors.border,
  },
  noIconInputText: {
    paddingHorizontal: responsiveWidth(4.8),
  },
  forgotText: {
    color: AppColors.gold,
  },
  signInButton: {
    width: '100%',
  },
  signInText: {
    fontWeight: '700',
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerMuted: {
    color: AppColors.dimColor,
  },
  registerLink: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  supportText: {
    color: AppColors.dimColor,
    fontSize: responsiveFontSize(1.3),
    textAlign: 'center',
  },
});

export default VendorLoginScreen;
