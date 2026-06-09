import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import AppIcon from './AppIcon';
import { AppColors } from '../utils/AppColors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const AppBackButton = ({ onPress, style }) => (
  <Pressable style={[styles.button, style]} onPress={onPress}>
    <AppIcon
      iconSet="material"
      name="chevron-left"
      size={24}
      color={AppColors.gold}
    />
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(8.5),
    height: responsiveHeight(4.2),
    borderWidth: 1.5,
    borderColor: AppColors.border,
    borderRadius: 8,
  },
});

export default AppBackButton;
