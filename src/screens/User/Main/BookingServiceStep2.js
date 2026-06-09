import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const BookingServiceStep2 = ({ navigation }) => (
  <ScreenWrapper
    isScroll
    style={styles.screen}
    contentContainerStyle={styles.scrollContent}>
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.goBack()}
        style={styles.backBtn}>
        <AppIcon iconSet="ion" name="chevron-back" color={AppColors.white} size={22} />
      </TouchableOpacity>
    </View>

    <View style={styles.spacer} />

    <View style={styles.content}>
      <GlassCard contentStyle={styles.formCard}>
        <AppText style={styles.cardTitle}>Location Details</AppText>
        <LineBreak height={2.58} />
        <Field label="Cemetery Name" placeholder="e.g., Forest Lawn..." />
        <LineBreak height={1.72} />
        <Field label="Grave Number" placeholder="e.g., Plot C, Grave #45" />
        <LineBreak height={2.58} />
        <AppText style={styles.label}>Location</AppText>
        <LineBreak height={0.85} />
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('MapSelection')}
          style={styles.mapButton}>
          <AppIcon name="location-on" color={AppColors.memorialCard} size={20} />
          <AppText style={styles.mapButtonText}>Select from Map</AppText>
        </TouchableOpacity>
      </GlassCard>
    </View>

    <View style={styles.footer}>
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => navigation.navigate('BookingServiceStep3')}
        style={styles.continueButton}>
        <AppText style={styles.continueText}>Continue</AppText>
      </TouchableOpacity>
    </View>
  </ScreenWrapper>
);

const Field = ({ label, placeholder }) => (
  <View>
    <AppText style={styles.label}>{label}</AppText>
    <LineBreak height={0.85} />
    <AppTextInput
      placeholder={placeholder}
      style={styles.input}
      inputStyle={styles.inputText}
    />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.homeBody,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(2.15),
  },
  backBtn: {
    alignItems: 'center',
    height: responsiveWidth(8),
    justifyContent: 'center',
    width: responsiveWidth(8),
  },
  spacer: {
    height: responsiveHeight(7.1),
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5.8),
  },
  formCard: {
    width: responsiveWidth(76),
    backgroundColor: AppColors.memorialCard,
    borderColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(8.45),
    paddingVertical: responsiveHeight(3),
  },
  cardTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    fontWeight: '400',
  },
  label: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.08),
  },
  input: {
    backgroundColor: AppColors.memorialMutedButton,
    borderColor: 'transparent',
    borderRadius: 10,
    height: responsiveHeight(5.15),
  },
  inputText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.25),
    paddingHorizontal: responsiveWidth(3.86),
  },
  mapButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.5),
  },
  mapButtonText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.25),
    marginLeft: responsiveWidth(1.45),
  },
  footer: {
    marginTop: 'auto',
    padding: responsiveWidth(5.8),
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    paddingVertical: responsiveHeight(1.35),
  },
  continueText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.12),
  },
});

export default BookingServiceStep2;
