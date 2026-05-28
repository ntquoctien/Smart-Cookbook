import { Platform } from 'react-native';

declare const process:
  | {
      env?: {
        EXPO_PUBLIC_VISION_API_BASE_URL?: string;
        EXPO_PUBLIC_USE_MOCK_VISION?: string;
      };
    }
  | undefined;

const env = typeof process !== 'undefined' ? process.env : undefined;

const defaultBaseUrl = Platform.select({
  android: 'http://10.0.2.2:8000',
  ios: 'http://127.0.0.1:8000',
  default: 'http://127.0.0.1:8000',
});

export const visionApiConfig = {
  baseUrl: env?.EXPO_PUBLIC_VISION_API_BASE_URL ?? defaultBaseUrl,
  useMockVision: env?.EXPO_PUBLIC_USE_MOCK_VISION === 'true',
  timeoutMs: 12000,
};
