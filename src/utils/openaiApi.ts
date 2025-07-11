// OpenAI API entegrasyonu için utility fonksiyonları - GÜVENLİ BACKEND PROXY YAKLAŞIMI

export interface FlashcardRequest {
  subject: string;
  topic: string;
  count?: number;
}

export interface FlashcardResponse {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
}

/**
 * GÜVENLİ YAKLAŞIM: Backend proxy üzerinden flashcard oluşturma
 * API key backend'de environment variable olarak saklanır
 * Frontend sadece güvenli backend endpoint'ini çağırır
 */
export const generateFlashcardsWithOpenAI = async (
  request: FlashcardRequest
): Promise<FlashcardResponse[]> => {
  const { subject, topic, count = 3 } = request;
  
  try {
    console.log(`🚀 Güvenli API endpoint çağrısı: subject="${subject}", topic="${topic}"`);
    
    // Backend proxy endpoint'ine güvenli istek gönder
    const response = await fetch('/api/openai/generate-flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        topic,
        count
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Backend API Error: ${response.status} - ${errorData.error || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success || !data.flashcards) {
      throw new Error('Backend API: Geçersiz yanıt formatı');
    }

    console.log(`✅ ${data.flashcards.length} flashcard başarıyla oluşturuldu`);
    return data.flashcards;
    
  } catch (error) {
    console.error('Güvenli API çağrısı hatası:', error);
    
    // Hata durumunda örnek flashcard döndür
    return [
      {
        id: Date.now(),
        question: `${topic} - Geçici Soru (API Hatası)`,
        answer: 'API bağlantısında sorun oluştu. Lütfen daha sonra tekrar deneyin veya internet bağlantınızı kontrol edin.',
        category: topic,
        difficulty: 'medium',
        subject: subject
      }
    ];
  }
};

/**
 * Backend API sağlığını kontrol et
 */
export const validateOpenAIKey = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/openai/generate-flashcards', {
      method: 'GET'
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.hasApiKey === true;
    }
    
    return false;
  } catch (error) {
    console.error('API key validation error:', error);
    return false;
  }
};

/**
 * API kullanım istatistikleri
 */
export const getApiUsageStats = () => {
  const stats = JSON.parse(localStorage.getItem('openai_usage_stats') || '{"todayUsage": 0, "totalUsage": 0, "lastUsageDate": ""}');
  const today = new Date().toDateString();
  
  if (stats.lastUsageDate !== today) {
    stats.todayUsage = 0;
  }
  
  return stats;
};

/**
 * API kullanımını logla
 */
export const logApiUsage = () => {
  const stats = getApiUsageStats();
  const today = new Date().toDateString();
  
  stats.todayUsage += 1;
  stats.totalUsage += 1;
  stats.lastUsageDate = today;
  
  localStorage.setItem('openai_usage_stats', JSON.stringify(stats));
};

/**
 * Güvenlik ve debug bilgileri
 */
export const debugOpenAIIntegration = () => {
  console.log('🔒 GÜVENLİK: API key backend\'de saklı');
  console.log('✅ Frontend sadece proxy endpoint kullanıyor');
  console.log('🛡️ Production-ready güvenli yapı aktif');
}; 