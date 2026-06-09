import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const personalInfo = [
  { icon: 'email', label: 'Email', value: 'vendor@grave.love' },
  { icon: 'phone', label: 'Phone Number', value: '+1 (555) 880-1200' },
  { icon: 'location-on', label: 'City', value: 'Forest Lawn Memorial Park' },
];

const services = [
  { name: 'Memorial Upkeep', price: '$120', type: 'Cleaning and care' },
  { name: 'Fresh Flowers Placement', price: '$75', type: 'Garden care services' },
  { name: 'Grave Cleaning', price: '$95', type: 'Memorial maintenance' },
];

const VendorProfileScreen = ({ navigation }) => {
  const showLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive' },
    ]);
  };

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <View style={styles.fixedHeader}>
        <LineBreak height={1.2} />
        <AppText style={styles.headerTitle}>Profile & Settings</AppText>
      </View>

      <View style={styles.profileWrap}>
        <GlassCard contentStyle={styles.profileCard}>
          <View style={styles.avatar}>
            <AppIcon name="person" color={AppColors.themeColor} size={48} />
          </View>
          <LineBreak height={1.6} />
          <AppText style={styles.businessName}>Garden Care Services</AppText>
          <LineBreak height={1.8} />
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.navigate('VendorUpdateProfile')}
            style={styles.editProfileButton}
          >
            <AppIcon name="edit" color={AppColors.white} size={16} />
            <AppText style={styles.editProfileText}>Edit Profile</AppText>
          </TouchableOpacity>
        </GlassCard>
      </View>

      <View style={styles.body}>
        <AppText style={styles.sectionTitle}>Personal Information</AppText>
        <LineBreak height={1.2} />
        {personalInfo.map(item => (
          <InfoCard key={item.label} {...item} />
        ))}

        <LineBreak height={1.5} />
        <View style={styles.sectionRow}>
          <AppText style={styles.sectionTitle}>Services</AppText>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('VendorServiceEdit')}
          >
            <AppText style={styles.editText}>Edit</AppText>
          </TouchableOpacity>
        </View>
        <LineBreak height={1.2} />
        {services.map(service => (
          <ServiceCard key={service.name} {...service} />
        ))}

        <LineBreak height={1.2} />
        <SettingsButton
          icon="lock-outline"
          label="Change Password"
          onPress={() => Alert.alert('Change Password', 'Password form will open here.')}
        />
        <SettingsButton
          destructive
          icon="logout"
          label="Logout"
          onPress={showLogout}
        />
      </View>
    </ScreenWrapper>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <GlassCard contentStyle={styles.infoCard}>
    <View style={styles.smallIcon}>
      <AppIcon name={icon} color={AppColors.white} size={20} />
    </View>
    <View style={styles.infoCopy}>
      <AppText style={styles.infoLabel}>{label}</AppText>
      <AppText style={styles.infoValue}>{value}</AppText>
    </View>
  </GlassCard>
);

const ServiceCard = ({ name, price, type }) => (
  <GlassCard contentStyle={styles.serviceCard}>
    <View style={styles.serviceCopy}>
      <AppText style={styles.serviceName}>{name}</AppText>
      <AppText style={styles.infoLabel}>{type}</AppText>
    </View>
    <AppText style={styles.price}>{price}</AppText>
  </GlassCard>
);

const SettingsButton = ({ destructive = false, icon, label, onPress }) => (
  <TouchableOpacity activeOpacity={0.82} onPress={onPress}>
    <GlassCard contentStyle={[
      styles.settingsCard,
      destructive && styles.destructiveBorder,
    ]}>
      <View style={[styles.smallIcon, destructive && styles.destructiveIcon]}>
        <AppIcon
          name={icon}
          color={destructive ? '#FF7A7A' : AppColors.white}
          size={20}
        />
      </View>
      <AppText style={[
        styles.settingsLabel,
        destructive && styles.destructiveText,
      ]}>
        {label}
      </AppText>
      <AppIcon
        name="chevron-right"
        iconSet="material"
        color={destructive ? '#FF7A7A' : AppColors.white}
        size={18}
      />
    </GlassCard>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  content: {
    paddingBottom: responsiveHeight(10),
  },
  fixedHeader: {
    paddingHorizontal: responsiveWidth(4.5),
    paddingBottom: responsiveHeight(2),
    backgroundColor: 'rgba(4,47,103,0.5)',
  },
  headerTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.3),
    fontWeight: '700',
  },
  profileWrap: {
    padding: responsiveWidth(4),
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    paddingVertical: responsiveHeight(2.7),
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: responsiveWidth(12.5),
    borderWidth: 2,
    borderColor: AppColors.white,
    backgroundColor: AppColors.white,
  },
  businessName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.85),
    fontWeight: '700',
  },
  editProfileButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: responsiveWidth(34),
    height: responsiveHeight(4.3),
    borderRadius: 8,
    backgroundColor: AppColors.onboardingButton,
  },
  editProfileText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.22),
    fontWeight: '700',
    marginLeft: responsiveWidth(1.6),
  },
  body: {
    paddingHorizontal: responsiveWidth(4),
  },
  sectionTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.85),
    fontWeight: '700',
  },
  sectionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.28),
    fontWeight: '600',
  },
  infoCard: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.2),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  smallIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(10.5),
    height: responsiveWidth(10.5),
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  infoCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3.8),
  },
  infoLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  infoValue: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.42),
    marginTop: responsiveHeight(0.35),
  },
  serviceCard: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1.2),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  serviceCopy: {
    flex: 1,
    paddingRight: responsiveWidth(2),
  },
  serviceName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.45),
    fontWeight: '700',
    marginBottom: responsiveHeight(0.35),
  },
  price: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.45),
    fontWeight: '700',
  },
  settingsCard: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.2),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  settingsLabel: {
    flex: 1,
    color: AppColors.white,
    fontSize: responsiveFontSize(1.42),
    marginLeft: responsiveWidth(3.8),
  },
  destructiveBorder: {
    borderColor: 'rgba(255, 122, 122, 0.4)',
  },
  destructiveIcon: {
    backgroundColor: 'rgba(255, 122, 122, 0.14)',
  },
  destructiveText: {
    color: '#FF7A7A',
  },
});

export default VendorProfileScreen;
