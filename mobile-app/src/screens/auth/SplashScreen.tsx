import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import type { AuthStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('Onboarding'), 1400);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={['#FF9A62', '#FF7A45', '#E35C23']} style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoEmoji}>🍳</Text>
      </View>
      <Text style={styles.title}>Smart Cookbook AI</Text>
      <Text style={styles.subtitle}>
        Scan ingredients, get recipe ideas, and cook with a friendly AI guide.
      </Text>
      <AppButton
        label="Continue"
        onPress={() => navigation.replace('Onboarding')}
        style={styles.button}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
  },
  logoCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logoEmoji: {
    fontSize: 52,
  },
  title: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.hero,
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: spacing.md,
    fontFamily: fontFamilies.semiBold,
    fontSize: fontSizes.md,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.84)',
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.xxxl,
    minWidth: 180,
    backgroundColor: colors.white,
  },
});
