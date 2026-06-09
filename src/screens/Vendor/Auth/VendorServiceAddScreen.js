import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors, AppGradients } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
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

const VendorServiceAddScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);

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

  const completeSetup = () => {
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

    let rootNavigation = navigation;

    while (rootNavigation.getParent?.()) {
      rootNavigation = rootNavigation.getParent();
    }

    rootNavigation.navigate('MainStack', { screen: 'VendorMain' });
  };

  return (
    <ScreenWrapper
      isGradient
      isKeyboardAvoiding
      isScroll
      contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <AppIcon
            iconSet="material"
            name="arrow-back"
            size={24}
            color={AppColors.gold}
          />
        </Pressable>
        <AppText variant="largeTitle" style={styles.headerTitle}>
          Setup Your Services
        </AppText>
      </View>

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
      <AppButton onPress={completeSetup} style={styles.actionButton}>
        Complete
      </AppButton>
    </ScreenWrapper>
  );
};

const ServiceCard = ({ canRemove, index, onRemove, onUpdate, service }) => (
  <LinearGradient colors={AppGradients.glassCard} style={styles.serviceCard}>
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
  </LinearGradient>
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
    paddingHorizontal: responsiveWidth(3.9),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4.9),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: responsiveWidth(1),
  },
  headerTitle: {
    marginLeft: responsiveWidth(3.9),
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.35),
    fontWeight: '400',
  },
  sectionTitle: {
    color: AppColors.gold,
  },
  emptyText: {
    paddingVertical: responsiveHeight(4.9),
    textAlign: 'center',
  },
  serviceCard: {
    padding: responsiveWidth(3.9),
    marginBottom: responsiveHeight(2),
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 12,
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
    borderWidth: 1,
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
  },
  actionButton: {
    width: '100%',
  },
});

export default VendorServiceAddScreen;
