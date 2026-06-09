import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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

const accountRows = [
  ['email', 'Email Address', 'sarah.thompson@email.com'],
  ['phone', 'Phone Number', '+1 (555) 123-4567'],
];

const linkedMemorials = [
  ['Robert James Thompson', 'Father'],
  ['Margaret Anne Thompson', 'Mother'],
  ['Michael David Thompson', 'Brother'],
];

const settingsRows = [
  ['notifications-none', 'Notification Settings', 'UserAlerts'],
  ['card-membership', 'Subscription & Payments', 'SelectSubscriptions'],
  ['lock-outline', 'Privacy & Security', 'PrivacySecurity'],
  ['help-outline', 'Help & Support', 'HelpSupport'],
];

const UserProfileScreen = ({ navigation }) => {
  const openRoute = route => {
    if (route === 'PrivacySecurity') {
      navigation.navigate('PrivacySecurity');
      return;
    }
    navigation.navigate(route);
  };

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="My Profile"
        subtitle="Manage your account and preferences"
        height={responsiveHeight(25.8)}
      />

      <View style={styles.profilePanel}>
        <View style={styles.identityRow}>
          <Image source={AppAssets.images.profilePic} style={styles.avatar} />
          <View style={styles.identityCopy}>
            <AppText numberOfLines={1} style={styles.name}>Sarah Thompson</AppText>
            <AppText numberOfLines={1} style={styles.email}>sarah.thompson@email.com</AppText>
          </View>
        </View>
        <LineBreak height={1.72} />
        <AppButton
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.editButton}>
          Edit Profile
        </AppButton>
      </View>

      <Section title="Account Information" />
      <GlassCard contentStyle={styles.card}>
        {accountRows.map((row, index) => (
          <InfoRow key={row[1]} icon={row[0]} title={row[1]} value={row[2]} showDivider={index < accountRows.length - 1} />
        ))}
      </GlassCard>

      <Section title="Linked Memorials" />
      <GlassCard contentStyle={styles.card}>
        {linkedMemorials.map((row, index) => (
          <InfoRow
            key={row[0]}
            icon="favorite-border"
            title={`${row[0]} (${row[1]})`}
            value="Tap to view memorial profile"
            onPress={() => navigation.navigate('MemorialProfile')}
            showDivider={index < linkedMemorials.length - 1}
          />
        ))}
      </GlassCard>

      <Section title="Settings" />
      <GlassCard contentStyle={styles.card}>
        {settingsRows.map((row, index) => (
          <InfoRow
            key={row[1]}
            icon={row[0]}
            title={row[1]}
            onPress={() => openRoute(row[2])}
            showDivider={index < settingsRows.length - 1}
          />
        ))}
      </GlassCard>

      <TouchableOpacity activeOpacity={0.82} style={styles.logoutButton}>
        <AppIcon name="logout" color="#EF5350" size={20} />
        <AppText style={styles.logoutText}>Log Out</AppText>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const Section = ({ title }) => (
  <>
    <LineBreak height={3.2} />
    <AppText style={styles.sectionTitle}>{title}</AppText>
    <LineBreak height={1.5} />
  </>
);

const InfoRow = ({ icon, onPress, showDivider, title, value }) => (
  <TouchableOpacity activeOpacity={0.82} disabled={!onPress} onPress={onPress}>
    <View style={styles.infoRow}>
      <View style={styles.iconCircle}>
        <AppIcon name={icon} color={AppColors.white} size={20} />
      </View>
      <View style={styles.infoCopy}>
        <AppText numberOfLines={1} style={styles.infoTitle}>{title}</AppText>
        {value ? <AppText numberOfLines={1} style={styles.infoValue}>{value}</AppText> : null}
      </View>
      <AppIcon name="chevron-right" color={AppColors.homeTextMuted} size={22} />
    </View>
    {showDivider ? <View style={styles.divider} /> : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  content: {
    paddingBottom: responsiveHeight(6),
  },
  profilePanel: {
    marginTop: -responsiveHeight(5),
    marginHorizontal: responsiveWidth(5.8),
    padding: responsiveWidth(4.5),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: 18,
    backgroundColor: AppColors.memorialCard,
  },
  identityRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: responsiveWidth(17.4),
    height: responsiveWidth(17.4),
    borderRadius: responsiveWidth(8.7),
    borderWidth: 1.5,
    borderColor: AppColors.white,
  },
  identityCopy: {
    flex: 1,
    marginLeft: responsiveWidth(4),
  },
  name: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
  },
  email: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.32),
    marginTop: responsiveHeight(0.4),
  },
  editButton: {
    height: responsiveHeight(4.7),
    borderRadius: responsiveHeight(2.35),
    backgroundColor: AppColors.themeColor,
  },
  sectionTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
    paddingHorizontal: responsiveWidth(5.8),
  },
  card: {
    marginHorizontal: responsiveWidth(5.8),
    padding: 0,
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.72),
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(10.6),
    height: responsiveWidth(10.6),
    borderRadius: responsiveWidth(5.3),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
  },
  infoCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3.8),
  },
  infoTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.5),
  },
  infoValue: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.25),
    marginTop: responsiveHeight(0.35),
  },
  divider: {
    height: 0.5,
    backgroundColor: AppColors.homeBorder,
    marginLeft: responsiveWidth(18),
  },
  logoutButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveHeight(3.2),
    marginHorizontal: responsiveWidth(5.8),
    height: responsiveHeight(5.2),
    borderWidth: 0.5,
    borderColor: 'rgba(239, 83, 80, 0.35)',
    borderRadius: responsiveHeight(2.6),
    backgroundColor: 'rgba(239, 83, 80, 0.08)',
  },
  logoutText: {
    color: '#EF5350',
    fontSize: responsiveFontSize(1.45),
    fontWeight: '700',
    marginLeft: responsiveWidth(2.2),
  },
});

export default UserProfileScreen;
