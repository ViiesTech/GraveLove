import React from 'react';
import { StyleSheet, View } from 'react-native';
import { responsiveWidth } from '../utils/Responsive_Dimensions';
import { AppColors } from '../utils/AppColors';

const VendorAuthCard = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 600,
    padding: responsiveWidth(5.8),
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
});

export default VendorAuthCard;
