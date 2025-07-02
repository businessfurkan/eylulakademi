'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

const testimonials = [
  {
    name: 'Eylül Kaya',
    university: 'Hacettepe Üniversitesi Tıp Fakültesi',
    year: '2024',
    score: 'TYT: 540, AYT: 520',
    image: 'E',
    content: 'Eylül Büyükkaya Akademisi\'nin AI destekli çalışma planı sayesinde hedeflediğim tıp fakültesine yerleştim. Özellikle kişiselleştirilmiş program çok faydalıydı.',
    rating: 5
  },
  {
    name: 'Mehmet Özkan',
    university: 'İstanbul Üniversitesi Tıp Fakültesi',
    year: '2024',
    score: '3. Sınıf Öğrencisi',
    image: 'M',
    content: 'AI flashcard üretici sayesinde anatomi ve fizyoloji derslerinde çok daha etkili çalışıyorum. Podcast özelliği de yolda çalışmak için harika.',
    rating: 5
  },
  {
    name: 'Zeynep Demir',
    university: 'Ankara Üniversitesi Tıp Fakültesi',
    year: '2023',
    score: 'TYT: 535, AYT: 515',
    image: 'Z',
    content: 'Video dersler çok kaliteli ve anlaşılır. Canlı soru çözüm seansları sayesinde eksik olduğum konuları hızla kapattım.',
    rating: 5
  }
];

export default function SuccessStories() {
  return (
    <section id="success-stories" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(143, 219, 214, 0.9) 0%, rgba(143, 219, 214, 0.95) 50%, rgba(143, 219, 214, 0.85) 100%)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm sm:text-base font-semibold leading-7 text-purple-600">Başarı Hikayeleri</h2>
            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-poppins px-4 sm:px-0">
              Eylül Büyükkaya Akademisi ile hedeflerine ulaşan öğrencilerimizin deneyimleri
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col group"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-pink-100/50 hover:shadow-2xl hover:border-pink-200/50 transition-all duration-500 hover:-translate-y-2 h-full relative overflow-hidden group-hover:bg-white/98">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center text-white font-bold text-base sm:text-lg lg:text-xl mr-3 sm:mr-4 shadow-lg flex-shrink-0">
                      {testimonial.image}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center mb-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <StarIcon key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">{testimonial.year}</p>
                    </div>
                  </div>

                  <blockquote className="text-gray-700 mb-4 sm:mb-6 flex-grow text-sm sm:text-base leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="border-t border-pink-100 pt-4 sm:pt-6">
                    <p className="font-semibold text-gray-900 font-poppins text-base sm:text-lg">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-purple-600 font-medium mt-1 truncate">{testimonial.university}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{testimonial.score}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 