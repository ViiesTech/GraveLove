import React, { useMemo, useState } from 'react';
import { ImageBackground, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
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

const defaultPlan = {
  name: 'Complete Care',
  subtitle: 'Comprehensive memorial services',
  price: '59',
};

const SubscriptionPaymentScreen = ({ navigation, route }) => {
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [successVisible, setSuccessVisible] = useState(false);
  const routePlan = route?.params?.plan;
  const plan = typeof routePlan === 'object' && routePlan ? routePlan : {
    ...defaultPlan,
    name: routePlan || defaultPlan.name,
  };
  const price = useMemo(() => Number.parseFloat(plan.price) || 0, [plan.price]);

  const goHome = () => {
    setSuccessVisible(false);
    navigation.reset({ index: 0, routes: [{ name: 'UserTabs' }] });
  };

  return (
    <>
      <ScreenWrapper
        isKeyboardAvoiding
        isScroll
        contentContainerStyle={styles.content}
        keyboardVerticalOffset={responsiveHeight(1)}>
        <AppImageHeader
          image={AppAssets.images.userDashboardFront}
          onBack={() => navigation.goBack()}
          title="Subscription Payment"
          subtitle="Secure checkout"
          height={responsiveHeight(20.6)}
        />

        <View style={styles.sheet}>
          <ImageBackground
            source={AppAssets.images.bgImage}
            resizeMode="cover"
            style={styles.sheetBg}
            imageStyle={styles.sheetBgImage}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryTextWrap}>
                <AppText style={styles.summaryTitle}>{plan.name}</AppText>
                <AppText style={styles.summarySubtitle}>{plan.subtitle}</AppText>
              </View>
              <AppText style={styles.summaryPrice}>${price.toFixed(0)}</AppText>
            </View>

            <AppText style={styles.sectionLabel}>Payment Method</AppText>
            <LineBreak height={1.2} />
            <View style={styles.methodRow}>
              <PaymentMethodCard
                icon="credit-card"
                isSelected={selectedMethod === 0}
                label="Credit Card"
                onPress={() => setSelectedMethod(0)}
              />
              <PaymentMethodCard
                icon="account-balance-wallet"
                isSelected={selectedMethod === 1}
                label="Digital Wallet"
                onPress={() => setSelectedMethod(1)}
              />
            </View>

            <LineBreak height={2.4} />
            {selectedMethod === 0 ? <CardDetails /> : <DigitalWallet />}

            <LineBreak height={2.4} />
            <View style={styles.secureNotice}>
              <AppIcon name="security" color={AppColors.white} size={30} />
              <View style={styles.secureTextWrap}>
                <AppText style={styles.secureTitle}>Secure Payment</AppText>
                <AppText style={styles.secureText}>
                  Your payment information is encrypted and secure. We never store your complete card details.
                </AppText>
              </View>
            </View>

            <LineBreak height={1.6} />
            <AppText style={styles.termsText}>
              By completing this payment, you agree to our{`\n`}Terms of Service and Privacy Policy
            </AppText>

            <LineBreak height={2.4} />
            <AppButton
              onPress={() => setSuccessVisible(true)}
              style={styles.payButton}
              textStyle={styles.payButtonText}>
              Complete Payment - ${price.toFixed(2)}
            </AppButton>
          </ImageBackground>
        </View>
      </ScreenWrapper>

      <SuccessModal visible={successVisible} onBackHome={goHome} />
    </>
  );
};

const PaymentMethodCard = ({ icon, isSelected, label, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.84}
    onPress={onPress}
    style={[styles.methodCard, isSelected && styles.methodCardSelected]}>
    <View style={[styles.methodIconCircle, isSelected && styles.methodIconCircleSelected]}>
      <AppIcon
        name={icon}
        color={AppColors.white}
        size={24}
      />
    </View>
    <AppText style={[styles.methodLabel, isSelected && styles.methodLabelSelected]}>{label}</AppText>
  </TouchableOpacity>
);

const CardDetails = () => (
  <View>
    <AppText style={styles.cardDetailsTitle}>Card Details</AppText>
    <LineBreak height={1.2} />
    <Field label="Card Number" placeholder="1234 5678 9012 3456" iconName="credit-card" keyboardType="number-pad" />
    <LineBreak height={1.6} />
    <View style={styles.inputRow}>
      <View style={styles.inputHalf}>
        <Field label="Expiry Date" placeholder="MM/YY" />
      </View>
      <View style={styles.inputHalf}>
        <Field label="CVV" placeholder="123" keyboardType="number-pad" />
      </View>
    </View>
    <LineBreak height={1.6} />
    <Field label="Cardholder Name" placeholder="John Doe" />
    <LineBreak height={2.4} />
    <AppText style={styles.sectionLabel}>Saved Cards</AppText>
    <LineBreak height={1.2} />
    <View style={styles.savedCard}>
      <View style={styles.savedLeft}>
        <View style={styles.savedIconBox}>
          <AppIcon name="credit-card" color={AppColors.black} size={16} />
        </View>
        <View>
          <AppText style={styles.savedNumber}>•••• 4242</AppText>
          <AppText style={styles.savedExpiry}>Expires 12/25</AppText>
        </View>
      </View>
      <View style={styles.defaultBadge}>
        <AppText style={styles.defaultBadgeText}>Default</AppText>
      </View>
    </View>
  </View>
);

