import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppColors } from '../utils/AppColors';
import { responsiveFontSize } from '../utils/Responsive_Dimensions';

const variantStyles = {
  body: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '400',
  },
  bodyDim: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '400',
  },
  title: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.15),
    fontWeight: '700',
  },
  largeTitle: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.55),
    fontWeight: '700',
  },
  label: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '400',
  },
  action: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
};

const AppText = ({ children, style, variant = 'body', ...props }) => (
  <Text {...props} style={[styles.base, variantStyles[variant], style]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Arial',
  },
});

export default AppText;
