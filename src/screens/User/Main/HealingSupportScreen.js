import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
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
        {selectedTab !== 'Learn' ? (
          <>
            <QuoteCard />
            <LineBreak height={2.4} />
          </>
        ) : null}

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

        {selectedTab === 'Learn' ? (
          <>
            <LineBreak height={2.4} />
            <QuoteCard small />
          </>
        ) : null}

        <LineBreak height={2.4} />
        <NeedToTalkCard />
      </View>
    </ScreenWrapper>
  );
};

const QuoteCard = ({ small }) => (
  <View style={styles.quoteCard}>
    <View style={styles.quoteTop}>
      <AppIcon name="format-quote" color={AppColors.white} size={30} />
      <View style={styles.quoteBadge}>
        <AppText style={styles.quoteBadgeText}>Quote of the Day</AppText>
      </View>
    </View>
    <LineBreak height={1.6} />
    <AppText style={styles.quoteText}>
      "What we have once enjoyed deeply we can never lose. All that we love deeply becomes a part of us."
    </AppText>
    <LineBreak height={1.2} />
    <AppText style={styles.quoteAuthor}>- Helen Keller</AppText>
    {!small ? (
      <>
        <LineBreak height={2.4} />
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorActive} />
          <View style={styles.indicatorDot} />
          <View style={styles.indicatorDot} />
          <View style={styles.indicatorDot} />
        </View>
      </>
    ) : null}
  </View>
);

