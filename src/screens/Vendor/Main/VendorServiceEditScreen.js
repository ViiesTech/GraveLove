import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {
  useGetVendorProfileQuery,
} from '../../../redux/api/vendorApi';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const emptyService = () => ({
  id: `${Date.now()}`,
  description: '',
  name: '',
  price: '',
  type: '',
});

const mapApiService = service => ({
  id: service?.id ? `${service.id}` : `${Date.now()}`,
  apiId: service?.id,
  description: service?.description || '',
  name: service?.service_name || service?.name || '',
  price: service?.price?.toString() || '',
  type: service?.service_type || service?.type || '',
});

const VendorServiceEditScreen = ({ navigation, route }) => {
  const { data: profileData = {} } = useGetVendorProfileQuery();
  const currentServices = useMemo(
    () => route?.params?.services || profileData?.vendor_business?.services || profileData?.business?.services || [],
    [profileData?.business?.services, profileData?.vendor_business?.services, route?.params?.services],
  );
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (currentServices?.length) {
      setServices(currentServices.map(mapApiService));
    } else {
      setServices([emptyService()]);
    }
  }, [currentServices]);

  const updateService = (id, key, value) => {
    setServices(current =>
      current.map(service =>
        service.id === id ? { ...service, [key]: value } : service,
      ),
    );
  };

  const removeService = id => {
    Alert.alert('Delete Service', 'Are you sure you want to delete this service?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setServices(current => current.filter(item => item.id !== id)),
      },
    ]);
  };

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.goBack()}>
          <AppIcon name="arrow-back" color={AppColors.white} size={24} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Edit Services</AppText>
      </View>

      <AppText style={styles.title}>Services & Pricing *</AppText>
      <LineBreak height={0.55} />
      <AppText style={styles.subtitle}>Edit your services</AppText>
      <LineBreak height={2.4} />

      {services.map((service, index) => (
        <ServiceForm
          key={service.id}
          index={index}
          onRemove={() => removeService(service.id)}
          onUpdate={(key, value) => updateService(service.id, key, value)}
          service={service}
        />
      ))}

      <LineBreak height={1.2} />
      <AppButton
        style={styles.primaryButton}
        onPress={() => setServices(current => [...current, emptyService()])}
      >
        Add Service
      </AppButton>
      <LineBreak height={1.6} />
      <AppButton style={styles.primaryButton} onPress={handleSave}>
        Save Changes
      </AppButton>
    </ScreenWrapper>
  );
};

const ServiceForm = ({ index, onRemove, onUpdate, service }) => (
  <GlassCard contentStyle={styles.card}>
    <View style={styles.cardTop}>
      <AppText style={styles.cardTitle}>Service {index + 1}</AppText>
      <TouchableOpacity activeOpacity={0.75} onPress={onRemove}>
        <AppIcon name="close" color="#FF7A7A" size={21} />
      </TouchableOpacity>
    </View>
    <LineBreak height={1.6} />
    <ServiceField
      label="Service Name"
      placeholder="e.g., Grave Cleaning"
      value={service.name}
      onChangeText={value => onUpdate('name', value)}
    />
    <ServiceField
      label="Service type"
      placeholder="e.g., Maintenance"
      value={service.type}
      onChangeText={value => onUpdate('type', value)}
    />
    <ServiceField
      multiline
      label="Description"
      placeholder="Describe the service..."
      value={service.description}
      onChangeText={value => onUpdate('description', value)}
      style={styles.multiInput}
      inputStyle={styles.multiInputText}
    />
    <ServiceField
      keyboardType="number-pad"
      label="Add Price"
      placeholder="$0.00"
      value={service.price}
      onChangeText={value => onUpdate('price', value)}
    />
  </GlassCard>
);

const ServiceField = ({ label, style, inputStyle, ...inputProps }) => (
  <View style={styles.field}>
    <AppText style={styles.label}>{label}</AppText>
    <LineBreak height={0.7} />
    <AppTextInput
      {...inputProps}
      gradientColors={['rgba(4,47,103,0.5)', 'rgba(4,47,103,0.5)']}
      style={[styles.input, style]}
      inputStyle={[styles.inputText, inputStyle]}
    />
  </View>
);

const styles = StyleSheet.create({
  content: {
    padding: responsiveWidth(4),
    paddingBottom: responsiveHeight(6),
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: responsiveHeight(3),
  },
  headerTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.15),
    marginLeft: responsiveWidth(4),
  },
  title: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.32),
  },
  card: {
    marginBottom: responsiveHeight(1.6),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  cardTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.72),
    fontWeight: '700',
  },
  field: {
    marginBottom: responsiveHeight(1.6),
  },
  label: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.32),
  },
  input: {
    height: responsiveHeight(4.8),
    borderRadius: 8,
    borderColor: AppColors.homeBorder,
  },
  inputText: {
    paddingHorizontal: responsiveWidth(3.5),
    fontSize: responsiveFontSize(1.28),
  },
  multiInput: {
    height: responsiveHeight(9),
    alignItems: 'flex-start',
  },
  multiInputText: {
    height: '100%',
    paddingTop: responsiveHeight(1),
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: AppColors.onboardingButton,
    borderRadius: 12,
  },
});

export default VendorServiceEditScreen;
