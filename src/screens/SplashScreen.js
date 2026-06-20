import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import AppText from '../components/AppText';
import { AppAssets } from '../utils/AppAssets';
import { AppColors } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { isProfileCreated, role, token } = useSelector(state => state.auth);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (token) {
        if (role === 'vendor' && !isProfileCreated) {
          navigation.reset({
            index: 0,
            routes: [{
              name: 'AuthStack',
              params: {
                screen: 'VendorAuth',
                params: { screen: 'VendorSetupProfile' },
              },
            }],
          });
          return;
        }

        navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack' }],
        });
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, isProfileCreated, navigation, role, token]);

  return (
    <ImageBackground
      source={AppAssets.images.bgImage}
      resizeMode="cover"
      style={styles.container}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={AppAssets.images.authLogo}
          style={styles.logo}
          // resizeMode="contain"
        />
        <AppText style={styles.title}>Grave Love</AppText>
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.bgDark,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: responsiveWidth(26),
    height: responsiveHeight(13.5),
  },
  title: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.7),
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});

export default SplashScreen;
