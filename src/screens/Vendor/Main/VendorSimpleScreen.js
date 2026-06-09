import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const VendorSimpleScreen = ({ route }) => {
  const title = route?.params?.title || 'Vendor Screen';
  const subtitle = route?.params?.subtitle || 'Screen content will be available here.';

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      <GlassCard contentStyle={styles.card}>
        <View style={styles.iconCircle}><AppIcon name="work-outline" color={AppColors.themeColor} size={28} /></View>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.subtitle}>{subtitle}</AppText>
      </GlassCard>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: { alignItems: 'center', justifyContent: 'center', padding: responsiveWidth(5.8) },
  card: { alignItems: 'center', width: '100%', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  iconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(15), height: responsiveWidth(15), borderRadius: responsiveWidth(7.5), backgroundColor: AppColors.white },
  title: { color: AppColors.white, fontSize: responsiveFontSize(2), fontWeight: '700', marginTop: responsiveHeight(1.6), textAlign: 'center' },
  subtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.3), marginTop: responsiveHeight(0.8), textAlign: 'center' },
});

export default VendorSimpleScreen;
