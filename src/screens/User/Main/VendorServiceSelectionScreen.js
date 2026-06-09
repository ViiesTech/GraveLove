import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
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

const memorials = [
  {
    id: 1,
    location: 'Forest Lawn Memorial Park',
    name: 'Robert James Thompson',
  },
  {
    id: 2,
    location: 'Oakwood Memorial Gardens',
    name: 'Margaret Anne Thompson',
  },
];

const services = [
  {
    id: 1,
    description: 'Fresh flowers placed carefully at the memorial site.',
    price: '$45',
    title: 'Fresh Flowers Placement',
  },
  {
    id: 2,
    description: 'Gentle cleaning and care for the grave and surrounding area.',
    price: '$65',
    title: 'Grave Cleaning',
  },
  {
    id: 3,
    description: 'A respectful visit with photo confirmation after service.',
    price: '$35',
    title: 'Memorial Visit',
  },
];

const VendorServiceSelectionScreen = ({ navigation, route }) => {
  const vendorName = route?.params?.vendorName ?? 'Wilson Care House';
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [selectedMemorial, setSelectedMemorial] = useState(0);
  const [selectedService, setSelectedService] = useState(0);

  const goBack = () => {
    if (isBookingMode) {
      setIsBookingMode(false);
      return;
    }
    navigation.goBack();
  };

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={goBack}
        title={vendorName}
        subtitle="Our most trusted service providers"
      />

      <View style={styles.content}>
        <VendorInfoCard vendorName={vendorName} />
        <LineBreak height={2.58} />
        <SectionHeaderIcon icon="location-on" text="Los Angeles, CA" />
        <LineBreak height={1.72} />

        {isBookingMode ? (
          <BookingSelection
            navigation={navigation}
            selectedMemorial={selectedMemorial}
            selectedService={selectedService}
            setSelectedMemorial={setSelectedMemorial}
            setSelectedService={setSelectedService}
          />
        ) : (
          <ProfileServices onSelect={index => {
            setSelectedService(index);
            setIsBookingMode(true);
          }} />
        )}
      </View>
    </ScreenWrapper>
  );
};

const VendorInfoCard = ({ vendorName }) => (
  <GlassCard contentStyle={styles.vendorInfoCard}>
    <View style={styles.vendorTop}>
      <Image source={AppAssets.images.vendor1} style={styles.vendorAvatar} />
      <View style={styles.vendorCopy}>
        <AppText numberOfLines={1} style={styles.vendorName}>{vendorName}</AppText>
        <LineBreak height={0.42} />
        <View style={styles.ratingRow}>
          <AppIcon name="star" color={AppColors.starYellow} size={14} />
          <AppText style={styles.vendorMuted}>4.9 • 328 reviews</AppText>
        </View>
        <LineBreak height={0.6} />
        <View style={styles.topRatedPill}>
          <AppText style={styles.topRatedText}>Top Rated</AppText>
        </View>
      </View>
    </View>
    <LineBreak height={2.15} />
    <View style={styles.statRow}>
      <VendorStat label="Services" value="3" />
      <VendorStat label="Experience" value="8 years" />
      <VendorStat label="Response" value="2 hours" />
    </View>
  </GlassCard>
);

const VendorStat = ({ label, value }) => (
  <View style={styles.vendorStat}>
    <AppText style={styles.vendorStatLabel}>{label}</AppText>
    <AppText style={styles.vendorStatValue}>{value}</AppText>
  </View>
);

const SectionHeaderIcon = ({ icon, text }) => (
  <View style={styles.sectionHeaderIcon}>
    <AppIcon name={icon} color={AppColors.white} size={18} />
    <AppText style={styles.sectionHeaderText}>{text}</AppText>
  </View>
);

const ProfileServices = ({ onSelect }) => (
  <View>
    <SectionHeaderIcon icon="design-services" text="Services Offered" />
    <LineBreak height={1.72} />
    {services.map((service, index) => (
      <TouchableOpacity
        key={service.id}
        activeOpacity={0.82}
        onPress={() => onSelect(index)}
        style={styles.offerCard}>
        <AppText style={styles.offerTitle}>{service.title}</AppText>
        <LineBreak height={0.85} />
        <AppText style={styles.offerDescription}>{service.description}</AppText>
      </TouchableOpacity>
    ))}
    <View style={styles.contactCard}>
      <SectionHeaderIcon icon="phone" text="+1 (555) 123-4567" />
      <LineBreak height={1.72} />
      <SectionHeaderIcon icon="email" text="contact@gardencare.com" />
    </View>
  </View>
);

