import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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

const serviceFee = 45;
const processingFee = 2.5;
const maxHearts = 1250;

const ServicePaymentScreen = ({ navigation }) => {
  const [hearts, setHearts] = useState(0);
  const [method, setMethod] = useState('card');
  const discount = hearts * 0.01;
  const total = serviceFee + processingFee - discount;

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Service Completed - Payment"
        subtitle="Review and complete payment"
      />
      <View style={styles.content}>
        <GlassCard contentStyle={styles.successCard}>
          <View style={styles.checkCircle}><AppIcon name="check" color={AppColors.themeColor} size={20} /></View>
          <View style={styles.flex}>
            <AppText style={styles.cardTitleSmall}>Service Completed Successfully</AppText>
            <AppText style={styles.muted}>by Garden Care Services</AppText>
          </View>
        </GlassCard>

        <LineBreak height={2.4} />
        <DetailCard title="Service Details">
          <View style={styles.memoryBadge}><AppText style={styles.badgeText}>Robert James Thompson (Father)</AppText></View>
          <LineBreak height={1.2} />
          <InfoRow label="Service" value="Grave Cleaning" />
          <InfoRow label="Vendor" value="Garden Care Services" />
          <IconLine icon="location-on" text="Forest Lawn Memorial Park - Garden of Peace, Section A" />
          <IconLine icon="calendar-today" text="Oct 25, 2025 at 11:00 AM" />
        </DetailCard>

        <DetailCard title="Before & After Photos">
          <View style={styles.photoRow}>
            <PhotoBox label="Before" image={AppAssets.images.vendor1} />
            <PhotoBox label="After" image={AppAssets.images.headerImage} />
          </View>
        </DetailCard>

        <DetailCard title="Payment Summary">
          <PriceRow label="Service Fee" value={serviceFee} />
          <PriceRow label="Hearts" value={-discount} />
          <PriceRow label="Processing Fee" value={processingFee} />
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <AppText style={styles.cardTitleSmall}>Total Amount</AppText>
            <AppText style={styles.cardTitleSmall}>${total.toFixed(2)}</AppText>
          </View>
        </DetailCard>

        <GlassCard contentStyle={styles.card}>
          <View style={styles.successCard}>
            <View style={styles.checkCircle}><AppIcon name="favorite" color={AppColors.themeColor} size={16} /></View>
            <View>
              <AppText style={styles.cardTitleSmall}>Use Hearts</AppText>
              <AppText style={styles.muted}>Pay with your heart balance</AppText>
            </View>
          </View>
          <LineBreak height={1.6} />
          <View style={styles.balanceRow}>
            <AppText style={styles.muted}>Available Balance</AppText>
            <AppText style={styles.cardTitleSmall}>{maxHearts}</AppText>
          </View>
          <LineBreak height={1.6} />
          <AppText style={styles.label}>How many hearts to use?</AppText>
          <LineBreak height={1.2} />
          <View style={styles.counterRow}>
            <CounterButton icon="remove" onPress={() => setHearts(value => Math.max(0, value - 50))} />
            <View style={styles.heartsBox}><AppText style={styles.muted}>{hearts} hearts</AppText></View>
            <CounterButton icon="add" onPress={() => setHearts(value => Math.min(maxHearts, value + 50))} />
          </View>
        </GlassCard>

        <LineBreak height={3} />
        <AppText style={styles.sectionTitle}>Payment Method</AppText>
        <LineBreak height={1.2} />
        <View style={styles.methodRow}>
          <MethodCard active={method === 'card'} icon="credit-card" label="Credit Card" onPress={() => setMethod('card')} />
          <MethodCard active={method === 'wallet'} icon="account-balance-wallet" label="Digital Wallet" onPress={() => setMethod('wallet')} />
        </View>

        <LineBreak height={2.4} />
        {method === 'card' ? <CardDetails /> : <WalletDetails total={total} />}
        <LineBreak height={3} />
        <AppButton style={styles.primaryButton} onPress={() => navigation.navigate('PaymentStatus')}>
          Pay ${total.toFixed(2)}
        </AppButton>
      </View>
    </ScreenWrapper>
  );
};

const DetailCard = ({ children, title }) => (
  <GlassCard contentStyle={styles.card}>
    <AppText style={styles.cardTitle}>{title}</AppText>
    <LineBreak height={1.5} />
    {children}
  </GlassCard>
);

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <AppText style={styles.muted}>{label}</AppText>
    <AppText style={styles.value}>{value}</AppText>
  </View>
);

const IconLine = ({ icon, text }) => (
  <View style={styles.iconLine}>
    <AppIcon name={icon} color={AppColors.homeTextMuted} size={14} />
    <AppText style={styles.iconText}>{text}</AppText>
  </View>
);

const PriceRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <AppText style={styles.muted}>{label}</AppText>
    <AppText style={styles.value}>{value < 0 ? '-' : ''}${Math.abs(value).toFixed(2)}</AppText>
  </View>
);

const PhotoBox = ({ image, label }) => (
  <View style={styles.photoBox}>
    <Image source={image} style={styles.photo} />
    <View style={styles.photoBadge}><AppText style={styles.badgeText}>{label}</AppText></View>
  </View>
);

const CounterButton = ({ icon, onPress }) => (
  <TouchableOpacity activeOpacity={0.78} onPress={onPress} style={styles.counterButton}>
    <AppIcon name={icon} color={AppColors.white} size={20} />
  </TouchableOpacity>
);

const MethodCard = ({ active, icon, label, onPress }) => (
  <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={[styles.methodCard, active && styles.methodActive]}>
    <AppIcon name={icon} color={AppColors.white} size={22} />
    <AppText style={styles.methodText}>{label}</AppText>
  </TouchableOpacity>
);

