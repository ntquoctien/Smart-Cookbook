export const formatMinutes = (minutes: number) => `${minutes} min`;

export const formatConfidence = (value?: number) =>
  value ? `${Math.round(value * 100)}%` : 'Manual';

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
