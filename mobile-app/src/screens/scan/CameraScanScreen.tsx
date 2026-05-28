import { useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import type { MainTabParamList, RootStackParamList } from '../../types';
import type { SelectedImage } from '../../types/scan';
import { AppButton } from '../../components/ui/AppButton';
import { AppCard } from '../../components/ui/AppCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { ScreenContainer } from '../../components/ui/ScreenContainer';
import { useAppStore } from '../../store/useAppStore';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { fontFamilies, fontSizes } from '../../styles/typography';

type Props = BottomTabScreenProps<MainTabParamList, 'CameraScan'>;

export function CameraScanScreen({ navigation }: Props) {
  const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const selectedImages = useAppStore((state) => state.selectedImages);
  const addSelectedImages = useAppStore((state) => state.addSelectedImages);
  const setScanError = useAppStore((state) => state.setScanError);
  const scanError = useAppStore((state) => state.scanError);

  const openPreview = () => {
    if (!selectedImages.length) {
      setScanError('Select at least one image before continuing.');
      return;
    }

    rootNavigation?.navigate('ImagePreview');
  };

  const ensurePermission = async () => {
    if (permission?.granted) {
      return true;
    }

    const result = await requestPermission();
    if (!result.granted) {
      setScanError('Camera permission denied. Use the gallery option instead.');
      return false;
    }

    return true;
  };

  const capturePhoto = async () => {
    const granted = await ensurePermission();
    if (!granted || !cameraRef.current) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    if (!photo?.uri) {
      setScanError('No image captured. Try again.');
      return;
    }

    const image: SelectedImage = {
      id: `camera-${Date.now()}`,
      uri: photo.uri,
      width: photo.width,
      height: photo.height,
      source: 'camera',
    };
    addSelectedImages([image]);
    setScanError(null);
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 0.7,
      mediaTypes: ['images'],
      selectionLimit: 5,
    });

    if (result.canceled || !result.assets.length) {
      setScanError('No image selected from gallery.');
      return;
    }

    const images: SelectedImage[] = result.assets.map((asset, index) => ({
      id: `${asset.assetId ?? 'gallery'}-${Date.now()}-${index}`,
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileName: asset.fileName,
      mimeType: asset.mimeType,
      source: 'gallery',
    }));

    addSelectedImages(images);
    setScanError(null);
    rootNavigation?.navigate('ImagePreview');
  };

  return (
    <ScreenContainer scroll={false}>
      <Text style={styles.title}>Camera Scan</Text>
      <Text style={styles.subtitle}>
        Capture fresh ingredient photos or mix them with gallery images in one scan session.
      </Text>

      {permission && !permission.granted ? (
        <AppCard style={styles.permissionCard}>
          <EmptyState
            icon="📷"
            title="Camera permission needed"
            message="Grant camera access to capture ingredient photos, or use the gallery below."
          />
          <AppButton label="Grant camera permission" onPress={() => void requestPermission()} />
        </AppCard>
      ) : (
        <View style={styles.preview}>
          <CameraView ref={cameraRef} style={styles.camera} facing="back" />
          <View style={styles.previewOverlay}>
            <Text style={styles.previewText}>Align ingredients inside the frame</Text>
            <Text style={styles.previewHint}>One photo or multiple photos are both supported.</Text>
          </View>
        </View>
      )}

      <AppCard style={styles.card}>
        <Text style={styles.cardTitle}>Instructions</Text>
        <Text style={styles.cardText}>Keep ingredients well lit, fill the frame, and capture from above.</Text>
        <Text style={styles.cardText}>Selected images: {selectedImages.length}</Text>
        {scanError ? <Text style={styles.errorText}>{scanError}</Text> : null}
      </AppCard>

      <View style={styles.actions}>
        <AppButton label="Capture photo" onPress={() => void capturePhoto()} />
        <AppButton label="Upload from gallery" variant="secondary" onPress={() => void openGallery()} />
        <Pressable onPress={openPreview} style={styles.reviewLink}>
          <Text style={styles.reviewText}>
            {selectedImages.length ? 'Review selected images' : 'Capture or select images to continue'}
          </Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.lg,
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
  preview: {
    marginTop: spacing.xl,
    minHeight: 360,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#2C2C2C',
  },
  permissionCard: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  camera: {
    flex: 1,
    minHeight: 360,
  },
  previewOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.34)',
  },
  previewText: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.lg,
    color: colors.white,
  },
  previewHint: {
    marginTop: spacing.sm,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    color: 'rgba(255,255,255,0.74)',
  },
  card: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  cardTitle: {
    fontFamily: fontFamilies.extraBold,
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  cardText: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.sm,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  errorText: {
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.error,
  },
  actions: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  reviewLink: {
    paddingVertical: spacing.sm,
  },
  reviewText: {
    textAlign: 'center',
    fontFamily: fontFamilies.bold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
});
