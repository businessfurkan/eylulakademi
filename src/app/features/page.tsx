'use client';

import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  SparklesIcon, 
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BeakerIcon,
  LightBulbIcon,
  ClockIcon,
  GlobeAltIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const panelFeatures = [
  {
    id: "coach-panel",
    title: "Koç Paneli",
    subtitle: "Eğitim koçları için özel tasarlanmış panel",
    description: "Koçların öğrencilerini etkin şekilde yönetebileceği, ilerlemeyi takip edebileceği ve rehberlik yapabileceği kapsamlı yönetim sistemi.",
    icon: AcademicCapIcon,
    details: [
      "Öğrenci takvimleri yönetimi",
      "Bire bir görüşme planlaması", 
      "Öğrenci ilerleme takibi",
      "Eğitim materyali paylaşımı",
      "Detaylı raporlama sistemi"
    ],
    gradient: "from-white via-[#349e97] to-white",
    bgGradient: "from-white via-[#349e97]/5 to-white",
    buttonGradient: "from-[#349e97] to-[#2a7f77]"
  },
  {
    id: "student-panel", 
    title: "Öğrenci Paneli",
    subtitle: "Tıp öğrencileri için kişiselleştirilmiş öğrenme deneyimi",
    description: "Öğrencilerin tüm eğitim sürecini yönetebileceği, hedeflerini takip edebileceği ve AI destekli araçlarla öğrenebileceği özel platform.",
    icon: UserGroupIcon,
    details: [
      "Kişisel ders takvimi",
      "Hedef belirleme ve takip",
      "Günlük çalışma kayıtları", 
      "AI destekli araçlar",
      "Motivasyon ve ilerleme takibi"
    ],
    gradient: "from-white via-[#349e97] to-white",
    bgGradient: "from-white via-[#349e97]/5 to-white",
    buttonGradient: "from-[#349e97] to-[#2a7f77]"
  }
];

