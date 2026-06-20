import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
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
  {
    name: 'Basic Care',
    subtitle: 'Essential memorial maintenance',
    price: '29',
    period: '/month',
    icon: 'favorite-border',
    features: [
      '1 monthly cleaning service',
      '1 flower placement per month',
      'Basic memorial wall access',
      'Email support',
      'Visit tracking',
    ],
    buttonText: 'Choose Plan',
  },
  {
    name: 'Complete Care',
    subtitle: 'Comprehensive memorial services',
    price: '59',
    period: '/month',
    icon: 'auto-awesome',
    features: [
      'Weekly maintenance visits',
      'Unlimited flower placements',
      'Unlimited memorial wall posts',
      'Priority vendor support',
      'Visit reminders',
      'Photo storage (500MB)',
      'Family sharing (up to 5 members)',
    ],
    buttonText: 'Get Started',
    badge: 'Most Popular',
  },
  {
    name: 'Premium Care',
    subtitle: 'Complete peace of mind',
    price: '99',
    period: '/month',
    icon: 'workspace-premium',
    features: [
      'Bi-weekly professional care',
      'Seasonal decorations included',
      'Custom memorial theme',
      '24/7 priority support',
      'Advanced analytics',
      'Unlimited photo storage',
      'Family sharing (unlimited)',
      'Video tributes',
      'Annual memorial book',
    ],
    buttonText: 'Choose Plan',
    badge: 'Premium',
  },
];

const yearlyPlans = [
  {
    ...monthlyPlans[0],
    price: '24',
    saveText: 'Save $60/year',
  },
  {
    ...monthlyPlans[1],
    price: '49',
    saveText: 'Save $120/year',
  },
  {
    ...monthlyPlans[2],
    price: '83',
    saveText: 'Save $192/year',
  },
];

const includedFeatures = [
  'Secure payment processing',
  'Cancel anytime, no commitment',
  '30-day money-back guarantee',
  'Vendor quality assurance',
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
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => setIsYearly(value => !value)}
            style={styles.switchTrack}>
            <View style={[styles.switchThumb, isYearly && styles.switchThumbRight]} />
          </TouchableOpacity>
          <AppText style={styles.toggleLabel}>Yearly</AppText>
        </View>

        {plans.map(plan => (
          <PlanCard key={`${plan.name}-${plan.price}`} navigation={navigation} plan={plan} />
        ))}

        <View style={styles.includeCard}>
          <AppText style={styles.includeTitle}>All Plans Include:</AppText>
          <LineBreak height={1.6} />
          {includedFeatures.map(feature => (
            <SimpleFeature key={feature}>{feature}</SimpleFeature>
          ))}
        </View>

        <LineBreak height={2.4} />
        <AppText style={styles.quote}>
          "Your subscription helps maintain memorial care{`\n`}standards and supports families in{`\n`}remembrance."
        </AppText>
      </View>
    </ScreenWrapper>
  );
};

const PlanCard = ({ navigation, plan }) => (
  <View style={styles.planWrap}>
    <View style={[styles.planCard, plan.badge && styles.featuredPlanCard]}>
      <View style={styles.planTop}>
        <AppIcon name={plan.icon} color={AppColors.homeTextMuted} size={24} />
        <View style={styles.planTitleWrap}>
          <AppText style={styles.planName}>{plan.name}</AppText>
          <AppText style={styles.planSubtitle}>{plan.subtitle}</AppText>
        </View>
      </View>

      {plan.badge ? (
        <View style={styles.badge}>
          <AppText style={styles.badgeText}>{plan.badge}</AppText>
        </View>
      ) : null}

      <LineBreak height={2.4} />
      <View style={styles.priceRow}>
        <AppText style={styles.price}>${plan.price}</AppText>
        <AppText style={styles.period}>{plan.period}</AppText>
      </View>
      {plan.saveText ? <AppText style={styles.saveText}>{plan.saveText}</AppText> : null}

      <LineBreak height={2.2} />
      <View style={styles.divider} />
      <LineBreak height={1.6} />

      {plan.features.map(feature => (
        <View key={feature} style={styles.featureRow}>
          <AppIcon name="check" color={AppColors.white} size={16} />
          <AppText style={styles.featureText}>{feature}</AppText>
        </View>
      ))}

      <LineBreak height={2.4} />
      <AppButton
        onPress={() => navigation.navigate('SubscriptionPayment', { plan })}
        style={styles.chooseButton}
        textStyle={styles.chooseButtonText}>
        {plan.buttonText}
      </AppButton>
    </View>
  </View>
);

