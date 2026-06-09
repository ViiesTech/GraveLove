import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmailConfirmationScreen from '../screens/EmailConfirmationScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import UserSignupScreen from '../screens/UserSignupScreen';
import VendorLoginScreen from '../screens/Vendor/Auth/VendorLoginScreen';
import VendorServiceAddScreen from '../screens/Vendor/Auth/VendorServiceAddScreen';
import VendorSetupProfileScreen from '../screens/Vendor/Auth/VendorSetupProfileScreen';
import VendorSignupScreen from '../screens/Vendor/Auth/VendorSignupScreen';

const AuthStackNavigator = createStackNavigator();
const UserAuthStack = createStackNavigator();
const VendorAuthStack = createStackNavigator();

const stackScreenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
};

export const UserAuth = () => (
  <UserAuthStack.Navigator
    initialRouteName="Login"
    screenOptions={stackScreenOptions}
  >
    <UserAuthStack.Screen name="Login" component={LoginScreen} />
    <UserAuthStack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      initialParams={{ role: 'user' }}
    />
    <UserAuthStack.Screen
      name="EmailConfirmation"
      component={EmailConfirmationScreen}
      initialParams={{ role: 'user' }}
    />
    <UserAuthStack.Screen
      name="ResetPassword"
      component={ResetPasswordScreen}
      initialParams={{ role: 'user' }}
    />
    <UserAuthStack.Screen
      name="RoleSelection"
      component={RoleSelectionScreen}
    />
    <UserAuthStack.Screen name="UserSignup" component={UserSignupScreen} />
  </UserAuthStack.Navigator>
);

export const VendorAuth = () => (
  <VendorAuthStack.Navigator
    initialRouteName="VendorLogin"
    screenOptions={stackScreenOptions}
  >
    <VendorAuthStack.Screen name="VendorLogin" component={VendorLoginScreen} />
    <VendorAuthStack.Screen
      name="VendorSignup"
      component={VendorSignupScreen}
    />
    <VendorAuthStack.Screen
      name="VendorSetupProfile"
      component={VendorSetupProfileScreen}
    />
    <VendorAuthStack.Screen
      name="VendorServiceAdd"
      component={VendorServiceAddScreen}
    />
    <VendorAuthStack.Screen
      name="VendorForgotPassword"
      component={ForgotPasswordScreen}
      initialParams={{ role: 'vendor' }}
    />
    <VendorAuthStack.Screen
      name="EmailConfirmation"
      component={EmailConfirmationScreen}
      initialParams={{ role: 'vendor' }}
    />
    <VendorAuthStack.Screen
      name="ResetPassword"
      component={ResetPasswordScreen}
      initialParams={{ role: 'vendor' }}
    />
  </VendorAuthStack.Navigator>
);

const AuthStack = () => (
  <AuthStackNavigator.Navigator
    initialRouteName="UserAuth"
    screenOptions={stackScreenOptions}
  >
    <AuthStackNavigator.Screen name="UserAuth" component={UserAuth} />
    <AuthStackNavigator.Screen name="VendorAuth" component={VendorAuth} />
  </AuthStackNavigator.Navigator>
);

export default AuthStack;
