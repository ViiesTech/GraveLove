import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
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

const VendorCheckoutScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState(0);

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Top Vendors"
        subtitle="Our most trusted service providers"
      />
      <View style={styles.content}>
        <VendorInfoCard />
        <LineBreak height={2.58} />
        <SelectedServiceCard />
        <LineBreak height={3.43} />
        <AppText style={styles.sectionTitle}>Payment Info</AppText>
        <LineBreak height={1.72} />
        <View style={styles.paymentRow}>
          <PaymentToggle
            icon="credit-card"
            isSelected={paymentMethod === 0}
            label="Credit Card"
            onPress={() => setPaymentMethod(0)}
          />
          <PaymentToggle
            icon="account-balance-wallet"
            isSelected={paymentMethod === 1}
            label="Digital Wallet"
            onPress={() => setPaymentMethod(1)}
          />
        </View>
        <LineBreak height={2.58} />
        {paymentMethod === 0 ? <CreditCardForm /> : <WalletCard />}
        <LineBreak height={3.43} />
        <OrderSummary />
        <LineBreak height={2.58} />
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('BookingServiceStep2')}
          style={styles.bookButton}>
          <AppText style={styles.bookText}>Book</AppText>
        </TouchableOpacity>
        <LineBreak height={4.3} />
      </View>
    </ScreenWrapper>
  );
};

const VendorInfoCard = () => (
  <GlassCard contentStyle={styles.vendorCard}>
    <View style={styles.vendorTop}>
      <Image source={AppAssets.images.vendor1} style={styles.vendorImage} />
      <View style={styles.vendorCopy}>
        <AppText style={styles.vendorName}>Wilson Care House</AppText>
        <View style={styles.ratingRow}>
          <AppIcon name="star" color={AppColors.starYellow} size={14} />
          <AppText style={styles.muted}>4.9 • 328 reviews</AppText>
        </View>
        <View style={styles.vendorBadge}>
          <AppText style={styles.vendorBadgeText}>Top Rated 2024</AppText>
        </View>
      </View>
    </View>
    <LineBreak height={2.15} />
    <View style={styles.statsRow}>
      <Stat label="Services" value="1250" />
      <Stat label="Experience" value="8 years" />
      <Stat label="Response" value="2 hours" />
    </View>
  </GlassCard>
);

const Stat = ({ label, value }) => (
  <View style={styles.statBox}>
    <AppText style={styles.statLabel}>{label}</AppText>
    <AppText style={styles.statValue}>{value}</AppText>
  </View>
);

const SelectedServiceCard = () => (
  <View style={styles.selectedCard}>
    <View style={styles.selectedTop}>
      <View style={styles.checkBox}>
        <AppIcon name="check" color={AppColors.memorialCard} size={14} />
      </View>
      <AppText style={styles.selectedTitle}>Flower Service</AppText>
      <View style={styles.downCircle}>
        <AppIcon name="keyboard-arrow-down" color={AppColors.black} size={16} />
      </View>
    </View>
    <LineBreak height={0.85} />
    <AppText style={styles.selectedDesc}>
      Fresh seasonal flowers arranged and placed with care at the memorial site
    </AppText>
  </View>
);

const PaymentToggle = ({ icon, isSelected, label, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.82}
    onPress={onPress}
    style={[styles.paymentToggle, isSelected && styles.paymentToggleActive]}>
    <AppIcon
      name={icon}
      color={isSelected ? AppColors.memorialCard : AppColors.white}
      size={28}
    />
    <LineBreak height={0.85} />
    <AppText style={[styles.paymentText, isSelected && styles.paymentTextActive]}>
      {label}
    </AppText>
  </TouchableOpacity>
);

const CreditCardForm = () => (
  <View>
    <AppText style={styles.label}>Card Details</AppText>
    <LineBreak height={0.85} />
    <CheckoutField iconName="credit-card" label="Card Number" placeholder="1234 5678 9012 3456" />
    <LineBreak height={1.72} />
    <View style={styles.twoCol}>
      <View style={styles.half}>
        <CheckoutField label="Expiry Date" placeholder="MM/YY" />
      </View>
      <View style={styles.half}>
        <CheckoutField label="CVV" placeholder="123" />
      </View>
    </View>
    <LineBreak height={1.72} />
    <CheckoutField label="Cardholder Name" placeholder="John Doe" />
    <LineBreak height={2.58} />
    <AppText style={styles.label}>Saved Cards</AppText>
    <LineBreak height={0.85} />
    <View style={styles.savedCard}>
      <View style={styles.cardIcon}>
        <AppIcon name="credit-card" color={AppColors.black} size={20} />
      </View>
      <View style={styles.vendorCopy}>
        <AppText style={styles.savedTitle}>•••• 4242</AppText>
        <AppText style={styles.muted}>Expires 12/25</AppText>
      </View>
      <View style={styles.defaultPill}>
        <AppText style={styles.defaultText}>Default</AppText>
      </View>
    </View>
  </View>
);

const CheckoutField = ({ iconName, label, placeholder }) => (
  <View>
    <AppText style={styles.label}>{label}</AppText>
    <LineBreak height={0.85} />
    <AppTextInput
      iconName={iconName}
      placeholder={placeholder}
      style={styles.input}
      inputStyle={styles.inputText}
    />
  </View>
);

