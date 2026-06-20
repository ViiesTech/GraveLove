import React, { useState } from 'react';
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

const recentRecipients = [
  { email: 'sarah.j@email.com', initials: 'SJ', name: 'Sarah Johnson', time: '2 weeks ago' },
  { email: 'michael.b@email.com', initials: 'MB', name: 'Michael Brown', time: '1 month ago' },
  { email: 'emily.d@email.com', initials: 'ED', name: 'Emily Davis', time: '2 months ago' },
];

const quickAmounts = [50, 100, 150, 200];

const ShareHeartsScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);
  const [successVisible, setSuccessVisible] = useState(false);
  const [username, setUsername] = useState('John008');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');

  const goHome = () => {
    setSuccessVisible(false);
    navigation.reset({ index: 0, routes: [{ name: 'UserTabs' }] });
  };

  const selectAmount = value => {
    setSelectedQuickAmount(value);
    setAmount(String(value));
  };

  return (
    <>
      <ScreenWrapper isScroll isKeyboardAvoiding contentContainerStyle={styles.content}>
        <AppImageHeader
          image={AppAssets.images.userDashboardFront}
          onBack={() => navigation.goBack()}
          title="Share Hearts"
          subtitle="Send heart to family or friends"
          height={responsiveHeight(23.8)}
        />
        <View style={styles.body}>
          <BalanceCard />
          <LineBreak height={3.2} />
          <SectionHeader icon="people-outline" iconSet="ion" title="Recent Recipients" />
          <LineBreak height={1.6} />
          {recentRecipients.map(item => <RecipientCard item={item} key={item.email} />)}

          <LineBreak height={3.2} />
          <AppText style={styles.sectionTitle}>Recipient Details</AppText>
          <LineBreak height={1.6} />
          <InputLabel icon="person-outline" iconSet="ion" label="Recipient Name" />
          <LineBreak height={0.8} />
          <InputField
            onChangeText={setRecipientName}
            placeholder="Enter recipient's name"
            value={recipientName}
          />
          <LineBreak height={1.6} />
          <InputLabel icon="alternate-email" label="User Name" />
          <LineBreak height={0.8} />
          <InputField onChangeText={setUsername} placeholder="Username" value={username} />

          <LineBreak height={3.2} />
          <AppText style={styles.sectionTitle}>Amount to Send</AppText>
          <LineBreak height={1.6} />
          <InputLabel icon="generating-tokens" label="Number of Hearts" />
          <LineBreak height={0.8} />
          <InputField
            keyboardType="number-pad"
            onChangeText={value => {
              setSelectedQuickAmount(null);
              setAmount(value);
            }}
            placeholder="Enter amount"
            value={amount}
          />
          <LineBreak height={1.6} />
          <AppText style={styles.quickLabel}>Quick Select</AppText>
          <LineBreak height={1.2} />
          <View style={styles.quickRow}>
            {quickAmounts.map(value => (
              <QuickAmount
                key={value}
                amount={value}
                isSelected={selectedQuickAmount === value}
                onPress={() => selectAmount(value)}
              />
            ))}
          </View>

          <LineBreak height={1.6} />
          <InputLabel icon="chat-bubble-outline" label="Message (Optional)" />
          <LineBreak height={0.8} />
          <View style={styles.messageBox}>
            <TextInput
              multiline
              onChangeText={setMessage}
              placeholder="Add a personal message..."
              placeholderTextColor="rgba(255,255,255,0.32)"
              style={styles.messageInput}
              value={message}
            />
          </View>

          <LineBreak height={4} />
          <AppButton onPress={() => setSuccessVisible(true)} style={styles.shareButton}>
            Share Hearts
          </AppButton>
        </View>
      </ScreenWrapper>
      <SuccessModal
        message="Hearts shared successfully"
        onBackHome={goHome}
        visible={successVisible}
      />
    </>
  );
};

const BalanceCard = () => (
  <View style={styles.balanceCard}>
    <View>
      <AppText style={styles.muted}>Available Balance</AppText>
      <LineBreak height={0.8} />
      <View style={styles.heartsRow}>
        <AppIcon name="favorite-border" color={AppColors.white} size={24} />
        <AppText style={styles.balanceNumber}>200</AppText>
        <AppText style={styles.heartsLabel}>Hearts</AppText>
      </View>
    </View>
    <View style={styles.sendCircle}>
      <AppIcon name="send" color={AppColors.themeColor} size={24} />
    </View>
  </View>
);

const SectionHeader = ({ icon, iconSet, title }) => (
  <View style={styles.sectionHeader}>
    <AppIcon iconSet={iconSet} name={icon} color={AppColors.white} size={20} />
    <AppText style={styles.sectionTitle}>{title}</AppText>
  </View>
);

const RecipientCard = ({ item }) => (
  <View style={styles.recipientCard}>
    <View style={styles.initialsCircle}>
      <AppText style={styles.initials}>{item.initials}</AppText>
    </View>
    <View style={styles.recipientCopy}>
      <AppText style={styles.recipientName}>{item.name}</AppText>
      <AppText style={styles.recipientEmail}>{item.email}</AppText>
    </View>
    <AppText style={styles.recipientTime}>{item.time}</AppText>
  </View>
);

