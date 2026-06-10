import React, { useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import SectionHeader from '../../../components/SectionHeader';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import { AppSvgAssets } from '../../../utils/AppSvgAssets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const user = {
  firstName: 'John',
  memorialsCount: '3 Active',
  nextVisit: 'Nov 3',
};

const wallet = {
  coins: 200,
};

const recolorHomeSvg = (
  svg,
  { brown = AppColors.homeCard, light = AppColors.white } = {},
) =>
  svg
    .replace(/#42262B/g, brown)
    .replace(/#F0E5BB|#EBE1B7|#DDD8C4|#FBF0C4|#E2D8B0/g, light);

const upcomingServices = [
  {
    id: 's1',
    serviceName: 'Fresh Flowers Placement',
    date: 'Saturday, Nov 2 • 10:00 AM',
    providerName: 'Garden Care Services',
  },
];

const quickActions = [
  {
    svg: recolorHomeSvg(AppSvgAssets.bookService, {
      brown: AppColors.white,
      light: AppColors.black,
    }),
    subtitle: 'Cleaning, flowers \n& care',
    title: 'Book Service',
  },
  {
    svg: recolorHomeSvg(AppSvgAssets.community, {
      brown: AppColors.white,
      light: AppColors.black,
    }),
    subtitle: 'Share & connect',
    title: 'Community',
    route: 'UserMostLovedMemories',
  },
  {
    svg: recolorHomeSvg(AppSvgAssets.visitLog, {
      brown: AppColors.white,
      light: AppColors.black,
    }),
    subtitle: 'Track your visits',
    title: 'Visit Log',
  },
  {
    svg: recolorHomeSvg(AppSvgAssets.myBookings, {
      brown: AppColors.white,
      light: AppColors.black,
    }),
    subtitle: 'Track services',
    title: 'My Bookings',
  },
];

const UserHomeScreen = ({ navigation }) => {
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(responsiveWidth(90))).current;

  const openQuickMenu = () => {
    setIsQuickMenuOpen(true);
    Animated.timing(slideAnim, {
      duration: 220,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeQuickMenu = () => {
    Animated.timing(slideAnim, {
      duration: 180,
      toValue: responsiveWidth(90),
      useNativeDriver: true,
    }).start(() => setIsQuickMenuOpen(false));
  };

  const openPlaceholder = title => {
    if (title === 'UserMemorials') {
      navigation.navigate('UserMemorials');
      return;
    }
    if (title === 'Book Service') {
      navigation.navigate('BookService');
      return;
    }
    if (title === 'User Bookings' || title === 'My Bookings') {
      navigation.navigate('UserBookings');
      return;
    }
    if (title === 'Visit Log') {
      navigation.navigate('VisitLog');
      return;
    }
    if (title === 'Community') {
      navigation.navigate('UserMostLovedMemories');
      return;
    }
    if (title === 'Search') {
      navigation.navigate('Search');
      return;
    }
    if (title === 'Alerts') {
      navigation.navigate('UserAlerts');
      return;
    }
    if (title === 'Hearts Wallet') {
      navigation.navigate('UserCoinsWallet');
      return;
    }
    if (title === 'Quick Navigation') {
      openQuickMenu();
      return;
    }

    navigation.navigate('UserHome');
  };

  return (
    <ScreenWrapper style={styles.screen}>
      <View style={styles.container}>
        <HomeHeader onNavigate={openPlaceholder} />

        <ScreenWrapper
          isScroll
          safeAreaEdges={[]}
          useBackgroundImage={false}
          style={styles.bodyWrapper}
          scrollProps={{ bounces: true }}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentMax}>
            <LineBreak height={2.58} />
            <SearchBar onPress={() => openPlaceholder('Search')} />
            <LineBreak height={2.58} />
            <DailyInspiration />
            <LineBreak height={3.43} />

            {upcomingServices.length ? (
              <>
                <SectionHeader
                  title="Upcoming Services"
                  action="View All"
                  onActionPress={() => openPlaceholder('User Bookings')}
                />
                <LineBreak height={1.72} />
                {upcomingServices.map(service => (
                  <UpcomingServiceCard
                    key={service.id}
                    service={service}
                    onPress={() => navigation.navigate('UpcomingServiceDetails', { booking: service })}
                  />
                ))}
                <LineBreak height={3.43} />
              </>
            ) : null}

            <QuickActions onActionPress={openPlaceholder} />
          </View>
        </ScreenWrapper>
        <QuickNavigationModal
          isVisible={isQuickMenuOpen}
          navigation={navigation}
          onClose={closeQuickMenu}
          translateX={slideAnim}
        />
      </View>
    </ScreenWrapper>
  );
};

const quickMenuItems = [
  ['calendar-today', 'My Bookings', 'UserBookings'],
  ['favorite-border', 'Memorial Profile', 'UserMemorials'],
  ['account-circle', 'My Profile', 'UserProfile'],
  ['favorite', 'Hearts Wallet', 'UserCoinsWallet'],
  ['auto-awesome', 'Subscription Plans', 'SelectSubscriptions'],
  ['volunteer-activism', 'Healing Support', 'HealingSupport'],
  ['help-outline', 'Help & Support', 'HelpSupport'],
];

const QuickNavigationModal = ({ isVisible, navigation, onClose, translateX }) => {
  const handleNavigate = (route, label) => {
    onClose();
    setTimeout(() => {
      navigation.navigate(route);
    }, 210);
  };

  return (
    <Modal transparent animationType="fade" visible={isVisible} onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.quickBackdrop}>
        <Animated.View
          style={[styles.quickMenuShell, { transform: [{ translateX }] }]}>
          <TouchableOpacity activeOpacity={1} style={styles.quickMenuCard}>
            <View style={styles.quickHeaderRow}>
              <AppText style={styles.quickMenuTitle}>Quick Navigation</AppText>
              <TouchableOpacity activeOpacity={0.75} onPress={onClose} style={styles.quickCloseBtn}>
                <AppIcon name="close" color={AppColors.white} size={18} />
              </TouchableOpacity>
            </View>
            <AppText style={styles.quickMenuSubtitle}>
              Navigate to different sections of the app
            </AppText>
            <LineBreak height={3.43} />
            {quickMenuItems.map(([icon, label, route]) => (
              <TouchableOpacity
                key={label}
                activeOpacity={0.82}
                onPress={() => handleNavigate(route, label)}
                style={styles.quickMenuItem}>
                <AppIcon name={icon} color={AppColors.white} size={24} />
                <AppText style={styles.quickMenuText}>{label}</AppText>
              </TouchableOpacity>
            ))}
            <View style={styles.quickDivider} />
            <TouchableOpacity activeOpacity={0.82} style={styles.quickMenuItem}>
              <AppIcon name="logout" color="#EF5350" size={24} />
              <AppText style={styles.quickLogout}>Log Out</AppText>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const HomeHeader = ({ onNavigate }) => (
  <ImageBackground
    source={AppAssets.images.userDashboardFront}
    imageStyle={styles.headerImage}
    resizeMode="cover"
    style={styles.header}>
    <View style={styles.headerTopRow}>
      <View>
        <AppText style={styles.welcome}>Welcome back,</AppText>
        <AppText style={styles.userName}>{user.firstName}</AppText>
      </View>

      <View style={styles.headerActions}>
        <HeaderIcon
          svg={recolorHomeSvg(AppSvgAssets.slot)}
          onPress={() => onNavigate('Quick Navigation')}
        />
        <HeaderIcon
          iconSet="material"
          name="search"
          onPress={() => onNavigate('Search')}
        />
        <HeaderIcon
          svg={recolorHomeSvg(AppSvgAssets.bell)}
          onPress={() => onNavigate('Alerts')}
        />
      </View>
    </View>

    <LineBreak height={2.58} />
    <View style={styles.statsRow}>
      <StatsCard
        svg={recolorHomeSvg(AppSvgAssets.memorialsHeader)}
        label="Memorials"
        value={user.memorialsCount}
        onPress={() => onNavigate('UserMemorials')}
      />
      <StatsCard
        svg={recolorHomeSvg(AppSvgAssets.calendar)}
        label="Next Visit"
        value={user.nextVisit}
        onPress={() => onNavigate('User Bookings')}
      />
      <StatsCard
        svg={recolorHomeSvg(AppSvgAssets.love, {
          light: AppColors.homeCard,
        })}
        label="Hearts"
        shouldWrapIcon
        value={`${wallet.coins}`}
        onPress={() => onNavigate('Hearts Wallet')}
      />
    </View>
  </ImageBackground>
);

const HeaderIcon = ({ iconSet = 'material', name, onPress, svg }) => (
  <TouchableOpacity
    activeOpacity={0.82}
    onPress={onPress}
    style={svg ? styles.headerSvgIcon : styles.headerIcon}>
    <AppIcon
      iconSet={iconSet}
      name={name}
      svg={svg}
      color={AppColors.themeColor}
      size={svg ? responsiveWidth(10.63) : 22}
    />
  </TouchableOpacity>
);

const StatsCard = ({ label, onPress, shouldWrapIcon, svg, value }) => (
  <GlassCard
    onPress={onPress}
    style={styles.statOuter}
    contentStyle={styles.statCard}>
    {shouldWrapIcon ? (
      <View style={styles.statIconCircle}>
        <AppIcon svg={svg} size={responsiveWidth(4.83)} />
      </View>
    ) : (
      <AppIcon svg={svg} size={responsiveWidth(6.28)} />
    )}
    <View style={styles.statTextWrap}>
      <AppText numberOfLines={2} style={styles.statLabel}>
        {label}
      </AppText>
      <LineBreak height={0.25} />
      <AppText numberOfLines={2} style={styles.statValue}>
        {value}
      </AppText>
    </View>
  </GlassCard>
);

const SearchBar = ({ onPress }) => (
  <GlassCard onPress={onPress} contentStyle={styles.searchBar}>
    <AppIcon name="search" color={AppColors.gold} size={22} />
    <AppText style={styles.searchText}>Search cemetery or service...</AppText>
  </GlassCard>
);

const DailyInspiration = () => (
  <GlassCard contentStyle={styles.inspiration}>
    <AppIcon
      svg={recolorHomeSvg(AppSvgAssets.heartInspiration)}
      size={responsiveWidth(9.7)}
    />
    <View style={styles.inspirationCopy}>
      <AppText style={styles.inspirationLabel}>Daily Inspiration</AppText>
      <LineBreak height={0.85} />
      <AppText style={styles.inspirationText}>
        "Love never fades — it transforms into eternal memory that warms our heart."
      </AppText>
    </View>
  </GlassCard>
);

const UpcomingServiceCard = ({ onPress, service }) => (
  <GlassCard onPress={onPress} contentStyle={styles.serviceCard}>
    <AppIcon
      svg={recolorHomeSvg(AppSvgAssets.flower)}
      size={responsiveWidth(10.63)}
    />
    <View style={styles.serviceCopy}>
      <AppText numberOfLines={1} style={styles.serviceTitle}>
        {service.serviceName}
      </AppText>
      <LineBreak height={0.4} />
      <AppText style={styles.serviceDate}>{service.date}</AppText>
      <LineBreak height={0.65} />
      <View style={styles.providerRow}>
        <View style={styles.providerDot} />
        <AppText numberOfLines={1} style={styles.providerText}>
          {service.providerName}
        </AppText>
      </View>
    </View>
    <AppIcon name="chevron-right" color={AppColors.gold} size={24} />
  </GlassCard>
);

const QuickActions = ({ onActionPress }) => (
  <View style={styles.quickSection}>
    <AppText style={styles.quickTitle}>Quick Actions</AppText>
    <LineBreak height={0.64} />
    <View style={styles.actionGrid}>
      {quickActions.map(action => (
        <QuickActionCard
          key={action.title}
          action={action}
          onPress={() => onActionPress(action.title)}
        />
      ))}
    </View>
  </View>
);

const QuickActionCard = ({ action, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.86}
    onPress={onPress}
    style={styles.actionCard}>
    <AppIcon svg={action.svg} size={responsiveWidth(9.66)} />
    <View>
      <AppText style={styles.actionTitle}>{action.title}</AppText>
      <LineBreak height={0.35} />
      <AppText style={styles.actionSubtitle}>{action.subtitle}</AppText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.homeBody,
  },
  container: {
    flex: 1,
  },
  bodyWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(1.72),
    paddingBottom: responsiveHeight(2.58),
    overflow: 'hidden',
    backgroundColor: AppColors.homeCard,
  },
  headerImage: {
    opacity: 1,
  },
  headerTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: responsiveHeight(6.4),
  },
  welcome: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    lineHeight: responsiveHeight(2.35),
  },
  userName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.55),
    fontWeight: '700',
    lineHeight: responsiveHeight(3.55),
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(9.66),
    height: responsiveWidth(9.66),
    marginLeft: responsiveWidth(1.93),
    borderRadius: responsiveWidth(4.83),
    backgroundColor: AppColors.white,
  },
  headerSvgIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(10.63),
    height: responsiveWidth(10.63),
    marginLeft: responsiveWidth(1.93),
  },
  statsRow: {
    flexDirection: 'row',
    gap: responsiveWidth(1.93),
  },
  statOuter: {
    flex: 1,
  },
  statCard: {
    backgroundColor: AppColors.homeCard,
    borderColor: AppColors.homeBorder,
    height: responsiveHeight(6.22),
    paddingHorizontal: responsiveWidth(1.93),
    paddingVertical: responsiveHeight(1.07),
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(9.18),
    height: responsiveWidth(9.18),
    borderRadius: responsiveWidth(4.59),
    backgroundColor: AppColors.white,
    flexShrink: 0,
  },
  statTextWrap: {
    flex: 1,
    marginLeft: responsiveWidth(1.93),
  },
  statLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
    lineHeight: responsiveHeight(1.65),
  },
  statValue: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    fontWeight: '700',
    lineHeight: responsiveHeight(1.9),
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: responsiveHeight(6.15),
  },
  contentMax: {
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: responsiveWidth(5.8),
  },
  searchBar: {
    alignItems: 'center',
    backgroundColor: AppColors.homeCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    minHeight: responsiveHeight(5.9),
    paddingHorizontal: responsiveWidth(3.86),
    paddingVertical: responsiveHeight(1.48),
  },
  searchText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.52),
    lineHeight: responsiveHeight(2.35),
    marginLeft: responsiveWidth(3),
  },
  inspiration: {
    alignItems: 'flex-start',
    backgroundColor: AppColors.homeCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    minHeight: responsiveHeight(11.8),
    padding: responsiveWidth(4.83),
  },
  inspirationCopy: {
    flex: 1,
    marginLeft: responsiveWidth(2.9),
  },
  inspirationLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
    lineHeight: responsiveHeight(1.9),
  },
  inspirationText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontStyle: 'italic',
    lineHeight: responsiveHeight(2.35),
  },
  serviceCard: {
    alignItems: 'center',
    backgroundColor: AppColors.homeCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    minHeight: responsiveHeight(11.2),
    marginBottom: responsiveHeight(1.29),
    padding: responsiveWidth(3.86),
  },
  serviceCopy: {
    flex: 1,
    marginHorizontal: responsiveWidth(2.9),
  },
  serviceTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
    lineHeight: responsiveHeight(2.55),
  },
  serviceDate: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.22),
    lineHeight: responsiveHeight(1.8),
  },
  providerRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  providerDot: {
    width: responsiveWidth(3.8),
    height: responsiveWidth(3.8),
    borderRadius: responsiveWidth(1.9),
    backgroundColor: AppColors.white,
    marginRight: responsiveWidth(2),
  },
  providerText: {
    color: AppColors.homeTextMuted,
    flex: 1,
    fontSize: responsiveFontSize(1.3),
  },
  quickSection: {
    width: '100%',
  },
  quickTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '47.7%',
    aspectRatio: 1.3,
    marginBottom: responsiveHeight(1.72),
    borderRadius: 14,
    backgroundColor: AppColors.homeActionCard,
    padding: responsiveWidth(3.86),
    justifyContent: 'space-between',
  },
  actionIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(11.6),
    height: responsiveWidth(11.6),
    borderRadius: responsiveWidth(5.8),
    backgroundColor: AppColors.white,
  },
  actionTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.65),
    fontWeight: '700',
    lineHeight: responsiveHeight(2.45),
  },
  actionSubtitle: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: responsiveFontSize(1.32),
    lineHeight: responsiveHeight(2.2),
  },
  quickBackdrop: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    flex: 1,
    paddingRight: responsiveWidth(2.4),
    paddingTop: responsiveHeight(3.2),
  },
  quickMenuShell: {
    maxWidth: 360,
    width: '85%',
  },
  quickMenuCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 24,
    borderWidth: 1,
    padding: responsiveWidth(5.8),
  },
  quickHeaderRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickMenuTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
  quickCloseBtn: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  quickMenuSubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    marginTop: responsiveHeight(0.85),
  },
  quickMenuItem: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: responsiveHeight(1.29),
  },
  quickMenuText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    marginLeft: responsiveWidth(3.86),
  },
  quickDivider: {
    backgroundColor: AppColors.homeBorder,
    height: 1,
    marginVertical: responsiveHeight(1.72),
  },
  quickLogout: {
    color: '#EF5350',
    fontSize: responsiveFontSize(1.55),
    fontWeight: '600',
    marginLeft: responsiveWidth(3.86),
  },
});

export default UserHomeScreen;
