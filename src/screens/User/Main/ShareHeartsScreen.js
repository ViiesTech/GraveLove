import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
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

const ShareHeartsScreen = ({ navigation }) => (
  <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
    <AppImageHeader image={AppAssets.images.userDashboardFront} onBack={() => navigation.goBack()} title="Share Hearts" subtitle="Send hearts to family members" />
    <View style={styles.body}>
      <GlassCard contentStyle={styles.balanceCard}>
        <AppText style={styles.muted}>Available Balance</AppText>
        <AppText style={styles.balance}>200 Hearts</AppText>
      </GlassCard>
      <LineBreak height={2.2} />
      <AppText style={styles.label}>Recipient Email</AppText>
      <LineBreak height={0.85} />
      <AppTextInput placeholder="family@example.com" inputStyle={styles.inputText} keyboardType="email-address" />
      <LineBreak height={1.8} />
      <AppText style={styles.label}>Amount</AppText>
      <LineBreak height={0.85} />
      <AppTextInput placeholder="Enter hearts amount" inputStyle={styles.inputText} keyboardType="number-pad" />
      <LineBreak height={3} />
      <AppButton style={styles.button} onPress={() => navigation.navigate('UserCoinsWallet')}>Send Hearts</AppButton>
    </View>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  balanceCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25) },
  balance: { color: AppColors.white, fontSize: responsiveFontSize(2.3), fontWeight: '700', marginTop: responsiveHeight(0.8) },
  label: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '600' },
  inputText: { paddingHorizontal: responsiveWidth(4) },
  button: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
});

export default ShareHeartsScreen;
