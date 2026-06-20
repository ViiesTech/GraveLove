import React, { useMemo, useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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

const packages = [
  { bonus: 5, hearts: 50, icon: 'star-border', isPopular: true, price: 50 },
  { bonus: 10, hearts: 100, icon: 'bolt', isPopular: false, price: 100 },
];

const PurchaseHeartsScreen = ({ navigation }) => {
  const [selectedPackage, setSelectedPackage] = useState(-1);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [successVisible, setSuccessVisible] = useState(false);

  const baseHearts = useMemo(() => (
    selectedPackage === -1
      ? Number.parseInt(customAmount, 10) || 0
      : packages[selectedPackage].hearts
  ), [customAmount, selectedPackage]);
  const bonusHearts = selectedPackage === -1 ? 0 : packages[selectedPackage].bonus;
  const totalHearts = baseHearts + bonusHearts;
  const totalAmount = baseHearts;

  const goHome = () => {
    setSuccessVisible(false);
    navigation.reset({ index: 0, routes: [{ name: 'UserTabs' }] });
  };

  return (
    <>
      <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
        <AppImageHeader
          image={AppAssets.images.userDashboardFront}
          onBack={() => navigation.goBack()}
          title="Purchase Hearts"
          subtitle="Choose a package that suits your needs"
          height={responsiveHeight(23.8)}
        />
        <View style={styles.body}>
          <OfferCard />
          <LineBreak height={2.4} />
          <CustomPackageCard
            customAmount={customAmount}
            isSelected={selectedPackage === -1}
            onAmountChange={value => {
              setSelectedPackage(-1);
              setCustomAmount(value);
            }}
            onPress={() => setSelectedPackage(-1)}
            totalAmount={selectedPackage === -1 ? totalAmount : 0}
          />
          <LineBreak height={2.4} />
          <AppText style={styles.sectionLabel}>Select Package</AppText>
          <LineBreak height={1.2} />
          {packages.map((item, index) => (
            <PackageCard
              key={item.hearts}
              item={item}
              isSelected={selectedPackage === index}
              onPress={() => setSelectedPackage(index)}
            />
          ))}

          <LineBreak height={2.4} />
          <AppText style={styles.sectionLabel}>Payment Method</AppText>
          <LineBreak height={1.2} />
          <View style={styles.paymentRow}>
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
          <OrderSummary
            baseHearts={baseHearts}
            bonusHearts={bonusHearts}
            totalAmount={totalAmount}
            totalHearts={totalHearts}
          />
          <LineBreak height={3.2} />
          <AppButton
            onPress={() => setSuccessVisible(true)}
            style={styles.completeButton}>
            Complete Purchase - ${totalAmount.toFixed(0)}
          </AppButton>
          <LineBreak height={1.2} />
          <AppText style={styles.secureNote}>Secure payment - Instant heart delivery</AppText>
        </View>
      </ScreenWrapper>
      <SuccessModal
        message="Purchase completed successfully"
        onBackHome={goHome}
        visible={successVisible}
      />
    </>
  );
};

const OfferCard = () => (
  <View style={styles.card}>
    <View style={styles.offerIcon}>
      <AppIcon name="favorite-border" color={AppColors.themeColor} size={18} />
    </View>
    <View style={styles.flex}>
      <AppText style={styles.cardTitle}>Special Offer</AppText>
      <AppText style={styles.cardMuted}>Get bonus hearts with larger packages!{`\n`}1 Heart = $1.00 USD</AppText>
    </View>
  </View>
);

const CustomPackageCard = ({ customAmount, isSelected, onAmountChange, onPress, totalAmount }) => (
  <TouchableOpacity activeOpacity={0.86} onPress={onPress} style={[styles.cardColumn, isSelected && styles.selectedCard]}>
    <AppText style={styles.cardHeader}>Custom Package</AppText>
    <LineBreak height={1.6} />
    <View style={styles.packageTop}>
      <View style={styles.squareIcon}>
        <AppIcon name="favorite-border" color={AppColors.themeColor} size={24} />
      </View>
      <View style={styles.customCopy}>
        <AppText style={styles.cardMutedSmall}>Enter num of heart</AppText>
        <LineBreak height={0.4} />
        <View style={styles.customInputRow}>
          <View style={styles.customSmallInput}>
            <TextInput
              keyboardType="number-pad"
              onChangeText={onAmountChange}
              onFocus={onPress}
              placeholder="Number"
              placeholderTextColor="rgba(255,255,255,0.32)"
              style={styles.customInput}
              value={customAmount}
            />
          </View>
          <AppText style={styles.cardTitle}>Hearts</AppText>
        </View>
      </View>
      {isSelected ? <AppIcon name="check-circle-outline" color={AppColors.white} size={24} /> : null}
    </View>
    <View style={styles.divider} />
    <SummaryLine label="Price per heart:" value="$1.00" />
    <LineBreak height={0.8} />
    <SummaryLine label="Total amount:" value={`$${totalAmount.toFixed(2)}`} strong />
  </TouchableOpacity>
);

const PackageCard = ({ isSelected, item, onPress }) => (
  <TouchableOpacity activeOpacity={0.86} onPress={onPress} style={[styles.packageCard, isSelected && styles.selectedCard]}>
    <View style={styles.squareIcon}>
      <AppIcon name={item.icon} color={AppColors.themeColor} size={24} />
    </View>
    <View style={styles.packageCopy}>
      <View style={styles.inlineRow}>
        <AppIcon name="favorite-border" color={AppColors.white} size={14} />
        <AppText style={styles.packageHearts}>{item.hearts}</AppText>
        <AppText style={styles.packageBonus}>({item.bonus} Hearts Rewards)</AppText>
      </View>
      <LineBreak height={0.4} />
      <View style={styles.inlineRow}>
        <AppText style={styles.packagePrice}>$ {item.price}</AppText>
        <AppText style={styles.packageBonus}>$1.00 per heart</AppText>
      </View>
      <AppText style={styles.packageBonus}>Total: {item.hearts + item.bonus} hearts</AppText>
    </View>
    {item.isPopular ? (
      <View style={styles.popularBadge}>
        <AppText style={styles.popularText}>Most Popular</AppText>
      </View>
    ) : null}
  </TouchableOpacity>
);

const PaymentMethodCard = ({ icon, isSelected, label, onPress }) => (
  <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={[styles.paymentCard, isSelected && styles.paymentCardActive]}>
    <AppIcon name={icon} color={isSelected ? AppColors.themeColor : AppColors.white} size={24} />
    <LineBreak height={0.8} />
    <AppText style={[styles.paymentLabel, isSelected && styles.paymentLabelActive]}>{label}</AppText>
  </TouchableOpacity>
);

const Field = ({ iconName, label, placeholder }) => (
  <View>
    <AppText style={styles.inputLabel}>{label}</AppText>
    <LineBreak height={0.8} />
    <View style={styles.inputField}>
      {iconName ? <AppIcon name={iconName} color={AppColors.homeTextMuted} size={20} /> : null}
      <TextInput placeholder={placeholder} placeholderTextColor="rgba(255,255,255,0.32)" style={styles.input} />
    </View>
  </View>
);

const CardDetails = () => (
  <View>
    <AppText style={styles.cardHeader}>Card Details</AppText>
    <LineBreak height={1.2} />
    <Field iconName="credit-card" label="Card Number" placeholder="1234 5678 9012 3456" />
    <LineBreak height={1.6} />
    <View style={styles.inputRow}>
      <View style={styles.flex}><Field label="Expiry Date" placeholder="MM/YY" /></View>
      <View style={styles.flex}><Field label="CVV" placeholder="123" /></View>
    </View>
    <LineBreak height={1.6} />
    <Field label="Cardholder Name" placeholder="John Doe" />
    <LineBreak height={2.4} />
  </View>
);

const DigitalWallet = () => (
  <View>
    <AppText style={styles.walletTitle}>Google Play</AppText>
    <LineBreak height={1.2} />
    <View style={styles.walletCard}>
      <View style={styles.walletLogo}>
        <AppText style={styles.walletLogoText}>GL</AppText>
      </View>
      <AppText style={styles.cardTitle}>Grave Love</AppText>
      <View style={styles.spacer} />
      <AppIcon name="check-circle" color={AppColors.white} size={22} />
    </View>
    <LineBreak height={2.4} />
  </View>
);

const OrderSummary = ({ baseHearts, bonusHearts, totalAmount, totalHearts }) => (
  <View style={styles.cardColumn}>
    <AppText style={styles.cardHeader}>Order Summary</AppText>
    <LineBreak height={2.4} />
    <SummaryLine icon="favorite-border" label="Base Hearts" value={`${baseHearts}`} />
    <LineBreak height={1.2} />
    <SummaryLine icon="card-giftcard" label="Bonus Hearts" value={`+${bonusHearts}`} />
    <View style={styles.divider} />
    <SummaryLine icon="favorite-border" label="Total Hearts" value={`${totalHearts}`} strong />
    <View style={styles.divider} />
    <View style={styles.amountRow}>
      <AppText style={styles.amountLabel}>Amount to Pay</AppText>
      <AppText style={styles.amountValue}>${totalAmount.toFixed(0)}</AppText>
    </View>
  </View>
);

const SummaryLine = ({ icon, label, strong, value }) => (
  <View style={styles.summaryLine}>
    <AppText style={[styles.summaryLabel, strong && styles.summaryLabelStrong]}>{label}</AppText>
    <View style={styles.inlineRow}>
      {icon ? <AppIcon name={icon} color={AppColors.white} size={16} /> : null}
      <AppText style={[styles.summaryValue, strong && styles.summaryValueStrong]}>{value}</AppText>
    </View>
  </View>
);

const SuccessModal = ({ message, onBackHome, visible }) => (
  <Modal transparent animationType="fade" visible={visible}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalBox}>
        <AppText style={styles.modalTitle}>Successful</AppText>
        <LineBreak height={1.6} />
        <View style={styles.divider} />
        <LineBreak height={2.4} />
        <View style={styles.successCircle}>
          <AppIcon name="check" color={AppColors.white} size={46} />
        </View>
        <LineBreak height={2.4} />
        <AppText style={styles.modalMessage}>{message}</AppText>
        <LineBreak height={3.2} />
        <AppButton onPress={onBackHome} style={styles.modalButton}>Back to home</AppButton>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  amountLabel: { color: AppColors.white, fontSize: responsiveFontSize(1.55) },
  amountRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  amountValue: { color: AppColors.white, fontSize: responsiveFontSize(2.35), fontWeight: '700' },
  body: { paddingHorizontal: responsiveWidth(5.8), paddingTop: responsiveHeight(2.4) },
  card: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16, borderWidth: 0.5, flexDirection: 'row', padding: responsiveWidth(4) },
  cardColumn: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16, borderWidth: 0.5, padding: responsiveWidth(4.8) },
  cardHeader: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  cardMuted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2), lineHeight: responsiveHeight(1.8), marginTop: responsiveHeight(0.4) },
  cardMutedSmall: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15) },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.4), fontWeight: '700' },
  completeButton: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
  content: { paddingBottom: responsiveHeight(5) },
  customCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  customInput: { color: AppColors.white, flex: 1, fontSize: responsiveFontSize(1.15), height: responsiveHeight(3.2), padding: 0 },
  customInputRow: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(2) },
  customSmallInput: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderColor: AppColors.homeBorder, borderRadius: 4, borderWidth: 0.5, height: responsiveHeight(3.1), justifyContent: 'center', paddingHorizontal: responsiveWidth(2), width: responsiveWidth(20) },
  divider: { backgroundColor: AppColors.homeBorder, height: 0.5, marginVertical: responsiveHeight(1.6) },
  flex: { flex: 1 },
  inlineRow: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(1.2) },
  input: { color: AppColors.white, flex: 1, fontSize: responsiveFontSize(1.35), padding: 0 },
  inputField: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderColor: AppColors.homeBorder, borderRadius: 16, borderWidth: 0.5, flexDirection: 'row', gap: responsiveWidth(2.5), height: responsiveHeight(5.2), paddingHorizontal: responsiveWidth(3.8) },
  inputLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18) },
  inputRow: { flexDirection: 'row', gap: responsiveWidth(3.8) },
  modalBox: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 24, borderWidth: 0.5, padding: responsiveWidth(5.8), width: '100%' },
  modalButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 16 },
  modalMessage: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.5), textAlign: 'center' },
  modalOverlay: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.55)', flex: 1, justifyContent: 'center', padding: responsiveWidth(6) },
  modalTitle: { color: AppColors.white, fontSize: responsiveFontSize(2.3), fontWeight: '700', textAlign: 'center' },
  offerIcon: { alignItems: 'center', backgroundColor: AppColors.white, borderRadius: responsiveWidth(4.8), height: responsiveWidth(9.6), justifyContent: 'center', marginRight: responsiveWidth(3.8), width: responsiveWidth(9.6) },
  packageBonus: { color: AppColors.homeTextMuted, flexShrink: 1, fontSize: responsiveFontSize(1.05) },
  packageCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16, borderWidth: 0.5, flexDirection: 'row', marginBottom: responsiveHeight(1.2), padding: responsiveWidth(4.8) },
  packageCopy: { flex: 1, marginHorizontal: responsiveWidth(3.5) },
  packageHearts: { color: AppColors.white, fontSize: responsiveFontSize(2), fontWeight: '700' },
  packagePrice: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  packageTop: { alignItems: 'center', flexDirection: 'row' },
  paymentCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16, borderWidth: 0.5, flex: 1, paddingVertical: responsiveHeight(1.6) },
  paymentCardActive: { backgroundColor: AppColors.onboardingButton, borderColor: AppColors.onboardingButton },
  paymentLabel: { color: AppColors.white, fontSize: responsiveFontSize(1.3), fontWeight: '700' },
  paymentLabelActive: { color: AppColors.themeColor },
  paymentRow: { flexDirection: 'row', gap: responsiveWidth(3.8) },
  popularBadge: { backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 12, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.4) },
  popularText: { color: AppColors.white, fontSize: responsiveFontSize(0.95) },
  sectionLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35) },
  secureNote: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12), textAlign: 'center' },
  selectedCard: { borderColor: AppColors.white },
  spacer: { flex: 1 },
  squareIcon: { alignItems: 'center', backgroundColor: AppColors.white, borderRadius: 12, height: responsiveWidth(11), justifyContent: 'center', width: responsiveWidth(11) },
  successCircle: { alignItems: 'center', alignSelf: 'center', backgroundColor: AppColors.onboardingButton, borderRadius: responsiveWidth(11), height: responsiveWidth(22), justifyContent: 'center', width: responsiveWidth(22) },
  summaryLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25) },
  summaryLabelStrong: { color: AppColors.white, fontSize: responsiveFontSize(1.5) },
  summaryLine: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  summaryValue: { color: AppColors.white, fontSize: responsiveFontSize(1.28) },
  summaryValueStrong: { fontSize: responsiveFontSize(1.65), fontWeight: '700' },
  walletCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 20, borderWidth: 0.5, flexDirection: 'row', padding: responsiveWidth(4.8) },
  walletLogo: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8, height: responsiveWidth(10), justifyContent: 'center', marginRight: responsiveWidth(3), width: responsiveWidth(10) },
  walletLogoText: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  walletTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.6), fontWeight: '700' },
});

export default PurchaseHeartsScreen;
