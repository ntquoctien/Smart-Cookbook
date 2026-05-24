import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type TimerCardProps = {
  minutes: number;
};

export function TimerCard({ minutes }: TimerCardProps) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.label}>Quick Timer</Text>
        <Text style={styles.value}>{minutes}:00</Text>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  label: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.75)',
  },
  value: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.white,
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
  },
  buttonText: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
});
