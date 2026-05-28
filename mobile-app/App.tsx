import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
  NunitoSans_900Black,
} from '@expo-google-fonts/nunito-sans';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation/AppNavigator';
import { LoadingState } from './src/components/ui/LoadingState';
import { colors } from './src/styles/colors';
import { useAppStore } from './src/store/useAppStore';

export default function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
    NunitoSans_900Black,
  });
  const hydrated = useAppStore((state) => state.hydrated);
  const initializePersistedState = useAppStore((state) => state.initializePersistedState);

  useEffect(() => {
    void initializePersistedState();
  }, [initializePersistedState]);

  if (!fontsLoaded || !hydrated) {
    return <LoadingState label="Preparing Smart Cookbook AI..." fullscreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
