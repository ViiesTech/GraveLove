import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { useLogoutMutation } from '../../../redux/api/authApi';
import {
  useChangeVendorPasswordMutation,
  useGetVendorProfileQuery,
} from '../../../redux/api/vendorApi';
import { API_BASE_URL } from '../../../redux/constants/apiEndpoints';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const firstValue = (...values) => values.find(value => value !== undefined && value !== null && value !== '') || '';
const storageUrl = path => {
  if (!path) {
    return null;
  }
  if (path.toString().startsWith('http')) {
    return path;
  }
  return `${API_BASE_URL.replace('/api/v1', '')}/storage/${path}`;
};

const VendorProfileScreen = ({ navigation }) => {
  const [logout] = useLogoutMutation();
  const { data: vendorData = {}, isLoading } = useGetVendorProfileQuery();
  const [changePassword, { isLoading: isChangingPassword }] = useChangeVendorPasswordMutation();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const passwordSheetRef = useRef(null);
  const passwordSnapPoints = useMemo(() => ['52%'], []);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const business = vendorData?.vendor_business || vendorData?.business || {};
  const services = Array.isArray(business?.services) ? business.services : [];
  const imageUrl = storageUrl(business?.profile_picture);
  const businessName = firstValue(business?.business_name, vendorData?.business_name, 'Vendor');
  const personalInfo = [
    { icon: 'email', label: 'Email', value: firstValue(vendorData?.email, '') },
    { icon: 'phone', label: 'Phone Number', value: firstValue(vendorData?.phone_number, vendorData?.phone, '') },
    { icon: 'location-on', label: 'City', value: firstValue(business?.service_location, vendorData?.service_location, '') },
  ];

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
      const response = await logout({ role: 'vendor' }).unwrap();
      showToast('Logged out', response?.message || 'You have been logged out.');
    } catch (error) {
      showToast('Logged out', error?.message || 'Session cleared.');
    } finally {
      navigateAuth();
    }
  };

  const showLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: handleLogout },
    ]);
  };

  const closePasswordModal = () => {
    passwordSheetRef.current?.dismiss();
    setIsPasswordModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const openPasswordSheet = useCallback(() => {
    setIsPasswordModalOpen(true);
    setTimeout(() => passwordSheetRef.current?.present(), 0);
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      showToast('Password', 'Passwords do not match.');
      return;
    }

    try {
      const response = await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();
      console.log('[VENDOR CHANGE PASSWORD RESPONSE]', response);
      showToast('Password', response?.message || 'Password updated. Please login again.');
      closePasswordModal();
      await handleLogout();
    } catch (error) {
      console.log('[VENDOR CHANGE PASSWORD ERROR]', error);
      showToast('Password', error?.message || 'Unable to change password.');
    }
  };

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <View style={styles.fixedHeader}>
        <LineBreak height={1.2} />
        <AppText style={styles.headerTitle}>Profile & Settings</AppText>
      </View>

      <View style={styles.profileWrap}>
        <GlassCard contentStyle={styles.profileCard}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <AppIcon name="person" color={AppColors.white} size={48} />
            </View>
          )}
          <LineBreak height={1.6} />
          <AppText style={styles.businessName}>{isLoading ? 'Loading...' : businessName}</AppText>
          <LineBreak height={1.8} />
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.navigate('VendorUpdateProfile', { vendorData })}
            style={styles.editProfileButton}
          >
            <AppIcon name="edit" color={AppColors.black} size={16} />
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
            onPress={() => navigation.navigate('VendorServiceEdit', { services })}
          >
            <AppText style={styles.editText}>Edit</AppText>
          </TouchableOpacity>
        </View>
        <LineBreak height={1.2} />
        {services.length ? services.map(service => (
          <ServiceCard key={firstValue(service.id, service.service_name)} service={service} />
        )) : <EmptyCard text="No services added yet" />}

        <LineBreak height={1.2} />
        <SettingsButton
          icon="lock-outline"
          label="Change Password"
          onPress={openPasswordSheet}
        />
        <SettingsButton
          destructive
          icon="logout"
          label="Logout"
          onPress={showLogout}
        />
      </View>
      <PasswordModal
        bottomSheetRef={passwordSheetRef}
        confirmPassword={confirmPassword}
        currentPassword={currentPassword}
        isLoading={isChangingPassword}
        newPassword={newPassword}
        onChangeConfirmPassword={setConfirmPassword}
        onChangeCurrentPassword={setCurrentPassword}
        onChangeNewPassword={setNewPassword}
        onClose={closePasswordModal}
        onSubmit={handleChangePassword}
        snapPoints={passwordSnapPoints}
        visible={isPasswordModalOpen}
      />
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

