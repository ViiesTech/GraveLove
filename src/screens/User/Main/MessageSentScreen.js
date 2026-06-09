import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const MessageSentScreen = ({ navigation }) => (
  <ScreenWrapper contentContainerStyle={styles.content}>
    <View style={styles.checkCircle}>
      <AppIcon name="check" color={AppColors.white} size={34} />
    </View>
    <LineBreak height={2.2} />
    <AppText style={styles.title}>Message Sent!</AppText>
    <LineBreak height={1.1} />
    <AppText style={styles.subtitle}>
      Thank you for contacting us. Our support team will get back to you shortly.
    </AppText>
    <LineBreak height={3.2} />
    <AppButton style={styles.button} onPress={() => navigation.navigate('UserTabs', { screen: 'UserHome' })}>
      Back to Home
    </AppButton>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5.8),
  },
  checkCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(10),
    backgroundColor: AppColors.themeColor,
  },
  title: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    lineHeight: responsiveHeight(2.25),
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: AppColors.onboardingButton,
    borderRadius: responsiveHeight(3),
  },
});

export default MessageSentScreen;
