import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import CreateMemorialHeader from '../../../components/CreateMemorialHeader';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { showToast } from '../../../utils/Toast';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const relationships = ['Parent', 'Sibling', 'Friend', 'Pet'];

const CreateMemorialStep1 = ({ navigation, route }) => {
  const initialMemorial = route?.params?.memorial || {};
  const [fullName, setFullName] = useState(initialMemorial.name || initialMemorial.full_name || '');
  const [relationship, setRelationship] = useState(initialMemorial.relationship || initialMemorial.relation || '');
  const [birthDate, setBirthDate] = useState(initialMemorial.birth_date || '');
  const [deathDate, setDeathDate] = useState(initialMemorial.death_date || '');
  const [isRelationshipOpen, setIsRelationshipOpen] = useState(false);

  const continueNext = () => {
    if (!fullName.trim() || !relationship.trim()) {
      showToast('Missing details', 'Full name and relationship are required.');
      return;
    }

    navigation.navigate('CreateMemorialStep2', {
      memorialId: initialMemorial.id,
      formData: {
        name: fullName.trim(),
        relationship: relationship.trim(),
        birth_date: birthDate.trim(),
        death_date: deathDate.trim(),
      },
    });
  };

  return (
    <ScreenWrapper safeAreaEdges={[]} style={styles.screen}>
      <CreateMemorialHeader onBack={() => navigation.goBack()} step={1} />
      <ScrollView
        bounces
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <FieldLabel label="Full Name *" />
        <TextField
          onChangeText={setFullName}
          placeholder="Enter full name"
          value={fullName}
        />

        <LineBreak height={2.15} />
        <FieldLabel label="Relationship *" />
        <View style={styles.dropdownWrap}>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => setIsRelationshipOpen(prev => !prev)}
            style={[
              styles.field,
              isRelationshipOpen && styles.relationshipFieldOpen,
            ]}>
            <AppText style={[styles.inputText, !relationship && styles.placeholder]}>
              {relationship || 'Select relationship'}
            </AppText>
            <AppIcon
              iconSet="ion"
              name={isRelationshipOpen ? 'chevron-up' : 'chevron-down'}
              color="rgba(255, 255, 255, 0.3)"
              size={responsiveWidth(4.35)}
            />
          </TouchableOpacity>
          {isRelationshipOpen ? (
            <View style={styles.inlineDropdown}>
              {relationships.map((item, index) => (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.8}
                  onPress={() => {
                    setRelationship(item);
                    setIsRelationshipOpen(false);
                  }}
                  style={[
                    styles.dropdownItem,
                    index === relationships.length - 1 && styles.dropdownItemLast,
                  ]}>
                  <AppText style={styles.dropdownText}>{item}</AppText>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>

        <LineBreak height={2.15} />
        <FieldLabel label="Birth Date" />
        <TextField
          onChangeText={setBirthDate}
          placeholder="YYYY-MM-DD"
          value={birthDate}
        />

        <LineBreak height={2.15} />
        <FieldLabel label="Death Date" />
        <TextField
          onChangeText={setDeathDate}
          placeholder="YYYY-MM-DD"
          value={deathDate}
        />

        <LineBreak height={4.3} />
        <PrimaryButton label="Continue" onPress={continueNext} />
        <LineBreak height={4.3} />
      </ScrollView>
    </ScreenWrapper>
  );
};

export const FieldLabel = ({ label }) => (
  <AppText style={styles.label}>{label}</AppText>
);

export const TextField = ({ multiline, onChangeText, placeholder, style, value, ...props }) => (
  <View style={[styles.field, multiline && styles.multilineField, style]}>
    <TextInput
      {...props}
      multiline={multiline}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="rgba(255, 255, 255, 0.3)"
      style={[styles.input, multiline && styles.multilineInput]}
      value={value}
    />
  </View>
);

export const PrimaryButton = ({ isLoading = false, label, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.84}
    disabled={isLoading}
    onPress={onPress}
    style={[styles.primaryButton, isLoading && styles.disabledButton]}>
    <AppText style={styles.primaryText}>{isLoading ? 'Please wait...' : label}</AppText>
  </TouchableOpacity>
);

export const BackContinueButtons = ({ continueLabel = 'Continue', isLoading = false, onBack, onContinue }) => (
  <View style={styles.buttonRow}>
    <TouchableOpacity activeOpacity={0.82} disabled={isLoading} onPress={onBack} style={styles.outlineButton}>
      <AppText style={styles.outlineText}>Back</AppText>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={0.84}
      disabled={isLoading}
      onPress={onContinue}
      style={[styles.halfPrimaryButton, isLoading && styles.disabledButton]}>
      <AppText style={styles.primaryText}>{isLoading ? 'Please wait...' : continueLabel}</AppText>
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
  dropdownWrap: {
    zIndex: 5,
  },
  relationshipFieldOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
  disabledButton: {
    opacity: 0.68,
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
  inlineDropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  dropdownItem: {
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomWidth: 1,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.6),
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
  },
});

export default CreateMemorialStep1;
