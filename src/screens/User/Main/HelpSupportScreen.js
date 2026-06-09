import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const HelpSupportScreen = ({ navigation }) => (
  <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
    <AppImageHeader
      image={AppAssets.images.userDashboardFront}
      onBack={() => navigation.goBack()}
      title="Help & Support"
      subtitle="We're here to help you"
      height={responsiveHeight(20.6)}
    />
    <View style={styles.body}>
      <ContactCard icon="chat-bubble-outline" title="Contact Us" light centered />
      <ContactCard icon="phone-in-talk" title="Emergency Helpline\n1-800-MEMORIAL" subtitle="Available 24/7" />
      <ContactCard icon="email" title="Email Support\nsupport@memorialcare.com" subtitle="Response within 24 hours" light />

      <LineBreak height={2.6} />
      <AppText style={styles.sectionTitle}>Send us a message</AppText>
      <LineBreak height={1.6} />
      <AppTextInput placeholder="Your Name" inputStyle={styles.inputText} />
      <LineBreak height={1.4} />
      <AppTextInput placeholder="Your Email" inputStyle={styles.inputText} keyboardType="email-address" />
      <LineBreak height={1.4} />
      <AppTextInput placeholder="Subject" inputStyle={styles.inputText} />
      <LineBreak height={1.4} />
      <AppTextInput placeholder="How can we help you?" inputStyle={styles.messageInput} multiline style={styles.messageField} />
      <LineBreak height={2.8} />
      <AppButton style={styles.sendButton} onPress={() => navigation.navigate('MessageSent')}>
        Send Message
      </AppButton>
    </View>
  </ScreenWrapper>
);

const ContactCard = ({ centered, icon, light, subtitle, title }) => (
  <View style={[styles.contactCard, light && styles.contactCardLight, centered && styles.centeredCard]}>
    <View style={[styles.contactIcon, light && styles.contactIconDark]}>
      <AppIcon name={icon} color={light ? AppColors.white : AppColors.themeColor} size={24} />
    </View>
    <View style={styles.contactCopy}>
      <AppText style={[styles.contactTitle, light && styles.contactTitleDark]}>{title}</AppText>
      {subtitle ? <AppText style={[styles.contactSubtitle, light && styles.contactSubtitleDark]}>{subtitle}</AppText> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  contactCard: { alignItems: 'center', flexDirection: 'row', minHeight: responsiveHeight(9.5), marginBottom: responsiveHeight(1.6), padding: responsiveWidth(4.5), borderRadius: 16, backgroundColor: AppColors.memorialCard },
  contactCardLight: { backgroundColor: AppColors.homeActionCard },
  centeredCard: { justifyContent: 'center' },
  contactIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11), height: responsiveWidth(11), borderRadius: responsiveWidth(5.5), backgroundColor: AppColors.white },
  contactIconDark: { backgroundColor: AppColors.themeColor },
  contactCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  contactTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700', lineHeight: responsiveHeight(2.25) },
  contactTitleDark: { color: AppColors.white },
  contactSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2), marginTop: responsiveHeight(0.45) },
  contactSubtitleDark: { color: 'rgba(255,255,255,0.72)' },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  inputText: { paddingHorizontal: responsiveWidth(4) },
  messageField: { height: responsiveHeight(13), borderRadius: 16, alignItems: 'flex-start', paddingTop: responsiveHeight(1.2) },
  messageInput: { height: '100%', paddingHorizontal: responsiveWidth(4), textAlignVertical: 'top' },
  sendButton: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
});

export default HelpSupportScreen;