const BookingSelection = ({
  navigation,
  selectedMemorial,
  selectedService,
  setSelectedMemorial,
  setSelectedService,
}) => (
  <View>
    <SectionHeaderIcon icon="location-on" text="Select Memorial" />
    <LineBreak height={1.72} />
    {memorials.map((memorial, index) => (
      <SelectableMemorial
        key={memorial.id}
        isSelected={selectedMemorial === index}
        memorial={memorial}
        onPress={() => setSelectedMemorial(index)}
      />
    ))}

    <LineBreak height={3.43} />
    <SectionHeaderIcon icon="check-circle-outline" text="Select Service" />
    <LineBreak height={0.85} />
    {services.map((service, index) => (
      <SelectableService
        key={service.id}
        isSelected={selectedService === index}
        onPress={() => setSelectedService(index)}
        service={service}
      />
    ))}

    <LineBreak height={4.3} />
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={() => navigation.navigate('BookingServiceStep2')}
      style={styles.confirmButton}>
      <AppText style={styles.confirmText}>Confirm</AppText>
    </TouchableOpacity>
    <LineBreak height={4.3} />
  </View>
);

const SelectableMemorial = ({ isSelected, memorial, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.82}
    onPress={onPress}
    style={[styles.selectCard, isSelected && styles.selectCardActive]}>
    <AppIcon
      name={isSelected ? 'radio-button-checked' : 'circle'}
      color={isSelected ? AppColors.white : AppColors.homeTextMuted}
      size={16}
    />
    <View style={styles.selectCopy}>
      <AppText style={styles.selectTitle}>{memorial.name}</AppText>
      <AppText style={styles.selectSubtitle}>{memorial.location}</AppText>
    </View>
  </TouchableOpacity>
);

const SelectableService = ({ isSelected, onPress, service }) => (
  <TouchableOpacity
    activeOpacity={0.82}
    onPress={onPress}
    style={[styles.serviceSelectCard, isSelected && styles.selectCardActive]}>
    <View style={styles.serviceSelectTop}>
      <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
        {isSelected ? <AppIcon name="check" color={AppColors.memorialCard} size={14} /> : null}
      </View>
      <AppText style={styles.serviceSelectTitle}>{service.title}</AppText>
      <AppText style={styles.servicePrice}>{service.price}</AppText>
    </View>
    {isSelected ? (
      <>
        <View style={styles.serviceDivider} />
        <AppText style={styles.serviceDescription}>{service.description}</AppText>
      </>
    ) : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.homeBody,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: responsiveWidth(5.8),
  },
  vendorInfoCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    padding: responsiveWidth(4.83),
  },
  vendorTop: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  vendorAvatar: {
    borderRadius: 12,
    height: responsiveWidth(14.5),
    width: responsiveWidth(14.5),
  },
  vendorCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3.86),
  },
  vendorName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.6),
    fontWeight: '700',
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  vendorMuted: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
    marginLeft: responsiveWidth(1),
  },
  topRatedPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(1.93),
    paddingVertical: responsiveHeight(0.25),
  },
  topRatedText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1),
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vendorStat: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.05),
    width: responsiveWidth(21.7),
  },
  vendorStatLabel: {
    color: AppColors.memorialCard,
    fontSize: responsiveFontSize(1),
  },
  vendorStatValue: {
    color: AppColors.memorialCard,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
  },
  sectionHeaderIcon: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionHeaderText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
    marginLeft: responsiveWidth(1.93),
  },
  offerCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: responsiveHeight(1.29),
    padding: responsiveWidth(4.83),
  },
  offerTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
  offerDescription: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.2),
    lineHeight: responsiveHeight(2.1),
  },
  contactCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: responsiveHeight(2.58),
    padding: responsiveWidth(4.83),
  },
  selectCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.29),
    padding: responsiveWidth(3.86),
  },
  selectCardActive: {
    borderColor: AppColors.white,
  },
  selectCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3.86),
  },
  selectTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.4),
  },
  selectSubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
    marginTop: responsiveHeight(0.42),
  },
  serviceSelectCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: responsiveHeight(1.29),
  },
  serviceSelectTop: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
  },
  checkbox: {
    alignItems: 'center',
    borderColor: AppColors.homeTextMuted,
    borderRadius: 4,
    borderWidth: 1,
    height: responsiveWidth(4.83),
    justifyContent: 'center',
    width: responsiveWidth(4.83),
  },
  checkboxActive: {
    backgroundColor: AppColors.white,
    borderColor: AppColors.white,
  },
  serviceSelectTitle: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.35),
    marginLeft: responsiveWidth(3.86),
  },
  servicePrice: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    fontWeight: '700',
  },
  serviceDivider: {
    backgroundColor: AppColors.homeBorder,
    height: 1,
  },
  serviceDescription: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.2),
    padding: responsiveWidth(3.86),
  },
  confirmButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 12,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.72),
  },
  confirmText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
});

export default VendorServiceSelectionScreen;
