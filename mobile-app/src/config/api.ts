declare const process:
  | {
      env?: {
        EXPO_PUBLIC_VISION_API_BASE_URL?: string;
        EXPO_PUBLIC_USE_MOCK_VISION?: string;
      };
    }
  | undefined;

const env = typeof process !== 'undefined' ? process.env : undefined;

export const visionApiConfig = {
  baseUrl: env?.EXPO_PUBLIC_VISION_API_BASE_URL ?? 'http://127.0.0.1:8000',
  useMockVision: env?.EXPO_PUBLIC_USE_MOCK_VISION === 'true',
  timeoutMs: 12000,
};
