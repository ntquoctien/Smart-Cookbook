import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'IngredientConfirmation'>;

export function IngredientConfirmationScreen({ navigation }: Props) {
  const items = useAppStore((state) => state.confirmedIngredients);
  const updateConfirmedIngredient = useAppStore((state) => state.updateConfirmedIngredient);
  const removeConfirmedIngredient = useAppStore((state) => state.removeConfirmedIngredient);
  const addConfirmedIngredient = useAppStore((state) => state.addConfirmedIngredient);
  const setConfirmedIngredients = useAppStore((state) => state.setConfirmedIngredients);

  if (!items.length) {
    return (
      <ScreenContainer>
        <EmptyState
          icon="🥕"
          title="No detected ingredients"
          message="Run the AI scanning step first, or add ingredients manually to continue."
        />
        <AppButton
          label="Add first ingredient"
          onPress={() =>
            addConfirmedIngredient({
              id: `${Date.now()}`,
              name: 'trung ga',
              quantity: '2 qua',
              count: 2,
              unit: 'qua',
            })
          }
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Confirm detected ingredients</Text>
      <Text style={styles.subtitle}>Edit names, quantities, or remove ingredients before recipe matching.</Text>

      <View style={styles.list}>
        {items.map((item) => (
          <AppCard key={item.id} style={styles.card}>
            <View style={styles.row}>
              <View style={styles.nameGroup}>
                <TextInput
                  value={item.name}
                  onChangeText={(value) => updateConfirmedIngredient(item.id, { name: value })}
                  style={styles.nameInput}
                />
                <Text style={styles.quantityPreview}>{item.quantity}</Text>
              </View>
              <Pressable onPress={() => removeConfirmedIngredient(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </Pressable>
            </View>
            <TextInput
              value={item.quantity}
              onChangeText={(value) => updateConfirmedIngredient(item.id, { quantity: value })}
              style={styles.input}
            />
          </AppCard>
        ))}
      </View>

      <AppButton
        label="Add ingredient"
        variant="secondary"
        onPress={() =>
          addConfirmedIngredient({
            id: `${Date.now()}`,
            name: 'rau cai',
            quantity: '1 bo',
            count: 1,
            unit: 'bo',
          })
        }
      />
      <View style={styles.bottom}>
        <AppButton
          label="Confirm ingredients"
          onPress={() => {
            setConfirmedIngredients(items);
            navigation.navigate('PreferenceSelection');
          }}
        />
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
  nameInput: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  quantityPreview: {
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
