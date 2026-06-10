import React, { useState } from 'react';
import { Image, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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

const quickOptions = ['Professional', 'On Time', 'Great Quality', 'Respectful', 'Thorough'];

const VendorFeedbackScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [selected, setSelected] = useState([]);
  const [visible, setVisible] = useState(false);

  const toggleOption = option => {
    setSelected(current =>
      current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option],
    );
  };

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.vendorHeader}
        onBack={() => navigation.goBack()}
        title="Share Your Feedback"
        subtitle=""
      />
      <View style={styles.content}>
        <GlassCard contentStyle={styles.vendorCard}>
          <Image source={AppAssets.images.vendor1} style={styles.vendorImage} />
          <View style={styles.vendorCopy}>
            <AppText style={styles.vendorName}>Garden Care Services</AppText>
            <View style={styles.ratingMini}>
              <AppIcon name="star" color={AppColors.starYellow} size={14} />
              <AppText style={styles.muted}>4.9</AppText>
            </View>
          </View>
        </GlassCard>

        <LineBreak height={3.2} />
        <AppText style={styles.sectionTitle}>How was your experience?</AppText>
        <LineBreak height={1.5} />
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity
              activeOpacity={0.75}
              key={index}
              onPress={() => setRating(index + 1)}
            >
              <AppIcon
                name={index < rating ? 'star' : 'star-border'}
                color={index < rating ? AppColors.starYellow : 'rgba(255,255,255,0.32)'}
                size={40}
              />
            </TouchableOpacity>
          ))}
        </View>

        <LineBreak height={3.2} />
        <AppText style={styles.sectionTitle}>Additional Comments (Optional)</AppText>
        <LineBreak height={1.2} />
        <TextInput
          multiline
          placeholder="Share your experience with this service..."
          placeholderTextColor="rgba(255,255,255,0.34)"
          style={styles.commentInput}
        />

        <LineBreak height={3.2} />
        <AppText style={styles.sectionTitle}>Quick Feedback</AppText>
        <LineBreak height={1.5} />
        <View style={styles.chipsWrap}>
          {quickOptions.map(option => {
            const isSelected = selected.includes(option);
            return (
              <TouchableOpacity
                activeOpacity={0.78}
                key={option}
                onPress={() => toggleOption(option)}
                style={[styles.chip, isSelected && styles.chipSelected]}
              >
                <AppText style={styles.chipText}>{option}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        <LineBreak height={4.2} />
        <AppButton style={styles.primaryButton} onPress={() => setVisible(true)}>
          Submit Feedback
        </AppButton>
      </View>

      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.modalOverlay}>
          <GlassCard contentStyle={styles.modalCard}>
            <AppText style={styles.modalTitle}>Thank You!</AppText>
            <View style={styles.divider} />
            <View style={styles.successCircle}>
              <AppIcon name="check" color={AppColors.themeColor} size={48} />
            </View>
            <LineBreak height={2.4} />
            <AppText style={styles.modalText}>Your feedback helps us improve.</AppText>
            <LineBreak height={3} />
            <AppButton
              style={styles.primaryButton}
              onPress={() => {
                setVisible(false);
                navigation.navigate('UserTabs');
              }}
            >
              Back to Home
            </AppButton>
          </GlassCard>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(8) },
  vendorCard: { alignItems: 'center', flexDirection: 'row', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  vendorImage: { width: responsiveWidth(12), height: responsiveWidth(12), borderRadius: responsiveWidth(6) },
  vendorCopy: { marginLeft: responsiveWidth(4) },
  vendorName: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '600' },
  ratingMini: { alignItems: 'center', flexDirection: 'row', gap: responsiveWidth(1), marginTop: responsiveHeight(0.4) },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.22) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  starsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  commentInput: {
    minHeight: responsiveHeight(14),
    padding: responsiveWidth(4),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    color: AppColors.white,
    fontSize: responsiveFontSize(1.32),
    textAlignVertical: 'top',
    backgroundColor: 'rgba(4,47,103,0.5)',
  },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: responsiveWidth(2.4) },
  chip: { borderWidth: 0.5, borderColor: AppColors.homeBorder, borderRadius: 20, paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(1), backgroundColor: 'rgba(255,255,255,0.08)' },
  chipSelected: { backgroundColor: AppColors.memorialMutedButton, borderColor: 'transparent' },
  chipText: { color: AppColors.white, fontSize: responsiveFontSize(1.22) },
  primaryButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 30 },
  modalOverlay: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: responsiveWidth(8), backgroundColor: 'rgba(0,0,0,0.45)' },
  modalCard: { alignItems: 'center', width: '100%', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 24 },
  modalTitle: { color: AppColors.white, fontSize: responsiveFontSize(2.35), fontWeight: '700' },
  divider: { width: '100%', height: 0.5, backgroundColor: AppColors.homeBorder, marginVertical: responsiveHeight(1.6) },
  successCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(23), height: responsiveWidth(23), borderRadius: responsiveWidth(11.5), backgroundColor: AppColors.white },
  modalText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.42), textAlign: 'center' },
});

export default VendorFeedbackScreen;
