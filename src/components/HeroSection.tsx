'use client';

import { motion } from 'framer-motion';
import { PlayIcon, AcademicCapIcon, BeakerIcon, HeartIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#af2e3d] via-[#af2e3d] to-[#af2e3d] flex items-center pt-20 overflow-hidden">
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
          {/* Minimalist Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-sm">
              <span className="text-sm font-semibold text-white">
                Türkiye'nin En Kapsamlı Tıp Akademisi
              </span>
            </div>
          </motion.div>
          
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              <span className="block text-white mb-2">
                Tıp'ta Başarının
              </span>
                             <span 
                 className="block bg-clip-text text-transparent mb-2 relative"
                 style={{
                   background: 'linear-gradient(to right, #ffffff, #f8fafc, #ffffff)',
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
              <motion.span 
                className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mt-6 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              >
                {/* Main gradient text */}
                <span 
                  className="bg-clip-text text-transparent drop-shadow-2xl relative z-10"
                  style={{
                    background: 'linear-gradient(45deg, #ffffff 0%, #ffe0e6 25%, #ffb3c6 50%, #ffffff 75%, #f8fafc 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
                  }}
                >
                  Eylül Büyükkaya Akademi
                </span>
                
                {/* Glowing background effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-white/20 via-pink-200/30 to-white/20 blur-xl opacity-60"
                  style={{
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,182,193,0.3) 50%, rgba(255,255,255,0.2) 100%)'
                  }}
                ></div>
                
                {/* Sparkle effects */}
                <motion.div
                  className="absolute -top-2 -right-4 w-3 h-3 bg-white rounded-full opacity-80"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-3 w-2 h-2 bg-pink-200 rounded-full opacity-70"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [360, 180, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute top-1/2 -right-6 w-1.5 h-1.5 bg-white rounded-full opacity-60"
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, 10, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.5
                  }}
                />
              </motion.span>
            </h1>
          </motion.div>
          
                     {/* Subtitle */}
           <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="mx-auto max-w-3xl text-xl leading-8 text-white/90 mb-10"
           >
             <span 
               className="font-bold bg-clip-text text-transparent"
               style={{
                 background: 'linear-gradient(to right, #ffffff, #f8fafc, #ffffff)',
                 WebkitBackgroundClip: 'text',
                 backgroundClip: 'text'
               }}
             >
               YKS'den tıp fakültesine
             </span>, tıp fakültesinden{' '}
             <span 
               className="font-bold bg-clip-text text-transparent"
               style={{
                 background: 'linear-gradient(to right, #ffffff, #f8fafc, #ffffff)',
                 WebkitBackgroundClip: 'text',
                 backgroundClip: 'text'
               }}
             >
               başarılı bir hekimliğe kadar her daim yanınızdayız.
             </span>
           </motion.p>
          
                                {/* Stats */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14"
           >
             <motion.div 
               className="relative bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden"
               whileHover={{ y: -6, scale: 1.02 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
             >
               {/* Gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#af2e3d]/5 via-transparent to-[#d63384]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               <div className="relative z-10 text-4xl font-black mb-3 bg-gradient-to-r from-[#af2e3d] via-[#c41e3a] to-[#d63384] bg-clip-text text-transparent">
                 300+
               </div>
               <div className="relative z-10 text-sm font-bold text-gray-800 group-hover:text-[#af2e3d] transition-colors duration-300">Başarılı öğrenci</div>
               <div className="relative z-10 mt-2 w-10 h-0.5 bg-gradient-to-r from-[#af2e3d] to-[#d63384] rounded-full"></div>
             </motion.div>
             <motion.div 
               className="relative bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden"
               whileHover={{ y: -6, scale: 1.02 }}
               transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
             >
               {/* Gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#d63384]/5 via-transparent to-[#af2e3d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               <div className="relative z-10 text-4xl font-black mb-3 bg-gradient-to-r from-[#af2e3d] via-[#c41e3a] to-[#d63384] bg-clip-text text-transparent">
                 %97
               </div>
               <div className="relative z-10 text-sm font-bold text-gray-800 group-hover:text-[#af2e3d] transition-colors duration-300">Başarı Oranı</div>
               <div className="relative z-10 mt-2 w-10 h-0.5 bg-gradient-to-r from-[#af2e3d] to-[#d63384] rounded-full"></div>
             </motion.div>
             <motion.div 
               className="relative bg-gradient-to-br from-white via-red-50/30 to-rose-50/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-red-100/50 hover:shadow-2xl transition-all duration-500 group overflow-hidden"
               whileHover={{ y: -6, scale: 1.02 }}
               transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
             >
               {/* Gradient overlay */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#af2e3d]/5 via-transparent to-[#d63384]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               
               <div className="relative z-10 text-4xl mb-3 filter drop-shadow-lg">🎯</div>
               <div className="relative z-10 text-sm font-bold text-gray-800 group-hover:text-[#af2e3d] transition-colors duration-300">Uzman Desteği</div>
               <div className="relative z-10 mt-2 w-10 h-0.5 bg-gradient-to-r from-[#af2e3d] to-[#d63384] rounded-full"></div>
             </motion.div>
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
              className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-[#af2e3d] bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden w-full sm:w-auto border-2 border-white/50"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-50 to-white opacity-100 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Sparkle effects */}
              <motion.div
                className="absolute top-2 right-3 w-2 h-2 bg-[#af2e3d] rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <motion.div
                className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-[#d63384] rounded-full opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.5
                }}
              />
              
              {/* Icon with gradient */}
              <div className="relative z-10 mr-4 p-2 rounded-full bg-gradient-to-r from-[#af2e3d] to-[#d63384] group-hover:scale-110 transition-transform duration-300">
                <BeakerIcon className="w-6 h-6 text-white" />
              </div>
              
              {/* Text with gradient on hover */}
              <span className="relative z-10 bg-gradient-to-r from-[#af2e3d] to-[#d63384] bg-clip-text text-transparent group-hover:from-[#8b1538] group-hover:to-[#af2e3d] transition-all duration-300">
                Bizimle Çalış
              </span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </motion.a>
            
            <motion.a
              href="#"
              className="group flex items-center text-lg font-bold text-gray-800 hover:text-[#af2e3d] transition-all duration-300 px-8 py-5 rounded-3xl bg-white/90 backdrop-blur-xl border-2 border-white/50 hover:bg-white hover:shadow-2xl w-full sm:w-auto justify-center sm:justify-start"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="mr-4 p-3 rounded-full bg-gradient-to-r from-[#af2e3d] to-[#d63384] group-hover:scale-110 transition-all duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <PlayIcon className="h-6 w-6 text-white" />
              </motion.div>
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-[#af2e3d] group-hover:to-[#d63384] transition-all duration-300">
                Tanıtım Videosunu İzle
              </span>
            </motion.a>
          </motion.div>


        </div>
      </div>
    </div>
  );
} 