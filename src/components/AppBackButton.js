import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import AppIcon from './AppIcon';
import { AppColors } from '../utils/AppColors';

const AppBackButton = ({ onPress, style }) => (
  <Pressable style={[styles.button, style]} onPress={onPress}>
    <AppIcon
      iconSet="material"
      name="chevron-left"
      size={30}
      color={AppColors.gold}
    />
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: responsiveWidth(8.5),
    // height: responsiveHeight(4.2),
  },
});

export default AppBackButton;
