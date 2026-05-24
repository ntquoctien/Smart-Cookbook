import { Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { mockRecipes } from '../../data/mockRecipes';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'ImagePreview'>;

export function ImagePreviewScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <Text style={styles.title}>Review your photos</Text>
      <Text style={styles.subtitle}>Check the selected images before AI starts analyzing ingredients.</Text>

      <View style={styles.grid}>
        {[mockRecipes[0].image, mockRecipes[4].image].map((uri) => (
          <Image key={uri} source={{ uri }} style={styles.image} />
        ))}
      </View>

      <View style={styles.actions}>
        <AppButton label="Retake photos" variant="secondary" onPress={() => navigation.goBack()} />
        <AppButton label="Add more photo" variant="secondary" onPress={() => navigation.goBack()} />
        <AppButton label="Continue to AI scan" onPress={() => navigation.navigate('AIScanning')} />
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
  grid: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    gap: spacing.md,
  },
  image: {
    flex: 1,
    height: 240,
    borderRadius: 26,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
});
