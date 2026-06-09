import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AppIcon from './AppIcon';
import AppText from './AppText';
import { AppColors } from '../utils/AppColors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const AuthSocialButton = ({
  iconName,
  iconSet = 'ion',
  iconSvg,
  label,
  onPress,
  style,
}) => (
  <TouchableOpacity
    activeOpacity={0.82}
    style={[styles.button, style]}
    onPress={onPress}
  >
    <AppIcon
      iconSet={iconSet}
      name={iconName}
      size={18}
      svg={iconSvg}
      color={AppColors.white}
      style={styles.icon}
    />
    <AppText style={styles.text}>{label}</AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: responsiveHeight(5.9),
    borderRadius: responsiveHeight(3),
    backgroundColor: AppColors.themeColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: responsiveWidth(2),
  },
  text: {
    color: AppColors.white,
  },
});

export default AuthSocialButton;
