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

const SubscriptionPaymentScreen = ({ navigation, route }) => {
  const plan = route?.params?.plan || 'Complete Care';
  return (
    <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
      <AppImageHeader image={AppAssets.images.userDashboardFront} onBack={() => navigation.goBack()} title="Subscription Payment" subtitle="Complete your plan setup" />
      <View style={styles.body}>
        <GlassCard contentStyle={styles.summaryCard}>
          <AppText style={styles.summaryLabel}>Selected Plan</AppText>
          <AppText style={styles.plan}>{plan}</AppText>
          <LineBreak height={1.2} />
          <AppText style={styles.summaryLabel}>Billing starts today and renews automatically.</AppText>
        </GlassCard>
        <LineBreak height={2.2} />
        <AppText style={styles.label}>Card Number</AppText>
        <LineBreak height={0.85} />
        <AppTextInput placeholder="1234 5678 9012 3456" inputStyle={styles.inputText} keyboardType="number-pad" />
        <LineBreak height={1.8} />
        <View style={styles.row}>
          <View style={styles.half}>
            <AppText style={styles.label}>Expiry</AppText>
            <LineBreak height={0.85} />
            <AppTextInput placeholder="MM/YY" inputStyle={styles.inputText} />
          </View>
          <View style={styles.half}>
            <AppText style={styles.label}>CVV</AppText>
            <LineBreak height={0.85} />
            <AppTextInput placeholder="123" inputStyle={styles.inputText} keyboardType="number-pad" />
          </View>
        </View>
        <LineBreak height={3} />
        <AppButton
          style={styles.button}
          onPress={() => navigation.navigate('UserTabs', { screen: 'UserProfile' })}>
          Confirm Subscription
        </AppButton>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  summaryCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  summaryLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25) },
  plan: { color: AppColors.white, fontSize: responsiveFontSize(2), fontWeight: '700', marginTop: responsiveHeight(0.7) },
  label: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '600' },
  inputText: { paddingHorizontal: responsiveWidth(4) },
  row: { flexDirection: 'row', gap: responsiveWidth(3.8) },
  half: { flex: 1 },
  button: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
});

export default SubscriptionPaymentScreen;
