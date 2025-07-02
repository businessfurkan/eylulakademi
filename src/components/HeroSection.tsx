'use client';

import { motion } from 'framer-motion';
import { PlayIcon, AcademicCapIcon, BeakerIcon, HeartIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center pt-20 overflow-hidden">
      {/* Medical Pattern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* DNA Helix Pattern */}
        <div className="absolute top-20 right-10 w-96 h-96 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M50,50 Q100,25 150,50 T250,50" stroke="#1e40af" strokeWidth="2" fill="none" className="animate-pulse"/>
            <path d="M50,80 Q100,55 150,80 T250,80" stroke="#3b82f6" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <path d="M50,110 Q100,85 150,110 T250,110" stroke="#60a5fa" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
          </svg>
        </div>
        
        {/* Medical Cross Pattern */}
        <div className="absolute bottom-20 left-10 w-80 h-80 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="40" y="20" width="20" height="60" fill="#1e40af"/>
            <rect x="20" y="40" width="60" height="20" fill="#3b82f6"/>
          </svg>
        </div>

        {/* Floating Medical Icons */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-blue-200/30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <HeartIcon className="w-16 h-16" />
        </motion.div>
        
        <motion.div
          className="absolute top-2/3 right-1/3 text-indigo-200/30"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <BeakerIcon className="w-12 h-12" />
        </motion.div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <span className="inline-flex items-center rounded-full bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700 ring-2 ring-blue-200/50 shadow-lg backdrop-blur-sm">
              <AcademicCapIcon className="h-4 w-4 mr-2 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent font-bold">
                Türkiye'nin İlk AI Destekli Tıp Akademisi
              </span>
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 leading-tight">
              <span className="block text-slate-800 mb-2">
                Tıpta Başarının
              </span>
                             <span 
                 className="block bg-clip-text text-transparent mb-2 relative"
                 style={{
                   background: 'linear-gradient(to right, #19b59b, #19a0b5, #1c8c85)',
                   WebkitBackgroundClip: 'text',
                   backgroundClip: 'text'
                 }}
               >
                 Yeni Adresi
                {/* Medical Symbol */}
                <motion.div
                  className="absolute -top-4 -right-8 w-8 h-8 text-blue-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ⚕️
                </motion.div>
              </span>
              <span className="block text-slate-700 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-4">
                Eylül Büyükkaya Akademi
              </span>
            </h1>
          </motion.div>
          
                     {/* Subtitle */}
           <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="mx-auto max-w-3xl text-xl leading-8 text-slate-600 mb-10"
           >
             <span 
               className="font-bold bg-clip-text text-transparent"
               style={{
                 background: 'linear-gradient(to right, #19b59b, #19a0b5, #1c8c85)',
                 WebkitBackgroundClip: 'text',
                 backgroundClip: 'text'
               }}
             >
               YKS'den tıp fakültesine
             </span>, tıp fakültesinden{' '}
             <span 
               className="font-bold bg-clip-text text-transparent"
               style={{
                 background: 'linear-gradient(to right, #19b59b, #19a0b5, #1c8c85)',
                 WebkitBackgroundClip: 'text',
                 backgroundClip: 'text'
               }}
             >
               başarılı bir hekimliğe
             </span>{' '}
             kadar her daim yanınızdayız.
           </motion.p>
          
                                {/* Stats */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
           >
             <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
               <div 
                 className="text-3xl font-black mb-2 bg-clip-text text-transparent"
                 style={{
                   background: 'linear-gradient(to right, #19b59b, #19a0b5, #1c8c85)',
                   WebkitBackgroundClip: 'text',
                   backgroundClip: 'text'
                 }}
               >
                 300+
               </div>
               <div className="text-sm font-semibold text-slate-600">Başarılı öğrenci</div>
             </div>
             <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-indigo-100">
               <div 
                 className="text-3xl font-black mb-2 bg-clip-text text-transparent"
                 style={{
                   background: 'linear-gradient(to right, #19b59b, #19a0b5, #1c8c85)',
                   WebkitBackgroundClip: 'text',
                   backgroundClip: 'text'
                 }}
               >
                 %97
               </div>
               <div className="text-sm font-semibold text-slate-600">Başarı Oranı</div>
             </div>
             <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
               <div className="text-3xl font-black text-blue-600 mb-2">🎯</div>
               <div className="text-sm font-semibold text-slate-600">Uzman Desteği</div>
             </div>
           </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.a
              href="#"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <BeakerIcon className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Ücretsiz Deneme Başlat</span>
            </motion.a>
            
            <motion.a
              href="#"
              className="group flex items-center text-lg font-semibold leading-6 text-slate-700 hover:text-blue-600 transition-all duration-300 px-6 py-4 rounded-2xl hover:bg-white/50 border border-transparent hover:border-blue-200/50 w-full sm:w-auto justify-center sm:justify-start"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mr-3 p-2 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all duration-300">
                <PlayIcon className="h-6 w-6 text-blue-600" />
              </div>
              <span>Tanıtım Videosunu İzle</span>
            </motion.a>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: '🧠', title: 'AI Öğrenme', desc: 'Kişiselleştirilmiş AI' },
              { icon: '📊', title: 'Analitik', desc: 'Detaylı performans' },
              { icon: '🎯', title: 'Hedef Odaklı', desc: 'Sınav başarısı' },
              { icon: '👨‍⚕️', title: 'Uzman Kadro', desc: 'Deneyimli eğitmenler' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30 hover:bg-white/80 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 