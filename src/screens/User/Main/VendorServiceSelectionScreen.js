import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {
  useCreateClientBookingMutation,
  useGetClientBookingOptionsQuery,
  useGetClientMemorialsQuery,
  useGetClientVendorDetailQuery,
  useGetClientVendorServicesQuery,
  useLazyGetClientVendorSlotsQuery,
} from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const imageSource = image => (image ? { uri: image } : AppAssets.images.vendor1);
const vendorBusiness = value => value?.vendor_business || value?.business || value || {};
const pickName = (value, fallback = 'Vendor') => {
  const business = vendorBusiness(value);
  return business?.business_name || value?.business_name || value?.name || value?.full_name || fallback;
};
const pickImage = value => {
  const business = vendorBusiness(value);
  return business?.profile_picture_url || business?.profile_picture || value?.profile_picture_url || value?.profile_picture || value?.image || value?.avatar;
};
const pickLocation = value => {
  const business = vendorBusiness(value);
  return business?.service_location || value?.service_location || value?.location || value?.address || 'Los Angeles, CA';
};
const pickRating = value => (value?.rating ?? value?.average_rating ?? '4.9').toString();
const pickReviews = value => value?.review_count ?? value?.reviews_count ?? value?.total_reviews ?? 0;
const pickServiceTitle = service => service?.name || service?.service_name || service?.title || 'Service';
const pickServicePrice = service => (service?.price ?? service?.formatted_price ?? 0).toString();
const pickMemorialLocation = memorial => memorial?.address || memorial?.cemetery_name || memorial?.location || '-';

