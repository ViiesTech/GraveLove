import React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/routes/Routes';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
