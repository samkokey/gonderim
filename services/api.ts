import { PromoResponse, Language } from '../types';
import { apiMessages } from '../translations';

// ------------------------------------------------------------------
// AYARLAR (CONFIGURATION)
// ------------------------------------------------------------------

// LÜTFEN DİKKAT: Buraya PHP dosyanızın tam adresini yazın.
// Örnek: 'https://mysite.com/api/process.php'
const API_ENDPOINT = 'https://samtest-079f77ac565b.herokuapp.com/index.php';

// ------------------------------------------------------------------

/**
 * Sends the username and code to a remote PHP server via POST.
 */
export const redeemPromoCode = async (username: string, code: string, lang: Language): Promise<PromoResponse> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 saniye zaman aşımı

    // PHP'nin $_POST ile okuyabilmesi için veriyi form formatına çeviriyoruz
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('code', code.trim());
    formData.append('lang', lang);

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        // Bu header sayesinde PHP tarafında $_POST['username'] çalışır.
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      signal: controller.signal,
      body: formData.toString(),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // HTTP hatası (404, 500 vb.)
      console.error(`Server Error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Sunucudan JSON yanıtı bekle
    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message || apiMessages[lang].success,
        followerCount: data.followerCount || 0,
        promoDetails: {
          name: data.packageName || apiMessages[lang].pkg_starter,
          description: data.description || apiMessages[lang].desc_starter
        }
      };
    } else {
      return {
        success: false,
        message: data.message || apiMessages[lang].invalid
      };
    }

  } catch (error) {
    console.error('API Request Failed:', error);
    
    if (error instanceof Error) {
        console.error("Error details:", error.message);
    }

    return {
      success: false,
      message: apiMessages[lang].error
    };
  }
};
