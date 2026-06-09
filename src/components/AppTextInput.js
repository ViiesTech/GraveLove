import React from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppIcon from './AppIcon';
import AppText from './AppText';
import { AppColors, AppGradients } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const AppTextInput = ({
  gradientColors = AppGradients.glassCard,
  iconColor = 'rgba(248, 251, 255, 0.58)',
  iconName,
  iconSet = 'material',
  inputStyle,
  leftIconStyle,
  onRightPress,
  rightIconColor = 'rgba(248, 251, 255, 0.48)',
  rightIconName,
  rightIconSet = 'material',
  rightLabel,
  style,
  ...textInputProps
}) => (
  <LinearGradient
    colors={gradientColors}
    style={[styles.inputWrap, style]}>
    {iconName ? (
      <AppIcon
        iconSet={iconSet}
        name={iconName}
        size={20}
        color={iconColor}
        style={[styles.leftIcon, leftIconStyle]}
      />
    ) : null}
    <TextInput
      {...textInputProps}
      placeholderTextColor="rgba(248, 251, 255, 0.32)"
      selectionColor={AppColors.white}
      style={[styles.input, inputStyle]}
    />
    {rightIconName || rightLabel ? (
      <Pressable style={styles.rightButton} onPress={onRightPress}>
        {rightIconName ? (
          <AppIcon
            iconSet={rightIconSet}
            name={rightIconName}
            size={20}
            color={rightIconColor}
          />
        ) : (
          <AppText style={styles.rightLabel}>{rightLabel}</AppText>
        )}
      </Pressable>
    ) : null}
  </LinearGradient>
);

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: responsiveHeight(4.7),
    borderWidth: 0.5,
    borderColor: AppColors.border,
    borderRadius: responsiveHeight(2.35),
    backgroundColor: 'transparent',
  },
  leftIcon: {
    width: responsiveWidth(13),
    textAlign: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    color: AppColors.white,
    fontFamily: 'Arial',
    fontSize: responsiveFontSize(1.52),
    padding: 0,
  },
  rightButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minWidth: responsiveWidth(12),
    paddingHorizontal: responsiveWidth(3),
  },
  rightLabel: {
    color: 'rgba(248, 251, 255, 0.5)',
    fontSize: responsiveFontSize(1.25),
  },
});

export default AppTextInput;