const SimpleFeature = ({ children }) => (
  <View style={styles.simpleFeatureRow}>
    <AppText style={styles.bullet}>•</AppText>
    <AppText style={styles.simpleFeatureText}>{children}</AppText>
  </View>
);

const styles = StyleSheet.create({
  content: {
    paddingBottom: responsiveHeight(3),
  },
  body: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(2.4),
  },
  toggleWrap: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2.4),
    paddingHorizontal: responsiveWidth(5.8),
    paddingVertical: responsiveHeight(1.2),
    borderRadius: 20,
    backgroundColor: AppColors.white,
  },
  toggleLabel: {
    color: AppColors.bgBrown,
    fontSize: responsiveFontSize(1.35),
    fontWeight: '700',
  },
  switchTrack: {
    justifyContent: 'center',
    width: responsiveWidth(12),
    height: responsiveHeight(2.8),
    marginHorizontal: responsiveWidth(3.8),
    padding: 2,
    borderRadius: 20,
    backgroundColor: AppColors.themeColor,
  },
  switchThumb: {
    width: responsiveHeight(2.35),
    height: responsiveHeight(2.35),
    borderRadius: responsiveHeight(1.18),
    backgroundColor: AppColors.white,
  },
  switchThumbRight: {
    alignSelf: 'flex-end',
  },
  planWrap: {
    marginBottom: responsiveHeight(2.4),
  },
  planCard: {
    padding: responsiveWidth(5.8),
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    backgroundColor: AppColors.memorialCard,
  },
  featuredPlanCard: {
    borderColor: AppColors.homeBorder,
  },
  planTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingRight: responsiveWidth(18),
  },
  planTitleWrap: {
    flex: 1,
    marginLeft: responsiveWidth(3),
  },
  planName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
  },
  planSubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.2),
    marginTop: responsiveHeight(0.4),
  },
  badge: {
    position: 'absolute',
    right: responsiveWidth(5.8),
    top: responsiveWidth(5.8),
    paddingHorizontal: responsiveWidth(2.4),
    paddingVertical: responsiveHeight(0.38),
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  badgeText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1),
    fontWeight: '500',
  },
  priceRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    color: AppColors.white,
    fontSize: responsiveFontSize(3.4),
    fontWeight: '700',
  },
  period: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    marginBottom: responsiveHeight(0.55),
    marginLeft: responsiveWidth(1),
  },
  saveText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.18),
    fontWeight: '700',
    marginTop: responsiveHeight(0.35),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  featureRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.2),
  },
  featureText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: responsiveFontSize(1.28),
    lineHeight: responsiveHeight(2.05),
    marginLeft: responsiveWidth(3),
  },
  chooseButton: {
    backgroundColor: AppColors.onboardingButton,
  },
  chooseButtonText: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: '700',
  },
  includeCard: {
    padding: responsiveWidth(5.8),
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    backgroundColor: AppColors.memorialCard,
  },
  includeTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
  },
  simpleFeatureRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: responsiveHeight(0.8),
  },
  bullet: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    fontWeight: '700',
    marginRight: responsiveWidth(2),
  },
  simpleFeatureText: {
    flex: 1,
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  quote: {
    color: 'rgba(255, 255, 255, 0.45)',
    fontSize: responsiveFontSize(1.18),
    fontStyle: 'italic',
    lineHeight: responsiveHeight(1.85),
    textAlign: 'center',
  },
});

export default SelectSubscriptionsScreen;
