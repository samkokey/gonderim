import { PromoResponse, Language } from '../types';
import { apiMessages } from '../translations';

/**
 * Simulates sending the code to a remote server.
 */
export const redeemPromoCode = async (username: string, code: string, lang: Language): Promise<PromoResponse> => {
  // Log the username to avoid "unused variable" error during build
  console.log(`Processing redemption for user: ${username}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      const normalizedCode = code.toUpperCase().trim();

      const axios = require('axios');
        async function veriGonder() {
            try {
                const gonderilecekVeri = {
                    code: normalizedCode;
                };
        
                // PHP dosyasına POST isteği atıyoruz
                const response = await axios.post('https://samtest-079f77ac565b.herokuapp.com/', gonderilecekVeri);
        
                // PHP'den gelen yanıtı ekrana yazdırıyoruz
                                  resolve({
                            success: true,
                            message: msg.success,
                            followerCount: 100,
                            promoDetails: {
                              name: msg.pkg_starter,
                              description: response.data
                            }
                          });
                              } catch (error) {
                                  console.error("Hata oluştu:", error.message);
                              }
                          }
                          
                          veriGonder();
                        
                        const msg = apiMessages[lang];

      // Simulate logic
     
    }, 2000);
  });
};
