import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from './AppIcon';
import AppText from './AppText';
import { AppColors } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const VendorSetupHeader = ({ onBack, title }) => (
  <>
    <View style={styles.headerRow}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onBack}
        style={styles.backButton}>
        <AppIcon
          iconSet="material"
          name="arrow-back"
          size={24}
          color={AppColors.gold}
        />
      </TouchableOpacity>
      <AppText variant="largeTitle" style={styles.headerTitle}>
        {title}
      </AppText>
    </View>
    <View style={styles.headerDivider} />
  </>
);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3.9),
  },
  backButton: {
    padding: responsiveWidth(1),
  },
  headerTitle: {
    marginLeft: responsiveWidth(3.9),
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.35),
    fontWeight: '400',
  },
  headerDivider: {
    width: responsiveWidth(100),
    height: 1.5,
    marginTop: responsiveHeight(2),
    backgroundColor: '#B1CAE0',
  },
});

export default VendorSetupHeader;
