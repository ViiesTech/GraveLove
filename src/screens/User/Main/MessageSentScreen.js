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
      <View style={styles.checkInnerCircle}>
        <AppIcon name="check" color={AppColors.white} size={34} />
      </View>
    </View>
    <LineBreak height={3.2} />
    <AppText style={styles.title}>Message Sent!</AppText>
    <LineBreak height={1.6} />
    <AppText style={styles.subtitle}>
      Thank you for reaching out. Our support team{`\n`}will get back to you within 24 hours.
    </AppText>
    <LineBreak height={3.2} />
    <AppText style={styles.emailNote}>You'll receive a confirmation email shortly.</AppText>
    <LineBreak height={4.8} />
    <AppButton
      style={styles.button}
      textStyle={styles.buttonText}
      onPress={() => navigation.navigate('UserTabs', { screen: 'UserHome' })}>
      Back to home
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
    width: responsiveWidth(28),
    height: responsiveWidth(28),
    borderRadius: responsiveWidth(14),
    backgroundColor: AppColors.memorialCard,
  },
  checkInnerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderWidth: 2,
    borderColor: AppColors.white,
    borderRadius: responsiveWidth(7),
  },
  title: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    lineHeight: responsiveHeight(2.25),
    textAlign: 'center',
  },
  emailNote: {
    color: 'rgba(255, 255, 255, 0.42)',
    fontSize: responsiveFontSize(1.2),
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: AppColors.memorialCard,
    borderRadius: 12,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
});

export default MessageSentScreen;
