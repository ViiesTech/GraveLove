import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const sections = [
  ['Information We Collect', 'We collect account details, memorial information, booking activity, visit logs, and app usage details needed to provide Grave Love services.'],
  ['How We Use Information', 'Your information helps us manage memorial profiles, schedule care services, process payments, share memories, and improve support.'],
  ['Sharing & Visibility', 'Memorial content may be visible to family members or invited visitors. Private account and payment details remain protected.'],
  ['Your Choices', 'You can update profile details, manage privacy settings, request support, or delete your account from the app settings.'],
];

const PrivacyPolicyScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.content}>
    <AppImageHeader
      image={AppAssets.images.userDashboardFront}
      onBack={() => navigation.goBack()}
      title="Privacy Policy"
      subtitle="How your information is protected"
      height={responsiveHeight(22)}
    />
    <View style={styles.body}>
      {sections.map(([title, body]) => (
        <GlassCard key={title} contentStyle={styles.card}>
          <AppText style={styles.title}>{title}</AppText>
          <LineBreak height={1} />
          <AppText style={styles.bodyText}>{body}</AppText>
        </GlassCard>
      ))}
    </View>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(6) },
  body: { padding: responsiveWidth(5.8) },
  card: {
    marginBottom: responsiveHeight(1.6),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
  },
  title: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
  bodyText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.25),
    lineHeight: responsiveFontSize(1.9),
  },
});

export default PrivacyPolicyScreen;