const features = [
  {
    id: 1,
    title: "Video Ders Kütüphanesi",
    subtitle: "TYT-AYT & Tıp Eğitimi",
    description: "Kapsamlı video ders koleksiyonumuzla YKS'den tıp fakültesine kadar her adımda yanınızdayız.",
    icon: PlayIcon,
    stats: "500+ Video Ders",
    details: [
      "TYT ve AYT tüm dersler için kapsamlı video içeriği",
      "Tıp fakültesi müfredatına uygun özel dersler", 
      "Uzman eğitmenler tarafından hazırlanmış kaliteli içerik",
      "HD kalitede görsel destekli anlatımlar",
      "İstediğiniz zaman erişim imkanı"
    ],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "AI Flashcard Üretici",
    subtitle: "Akıllı Öğrenme Kartları",
    description: "Yapay zeka teknolojisiyle özelleştirilmiş flashcard'lar oluşturun ve etkili şekilde öğrenin.",
    icon: SparklesIcon,
    stats: "200+ Tıp Terimi",
    details: [
      "AI destekli otomatik flashcard oluşturma",
      "Tıbbi terimlere özel görsel destekli kartlar",
      "Kişiselleştirilmiş öğrenme algoritması",
      "Unutma eğrisine göre tekrar sistemi",
      "İlerleme takibi ve analiz raporları"
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Podcast Oluşturucu",
    subtitle: "Hareket Halinde Öğrenme",
    description: "Ders notlarınızı podcast formatına dönüştürerek her an her yerde öğrenme fırsatı yakalayın.",
    icon: ChatBubbleBottomCenterTextIcon,
    stats: "Sınırsız Podcast",
    details: [
      "Ders notlarından otomatik podcast üretimi",
      "Doğal ses teknolojisi ile akıcı anlatım",
      "Çoklu hız seçenekleri (0.5x - 2x)",
      "Offline dinleme imkanı",
      "Özel konular için özelleştirilebilir içerik"
    ],
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 4,
    title: "Ortak Ders Çalışma Odaları",
    subtitle: "Sosyal Öğrenme",
    description: "Aynı hedeflere odaklanan arkadaşlarınızla birlikte çalışın ve motivasyonunuzu artırın.",
    icon: UserGroupIcon,
    stats: "7/24 Canlı Odalar",
    details: [
      "Konuya göre ayrılmış çalışma odaları",
      "Sesli ve görüntülü etkileşim imkanı",
      "Whiteboard ve not paylaşım araçları",
      "Moderatör eşliğinde rehberlik",
      "Çalışma saatleri takip sistemi"
    ],
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    title: "Uzman Koç Görüşmeleri",
    subtitle: "Kişisel Mentorluk",
    description: "Deneyimli mentorlarımızla birebir görüşmeler yaparak kariyerinizi planlayın.",
    icon: AcademicCapIcon,
    stats: "Kişisel Mentorluk",
    details: [
      "Tıp alanında uzman mentorlarla birebir görüşme",
      "Kariyer planlama ve hedef belirleme",
      "Kişiselleştirilmiş çalışma programı",
      "Motivasyon ve stres yönetimi desteği",
      "Düzenli ilerleme değerlendirmeleri"
    ],
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    title: "İlerleme Takibi",
    subtitle: "Detaylı Analytics",
    description: "Öğrenme sürecinizi analiz edin ve güçlü-zayıf yönlerinizi keşfedin.",
    icon: ChartBarIcon,
    stats: "Detaylı Analytics",
    details: [
      "Günlük, haftalık, aylık ilerleme raporları",
      "Konu bazında başarı analizi",
      "Çalışma süresi ve verimlilik ölçümü",
      "Güçlü ve geliştirilmesi gereken alanlar",
      "Hedef belirleme ve takip sistemi"
    ],
    gradient: "from-teal-500 to-cyan-500"
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#8fdbd6' }}>
      {/* Header - mobile responsive */}
      <div className="relative pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-[#349e97] hover:text-[#2a7f77] transition-colors duration-300"
            >
              <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-medium text-sm sm:text-base">Ana Sayfaya Dön</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center rounded-full bg-white/80 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-[#349e97] ring-1 ring-inset ring-[#349e97]/20 shadow-lg backdrop-blur-sm">
                <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                <span className="font-semibold">AI Destekli Eğitim Platformu</span>
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight font-['Poppins'] leading-tight mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-[#349e97] via-white to-[#349e97] bg-clip-text text-transparent block mb-1 sm:mb-2">
                Özellikler
              </span>
            </h1>
            
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-6 sm:leading-7 lg:leading-8 text-gray-700 max-w-3xl mx-auto px-4 sm:px-0">
              Tıp eğitiminde devrim yaratan <span className="text-[#349e97] font-semibold">yapay zeka destekli özelliklerimizi</span> keşfedin. 
              Her özellik, <span className="text-[#349e97] font-semibold">başarıya giden yolculuğunuzda</span> size rehberlik etmek için tasarlandı.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Panel Features - Special Section */}
      <div className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-[#349e97]">Özel Paneller</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Koçlar ve öğrenciler için özel tasarlanmış yönetim panelleri
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {panelFeatures.map((panel, index) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group relative"
              >
                <div className={`relative bg-gradient-to-br ${panel.bgGradient} backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/30 overflow-hidden`}>
                  {/* Special Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 rounded-2xl"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
                  
                  {/* Special Icon */}
                  <div className="relative z-10 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${panel.buttonGradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <panel.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#349e97] transition-colors duration-300">
                        {panel.title}
                      </h3>
                      <p className="text-sm font-medium text-[#349e97] mb-3">
                        {panel.subtitle}
                      </p>
                    </div>

                    <p className="text-gray-700 mb-5 leading-relaxed text-sm">
                      {panel.description}
                    </p>

                    {/* Panel Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center text-sm">
                        <LightBulbIcon className="h-4 w-4 text-[#349e97] mr-2" />
                        Temel Özellikler:
                      </h4>
                      <ul className="space-y-2">
                        {panel.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#349e97] to-teal-500 mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                            <span className="text-gray-700 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Special CTA Button */}
                    <div className="mt-6">
                      <button className={`w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r ${panel.buttonGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group-hover:shadow-[#349e97]/25`}>
                        <SparklesIcon className="h-4 w-4 mr-2" />
                        Paneli Keşfet
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Regular Features Grid */}
      <div className="pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-[#349e97]">AI Destekli Özellikler</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yapay zeka teknolojileri ile güçlendirilmiş eğitim araçları
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] border border-white/20">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-white/30 rounded-3xl"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#349e97] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm font-medium text-[#349e97] mb-2">
                        {feature.subtitle}
                      </p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#349e97]/10 text-[#349e97] text-sm font-medium">
                        <GlobeAltIcon className="h-4 w-4 mr-1" />
                        {feature.stats}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <LightBulbIcon className="h-5 w-5 text-[#349e97] mr-2" />
                        Öne Çıkan Özellikler:
                      </h4>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-[#349e97] mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8">
                      <button className={`w-full inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:shadow-2xl`}>
                        <BeakerIcon className="h-5 w-5 mr-2" />
                        Ücretsiz Deneyin
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Hemen <span className="text-[#349e97]">Başlayın</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Tüm özelliklerimizi ücretsiz deneyebilir, tıp eğitiminde fark yaratmaya hemen başlayabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#349e97] to-teal-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                Ücretsiz Denemeye Başla
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[#349e97] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#349e97]/20"
              >
                <ClockIcon className="h-5 w-5 mr-2" />
                Detaylı Bilgi
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 