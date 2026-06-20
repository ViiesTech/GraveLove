import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  Vibration,
} from 'react-native';
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

const onboardingItems = [
  {
    image: AppAssets.images.onboard1,
    title: 'Caring Beyond Time',
    subTitle: 'Honor memories, simplify care',
    text: 'A compassionate platform to help you maintain and cherish the resting places of loved ones with dignity and ease.',
  },
  {
    image: AppAssets.images.onboard2,
    title: 'Trusted Memorial Services',
    subTitle: 'Book in minutes',
    text: 'Connect with verified vendors for grave cleaning, flower placement, and ongoing memorial care - all from your phone.',
  },
  {
    image: AppAssets.images.onboard3,
    title: 'Stay Connected',
    subTitle: 'Share and remember together',
    text: 'Create a beautiful memorial wall where family and friends can share memories, photos, and tributes in a peaceful digital space.',
  },
  {
    image: AppAssets.images.onboard4,
    title: 'Peace of Mind',
    subTitle: 'Automated care and reminders',
    text: 'Set up recurring services, track visits, and receive gentle reminders - ensuring your loved ones are always honored.',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const navigateToLogin = useCallback(() => {
    navigation.replace('AuthStack', { screen: 'UserAuth' });
  }, [navigation]);

  const animateToIndex = useCallback(
    nextIndex => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(nextIndex);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 320,
          useNativeDriver: true,
        }).start();
      });

      Vibration.vibrate(10);
    },
    [fadeAnim],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < onboardingItems.length - 1) {
      animateToIndex(currentIndex + 1);
      return;
    }

    navigateToLogin();
  }, [animateToIndex, currentIndex, navigateToLogin]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      animateToIndex(currentIndex - 1);
    }
  }, [animateToIndex, currentIndex]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > responsiveWidth(8) &&
          Math.abs(gestureState.dy) < responsiveHeight(6),
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -responsiveWidth(12)) {
            handleNext();
          }

          if (gestureState.dx > responsiveWidth(12)) {
            handlePrevious();
          }
        },
      }),
    [handleNext, handlePrevious],
  );

  const currentItem = onboardingItems[currentIndex];
  const isLast = currentIndex === onboardingItems.length - 1;

  return (
    <ScreenWrapper>
      <Pressable style={styles.skipButton} onPress={navigateToLogin}>
        <AppText style={styles.skipText}>Skip</AppText>
      </Pressable>

      <View style={styles.contentWrap} {...panResponder.panHandlers}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.imageFrame}>
            <Image
              source={currentItem.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textFrame}>
            <AppText style={styles.title}>{currentItem.title}</AppText>
            <AppText style={styles.subTitle}>{currentItem.subTitle}</AppText>
            <AppText style={styles.description}>{currentItem.text}</AppText>
          </View>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {onboardingItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <LineBreak height={3.9} />
        <AppButton onPress={handleNext} style={styles.primaryButton}>
          {isLast ? 'Get Started' : 'Next'}
        </AppButton>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  skipButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    minHeight: responsiveHeight(5.5),
    paddingHorizontal: responsiveWidth(5.8),
  },
  skipText: {
    color: AppColors.skip,
    fontSize: responsiveFontSize(1.55),
  },
  contentWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5.8),
  },
  imageFrame: {
    width: '100%',
    height: responsiveHeight(24.6),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textFrame: {
    justifyContent: 'center',
    minHeight: responsiveHeight(22.1),
  },
  title: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.5),
    lineHeight: responsiveHeight(3.15),
    textAlign: 'center',
  },
  subTitle: {
    color: AppColors.subTitle,
    marginTop: responsiveHeight(1),
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveHeight(3.15),
    textAlign: 'center',
  },
  description: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
    lineHeight: responsiveHeight(2.5),
    marginTop: responsiveHeight(2),
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(5.8),
    paddingBottom: responsiveHeight(3.7),
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: responsiveHeight(0.74),
    marginRight: responsiveWidth(1.45),
    borderRadius: responsiveHeight(0.37),
  },
  dotActive: {
    width: responsiveWidth(5.8),
    backgroundColor: AppColors.gold,
  },
  dotInactive: {
    width: responsiveWidth(1.45),
    backgroundColor: 'rgba(248, 251, 255, 0.28)',
  },
  primaryButton: {
    width: '100%',
    borderRadius: responsiveHeight(3),
    backgroundColor: AppColors.onboardingButton,
  },
});

export default OnboardingScreen;