const DigitalWallet = () => (
  <View>
    <AppText style={styles.walletTitle}>Google Play</AppText>
    <LineBreak height={1.2} />
    <View style={styles.walletBox}>
      <AppText style={styles.walletText}>Google Pay Integration</AppText>
    </View>
  </View>
);

const Field = ({ iconName, label, placeholder, ...props }) => (
  <View>
    <AppText style={styles.fieldLabel}>{label}</AppText>
    <LineBreak height={0.8} />
    <AppTextInput
      {...props}
      iconName={iconName}
      placeholder={placeholder}
      style={styles.fieldInput}
      inputStyle={styles.fieldInputText}
    />
  </View>
);

const SuccessModal = ({ onBackHome, visible }) => (
  <Modal transparent animationType="fade" visible={visible}>
    <View style={styles.modalOverlay}>
      <View style={styles.successBox}>
        <AppText style={styles.successHeading}>Successful</AppText>
        <LineBreak height={1.6} />
        <View style={styles.modalDivider} />
        <LineBreak height={2.4} />
        <View style={styles.successIconCircle}>
          <AppIcon name="check" color={AppColors.white} size={48} />
        </View>
        <LineBreak height={2.4} />
        <AppText style={styles.thankYou}>Thank you</AppText>
        <LineBreak height={3.2} />
        <AppButton onPress={onBackHome} style={styles.backHomeButton} textStyle={styles.backHomeText}>
          Back to home
        </AppButton>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  content: {
    paddingBottom: 0,
  },
  sheet: {
    marginTop: -responsiveHeight(6.6),
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: AppColors.black,
    shadowOffset: { height: -8, width: 0 },
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 8,
    overflow: 'hidden',
  },
  sheetBg: {
    minHeight: responsiveHeight(79.4),
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(3.6),
    paddingBottom: responsiveHeight(4),
  },
  sheetBgImage: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  summaryCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(3.2),
    padding: responsiveWidth(4.8),
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    backgroundColor: AppColors.memorialCard,
  },
  summaryTextWrap: {
    flex: 1,
    paddingRight: responsiveWidth(3),
  },
  summaryTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
  },
  summarySubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.15),
    marginTop: responsiveHeight(0.4),
  },
  summaryPrice: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.45),
    fontWeight: '700',
  },
  sectionLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
  },
  methodRow: {
    flexDirection: 'row',
    gap: responsiveWidth(3.8),
  },
  methodCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: responsiveHeight(10),
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 20,
    backgroundColor: AppColors.memorialCard,
  },
  methodCardSelected: {
    borderColor: AppColors.onboardingButton,
    backgroundColor: AppColors.onboardingButton,
  },
  methodIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(5.5),
    backgroundColor: AppColors.onboardingButton,
  },
  methodIconCircleSelected: {
    backgroundColor: AppColors.themeColor,
  },
  methodLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    fontWeight: '500',
    marginTop: responsiveHeight(1.1),
  },
  methodLabelSelected: {
    color: AppColors.themeColor,
  },
  cardDetailsTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.4),
  },
  fieldLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  fieldInput: {
    height: responsiveHeight(5.1),
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  fieldInputText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    paddingHorizontal: responsiveWidth(3.8),
  },
  inputRow: {
    flexDirection: 'row',
    gap: responsiveWidth(3.8),
  },
  inputHalf: {
    flex: 1,
  },
  savedCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: responsiveWidth(3.8),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  savedLeft: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  savedIconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    marginRight: responsiveWidth(3),
    borderRadius: 4,
    backgroundColor: AppColors.white,
  },
  savedNumber: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    fontWeight: '700',
  },
  savedExpiry: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1),
    marginTop: responsiveHeight(0.25),
  },
  defaultBadge: {
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.3),
    borderRadius: 4,
    backgroundColor: AppColors.memorialMutedButton,
  },
  defaultBadgeText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1),
  },
  walletTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
  },
  walletBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: responsiveWidth(4.8),
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    backgroundColor: AppColors.memorialCard,
  },
  walletText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
  },
  secureNotice: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(3.8),
    borderRadius: 16,
    backgroundColor: AppColors.memorialCard,
  },
  secureTextWrap: {
    flex: 1,
    marginLeft: responsiveWidth(3.8),
  },
  secureTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
  },
  secureText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1),
    lineHeight: responsiveHeight(1.5),
    marginTop: responsiveHeight(0.4),
  },
  termsText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.24),
    lineHeight: responsiveHeight(1.8),
    textAlign: 'center',
  },
  payButton: {
    backgroundColor: AppColors.onboardingButton,
  },
  payButtonText: {
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
  modalOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: responsiveWidth(6),
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  successBox: {
    width: '100%',
    padding: responsiveWidth(5.8),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: 24,
    backgroundColor: AppColors.memorialCard,
  },
  successHeading: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.4),
    fontWeight: '700',
    textAlign: 'center',
  },
  modalDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.homeBorder,
  },
  successIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: responsiveWidth(23),
    height: responsiveWidth(23),
    borderRadius: responsiveWidth(11.5),
    backgroundColor: AppColors.onboardingButton,
  },
  thankYou: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    textAlign: 'center',
  },
  backHomeButton: {
    borderRadius: 16,
    backgroundColor: AppColors.onboardingButton,
  },
  backHomeText: {
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
});

export default SubscriptionPaymentScreen;
