import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderRef(): string {
  const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `CW-${new Date().getFullYear()}-${randomId}`;
}

export function calculateDeliveryEstimate(videoLength: string): string {
  // Calculate estimated delivery time based on video length
  switch(videoLength) {
    case 'Up to 30 seconds':
      return '3-5 business days';
    case '30-60 seconds':
      return '5-7 business days';
    case '1-3 minutes':
      return '7-10 business days';
    case '3-5 minutes':
      return '10-14 business days';
    case '5-10 minutes':
      return '14-21 business days';
    default:
      return '7-14 business days';
  }
}

export function getLengthPrice(length: string): number {
  switch(length) {
    case 'Up to 30 seconds':
      return 250;
    case '30-60 seconds':
      return 450;
    case '1-3 minutes':
      return 850;
    case '3-5 minutes':
      return 1250;
    case '5-10 minutes':
      return 1950;
    case 'Custom length':
      return 0;
    default:
      return 250;
  }
}

export function getFeaturePrice(feature: string): number {
  switch(feature) {
    case 'Color Grading':
      return 150;
    case 'Custom Transitions':
      return 100;
    case 'Professional Subtitles':
      return 125;
    case 'Sound Effects':
      return 175;
    case 'Visual Effects':
      return 300;
    case 'Voice-over':
      return 250;
    default:
      return 0;
  }
}
