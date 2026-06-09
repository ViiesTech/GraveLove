import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { responsiveWidth } from '../utils/Responsive_Dimensions';

const GlassCard = ({ children, onPress, style, contentStyle }) => {
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      activeOpacity={0.84}
      onPress={onPress}
      style={[styles.card, style, contentStyle]}>
      {children}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    backgroundColor: 'transparent',
    padding: responsiveWidth(4.13),
  },
});

export default GlassCard;
