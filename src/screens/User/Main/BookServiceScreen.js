import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {
  useGetClientTopVendorsQuery,
  useGetClientVendorsQuery,
} from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const imageSource = () => AppAssets.images.vendor1;
const vendorBusiness = vendor => vendor?.vendor_business || vendor?.business || vendor || {};
const pickVendorName = vendor => {
  const business = vendorBusiness(vendor);
  return business?.business_name || vendor?.business_name || vendor?.name || vendor?.full_name || 'Vendor';
};
const pickVendorImage = vendor => {
  const business = vendorBusiness(vendor);
  return business?.profile_picture_url
    || business?.profile_picture
    || business?.image_url
    || business?.image
    || business?.logo
    || business?.avatar
    || vendor?.profile_picture_url
    || vendor?.profile_picture
    || vendor?.image_url
    || vendor?.image
    || vendor?.logo
    || vendor?.avatar;
};
const pickVendorRating = vendor => (vendor?.rating ?? vendor?.average_rating ?? '0').toString();
const pickVendorReviews = vendor => vendor?.review_count ?? vendor?.reviews_count ?? vendor?.total_reviews ?? 0;
const pickVendorBadge = vendor => vendor?.badge?.toString() || 'Vendor';

const BookServiceScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const isSearching = submittedSearch.trim().length > 0;
  const topVendorsQuery = useGetClientTopVendorsQuery(
    { perPage: 20 },
    { skip: isSearching },
  );
  const vendorsQuery = useGetClientVendorsQuery(
    { search: submittedSearch, perPage: 30 },
    { skip: !isSearching },
  );
  const activeQuery = isSearching ? vendorsQuery : topVendorsQuery;
  const vendors = useMemo(() => activeQuery.data || [], [activeQuery.data]);
  const { isError, isFetching, isLoading } = activeQuery;

  useEffect(() => {
    console.log('[BOOK SERVICE VENDORS RESPONSE]', {
      mode: isSearching ? 'search' : 'top-vendors',
      raw: activeQuery.data,
      count: vendors.length,
      vendors: vendors.map(vendor => ({
        id: vendor?.id,
        name: pickVendorName(vendor),
        rawImage: pickVendorImage(vendor),
        business: vendorBusiness(vendor),
      })),
    });
  }, [activeQuery.data, isSearching, vendors]);

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Book a Service"
        subtitle="Choose the service you need"
      />

      <View style={styles.content}>
        <View style={styles.searchBox}>
          <AppIcon
            name="calendar-today"
            color={AppColors.white}
            size={responsiveWidth(4.8)}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={({ nativeEvent }) => setSubmittedSearch(nativeEvent.text.trim())}
            placeholder="Search service..."
            placeholderTextColor={AppColors.homeTextMuted}
            style={styles.searchInput}
            returnKeyType="search"
          />
        </View>

        <LineBreak height={2.58} />

        {isLoading || isFetching ? <StateText text="Loading vendors..." /> : null}
        {isError ? <StateText text="Unable to load vendors right now." /> : null}
        {!isLoading && !isFetching && !isError && vendors.length === 0 ? (
          <StateText text="No vendors found." />
        ) : null}

        {vendors.map(vendor => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onPress={() =>
              navigation.navigate('VendorServiceSelection', {
                vendorId: vendor.id,
                vendorName: pickVendorName(vendor),
                vendor,
              })
            }
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

const StateText = ({ text }) => (
  <AppText style={styles.stateText}>{text}</AppText>
);

const VendorCard = ({ onPress, vendor }) => (
  <GlassCard onPress={onPress} contentStyle={styles.vendorCard}>
    <Image source={imageSource()} resizeMode="cover" style={styles.vendorImage} />
    <View style={styles.vendorInfo}>
      <AppText numberOfLines={1} style={styles.vendorName}>
        {pickVendorName(vendor)}
      </AppText>
      <LineBreak height={0.42} />
      <View style={styles.ratingRow}>
        <AppIcon name="star" color={AppColors.starYellow} size={14} />
        <AppText style={styles.rating}>{pickVendorRating(vendor)}</AppText>
        <AppText style={styles.dot}>•</AppText>
        <AppText style={styles.reviews}>{pickVendorReviews(vendor)} reviews</AppText>
      </View>
      <LineBreak height={0.85} />
      <View style={styles.badge}>
        <AppIcon name="workspace-premium" color={AppColors.memorialCard} size={12} />
        <AppText style={styles.badgeText}>{pickVendorBadge(vendor)}</AppText>
      </View>
    </View>
    <AppIcon iconSet="ion" name="chevron-forward" color={AppColors.white} size={22} />
  </GlassCard>
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
  searchBox: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    height: responsiveHeight(5.36),
    paddingHorizontal: responsiveWidth(3.86),
  },
  searchInput: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.45),
    marginLeft: responsiveWidth(2.9),
    padding: 0,
  },
  stateText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    marginBottom: responsiveHeight(1.72),
    textAlign: 'center',
  },
  vendorCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.72),
    padding: responsiveWidth(2.9),
  },
  vendorImage: {
    borderRadius: 12,
    height: responsiveWidth(14.5),
    width: responsiveWidth(14.5),
  },
  vendorInfo: {
    flex: 1,
    marginLeft: responsiveWidth(3.86),
  },
  vendorName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rating: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.18),
    fontWeight: '700',
    marginLeft: responsiveWidth(1),
  },
  dot: {
    color: AppColors.homeTextMuted,
    marginHorizontal: responsiveWidth(1.9),
  },
  reviews: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: AppColors.white,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(1.9),
    paddingVertical: responsiveHeight(0.42),
  },
  badgeText: {
    color: AppColors.memorialCard,
    fontSize: responsiveFontSize(1.02),
    fontWeight: '700',
    marginLeft: responsiveWidth(1),
  },
});

export default BookServiceScreen;
