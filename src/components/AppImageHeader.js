import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from './AppIcon';
import AppText from './AppText';
import LineBreak from './LineBreak';
import { AppColors } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const AppImageHeader = ({
  height,
  image,
  onBack,
  showBack = true,
  subtitle,
  style,
  title,
}) => (
  <ImageBackground
    source={image}
    resizeMode="cover"
    style={[styles.header, height ? { height } : null, style]}>
    {showBack ? (
      <TouchableOpacity activeOpacity={0.75} onPress={onBack} style={styles.backBtn}>
        <AppIcon
          iconSet="ion"
          name="chevron-back"
          color={AppColors.white}
          size={responsiveWidth(5.3)}
        />
      </TouchableOpacity>
    ) : (
      <View style={styles.backSpace} />
    )}
    <LineBreak height={1.25} />
    <AppText style={styles.title}>{title}</AppText>
    <LineBreak height={0.42} />
    <AppText style={styles.subtitle}>{subtitle}</AppText>
  </ImageBackground>
);

const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(15.2),
    paddingTop: responsiveHeight(4.2),
    paddingBottom: responsiveHeight(1.72),
    paddingHorizontal: responsiveWidth(5.8),
    overflow: 'hidden',
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(5.8),
    height: responsiveWidth(5.8),
  },
  backSpace: {
    width: responsiveWidth(5.8),
    height: responsiveWidth(5.8),
  },
  title: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
  },
});

export default AppImageHeader;
