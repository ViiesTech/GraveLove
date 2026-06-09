import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const tabs = ['Reflect', 'Learn', 'Affirm'];

const reflectCards = [
  ['Morning\nRemembrance', 'Start your day with a gentle\nreflection on cherished memories', '5 min'],
  ['Gratitude Practice', 'Honor your loved one through\ngrateful remembrance', '8 min'],
  ['Evening Peace', 'Find comfort and closure as the day\nends', '10 min'],
];

const learnCards = [
  ['Grief Support', 'Understanding Your Journey', 'A compassionate guide through the\nstages of grief and healing', 'favorite-border'],
  ['Memory Keeping', 'Preserving Precious Moments', 'Creative ways to honor and\nremember your loved ones', 'menu-book'],
  ['Community', 'Finding Support', 'Connect with others who understand\nyour experience', 'favorite-border'],
];

const affirmations = [
  'My grief is a reflection of my love',
  'I honor their memory by living fully',
  "Healing is not forgetting - it's\nlearning to carry love forward",
  'I am not alone in my remembrance',
];

const HealingSupportScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Reflect');

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Healing Support"
        subtitle="Gentle resources for your journey of remembrance"
        height={responsiveHeight(20.6)}
      />
      <View style={styles.body}>
        {selectedTab !== 'Learn' ? <QuoteCard /> : null}
        <View style={styles.tabWrap}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.82}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tabButton, selectedTab === tab && styles.tabButtonActive]}>
              <AppText style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>{tab}</AppText>
            </TouchableOpacity>
          ))}
        </View>
        <LineBreak height={2.4} />
        {selectedTab === 'Reflect' ? <ReflectContent /> : null}
        {selectedTab === 'Learn' ? <LearnContent /> : null}
        {selectedTab === 'Affirm' ? <AffirmContent /> : null}
        {selectedTab === 'Learn' ? <QuoteCard small /> : null}
        <NeedToTalkCard navigation={navigation} />
      </View>
    </ScreenWrapper>
  );
};

const QuoteCard = ({ small }) => (
  <GlassCard contentStyle={[styles.quoteCard, small && styles.quoteCardSmall]}>
    <AppIcon name="format-quote" color={AppColors.white} size={24} />
    <AppText style={styles.quoteText}>
      Grief is love with nowhere to go, so we give it places to rest in memory.
    </AppText>
  </GlassCard>
);

const ReflectContent = () => (
  <View>
    <SectionIntro title="Guided Reflections" subtitle="Gentle practices for peaceful remembrance" />
    {reflectCards.map(item => (
      <GlassCard key={item[0]} contentStyle={styles.musicCard}>
        <View style={styles.iconCircle}><AppIcon name="music-note" color={AppColors.themeColor} size={22} /></View>
        <View style={styles.cardCopy}>
          <AppText style={styles.cardTitle}>{item[0]}</AppText>
          <AppText style={styles.cardSubtitle}>{item[1]}</AppText>
        </View>
        <AppText style={styles.duration}>{item[2]}</AppText>
      </GlassCard>
    ))}
  </View>
);

const LearnContent = () => (
  <View>
    <SectionIntro title="Healing Resources" subtitle="Articles and guides for your journey" />
    {learnCards.map(item => (
      <GlassCard key={item[0]} contentStyle={styles.resourceCard}>
        <View style={styles.iconCircle}><AppIcon name={item[3]} color={AppColors.themeColor} size={22} /></View>
        <View style={styles.cardCopy}>
          <AppText style={styles.resourceKicker}>{item[0]}</AppText>
          <AppText style={styles.cardTitle}>{item[1]}</AppText>
          <AppText style={styles.cardSubtitle}>{item[2]}</AppText>
        </View>
      </GlassCard>
    ))}
  </View>
);

