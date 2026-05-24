import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import type { RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { LoadingState } from '../../components/ui/LoadingState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'AIScanning'>;

const steps = ['Analyzing image', 'Detecting ingredients', 'Preparing recipe suggestions'];

export function AIScanningScreen({ navigation }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= steps.length - 1) {
      return;
    }

    const timer = setTimeout(() => setActiveStep((value) => value + 1), 900);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <ScreenContainer>
      <LinearGradient colors={['#FFF2E7', '#FFE5D2']} style={styles.panel}>
        <Text style={styles.icon}>🧠</Text>
        <Text style={styles.title}>AI is reading your ingredients</Text>
        <Text style={styles.subtitle}>We are turning your photos into a cleaner ingredient list.</Text>
        <LoadingState label={steps[activeStep]} />
      </LinearGradient>

      <View style={styles.stepList}>
        {steps.map((item, index) => (
          <View key={item} style={styles.stepRow}>
            <View style={[styles.dot, index <= activeStep && styles.activeDot]} />
            <Text style={[styles.stepText, index <= activeStep && styles.activeStepText]}>{item}</Text>
          </View>
        ))}
      </View>

      <AppButton label="Continue" onPress={() => navigation.navigate('IngredientConfirmation')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: spacing.xxl,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  stepList: {
    marginVertical: spacing.xxl,
    gap: spacing.md,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  stepText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.md,
    color: colors.textSecondary,
  },
  activeStepText: {
    color: colors.textPrimary,
  },
});
