import React, { useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
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

const filters = [['Pending', 2], ['In Progress', 1], ['Completed', 1]];
const services = [
  ['Peaceful Gardens Cemetery', 'Plot 54, Section C', 'Grave Cleaning', '10:00 AM', 'Pending'],
  ['Memorial Park', 'Plot 47, Section B', 'Flower Placement', '2:00 PM', 'In Progress'],
];

const VendorDashboardScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('Pending');

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <ImageBackground source={AppAssets.images.vendorHeader} resizeMode="cover" style={styles.header}>
        <View style={styles.headerShade} />
        <View style={styles.headerActions}>
          <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('VendorProfile')}>
            <View style={styles.headerIcon}><AppIcon name="person" color={AppColors.themeColor} size={24} /></View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('VendorNotifications')}>
            <View style={styles.headerIcon}><AppIcon name="notifications" color={AppColors.themeColor} size={24} /></View>
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <AppText style={styles.title}>Dashboard</AppText>
          <AppText style={styles.subtitle}>Manage your assigned services</AppText>
        </View>
      </ImageBackground>

      <View style={styles.body}>
        <TouchableOpacity activeOpacity={0.84} onPress={() => navigation.navigate('VendorAvailableJobs')} style={styles.availableJobs}>
          <AppText style={styles.availableText}>View Available Jobs</AppText>
          <View style={styles.newBadge}><AppText style={styles.newBadgeText}>New</AppText></View>
        </TouchableOpacity>
        <LineBreak height={2.4} />
        <View style={styles.filterRow}>
          {filters.map(([label, count]) => (
            <TouchableOpacity
              key={label}
              activeOpacity={0.82}
              onPress={() => setSelectedFilter(label)}
              style={[styles.filterChip, selectedFilter === label && styles.filterChipActive]}>
              <AppText style={[styles.filterText, selectedFilter === label && styles.filterTextActive]}>{label} ({count})</AppText>
            </TouchableOpacity>
          ))}
        </View>
        <LineBreak height={2.4} />
        <AppText style={styles.sectionTitle}>Today's Assigned Services</AppText>
        <LineBreak height={1.6} />
        {services.map(service => (
          <VendorServiceCard
            key={service[0]}
            service={service}
            onPress={() => navigation.navigate('VendorTaskDetails', { title: service[0] })}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

export const VendorServiceCard = ({ onPress, service }) => (
  <GlassCard onPress={onPress} contentStyle={styles.serviceCard}>
    <View style={styles.serviceTop}>
      <View style={styles.serviceCopy}>
        <AppText style={styles.serviceTitle}>{service[0]}</AppText>
        <AppText style={styles.serviceSub}>{service[1]}</AppText>
      </View>
      <StatusPill status={service[4]} />
    </View>
    <LineBreak height={1.4} />
    <InfoLine label="Service:" value={service[2]} />
    <InfoLine label="Time:" value={service[3]} />
  </GlassCard>
);

const StatusPill = ({ status }) => (
  <View style={styles.statusPill}>
    <AppText style={styles.statusText}>{status}</AppText>
  </View>
);

const InfoLine = ({ label, value }) => (
  <View style={styles.infoLine}>
    <AppText style={styles.infoLabel}>{label}</AppText>
    <AppText style={styles.infoValue}>{value}</AppText>
  </View>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(9) },
  header: { height: responsiveHeight(22), justifyContent: 'space-between', padding: responsiveWidth(4), overflow: 'hidden' },
  headerShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(4, 47, 103, 0.48)' },
  headerActions: { flexDirection: 'row', justifyContent: 'space-between' },
  headerIcon: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(10), height: responsiveWidth(10), borderRadius: responsiveWidth(5), backgroundColor: AppColors.white },
  headerTitle: { paddingBottom: responsiveHeight(0.6) },
  title: { color: AppColors.white, fontSize: responsiveFontSize(2.55), fontWeight: '700' },
  subtitle: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), marginTop: responsiveHeight(0.4) },
  body: { padding: responsiveWidth(4) },
  availableJobs: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: responsiveWidth(5), paddingVertical: responsiveHeight(1.7), borderRadius: 12, backgroundColor: AppColors.onboardingButton },
  availableText: { color: AppColors.white, fontSize: responsiveFontSize(1.65), fontWeight: '700' },
  newBadge: { paddingHorizontal: responsiveWidth(2.4), paddingVertical: responsiveHeight(0.45), borderRadius: 8, backgroundColor: AppColors.themeColor },
  newBadgeText: { color: AppColors.white, fontSize: responsiveFontSize(1.05), fontWeight: '700' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: responsiveWidth(2) },
  filterChip: { paddingHorizontal: responsiveWidth(3.8), paddingVertical: responsiveHeight(0.9), borderRadius: 20, borderWidth: 0.5, borderColor: AppColors.homeBorder, backgroundColor: AppColors.memorialCard },
  filterChipActive: { backgroundColor: AppColors.white, borderColor: AppColors.white },
  filterText: { color: AppColors.white, fontSize: responsiveFontSize(1.15) },
  filterTextActive: { color: AppColors.themeColor, fontWeight: '700' },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.8), fontWeight: '700' },
  serviceCard: { marginBottom: responsiveHeight(1.3), backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  serviceTop: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between' },
  serviceCopy: { flex: 1, paddingRight: responsiveWidth(3) },
  serviceTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.55), fontWeight: '700' },
  serviceSub: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.18), marginTop: responsiveHeight(0.4) },
  statusPill: { paddingHorizontal: responsiveWidth(2.6), paddingVertical: responsiveHeight(0.55), borderRadius: 8, borderWidth: 0.5, borderColor: AppColors.white, backgroundColor: 'rgba(255,255,255,0.12)' },
  statusText: { color: AppColors.white, fontSize: responsiveFontSize(1.05), fontWeight: '700' },
  infoLine: { flexDirection: 'row', marginTop: responsiveHeight(0.7) },
  infoLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25) },
  infoValue: { color: AppColors.white, fontSize: responsiveFontSize(1.25), marginLeft: responsiveWidth(1.4) },
});

export default VendorDashboardScreen;
