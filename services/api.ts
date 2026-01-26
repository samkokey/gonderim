import { PromoResponse, Language } from '../types';
import { apiMessages } from '../translations';

/**
 * Simulates sending the code to a remote server.
 */
export const redeemPromoCode = async (username: string, code: string, lang: Language): Promise<PromoResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedCode = code.toUpperCase().trim();
      const msg = apiMessages[lang];

      // Simulate logic
      if (normalizedCode === 'DEMO100') {
        resolve({
          success: true,
          message: msg.success,
          followerCount: 100,
          promoDetails: {
            name: msg.pkg_starter,
            description: msg.desc_starter
          }
        });
      } else if (normalizedCode === 'MEGA500') {
        resolve({
          success: true,
          message: msg.success, // Use generic success or custom if needed
          followerCount: 500,
          promoDetails: {
            name: msg.pkg_mega,
            description: msg.desc_mega
          }
        });
      } else if (normalizedCode === 'VIP') {
        resolve({
          success: true,
          message: msg.success,
          followerCount: 1000,
          promoDetails: {
            name: msg.pkg_vip,
            description: msg.desc_vip
          }
        });
      } else {
        resolve({
          success: false,
          message: msg.invalid
        });
      }
    }, 2000);
  });
};