const ServiceCard = ({ service }) => (
  <GlassCard contentStyle={styles.serviceCard}>
    <View style={styles.serviceCopy}>
      <AppText style={styles.serviceName}>{firstValue(service?.service_name, service?.name)}</AppText>
      <AppText style={styles.infoLabel}>{firstValue(service?.service_type, service?.type)}</AppText>
    </View>
    <AppText style={styles.price}>${firstValue(service?.price, '0')}</AppText>
  </GlassCard>
);

const EmptyCard = ({ text }) => (
  <GlassCard contentStyle={styles.emptyCard}>
    <AppText style={styles.emptyText}>{text}</AppText>
  </GlassCard>
);

const PasswordModal = ({
  bottomSheetRef,
  confirmPassword,
  currentPassword,
  isLoading,
  newPassword,
  onChangeConfirmPassword,
  onChangeCurrentPassword,
  onChangeNewPassword,
  onClose,
  onSubmit,
  snapPoints,
  visible,
}) => {
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.45}
        pressBehavior="close"
      />
    ),
    [],
  );

  if (!visible) {
    return null;
  }

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.dragHandle}
      handleStyle={styles.sheetHandle}
      enablePanDownToClose
      enableDynamicSizing={false}
      onDismiss={onClose}
      stackBehavior="push">
      <View style={styles.passwordModal}>
        <View style={styles.modalHeader}>
          <AppText style={styles.modalTitle}>Change Password</AppText>
          <TouchableOpacity activeOpacity={0.75} onPress={onClose}>
            <AppIcon name="close" color={AppColors.homeTextMuted} size={22} />
          </TouchableOpacity>
        </View>
        <LineBreak height={1.6} />
        <AppTextInput secureTextEntry value={currentPassword} onChangeText={onChangeCurrentPassword} placeholder="Current password" gradientColors={['#5879A0', '#5879A0']} style={styles.modalInput} inputStyle={styles.modalInputText} />
        <LineBreak height={1.2} />
        <AppTextInput secureTextEntry value={newPassword} onChangeText={onChangeNewPassword} placeholder="New password" gradientColors={['#5879A0', '#5879A0']} style={styles.modalInput} inputStyle={styles.modalInputText} />
        <LineBreak height={1.2} />
        <AppTextInput secureTextEntry value={confirmPassword} onChangeText={onChangeConfirmPassword} placeholder="Confirm password" gradientColors={['#5879A0', '#5879A0']} style={styles.modalInput} inputStyle={styles.modalInputText} />
        <LineBreak height={2} />
        <AppButton disabled={isLoading} isLoading={isLoading} style={styles.passwordButton} onPress={onSubmit}>Update Password</AppButton>
      </View>
    </BottomSheetModal>
  );
};

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
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
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
    backgroundColor: AppColors.white,
  },
  editProfileText: {
    color: AppColors.black,
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
  emptyCard: {
    alignItems: 'center',
    marginBottom: responsiveHeight(1.2),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  emptyText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.38),
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
  sheetBackground: {
    backgroundColor: AppColors.memorialCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sheetHandle: {
    backgroundColor: AppColors.memorialCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  dragHandle: {
    backgroundColor: AppColors.homeTextMuted,
    width: responsiveWidth(12),
  },
  passwordModal: {
    backgroundColor: AppColors.memorialCard,
    padding: responsiveWidth(5.8),
    width: '100%',
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
  },
  modalInputText: {
    paddingHorizontal: responsiveWidth(4),
  },
  modalInput: {
    borderRadius: 8,
    borderColor: AppColors.homeBorder,
    backgroundColor: '#5879A0',
  },
  passwordButton: {
    backgroundColor: AppColors.onboardingButton,
    borderRadius: responsiveHeight(3),
  },
});

export default VendorProfileScreen;
