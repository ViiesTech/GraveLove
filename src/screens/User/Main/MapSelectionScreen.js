import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const MapSelectionScreen = ({ navigation }) => (
  <ScreenWrapper style={styles.screen} contentContainerStyle={styles.container}>
    <AppImageHeader
      image={AppAssets.images.mapViewImage}
      onBack={() => navigation.goBack()}
      title="Select Location"
      subtitle="Tap on the map to mark the grave location"
    />

    <View style={styles.mapBody}>
      <AppIcon name="location-on" color={AppColors.white} size={responsiveWidth(13.5)} />
      <LineText primary>Interactive map view</LineText>
      <LineText>Tap to set grave location marker</LineText>
    </View>

    <View style={styles.footer}>
      <AppButton
        onPress={() => navigation.goBack()}
        style={styles.confirmButton}
        textStyle={styles.confirmText}>
        Confirm Location
      </AppButton>
    </View>
  </ScreenWrapper>
);

const LineText = ({ children, primary }) => (
  <AppText style={[styles.mapText, primary && styles.mapTextPrimary]}>{children}</AppText>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.homeBody,
  },
  container: {
    flex: 1,
  },
  mapBody: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: responsiveHeight(19.3),
  },
  mapText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.25),
    marginTop: responsiveHeight(0.85),
  },
  mapTextPrimary: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.5),
    marginTop: responsiveHeight(1.72),
  },
  footer: {
    bottom: responsiveHeight(2.58),
    left: responsiveWidth(5.8),
    position: 'absolute',
    right: responsiveWidth(5.8),
  },
  confirmButton: {
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
  },
  confirmText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.2),
  },
});

export default MapSelectionScreen;
