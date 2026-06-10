import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const memorials = [
  {
    id: '1',
    name: 'Robert James Thompson',
    relation: 'Father',
    dates: 'Jan 15, 1945 - Mar 20, 2020',
    location: 'Forest Lawn Memorial Park\nGarden of Peace, Section A,\nPlot 142',
    isActive: true,
    image: AppAssets.images.profilePic,
  },
  {
    id: '2',
    name: 'Margaret Anne Thompson',
    relation: 'Mother',
    dates: 'May 8, 1950 - Nov 12, 2022',
    location: 'Oakwood Memorial Gardens\nSerenity Gardens, Section C,\nPlot 215',
    isActive: false,
    image: AppAssets.images.vendor4,
  },
  {
    id: '3',
    name: 'Michael David Thompson',
    relation: 'Brother',
    dates: 'Aug 22, 1975 - Jun 5, 2023',
    location: 'Forest Lawn Memorial Park\nGarden of Peace, Section A,\nPlot 143',
    isActive: false,
    image: AppAssets.images.vendor5,
  },
];

const HEADER_HEIGHT = responsiveHeight(15.2);

const UserMemorialsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const headerTop = insets.top;
  const contentTop = headerTop + HEADER_HEIGHT + responsiveHeight(4.3);

  return (
    <ScreenWrapper safeAreaEdges={[]} style={styles.screen}>
      <View style={styles.root}>
        <View style={[styles.statusBand, { height: headerTop }]} />
      <ScrollView
        bounces
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: contentTop },
        ]}>
        <AddMemorialCard
          onPress={() => navigation.navigate('UserAddMemorial')}
        />
        <LineBreak height={2.55} />
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>
            Your Memorials ({memorials.length})
          </AppText>
        </View>
        <LineBreak height={1.72} />
        {memorials.map(memorial => (
          <MemorialCard
            key={memorial.id}
            memorial={memorial}
            onEdit={() => navigation.navigate('CreateMemorialStep1', {
              editMode: true,
              memorial,
            })}
            onPrimary={() => navigation.navigate('MemorialProfile', {
              memorial,
            })}
          />
        ))}
        <InfoFooter />
      </ScrollView>

      <AppImageHeader
        height={HEADER_HEIGHT}
        image={AppAssets.images.memorialImage}
        onBack={() => navigation.goBack()}
        title="Your Memorials"
        subtitle="Manage memorials for your loved ones"
        style={[styles.fixedHeader, { top: headerTop }]}
      />
      </View>
    </ScreenWrapper>
  );
};

const AddMemorialCard = ({ onPress }) => (
  <View style={styles.horizontalPadding}>
    <GlassCard onPress={onPress} contentStyle={styles.addCard}>
      <View style={styles.addCircle}>
        <AppIcon name="add" color={AppColors.memorialCard} size={30} />
      </View>
      <View style={styles.addCopy}>
        <AppText style={styles.addTitle}>Add New Memorial</AppText>
        <LineBreak height={0.42} />
        <AppText style={styles.addSubtitle}>
          Create a memorial profile{'\n'}for another loved one
        </AppText>
      </View>
      <AppIcon
        name="chevron-right"
        color={AppColors.white}
        size={responsiveWidth(5.3)}
      />
    </GlassCard>
  </View>
);

const MemorialCard = ({ memorial, onEdit, onPrimary }) => (
  <View style={styles.memorialSpacing}>
    <GlassCard contentStyle={styles.memorialCard}>
      <View style={styles.cardTop}>
        <View style={styles.avatarWrap}>
          <Image source={memorial.image} resizeMode="cover" style={styles.avatar} />
          {memorial.isActive ? (
            <View style={styles.activeCheck}>
              <AppIcon name="check" color={AppColors.memorialCard} size={10} />
            </View>
          ) : null}
        </View>

        <View style={styles.memorialCopy}>
          <View style={styles.nameRow}>
            <AppText numberOfLines={2} style={styles.memorialName}>
              {memorial.name}
            </AppText>
            {memorial.isActive ? (
              <View style={styles.activeBadge}>
                <AppText style={styles.activeText}>Active</AppText>
              </View>
            ) : null}
          </View>
          <LineBreak height={0.85} />
          <View style={styles.relationBadge}>
            <AppText style={styles.relationText}>{memorial.relation}</AppText>
          </View>
        </View>
      </View>

      <LineBreak height={1.72} />
      <View style={styles.contentRow}>
        <View style={styles.contentLeftSpacer} />
        <View style={styles.contentRight}>
          <DetailRow icon="calendar-today" text={memorial.dates} />
          <LineBreak height={0.85} />
          <DetailRow icon="location-on" multiline text={memorial.location} />
        </View>
      </View>
      <LineBreak height={2.15} />

      <View style={styles.contentRow}>
        <View style={styles.contentLeftSpacer} />
        <View style={[styles.contentRight, styles.buttonRow]}>
          <TouchableOpacity activeOpacity={0.82} onPress={onPrimary} style={styles.primaryBtn}>
            <AppText style={styles.primaryBtnText}>
              {memorial.isActive ? 'View Profile' : 'Select'}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.82} onPress={onEdit} style={styles.editBtn}>
            <AppText style={styles.editBtnText}>Edit</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </GlassCard>
  </View>
);

