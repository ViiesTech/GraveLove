import React, { useState } from 'react';
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
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const vendors = [
  {
    id: 1,
    badge: 'Top Rated 2025',
    image: AppAssets.images.vendor1,
    name: 'Wilson Care House',
    rating: '4.9',
    reviews: '328 reviews',
  },
  {
    id: 2,
    badge: 'Best Quality 2025',
    image: AppAssets.images.vendor2,
    name: 'Henry Care House',
    rating: '4.8',
    reviews: '295 reviews',
  },
  {
    id: 3,
    badge: 'Most Experienced',
    image: AppAssets.images.vendor3,
    name: 'James Care House',
    rating: '4.9',
    reviews: '295 reviews',
  },
  {
    id: 4,
    badge: 'Fastest Response',
    image: AppAssets.images.vendor4,
    name: 'David Care House',
    rating: '4.7',
    reviews: '295 reviews',
  },
];

const BookServiceScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const visibleVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

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
            color={AppColors.homeTextMuted}
            size={responsiveWidth(4.8)}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search service..."
            placeholderTextColor={AppColors.homeTextMuted}
            style={styles.searchInput}
          />
        </View>

        <LineBreak height={2.58} />

        {visibleVendors.map(vendor => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onPress={() =>
              navigation.navigate('VendorServiceSelection', {
                vendorId: vendor.id,
                vendorName: vendor.name,
              })
            }
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

const VendorCard = ({ onPress, vendor }) => (
  <GlassCard onPress={onPress} contentStyle={styles.vendorCard}>
    <Image source={vendor.image} resizeMode="cover" style={styles.vendorImage} />
    <View style={styles.vendorInfo}>
      <AppText numberOfLines={1} style={styles.vendorName}>
        {vendor.name}
      </AppText>
      <LineBreak height={0.42} />
      <View style={styles.ratingRow}>
        <AppIcon name="star" color={AppColors.starYellow} size={14} />
        <AppText style={styles.rating}>{vendor.rating}</AppText>
        <AppText style={styles.dot}>•</AppText>
        <AppText style={styles.reviews}>{vendor.reviews}</AppText>
      </View>
      <LineBreak height={0.85} />
      <View style={styles.badge}>
        <AppIcon name="workspace-premium" color={AppColors.memorialCard} size={12} />
        <AppText style={styles.badgeText}>{vendor.badge}</AppText>
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
