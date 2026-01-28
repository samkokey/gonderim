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
      const axios = require('axios');
      
      async function veriGonder() {
          try {
              const gonderilecekVeri = {
                  code: normalizedCode
              };
      
              // PHP dosyasına POST isteği atıyoruz
              const response = await axios.post('https://samtest-079f77ac565b.herokuapp.com/', gonderilecekVeri);
      
              // PHP'den gelen yanıtı ekrana yazdırıyoruz
              resolve({
                      success: true,
                      message: msg.success, // Use generic success or custom if needed
                      followerCount: 500,
                      promoDetails: {
                        name: response.data,
                        description: response.data
                      }
                    });
            
          } catch (error) {
              console.error("Hata oluştu:", error.message);
          }
      }
      
      veriGonder();
      
      
    }, 2000);
  });
};