const DetailRow = ({ icon, multiline, text }) => (
  <View style={[styles.detailRow, multiline && styles.detailRowTop]}>
    <AppIcon
      name={icon}
      color={AppColors.homeTextMuted}
      size={responsiveWidth(3.38)}
    />
    <AppText style={[styles.detailText, multiline && styles.detailMultiline]}>
      {text}
    </AppText>
  </View>
);

const InfoFooter = () => (
  <View style={styles.horizontalPadding}>
    <View style={styles.infoFooter}>
      <AppText style={styles.infoTitle}>Managing Multiple Memorials</AppText>
      <LineBreak height={1.72} />
      <Bullet text="Switch between memorials easily" />
      <Bullet text="Each memorial has its own service history" />
      <Bullet text="Share access with family members" />
      <Bullet text="Book services for any memorial" />
    </View>
  </View>
);

const Bullet = ({ text }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletDot} />
    <AppText style={styles.bulletText}>{text}</AppText>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.bgDark,
  },
  root: {
    flex: 1,
  },
  fixedHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  statusBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.homeBody,
    zIndex: 2,
  },
  scrollContent: {
    paddingBottom: responsiveHeight(4.3),
  },
  horizontalPadding: {
    paddingHorizontal: responsiveWidth(5.8),
  },
  addCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    height: responsiveHeight(10.75),
    padding: responsiveWidth(4.13),
  },
  addCircle: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(6.05),
    height: responsiveWidth(12.1),
    justifyContent: 'center',
    width: responsiveWidth(12.1),
  },
  addCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3.86),
  },
  addTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
  },
  addSubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
    lineHeight: responsiveHeight(1.72),
  },
  sectionHeader: {
    paddingHorizontal: responsiveWidth(5.8),
  },
  sectionTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  memorialSpacing: {
    paddingHorizontal: responsiveWidth(5.8),
    marginBottom: responsiveHeight(1.72),
  },
  memorialCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    padding: responsiveWidth(3.86),
  },
  cardTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  avatarWrap: {
    borderColor: AppColors.white,
    borderRadius: responsiveWidth(6.05),
    borderWidth: 1,
    height: responsiveWidth(12.1),
    width: responsiveWidth(12.1),
  },
  avatar: {
    borderRadius: responsiveWidth(6.05),
    height: '100%',
    width: '100%',
  },
  activeCheck: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(2),
    bottom: 0,
    height: responsiveWidth(4),
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: responsiveWidth(4),
  },
  memorialCopy: {
    flex: 1,
    marginLeft: responsiveWidth(2.9),
  },
  nameRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  memorialName: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.52),
    lineHeight: responsiveHeight(2.15),
  },
  activeBadge: {
    backgroundColor: AppColors.memorialMutedButton,
    borderColor: AppColors.memorialMutedButton,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: responsiveWidth(1.93),
    paddingHorizontal: responsiveWidth(1.93),
    paddingVertical: responsiveHeight(0.42),
  },
  activeText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.08),
  },
  relationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    paddingHorizontal: responsiveWidth(1.93),
    paddingVertical: responsiveHeight(0.22),
  },
  relationText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  detailRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  contentLeftSpacer: {
    flexShrink: 0,
    width: responsiveWidth(15),
  },
  contentRight: {
    flex: 1,
    minWidth: 0,
  },
  detailRowTop: {
    alignItems: 'flex-start',
  },
  detailText: {
    color: AppColors.homeTextMuted,
    flex: 1,
    flexShrink: 1,
    fontSize: responsiveFontSize(1.28),
    marginLeft: responsiveWidth(1.93),
    minWidth: 0,
  },
  detailMultiline: {
    lineHeight: responsiveHeight(1.95),
  },
  buttonRow: {
    flexDirection: 'row',
  },
  primaryBtn: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    flex: 2,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.18),
  },
  primaryBtnText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.18),
    fontWeight: '700',
  },
  editBtn: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialMutedButton,
    borderColor: AppColors.memorialMutedButton,
    borderRadius: 30,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    marginLeft: responsiveWidth(2.9),
    paddingVertical: responsiveHeight(1.18),
  },
  editBtnText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.18),
  },
  infoFooter: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 0.5,
    padding: responsiveWidth(4.83),
  },
  infoTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.75),
  },
  bulletRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: responsiveHeight(0.85),
  },
  bulletDot: {
    backgroundColor: AppColors.homeTextMuted,
    borderRadius: 2,
    height: 4,
    width: 4,
  },
  bulletText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.35),
    lineHeight: responsiveHeight(2.05),
    marginLeft: responsiveWidth(2.9),
  },
});

export default UserMemorialsScreen;
