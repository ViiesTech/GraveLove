import React from 'react';
import { MaterialIcons } from '@react-native-vector-icons/material-icons/static';
import { Ionicons } from '@react-native-vector-icons/ionicons/static';
import SVGXml from './SvgXml';
import { AppColors } from '../utils/AppColors';

const iconSets = {
  material: MaterialIcons,
  ion: Ionicons,
};

const AppIcon = ({
  color = AppColors.gold,
  iconSet = 'material',
  name,
  size = 20,
  svg,
  style,
}) => {
  if (svg) {
    return <SVGXml icon={svg} width={size} height={size} style={style} />;
  }

  const IconComponent = iconSets[iconSet] || MaterialIcons;
  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default AppIcon;