const InputLabel = ({ icon, iconSet = 'material', label }) => (
  <View style={styles.inputLabelRow}>
    <AppIcon iconSet={iconSet} name={icon} color={AppColors.homeTextMuted} size={16} />
    <AppText style={styles.inputLabel}>{label}</AppText>
  </View>
);

const InputField = props => (
  <View style={styles.inputField}>
    <TextInput
      {...props}
      placeholderTextColor="rgba(255,255,255,0.32)"
      style={styles.input}
    />
  </View>
);

const QuickAmount = ({ amount, isSelected, onPress }) => (
  <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={[styles.quickAmount, isSelected && styles.quickAmountSelected]}>
    <AppIcon name="favorite-border" color={isSelected ? AppColors.themeColor : AppColors.white} size={14} />
    <LineBreak height={0.35} />
    <AppText style={[styles.quickAmountText, isSelected && styles.quickAmountTextSelected]}>{amount}</AppText>
  </TouchableOpacity>
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
  balanceCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16, borderWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', padding: responsiveWidth(4.8) },
  balanceNumber: { color: AppColors.white, fontSize: responsiveFontSize(3.2), fontWeight: '700', marginLeft: responsiveWidth(2) },
  body: { paddingHorizontal: responsiveWidth(5.8), paddingTop: responsiveHeight(2.4) },
  content: { paddingBottom: responsiveHeight(5) },
  divider: { backgroundColor: AppColors.homeBorder, height: 0.5 },
  heartsLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), marginLeft: responsiveWidth(1.5) },
  heartsRow: { alignItems: 'center', flexDirection: 'row' },
  initials: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  initialsCircle: { alignItems: 'center', backgroundColor: AppColors.onboardingButton, borderRadius: responsiveWidth(6), height: responsiveWidth(12), justifyContent: 'center', width: responsiveWidth(12) },
  input: { color: AppColors.white, flex: 1, fontSize: responsiveFontSize(1.4), padding: 0 },
  inputField: { backgroundColor: '#749FC6', borderColor: AppColors.homeBorder, borderRadius: 16, borderWidth: 0.5, height: responsiveHeight(5.2), justifyContent: 'center', paddingHorizontal: responsiveWidth(3.8) },
  inputLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.3), marginLeft: responsiveWidth(2) },
  inputLabelRow: { alignItems: 'center', flexDirection: 'row' },
  messageBox: { backgroundColor: '#749FC6', borderColor: AppColors.homeBorder, borderRadius: 16, borderWidth: 0.5, height: responsiveHeight(13), padding: responsiveWidth(3.8) },
  messageInput: { color: AppColors.white, flex: 1, fontSize: responsiveFontSize(1.4), padding: 0, textAlignVertical: 'top' },
  modalBox: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 24, borderWidth: 0.5, padding: responsiveWidth(5.8), width: '100%' },
  modalButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 16 },
  modalMessage: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.5), textAlign: 'center' },
  modalOverlay: { alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.55)', flex: 1, justifyContent: 'center', padding: responsiveWidth(6) },
  modalTitle: { color: AppColors.white, fontSize: responsiveFontSize(2.3), fontWeight: '700', textAlign: 'center' },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2) },
  quickAmount: { alignItems: 'center', borderColor: AppColors.homeBorder, borderRadius: 12, borderWidth: 1, paddingVertical: responsiveHeight(1.15), width: responsiveWidth(16.8) },
  quickAmountSelected: { backgroundColor: AppColors.onboardingButton, borderColor: AppColors.onboardingButton },
  quickAmountText: { color: AppColors.white, fontSize: responsiveFontSize(1.18), fontWeight: '700' },
  quickAmountTextSelected: { color: AppColors.themeColor },
  quickLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15) },
  quickRow: { flexDirection: 'row', justifyContent: 'space-between' },
  recipientCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderRadius: 16, flexDirection: 'row', marginBottom: responsiveHeight(1.2), padding: responsiveWidth(4) },
  recipientCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  recipientEmail: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1), marginTop: responsiveHeight(0.25) },
  recipientName: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  recipientTime: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.05) },
  sectionHeader: { alignItems: 'center', flexDirection: 'row' },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.65), fontWeight: '700', marginLeft: responsiveWidth(2) },
  sendCircle: { alignItems: 'center', backgroundColor: AppColors.white, borderRadius: responsiveWidth(6), height: responsiveWidth(12), justifyContent: 'center', width: responsiveWidth(12) },
  shareButton: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
  successCircle: { alignItems: 'center', alignSelf: 'center', backgroundColor: AppColors.onboardingButton, borderRadius: responsiveWidth(11), height: responsiveWidth(22), justifyContent: 'center', width: responsiveWidth(22) },
});

export default ShareHeartsScreen;
