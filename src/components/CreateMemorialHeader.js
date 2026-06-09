import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppIcon from './AppIcon';
import AppText from './AppText';
import LineBreak from './LineBreak';
import { AppAssets } from '../utils/AppAssets';
import { AppColors } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const CreateMemorialHeader = ({ onBack, step = 1 }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.statusBand, { height: insets.top }]} />
      <ImageBackground
        source={AppAssets.images.memorialImage}
        resizeMode="cover"
        style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} onPress={onBack}>
          <AppIcon
            iconSet="ion"
            name="chevron-back"
            color={AppColors.white}
            size={responsiveWidth(5.3)}
          />
        </TouchableOpacity>
        <LineBreak height={2.58} />
        <AppText style={styles.title}>Add New Memorial</AppText>
        <LineBreak height={0.85} />
        <AppText style={styles.subtitle}>Create a profile for your loved one</AppText>
        <LineBreak height={2.58} />
        <View style={styles.progressRow}>
          {[1, 2, 3].map(index => (
            <View
              key={index}
              style={[
                styles.progressSegment,
                index <= step ? styles.progressActive : styles.progressInactive,
              ]}
            />
          ))}
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  statusBand: {
    backgroundColor: AppColors.homeBody,
  },
  header: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(5.15),
    paddingBottom: responsiveHeight(2.58),
  },
  title: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.95),
    fontWeight: '700',
  },
  subtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.52),
  },
  progressRow: {
    flexDirection: 'row',
    gap: responsiveWidth(1.93),
  },
  progressSegment: {
    borderRadius: 2,
    flex: 1,
    height: 4,
  },
  progressActive: {
    backgroundColor: AppColors.white,
  },
  progressInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default CreateMemorialHeader;
