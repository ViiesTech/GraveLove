import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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

const visits = [
  {
    date: 'Oct 30, 2025',
    location: 'Memorial Gardens',
    note: 'Fresh flowers placed and surrounding area cleaned with care.',
    time: '10:00 AM',
    type: 'service',
  },
  {
    date: 'Oct 12, 2025',
    location: 'Memorial Gardens',
    note: 'Visited quietly and spent time remembering family moments.',
    time: '04:20 PM',
    type: 'visit',
  },
];

const VisitLogScreen = ({ navigation }) => {
  const [tab, setTab] = useState(0);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  return (
    <ScreenWrapper
      style={styles.screen}
      contentContainerStyle={styles.root}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Visit Log"
        subtitle="Track your visits and cherished moments"
      />
      <View style={styles.headerContent}>
        <View style={styles.statsRow}>
          <StatCard label="Total Visits" value={`${visits.length} visits`} />
          <StatCard label="Last Visit" value={visits[0].date} />
        </View>
        <LineBreak height={2.58} />
        <View style={styles.tabs}>
          <TabItem active={tab === 0} icon="calendar-today" label="Timeline" onPress={() => setTab(0)} />
          <TabItem active={tab === 1} icon="location-on" label="Map View" onPress={() => setTab(1)} />
        </View>
      </View>
      <ScreenWrapper
        isScroll
        safeAreaEdges={[]}
        useBackgroundImage={false}
        style={styles.contentScroll}
        contentContainerStyle={styles.content}>
        {tab === 0 ? <Timeline /> : <MapView />}
      </ScreenWrapper>
      {tab === 0 ? (
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => setIsLogModalOpen(true)}
          style={styles.fab}>
          <AppIcon name="add" color={AppColors.white} size={30} />
        </TouchableOpacity>
      ) : null}
      <LogVisitModal
        visible={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />
    </ScreenWrapper>
  );
};

const StatCard = ({ label, value }) => (
  <GlassCard contentStyle={styles.statCard}>
    <AppText style={styles.statLabel}>{label}</AppText>
    <LineBreak height={0.85} />
    <AppText style={styles.statValue}>{value}</AppText>
  </GlassCard>
);

const TabItem = ({ active, icon, label, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.82}
    onPress={onPress}
    style={[styles.tabItem, active && styles.tabActive]}>
    <AppIcon name={icon} color={active ? AppColors.white : AppColors.memorialCard} size={16} />
    <AppText style={[styles.tabText, active && styles.tabTextActive]}>{label}</AppText>
  </TouchableOpacity>
);

const Timeline = () => (
  <View>
    {visits.map((visit, index) => {
      const isLast = index === visits.length - 1;
      const isService = visit.type === 'service';
      return (
        <View key={`${visit.date}-${visit.time}`} style={styles.timelineRow}>
          <View style={styles.timelineRail}>
            <View style={styles.timelineIcon}>
              <AppIcon
                name={isService ? 'cleaning-services' : 'favorite-border'}
                color={AppColors.memorialCard}
                size={20}
              />
            </View>
            {!isLast ? <View style={styles.timelineLine} /> : null}
          </View>
          <GlassCard contentStyle={styles.visitCard}>
            <View style={styles.visitTop}>
              <AppText style={styles.visitDate}>{visit.date}</AppText>
              {isService ? (
                <View style={styles.servicePill}>
                  <AppText style={styles.servicePillText}>Service</AppText>
                </View>
              ) : null}
            </View>
            <AppText style={styles.visitTime}>{visit.time}</AppText>
            <LineBreak height={0.85} />
            <View style={styles.visitLocation}>
              <AppIcon name="location-on" color={AppColors.homeTextMuted} size={14} />
              <AppText style={styles.visitLocationText}>{visit.location}</AppText>
            </View>
            <LineBreak height={1.29} />
            <AppText style={styles.visitNote}>{visit.note}</AppText>
          </GlassCard>
        </View>
      );
    })}
  </View>
);

const MapView = () => (
  <View>
    <View style={styles.mapCard}>
      <View style={styles.mapCircleLarge} />
      <View style={styles.mapCircleSmall} />
      <View style={styles.mapMarker}>
        <AppIcon name="location-on" color={AppColors.memorialCard} size={40} />
        <View style={styles.mapLabel}>
          <AppText style={styles.mapLabelText}>Memorial Gardens</AppText>
        </View>
      </View>
    </View>
    <LineBreak height={2.58} />
    <GlassCard contentStyle={styles.locationCard}>
      <AppText style={styles.locationTitle}>Location Details</AppText>
      <LineBreak height={2.58} />
      <LocationRow label="Name" value="Memorial Gardens" />
      <LocationRow label="Section" value="Section B" />
      <LocationRow label="Plot" value="42B" />
      <LineBreak height={2.58} />
      <AppButton style={styles.directionsButton} textStyle={styles.directionsText}>
        Get Directions
      </AppButton>
    </GlassCard>
  </View>
);

const LocationRow = ({ label, value }) => (
  <View style={styles.locationRow}>
    <AppText style={styles.locationLabel}>{label}</AppText>
    <AppText style={styles.locationValue}>{value}</AppText>
  </View>
);

