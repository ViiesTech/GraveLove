import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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

const relationships = ['Parent', 'Sibling', 'Friend', 'Pet'];

const CreateMemorialStep1 = ({ navigation }) => {
  const [relationship, setRelationship] = useState('');
  const [isRelationshipOpen, setIsRelationshipOpen] = useState(false);

  return (
    <ScreenWrapper safeAreaEdges={[]} style={styles.screen}>
      <CreateMemorialHeader
        onBack={() => navigation.goBack()}
        step={1}
      />
      <ScrollView
        bounces
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <FieldLabel label="Full Name *" />
        <TextField placeholder="Enter full name" />

        <LineBreak height={2.15} />
        <FieldLabel label="Relationship *" />
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => setIsRelationshipOpen(true)}
          style={styles.field}>
          <AppText style={[styles.inputText, !relationship && styles.placeholder]}>
            {relationship || 'Select relationship'}
          </AppText>
          <AppIcon
            iconSet="ion"
            name="chevron-down"
            color={AppColors.homeTextMuted}
            size={responsiveWidth(4.35)}
          />
        </TouchableOpacity>

        <LineBreak height={2.15} />
        <FieldLabel label="Birth Date" />
        <DateField placeholder="Select Date" />

        <LineBreak height={2.15} />
        <FieldLabel label="Death Date" />
        <DateField placeholder="Select Date" />

        <LineBreak height={4.3} />
        <PrimaryButton
          label="Continue"
          onPress={() => navigation.navigate('CreateMemorialStep2')}
        />
        <LineBreak height={4.3} />
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={isRelationshipOpen}
        onRequestClose={() => setIsRelationshipOpen(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsRelationshipOpen(false)}
          style={styles.modalBackdrop}>
          <View style={styles.dropdown}>
            {relationships.map(item => (
              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => {
                  setRelationship(item);
                  setIsRelationshipOpen(false);
                }}
                style={styles.dropdownItem}>
                <AppText style={styles.dropdownText}>{item}</AppText>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScreenWrapper>
  );
};

export const FieldLabel = ({ label }) => (
  <AppText style={styles.label}>{label}</AppText>
);

export const TextField = ({ multiline, placeholder, style }) => (
  <View style={[styles.field, multiline && styles.multilineField, style]}>
    <TextInput
      multiline={multiline}
      placeholder={placeholder}
      placeholderTextColor="rgba(255, 255, 255, 0.3)"
      style={[styles.input, multiline && styles.multilineInput]}
    />
  </View>
);

const DateField = ({ placeholder }) => (
  <TouchableOpacity activeOpacity={0.82} style={styles.field}>
    <AppText style={styles.placeholder}>{placeholder}</AppText>
    <AppIcon
      name="calendar-today"
      color={AppColors.homeTextMuted}
      size={responsiveWidth(4.35)}
    />
  </TouchableOpacity>
);

export const PrimaryButton = ({ label, onPress }) => (
  <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={styles.primaryButton}>
    <AppText style={styles.primaryText}>{label}</AppText>
  </TouchableOpacity>
);

export const BackContinueButtons = ({ continueLabel = 'Continue', onBack, onContinue }) => (
  <View style={styles.buttonRow}>
    <TouchableOpacity activeOpacity={0.82} onPress={onBack} style={styles.outlineButton}>
      <AppText style={styles.outlineText}>Back</AppText>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.84} onPress={onContinue} style={styles.halfPrimaryButton}>
      <AppText style={styles.primaryText}>{continueLabel}</AppText>
    </TouchableOpacity>
  </View>
);

export const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.bgDark,
  },
  content: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(2.58),
  },
  label: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    marginBottom: responsiveHeight(0.85),
    marginLeft: responsiveWidth(0.95),
  },
  field: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    flexDirection: 'row',
    minHeight: responsiveHeight(5.8),
    paddingHorizontal: responsiveWidth(3.86),
    paddingVertical: responsiveHeight(0.42),
  },
  input: {
    color: AppColors.white,
    flex: 1,
    fontFamily: 'Arial',
    fontSize: responsiveFontSize(1.52),
    padding: 0,
  },
  inputText: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.52),
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.3)',
    flex: 1,
    fontSize: responsiveFontSize(1.52),
  },
  multilineField: {
    alignItems: 'flex-start',
    height: responsiveHeight(16.1),
    paddingVertical: responsiveHeight(1.72),
  },
  multilineInput: {
    minHeight: responsiveHeight(13),
    textAlignVertical: 'top',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.72),
    width: '100%',
  },
  primaryText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.65),
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  outlineButton: {
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 30,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.72),
  },
  outlineText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  halfPrimaryButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    flex: 1,
    justifyContent: 'center',
    marginLeft: responsiveWidth(3.86),
    paddingVertical: responsiveHeight(1.72),
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(8),
  },
  dropdown: {
    backgroundColor: AppColors.memorialCard,
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
  },
  dropdownItem: {
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomWidth: 1,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.6),
  },
  dropdownText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
  },
});

export default CreateMemorialStep1;
