import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import { AppColors } from '../utils/AppColors';
import { responsiveFontSize } from '../utils/Responsive_Dimensions';

const SectionHeader = ({ action, onActionPress, title }) => (
  <View style={styles.row}>
    <AppText style={styles.title}>{title}</AppText>
    {action ? (
      <TouchableOpacity activeOpacity={0.75} onPress={onActionPress}>
        <AppText style={styles.action}>{action}</AppText>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
  },
  action: {
    color: AppColors.goldAction,
    fontSize: responsiveFontSize(1.52),
  },
});

export default SectionHeader;