const ReflectContent = () => (
  <View>
    <SectionIntro title="Guided Reflections" subtitle="Gentle practices for peaceful remembrance" />
    {reflectCards.map(item => (
      <View key={item[0]} style={styles.musicCard}>
        <View style={styles.musicTop}>
          <View style={styles.iconCircle}>
            <AppIcon name="music-note" color={AppColors.themeColor} size={24} />
          </View>
          <View style={styles.cardCopy}>
            <View style={styles.musicTitleRow}>
              <AppText style={styles.cardTitle}>{item[0]}</AppText>
              <View style={styles.durationBadge}>
                <AppText style={styles.duration}>{item[2]}</AppText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.musicBody}>
          <AppText style={styles.cardSubtitle}>{item[1]}</AppText>
          <LineBreak height={1.2} />
          <TouchableOpacity activeOpacity={0.82} style={styles.smallAction}>
            <AppText style={styles.smallActionText}>Start Practice</AppText>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
);

const LearnContent = () => (
  <View>
    <SectionIntro title="Healing Resources" subtitle="Articles and guides for your journey" />
    {learnCards.map(item => (
      <View key={item[0]} style={styles.resourceCard}>
        <View style={styles.iconCircle}>
          <AppIcon name={item[3]} color={AppColors.themeColor} size={24} />
        </View>
        <View style={styles.cardCopy}>
          <View style={styles.tagBadge}>
            <AppText style={styles.tagText}>{item[0]}</AppText>
          </View>
          <LineBreak height={0.8} />
          <AppText style={styles.cardTitle}>{item[1]}</AppText>
          <AppText style={styles.cardSubtitle}>{item[2]}</AppText>
          <LineBreak height={1.2} />
          <TouchableOpacity activeOpacity={0.82} style={styles.smallAction}>
            <AppText style={styles.smallActionText}>Read More</AppText>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
);

const AffirmContent = () => (
  <View>
    <SectionIntro title="Daily Affirmations" subtitle="Gentle reminders for your heart" />
    {affirmations.map(text => (
      <View key={text} style={styles.affirmRow}>
        <View style={styles.smallIconCircle}>
          <AppIcon name="favorite-border" color={AppColors.themeColor} size={16} />
        </View>
        <AppText style={styles.affirmText}>{text}</AppText>
      </View>
    ))}

    <LineBreak height={1.2} />
    <View style={styles.tipCard}>
      <AppIcon name="lightbulb-outline" color={AppColors.white} size={24} />
      <View style={styles.cardCopy}>
        <AppText style={styles.tipTitle}>Practice Tip</AppText>
        <AppText style={styles.cardSubtitle}>
          Choose one affirmation each morning. Repeat it gently throughout the day whenever you need comfort or strength.
        </AppText>
      </View>
    </View>
  </View>
);

const SectionIntro = ({ subtitle, title }) => (
  <>
    <AppText style={styles.sectionTitle}>{title}</AppText>
    <LineBreak height={0.4} />
    <AppText style={styles.sectionSubtitle}>{subtitle}</AppText>
    <LineBreak height={1.6} />
  </>
);

const NeedToTalkCard = () => (
  <View style={styles.needCard}>
    <AppText style={styles.needTitle}>Need to Talk?</AppText>
    <LineBreak height={0.8} />
    <AppText style={styles.needSubtitle}>Connect with grief counselors and support{`\n`}groups</AppText>
    <LineBreak height={1.6} />
    <AppButton style={styles.supportButton} textStyle={styles.supportButtonText}>
      Find Support
    </AppButton>
  </View>
);

const styles = StyleSheet.create({
  affirmRow: {
    alignItems: 'center',
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.2),
    padding: responsiveWidth(4),
  },
  affirmText: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.28),
    fontStyle: 'italic',
    lineHeight: responsiveHeight(2),
    marginLeft: responsiveWidth(3.8),
  },
  body: { padding: responsiveWidth(5.8) },
  cardCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  cardSubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
    lineHeight: responsiveHeight(1.95),
    marginTop: responsiveHeight(0.4),
  },
  cardTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '500',
    lineHeight: responsiveHeight(2.35),
  },
  content: { paddingBottom: responsiveHeight(5) },
  duration: { color: AppColors.white, fontSize: responsiveFontSize(0.95) },
  durationBadge: {
    backgroundColor: '#506E95',
    borderRadius: 4,
    paddingHorizontal: responsiveWidth(1.5),
    paddingVertical: responsiveHeight(0.25),
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(6),
    height: responsiveWidth(12),
    justifyContent: 'center',
    width: responsiveWidth(12),
  },
  indicatorActive: {
    backgroundColor: AppColors.white,
    borderRadius: 2,
    height: 4,
    width: responsiveWidth(5.8),
  },
  indicatorDot: {
    backgroundColor: 'rgba(255,255,255,0.24)',
    borderRadius: 2,
    height: 4,
    marginLeft: responsiveWidth(1),
    width: 4,
  },
  indicatorRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  musicBody: { paddingLeft: responsiveWidth(16) },
  musicCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 0.5,
    marginBottom: responsiveHeight(1.6),
    padding: responsiveWidth(4),
  },
  musicTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  musicTop: { alignItems: 'center', flexDirection: 'row' },
  needCard: {
    alignItems: 'center',
    backgroundColor: AppColors.onboardingButton,
    borderRadius: 24,
    padding: responsiveWidth(5.8),
  },
  needSubtitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.18),
    lineHeight: responsiveHeight(1.85),
    textAlign: 'center',
  },
  needTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
  quoteAuthor: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.12) },
  quoteBadge: {
    backgroundColor: '#506E95',
    borderRadius: 6,
    marginLeft: responsiveWidth(3),
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.4),
  },
  quoteBadgeText: { color: AppColors.white, fontSize: responsiveFontSize(0.95) },
  quoteCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 24,
    borderWidth: 0.5,
    padding: responsiveWidth(5.8),
  },
  quoteText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    fontStyle: 'italic',
    lineHeight: responsiveHeight(2.3),
  },
  quoteTop: { alignItems: 'center', flexDirection: 'row' },
  resourceCard: {
    alignItems: 'flex-start',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 0.5,
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.6),
    padding: responsiveWidth(4.8),
  },
  sectionSubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  sectionTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '500',
  },
  smallAction: {
    alignSelf: 'flex-start',
    backgroundColor: '#506E95',
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(3.8),
    paddingVertical: responsiveHeight(0.8),
  },
  smallActionText: { color: AppColors.white, fontSize: responsiveFontSize(1.12) },
  smallIconCircle: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(4),
    height: responsiveWidth(8),
    justifyContent: 'center',
    width: responsiveWidth(8),
  },
  supportButton: {
    backgroundColor: AppColors.memorialCard,
    borderRadius: 30,
    width: '100%',
  },
  supportButtonText: {
    color: AppColors.white,
    fontWeight: '700',
  },
  tabButton: {
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
    flex: 1,
    justifyContent: 'center',
  },
  tabButtonActive: { backgroundColor: AppColors.onboardingButton },
  tabText: { color: AppColors.white, fontSize: responsiveFontSize(1.28), fontWeight: '700' },
  tabTextActive: { color: AppColors.white },
  tabWrap: {
    backgroundColor: AppColors.memorialCard,
    borderRadius: responsiveHeight(2.4),
    flexDirection: 'row',
    height: responsiveHeight(4.75),
    padding: 4,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#506E95',
    borderColor: AppColors.homeBorder,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: responsiveWidth(2),
    paddingVertical: responsiveHeight(0.2),
  },
  tagText: { color: AppColors.white, fontSize: responsiveFontSize(0.95) },
  tipCard: {
    alignItems: 'flex-start',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 0.5,
    flexDirection: 'row',
    padding: responsiveWidth(4),
  },
  tipTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
});

export default HealingSupportScreen;
