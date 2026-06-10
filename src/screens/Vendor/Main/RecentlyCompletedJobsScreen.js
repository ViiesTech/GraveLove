import React from 'react';
import { StyleSheet, View } from 'react-native';
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

const completedJobs = [
  ['Flower Placement', 'Emily Thompson', 'Oct 30, 2025', '$60.00'],
  ['Grave Cleaning', 'Michael Brown', 'Oct 28, 2025', '$45.00'],
  ['Flower Placement', 'Emily Thompson', 'Oct 30, 2025', '$60.00'],
  ['Grave Cleaning', 'Michael Brown', 'Oct 28, 2025', '$45.00'],
  ['Flower Placement', 'Sarah Jones', 'Oct 25, 2025', '$60.00'],
];

const RecentlyCompletedJobsScreen = ({ navigation }) => (
  <ScreenWrapper isScroll contentContainerStyle={styles.scrollContent}>
    <AppImageHeader
      image={AppAssets.images.vendorHeader}
      onBack={() => navigation.goBack()}
      title="Recently completed jobs"
      subtitle="View list to complete jobs"
    />
    <View style={styles.content}>
      {completedJobs.map(([serviceName, clientName, date, price], index) => (
        <CompletedJobCard
          clientName={clientName}
          date={date}
          key={`${serviceName}-${clientName}-${index}`}
          price={price}
          serviceName={serviceName}
        />
      ))}
    </View>
  </ScreenWrapper>
);

const CompletedJobCard = ({ clientName, date, price, serviceName }) => (
  <GlassCard contentStyle={styles.card}>
    <View style={styles.iconWrap}>
      <AppIcon name="check-circle-outline" color={AppColors.white} size={44} />
    </View>
    <View style={styles.copy}>
      <View style={styles.titleRow}>
        <AppText numberOfLines={1} style={styles.title}>{serviceName}</AppText>
        <AppText style={styles.price}>{price}</AppText>
      </View>
      <LineBreak height={0.45} />
      <AppText style={styles.sub}>{clientName} • {date}</AppText>
      <LineBreak height={0.8} />
      <View style={styles.starRow}>
        {Array.from({ length: 5 }).map((_, index) => (
          <AppIcon key={index} name="star" color={AppColors.starYellow} size={18} />
        ))}
      </View>
    </View>
  </GlassCard>
);

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  content: { padding: responsiveWidth(5.8), paddingBottom: responsiveHeight(8) },
  card: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.6),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    padding: responsiveWidth(4.8),
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(14),
  },
  copy: {
    flex: 1,
    marginLeft: responsiveWidth(4),
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: AppColors.white,
    flex: 1,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
    marginRight: responsiveWidth(2),
  },
  price: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.5),
    fontWeight: '700',
  },
  sub: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.2),
  },
  starRow: {
    flexDirection: 'row',
    gap: responsiveWidth(0.7),
  },
});

export default RecentlyCompletedJobsScreen;
