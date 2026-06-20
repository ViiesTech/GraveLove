import React, { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
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

const VendorSignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !phone.trim() ||
      !city.trim()
    ) {
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

    if (password.length < 6) {
      showToast('Weak password', 'Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('VendorSetupProfile', {
        previousData: {
          name: fullName.trim(),
          email: email.trim(),
          password,
          c_password: confirmPassword,
          phone_number: phone.trim(),
          city: city.trim(),
        },
      });
    }, 700);
  };

  return (
    <ScreenWrapper isGradient style={styles.screen}>
      <ImageBackground
        source={AppAssets.images.memorialImage2}
        resizeMode="cover"
        imageStyle={styles.headerImage}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable style={styles.backRow} onPress={() => navigation.goBack()}>
            <AppIcon
              iconSet="material"
              name="arrow-back-ios"
              size={16}
              color={AppColors.gold}
            />
            <AppText style={styles.backText}>Back</AppText>
          </Pressable>

          <View style={styles.headerCopy}>
            <AppText variant="title" style={styles.headerTitle}>
              Vendor Registration
            </AppText>
            <LineBreak height={0.5} />
            <AppText variant="bodyDim" style={styles.headerSubtitle}>
              Create your account to get started
            </AppText>
          </View>
        </View>
      </ImageBackground>

      <ScreenWrapper
        isScroll
        safeAreaEdges={[]}
        useBackgroundImage={false}
        scrollProps={{
          automaticallyAdjustKeyboardInsets: true,
          bounces: false,
          keyboardDismissMode: 'interactive',
        }}
        style={styles.formScroller}
        contentContainerStyle={styles.formScrollContent}>
        <VendorAuthCard>
          <FieldLabel text="Full Name" />
          <LineBreak height={1} />
          <AppTextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter your full name"
            autoCapitalize="words"
            iconName="person-outline"
            style={styles.input}
          />

          <LineBreak height={2} />
          <FieldLabel text="Email Address" />
          <LineBreak height={1} />
          <AppTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="your.email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="email"
            style={styles.input}
          />

          <LineBreak height={2} />
          <FieldLabel text="Password" />
          <LineBreak height={1} />
          <AppTextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Create a strong password"
            secureTextEntry={!isPasswordVisible}
            iconName="lock-outline"
            rightIconSet="ion"
            rightIconName={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            onRightPress={() => setIsPasswordVisible(value => !value)}
            style={styles.input}
          />

          <LineBreak height={2} />
          <FieldLabel text="Confirm Password" />
          <LineBreak height={1} />
          <AppTextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter your password"
            secureTextEntry={!isConfirmPasswordVisible}
            iconName="lock-outline"
            rightIconSet="ion"
            rightIconName={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            onRightPress={() => setIsConfirmPasswordVisible(value => !value)}
            style={styles.input}
          />

          <LineBreak height={2} />
          <FieldLabel text="Phone Number" />
          <LineBreak height={1} />
          <AppTextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="+92 300 1234567"
            keyboardType="phone-pad"
            iconSet="ion"
            iconName="phone-portrait-outline"
            style={styles.input}
          />

          <LineBreak height={2} />
          <FieldLabel text="City" />
          <LineBreak height={1} />
          <AppTextInput
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
            iconName="location-city"
            style={styles.input}
          />

          <LineBreak height={3.2} />
          <AppButton
            isLoading={isLoading}
            onPress={handleRegistration}
            style={styles.submitButton}
            textStyle={styles.submitText}>
            Create Account
          </AppButton>

          <LineBreak height={3.2} />
          <View style={styles.footerRow}>
            <AppText variant="bodyDim" style={styles.footerMuted}>
              Already registered?{' '}
            </AppText>
            <Pressable onPress={() => navigation.navigate('VendorLogin')}>
              <AppText style={styles.footerLink}>Sign In</AppText>
            </Pressable>
          </View>
        </VendorAuthCard>
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
    height: responsiveHeight(22.1),
    overflow: 'hidden',
    backgroundColor: AppColors.bgDark,
  },
  headerImage: {
    opacity: 1,
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(5),
    paddingBottom: responsiveHeight(1.8),
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  backText: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
  },
  headerCopy: {
    marginTop: responsiveHeight(2.4),
  },
  headerTitle: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.15),
  },
  headerSubtitle: {
    color: AppColors.goldDim,
  },
  formScroller: {
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  formScrollContent: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(3.7),
    paddingBottom: responsiveHeight(10),
  },
  label: {
    alignSelf: 'flex-start',
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
  },
  input: {
    borderColor: AppColors.border,
  },
  submitButton: {
    alignSelf: 'center',
    width: '100%',
  },
  submitText: {
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerMuted: {
    color: AppColors.dimColor,
  },
  footerLink: {
    color: AppColors.gold,
    fontWeight: '700',
  },
});

export default VendorSignupScreen;
