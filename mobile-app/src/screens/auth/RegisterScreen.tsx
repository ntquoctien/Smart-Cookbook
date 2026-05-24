import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { AuthStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { AppInput } from '../../components/ui/AppInput';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('Kitchen Explorer');
  const [email, setEmail] = useState('new@smartcookbook.ai');
  const [password, setPassword] = useState('password123');

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Create your profile</Text>
        <Text style={styles.subtitle}>Set up a mock account to test the full mobile flow.</Text>
      </View>

      <AppCard style={styles.card}>
        <View style={styles.form}>
          <AppInput label="Full name" placeholder="Your name" value={name} onChangeText={setName} />
          <AppInput label="Email" placeholder="you@example.com" value={email} onChangeText={setEmail} />
          <AppInput label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry />
        </View>
        <AppButton label="Register" onPress={() => navigation.navigate('Login')} />
        <AppButton label="Back to login" variant="ghost" onPress={() => navigation.goBack()} />
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
