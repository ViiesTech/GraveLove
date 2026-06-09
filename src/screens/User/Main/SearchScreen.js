import React, { useMemo, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { AppSvgAssets } from '../../../utils/AppSvgAssets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const categories = ['All', 'Memorials', 'Vendors', 'Services', 'Cemeteries'];
const recentSearches = ['flower service', 'forest lawn', 'wilson care'];
const memorials = [
  {
    dates: 'Jan 15, 1945 - Mar 20, 2020',
    image: AppAssets.images.profilePic,
    location: 'Forest Lawn Memorial Park',
    name: 'Robert James Thompson',
    relation: 'Father',
  },
  {
    dates: 'May 8, 1950 - Nov 12, 2022',
    image: AppAssets.images.vendor2,
    location: 'Oakwood Memorial Gardens',
    name: 'Margaret Anne Thompson',
    relation: 'Mother',
  },
];
const vendors = [
  {
    badgeLabel: 'Top Rated 2025',
    image: AppAssets.images.vendor1,
    name: 'Wilson Care House',
    rating: '4.9',
    reviewsCount: '328 reviews',
  },
  {
    badgeLabel: 'Best Quality 2025',
    image: AppAssets.images.vendor2,
    name: 'Henry Care House',
    rating: '4.8',
    reviewsCount: '295 reviews',
  },
];

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMemorials = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return [];
    return memorials.filter(item =>
      [item.name, item.relation, item.location].some(value =>
        value.toLowerCase().includes(text),
      ),
    );
  }, [query]);

  const filteredVendors = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return [];
    return vendors.filter(item =>
      [item.name, item.badgeLabel].some(value => value.toLowerCase().includes(text)),
    );
  }, [query]);

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <View style={styles.searchHeader}>
        <View style={styles.searchRow}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <AppIcon iconSet="ion" name="chevron-back" color={AppColors.white} size={22} />
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <AppIcon name="search" color={AppColors.homeTextMuted} size={20} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search memorials, services, cemeteries..."
              placeholderTextColor={AppColors.homeTextMuted}
              style={styles.searchInput}
            />
            {query ? (
              <TouchableOpacity activeOpacity={0.75} onPress={() => setQuery('')}>
                <AppIcon name="clear" color={AppColors.white} size={20} />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity activeOpacity={0.82} style={styles.searchButton}>
            <AppIcon name="search" color={AppColors.memorialCard} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.categoryRow}>
          {categories.map(category => {
            const selected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.82}
                onPress={() => setSelectedCategory(category)}
                style={[styles.categoryChip, selected && styles.categorySelected]}>
                <AppText style={[styles.categoryText, selected && styles.categoryTextSelected]}>
                  {category}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
        <LineBreak height={2.58} />

        {query.trim() ? (
          <SearchResults
            memorials={filteredMemorials}
            navigation={navigation}
            selectedCategory={selectedCategory}
            vendors={filteredVendors}
          />
        ) : (
          <>
            <RecentSearches onSelect={setQuery} />
            <LineBreak height={3.43} />
            <QuickActions onSelect={setQuery} />
          </>
        )}
      </View>
    </ScreenWrapper>
  );
};

const RecentSearches = ({ onSelect }) => (
  <View>
    <View style={styles.sectionRow}>
      <AppText style={styles.sectionTitle}>Recent Searches</AppText>
      <AppText style={styles.clearText}>Clear All</AppText>
    </View>
    <LineBreak height={1.72} />
    {recentSearches.map(search => (
      <GlassCard
        key={search}
        onPress={() => onSelect(search)}
        contentStyle={styles.recentCard}>
        <AppIcon name="history" color={AppColors.homeTextMuted} size={20} />
        <AppText style={styles.recentText}>{search}</AppText>
        <AppIcon name="north-west" color={AppColors.homeTextMuted} size={16} />
      </GlassCard>
    ))}
  </View>
);

const QuickActions = ({ onSelect }) => (
  <View>
    <AppText style={styles.sectionTitle}>Quick Actions</AppText>
    <LineBreak height={1.72} />
    <View style={styles.quickRow}>
      <QuickAction
        icon={AppSvgAssets.memorialsHeader}
        onPress={() => onSelect('cemetery')}
        subtitle="Locate nearby cemeteries"
        title="Find Cemetery"
      />
      <QuickAction
        icon={AppSvgAssets.bookService}
        onPress={() => onSelect('book service')}
        subtitle="Find memorial services"
        title="Book Service"
      />
    </View>
  </View>
);

const QuickAction = ({ icon, onPress, subtitle, title }) => (
  <GlassCard onPress={onPress} contentStyle={styles.quickCard}>
    <AppIcon svg={icon} size={responsiveWidth(7.72)} />
    <LineBreak height={0.85} />
    <AppText style={styles.quickTitle}>{title}</AppText>
    <AppText style={styles.quickSubtitle}>{subtitle}</AppText>
  </GlassCard>
);

const SearchResults = ({ memorials: memorialResults, navigation, selectedCategory, vendors: vendorResults }) => {
  const showMemorials = selectedCategory === 'All' || selectedCategory === 'Memorials';
  const showVendors = selectedCategory === 'All' || selectedCategory === 'Vendors';
  const hasResults =
    (showMemorials && memorialResults.length) || (showVendors && vendorResults.length);

  return (
    <View>
      <AppText style={styles.sectionTitle}>Search Results</AppText>
      <LineBreak height={1.72} />
      {showMemorials && memorialResults.length ? (
        <>
          <AppText style={styles.resultGroupTitle}>Memorials</AppText>
          <LineBreak height={1.29} />
          {memorialResults.map(item => (
            <MemorialResult
              key={item.name}
              item={item}
              onPress={() => navigation.navigate('MemorialProfile', { memorial: item })}
            />
          ))}
          <LineBreak height={2.58} />
        </>
      ) : null}
      {showVendors && vendorResults.length ? (
        <>
          <AppText style={styles.resultGroupTitle}>Service Providers</AppText>
          <LineBreak height={1.29} />
          {vendorResults.map(item => (
            <VendorResult
              key={item.name}
              item={item}
              onPress={() => navigation.navigate('UserVendors')}
            />
          ))}
        </>
      ) : null}
      {!hasResults ? <AppText style={styles.emptyText}>No matching results found.</AppText> : null}
    </View>
  );
};

const MemorialResult = ({ item, onPress }) => (
  <GlassCard onPress={onPress} contentStyle={styles.resultCard}>
    <Image source={item.image} style={styles.resultImage} />
    <View style={styles.resultCopy}>
      <AppText style={styles.resultTitle}>{item.name}</AppText>
      <AppText style={styles.resultBadge}>{item.relation}</AppText>
      <AppText numberOfLines={1} style={styles.resultSubtitle}>{item.location}</AppText>
    </View>
    <AppIcon name="chevron-right" color={AppColors.homeTextMuted} size={22} />
  </GlassCard>
);

const VendorResult = ({ item, onPress }) => (
  <GlassCard onPress={onPress} contentStyle={styles.resultCard}>
    <Image source={item.image} style={styles.resultImage} />
    <View style={styles.resultCopy}>
      <AppText style={styles.resultTitle}>{item.name}</AppText>
      <View style={styles.ratingRow}>
        <AppIcon name="star" color={AppColors.starYellow} size={16} />
        <AppText style={styles.resultSubtitle}>{item.rating} • {item.reviewsCount}</AppText>
      </View>
      <View style={styles.vendorBadge}>
        <AppText style={styles.vendorBadgeText}>{item.badgeLabel}</AppText>
      </View>
    </View>
    <AppIcon name="chevron-right" color={AppColors.homeTextMuted} size={22} />
  </GlassCard>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.homeBody },
  scrollContent: { flexGrow: 1 },
  searchHeader: {
    backgroundColor: AppColors.memorialCard,
    paddingBottom: responsiveHeight(1.72),
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(1.72),
  },
  searchRow: { alignItems: 'center', flexDirection: 'row' },
  backButton: { height: responsiveWidth(8), justifyContent: 'center', width: responsiveWidth(8) },
  searchBox: {
    alignItems: 'center',
    borderColor: AppColors.homeBorder,
    borderRadius: 24,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: responsiveHeight(5.15),
    marginLeft: responsiveWidth(2.9),
    paddingHorizontal: responsiveWidth(3.86),
  },
  searchInput: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.35),
    padding: 0,
    marginLeft: responsiveWidth(1.93),
  },
  searchButton: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(5.8),
    height: responsiveWidth(11.6),
    justifyContent: 'center',
    marginLeft: responsiveWidth(2.9),
    width: responsiveWidth(11.6),
  },
  content: { padding: responsiveWidth(5.8) },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: responsiveWidth(2.4) },
  categoryChip: {
    borderColor: AppColors.homeBorder,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(4.83),
    paddingVertical: responsiveHeight(1),
  },
  categorySelected: { backgroundColor: AppColors.white, borderColor: AppColors.white },
  categoryText: { color: AppColors.white, fontSize: responsiveFontSize(1.3) },
  categoryTextSelected: { color: AppColors.memorialCard, fontWeight: '700' },
  sectionRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.8), fontWeight: '700' },
  clearText: { color: AppColors.white, fontSize: responsiveFontSize(1.18) },
  recentCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    marginBottom: responsiveHeight(0.85),
    padding: responsiveWidth(3.86),
  },
  recentText: { color: AppColors.white, flex: 1, fontSize: responsiveFontSize(1.35), marginLeft: responsiveWidth(2.9) },
  quickRow: { flexDirection: 'row', gap: responsiveWidth(2.9) },
  quickCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, flex: 1, padding: responsiveWidth(3.86) },
  quickTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700', textAlign: 'center' },
  quickSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1), textAlign: 'center' },
  resultGroupTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  resultCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.29),
    padding: responsiveWidth(3.86),
  },
  resultImage: { borderRadius: responsiveWidth(5.8), height: responsiveWidth(11.6), width: responsiveWidth(11.6) },
  resultCopy: { flex: 1, marginLeft: responsiveWidth(2.9) },
  resultTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  resultBadge: { color: AppColors.white, fontSize: responsiveFontSize(1.12), marginTop: responsiveHeight(0.3) },
  resultSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18), marginLeft: responsiveWidth(1) },
  ratingRow: { alignItems: 'center', flexDirection: 'row', marginTop: responsiveHeight(0.42) },
  vendorBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 12, marginTop: responsiveHeight(0.42), paddingHorizontal: responsiveWidth(1.93), paddingVertical: responsiveHeight(0.25) },
  vendorBadgeText: { color: AppColors.white, fontSize: responsiveFontSize(1) },
  emptyText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35) },
});

export default SearchScreen;