const CardDetails = () => (
  <View>
    <AppText style={styles.cardTitleSmall}>Card Details</AppText>
    <PaymentInput label="Card Number" placeholder="1234 5678 9012 3456" />
    <View style={styles.rowGap}>
      <PaymentInput half label="Expiry Date" placeholder="MM/YY" />
      <PaymentInput half label="CVV" placeholder="123" />
    </View>
    <PaymentInput label="Cardholder Name" placeholder="John Doe" />
    <LineBreak height={1.6} />
    <AppText style={styles.sectionTitle}>Saved Cards</AppText>
    <LineBreak height={1.2} />
    <GlassCard contentStyle={styles.savedCard}>
      <AppIcon name="credit-card" color={AppColors.themeColor} size={18} />
      <View style={styles.flex}>
        <AppText style={styles.cardTitleSmall}>•••• 4242</AppText>
        <AppText style={styles.muted}>Expires 12/25</AppText>
      </View>
      <View style={styles.memoryBadge}><AppText style={styles.badgeText}>Default</AppText></View>
    </GlassCard>
  </View>
);

const WalletDetails = ({ total }) => (
  <GlassCard contentStyle={styles.card}>
    <View style={styles.walletRow}>
      <View style={styles.walletLogo}><AppText style={styles.cardTitleSmall}>GL</AppText></View>
      <AppText style={styles.cardTitle}>Grave Love</AppText>
      <View style={styles.flexEnd}>
        <AppText style={styles.cardTitleSmall}>${total.toFixed(2)}</AppText>
        <AppText style={styles.muted}>+ tax ⓘ</AppText>
      </View>
    </View>
  </GlassCard>
);

const PaymentInput = ({ half = false, label, placeholder }) => (
  <View style={[styles.paymentField, half && styles.half]}>
    <AppText style={styles.muted}>{label}</AppText>
    <LineBreak height={0.8} />
    <TextInput placeholder={placeholder} placeholderTextColor={AppColors.homeTextMuted} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(8) },
  card: { marginBottom: responsiveHeight(1.6), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16 },
  successCard: { alignItems: 'center', flexDirection: 'row' },
  checkCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(9), height: responsiveWidth(9), borderRadius: responsiveWidth(4.5), backgroundColor: AppColors.white, marginRight: responsiveWidth(3) },
  flex: { flex: 1, marginLeft: responsiveWidth(3) },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.62), fontWeight: '700' },
  cardTitleSmall: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15) },
  memoryBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.35), backgroundColor: 'rgba(255,255,255,0.12)' },
  badgeText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(0.95) },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(0.8) },
  value: { color: AppColors.white, fontSize: responsiveFontSize(1.22), fontWeight: '600' },
  iconLine: { alignItems: 'flex-start', flexDirection: 'row', marginBottom: responsiveHeight(0.8) },
  iconText: { color: AppColors.homeTextMuted, flex: 1, fontSize: responsiveFontSize(1.12), lineHeight: responsiveFontSize(1.7), marginLeft: responsiveWidth(2) },
  photoRow: { flexDirection: 'row', gap: responsiveWidth(3) },
  photoBox: { flex: 1 },
  photo: { width: '100%', height: responsiveHeight(12), borderRadius: 14 },
  photoBadge: { position: 'absolute', left: responsiveWidth(2), bottom: responsiveHeight(0.8), borderRadius: 20, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.25), backgroundColor: AppColors.memorialCard },
  divider: { height: 0.5, backgroundColor: AppColors.homeBorder, marginVertical: responsiveHeight(1.2) },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', padding: responsiveWidth(3), borderRadius: 12, borderWidth: 0.5, borderColor: AppColors.homeBorder, backgroundColor: 'rgba(255,255,255,0.08)' },
  label: { color: AppColors.white, fontSize: responsiveFontSize(1.28) },
  counterRow: { alignItems: 'center', flexDirection: 'row' },
  counterButton: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11), height: responsiveWidth(11), borderRadius: responsiveWidth(5.5), backgroundColor: AppColors.onboardingButton },
  heartsBox: { flex: 1, alignItems: 'center', justifyContent: 'center', height: responsiveHeight(4.8), marginHorizontal: responsiveWidth(3), borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)' },
  sectionTitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), fontWeight: '600' },
  methodRow: { flexDirection: 'row', gap: responsiveWidth(4) },
  methodCard: { flex: 1, alignItems: 'center', justifyContent: 'center', height: responsiveHeight(8.6), borderWidth: 0.5, borderColor: AppColors.homeBorder, borderRadius: 16, backgroundColor: AppColors.memorialCard },
  methodActive: { borderColor: AppColors.white },
  methodText: { color: AppColors.white, fontSize: responsiveFontSize(1.18), marginTop: responsiveHeight(0.6), textAlign: 'center' },
  rowGap: { flexDirection: 'row', gap: responsiveWidth(4) },
  paymentField: { marginTop: responsiveHeight(1.4) },
  half: { flex: 1 },
  input: { height: responsiveHeight(4.8), borderWidth: 0.5, borderColor: AppColors.homeBorder, borderRadius: 10, color: AppColors.white, paddingHorizontal: responsiveWidth(3.4), backgroundColor: 'rgba(4,47,103,0.5)' },
  savedCard: { alignItems: 'center', flexDirection: 'row', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  walletRow: { alignItems: 'center', flexDirection: 'row' },
  walletLogo: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.12)', marginRight: responsiveWidth(3) },
  flexEnd: { flex: 1, alignItems: 'flex-end' },
  primaryButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 30 },
});

export default ServicePaymentScreen;
