'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  VideoCameraIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    id: 1,
    icon: VideoCameraIcon,
    title: 'Video Ders Kütüphanesi',
    description: 'Koçlarınızın hazırlamış olduğu 100+ detaylı video ders ile interaktif öğrenme deneyimi',
    stats: '100+ Video Ders',
    gradient: 'from-teal-50 to-cyan-50',
    hoverGradient: 'from-teal-100 to-cyan-100',
    iconColor: 'text-teal-600'
  },
  {
    id: 2,
    icon: SparklesIcon,
    title: 'Flashcard Üretici',
    description: 'Tıp terimlerini kartlıklarla ve akıllı tekrar algoritması ile öğrenin',
    stats: '200+ Tıp Terimi',
    gradient: 'from-pink-50 to-rose-50',
    hoverGradient: 'from-pink-100 to-rose-100',
    iconColor: 'text-pink-600'
  },
  {
    id: 3,
    icon: SpeakerWaveIcon,
    title: 'Podcast Oluşturucu',
    description: 'Ders notlarınızı Al sesli podcast formatına çevirin ve müzik dinler gibi öğrenmeye devam edin',
    stats: 'Yakında',
    gradient: 'from-purple-50 to-violet-50',
    hoverGradient: 'from-purple-100 to-violet-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 4,
    icon: UserGroupIcon,
    title: 'Ortak Ders Çalışma',
    description: 'Türkiye genelinden tıp öğrencileriyle canlı çalışma odalarında buluşun ve birlikte öğrenin',
    stats: '7/24 Canlı Odalar',
    gradient: 'from-emerald-50 to-green-50',
    hoverGradient: 'from-emerald-100 to-green-100',
    iconColor: 'text-emerald-600'
  },
  {
    id: 5,
    icon: ChatBubbleBottomCenterTextIcon,
    title: 'Uzman Koç Görüşmeleri',
    description: 'Deneyimli koçlarla bire bir mentorluk seansları ile hem okul hem kariyer planlaması yapın',
    stats: 'Kişisel Mentorluk',
    gradient: 'from-indigo-50 to-blue-50',
    hoverGradient: 'from-indigo-100 to-blue-100',
    iconColor: 'text-indigo-600'
  },
  {
    id: 6,
    icon: ChartBarIcon,
    title: 'Detaylı Takip',
    description: 'Koçlar ve Öğrencilere özel panel ile sorunsuz iletişim ve kaçınılmaz gelişim',
    stats: 'Detaylı Analytics',
    gradient: 'from-orange-50 to-amber-50',
    hoverGradient: 'from-orange-100 to-amber-100',
    iconColor: 'text-orange-600'
  }
];

export default function FeatureCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(143, 219, 214, 0.9) 0%, rgba(143, 219, 214, 0.95) 50%, rgba(143, 219, 214, 0.85) 100%)' }}>
      {/* Clean Background Pattern - responsive */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-bl from-cyan-200 to-teal-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-gray-900 font-['Poppins'] mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 bg-clip-text text-transparent">
                Yapay Zeka Destekli
              </span>
              <br />
              <span className="text-gray-800">Özelliklerimiz</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-4 sm:px-0">
              Modern teknoloji ile tıp eğitimini buluşturan yenilikçi çözümlerimizi keşfedin
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Oval Card Container - mobile responsive */}
              <div className={`relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${feature.gradient} hover:bg-gradient-to-br group-hover:${feature.hoverGradient} border border-white/60 shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm h-full`}>
                
                {/* Stats Badge - responsive */}
                <div className="absolute -top-2 sm:-top-3 right-3 sm:right-6">
                  <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-white text-gray-800 shadow-md border border-gray-200/50">
                    {feature.stats}
                  </span>
                </div>

                {/* Icon Container - responsive */}
                <div className="mb-4 sm:mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl sm:rounded-3xl bg-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <feature.icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${feature.iconColor}`} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content - responsive spacing */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Simple Action Button - responsive */}
                  <div className="pt-3 sm:pt-4">
                    <button className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800 hover:text-gray-900 transition-colors duration-200">
                      <span>{feature.id === 3 ? 'Yakında' : 'Kullanmak için kayıt ol'}</span>
                      {feature.id !== 3 && (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Subtle Hover Effect - responsive */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section - mobile responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center px-4 sm:px-0"
        >
          <button className="inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 text-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
            <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
            <span className="font-semibold text-sm sm:text-base lg:text-lg whitespace-nowrap">Tüm özellikleri ücretsiz keşfedin</span>
            <SparklesIcon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
          </button>
        </motion.div>
      </div>
    </section>
  );
} 