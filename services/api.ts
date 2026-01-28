import { PromoResponse, Language } from '../types';
import { apiMessages } from '../translations';

// TODO: Bu URL'i kendi PHP dosyanızın adresiyle değiştirin.
// Örnek: 'https://orneksite.com/api/kontrol.php'
const API_ENDPOINT = 'https://samtest-079f77ac565b.herokuapp.com/index.php';

/**
 * Sends the username and code to a remote PHP server via POST.
 */
export const redeemPromoCode = async (username: string, code: string, lang: Language): Promise<PromoResponse> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // PHP tarafında veriyi: $data = json_decode(file_get_contents('php://input'), true); ile alabilirsiniz.
      body: JSON.stringify({ 
        username: username, 
        code: code.trim(),
        lang: lang 
      }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`);
    }

    const data = await response.json();

    // PHP'den dönen yanıtı işle
    // Beklenen PHP yanıt formatı (Örnek):
    // { "success": true, "message": "İşlem Başarılı", "followerCount": 100, "packageName": "Start", "description": "..." }
    
     return {
        success: true,
        message: data.message || apiMessages[lang].success
      };

  } catch (error) {
    console.error('API Request Failed:', error);
    
    // Ağ hatası veya CORS hatası durumunda kullanıcıya genel hata mesajını göster
    return {
      success: false,
      message: apiMessages[lang].error
    };
  }
};
