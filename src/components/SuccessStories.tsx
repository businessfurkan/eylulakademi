'use client';

import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

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
    <section id="success-stories" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden" style={{ backgroundColor: '#af2e3d' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm sm:text-base font-semibold leading-7 text-white/90">Başarı Hikayeleri</h2>
            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-poppins px-4 sm:px-0">
              Eylül Büyükkaya Akademisi ile hedeflerine ulaşan öğrencilerimizin deneyimleri
            </p>
          </motion.div>
        </div>

        <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-x-4 mb-6">
                <div className="relative">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-[#af2e3d] to-[#d63384] flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{testimonial.university}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a
            href="/student-registration"
            className="inline-flex items-center gap-2 bg-white text-[#af2e3d] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>Sen de aramıza katıl</span>
            <ArrowRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
} 