const AffirmContent = () => (
  <View>
    <SectionIntro title="Daily Affirmations" subtitle="Gentle reminders for your heart" />
    {affirmations.map(text => (
      <View key={text} style={styles.affirmRow}>
        <View style={styles.smallIconCircle}><AppIcon name="favorite-border" color={AppColors.themeColor} size={18} /></View>
        <AppText style={styles.affirmText}>{text}</AppText>
      </View>
    ))}
    <GlassCard contentStyle={styles.tipCard}>
      <AppIcon name="lightbulb-outline" color={AppColors.white} size={24} />
      <View style={styles.cardCopy}>
        <AppText style={styles.cardTitle}>Practice Tip</AppText>
        <AppText style={styles.cardSubtitle}>
          Read one affirmation slowly, breathe deeply, and let the words meet you where you are.
        </AppText>
      </View>
    </GlassCard>
  </View>
);

const SectionIntro = ({ subtitle, title }) => (
  <>
    <AppText style={styles.sectionTitle}>{title}</AppText>
    <AppText style={styles.sectionSubtitle}>{subtitle}</AppText>
    <LineBreak height={1.6} />
  </>
);

const NeedToTalkCard = ({ navigation }) => (
  <GlassCard contentStyle={styles.needCard}>
    <AppText style={styles.cardTitle}>Need to talk?</AppText>
    <AppText style={styles.cardSubtitle}>Our support team is here whenever you need a gentle hand.</AppText>
    <LineBreak height={1.6} />
    <AppButton style={styles.supportButton} onPress={() => navigation.navigate('HelpSupport')}>
      Contact Support
    </AppButton>
  </GlassCard>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(5) },
  body: { padding: responsiveWidth(5.8) },
  quoteCard: { marginBottom: responsiveHeight(2.4), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  quoteCardSmall: { marginTop: responsiveHeight(2.4) },
  quoteText: { color: AppColors.white, fontSize: responsiveFontSize(1.45), lineHeight: responsiveHeight(2.35), marginTop: responsiveHeight(0.8) },
  tabWrap: { flexDirection: 'row', height: responsiveHeight(4.75), padding: 4, borderRadius: responsiveHeight(2.4), backgroundColor: AppColors.white },
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: responsiveHeight(2) },
  tabButtonActive: { backgroundColor: AppColors.themeColor },
  tabText: { color: AppColors.themeColor, fontSize: responsiveFontSize(1.28), fontWeight: '700' },
  tabTextActive: { color: AppColors.white },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.65), fontWeight: '700' },
  sectionSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15), marginTop: responsiveHeight(0.4) },
  musicCard: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1.3), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  resourceCard: { flexDirection: 'row', marginBottom: responsiveHeight(1.3), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  iconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11.2), height: responsiveWidth(11.2), borderRadius: responsiveWidth(5.6), backgroundColor: AppColors.white },
  smallIconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(8.6), height: responsiveWidth(8.6), borderRadius: responsiveWidth(4.3), backgroundColor: AppColors.white },
  cardCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  cardTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.5), fontWeight: '700', lineHeight: responsiveHeight(2.25) },
  cardSubtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.22), lineHeight: responsiveHeight(2.05), marginTop: responsiveHeight(0.4) },
  resourceKicker: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.1), marginBottom: responsiveHeight(0.4) },
  duration: { color: AppColors.white, fontSize: responsiveFontSize(1.18), fontWeight: '700' },
  affirmRow: { alignItems: 'center', flexDirection: 'row', marginBottom: responsiveHeight(1.4) },
  affirmText: { flex: 1, color: AppColors.white, fontSize: responsiveFontSize(1.38), lineHeight: responsiveHeight(2.3), marginLeft: responsiveWidth(3.5) },
  tipCard: { flexDirection: 'row', marginTop: responsiveHeight(1.2), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  needCard: { marginTop: responsiveHeight(2.4), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  supportButton: { backgroundColor: AppColors.onboardingButton, borderRadius: responsiveHeight(3) },
});

export default HealingSupportScreen;
