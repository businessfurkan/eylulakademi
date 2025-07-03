'use client';

import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, SparklesIcon, CogIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Özellikler', href: '/features', icon: '✨' },
    { name: 'Kurslar', href: '/courses', icon: '📚' },
    { name: 'Başarı Hikayeleri', href: '#success-stories', icon: '🏆' },
    { name: 'İletişim', href: '/contact', icon: '📞' },
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-white/80 shadow-2xl shadow-teal-500/10 border-b border-white/30' 
          : 'backdrop-blur-lg bg-white/60 border-b border-white/20'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-8xl items-center px-4 py-3.5 lg:px-6" aria-label="Global">
        
        {/* Professional Logo */}
        <motion.div 
          className="flex items-center min-w-0 lg:flex-1"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <a href="/" className="flex items-center gap-3 p-2 group">
            <div className="relative flex-shrink-0">
              <motion.div 
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#349e97] to-[#2a7f77] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-[#349e97]/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-lg font-['Inter']">E</span>
              </motion.div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-[#8fdbd6] to-[#349e97] rounded-full opacity-80"></div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <motion.div 
                className="font-['Inter'] font-bold text-lg leading-tight text-gray-900 group-hover:text-[#349e97] transition-colors duration-300 whitespace-nowrap"
                whileHover={{ x: 1 }}
              >
                Eylül Büyükkaya Akademi
              </motion.div>
              <div className="text-xs text-gray-500 font-medium">Tıp Eğitimi Platformu</div>
            </div>
          </a>
        </motion.div>

        {/* Clean Mobile menu button */}
        <div className="flex lg:hidden">
          <motion.button
            type="button"
            className="inline-flex items-center justify-center p-2.5 text-gray-700 hover:text-[#349e97] hover:bg-[#349e97]/10 rounded-xl transition-all duration-300"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Menüyü aç</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        </div>

        {/* Centered Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:gap-x-6">
          {navigation.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative px-6 py-3 text-base font-bold text-gray-800 hover:text-[#349e97] transition-all duration-300 group overflow-hidden rounded-xl"
              whileHover={{ y: -2, scale: 1.05 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              style={{
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                filter: 'drop-shadow(0 0 10px rgba(52, 158, 151, 0.2))'
              }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#349e97]/5 via-cyan-500/5 to-[#349e97]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              {/* Icon and text container */}
              <span className="flex items-center gap-3 relative z-10">
                <motion.span 
                  className="text-xl group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.span>
                <span className="font-bold text-gray-900 group-hover:text-[#349e97] transition-colors duration-300 text-shadow-sm whitespace-nowrap">
                  {item.name}
                </span>
              </span>
              
              {/* Enhanced underline effect */}
              <motion.div
                className="absolute bottom-1 left-3 right-3 h-1 bg-gradient-to-r from-[#349e97] via-cyan-400 to-[#2a7f77] origin-left rounded-full shadow-lg"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 0 15px rgba(52, 158, 151, 0.5)'
                }}
              />
              
              {/* Sparkle effects on hover */}
              <motion.div
                className="absolute top-1 right-2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-75"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-[#349e97] rounded-full opacity-0 group-hover:opacity-75"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: 0.3
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* Enhanced Action buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <motion.a
            href="/auth?mode=login"
            className="relative px-6 py-3 text-base font-bold text-gray-800 hover:text-[#349e97] hover:bg-gradient-to-r hover:from-[#349e97]/10 hover:via-cyan-500/5 hover:to-[#349e97]/10 rounded-xl transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              textShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              filter: 'drop-shadow(0 0 8px rgba(52, 158, 151, 0.15))'
            }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#349e97]/5 via-cyan-500/5 to-[#349e97]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <span className="relative z-10">Giriş Yap</span>
          </motion.a>

          <motion.a
            href="/student-registration"
            className="relative inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            style={{
              boxShadow: '0 8px 30px rgba(79, 70, 229, 0.3), 0 4px 15px rgba(79, 70, 229, 0.2)',
              filter: 'drop-shadow(0 0 15px rgba(79, 70, 229, 0.4))'
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Sparkle effects */}
            <motion.div
              className="absolute top-1 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-60"
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            
            <SparklesIcon className="h-5 w-5 relative z-10" />
            <span className="relative z-10 font-bold">Öğrenci Ol</span>
          </motion.a>
          
          <motion.a
            href="/coach-application"
            className="relative inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-[#349e97] via-cyan-500 to-[#2a7f77] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              boxShadow: '0 8px 30px rgba(52, 158, 151, 0.3), 0 4px 15px rgba(52, 158, 151, 0.2)',
              filter: 'drop-shadow(0 0 15px rgba(52, 158, 151, 0.4))'
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-[#349e97] to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Sparkle effects */}
            <motion.div
              className="absolute top-1 right-2 w-1.5 h-1.5 bg-white rounded-full opacity-60"
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
            
            <SparklesIcon className="h-5 w-5 relative z-10" />
            <span className="relative z-10 font-bold">Koç Ol</span>
          </motion.a>

          <motion.a
            href="/admin"
            className="relative inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-orange-500 via-red-500 to-red-600 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              boxShadow: '0 8px 30px rgba(239, 68, 68, 0.3), 0 4px 15px rgba(239, 68, 68, 0.2)',
              filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.4))'
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Gear rotation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="relative z-10"
            >
              <CogIcon className="h-5 w-5" />
            </motion.div>
            <span className="relative z-10 font-bold">Admin Paneli</span>
          </motion.a>
        </div>
      </nav>
      
      {/* Clean Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div 
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-8">
                <a href="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#349e97] to-[#2a7f77] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">E</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Inter'] font-bold text-base text-gray-900">
                      Eylül Büyükkaya Akademi
                    </span>
                    <span className="text-xs text-gray-500">Tıp Eğitimi Platformu</span>
                  </div>
                </a>
                <motion.button
                  type="button"
                  className="p-2.5 text-gray-700 hover:text-[#349e97] hover:bg-[#349e97]/10 rounded-lg transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Kapat</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </motion.button>
              </div>
              
              <div className="space-y-3">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-4 px-6 py-4 text-lg font-bold text-gray-900 hover:text-[#349e97] hover:bg-gradient-to-r hover:from-[#349e97]/10 hover:via-cyan-500/5 hover:to-[#349e97]/10 rounded-2xl transition-all duration-300 group relative overflow-hidden"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      filter: 'drop-shadow(0 0 8px rgba(52, 158, 151, 0.15))'
                    }}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    {/* Mobile background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#349e97]/5 via-cyan-500/5 to-[#349e97]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    {/* Icon and text */}
                    <motion.span 
                      className="text-2xl group-hover:scale-110 transition-transform duration-300 relative z-10"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="font-bold text-gray-900 group-hover:text-[#349e97] transition-colors duration-300 relative z-10 whitespace-nowrap">
                      {item.name}
                    </span>
                    
                    {/* Mobile underline effect */}
                    <motion.div
                      className="absolute bottom-2 left-6 right-6 h-0.5 bg-gradient-to-r from-[#349e97] to-cyan-400 origin-left rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
                
                <div className="border-t border-gray-200 pt-6 mt-6 space-y-3">
                  <motion.a
                    href="/auth?mode=login"
                    className="block text-center px-4 py-3 text-base font-medium text-gray-700 hover:text-[#349e97] hover:bg-[#349e97]/5 rounded-lg transition-all duration-300"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    Giriş Yap
                  </motion.a>
                  <motion.a
                    href="/student-registration"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg text-base font-semibold shadow-lg"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.32 }}
                  >
                    <SparklesIcon className="h-5 w-5" />
                    Öğrenci Ol
                  </motion.a>
                  <motion.a
                    href="/coach-application"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#349e97] to-[#2a7f77] text-white px-4 py-3 rounded-lg text-base font-semibold shadow-lg"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                  >
                    <SparklesIcon className="h-5 w-5" />
                    Koç Ol
                  </motion.a>
                  <motion.a
                    href="/admin"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-lg text-base font-semibold shadow-lg"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <CogIcon className="h-5 w-5" />
                    Admin Paneli
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 