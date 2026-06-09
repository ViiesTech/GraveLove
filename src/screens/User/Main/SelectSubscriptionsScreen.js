import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
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

const monthlyPlans = [
  ['Basic Care', 'Essential memorial maintenance', '29', '/month', null, ['1 monthly cleaning service', '1 flower placement per month', 'Basic memorial wall access', 'Email support', 'Visit tracking']],
  ['Complete Care', 'Comprehensive memorial services', '59', '/month', 'Most Popular', ['Weekly maintenance visits', 'Unlimited flower placements', 'Unlimited memorial wall posts', 'Priority vendor support', 'Visit reminders', 'Photo storage (500MB)', 'Family sharing (up to 5 members)']],
  ['Premium Care', 'Complete peace of mind', '99', '/month', 'Premium', ['Bi-weekly professional care', 'Seasonal decorations included', 'Custom memorial theme', '24/7 priority support', 'Advanced analytics', 'Unlimited photo storage', 'Family sharing (unlimited)', 'Video tributes', 'Annual memorial book']],
];

const yearlyPlans = [
  ['Basic Care', 'Essential memorial maintenance', '24', '/month', null, ['Save $60/year', '1 monthly cleaning service', '1 flower placement per month', 'Basic memorial wall access', 'Email support', 'Visit tracking']],
  ['Complete Care', 'Comprehensive memorial services', '49', '/month', 'Most Popular', ['Save $120/year', 'Weekly maintenance visits', 'Unlimited flower placements', 'Unlimited memorial wall posts', 'Priority vendor support', 'Visit reminders', 'Photo storage (500MB)', 'Family sharing (up to 5 members)']],
  ['Premium Care', 'Complete peace of mind', '83', '/month', 'Premium', ['Save $192/year', 'Bi-weekly professional care', 'Seasonal decorations included', 'Custom memorial theme', '24/7 priority support', 'Advanced analytics', 'Unlimited photo storage', 'Family sharing (unlimited)', 'Video tributes', 'Annual memorial book']],
];

const SelectSubscriptionsScreen = ({ navigation }) => {
  const [isYearly, setIsYearly] = useState(false);
  const plans = isYearly ? yearlyPlans : monthlyPlans;

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Choose Your Plan"
        subtitle="Every payment helps preserve memories with dignity"
        height={responsiveHeight(20.6)}
      />
      <View style={styles.body}>
        <View style={styles.toggleWrap}>
          <AppText style={styles.toggleLabel}>Monthly</AppText>
          <TouchableOpacity activeOpacity={0.82} onPress={() => setIsYearly(!isYearly)} style={styles.switchTrack}>
            <View style={[styles.switchThumb, isYearly && styles.switchThumbRight]} />
          </TouchableOpacity>
          <AppText style={styles.toggleLabel}>Yearly</AppText>
        </View>

        {plans.map(plan => <PlanCard key={plan[0]} navigation={navigation} plan={plan} />)}
      </View>
    </ScreenWrapper>
  );
};

const PlanCard = ({ navigation, plan }) => (
  <GlassCard contentStyle={styles.planCard}>
    {plan[4] ? <View style={styles.badge}><AppText style={styles.badgeText}>{plan[4]}</AppText></View> : null}
    <View style={styles.planTop}>
      <View style={styles.iconCircle}><AppIcon name="favorite-border" color={AppColors.themeColor} size={24} /></View>
      <View style={styles.planTitleWrap}>
        <AppText style={styles.planName}>{plan[0]}</AppText>
        <AppText style={styles.planSubtitle}>{plan[1]}</AppText>
      </View>
    </View>
    <LineBreak height={1.7} />
    <View style={styles.priceRow}>
      <AppText style={styles.dollar}>$</AppText>
      <AppText style={styles.price}>{plan[2]}</AppText>
      <AppText style={styles.period}>{plan[3]}</AppText>
    </View>
    <LineBreak height={1.7} />
    {plan[5].map(feature => (
      <View key={feature} style={styles.featureRow}>
        <AppIcon name="check-circle" color={AppColors.onboardingButton} size={18} />
        <AppText style={styles.featureText}>{feature}</AppText>
      </View>
    ))}
    <LineBreak height={2.1} />
    <AppButton onPress={() => navigation.navigate('SubscriptionPayment', { plan: plan[0] })} style={styles.chooseButton}>
      {plan[4] === 'Most Popular' ? 'Get Started' : 'Choose Plan'}
    </AppButton>
  </GlassCard>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(6) },
  body: { padding: responsiveWidth(5.8) },
  toggleWrap: { alignItems: 'center', alignSelf: 'center', flexDirection: 'row', marginBottom: responsiveHeight(2.4), paddingHorizontal: responsiveWidth(5.8), paddingVertical: responsiveHeight(1.3), borderRadius: 20, backgroundColor: AppColors.white },
  toggleLabel: { color: AppColors.themeColor, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  switchTrack: { justifyContent: 'center', width: responsiveWidth(12), height: responsiveHeight(3), marginHorizontal: responsiveWidth(3.8), padding: 2, borderRadius: 20, backgroundColor: AppColors.themeColor },
  switchThumb: { width: responsiveHeight(2.45), height: responsiveHeight(2.45), borderRadius: responsiveHeight(1.22), backgroundColor: AppColors.white },
  switchThumbRight: { alignSelf: 'flex-end' },
  planCard: { marginBottom: responsiveHeight(2.2), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  badge: { alignSelf: 'flex-end', paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(0.55), borderRadius: 14, backgroundColor: AppColors.memorialMutedButton },
  badgeText: { color: AppColors.white, fontSize: responsiveFontSize(1.12), fontWeight: '700' },
  planTop: { alignItems: 'center', flexDirection: 'row' },
  iconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11.6), height: responsiveWidth(11.6), borderRadius: responsiveWidth(5.8), backgroundColor: AppColors.white },
  planTitleWrap: { flex: 1, marginLeft: responsiveWidth(3.8) },
  planName: { color: AppColors.white, fontSize: responsiveFontSize(1.8), fontWeight: '700' },
  planSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), marginTop: responsiveHeight(0.35) },
  priceRow: { alignItems: 'flex-end', flexDirection: 'row' },
  dollar: { color: AppColors.white, fontSize: responsiveFontSize(1.8), marginBottom: responsiveHeight(0.6) },
  price: { color: AppColors.white, fontSize: responsiveFontSize(4.4), fontWeight: '700', lineHeight: responsiveHeight(5) },
  period: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), marginBottom: responsiveHeight(0.8), marginLeft: responsiveWidth(1.2) },
  featureRow: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1) },
  featureText: { flex: 1, color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), marginLeft: responsiveWidth(2.4) },
  chooseButton: { backgroundColor: AppColors.onboardingButton },
});

export default SelectSubscriptionsScreen;
