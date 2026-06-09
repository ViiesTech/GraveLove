import React from 'react';
import { View } from 'react-native';
import { responsiveHeight } from '../utils/Responsive_Dimensions';

const LineBreak = ({ height = 1, style }) => (
  <View style={[{ height: responsiveHeight(height) }, style]} />
);

export default LineBreak;
