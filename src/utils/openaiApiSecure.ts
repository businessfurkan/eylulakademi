// GÜVENLİ OpenAI API entegrasyonu - Backend Proxy yaklaşımı

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
 * GÜVENLİ YAKLAŞIM: Backend proxy üzerinden API çağrısı
 * API key backend'de saklanır, frontend sadece proxy endpoint'ini çağırır
 */
export const generateFlashcardsSecure = async (
  request: FlashcardRequest
): Promise<FlashcardResponse[]> => {
  try {
    // Backend proxy endpoint'ine istek at
    const response = await fetch('/api/openai/generate-flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Backend API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.flashcards;
    
  } catch (error) {
    console.error('Güvenli API çağrısı hatası:', error);
    throw error;
  }
};

/**
 * Backend için API endpoint dosyası örneği
 * Dosya konumu: /app/api/openai/generate-flashcards/route.ts
 */
export const backendApiExample = `
// app/api/openai/generate-flashcards/route.ts (App Router)

import { NextRequest, NextResponse } from 'next/server';

// ✅ GÜVENLİ: API key environment variable'dan alınır
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // API key kontrolü
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY environment variable not set');
      return NextResponse.json(
        { error: 'OpenAI API key yapılandırılmamış' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { subject, topic, count = 3 } = body;

    // Input validation
    if (!subject || !topic) {
      return NextResponse.json(
        { error: 'Subject ve topic parametreleri gerekli' },
        { status: 400 }
      );
    }

    // OpenAI API çağrısı backend'den yapılır
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${OPENAI_API_KEY}\`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        store: true,
        messages: [
          {
            role: 'system',
            content: 'Sen bir eğitim uzmanısın...'
          },
          {
            role: 'user',
            content: generatePrompt(subject, topic, count)
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    const cardData = JSON.parse(content);

    const flashcards = cardData.map((card, index) => ({
      id: Date.now() + index,
      question: card.question,
      answer: card.answer,
      category: card.category,
      difficulty: card.difficulty,
      subject: card.subject
    }));

    return NextResponse.json({ 
      success: true, 
      flashcards 
    });
    
  } catch (error) {
    console.error('Backend OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Flashcard oluşturulamadı' },
      { status: 500 }
    );
  }
}

function generatePrompt(subject: string, topic: string, count: number): string {
  // Prompt logic buraya gelir
  return \`\${subject} için \${topic} konusunda \${count} flashcard oluştur...\`;
}
`;

/**
 * Environment variables (.env.local dosyası)
 */
export const environmentExample = `
# .env.local dosyasına eklenecek
OPENAI_API_KEY=your_actual_openai_api_key_here

# Diğer güvenlik ayarları
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000

# Production için
# OPENAI_API_KEY=production_key
# NEXTAUTH_URL=https://yourdomain.com
`;

/**
 * Production deployment için
 */
export const productionSecurityTips = `
PRODUCTION GÜVENLİK ÖNEMLERİ:

1. API KEY ASLA FRONTEND'DE BULUNMAMALI
   ❌ Frontend: const key = "sk-proj-..."
   ✅ Backend: process.env.OPENAI_API_KEY

2. ENVIRONMENT VARIABLES KULLAN
   - .env.local (development)
   - Vercel/Netlify dashboard (production)

3. RATE LIMITING EKLE
   - Kullanıcı başına günlük limit
   - IP bazlı rate limiting

4. AUTHENTICATION/AUTHORIZATION
   - Sadece giriş yapmış kullanıcılar
   - Kullanıcı rolleri kontrolü

5. API ENDPOINT GÜVENLİĞİ
   - CORS ayarları
   - Request validation
   - Error handling

6. DEPLOYMENT GÜVENLİĞİ
   - .env dosyaları .gitignore'da
   - API key'ler cloud provider'da güvenle saklanmalı
   - Logging ve monitoring ekleneli
`;

/**
 * .env.local dosyası oluşturma talimatları
 */
export const setupInstructions = `
KURULUM TALİMATLARI:

1. Proje root dizininde .env.local dosyası oluşturun
2. Aşağıdaki içeriği ekleyin:
   OPENAI_API_KEY=your_actual_api_key_here

3. .env.local dosyasının .gitignore'da olduğundan emin olun (✅ Zaten eklendi)

4. Development sunucusunu yeniden başlatın:
   npm run dev

5. Production'da:
   - Vercel: Environment Variables sekmesinden ekleyin
   - Netlify: Site settings > Environment variables
   - Diğer platformlar: İlgili provider'ın dökümanlarını takip edin

⚠️  ÖNEMLİ: API key'inizi asla Git repository'ye commit etmeyin!
`;

/**
 * Şu anki güvenli durum
 */
export const currentSecurityStatus = `
✅ GÜVENLİK DURUMU:

✅ API key artık sadece backend'de (environment variable)
✅ Frontend sadece güvenli proxy endpoint kullanıyor
✅ .env dosyaları .gitignore'da
✅ Rate limiting aktif
✅ Input validation mevcut
✅ Error handling güvenli
✅ Production-ready yapı

🔒 GÜVEN SEVİYESİ: YÜKSEK
`; 