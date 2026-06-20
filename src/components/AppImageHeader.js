import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
  bottomOverlay = false,
  children,
  footerSlotStyle,
  height,
  image,
  imageStyle,
  onBack,
  overlayBaseColor,
  overlayColors,
  overlayLocations,
  showBack = true,
  subtitle,
  style,
  title,
  titleIconColor = AppColors.white,
  titleIconName,
  titleIconSet = 'material',
  titleIconSize,
  titleIconSvg,
}) => (
  <ImageBackground
    imageStyle={[bottomOverlay ? styles.dimmedImage : null, imageStyle]}
    source={image}
    resizeMode="cover"
    style={[styles.header, height ? { height } : null, style]}>
    {bottomOverlay && overlayBaseColor ? (
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          styles.overlayLayer,
          { backgroundColor: overlayBaseColor },
        ]}
      />
    ) : null}
    {bottomOverlay ? (
      <LinearGradient
        colors={overlayColors || [
          'rgba(0, 0, 0, 0.05)',
          'rgba(0, 0, 0, 0.42)',
          'rgba(0, 0, 0, 0.9)',
        ]}
        locations={overlayLocations || [0, 0.52, 1]}
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, styles.overlayLayer]}
      />
    ) : null}
    <View style={styles.contentLayer}>
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
      {titleIconName || titleIconSvg ? (
        <View style={styles.titleRow}>
          <View style={styles.titleIconCircle}>
            <AppIcon
              color={titleIconColor}
              iconSet={titleIconSet}
              name={titleIconName}
              size={titleIconSize || responsiveWidth(5.8)}
              svg={titleIconSvg}
            />
          </View>
          <View style={styles.titleTextWrap}>
            <AppText style={styles.title}>{title}</AppText>
            <LineBreak height={0.42} />
            <AppText style={styles.subtitle}>{subtitle}</AppText>
          </View>
        </View>
      ) : (
        <>
          <AppText style={styles.title}>{title}</AppText>
          <LineBreak height={0.42} />
          <AppText style={styles.subtitle}>{subtitle}</AppText>
        </>
      )}
      {children ? <View style={[styles.footerSlot, footerSlotStyle]}>{children}</View> : null}
    </View>
  </ImageBackground>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppColors.black,
    height: responsiveHeight(19.5),
    overflow: 'hidden',
  },
  dimmedImage: {
    opacity: 0.64,
  },
  contentLayer: {
    flex: 1,
    paddingTop: responsiveHeight(4.2),
    paddingBottom: responsiveHeight(1.72),
    paddingHorizontal: responsiveWidth(5.8),
    zIndex: 2,
  },
  overlayLayer: {
    zIndex: 1,
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
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(11.5),
    height: responsiveWidth(11.5),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: responsiveWidth(5.75),
    marginRight: responsiveWidth(3.8),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  titleTextWrap: {
    flex: 1,
  },
  subtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
  },
  footerSlot: {
    marginTop: 'auto',
  },
});

export default AppImageHeader;
