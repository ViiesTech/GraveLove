import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import { AppColors } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
} from '../utils/Responsive_Dimensions';

const AppButton = ({
  children,
  disabled = false,
  isLoading = false,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      disabled={disabled || isLoading}
      onPress={onPress}
      style={[styles.touchable, style]}
    >
      {isLoading ? (
        <ActivityIndicator color={AppColors.white} />
      ) : (
        <AppText style={[styles.text, textStyle]}>{children}</AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(5.9),
    borderRadius: responsiveHeight(3),
    backgroundColor: AppColors.themeColor,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: responsiveHeight(5.9),
    borderRadius: responsiveHeight(3),
  },
  outlineButton: {
    borderWidth: 0.5,
  },
  disabled: {
    opacity: 0.75,
  },
  text: {
    fontWeight: '500',
    fontSize: responsiveFontSize(1.65),
    color: AppColors.white,
  },
});

export default AppButton;
