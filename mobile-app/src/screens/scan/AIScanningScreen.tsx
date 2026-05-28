import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import type { RootStackParamList } from '../../types';
import type { Ingredient } from '../../types/ingredient';
import { AppButton } from '../../components/ui/AppButton';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingState } from '../../components/ui/LoadingState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { visionApiService } from '../../services/visionApiService';
import { visionMockService } from '../../services/visionMockService';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { radius } from '../../styles/radius';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'AIScanning'>;

const steps = ['Analyzing image', 'Detecting ingredients', 'Preparing recipe suggestions'];

export function AIScanningScreen({ navigation }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [scanStatus, setScanStatus] = useState<string | null>(null);
  const selectedImages = useAppStore((state) => state.selectedImages);
  const scanning = useAppStore((state) => state.scanning);
  const scanError = useAppStore((state) => state.scanError);
  const setScanning = useAppStore((state) => state.setScanning);
  const setDetectedIngredients = useAppStore((state) => state.setDetectedIngredients);
  const setScanError = useAppStore((state) => state.setScanError);

  useEffect(() => {
    if (!scanning || activeStep >= steps.length - 1) {
      return;
    }

    const timer = setTimeout(() => setActiveStep((value) => value + 1), 900);
    return () => clearTimeout(timer);
  }, [activeStep, scanning]);

  useEffect(() => {
    let active = true;

    const runDetection = async () => {
      if (!selectedImages.length) {
        setScanError('No image selected.');
        setScanning(false);
        return;
      }

      setScanning(true);
      setScanError(null);
      setScanStatus(null);
      setActiveStep(0);

      let usedFallback = false;
      let ingredients: Ingredient[] = [];
      let nextScanStatus: string | null = null;
      try {
        const result = await visionApiService.detectIngredients(selectedImages);
        ingredients = result.ingredients;
        nextScanStatus =
          result.message ??
          `Scan completed. Scanned ${result.imageCount} ${result.imageCount === 1 ? 'image' : 'images'}.`;
      } catch (error) {
        console.warn('Vision API unavailable, falling back to mock detection.', error);
        usedFallback = true;
        ingredients = await visionMockService.detectIngredients(selectedImages);
        nextScanStatus = `Mock scan completed. Scanned ${selectedImages.length} ${
          selectedImages.length === 1 ? 'image' : 'images'
        }.`;
      }

      if (!active) {
        return;
      }

      if (!ingredients.length) {
        setDetectedIngredients([]);
        setScanError('No ingredients detected. You can continue and add ingredients manually.');
        setScanStatus(nextScanStatus);
      } else {
        setDetectedIngredients(ingredients);
        setScanStatus(nextScanStatus);
        if (usedFallback) {
          setScanError('Backend vision is unavailable, so mock detection was used. You can review or edit the ingredients.');
        }
      }

      setScanning(false);
      setActiveStep(steps.length - 1);
    };

    void runDetection();

    return () => {
      active = false;
    };
  }, [selectedImages, setDetectedIngredients, setScanError, setScanning]);

  if (!selectedImages.length) {
    return (
      <ScreenContainer>
        <EmptyState
          icon="🖼️"
          title="No images available"
          message="Return to the camera screen and capture or select images before starting AI scanning."
        />
        <AppButton label="Back to scan" onPress={() => navigation.navigate('MainTabs', { screen: 'CameraScan' })} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <LinearGradient colors={['#FFF2E7', '#FFE5D2']} style={styles.panel}>
        <Text style={styles.icon}>🧠</Text>
        <Text style={styles.title}>AI is reading your ingredients</Text>
        <Text style={styles.subtitle}>We are turning your photos into a cleaner ingredient list.</Text>
        {scanning ? <LoadingState label={steps[activeStep]} /> : null}
        {!scanning && scanStatus ? (
          <View style={styles.statusBox}>
            <Text style={styles.statusTitle}>Scan completed</Text>
            <Text style={styles.statusText}>{scanStatus}</Text>
            {scanError ? <Text style={styles.warningText}>{scanError}</Text> : null}
          </View>
        ) : null}
        {!scanning && !scanStatus && scanError ? <LoadingState label={scanError} /> : null}
      </LinearGradient>

      <View style={styles.stepList}>
        {steps.map((item, index) => (
          <View key={item} style={styles.stepRow}>
            <View style={[styles.dot, index <= activeStep && styles.activeDot]} />
            <Text style={[styles.stepText, index <= activeStep && styles.activeStepText]}>{item}</Text>
          </View>
        ))}
      </View>

      {scanning ? null : (
        <AppButton
          label={scanError ? 'Continue to ingredient review' : 'Continue'}
          onPress={() => navigation.navigate('IngredientConfirmation')}
        />
      )}
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
  statusBox: {
    width: '100%',
    marginTop: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  statusTitle: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.md,
    color: colors.success,
    textAlign: 'center',
  },
  statusText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  warningText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 18,
    color: colors.warning,
    textAlign: 'center',
  },
});
