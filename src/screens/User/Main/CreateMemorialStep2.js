import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import CreateMemorialHeader from '../../../components/CreateMemorialHeader';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import {
  BackContinueButtons,
  FieldLabel,
  TextField,
} from './CreateMemorialStep1';

const CreateMemorialStep2 = ({ navigation }) => (
  <ScreenWrapper safeAreaEdges={[]} style={styles.screen}>
    <CreateMemorialHeader onBack={() => navigation.goBack()} step={2} />
    <ScrollView
      bounces
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <AppText style={styles.sectionTitle}>Burial Location</AppText>
      <LineBreak height={1.72} />

      <FieldLabel label="Cemetery Name *" />
      <TextField placeholder="e.g., Forest Lawn Memorial Park" />

      <LineBreak height={1.72} />
      <FieldLabel label="Section" />
      <TextField placeholder="e.g., Garden of Peace" />

      <LineBreak height={1.72} />
      <FieldLabel label="Plot Number" />
      <TextField placeholder="e.g., Plot 142" />

      <LineBreak height={1.72} />
      <FieldLabel label="Grave Number" />
      <TextField placeholder="e.g., #45" />

      <LineBreak height={2.58} />
      <View style={styles.infoCard}>
        <AppIcon
          name="location-on"
          color={AppColors.white}
          size={responsiveWidth(4.83)}
        />
        <View style={styles.infoCopy}>
          <AppText style={styles.infoTitle}>Location Details</AppText>
          <LineBreak height={0.42} />
          <AppText style={styles.infoText}>
            These details help vendors locate the grave for services
          </AppText>
        </View>
      </View>

      <LineBreak height={4.3} />
      <BackContinueButtons
        onBack={() => navigation.goBack()}
        onContinue={() => navigation.navigate('CreateMemorialStep3')}
      />
      <LineBreak height={4.3} />
    </ScrollView>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.bgDark,
  },
  content: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(2.58),
  },
  sectionTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  infoCard: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
  },
  infoCopy: {
    flex: 1,
    marginLeft: responsiveWidth(2.9),
  },
  infoTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  infoText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
    lineHeight: responsiveHeight(1.9),
  },
});

export default CreateMemorialStep2;
