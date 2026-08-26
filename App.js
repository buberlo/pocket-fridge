import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { FridgeProvider } from './src/context/FridgeContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <FridgeProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0b1020" />
        <View style={styles.container}>
          <HomeScreen />
        </View>
      </SafeAreaView>
    </FridgeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0b1020',
  },
  container: {
    flex: 1,
  },
});