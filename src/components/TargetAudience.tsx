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
    color: 'from-[#af2e3d] to-[#c41e3a]',
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
    color: 'from-[#d63384] to-[#e91e63]',
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
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm sm:text-base font-semibold leading-7 text-[#af2e3d]">Hangi Yoldasın?</h2>
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
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:border-red-200 transition-all duration-500 hover:-translate-y-3 h-full relative overflow-hidden group-hover:bg-white group-hover:shadow-[0_20px_60px_rgba(175,46,61,0.15)]">
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/40 via-transparent to-pink-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start mb-4 sm:mb-6">
                    <div className={`inline-flex p-2.5 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${pathway.color} shadow-2xl ring-1 ring-white/20 group-hover:shadow-[0_10px_30px_rgba(175,46,61,0.4)] transition-all duration-300`}>
                      <pathway.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white drop-shadow-sm" />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 font-poppins drop-shadow-sm">
                    {pathway.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg font-medium">
                    {pathway.subtitle}
                  </p>

                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {pathway.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 sm:mr-3 mt-0.5 flex-shrink-0 drop-shadow-sm" />
                        <span className="text-gray-800 text-sm sm:text-base font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={pathway.ctaHref}
                    className={`inline-flex items-center justify-center w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white rounded-xl sm:rounded-2xl bg-gradient-to-r ${pathway.color} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group/btn ring-1 ring-white/20 hover:shadow-[0_15px_40px_rgba(175,46,61,0.3)]`}
                  >
                    <span className="whitespace-nowrap drop-shadow-sm">{pathway.cta}</span>
                    <ArrowRightIcon className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover/btn:translate-x-1 flex-shrink-0 drop-shadow-sm" />
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