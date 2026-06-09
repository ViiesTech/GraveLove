import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const calendarRows = [
  ['28', '29', '30', '1', '2', '3', '4'],
  ['5', '6', '7', '8', '9', '10', '11'],
  ['12', '13', '14', '15', '16', '17', '18'],
  ['19', '20', '21', '22', '23', '24', '25'],
  ['26', '27', '28', '29', '30', '31', ''],
];
const times = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

const BookingServiceStep3 = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState(1);

  return (
    <ScreenWrapper
      isScroll
      style={styles.screen}
      contentContainerStyle={styles.scrollContent}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="Book a Service"
        subtitle="Select Date and time"
      />

      <View style={styles.content}>
        <View style={styles.progressRow}>
          {[0, 1, 2, 3, 4].map(item => (
            <View
              key={item}
              style={[styles.progressItem, item < 3 && styles.progressActive]}
            />
          ))}
        </View>
        <LineBreak height={2.58} />

        <AppText style={styles.sectionTitle}>Select Date</AppText>
        <LineBreak height={1.72} />
        <CalendarCard />

        <LineBreak height={3.43} />
        <AppText style={styles.sectionTitle}>Select Time</AppText>
        <LineBreak height={1.72} />
        <View style={styles.timeWrap}>
          {times.map((time, index) => {
            const isSelected = selectedTime === index;
            return (
              <TouchableOpacity
                key={time}
                activeOpacity={0.82}
                onPress={() => setSelectedTime(index)}
                style={[styles.timeChip, isSelected && styles.timeChipActive]}>
                <AppText style={[styles.timeText, isSelected && styles.timeTextActive]}>
                  {time}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        <LineBreak height={4.3} />
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('BookingServiceStep4')}
          style={styles.continueButton}>
          <AppText style={styles.continueText}>Continue</AppText>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const CalendarCard = () => (
  <GlassCard contentStyle={styles.calendarCard}>
    <View style={styles.calendarHeader}>
      <AppIcon iconSet="ion" name="chevron-back" color={AppColors.white} size={20} />
      <AppText style={styles.monthTitle}>October 2025</AppText>
      <AppIcon iconSet="ion" name="chevron-forward" color={AppColors.white} size={20} />
    </View>
    <LineBreak height={2.15} />
    <View style={styles.calendarRow}>
      {weekDays.map(day => (
        <AppText key={day} style={styles.weekDay}>{day}</AppText>
      ))}
    </View>
    <LineBreak height={1.29} />
    {calendarRows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.calendarRow}>
        {row.map((day, index) => {
          const isActive = rowIndex === 4 && day === '27';
          return (
            <View
              key={`${day}-${index}`}
              style={[styles.dayCell, isActive && styles.dayCellActive]}>
              <AppText style={[styles.dayText, isActive && styles.dayTextActive]}>
                {day}
              </AppText>
            </View>
          );
        })}
      </View>
    ))}
  </GlassCard>
);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: AppColors.homeBody,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: responsiveWidth(5.8),
  },
  progressRow: {
    flexDirection: 'row',
    gap: responsiveWidth(1.93),
  },
  progressItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    flex: 1,
    height: 4,
  },
  progressActive: {
    backgroundColor: AppColors.white,
  },
  sectionTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
  },
  calendarCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: 'transparent',
    borderRadius: 10,
    padding: responsiveWidth(4.83),
  },
  calendarHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.45),
    fontWeight: '700',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(0.85),
  },
  weekDay: {
    color: AppColors.white,
    fontSize: responsiveFontSize(0.92),
    fontWeight: '700',
    textAlign: 'center',
    width: responsiveWidth(7.25),
  },
  dayCell: {
    alignItems: 'center',
    borderRadius: 8,
    height: responsiveWidth(7.25),
    justifyContent: 'center',
    width: responsiveWidth(7.25),
  },
  dayCellActive: {
    backgroundColor: AppColors.white,
  },
  dayText: {
    color: 'rgba(255, 255, 255, 0.22)',
    fontSize: responsiveFontSize(1.08),
  },
  dayTextActive: {
    color: AppColors.memorialCard,
    fontWeight: '700',
  },
  timeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: responsiveHeight(1.29),
  },
  timeChip: {
    backgroundColor: 'transparent',
    borderColor: AppColors.homeBorder,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    width: responsiveWidth(27.5),
    paddingVertical: responsiveHeight(1.29),
  },
  timeChipActive: {
    backgroundColor: AppColors.white,
    borderColor: AppColors.white,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.22)',
    fontSize: responsiveFontSize(1.18),
  },
  timeTextActive: {
    color: AppColors.memorialCard,
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    paddingVertical: responsiveHeight(1.35),
  },
  continueText: {
    color: AppColors.black,
    fontSize: responsiveFontSize(1.12),
  },
});

export default BookingServiceStep3;