const WalletCard = () => (
  <View>
    <AppText style={styles.sectionTitle}>Google Play</AppText>
    <LineBreak height={1.29} />
    <GlassCard contentStyle={styles.walletCard}>
      <View style={styles.glBox}>
        <AppText style={styles.glText}>GL</AppText>
      </View>
      <AppText style={styles.walletTitle}>Grave Love</AppText>
      <View style={styles.walletAmount}>
        <AppText style={styles.walletPrice}>$180</AppText>
        <AppText style={styles.muted}>+ tax ⓘ</AppText>
      </View>
    </GlassCard>
  </View>
);

const OrderSummary = () => (
  <GlassCard contentStyle={styles.summaryCard}>
    <AppText style={styles.sectionTitle}>Order Summary</AppText>
    <LineBreak height={1.72} />
    <SummaryRow label="Name" value="Mary Johnson" bold />
    <View style={styles.divider} />
    <AppText style={styles.label}>Service Type</AppText>
    <LineBreak height={0.85} />
    <SummaryRow label="Lily Flower" value="$90" />
    <SummaryRow label="Rose Flower" value="$90" />
    <View style={styles.divider} />
    <SummaryRow label="Amount to Pay" value="$180" bold large />
  </GlassCard>
);

const SummaryRow = ({ bold, label, large, value }) => (
  <View style={styles.summaryRow}>
    <AppText style={[styles.summaryLabel, bold && styles.summaryBold]}>{label}</AppText>
    <AppText style={[styles.summaryValue, bold && styles.summaryBold, large && styles.summaryLarge]}>
      {value}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.homeBody },
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8) },
  vendorCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    padding: responsiveWidth(4.83),
  },
  vendorTop: { alignItems: 'center', flexDirection: 'row' },
  vendorImage: { borderRadius: 12, height: responsiveWidth(14.5), width: responsiveWidth(14.5) },
  vendorCopy: { flex: 1, marginLeft: responsiveWidth(3.86) },
  vendorName: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  ratingRow: { alignItems: 'center', flexDirection: 'row', marginTop: responsiveHeight(0.42) },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginLeft: responsiveWidth(1) },
  vendorBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 8,
    marginTop: responsiveHeight(0.6),
    paddingHorizontal: responsiveWidth(1.93),
    paddingVertical: responsiveHeight(0.25),
  },
  vendorBadgeText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.05),
    width: responsiveWidth(21.7),
  },
  statLabel: { color: AppColors.memorialCard, fontSize: responsiveFontSize(1) },
  statValue: { color: AppColors.memorialCard, fontSize: responsiveFontSize(1.3), fontWeight: '700' },
  selectedCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    padding: responsiveWidth(3.86),
  },
  selectedTop: { alignItems: 'center', flexDirection: 'row' },
  checkBox: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 4,
    height: responsiveWidth(4.83),
    justifyContent: 'center',
    width: responsiveWidth(4.83),
  },
  selectedTitle: { color: AppColors.white, flex: 1, fontSize: responsiveFontSize(1.45), fontWeight: '700', marginLeft: responsiveWidth(2.9) },
  downCircle: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(2.4),
    height: responsiveWidth(4.83),
    justifyContent: 'center',
    width: responsiveWidth(4.83),
  },
  selectedDesc: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18), lineHeight: responsiveHeight(2.1) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  paymentRow: { flexDirection: 'row', gap: responsiveWidth(3.86) },
  paymentToggle: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    height: responsiveHeight(10.75),
    justifyContent: 'center',
  },
  paymentToggleActive: { backgroundColor: AppColors.white, borderColor: AppColors.white },
  paymentText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15) },
  paymentTextActive: { color: AppColors.memorialCard },
  label: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18) },
  input: { backgroundColor: 'rgba(4, 47, 103, 0.55)', borderColor: AppColors.homeBorder, borderRadius: 12, height: responsiveHeight(5.15) },
  inputText: { color: AppColors.white, paddingHorizontal: responsiveWidth(3.86) },
  twoCol: { flexDirection: 'row', gap: responsiveWidth(3.86) },
  half: { flex: 1 },
  savedCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
  },
  cardIcon: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 4,
    height: responsiveHeight(3.2),
    justifyContent: 'center',
    width: responsiveWidth(9.66),
  },
  savedTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.3), fontWeight: '700' },
  defaultPill: { backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 20, paddingHorizontal: responsiveWidth(2.9), paddingVertical: responsiveHeight(0.6) },
  defaultText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  walletCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    padding: responsiveWidth(4.83),
  },
  glBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 8,
    height: responsiveWidth(9.66),
    justifyContent: 'center',
    width: responsiveWidth(9.66),
  },
  glText: { color: AppColors.white, fontWeight: '700' },
  walletTitle: { color: AppColors.white, flex: 1, fontSize: responsiveFontSize(1.55), marginLeft: responsiveWidth(2.9) },
  walletAmount: { alignItems: 'flex-end' },
  walletPrice: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  summaryCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, padding: responsiveWidth(4.83) },
  divider: { backgroundColor: AppColors.homeBorder, height: 1, marginVertical: responsiveHeight(1.29) },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(1.29) },
  summaryLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25) },
  summaryValue: { color: AppColors.white, fontSize: responsiveFontSize(1.25) },
  summaryBold: { fontWeight: '700' },
  summaryLarge: { fontSize: responsiveFontSize(1.9) },
  bookButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.72),
  },
  bookText: { color: AppColors.black, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
});

export default VendorCheckoutScreen;
