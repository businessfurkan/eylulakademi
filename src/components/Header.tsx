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
          ? 'backdrop-blur-xl shadow-2xl shadow-gray-500/10 border-b border-gray-200/30' 
          : 'backdrop-blur-lg border-b border-gray-200/20'
      }`}
      style={{ 
        backgroundColor: '#fff1f0' 
      }}
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
                className="font-['Inter'] font-bold text-lg leading-tight text-gray-900 group-hover:text-gray-700 transition-colors duration-300 whitespace-nowrap"
                whileHover={{ x: 1 }}
              >
                Eylül Büyükkaya Akademi
              </motion.div>
              <div className="text-xs text-gray-600 font-medium">Tıp Eğitimi Platformu</div>
            </div>
          </a>
        </motion.div>

        {/* Clean Mobile menu button */}
        <div className="flex lg:hidden">
          <motion.button
            type="button"
            className="inline-flex items-center justify-center p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-300"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Menüyü aç</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        </div>

        {/* Centered Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:gap-x-8">
          {navigation.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative px-6 py-3 text-base font-semibold text-gray-800 hover:text-transparent transition-all duration-500 group overflow-hidden"
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: '600',
                letterSpacing: '-0.01em'
              }}
            >
              {/* Colorful gradient text with icon */}
              <motion.span 
                className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-[#af2e3d] via-[#d63384] to-[#e91e63] bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ 
                  scale: 1.05,
                  filter: "drop-shadow(0 0 8px rgba(175, 46, 61, 0.4))"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span className="text-sm" style={{ filter: 'hue-rotate(340deg) saturate(1.2)' }}>
                  {item.icon}
                </span>
                {item.name}
              </motion.span>
              
              {/* Original text with icon */}
              <span className="relative z-10 flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-500">
                <span className="text-sm text-[#af2e3d] opacity-80">
                  {item.icon}
                </span>
                {item.name}
              </span>
              
              {/* Colorful underline */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#af2e3d] via-[#d63384] to-[#e91e63] origin-center rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  boxShadow: '0 0 10px rgba(175, 46, 61, 0.5)'
                }}
              />
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#af2e3d]/3 to-[#d63384]/3 rounded-lg opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating dot animation */}
              <motion.div
                className="absolute -top-1 left-1/2 w-1 h-1 bg-[#af2e3d] rounded-full opacity-0"
                whileHover={{ 
                  opacity: [0, 1, 0],
                  y: [-5, -15, -5],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            </motion.a>
          ))}
        </div>

        {/* Enhanced Action buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <motion.a
            href="/auth?mode=login"
            className="relative px-6 py-3 text-base font-semibold text-gray-800 hover:text-transparent transition-all duration-500 group overflow-hidden"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}
          >
            {/* Colorful gradient text with icon */}
            <motion.span 
              className="absolute inset-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#af2e3d] via-[#d63384] to-[#e91e63] bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 8px rgba(175, 46, 61, 0.4))"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span className="text-sm" style={{ filter: 'hue-rotate(340deg) saturate(1.2)' }}>
                🔐
              </span>
              Giriş Yap
            </motion.span>
            
            {/* Original text with icon */}
            <span className="relative z-10 flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-500">
              <span className="text-sm text-[#af2e3d] opacity-80">
                🔐
              </span>
              Giriş Yap
            </span>
            
            {/* Colorful underline */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#af2e3d] via-[#d63384] to-[#e91e63] origin-center rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileHover={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{
                boxShadow: '0 0 10px rgba(175, 46, 61, 0.5)'
              }}
            />
          </motion.a>

          <motion.a
            href="/student-registration"
            className="relative inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#af2e3d] via-[#c41e3a] to-[#d63384] rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            style={{
              boxShadow: '0 8px 30px rgba(175, 46, 61, 0.3), 0 4px 15px rgba(175, 46, 61, 0.2)',
              filter: 'drop-shadow(0 0 15px rgba(175, 46, 61, 0.4))'
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b1538] via-[#af2e3d] to-[#c41e3a] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
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
            
            <span className="relative z-10 font-semibold flex items-center gap-2" style={{
              fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}>
              <span className="text-sm">🎓</span>
              Öğrenci Ol
            </span>
          </motion.a>
          
          <motion.div
            className="relative inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-xl shadow-xl transition-all duration-300 group overflow-hidden cursor-not-allowed opacity-75"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              boxShadow: '0 8px 30px rgba(107, 114, 128, 0.3), 0 4px 15px rgba(107, 114, 128, 0.2)',
              filter: 'drop-shadow(0 0 15px rgba(107, 114, 128, 0.4))'
            }}
            title="Koç başvuruları yakında açılacak!"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10 font-semibold flex items-center gap-2" style={{
              fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}>
              <span className="text-sm">👨‍🏫</span>
              Koç Ol
            </span>
            
            {/* Modern Yakında Badge */}
            <div className="absolute -top-2 -right-2 group-hover:animate-pulse">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur-sm opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-orange-300/50 backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] animate-bounce">⏳</span>
                    <span className="font-semibold tracking-wide">Yakında</span>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-300 rounded-full animate-ping"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-xl shadow-xl transition-all duration-300 group overflow-hidden cursor-not-allowed opacity-75"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              boxShadow: '0 8px 30px rgba(107, 114, 128, 0.3), 0 4px 15px rgba(107, 114, 128, 0.2)',
              filter: 'drop-shadow(0 0 15px rgba(107, 114, 128, 0.4))'
            }}
            title="Admin paneli yakında açılacak!"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10 font-semibold flex items-center gap-2" style={{
              fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: '600',
              letterSpacing: '-0.01em'
            }}>
              <span className="text-sm">⚙️</span>
              Admin Paneli
            </span>
            
            {/* Modern Yakında Badge */}
            <div className="absolute -top-2 -right-2 group-hover:animate-pulse">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-75 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-blue-300/50 backdrop-blur-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] animate-bounce">⚙️</span>
                    <span className="font-semibold tracking-wide">Yakında</span>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-300 rounded-full animate-ping"></div>
              </div>
            </div>
          </motion.div>
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
                    <span className="text-xs text-gray-600">Tıp Eğitimi Platformu</span>
                  </div>
                </a>
                <motion.button
                  type="button"
                  className="p-2.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300"
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
                    className="flex items-center gap-4 px-6 py-4 text-lg font-bold text-gray-900 hover:text-[#af2e3d] hover:bg-gradient-to-r hover:from-[#af2e3d]/10 hover:via-red-500/5 hover:to-[#af2e3d]/10 rounded-2xl transition-all duration-300 group relative overflow-hidden"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-[#af2e3d]/5 via-red-500/5 to-[#af2e3d]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    {/* Colorful mobile text with icon */}
                    <motion.span 
                      className="font-semibold text-gray-900 group-hover:text-transparent transition-colors duration-300 relative z-10 whitespace-nowrap flex items-center gap-3"
                      whileHover={{ 
                        scale: 1.02,
                        filter: "drop-shadow(0 0 8px rgba(175, 46, 61, 0.4))"
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{
                        fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: '600',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      <span className="text-lg text-[#af2e3d] opacity-80">
                        {item.icon}
                      </span>
                      {item.name}
                    </motion.span>
                    
                    {/* Mobile gradient text overlay with icon */}
                    <motion.span 
                      className="absolute inset-0 flex items-center gap-3 bg-gradient-to-r from-[#af2e3d] via-[#d63384] to-[#e91e63] bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold whitespace-nowrap"
                      style={{
                        fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: '600',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      <span className="text-lg" style={{ filter: 'hue-rotate(340deg) saturate(1.2)' }}>
                        {item.icon}
                      </span>
                      {item.name}
                    </motion.span>
                    
                    {/* Mobile underline effect */}
                    <motion.div
                      className="absolute bottom-2 left-6 right-6 h-0.5 bg-gradient-to-r from-[#af2e3d] to-red-400 origin-left rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
                
                <div className="border-t border-gray-200 pt-6 mt-6 space-y-3">
                  <motion.a
                    href="/auth?mode=login"
                    className="block text-center px-4 py-3 text-base font-semibold text-gray-900 hover:text-transparent hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-300 relative group"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    style={{
                      fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: '600',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-500 flex items-center gap-2">
                      <span className="text-sm text-[#af2e3d] opacity-80">🔐</span>
                      Giriş Yap
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center gap-2 bg-gradient-to-r from-[#af2e3d] via-[#d63384] to-[#e91e63] bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-semibold">
                      <span className="text-sm" style={{ filter: 'hue-rotate(340deg) saturate(1.2)' }}>🔐</span>
                      Giriş Yap
                    </span>
                  </motion.a>
                  <motion.a
                    href="/student-registration"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#af2e3d] to-[#d63384] text-white px-4 py-3 rounded-lg text-base font-semibold shadow-lg"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.32 }}
                    style={{
                      fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: '600',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    <span className="text-sm">🎓</span>
                    Öğrenci Ol
                  </motion.a>
                  <motion.div
                    className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white px-4 py-3 rounded-lg text-base font-semibold shadow-lg cursor-not-allowed opacity-75"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                    style={{
                      fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: '600',
                      letterSpacing: '-0.01em'
                    }}
                    title="Koç başvuruları yakında açılacak!"
                  >
                    <span className="text-sm">👨‍🏫</span>
                    Koç Ol
                    <div className="absolute -top-1 -right-1">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full blur-sm opacity-75 animate-pulse"></div>
                        <div className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-orange-300/50 backdrop-blur-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] animate-bounce">⏳</span>
                            <span className="font-semibold tracking-wide">Yakında</span>
                          </div>
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-orange-300 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white px-4 py-3 rounded-lg text-base font-semibold shadow-lg cursor-not-allowed opacity-75"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    style={{
                      fontFamily: "'TT Forms Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: '600',
                      letterSpacing: '-0.01em'
                    }}
                    title="Admin paneli yakında açılacak!"
                  >
                    <span className="text-sm">⚙️</span>
                    Admin Paneli
                    <div className="absolute -top-1 -right-1">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-75 animate-pulse"></div>
                        <div className="relative bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-blue-300/50 backdrop-blur-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] animate-bounce">⚙️</span>
                            <span className="font-semibold tracking-wide">Yakında</span>
                          </div>
                        </div>
                        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 