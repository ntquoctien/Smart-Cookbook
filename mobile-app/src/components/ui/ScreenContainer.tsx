import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';

type ScreenContainerProps = PropsWithChildren<{
  scroll?: boolean;
  padded?: boolean;
}>;

export function ScreenContainer({
  children,
  scroll = true,
  padded = true,
}: ScreenContainerProps) {
  const content = <View style={[styles.content, padded && styles.padded]}>{children}</View>;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView
          style={styles.safeArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  content: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing.screen,
  },
});
