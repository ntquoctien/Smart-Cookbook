import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList, RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { AppInput } from '../../components/ui/AppInput';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('chef@smartcookbook.ai');
  const [password, setPassword] = useState('password123');

  const handleLogin = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'MainTabs' as keyof RootStackParamList }],
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to continue your AI-assisted cooking flow.</Text>
      </View>

      <AppCard style={styles.card}>
        <View style={styles.form}>
          <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
          <AppInput label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
        </View>
        <AppButton label="Log in" onPress={handleLogin} />
        <AppButton label="Create an account" variant="ghost" onPress={() => navigation.navigate('Register')} />
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing.xxxl,
    gap: spacing.sm,
  },
  title: {
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  card: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
  },
  form: {
    gap: spacing.lg,
  },
});
