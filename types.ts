// Global type definition for the confetti library loaded via CDN
declare global {
  interface Window {
    confetti: any;
  }
}

export type Language = 'ru' | 'en' | 'tr';

export enum RequestStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface PromoResponse {
  success: boolean;
  message: string;
  followerCount?: number;
  promoDetails?: {
    name: string;
    description: string;
  };
}

export interface UserInput {
  username: string;
  code: string;
}