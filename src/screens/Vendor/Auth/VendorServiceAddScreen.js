import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import VendorSetupHeader from '../../../components/VendorSetupHeader';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import { useRegisterVendorMutation } from '../../../redux/api/authApi';
import { setProfileCreated } from '../../../redux/slices/authSlice';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const createService = () => ({
  description: '',
  id: Date.now().toString(),
  name: '',
  price: '',
  type: '',
});

const VendorServiceAddScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [registerVendor, { isLoading }] = useRegisterVendorMutation();
  const previousData = route?.params?.previousData || {};
  const profileImage = route?.params?.profileImage || null;

  const addService = () => {
    setServices(items => [...items, createService()]);
  };

  const removeService = id => {
    setServices(items => items.filter(item => item.id !== id));
  };

  const updateService = (id, key, value) => {
    setServices(items =>
      items.map(item => (item.id === id ? { ...item, [key]: value } : item)),
    );
  };

  const completeSetup = async () => {
    if (!services.length) {
      showToast('Add service', 'Please add at least one service.');
      return;
    }

    const isAnyFieldEmpty = services.some(
      item =>
        !item.name.trim() ||
        !item.type.trim() ||
        !item.description.trim() ||
        !item.price.trim(),
    );

    if (isAnyFieldEmpty) {
      showToast('Missing details', 'Please fill all service fields.');
      return;
    }

    try {
      const response = await registerVendor({
        bodyFields: previousData || {},
        profileImage,
        services: services.map(item => ({
          name: item.name.trim(),
          type: item.type.trim(),
          description: item.description.trim(),
          price: item.price.trim(),
        })),
      }).unwrap();

      const responseData = response?.data || response || {};
      const userId = responseData?.user_id || responseData?.id;

      showToast(
        'Vendor registered',
        responseData?.message || response?.message || 'Account created.',
      );

      if (userId) {
        navigation.navigate('EmailConfirmation', {
          email: previousData?.email,
          role: 'vendor',
          userId,
          userType: 1,
        });
        return;
      }

      let rootNavigation = navigation;

      while (rootNavigation.getParent?.()) {
        rootNavigation = rootNavigation.getParent();
      }

      dispatch(setProfileCreated(true));
      rootNavigation.reset({
        index: 0,
        routes: [{ name: 'MainStack' }],
      });
    } catch (error) {
      showToast(
        'Registration failed',
        error?.message || 'Unable to register vendor.',
      );
    }
  };

  return (
    <ScreenWrapper
      isGradient
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.container}>
      <VendorSetupHeader
        title="Setup Your Services"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.contentPadding}>
        <LineBreak height={3} />
        <AppText variant="title" style={styles.sectionTitle}>
          Services & Pricing *
        </AppText>
        <LineBreak height={1} />
        <AppText>Create a service</AppText>

        {!services.length ? (
        <>
          <LineBreak height={4.9} />
          <AppText variant="bodyDim" style={styles.emptyText}>
            No services added yet.{'\n'}Tap "Add Service" to begin.
          </AppText>
        </>
      ) : (
        <>
          <LineBreak height={2.95} />
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              canRemove={services.length > 1}
              index={index}
              onRemove={() => removeService(service.id)}
              onUpdate={(key, value) => updateService(service.id, key, value)}
              service={service}
            />
          ))}
        </>
      )}

        <LineBreak height={2.95} />
        <AppButton onPress={addService} style={styles.actionButton}>
          Add Service
        </AppButton>
        <LineBreak height={2} />
        <AppButton
          isLoading={isLoading}
          onPress={completeSetup}
          style={styles.actionButton}>
          Complete
        </AppButton>
      </View>
    </ScreenWrapper>
  );
};

const ServiceCard = ({ canRemove, index, onRemove, onUpdate, service }) => (
  <View style={styles.serviceCard}>
    <View style={styles.serviceHeader}>
      <AppText variant="title" style={styles.serviceTitle}>
        Service {index + 1}
      </AppText>
      {canRemove ? (
        <Pressable onPress={onRemove} style={styles.removeButton}>
          <AppIcon
            iconSet="material"
            name="close"
            size={20}
            color={AppColors.gold}
          />
        </Pressable>
      ) : null}
    </View>

    <LineBreak height={2} />
    <FieldLabel text="Service Name" />
    <LineBreak height={1} />
    <SetupTextField
      value={service.name}
      onChangeText={value => onUpdate('name', value)}
      placeholder="e.g., Grave Cleaning"
    />

    <LineBreak height={2} />
    <FieldLabel text="Service type" />
    <LineBreak height={1} />
    <SetupTextField
      value={service.type}
      onChangeText={value => onUpdate('type', value)}
      placeholder="e.g., Maintenance"
    />

    <LineBreak height={2} />
    <FieldLabel text="Description" />
    <LineBreak height={1} />
    <SetupTextField
      multiline
      value={service.description}
      onChangeText={value => onUpdate('description', value)}
      placeholder="Describe the service..."
      style={styles.textArea}
    />

    <LineBreak height={2} />
    <FieldLabel text="Add Price" />
    <LineBreak height={1} />
    <SetupTextField
      value={service.price}
      onChangeText={value => onUpdate('price', value)}
      placeholder="$0.00"
      keyboardType="number-pad"
    />
  </View>
);

const FieldLabel = ({ text }) => <AppText>{text}</AppText>;

const SetupTextField = ({ style, ...props }) => (
  <View style={[styles.inputWrap, style]}>
    <TextInput
      {...props}
      placeholderTextColor={AppColors.goldDim}
      selectionColor={AppColors.gold}
      style={styles.input}
      textAlignVertical={props.multiline ? 'top' : 'center'}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4.9),
  },
  contentPadding: {
    paddingHorizontal: responsiveWidth(3.9),
  },
  sectionTitle: {
    color: AppColors.gold,
  },
  emptyText: {
    paddingVertical: responsiveHeight(4.9),
    textAlign: 'center',
  },
  serviceCard: {
    marginBottom: responsiveHeight(2),
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceTitle: {
    color: AppColors.gold,
  },
  removeButton: {
    padding: responsiveWidth(1),
  },
  inputWrap: {
    borderWidth: 0.5,
    borderColor: AppColors.border,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  input: {
    minHeight: responsiveHeight(4.7),
    paddingHorizontal: responsiveWidth(3.9),
    color: AppColors.gold,
    fontFamily: 'Arial',
    fontSize: responsiveFontSize(1.52),
  },
  textArea: {
    minHeight: responsiveHeight(11),
    borderRadius: 8,
  },
  actionButton: {
    width: '100%',
    borderRadius: 14,
    backgroundColor: AppColors.onboardingButton,
  },
});

export default VendorServiceAddScreen;
