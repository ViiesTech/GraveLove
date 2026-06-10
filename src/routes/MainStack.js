import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AppIcon from '../components/AppIcon';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import AddTributeScreen from '../screens/User/Main/AddTributeScreen';
import BookingServiceStep2 from '../screens/User/Main/BookingServiceStep2';
import BookingServiceStep3 from '../screens/User/Main/BookingServiceStep3';
import BookingServiceStep4 from '../screens/User/Main/BookingServiceStep4';
import BookServiceScreen from '../screens/User/Main/BookServiceScreen';
import CreateMemorialStep1 from '../screens/User/Main/CreateMemorialStep1';
import CreateMemorialStep2 from '../screens/User/Main/CreateMemorialStep2';
import CreateMemorialStep3 from '../screens/User/Main/CreateMemorialStep3';
import EditProfileScreen from '../screens/User/Main/EditProfileScreen';
import HelpSupportScreen from '../screens/User/Main/HelpSupportScreen';
import HealingSupportScreen from '../screens/User/Main/HealingSupportScreen';
import MapSelectionScreen from '../screens/User/Main/MapSelectionScreen';
import MemorialProfileScreen from '../screens/User/Main/MemorialProfileScreen';
import MemorialWallScreen from '../screens/User/Main/MemorialWallScreen';
import MessageSentScreen from '../screens/User/Main/MessageSentScreen';
import PaymentStatusScreen from '../screens/User/Main/PaymentStatusScreen';
import PrivacySecurityScreen from '../screens/User/Main/PrivacySecurityScreen';
import PurchaseHeartsScreen from '../screens/User/Main/PurchaseHeartsScreen';
import RecentlyCompletedJobsScreen from '../screens/Vendor/Main/RecentlyCompletedJobsScreen';
import SelectSubscriptionsScreen from '../screens/User/Main/SelectSubscriptionsScreen';
import ServicePaymentScreen from '../screens/User/Main/ServicePaymentScreen';
import ServiceBookingDetailScreen from '../screens/User/Main/ServiceBookingDetailScreen';
import ShareHeartsScreen from '../screens/User/Main/ShareHeartsScreen';
import SearchScreen from '../screens/User/Main/SearchScreen';
import SubscriptionPaymentScreen from '../screens/User/Main/SubscriptionPaymentScreen';
import UpcomingServiceDetailsScreen from '../screens/User/Main/UpcomingServiceDetailsScreen';
import UserAddMemorialScreen from '../screens/User/Main/UserAddMemorialScreen';
import UserAlertsScreen from '../screens/User/Main/UserAlertsScreen';
import UserBookingsScreen from '../screens/User/Main/UserBookingsScreen';
import UserCoinsWalletScreen from '../screens/User/Main/UserCoinsWalletScreen';
import UserHomeScreen from '../screens/User/Main/UserHomeScreen';
import UserMemorialsScreen from '../screens/User/Main/UserMemorialsScreen';
import UserMostLovedMemoriesScreen from '../screens/User/Main/UserMostLovedMemoriesScreen';
import UserPostMemoryScreen from '../screens/User/Main/UserPostMemoryScreen';
import UserProfileScreen from '../screens/User/Main/UserProfileScreen';
import UserVendorsScreen from '../screens/User/Main/UserVendorsScreen';
import VendorFeedbackScreen from '../screens/User/Main/VendorFeedbackScreen';
import VendorCheckoutScreen from '../screens/User/Main/VendorCheckoutScreen';
import VendorServiceSelectionScreen from '../screens/User/Main/VendorServiceSelectionScreen';
import VendorServiceRecordsScreen from '../screens/User/Main/VendorServiceRecordsScreen';
import ViewBookingDetailsScreen from '../screens/User/Main/ViewBookingDetailsScreen';
import ViewMemorialPhotosScreen from '../screens/User/Main/ViewMemorialPhotosScreen';
import ViewMemorialServiceInfoScreen from '../screens/User/Main/ViewMemorialServiceInfoScreen';
import VisitLogScreen from '../screens/User/Main/VisitLogScreen';
import VendorAvailableJobsScreen from '../screens/Vendor/Main/VendorAvailableJobsScreen';
import VendorChatScreen from '../screens/Vendor/Main/VendorChatScreen';
import VendorCompletionProofScreen from '../screens/Vendor/Main/VendorCompletionProofScreen';
import VendorDashboardScreen from '../screens/Vendor/Main/VendorDashboardScreen';
import VendorEarningsScreen from '../screens/Vendor/Main/VendorEarningsScreen';
import VendorJobDetailsScreen from '../screens/Vendor/Main/VendorJobDetailsScreen';
import VendorNotificationsScreen from '../screens/Vendor/Main/VendorNotificationsScreen';
import VendorPersonalChatScreen from '../screens/Vendor/Main/VendorPersonalChatScreen';
import VendorProfileScreen from '../screens/Vendor/Main/VendorProfileScreen';
import VendorServiceEditScreen from '../screens/Vendor/Main/VendorServiceEditScreen';
import VendorTaskDetailsScreen from '../screens/Vendor/Main/VendorTaskDetailsScreen';
import VendorTasksScreen from '../screens/Vendor/Main/VendorTasksScreen';
import VendorUpdateProfileScreen from '../screens/Vendor/Main/VendorUpdateProfileScreen';
import { AppColors } from '../utils/AppColors';
import { AppSvgAssets } from '../utils/AppSvgAssets';
import { responsiveHeight } from '../utils/Responsive_Dimensions';

