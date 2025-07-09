'use client';

import { motion } from 'framer-motion';
import { Clock, Construction, Rocket, Star, Zap } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  theme?: 'coach' | 'general';
}

export default function ComingSoon({ 
  title, 
  description, 
  icon,
  theme = 'coach'
}: ComingSoonProps) {
  const getThemeColors = () => {
    if (theme === 'coach') {
      return {
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        bg: 'from-emerald-50 via-teal-50 to-cyan-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconText: 'text-emerald-600'
      };
    }
    return {
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      bg: 'from-purple-50 via-pink-50 to-rose-50',
      text: 'text-purple-700',
      border: 'border-purple-200',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600'
    };
  };

  const colors = getThemeColors();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative max-w-2xl w-full bg-gradient-to-br ${colors.bg} rounded-3xl shadow-2xl border-2 ${colors.border} overflow-hidden`}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-20 h-20 rounded-full bg-gradient-to-r ${colors.gradient} opacity-10`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 text-center">
          {/* Main Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-24 h-24 mx-auto mb-6 ${colors.iconBg} rounded-full flex items-center justify-center shadow-lg`}
          >
            {icon || <Construction size={40} className={colors.iconText} />}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-3xl font-bold ${colors.text} mb-4`}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-lg ${colors.text} mb-8 opacity-80`}
          >
            {description}
          </motion.p>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.gradient} text-white rounded-full font-semibold shadow-lg mb-6`}
          >
            <Clock size={18} />
            <span>Yakında Geliyor!</span>
          </motion.div>

          {/* Feature teasers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {[
              { icon: <Rocket size={16} />, text: "Gelişmiş Özellikler" },
              { icon: <Star size={16} />, text: "Kişiselleştirilmiş Deneyim" },
              { icon: <Zap size={16} />, text: "Hızlı ve Etkili" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`flex items-center gap-2 p-3 bg-white/50 rounded-xl border ${colors.border} backdrop-blur-sm`}
              >
                <div className={`p-2 ${colors.iconBg} rounded-lg`}>
                  <div className={colors.iconText}>
                    {feature.icon}
                  </div>
                </div>
                <span className={`text-sm font-medium ${colors.text}`}>
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full bg-gray-200 rounded-full h-2 mb-4"
          >
            <motion.div
              className={`h-2 bg-gradient-to-r ${colors.gradient} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={`text-sm ${colors.text} opacity-70`}
          >
            Geliştirme sürecimiz %75 tamamlandı
          </motion.p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${colors.gradient} opacity-20`}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`w-8 h-8 rounded-full bg-gradient-to-r ${colors.gradient} opacity-20`}
          />
        </div>
      </motion.div>
    </div>
  );
} 