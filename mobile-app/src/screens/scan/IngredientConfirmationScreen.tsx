import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { detectedIngredients } from '../../data/mockIngredients';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';
import { formatConfidence } from '../../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'IngredientConfirmation'>;

export function IngredientConfirmationScreen({ navigation }: Props) {
  const [items, setItems] = useState(detectedIngredients);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Confirm detected ingredients</Text>
      <Text style={styles.subtitle}>Edit quantities or remove any ingredient before recipe matching.</Text>

      <View style={styles.list}>
        {items.map((item) => (
          <AppCard key={item.id} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.nameGroup}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.confidence}>Confidence: {formatConfidence(item.confidence)}</Text>
              </View>
              <Pressable onPress={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}>
                <Text style={styles.delete}>Delete</Text>
              </Pressable>
            </View>
            <TextInput
              value={item.quantity}
              onChangeText={(value) =>
                setItems((current) =>
                  current.map((entry) => (entry.id === item.id ? { ...entry, quantity: value } : entry))
                )
              }
              style={styles.input}
            />
          </AppCard>
        ))}
      </View>

      <AppButton
        label="Add ingredient"
        variant="secondary"
        onPress={() =>
          setItems((current) => [
            ...current,
            { id: `${current.length + 1}`, name: 'rau cải', quantity: '1 bó', confidence: 0.8 },
          ])
        }
      />
      <View style={styles.bottom}>
        <AppButton label="Confirm ingredients" onPress={() => navigation.navigate('PreferenceSelection')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.xl,
    fontFamily: fontFamilies.black,
    fontSize: fontSizes.xxl,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  list: {
    marginVertical: spacing.xl,
    gap: spacing.md,
  },
  card: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  nameGroup: {
    flex: 1,
  },
  name: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  confidence: {
    marginTop: 4,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
  },
  delete: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.error,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  bottom: {
    marginTop: spacing.md,
  },
});
