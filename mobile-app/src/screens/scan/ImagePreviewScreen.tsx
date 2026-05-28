import { Image, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../types';
import { AppButton } from '../../components/ui/AppButton';
import { EmptyState } from '../../components/ui/EmptyState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'ImagePreview'>;

export function ImagePreviewScreen({ navigation }: Props) {
  const selectedImages = useAppStore((state) => state.selectedImages);
  const setScanError = useAppStore((state) => state.setScanError);
  const clearSelectedImages = useAppStore((state) => state.clearSelectedImages);

  if (!selectedImages.length) {
    return (
      <ScreenContainer>
        <EmptyState
          icon="🖼️"
          title="No images selected"
          message="Capture or choose ingredient images before entering the preview step."
        />
        <AppButton label="Back to scan" onPress={() => navigation.goBack()} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Review your photos</Text>
      <Text style={styles.subtitle}>Check the selected images before AI starts analyzing ingredients.</Text>

      <View style={styles.grid}>
        {selectedImages.map((image) => (
          <Image key={image.id} source={{ uri: image.uri }} style={styles.image} />
        ))}
      </View>

      <View style={styles.actions}>
        <AppButton
          label="Retake photos"
          variant="secondary"
          onPress={() => {
            clearSelectedImages();
            navigation.goBack();
          }}
        />
        <AppButton label="Add more photo" variant="secondary" onPress={() => navigation.goBack()} />
        <AppButton
          label="Continue to AI scan"
          onPress={() => {
            if (!selectedImages.length) {
              setScanError('No image selected.');
              return;
            }
            navigation.navigate('AIScanning');
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
  grid: {
    marginTop: spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  image: {
    width: '47%',
    height: 240,
    borderRadius: 26,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
});
