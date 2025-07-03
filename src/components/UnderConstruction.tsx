'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Construction, Hammer, Wrench, Sparkles, ArrowLeft, Clock, Coffee } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UnderConstruction = () => {
  const router = useRouter();

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const
    }
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Circles */}
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 }}}
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-pink-300/20 to-orange-300/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 }}}
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-green-300/20 to-blue-300/20 rounded-full blur-xl"
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/50">
          {/* Icon Container */}
          <div className="relative mb-8">
            <motion.div
              animate={rotateAnimation}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl"></div>
            </motion.div>
            
            <motion.div
              animate={pulseAnimation}
              className="relative w-32 h-32 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-xl"
            >
              <Construction size={48} className="text-white" />
            </motion.div>

            {/* Floating Tools */}
            <motion.div
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
                rotate: [0, 45, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4"
            >
              <Hammer size={24} className="text-orange-500" />
            </motion.div>
            
            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 10, 0],
                rotate: [0, -45, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute -bottom-4 -left-4"
            >
              <Wrench size={24} className="text-red-500" />
            </motion.div>

            <motion.div
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 right-0"
            >
              <Sparkles size={20} className="text-yellow-500" />
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4"
          >
            Sayfa Hazırlanıyor!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg mb-8 leading-relaxed"
          >
            Geliştiricilerimiz bu sayfayı sizin için en iyi hale getirmek için
            <span className="inline-flex items-center mx-2">
              <Coffee size={20} className="text-brown-600 mr-1" />
              kahve
            </span>
            eşliğinde çalışıyor!
          </motion.p>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-center mb-3">
              <Clock size={20} className="text-purple-600 mr-2" />
              <p className="text-sm font-medium text-purple-900">Tahmini Tamamlanma</p>
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-bold text-purple-700"
            >
              Çok Yakında! 🚀
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                animate={{ width: ["0%", "75%"] }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full relative"
              >
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute right-0 top-0 bottom-0 w-4 bg-white/50"
                />
              </motion.div>
            </div>
            <p className="text-sm text-gray-500 mt-2">İlerleme: %75</p>
          </div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200"
          >
            <p className="text-sm text-yellow-800">
              💡 <strong>Eğlenceli Bilgi:</strong> Bu sayfa tamamlandığında, eğitim deneyiminizi 
              bambaşka bir seviyeye taşıyacak harika özelliklerle dolu olacak!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Geri Dön
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              Ana Sayfaya Git
              <Sparkles size={18} />
            </motion.button>
          </div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-6"
          >
            <p className="text-sm text-gray-500">Bu arada bizi takip etmeyi unutmayın:</p>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                <span className="text-xs">f</span>
              </div>
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors cursor-pointer">
                <span className="text-xs">ig</span>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors cursor-pointer">
                <span className="text-xs">in</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction; 