const MainStackNavigator = createStackNavigator();
const UserMainStack = createStackNavigator();
const UserTabNavigator = createBottomTabNavigator();
const VendorMainStack = createStackNavigator();
const VendorTabNavigator = createBottomTabNavigator();

const stackScreenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
};

const recolorTabSvg = (svg, color) =>
  svg
    .replace(/#FBF0C4/g, color)
    .replace(/#F0E5BB/g, color)
    .replace(/#EBE1B7/g, color)
    .replace(/#DDD8C4/g, color);

const tabIconMap = {
  UserHome: AppSvgAssets.home,
  UserMemorials: AppSvgAssets.memorials,
  UserProfile: AppSvgAssets.profile,
};

const UserTabIcon = ({ color, routeName }) => {
  if (routeName === 'Search') {
    return <AppIcon name="search" color={color} size={28} />;
  }

  return (
    <AppIcon
      svg={recolorTabSvg(tabIconMap[routeName], color)}
      size={28}
    />
  );
};

const makeTabIcon = routeName => ({ color }) => (
  <UserTabIcon color={color} routeName={routeName} />
);

const getTabScreenOptions = () => ({
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: AppColors.white,
  tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.34)',
  tabBarStyle: styles.tabBar,
  tabBarItemStyle: styles.tabItem,
  sceneStyle: styles.tabScene,
});

const UserTabs = () => (
  <UserTabNavigator.Navigator
    initialRouteName="UserHome"
    screenOptions={getTabScreenOptions}
  >
    <UserTabNavigator.Screen
      name="UserHome"
      component={UserHomeScreen}
      options={{ tabBarIcon: makeTabIcon('UserHome') }}
    />
    <UserTabNavigator.Screen
      name="UserMemorials"
      component={UserMemorialsScreen}
      options={{ tabBarIcon: makeTabIcon('UserMemorials') }}
    />
    <UserTabNavigator.Screen
      name="Search"
      component={SearchScreen}
      options={{ tabBarIcon: makeTabIcon('Search') }}
    />
    <UserTabNavigator.Screen
      name="UserProfile"
      component={UserProfileScreen}
      options={{ tabBarIcon: makeTabIcon('UserProfile') }}
    />
  </UserTabNavigator.Navigator>
);

const vendorTabIcons = {
  VendorDashboard: 'home',
  VendorTasks: 'work-outline',
  VendorChat: 'chat-bubble-outline',
  VendorEarnings: 'attach-money',
  VendorProfile: 'person-outline',
};

const makeVendorTabIcon = routeName => ({ color }) => (
  <AppIcon name={vendorTabIcons[routeName]} color={color} size={27} />
);

const VendorTabs = () => (
  <VendorTabNavigator.Navigator
    initialRouteName="VendorDashboard"
    screenOptions={getTabScreenOptions}
  >
    <VendorTabNavigator.Screen
      name="VendorDashboard"
      component={VendorDashboardScreen}
      options={{ tabBarIcon: makeVendorTabIcon('VendorDashboard') }}
    />
    <VendorTabNavigator.Screen
      name="VendorTasks"
      component={VendorTasksScreen}
      options={{ tabBarIcon: makeVendorTabIcon('VendorTasks') }}
    />
    <VendorTabNavigator.Screen
      name="VendorChat"
      component={VendorChatScreen}
      options={{ tabBarIcon: makeVendorTabIcon('VendorChat') }}
    />
    <VendorTabNavigator.Screen
      name="VendorEarnings"
      component={VendorEarningsScreen}
      options={{ tabBarIcon: makeVendorTabIcon('VendorEarnings') }}
    />
    <VendorTabNavigator.Screen
      name="VendorProfile"
      component={VendorProfileScreen}
      options={{ tabBarIcon: makeVendorTabIcon('VendorProfile') }}
    />
  </VendorTabNavigator.Navigator>
);

export const UserMain = () => (
  <UserMainStack.Navigator
    initialRouteName="UserTabs"
    screenOptions={stackScreenOptions}
  >
    <UserMainStack.Screen
      name="UserTabs"
      component={UserTabs}
    />
    <UserMainStack.Screen
      name="UserAddMemorial"
      component={UserAddMemorialScreen}
    />
    <UserMainStack.Screen
      name="CreateMemorialStep1"
      component={CreateMemorialStep1}
    />
    <UserMainStack.Screen
      name="CreateMemorialStep2"
      component={CreateMemorialStep2}
    />
    <UserMainStack.Screen
      name="CreateMemorialStep3"
      component={CreateMemorialStep3}
    />
    <UserMainStack.Screen
      name="MemorialProfile"
      component={MemorialProfileScreen}
    />
    <UserMainStack.Screen
      name="MemorialWall"
      component={MemorialWallScreen}
    />
    <UserMainStack.Screen
      name="AddTribute"
      component={AddTributeScreen}
    />
    <UserMainStack.Screen
      name="ViewMemorialPhotos"
      component={ViewMemorialPhotosScreen}
    />
    <UserMainStack.Screen
      name="ViewMemorialServiceInfo"
      component={ViewMemorialServiceInfoScreen}
    />
    <UserMainStack.Screen
      name="BookService"
      component={BookServiceScreen}
    />
    <UserMainStack.Screen
      name="VendorServiceSelection"
      component={VendorServiceSelectionScreen}
    />
    <UserMainStack.Screen
      name="BookingServiceStep2"
      component={BookingServiceStep2}
    />
    <UserMainStack.Screen
      name="BookingServiceStep3"
      component={BookingServiceStep3}
    />
    <UserMainStack.Screen
      name="BookingServiceStep4"
      component={BookingServiceStep4}
    />
    <UserMainStack.Screen
      name="MapSelection"
      component={MapSelectionScreen}
    />
    <UserMainStack.Screen
      name="ServiceBookingDetail"
      component={ServiceBookingDetailScreen}
    />
    <UserMainStack.Screen
      name="VendorCheckout"
      component={VendorCheckoutScreen}
    />
    <UserMainStack.Screen
      name="UserBookings"
      component={UserBookingsScreen}
    />
    <UserMainStack.Screen
      name="ViewBookingDetails"
      component={ViewBookingDetailsScreen}
    />
    <UserMainStack.Screen
      name="ServicePayment"
      component={ServicePaymentScreen}
    />
    <UserMainStack.Screen
      name="PaymentStatus"
      component={PaymentStatusScreen}
    />
    <UserMainStack.Screen
      name="VendorServiceRecords"
      component={VendorServiceRecordsScreen}
    />
    <UserMainStack.Screen
      name="VendorFeedback"
      component={VendorFeedbackScreen}
    />
    <UserMainStack.Screen
      name="FeedbackToVendor"
      component={VendorFeedbackScreen}
    />
    <UserMainStack.Screen
      name="UpcomingServiceDetails"
      component={UpcomingServiceDetailsScreen}
    />
    <UserMainStack.Screen
      name="VisitLog"
      component={VisitLogScreen}
    />
    <UserMainStack.Screen
      name="UserAlerts"
      component={UserAlertsScreen}
    />
    <UserMainStack.Screen
      name="UserVendors"
      component={UserVendorsScreen}
    />
    <UserMainStack.Screen
      name="EditProfile"
      component={EditProfileScreen}
    />
    <UserMainStack.Screen
      name="UserCoinsWallet"
      component={UserCoinsWalletScreen}
    />
    <UserMainStack.Screen
      name="PurchaseHearts"
      component={PurchaseHeartsScreen}
    />
    <UserMainStack.Screen
      name="ShareHearts"
      component={ShareHeartsScreen}
    />
    <UserMainStack.Screen
      name="SelectSubscriptions"
      component={SelectSubscriptionsScreen}
    />
    <UserMainStack.Screen
      name="SubscriptionPayment"
      component={SubscriptionPaymentScreen}
    />
    <UserMainStack.Screen
      name="HelpSupport"
      component={HelpSupportScreen}
    />
    <UserMainStack.Screen
      name="HealingSupport"
      component={HealingSupportScreen}
    />
    <UserMainStack.Screen
      name="PrivacySecurity"
      component={PrivacySecurityScreen}
    />
    <UserMainStack.Screen
      name="UserPostMemory"
      component={UserPostMemoryScreen}
    />
    <UserMainStack.Screen
      name="UserMostLovedMemories"
      component={UserMostLovedMemoriesScreen}
    />
    <UserMainStack.Screen
      name="MessageSent"
      component={MessageSentScreen}
    />
    <UserMainStack.Screen
      name="UserPlaceholder"
      component={PlaceholderScreen}
    />
  </UserMainStack.Navigator>
);

export const VendorMain = () => (
  <VendorMainStack.Navigator
    initialRouteName="VendorTabs"
    screenOptions={stackScreenOptions}
  >
    <VendorMainStack.Screen
      name="VendorTabs"
      component={VendorTabs}
    />
    <VendorMainStack.Screen
      name="VendorAvailableJobs"
      component={VendorAvailableJobsScreen}
    />
    <VendorMainStack.Screen
      name="VendorJobDetails"
      component={VendorJobDetailsScreen}
    />
    <VendorMainStack.Screen
      name="VendorTaskDetails"
      component={VendorTaskDetailsScreen}
    />
    <VendorMainStack.Screen
      name="VendorCompletionProof"
      component={VendorCompletionProofScreen}
    />
    <VendorMainStack.Screen
      name="RecentlyCompletedJobs"
      component={RecentlyCompletedJobsScreen}
    />
    <VendorMainStack.Screen
      name="VendorNotifications"
      component={VendorNotificationsScreen}
    />
    <VendorMainStack.Screen
      name="VendorPersonalChat"
      component={VendorPersonalChatScreen}
    />
    <VendorMainStack.Screen
      name="VendorUpdateProfile"
      component={VendorUpdateProfileScreen}
    />
    <VendorMainStack.Screen
      name="VendorServiceEdit"
      component={VendorServiceEditScreen}
    />
  </VendorMainStack.Navigator>
);

const MainStack = () => (
  <MainStackNavigator.Navigator
    initialRouteName="UserMain"
    screenOptions={stackScreenOptions}
  >
    <MainStackNavigator.Screen name="UserMain" component={UserMain} />
    <MainStackNavigator.Screen name="VendorMain" component={VendorMain} />
  </MainStackNavigator.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    height: responsiveHeight(7.2),
    paddingTop: responsiveHeight(1.25),
    paddingBottom: responsiveHeight(1),
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: AppColors.bgDark,
  },
  tabItem: {
    justifyContent: 'center',
  },
  tabScene: {
    backgroundColor: 'transparent',
  },
});

export default MainStack;
