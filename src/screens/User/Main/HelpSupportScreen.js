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
      <ContactCard icon="chat-bubble-outline" title="Contact Us" centered />
      <ContactCard icon="phone-in-talk" title="Emergency Helpline" detail="1-800-MEMORIAL" subtitle="Available 24/7" />
      <ContactCard icon="email" title="Email Support" detail="support@memorialcare.com" subtitle="Response within 24 hours" />

      <LineBreak height={2.6} />
      <AppText style={styles.sectionTitle}>Send us a message</AppText>
      <LineBreak height={1.6} />
      <AppTextInput placeholder="Your Name" inputStyle={styles.inputText} style={styles.inputField} />
      <LineBreak height={1.4} />
      <AppTextInput placeholder="Your Email" inputStyle={styles.inputText} keyboardType="email-address" style={styles.inputField} />
      <LineBreak height={1.4} />
      <AppTextInput placeholder="Subject" inputStyle={styles.inputText} style={styles.inputField} />
      <LineBreak height={1.4} />
      <AppTextInput placeholder="How can we help you?" inputStyle={styles.messageInput} multiline style={styles.messageField} />
      <LineBreak height={2.8} />
      <AppButton style={styles.sendButton} onPress={() => navigation.navigate('MessageSent')}>
        Send Message
      </AppButton>
    </View>
  </ScreenWrapper>
);

const ContactCard = ({ centered, detail, icon, subtitle, title }) => (
  <View style={[styles.contactCard, centered && styles.centeredCard]}>
    <View style={styles.contactIcon}>
      <AppIcon name={icon} color={AppColors.themeColor} size={24} />
    </View>
    <View style={[styles.contactCopy, centered && styles.centeredCopy]}>
      <AppText style={[styles.contactTitle, centered && styles.centeredTitle]}>{title}</AppText>
      {detail ? <AppText style={styles.contactDetail}>{detail}</AppText> : null}
      {subtitle ? <AppText style={styles.contactSubtitle}>{subtitle}</AppText> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  contactCard: { alignItems: 'center', flexDirection: 'row', minHeight: responsiveHeight(9.5), marginBottom: responsiveHeight(1.6), padding: responsiveWidth(4.5), borderRadius: 16, backgroundColor: AppColors.memorialCard },
  centeredCard: { flexDirection: 'column', justifyContent: 'center' },
  contactIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11), height: responsiveWidth(11), borderRadius: responsiveWidth(5.5), backgroundColor: AppColors.white },
  contactCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  centeredCopy: { flex: 0, marginLeft: 0, marginTop: responsiveHeight(0.9) },
  contactTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700', lineHeight: responsiveHeight(2.25) },
  centeredTitle: { textAlign: 'center' },
  contactDetail: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700', lineHeight: responsiveHeight(2.15) },
  contactSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2), marginTop: responsiveHeight(0.45) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  inputField: { borderRadius: 12 },
  inputText: { paddingHorizontal: responsiveWidth(4) },
  messageField: { height: responsiveHeight(13), borderRadius: 12, alignItems: 'flex-start' },
  messageInput: { height: '100%', paddingHorizontal: responsiveWidth(4), paddingTop: responsiveHeight(1.2), textAlignVertical: 'top' },
  sendButton: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
});

export default HelpSupportScreen;
