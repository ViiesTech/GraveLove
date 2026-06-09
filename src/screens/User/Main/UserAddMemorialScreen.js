import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const UserAddMemorialScreen = ({ navigation }) => {
  const openStepOne = () => navigation.navigate('CreateMemorialStep1');

  return (
    <ScreenWrapper style={styles.screen}>
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <AppIcon
              iconSet="ion"
              name="chevron-back"
              color={AppColors.white}
              size={responsiveWidth(4.35)}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.selectionWrap}>
          <SelectionButton
            label="Create account for Pet"
            onPress={openStepOne}
          />
          <SelectionButton
            label="Create for a Relative"
            onPress={openStepOne}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const SelectionButton = ({ label, onPress }) => (
  <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={styles.selectionButton}>
    <AppText style={styles.selectionText}>{label}</AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.bgDark,
  },
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingVertical: responsiveHeight(2.15),
  },
  backButton: {
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.22)',
    borderRadius: 8,
    borderWidth: 1,
    height: responsiveWidth(9.66),
    justifyContent: 'center',
    width: responsiveWidth(9.66),
  },
  selectionWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: responsiveHeight(16),
    paddingHorizontal: responsiveWidth(9.66),
  },
  selectionButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(4, 47, 103, 0.82)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 30,
    borderWidth: 0.5,
    height: responsiveHeight(6.02),
    justifyContent: 'center',
    marginBottom: responsiveHeight(2.58),
  },
  selectionText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '500',
  },
});

export default UserAddMemorialScreen;
