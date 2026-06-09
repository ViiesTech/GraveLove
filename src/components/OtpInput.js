import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppColors, AppGradients } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const OtpInput = ({ value, onChangeText, style }) => (
  <LinearGradient colors={AppGradients.glassCard} style={[styles.wrap, style]}>
    <TextInput
      value={value}
      onChangeText={text => onChangeText(text.replace(/[^0-9]/g, ''))}
      keyboardType="number-pad"
      maxLength={6}
      placeholder="000000"
      placeholderTextColor="rgba(248, 251, 255, 0.32)"
      selectionColor={AppColors.white}
      style={styles.input}
      textAlign="center"
    />
  </LinearGradient>
);

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: responsiveHeight(5.9),
    borderWidth: 0.5,
    borderColor: AppColors.border,
    borderRadius: responsiveHeight(3),
  },
  input: {
    width: '100%',
    height: '100%',
    color: AppColors.white,
    fontFamily: 'Arial',
    fontSize: responsiveFontSize(2.3),
    letterSpacing: responsiveWidth(1.9),
    padding: 0,
  },
});

export default OtpInput;
