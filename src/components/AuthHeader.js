import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppText from './AppText';
import LineBreak from './LineBreak';
import { AppAssets } from '../utils/AppAssets';
import { AppColors } from '../utils/AppColors';
import {
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const AuthHeader = ({ subtitle, title }) => (
  <View style={styles.container}>
    <Image
      source={AppAssets.images.authLogo}
      style={styles.logo}
      resizeMode="cover"
    />
    <LineBreak height={1} />
    <AppText style={styles.title}>{title}</AppText>
    {subtitle ? (
      <>
        <LineBreak height={1} />
        <AppText variant="bodyDim" style={styles.subtitle}>
          {subtitle}
        </AppText>
      </>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: responsiveWidth(22),
    height: responsiveHeight(10.8),
    borderRadius: responsiveWidth(2),
  },
  title: {
    color: AppColors.gold,
    fontWeight: '400',
  },
  subtitle: {
    color: AppColors.goldDim,
  },
});

export default AuthHeader;
