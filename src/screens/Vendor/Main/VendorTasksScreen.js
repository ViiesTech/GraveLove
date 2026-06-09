import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';
import { VendorServiceCard } from './VendorDashboardScreen';

const filters = ['All', 'Pending', 'In Progress', 'Completed'];
const tasks = [
  ['Peaceful Gardens Cemetery', 'Plot 54, Section C', 'Grave Cleaning', '2025-11-03', 'Completed'],
  ['Memorial Park', 'Plot 47, Section B', 'Flower Placement', '2025-11-03', 'In Progress'],
  ['Garden of Peace', 'Plot 32, Section A', 'Grave Decoration', '2025-11-05', 'Completed'],
];

const VendorTasksScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filteredTasks = selectedFilter === 'All' ? tasks : tasks.filter(task => task[4] === selectedFilter);

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <LineBreak height={1.6} />
        <AppText style={styles.title}>All Tasks</AppText>
      </View>
      <View style={styles.body}>
        <View style={styles.filterRow}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              activeOpacity={0.82}
              onPress={() => setSelectedFilter(filter)}
              style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]}>
              <AppText style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</AppText>
            </TouchableOpacity>
          ))}
        </View>
        <LineBreak height={2} />
        {filteredTasks.map(task => (
          <VendorServiceCard
            key={`${task[0]}-${task[2]}`}
            service={task}
            onPress={() => navigation.navigate('VendorTaskDetails', { title: task[0] })}
          />
        ))}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(9) },
  header: { padding: responsiveWidth(4), backgroundColor: 'rgba(4,47,103,0.5)' },
  title: { color: AppColors.white, fontSize: responsiveFontSize(2.45), fontWeight: '700' },
  body: { padding: responsiveWidth(4) },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: responsiveWidth(2) },
  filterChip: { paddingHorizontal: responsiveWidth(3.8), paddingVertical: responsiveHeight(0.9), borderRadius: 20, borderWidth: 0.5, borderColor: AppColors.homeBorder, backgroundColor: AppColors.memorialCard },
  filterChipActive: { backgroundColor: AppColors.white, borderColor: AppColors.white },
  filterText: { color: AppColors.white, fontSize: responsiveFontSize(1.15) },
  filterTextActive: { color: AppColors.themeColor, fontWeight: '700' },
});

export default VendorTasksScreen;
