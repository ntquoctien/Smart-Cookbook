import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

const steps = [
  { icon: '📸', title: 'Scan ingredients', text: 'Take one or more photos of what you have at home.' },
  { icon: '🧠', title: 'Get AI suggestions', text: 'See recipes ranked by match score, time, and difficulty.' },
  { icon: '👩‍🍳', title: 'Cook step by step', text: 'Use the AI assistant to stay confident while cooking.' },
];

export function OnboardingScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Warm, practical, and AI-guided</Text>
        <Text style={styles.title}>A smarter way to decide what to cook tonight.</Text>
        <Text style={styles.subtitle}>
          Smart Cookbook AI helps you turn available ingredients into a clear cooking flow.
        </Text>
      </View>

      <View style={styles.cards}>
        {steps.map((item) => (
          <AppCard key={item.title}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.text}</Text>
          </AppCard>
        ))}
      </View>

      <AppButton label="Start cooking" onPress={() => navigation.navigate('Login')} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.xl,
    gap: spacing.sm,
  },
  eyebrow: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.primary,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.hero,
    lineHeight: 40,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  cards: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.lg,
    color: colors.textPrimary,
  },
  cardText: {
    marginTop: spacing.sm,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
    color: colors.textSecondary,
  },
});