const LogVisitModal = ({ onClose, visible }) => (
  <Modal
    transparent
    animationType="fade"
    visible={visible}
    onRequestClose={onClose}>
    <View style={styles.modalBackdrop}>
      <View style={styles.visitModal}>
        <View style={styles.modalTop}>
          <View style={styles.modalSpacer} />
          <AppText style={styles.modalTitle}>Log a Visit</AppText>
          <TouchableOpacity activeOpacity={0.75} onPress={onClose}>
            <AppIcon name="close" color={AppColors.homeTextMuted} size={20} />
          </TouchableOpacity>
        </View>
        <LineBreak height={2.4} />
        <View style={styles.detectedBox}>
          <AppIcon name="location-on" color={AppColors.homeTextMuted} size={24} />
          <AppText style={styles.detectedText}>Location detected automatically</AppText>
        </View>
        <LineBreak height={1.6} />
        <TextInput
          multiline
          placeholder="Add a note about your visit..."
          placeholderTextColor={AppColors.homeTextMuted}
          style={styles.visitNoteInput}
        />
        <LineBreak height={2.4} />
        <View style={styles.modalButtons}>
          <TouchableOpacity activeOpacity={0.82} onPress={onClose} style={styles.logButton}>
            <AppText style={styles.logButtonText}>Log Visit</AppText>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.82} onPress={onClose} style={styles.cancelButton}>
            <AppText style={styles.cancelButtonText}>Cancel</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.homeBody },
  root: { flex: 1 },
  headerContent: { paddingHorizontal: responsiveWidth(5.8), paddingTop: responsiveHeight(2.15) },
  statsRow: { flexDirection: 'row', gap: responsiveWidth(3.86) },
  statCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, flex: 1, padding: responsiveWidth(3.86) },
  statLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18) },
  statValue: { color: AppColors.white, fontSize: responsiveFontSize(1.75), fontWeight: '700' },
  tabs: { backgroundColor: AppColors.homeActionCard, borderRadius: 24, flexDirection: 'row', height: responsiveHeight(5.15), padding: 4 },
  tabItem: { alignItems: 'center', borderRadius: 20, flex: 1, flexDirection: 'row', justifyContent: 'center' },
  tabActive: { backgroundColor: AppColors.memorialCard },
  tabText: { color: AppColors.memorialCard, fontSize: responsiveFontSize(1.35), fontWeight: '700', marginLeft: responsiveWidth(1.93) },
  tabTextActive: { color: AppColors.white },
  contentScroll: { backgroundColor: 'transparent', flex: 1 },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(10) },
  timelineRow: { flexDirection: 'row' },
  timelineRail: { alignItems: 'center', width: responsiveWidth(10) },
  timelineIcon: { alignItems: 'center', backgroundColor: AppColors.white, borderRadius: responsiveWidth(5), height: responsiveWidth(10), justifyContent: 'center', width: responsiveWidth(10) },
  timelineLine: { backgroundColor: AppColors.homeBorder, flex: 1, width: 2 },
  visitCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, flex: 1, marginBottom: responsiveHeight(2.58), padding: responsiveWidth(3.86) },
  visitTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  visitDate: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  visitTime: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18), marginTop: responsiveHeight(0.4) },
  servicePill: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 4, paddingHorizontal: responsiveWidth(1.93), paddingVertical: responsiveHeight(0.25) },
  servicePillText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1) },
  visitLocation: { alignItems: 'center', flexDirection: 'row' },
  visitLocationText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18), marginLeft: responsiveWidth(1) },
  visitNote: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), lineHeight: responsiveHeight(2.25) },
  fab: { alignItems: 'center', backgroundColor: AppColors.homeActionCard, borderRadius: responsiveWidth(7), bottom: responsiveHeight(3), height: responsiveWidth(14), justifyContent: 'center', position: 'absolute', right: responsiveWidth(5.8), width: responsiveWidth(14) },
  mapCard: { alignItems: 'center', borderColor: AppColors.homeBorder, borderRadius: 24, borderWidth: 1, height: responsiveHeight(34), justifyContent: 'center', overflow: 'hidden' },
  mapCircleLarge: { borderColor: AppColors.homeBorder, borderRadius: responsiveWidth(30), borderWidth: 1, height: responsiveWidth(60), position: 'absolute', width: responsiveWidth(60) },
  mapCircleSmall: { borderColor: AppColors.homeBorder, borderRadius: responsiveWidth(18), borderWidth: 1, height: responsiveWidth(36), position: 'absolute', width: responsiveWidth(36) },
  mapMarker: { alignItems: 'center' },
  mapLabel: { backgroundColor: AppColors.white, borderRadius: 20, paddingHorizontal: responsiveWidth(2.9), paddingVertical: responsiveHeight(0.65) },
  mapLabelText: { color: AppColors.memorialCard, fontSize: responsiveFontSize(1.18), fontWeight: '700' },
  locationCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, padding: responsiveWidth(5.8) },
  locationTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  locationRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(1.29) },
  locationLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.3) },
  locationValue: { color: AppColors.white, fontSize: responsiveFontSize(1.3), fontWeight: '500' },
  directionsButton: { backgroundColor: AppColors.homeActionCard, borderRadius: 30 },
  directionsText: { color: AppColors.white },
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(5.8),
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  visitModal: {
    width: '100%',
    padding: responsiveWidth(5.8),
    borderRadius: 24,
    backgroundColor: AppColors.memorialCard,
  },
  modalTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalSpacer: {
    width: 20,
  },
  modalTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
  },
  detectedBox: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(4),
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  detectedText: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.28),
    marginLeft: responsiveWidth(3),
  },
  visitNoteInput: {
    height: responsiveHeight(12),
    padding: responsiveWidth(4),
    borderRadius: 16,
    color: AppColors.white,
    fontSize: responsiveFontSize(1.3),
    textAlignVertical: 'top',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: responsiveWidth(4),
  },
  logButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: responsiveHeight(5),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: 30,
  },
  logButtonText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.3),
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: responsiveHeight(5),
    borderRadius: 30,
    backgroundColor: AppColors.onboardingButton,
  },
  cancelButtonText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
  },
});

export default VisitLogScreen;
