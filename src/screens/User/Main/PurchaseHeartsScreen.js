import React from 'react';
import { StyleSheet, View } from 'react-native';
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

const packs = [['50 Hearts', '$50.00'], ['100 Hearts', '$100.00'], ['200 Hearts', '$200.00'], ['500 Hearts', '$500.00']];

const PurchaseHeartsScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.content}>
    <AppImageHeader image={AppAssets.images.userDashboardFront} onBack={() => navigation.goBack()} title="Purchase Hearts" subtitle="Add hearts to your wallet" />
    <View style={styles.body}>
      {packs.map(pack => (
        <GlassCard key={pack[0]} contentStyle={styles.packCard}>
          <View style={styles.iconCircle}><AppIcon name="favorite-border" color={AppColors.themeColor} size={22} /></View>
          <View style={styles.packCopy}>
            <AppText style={styles.packTitle}>{pack[0]}</AppText>
            <AppText style={styles.packSub}>Use for memorial services and sharing</AppText>
          </View>
          <AppText style={styles.price}>{pack[1]}</AppText>
        </GlassCard>
      ))}
      <LineBreak height={2.2} />
      <AppButton style={styles.button} onPress={() => navigation.navigate('UserCoinsWallet')}>Continue</AppButton>
    </View>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  packCard: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1.4), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  iconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11), height: responsiveWidth(11), borderRadius: responsiveWidth(5.5), backgroundColor: AppColors.white },
  packCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  packTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  packSub: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2), marginTop: responsiveHeight(0.35) },
  price: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  button: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
});

export default PurchaseHeartsScreen;
