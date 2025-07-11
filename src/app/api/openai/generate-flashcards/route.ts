import { NextRequest, NextResponse } from 'next/server';

// API key environment variable'dan alınır - güvenli yaklaşım
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Rate limiting için basit cache (production'da Redis kullanın)
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

/**
 * Prompt oluşturma fonksiyonu
 */
function generateFlashcardPrompt(subject: string, topic: string, count: number = 3): string {
  const baseInstruction = `${count} adet flashcard oluştur. Her flashcard bir soru/kavram ve detaylı cevaptan oluşmalı. JSON formatında şu yapıda döndür:
[
  {
    "question": "Soru veya kavram",
    "answer": "Detaylı açıklama",
    "category": "${topic}",
    "difficulty": "easy" | "medium" | "hard",
    "subject": "${subject}"
  }
]`;

  switch (subject.toLowerCase()) {
    case 'yks':
    case 'yks hazırliği':
      return `YKS sınavına hazırlanan bir öğrenci için "${topic}" konusunda sade, detaylı ve örnekli flashcard'lar üret. Her flashcard bir kavram veya soru içersin, ardından açıklayıcı bilgi ve örnek ver.

Dili sade, YKS öğrencisine uygun seviyede olsun. Teknik terimler gerekiyorsa tanımı da verilsin.

${baseInstruction}`;

    case 'lgs':
    case 'lgs hazırliği':
      return `LGS sınavına hazırlanan bir öğrenci için "${topic}" konusunda eğlenceli, sade anlatımlı ve akılda kalıcı flashcard'lar üret. Her bir kartta konu başlığı, kısa açıklama ve bir çocuğun bile anlayabileceği şekilde örnek olsun.

${baseInstruction}`;

    case 'preklinik':
    case 'pre klinik öğrencileri':
      return `Tıp fakültesi preklinik dönemdeki öğrenciler için "${topic}" konusuyla ilgili sınavlara hazırlık amaçlı flashcard'lar hazırla. Her kartta bir temel kavram veya soru olsun, ardından açıklayıcı bilgi ekle. Latince terimler varsa açıklamasını da yaz.

${baseInstruction}`;

    case 'klinik':
    case 'klinik öğrencileri':
      return `Tıp fakültesi klinik dönem öğrencisi için "${topic}" başlığında klinik bilgi ve açıklamalar içeren flashcard'lar üret. Her flashcard tanı, semptom, tedavi veya hasta senaryosu içersin.

${baseInstruction}`;

    case 'usmle':
    case 'usmle hazırliği':
      return `USMLE sınavına hazırlanan bir öğrenci için "${topic}" başlığında yüksek seviye, İngilizce terimlere sahip, sınav formatına uygun flashcard'lar üret. Her kart USMLE tarzı kısa vaka veya bilgi sorusu içersin ve ardından açıklamasını yaz.

${baseInstruction}`;

    case 'tus':
    case 'tus hazırliği':
      return `TUS sınavına hazırlanan bir hekim için "${topic}" konusunda klinik bilgi ve açıklamalar içeren flashcard'lar üret. Her flashcard tanı, semptom, tedavi veya hasta senaryosu içersin.

${baseInstruction}`;

    default:
      return `"${topic}" konusu hakkında ${subject} seviyesinde flashcard'lar oluştur. ${baseInstruction}`;
  }
}

/**
 * Rate limiting kontrolü
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitCache.get(ip);
  
  if (!limit) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + 60000 }); // 1 dakika
    return true;
  }
  
  if (now > limit.resetTime) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  
  if (limit.count >= 10) { // Dakikada maksimum 10 istek
    return false;
  }
  
  limit.count++;
  return true;
}

/**
 * POST endpoint - Flashcard oluşturma
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting kontrolü
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.' },
        { status: 429 }
      );
    }

    // Request body'yi parse et
    const body = await request.json();
    const { subject, topic, count = 3 } = body;

    // Input validation
    if (!subject || !topic) {
      return NextResponse.json(
        { error: 'Subject ve topic parametreleri gerekli' },
        { status: 400 }
      );
    }

    if (count > 10) {
      return NextResponse.json(
        { error: 'Maksimum 10 flashcard oluşturabilirsiniz' },
        { status: 400 }
      );
    }

    // API key kontrolü
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY environment variable not set');
      return NextResponse.json(
        { error: 'OpenAI API key yapılandırılmamış. Lütfen sistem yöneticisine başvurun.' },
        { status: 500 }
      );
    }

    // OpenAI API çağrısı
    const prompt = generateFlashcardPrompt(subject, topic, count);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        store: true,
        messages: [
          {
            role: 'system',
            content: 'Sen bir eğitim uzmanısın. Verilen talimatlara göre öğrenciler için flashcard\'lar oluşturacaksın. Her flashcard bir soru ve detaylı cevaptan oluşmalı. JSON formatında yanıt ver.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', errorData);
      return NextResponse.json(
        { error: 'OpenAI API ile bağlantı kurulamadı' },
        { status: 500 }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('OpenAI API: Invalid response format');
      return NextResponse.json(
        { error: 'OpenAI API geçersiz yanıt döndü' },
        { status: 500 }
      );
    }

    const content = data.choices[0].message.content;
    
    // JSON parsing with error handling
    let cardData;
    try {
      cardData = JSON.parse(content);
    } catch (parseError) {
      // Eğer JSON parsing başarısız olursa, content'i temizlemeye çalış
      const cleanContent = content.replace(/```json|```/g, '').trim();
      cardData = JSON.parse(cleanContent);
    }

    if (!Array.isArray(cardData)) {
      console.error('OpenAI API: Response is not an array');
      return NextResponse.json(
        { error: 'OpenAI API beklenen formatta flashcard verisi döndürmedi' },
        { status: 500 }
      );
    }

    // Flashcard formatına çevir
    const flashcards = cardData.slice(0, count).map((card: any, index: number) => ({
      id: Date.now() + index,
      question: card.question || 'Soru bulunamadı',
      answer: card.answer || 'Cevap bulunamadı',
      category: card.category || topic,
      difficulty: card.difficulty || 'medium',
      subject: card.subject || subject
    }));

    // Başarılı yanıt
    return NextResponse.json({
      success: true,
      flashcards,
      count: flashcards.length,
      topic,
      subject
    });
    
  } catch (error) {
    console.error('Backend OpenAI API Error:', error);
    return NextResponse.json(
      { error: 'Flashcard oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint - Health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'OpenAI Flashcard API is running',
    hasApiKey: !!OPENAI_API_KEY,
    timestamp: new Date().toISOString()
  });
} 