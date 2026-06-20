import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useLogoutMutation } from '../../../redux/api/authApi';
import {
  useGetClientMemorialsQuery,
  useGetClientProfileQuery,
} from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const firstValue = (...values) =>
  values.find(value => value !== undefined && value !== null && value !== '');

const profileImageSource = profile => {
  const image = profile?.profile_picture || profile?.avatar || profile?.image;
  if (typeof image === 'string' && image.trim()) {
    return { uri: image.startsWith('http') ? image : `https://grave-love.predemo.site/storage/${image}` };
  }
  return AppAssets.images.profilePic;
};

const settingsRows = [
  ['notifications-none', 'Notification Settings', 'UserAlerts'],
  ['card-membership', 'Subscription & Payments', 'SelectSubscriptions'],
  ['lock-outline', 'Privacy & Security', 'PrivacySecurity'],
  ['help-outline', 'Help & Support', 'HelpSupport'],
];

const staticLinkedMemorials = [
  {
    id: 'm1',
    name: 'Robert James Thompson',
    relationship: 'Father',
  },
  {
    id: 'm2',
    name: 'Margaret Anne Thompson',
    relationship: 'Mother',
  },
  {
    id: 'm3',
    name: 'Michael David Thompson',
    relationship: 'Brother',
  },
];

const memorialDates = memorial => {
  const birth = firstValue(memorial?.date_of_birth, memorial?.dob);
  const passing = firstValue(memorial?.date_of_passing, memorial?.dod, memorial?.date_of_death);

  if (!birth && !passing) {
    return '1945 - 2023';
  }

  return `${birth || '-'} - ${passing || '-'}`;
};

const memorialLocation = memorial => firstValue(
  memorial?.cemetery_name,
  memorial?.address,
  memorial?.location,
  'Forest Lawn Memorial Park',
);

const UserProfileScreen = ({ navigation }) => {
  const [logout] = useLogoutMutation();
  const { data: profileData, isLoading: isProfileLoading, isError: isProfileError } = useGetClientProfileQuery();
  const { data: memorialsData = [], isLoading: isMemorialsLoading } = useGetClientMemorialsQuery();
  const profile = profileData?.user || profileData?.profile || profileData || {};
  const profileName = firstValue(profile?.full_name, profile?.name, 'User');
  const profileEmail = firstValue(profile?.email, 'Email unavailable');
  const profilePhone = firstValue(
    profile?.phone_number,
    profile?.phone,
    'Phone unavailable',
  );
  const accountRows = [
    ['email', 'Email Address', profileEmail],
    ['phone', 'Phone Number', profilePhone],
  ];
  const linkedMemorials = memorialsData.length ? memorialsData : staticLinkedMemorials;

  const navigateAuth = () => {
    let rootNavigation = navigation;

    while (rootNavigation.getParent?.()) {
      rootNavigation = rootNavigation.getParent();
    }

    rootNavigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

  const handleLogout = async () => {
    try {
      const response = await logout({ role: 'user' }).unwrap();
      showToast('Logged out', response?.message || 'You have been logged out.');
    } catch (error) {
      showToast('Logged out', error?.message || 'Session cleared.');
    } finally {
      navigateAuth();
    }
  };

  const confirmLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: handleLogout },
    ]);
  };

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

      {isProfileLoading ? <EmptyState text="Loading profile..." /> : null}
      {isProfileError ? <EmptyState text="Unable to load profile." /> : null}

      <View style={styles.profilePanel}>
        <View style={styles.identityRow}>
          <Image source={profileImageSource(profile)} style={styles.avatar} />
          <View style={styles.identityCopy}>
            <AppText numberOfLines={1} style={styles.name}>{profileName}</AppText>
            <AppText numberOfLines={1} style={styles.email}>{profileEmail}</AppText>
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
        {isMemorialsLoading ? <EmptyState text="Loading memorials..." compact /> : null}
        {!isMemorialsLoading && linkedMemorials.map((memorial, index) => (
          <LinkedMemorialRow
            key={memorial?.id || `${memorial?.name}-${index}`}
            memorial={memorial}
            onPress={() => navigation.navigate('MemorialProfile', { memorial })}
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

      <TouchableOpacity
        activeOpacity={0.82}
        onPress={confirmLogout}
        style={styles.logoutButton}>
        <AppIcon name="logout" color="#EF5350" size={20} />
        <AppText style={styles.logoutText}>Log Out</AppText>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

const EmptyState = ({ compact = false, text }) => (
  <GlassCard contentStyle={[styles.emptyCard, compact && styles.emptyCardCompact]}>
    <AppText style={styles.emptyText}>{text}</AppText>
  </GlassCard>
);

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

const LinkedMemorialRow = ({ memorial, onPress, showDivider }) => {
  const name = firstValue(memorial?.full_name, memorial?.name, memorial?.memorial_name, 'Memorial');
  const relation = firstValue(memorial?.relationship, memorial?.relation, memorial?.relation_to_user, 'Loved One');

  return (
    <TouchableOpacity activeOpacity={0.82} onPress={onPress}>
      <View style={styles.infoRow}>
        <View style={styles.iconCircle}>
          <AppIcon name="favorite-border" color={AppColors.white} size={20} />
        </View>
        <View style={styles.infoCopy}>
          <AppText numberOfLines={1} style={styles.infoTitle}>{`${name} (${relation})`}</AppText>
          <AppText numberOfLines={1} style={styles.infoValue}>{memorialDates(memorial)}</AppText>
          <AppText numberOfLines={1} style={styles.memorialLocation}>{memorialLocation(memorial)}</AppText>
        </View>
        <AppIcon name="chevron-right" color={AppColors.homeTextMuted} size={22} />
      </View>
      {showDivider ? <View style={styles.divider} /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: responsiveHeight(6),
  },
  emptyCard: {
    alignItems: 'center',
    marginHorizontal: responsiveWidth(5.8),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  emptyCardCompact: {
    marginHorizontal: 0,
    borderWidth: 0,
  },
  emptyText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    textAlign: 'center',
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
  memorialLocation: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.08),
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
