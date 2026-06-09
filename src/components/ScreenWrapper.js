import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppAssets } from '../utils/AppAssets';
import { AppColors, AppGradients } from '../utils/AppColors';

const ScreenWrapper = ({
  children,
  contentContainerStyle,
  isGradient = false,
  isKeyboardAvoiding = false,
  isScroll = false,
  keyboardShouldPersistTaps = 'handled',
  keyboardVerticalOffset = 0,
  safeAreaEdges = ['top', 'left', 'right'],
  scrollProps,
  useBackgroundImage = true,
  style,
}) => {
  const content = isScroll ? (
    <ScrollView
      automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
      keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
      {...scrollProps}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentContainerStyle]}>{children}</View>
  );

  const innerContent = (
    <>
      <StatusBar backgroundColor={AppColors.bgDark} barStyle="light-content" />
      {isGradient ? (
        <LinearGradient
          colors={AppGradients.mainBackground}
          style={StyleSheet.absoluteFillObject}
        />
      ) : null}
      <SafeAreaView edges={safeAreaEdges} style={styles.safeArea}>
        {isKeyboardAvoiding ? (
          <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={keyboardVerticalOffset}>
            {content}
          </KeyboardAvoidingView>
        ) : (
          content
        )}
      </SafeAreaView>
    </>
  );

  if (!useBackgroundImage) {
    return <View style={[styles.container, style]}>{innerContent}</View>;
  }

  return (
    <ImageBackground
      source={AppAssets.images.bgImage}
      resizeMode="cover"
      style={[styles.container, style]}>
      {innerContent}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.bgDark,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
