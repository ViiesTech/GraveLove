import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppBackButton from '../components/AppBackButton';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import LineBreak from '../components/LineBreak';
import ScreenWrapper from '../components/ScreenWrapper';
import { AppAssets } from '../utils/AppAssets';
import { AppColors } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const RoleSelectionScreen = ({ navigation }) => {
  const navigateRoot = (routeName, params) => {
    let rootNavigation = navigation;

    while (rootNavigation.getParent?.()) {
      rootNavigation = rootNavigation.getParent();
    }

    rootNavigation.navigate('AuthStack', { screen: routeName, params });
  };

  return (
    <ScreenWrapper isGradient contentContainerStyle={styles.container}>
      <AppBackButton
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />

      <Image
        source={AppAssets.images.authLogo}
        style={styles.logo}
        resizeMode="cover"
      />

      <LineBreak height={1.5} />
      <View style={styles.content}>
        <View style={styles.introWrap}>
          <AppText style={styles.welcomeText}>Welcome to Grave Love</AppText>
          <LineBreak height={1} />
          <AppText variant="bodyDim" style={styles.subtitle}>
            Sign in as...
          </AppText>
        </View>

        <LineBreak height={12} />
        <View style={styles.selectionWrap}>
          <AppText style={styles.questionText}>
            Which type of account do you want?
          </AppText>

          <LineBreak height={3.9} />
          <View style={styles.buttonsWrap}>
            <AppButton onPress={() => navigation.navigate('UserSignup')}>
              User
            </AppButton>
            <LineBreak height={2} />
            <AppButton
              onPress={() =>
                navigateRoot('VendorAuth', { screen: 'VendorSignup' })
              }
              style={styles.vendorButton}
            >
              Vendor
            </AppButton>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(4.9),
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  logo: {
    width: responsiveWidth(22),
    height: responsiveHeight(10.8),
    borderRadius: responsiveWidth(2),
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  introWrap: {
    alignItems: 'center',
  },
  welcomeText: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
  },
  subtitle: {
    color: AppColors.signInAs,
    fontSize: responsiveFontSize(1.52),
  },
  selectionWrap: {
    width: '100%',
    alignItems: 'center',
  },
  questionText: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.9),
    textAlign: 'center',
  },
  buttonsWrap: {
    width: '100%',
  },
  vendorButton: {},
});

export default RoleSelectionScreen;
