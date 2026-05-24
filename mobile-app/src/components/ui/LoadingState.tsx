import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../styles/colors';
import { fontFamilies, fontSizes } from '../../styles/typography';

type LoadingStateProps = {
  label?: string;
  fullscreen?: boolean;
};

export function LoadingState({ label = 'Loading...', fullscreen = false }: LoadingStateProps) {
  return (
    <View style={[styles.container, fullscreen && styles.fullscreen]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
});
