import { visionApiConfig } from '../config/api';
import type { Ingredient } from '../types/ingredient';
import type { SelectedImage } from '../types/scan';

type BackendIngredient = {
  name: string;
  quantity: number;
  unit: string;
};

type BackendVisionResponse = {
  success: boolean;
  ingredients: BackendIngredient[];
  message?: string;
};

export type VisionDetectionResult = {
  ingredients: Ingredient[];
  message?: string;
  imageCount: number;
};

export class VisionApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'VisionApiError';
  }
}

function imageName(image: SelectedImage, index: number) {
  return image.fileName || `ingredient-${index + 1}.jpg`;
}

function imageType(image: SelectedImage) {
  return image.mimeType || 'image/jpeg';
}

function appendImage(formData: FormData, fieldName: string, image: SelectedImage, index: number) {
  formData.append(fieldName, {
    uri: image.uri,
    name: imageName(image, index),
    type: imageType(image),
  } as unknown as Blob);
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeIngredient(item: BackendIngredient, index: number): Ingredient {
  return {
    id: `vision-api-${item.name}-${index}`,
    name: item.name,
    count: item.quantity,
    unit: item.unit,
    quantity: `${item.quantity} ${item.unit}`.trim(),
    available: true,
  };
}

async function upload(images: SelectedImage[]): Promise<VisionDetectionResult> {
  if (!images.length) {
    throw new VisionApiError('No image selected.');
  }

  const batch = images.length > 1;
  const formData = new FormData();
  images.forEach((image, index) => appendImage(formData, batch ? 'images' : 'image', image, index));

  const endpoint = batch ? '/api/vision/detect-ingredients/batch' : '/api/vision/detect-ingredients';
  const response = await fetchWithTimeout(
    `${visionApiConfig.baseUrl}${endpoint}`,
    {
      method: 'POST',
      body: formData,
    },
    visionApiConfig.timeoutMs
  );

  if (!response.ok) {
    throw new VisionApiError('Ingredient detection service is unavailable.');
  }

  const payload = (await response.json()) as BackendVisionResponse;
  if (!payload.success || !Array.isArray(payload.ingredients)) {
    throw new VisionApiError(payload.message || 'Ingredient detection returned an invalid response.');
  }

  return {
    ingredients: payload.ingredients.map(normalizeIngredient),
    message: payload.message,
    imageCount: images.length,
  };
}

export const visionApiService = {
  async detectIngredients(images: SelectedImage[]): Promise<VisionDetectionResult> {
    if (visionApiConfig.useMockVision) {
      throw new VisionApiError('Mock vision mode is enabled.');
    }

    return upload(images);
  },
};
