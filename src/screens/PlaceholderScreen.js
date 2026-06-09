import React from 'react';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import LineBreak from '../components/LineBreak';
import { AppColors } from '../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Responsive_Dimensions';

const PlaceholderScreen = ({ navigation, route }) => {
  const title = route?.params?.title || 'Coming Soon';

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.bgDark} barStyle="light-content" />
      <AppText variant="title" style={styles.title}>{title}</AppText>
      <LineBreak height={1} />
      <AppText variant="bodyDim" style={styles.subtitle}>
        This screen will be converted next.
      </AppText>
      <LineBreak height={3} />
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <AppText style={styles.buttonText}>Back</AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(6),
    backgroundColor: AppColors.bgDark,
  },
  title: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: AppColors.goldDim,
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(5.5),
    paddingHorizontal: responsiveWidth(8),
    borderWidth: 0.5,
    borderColor: AppColors.border,
    borderRadius: responsiveHeight(3),
  },
  buttonText: {
    color: AppColors.gold,
    fontSize: responsiveFontSize(1.5),
  },
});

export default PlaceholderScreen;
