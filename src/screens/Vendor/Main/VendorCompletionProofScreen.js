import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
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

const VendorCompletionProofScreen = ({ navigation, route }) => {
  const [beforeUploaded, setBeforeUploaded] = useState(false);
  const [afterUploaded, setAfterUploaded] = useState(false);
  const cemeteryName = route?.params?.cemeteryName || 'Peaceful Gardens Cemetery';
  const graveLocation = route?.params?.graveLocation || 'Plot 54, Section C';
  const serviceName = route?.params?.serviceName || 'Grave Cleaning';

  const handleSend = () => {
    if (!beforeUploaded || !afterUploaded) {
      Alert.alert('Upload Required', 'Please upload both Before and After photos.');
      return;
    }
    Alert.alert('Proof sent successfully!');
    navigation.goBack();
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.goBack()} style={styles.backRow}>
          <AppIcon name="arrow-back" color={AppColors.white} size={24} />
          <AppText style={styles.backText}>Back</AppText>
        </TouchableOpacity>
        <LineBreak height={1.8} />
        <AppText style={styles.title}>Upload Proof of Work</AppText>
        <AppText style={styles.subtitle}>{graveLocation}</AppText>
      </View>

      <ScreenWrapper
        isScroll
        safeAreaEdges={[]}
        useBackgroundImage={false}
        style={styles.transparent}
        contentContainerStyle={styles.content}
      >
        <GlassCard contentStyle={styles.infoCard}>
          <AppText style={styles.cardTitle}>{cemeteryName}</AppText>
          <AppText style={styles.muted}>{serviceName}</AppText>
        </GlassCard>
        <LineBreak height={2.4} />
        <AppText style={styles.label}>Before Photo</AppText>
        <LineBreak height={0.8} />
        <UploadBox
          label="Tap to upload before photo"
          uploaded={beforeUploaded}
          onPress={() => setBeforeUploaded(value => !value)}
        />
        <LineBreak height={2.4} />
        <AppText style={styles.label}>After Photo</AppText>
        <LineBreak height={0.8} />
        <UploadBox
          label="Tap to upload after photo"
          uploaded={afterUploaded}
          onPress={() => setAfterUploaded(value => !value)}
        />
        <LineBreak height={2.4} />
        <AppText style={styles.label}>Notes (Optional)</AppText>
        <LineBreak height={0.8} />
        <TextInput
          multiline
          placeholder="Write any comments for the client..."
          placeholderTextColor={AppColors.homeTextMuted}
          style={styles.notes}
        />
      </ScreenWrapper>

      <View style={styles.footer}>
        <AppButton style={styles.primaryButton} onPress={handleSend}>
          Send Proof to Client
        </AppButton>
      </View>
    </ScreenWrapper>
  );
};

const UploadBox = ({ label, onPress, uploaded }) => (
  <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.uploadBox}>
    {uploaded ? (
      <ImageBackground source={AppAssets.images.headerImage} style={styles.uploadedImage} imageStyle={styles.uploadedImageRadius} />
    ) : (
      <>
        <AppIcon name="file-upload" color={AppColors.homeTextMuted} size={34} />
        <LineBreak height={0.8} />
        <AppText style={styles.uploadLabel}>{label}</AppText>
      </>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
  transparent: { flex: 1, backgroundColor: 'transparent' },
  header: { paddingHorizontal: responsiveWidth(4), paddingBottom: responsiveHeight(2) },
  backRow: { alignItems: 'center', flexDirection: 'row' },
  backText: { color: AppColors.white, fontSize: responsiveFontSize(1.42), marginLeft: responsiveWidth(3) },
  title: { color: AppColors.white, fontSize: responsiveFontSize(2.3), fontWeight: '700' },
  subtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.32), marginTop: responsiveHeight(0.35) },
  content: { paddingHorizontal: responsiveWidth(4), paddingBottom: responsiveHeight(3) },
  infoCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 12 },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.62), fontWeight: '700' },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.22), marginTop: responsiveHeight(0.35) },
  label: { color: AppColors.white, fontSize: responsiveFontSize(1.42) },
  uploadBox: { alignItems: 'center', justifyContent: 'center', height: responsiveHeight(16), borderRadius: 16, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.15)' },
  uploadedImage: { width: '100%', height: '100%' },
  uploadedImageRadius: { borderRadius: 16 },
  uploadLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12) },
  notes: { minHeight: responsiveHeight(10), padding: responsiveWidth(4), borderRadius: 12, color: AppColors.white, textAlignVertical: 'top', backgroundColor: 'rgba(255,255,255,0.08)' },
  footer: { padding: responsiveWidth(4) },
  primaryButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 25 },
});

export default VendorCompletionProofScreen;
