import React from 'react';
import { StyleSheet, View } from 'react-native';
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

const options = [
  ['lock-outline', 'Change Password', 'EditProfile', false],
  ['shield', 'Privacy Policy', 'PrivacyPolicy', false],
  ['warning-amber', 'Delete Account', null, true],
];

const PrivacySecurityScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.content}>
    <AppImageHeader
      image={AppAssets.images.userDashboardFront}
      onBack={() => navigation.goBack()}
      title="Privacy & Security"
      subtitle="Manage your account security"
      height={responsiveHeight(22)}
    />
    <View style={styles.body}>
      <AppText style={styles.sectionTitle}>Security Settings</AppText>
      <LineBreak height={1.6} />
      {options.map(item => (
        <GlassCard
          key={item[1]}
          onPress={() => {
            if (!item[2]) {
              navigation.goBack();
              return;
            }
            navigation.navigate(item[2]);
          }}
          contentStyle={styles.optionCard}>
          <View style={styles.iconCircle}>
            <AppIcon name={item[0]} color={item[3] ? AppColors.red : AppColors.themeColor} size={24} />
          </View>
          <AppText style={[styles.optionTitle, item[3] && styles.destructive]}>{item[1]}</AppText>
        </GlassCard>
      ))}
    </View>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55) },
  optionCard: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1.6), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  iconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11), height: responsiveWidth(11), borderRadius: responsiveWidth(5.5), backgroundColor: AppColors.white },
  optionTitle: { flex: 1, color: AppColors.white, fontSize: responsiveFontSize(1.5), fontWeight: '600', marginLeft: responsiveWidth(3.8) },
  destructive: { color: '#FF9D9D' },
});

export default PrivacySecurityScreen;