const VendorServiceSelectionScreen = ({ navigation, route }) => {
  const vendorId = route?.params?.vendorId;
  const routeVendor = route?.params?.vendor;
  const fallbackVendorName = route?.params?.vendorName ?? pickName(routeVendor);
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [selectedMemorial, setSelectedMemorial] = useState(0);
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [isConfirming, setIsConfirming] = useState(false);

  const { data: vendorDetail, isLoading: isVendorLoading } = useGetClientVendorDetailQuery(vendorId, { skip: !vendorId });
  const { data: services = [], isLoading: isServicesLoading } = useGetClientVendorServicesQuery(vendorId, { skip: !vendorId });
  const { data: memorialsData = [], isLoading: isMemorialsLoading } = useGetClientMemorialsQuery();
  const { data: bookingOptions } = useGetClientBookingOptionsQuery();
  const [fetchVendorSlots] = useLazyGetClientVendorSlotsQuery();
  const [createClientBooking] = useCreateClientBookingMutation();

  const vendor = vendorDetail || routeVendor || {};
  const vendorName = pickName(vendor, fallbackVendorName);
  const firstSelectedServiceIndex = Array.from(selectedServices)[0];
  const selectedServiceTitle = services[firstSelectedServiceIndex]
    ? pickServiceTitle(services[firstSelectedServiceIndex])
    : null;
  const headerTitle = isBookingMode && selectedServiceTitle ? selectedServiceTitle : vendorName;
  const headerSubtitle = isBookingMode ? vendorName : 'Our most trusted service providers';
  const memorials = useMemo(() => {
    const optionMemorials = bookingOptions?.memorials;
    return Array.isArray(optionMemorials) && optionMemorials.length ? optionMemorials : memorialsData;
  }, [bookingOptions, memorialsData]);
  const isLoading = isVendorLoading || isServicesLoading || isMemorialsLoading;

  const goBack = () => {
    if (isBookingMode) {
      setIsBookingMode(false);
      return;
    }
    navigation.goBack();
  };

  const confirmBooking = async () => {
    const memorial = memorials[selectedMemorial];
    const service = services[firstSelectedServiceIndex];

    if (!memorial?.id || !service?.id || !vendorId || selectedServices.size === 0) {
      showToast('Booking details missing', 'Please select memorial and service.');
      return;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    const scheduledDate = nextDate.toISOString().slice(0, 10);
    let scheduledTime = '10:00';
    setIsConfirming(true);

    try {
      const slotsResult = await fetchVendorSlots({ vendorId, date: scheduledDate }).unwrap();
      const slots = Array.isArray(slotsResult)
        ? slotsResult
        : Array.isArray(slotsResult?.slots)
          ? slotsResult.slots
          : [];

      if (slots.length) {
        const firstSlot = slots[0];
        scheduledTime = typeof firstSlot === 'object'
          ? firstSlot?.time || firstSlot?.slot || scheduledTime
          : firstSlot?.toString() || scheduledTime;
      }

      await createClientBooking({
        memorial_id: memorial.id,
        vendor_id: vendorId,
        vendor_service_id: service.id,
        scheduled_date: scheduledDate,
        scheduled_time: scheduledTime,
        instructions: 'Booked from mobile app',
      }).unwrap();

      navigation.navigate('BookingServiceStep2', {
        bookingDraft: {
          memorial,
          memorialId: memorial.id,
          scheduledDate,
          scheduledTime,
          service,
          vendor,
          vendorId,
          vendorName,
          vendorServiceId: service.id,
        },
      });
    } catch (error) {
      showToast('Booking failed', error?.message || 'Unable to create booking.');
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={goBack}
        title={headerTitle}
        subtitle={headerSubtitle}
      />

      <View style={styles.content}>
        <VendorInfoCard services={services} vendor={vendor} vendorName={vendorName} />
        <LineBreak height={2.58} />
        <SectionHeaderIcon icon="location-on" text={pickLocation(vendor)} />
        <LineBreak height={1.72} />

        {isLoading ? <StateText text="Loading booking options..." /> : null}
        {!isLoading && services.length === 0 ? <StateText text="No services available for this vendor." /> : null}

        {isBookingMode ? (
          <BookingSelection
            memorials={memorials}
            navigation={navigation}
            onConfirm={confirmBooking}
            isConfirming={isConfirming}
            selectedMemorial={selectedMemorial}
            selectedServices={selectedServices}
            services={services}
            setSelectedMemorial={setSelectedMemorial}
            setSelectedServices={setSelectedServices}
          />
        ) : (
          <ProfileServices
            services={services}
            vendor={vendor}
            onSelect={index => {
              setSelectedServices(new Set([index]));
              setIsBookingMode(true);
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

const StateText = ({ text }) => <AppText style={styles.stateText}>{text}</AppText>;

const VendorInfoCard = ({ services, vendor, vendorName }) => {
  const business = vendorBusiness(vendor);

  return (
    <GlassCard contentStyle={styles.vendorInfoCard}>
      <View style={styles.vendorTop}>
        <Image source={imageSource(pickImage(vendor))} style={styles.vendorAvatar} />
        <View style={styles.vendorCopy}>
          <AppText numberOfLines={1} style={styles.vendorName}>{vendorName}</AppText>
          <LineBreak height={0.42} />
          <View style={styles.ratingRow}>
            <AppIcon name="star" color={AppColors.starYellow} size={14} />
            <AppText style={styles.vendorMuted}>{pickRating(vendor)} • {pickReviews(vendor)} reviews</AppText>
          </View>
          <LineBreak height={0.6} />
          <View style={styles.topRatedPill}>
            <AppText style={styles.topRatedText}>Top Rated</AppText>
          </View>
        </View>
      </View>
      <LineBreak height={2.15} />
      <View style={styles.statRow}>
        <VendorStat label="Services" value={(vendor?.services_count ?? services?.length ?? 0).toString()} />
        <VendorStat label="Experience" value={business?.years_experience?.toString() || vendor?.years_experience?.toString() || '8 years'} />
        <VendorStat label="Response" value={business?.response_time?.toString() || vendor?.response_time?.toString() || '2 hours'} />
      </View>
    </GlassCard>
  );
};

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

const ProfileServices = ({ onSelect, services, vendor }) => (
  <View>
    <SectionHeaderIcon icon="design-services" text="Services Offered" />
    <LineBreak height={1.72} />
    {services.map((service, index) => (
      <TouchableOpacity
        key={service.id || `${pickServiceTitle(service)}-${index}`}
        activeOpacity={0.82}
        onPress={() => onSelect(index)}
        style={styles.offerCard}>
        <AppText style={styles.offerTitle}>{pickServiceTitle(service)}</AppText>
        <LineBreak height={0.85} />
        <AppText style={styles.offerDescription}>{service?.description || 'Memorial care service'}</AppText>
      </TouchableOpacity>
    ))}
    <View style={styles.contactCard}>
      <SectionHeaderIcon icon="phone" text={vendorBusiness(vendor)?.phone_number || vendor?.phone_number || vendor?.phone || '+1 (555) 123-4567'} />
      <LineBreak height={1.72} />
      <SectionHeaderIcon icon="email" text={vendor?.email || vendorBusiness(vendor)?.email || 'contact@gardencare.com'} />
    </View>
  </View>
);

const BookingSelection = ({
  isConfirming,
  memorials,
  onConfirm,
  selectedMemorial,
  selectedServices,
  services,
  setSelectedMemorial,
  setSelectedServices,
}) => (
  <View>
    <SectionHeaderIcon icon="location-on" text="Select Memorial" />
    <LineBreak height={1.72} />
    {memorials.map((memorial, index) => (
      <SelectableMemorial
        key={memorial.id || `${memorial.name}-${index}`}
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
        key={service.id || `${pickServiceTitle(service)}-${index}`}
        isSelected={selectedServices.has(index)}
        onRemove={() => {
          const nextSelection = new Set(selectedServices);
          nextSelection.delete(index);
          setSelectedServices(nextSelection);
        }}
        onPress={() => {
          const nextSelection = new Set(selectedServices);
          if (nextSelection.has(index)) {
            nextSelection.delete(index);
          } else {
            nextSelection.add(index);
          }
          setSelectedServices(nextSelection);
        }}
        service={service}
      />
    ))}

    <LineBreak height={4.3} />
    <TouchableOpacity
      activeOpacity={0.82}
      disabled={isConfirming}
      onPress={onConfirm}
      style={[styles.confirmButton, isConfirming && styles.confirmButtonDisabled]}>
      <AppText style={styles.confirmText}>{isConfirming ? 'Please wait...' : 'Confirm'}</AppText>
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
      <AppText style={styles.selectTitle}>{memorial?.name || 'Memorial'}</AppText>
      <AppText style={styles.selectSubtitle}>{pickMemorialLocation(memorial)}</AppText>
    </View>
  </TouchableOpacity>
);

const SelectableService = ({ isSelected, onPress, onRemove, service }) => (
  <TouchableOpacity
    activeOpacity={0.82}
    onPress={onPress}
    style={[styles.serviceSelectCard, isSelected && styles.selectCardActive]}>
    <View style={styles.serviceSelectTop}>
      <View style={[styles.checkbox, isSelected && styles.checkboxActive]}>
        {isSelected ? <AppIcon name="check" color={AppColors.memorialCard} size={14} /> : null}
      </View>
      <AppText style={styles.serviceSelectTitle}>{pickServiceTitle(service)}</AppText>
      <AppText style={styles.servicePrice}>{pickServicePrice(service)}</AppText>
    </View>
    {isSelected ? (
      <>
        <View style={styles.serviceDivider} />
        <View style={styles.serviceSelectedBody}>
          <AppText style={styles.serviceDescription}>{service?.description || 'Memorial care service'}</AppText>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={onRemove}
            style={styles.removeButton}>
            <AppText style={styles.removeText}>Remove</AppText>
          </TouchableOpacity>
        </View>
      </>
    ) : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  stateText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    marginBottom: responsiveHeight(1.72),
    textAlign: 'center',
  },
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
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 12,
    paddingVertical: responsiveHeight(1.05),
    width: responsiveWidth(21.7),
  },
  vendorStatLabel: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1),
  },
  vendorStatValue: {
    color: AppColors.white,
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
    lineHeight: responsiveHeight(2),
  },
  serviceSelectedBody: {
    padding: responsiveWidth(3.86),
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(74, 157, 244, 0.22)',
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: responsiveHeight(1.72),
    paddingVertical: responsiveHeight(1.25),
  },
  removeText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.2),
    fontWeight: '700',
  },
  confirmButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 12,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.72),
  },
  confirmButtonDisabled: {
    opacity: 0.68,
  },
  confirmText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
});

export default VendorServiceSelectionScreen;
