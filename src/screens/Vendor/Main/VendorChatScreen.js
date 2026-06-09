import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const chats = [
  ['James Anderson', 'Grave Cleaning - Plot 54', 'Please ensure thorough cleaning.', '2m ago', true],
  ['Maria Garcia', 'Flower Placement - Plot 47', 'Thank you for your service.', '1h ago', false],
];

const VendorChatScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.content}>
    <View style={styles.header}>
      <LineBreak height={1.6} />
      <AppText style={styles.title}>Messages</AppText>
    </View>
    <View style={styles.body}>
      <AppTextInput iconName="search" placeholder="Search clients..." inputStyle={styles.inputText} />
      <LineBreak height={1.6} />
      {chats.map(chat => (
        <GlassCard
          key={chat[0]}
          onPress={() => navigation.navigate('VendorPersonalChat', { clientName: chat[0], service: chat[1] })}
          contentStyle={styles.chatCard}>
          <View style={styles.chatIcon}><AppIcon name="chat-bubble-outline" color={AppColors.white} size={24} /></View>
          <View style={styles.chatCopy}>
            <View style={styles.chatTop}>
              <AppText style={styles.chatName}>{chat[0]}</AppText>
              <View style={styles.timeRow}>
                <AppText style={styles.time}>{chat[3]}</AppText>
                {chat[4] ? <View style={styles.unreadDot} /> : null}
              </View>
            </View>
            <AppText style={styles.service}>{chat[1]}</AppText>
            <AppText numberOfLines={1} style={styles.message}>{chat[2]}</AppText>
          </View>
        </GlassCard>
      ))}
    </View>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(9) },
  header: { padding: responsiveWidth(4), backgroundColor: 'rgba(4,47,103,0.5)' },
  title: { color: AppColors.white, fontSize: responsiveFontSize(2.45), fontWeight: '700' },
  body: { padding: responsiveWidth(4) },
  inputText: { paddingHorizontal: responsiveWidth(2) },
  chatCard: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1.3), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  chatIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(6), borderWidth: 0.5, borderColor: AppColors.white, backgroundColor: 'rgba(255,255,255,0.12)' },
  chatCopy: { flex: 1, marginLeft: responsiveWidth(3.2) },
  chatTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  chatName: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  timeRow: { alignItems: 'center', flexDirection: 'row' },
  time: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05) },
  unreadDot: { width: 8, height: 8, borderRadius: 4, marginLeft: responsiveWidth(1.8), backgroundColor: AppColors.onboardingButton },
  service: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginTop: responsiveHeight(0.35) },
  message: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), marginTop: responsiveHeight(0.7) },
});

export default VendorChatScreen;
