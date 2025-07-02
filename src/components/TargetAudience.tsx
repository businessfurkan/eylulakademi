'use client';

import { motion } from 'framer-motion';
import { 
  BookOpenIcon, 
  UserIcon,
  CheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const pathways = [
  {
    title: 'YKS ile Tıp Fakültesi Hedefleyenler',
    subtitle: 'Lise öğrencileri için YKS\'de başarı garantisi!',
    icon: BookOpenIcon,
    color: 'from-pink-500 to-rose-500',
    features: [
      'AI destekli kişiselleştirilmiş çalışma planı',
      'Video ders kütüphanesi (TYT-AYT)',
      'Haftalık canlı soru çözüm seansları',
      'İlerleme takip sistemi'
    ],
    cta: 'YKS Hazırlığına Başla',
    ctaHref: '#yks-prep'
  },
  {
    title: 'Tıp Fakültesi Öğrencileri',
    subtitle: 'Tıp öğrencileri için AI destekli öğrenme araçları',
    icon: UserIcon,
    color: 'from-purple-500 to-indigo-500',
    features: [
      'AI Flashcard üretici',
      'Podcast oluşturucu',
      'Ortak ders çalışma odası',
      'Koç-Öğrenci görüşme sistemi'
    ],
    cta: 'Tıp Eğitimine Katıl',
    ctaHref: '#medical-training'
  }
];

export default function TargetAudience() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(143, 219, 214, 0.9) 0%, rgba(143, 219, 214, 0.95) 50%, rgba(143, 219, 214, 0.85) 100%)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm sm:text-base font-semibold leading-7 text-pink-600">Hangi Yoldasın?</h2>
            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-poppins px-4 sm:px-0">
              Hedefinize göre özel hazırlanmış eğitim programlarımızla başarıya ulaş
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {pathways.map((pathway, index) => (
            <motion.div
              key={pathway.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-pink-100/50 hover:shadow-2xl hover:border-pink-200/50 transition-all duration-500 hover:-translate-y-2 h-full relative overflow-hidden group-hover:bg-white/98">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start mb-4 sm:mb-6">
                    <div className={`inline-flex p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${pathway.color} shadow-lg`}>
                      <pathway.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 font-poppins">
                    {pathway.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                    {pathway.subtitle}
                  </p>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {pathway.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={pathway.ctaHref}
                    className={`inline-flex items-center justify-center w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-xl sm:rounded-2xl bg-gradient-to-r ${pathway.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group/btn`}
                  >
                    <span className="whitespace-nowrap">{pathway.cta}</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover/btn:translate-x-1 flex-shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 