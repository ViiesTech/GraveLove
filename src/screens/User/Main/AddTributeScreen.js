import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useCreateClientMemorialTributeMutation } from '../../../redux/api/userApi';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const inspirations = ['"I remember when..."', '"Thank you for teaching me..."', '"Your kindness and..."', '"I will always cherish..."'];
const guidelines = ['Be respectful and compassionate', 'Share positive memories and stories', 'Avoid controversial or sensitive topics', 'Keep the focus on honoring the deceased'];

const AddTributeScreen = ({ navigation, route }) => {
  const memorialId = route?.params?.memorialId;
  const [tribute, setTribute] = useState('');
  const [createTribute, { isLoading }] = useCreateClientMemorialTributeMutation();

  const handleShareTribute = async () => {
    if (!memorialId) {
      showToast('Memorial missing', 'Please open a memorial before adding a tribute.');
      return;
    }

    if (!tribute.trim()) {
      showToast('Tribute missing', 'Please write a tribute message.');
      return;
    }

    try {
      const response = await createTribute({
        memorialId,
        body: { body: tribute.trim(), visibility: 'family' },
      }).unwrap();
      showToast(response?.message || 'Tribute shared');
      navigation.goBack();
    } catch (error) {
      showToast('Tribute failed', error?.message || 'Unable to share tribute right now.');
    }
  };

  return (
    <ScreenWrapper isKeyboardAvoiding isScroll contentContainerStyle={styles.content}>
      <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.goBack()} style={styles.back}>
        <AppIcon name="arrow-back-ios" color={AppColors.white} size={20} />
      </TouchableOpacity>
      <LineBreak height={2.2} />
      <AppText style={styles.title}>Share a Tribute</AppText>
      <AppText style={styles.subtitle}>Honor their memory with your words</AppText>
      <LineBreak height={3.2} />

      <GlassCard contentStyle={styles.infoCard}>
        <AppIcon name="favorite-border" color={AppColors.white} size={24} />
        <View style={styles.flex}>
          <AppText style={styles.cardTitle}>Share Your Heart</AppText>
          <AppText style={styles.bodyText}>
            Write a message, share a memory, or express how they touched your life. Your words will provide comfort to family and friends.
          </AppText>
        </View>
      </GlassCard>

      <LineBreak height={3.2} />
      <AppText style={styles.cardTitle}>Your Tribute Message</AppText>
      <LineBreak height={1.2} />
      <TextInput
        multiline
        value={tribute}
        onChangeText={setTribute}
        placeholder="Share your memories, thoughts, or how they impacted your life..."
        placeholderTextColor="rgba(255,255,255,0.34)"
        style={styles.textArea}
      />
      <LineBreak height={0.8} />
      <AppText style={styles.counter}>{tribute.length} characters</AppText>

      <LineBreak height={3.2} />
      <ListCard title="Need inspiration?" items={inspirations} />
      <LineBreak height={3.2} />
      <ListCard title="Tribute Guidelines" items={guidelines} />
      <LineBreak height={4} />
      <AppButton isLoading={isLoading} style={styles.primaryButton} onPress={handleShareTribute}>
        Share Tribute
      </AppButton>
      <LineBreak height={1.2} />
      <AppText style={styles.footerText}>Write a message to share your tribute</AppText>
    </ScreenWrapper>
  );
};

const ListCard = ({ items, title }) => (
  <>
    <AppText style={styles.cardTitle}>{title}</AppText>
    <LineBreak height={1.2} />
    <GlassCard contentStyle={styles.listCard}>
      {items.map(item => (
        <AppText key={item} style={styles.listItem}>• {item}</AppText>
      ))}
    </GlassCard>
  </>
);

const styles = StyleSheet.create({
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(7) },
  back: { width: responsiveWidth(8), height: responsiveWidth(8), justifyContent: 'center' },
  title: { color: AppColors.white, fontSize: responsiveFontSize(2.55), fontWeight: '700' },
  subtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.45), marginTop: responsiveHeight(0.6) },
  infoCard: { flexDirection: 'row', backgroundColor: '#042F67', borderColor: AppColors.homeBorder, borderRadius: 16 },
  flex: { flex: 1, marginLeft: responsiveWidth(4) },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.62), fontWeight: '700' },
  bodyText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.16), lineHeight: responsiveFontSize(1.72), marginTop: responsiveHeight(0.7) },
  textArea: { minHeight: responsiveHeight(20), padding: responsiveWidth(4), borderWidth: 0.5, borderColor: AppColors.homeBorder, borderRadius: 16, color: AppColors.white, fontSize: responsiveFontSize(1.45), textAlignVertical: 'top', backgroundColor: '#042F67' },
  counter: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12) },
  listCard: { backgroundColor: '#042F67', borderColor: AppColors.homeBorder, borderRadius: 16 },
  listItem: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), lineHeight: responsiveFontSize(2.1), marginBottom: responsiveHeight(0.7) },
  primaryButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 30 },
  footerText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12), textAlign: 'center' },
});

export default AddTributeScreen;
