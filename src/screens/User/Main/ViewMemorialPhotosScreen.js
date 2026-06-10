import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
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

const leftPhotos = [
  [AppAssets.images.vendor1, 'Fresh white roses placed at', 'Sarah Thompson', 'Oct 20, 2025', '24', 22],
  [AppAssets.images.vendor2, 'Candles lit in remembrance on', 'Michael Thompson', 'Oct 1, 2025', '32', 26],
  [AppAssets.images.vendor4, 'Anniversary flowers', 'Lisa Williams', 'Sep 15, 2025', '28', 20],
];

const rightPhotos = [
  [AppAssets.images.vendor3, 'Beautiful memorial service gathering', 'Emily Thompson', 'Oct 15, 2025', '18', 18],
  [AppAssets.images.headerImage, 'Peaceful morning visit to the Garden of', 'David Anderson', 'Sep 20, 2025', '15', 20],
  [AppAssets.images.vendor1, 'Sunset remembrance - Dad', 'James Anderson', 'Aug 25, 2025', '41', 24],
];

const ViewMemorialPhotosScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
    <AppImageHeader
      image={AppAssets.images.userDashboardFront}
      onBack={() => navigation.goBack()}
      title="Memorial Photos"
      subtitle="6 photos • Cherished memories"
    />
    <View style={styles.content}>
      <AppButton style={styles.primaryButton}>Upload Photo</AppButton>
      <LineBreak height={2.4} />
      <View style={styles.grid}>
        <View style={styles.column}>
          {leftPhotos.map(photo => <PhotoCard key={`${photo[1]}-${photo[4]}`} data={photo} />)}
        </View>
        <View style={styles.column}>
          {rightPhotos.map(photo => <PhotoCard key={`${photo[1]}-${photo[4]}`} data={photo} />)}
        </View>
      </View>
      <LineBreak height={2.4} />
      <GlassCard contentStyle={styles.aboutCard}>
        <AppText style={styles.aboutTitle}>About Memorial Photos</AppText>
        <LineBreak height={1.4} />
        {[
          'Share cherished memories with family',
          'Photos are visible to all memorial visitors',
          'Upload photos from visits or special occasions',
          'High-quality images preserve memories forever',
        ].map(item => <AppText key={item} style={styles.bullet}>• {item}</AppText>)}
      </GlassCard>
    </View>
  </ScreenWrapper>
);

const PhotoCard = ({ data }) => {
  const [image, title, user, date, likes, height] = data;
  return (
    <GlassCard contentStyle={styles.photoCard}>
      <View>
        <Image source={image} style={[styles.photo, { height: responsiveHeight(height) }]} />
        <View style={styles.likes}>
          <AppIcon name="favorite-border" color={AppColors.black} size={12} />
          <AppText style={styles.likesText}>{likes}</AppText>
        </View>
      </View>
      <View style={styles.photoCopy}>
        <AppText numberOfLines={2} style={styles.photoTitle}>{title}</AppText>
        <LineBreak height={0.7} />
        <View style={styles.metaRow}>
          <AppText numberOfLines={1} style={styles.meta}>{user}</AppText>
          <AppText style={styles.meta}>{date}</AppText>
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(8) },
  primaryButton: { backgroundColor: AppColors.onboardingButton, borderRadius: 30 },
  grid: { flexDirection: 'row', gap: responsiveWidth(4) },
  column: { flex: 1 },
  photoCard: { padding: 0, marginBottom: responsiveHeight(1.6), overflow: 'hidden', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16 },
  photo: { width: '100%' },
  likes: { position: 'absolute', right: responsiveWidth(2), top: responsiveHeight(0.8), alignItems: 'center', flexDirection: 'row', borderRadius: 12, paddingHorizontal: responsiveWidth(2), paddingVertical: responsiveHeight(0.35), backgroundColor: 'rgba(255,255,255,0.9)' },
  likesText: { color: AppColors.black, fontSize: responsiveFontSize(0.95), fontWeight: '700', marginLeft: responsiveWidth(0.8) },
  photoCopy: { padding: responsiveWidth(3) },
  photoTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.15), fontWeight: '700' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', gap: responsiveWidth(1) },
  meta: { color: AppColors.homeTextMuted, flexShrink: 1, fontSize: responsiveFontSize(0.95) },
  aboutCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, borderRadius: 16 },
  aboutTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  bullet: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12), marginBottom: responsiveHeight(0.7) },
});

export default ViewMemorialPhotosScreen;
