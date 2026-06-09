import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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

const nextItems = [
  'View and edit the memorial profile anytime',
  'Book cleaning and maintenance services',
  'Share the memorial wall with family',
  'Add photos and tributes',
];

const CreateMemorialStep3 = ({ navigation }) => (
  <ScreenWrapper safeAreaEdges={[]} style={styles.screen}>
    <CreateMemorialHeader onBack={() => navigation.goBack()} step={3} />
    <ScrollView
      bounces
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <FieldLabel label="Biography (Optional)" />
      <AppText style={styles.storyLabel}>Share Their Story</AppText>
      <LineBreak height={0.85} />
      <TextField
        multiline
        placeholder="Share memories, achievements, and what made them special..."
      />
      <LineBreak height={0.85} />
      <AppText style={styles.helperText}>
        This will appear on their memorial wall for family and friends
      </AppText>

      <LineBreak height={2.58} />
      <View style={styles.nextCard}>
        <AppText style={styles.nextTitle}>What's Next?</AppText>
        <LineBreak height={1.29} />
        {nextItems.map(item => (
          <Bullet key={item} text={item} />
        ))}
      </View>

      <LineBreak height={4.3} />
      <BackContinueButtons
        continueLabel="Create Memorial"
        onBack={() => navigation.goBack()}
        onContinue={() => navigation.navigate('MemorialProfile')}
      />
      <LineBreak height={4.3} />
    </ScrollView>
  </ScreenWrapper>
);

const Bullet = ({ text }) => (
  <View style={styles.bulletRow}>
    <AppText style={styles.bulletDot}>•</AppText>
    <AppText style={styles.bulletText}>{text}</AppText>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.bgDark,
  },
  content: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(2.58),
  },
  storyLabel: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '500',
  },
  helperText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  nextCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: responsiveWidth(4.83),
  },
  nextTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.75),
    fontWeight: '700',
  },
  bulletRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: responsiveHeight(0.85),
  },
  bulletDot: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
    marginRight: responsiveWidth(1.93),
  },
  bulletText: {
    color: AppColors.homeTextMuted,
    flex: 1,
    fontSize: responsiveFontSize(1.3),
  },
});

export default CreateMemorialStep3;
