'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  SparklesIcon, 
  AcademicCapIcon,
  UserGroupIcon,
  HeartIcon,
  LightBulbIcon,
  CheckIcon,
  ArrowRightIcon,
  StarIcon,
  VideoCameraIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline';
import { 
  FaStethoscope, 
  FaUserMd, 
  FaGraduationCap,
  FaBrain,
  FaHeartbeat,
  FaFlask,
  FaMicroscope
} from 'react-icons/fa';

type AuthMode = 'login' | 'register' | 'role-select';
type UserRole = 'student' | 'coach' | null;

// Mini feature cards data
const miniFeatures = [
  {
    icon: SparklesIcon,
    title: 'AI Flashcard Üretici',
    description: '10,000+ Tıp terimi ile akıllı tekrar',
    gradient: 'from-pink-500 to-rose-500',
    iconColor: 'text-pink-600'
  },
  {
    icon: VideoCameraIcon,
    title: 'Video Ders Kütüphanesi',
    description: '500+ uzman eğitmen videosu',
    gradient: 'from-teal-500 to-cyan-500',
    iconColor: 'text-teal-600'
  },
  {
    icon: SpeakerWaveIcon,
    title: 'AI Podcast Oluşturucu',
    description: 'Notlarınızı sesli podcast yapın',
    gradient: 'from-purple-500 to-violet-500',
    iconColor: 'text-purple-600'
  }
];

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [iconPositions, setIconPositions] = useState<Array<{left: number, top: number}>>([]);

  // Set auth mode based on URL parameter
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'login' || mode === 'register') {
      setAuthMode(mode);
    }
  }, [searchParams]);

  // Generate random positions for floating icons on client side only
  useEffect(() => {
    const positions = floatingIcons.map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setIconPositions(positions);
  }, []);

  // Floating medical icons animation
  const floatingIcons = [
    { Icon: FaStethoscope, delay: 0, size: 30, color: 'text-pink-400' },
    { Icon: FaHeartbeat, delay: 1, size: 28, color: 'text-rose-400' },
    { Icon: FaBrain, delay: 2, size: 26, color: 'text-purple-400' },
    { Icon: FaFlask, delay: 3, size: 24, color: 'text-blue-400' },
    { Icon: FaMicroscope, delay: 4, size: 32, color: 'text-teal-400' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    if (authMode === 'register' && !selectedRole) {
      setAuthMode('role-select');
    } else if (authMode === 'login') {
      // Handle login logic
      console.log('Login submitted:', { ...formData, mode: authMode });
      // Redirect based on user type (will be determined from database)
      // For now, redirect to appropriate panel
      window.location.href = '/panel';
    } else {
      // Handle registration completion
      console.log('Registration completed:', { ...formData, role: selectedRole, mode: authMode });
      // Redirect to appropriate panel based on role
      if (selectedRole === 'coach') {
        window.location.href = '/panel?type=coach';
      } else {
        window.location.href = '/student-panel';
      }
    }
  };

  const handleDemoLogin = async (userType: 'coach' | 'student') => {
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    // Redirect to appropriate demo panel
    if (userType === 'coach') {
      window.location.href = '/panel?type=coach&demo=true';
    } else {
      window.location.href = '/student-panel';
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Complete registration process
    console.log('Registration completed with role:', role);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#8fdbd6' }}>
      {/* Enhanced Background with Medical Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 medical-pattern"></div>
        
        {/* Floating Medical Icons */}
        {iconPositions.length > 0 && floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-20`}
            style={{
              left: `${iconPositions[index]?.left || 50}%`,
              top: `${iconPositions[index]?.top || 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + (index * 0.5),
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            <item.Icon size={item.size} />
          </motion.div>
        ))}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-purple-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-100/20 via-transparent to-teal-100/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {authMode === 'role-select' ? (
            <RoleSelectionCard onSelectRole={handleRoleSelect} />
          ) : (
            <AuthCard 
              mode={authMode}
              formData={formData}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              isLoading={isLoading}
              onModeChange={setAuthMode}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              onDemoLogin={handleDemoLogin}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Role Selection Component
function RoleSelectionCard({ onSelectRole }: { onSelectRole: (role: UserRole) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg mb-6"
        >
          <SparklesIcon className="h-6 w-6 text-[#349e97]" />
          <span className="text-lg font-semibold text-gray-800">Rolünüzü Seçin</span>
          <SparklesIcon className="h-6 w-6 text-[#349e97]" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Hangi Yolculuğa Başlıyorsunuz?
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Tıp dünyasında kendinizi nasıl tanımlıyorsunuz? Size özel deneyim sunabilmemiz için rolünüzü seçin.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Student Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="group cursor-pointer"
          onClick={() => onSelectRole('student')}
        >
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 overflow-hidden h-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaGraduationCap className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  Öğrenci Olarak Katılın
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  YKS'ye hazırlanıyor, tıp fakültesinde okuyor veya kariyerinizde ilerlemeye odaklanıyorsunuz.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {[
                    'Kişiselleştirilmiş çalışma planları',
                    'Yapay zeka destekli konu anlatımları',
                    'Sınav simülasyonları ve değerlendirmeler',
                    'Peer-to-peer öğrenme grupları'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 text-sm text-gray-700"
                    >
                      <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Öğrenci Olarak Başla</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coach Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="group cursor-pointer"
          onClick={() => onSelectRole('coach')}
        >
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 overflow-hidden h-full">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-200/30 to-transparent rounded-bl-full"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <motion.div 
                  className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/25"
                  whileHover={{ rotate: -5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaUserMd className="w-12 h-12 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                  Koç Olarak Katılın
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Deneyimli bir hekim, akademisyen veya eğitmen olarak bilginizi paylaşın.
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {[
                    'Öğrenci mentorluk sistemleri',
                    'İçerik oluşturma ve paylaşım araçları',
                    'Gelir elde etme fırsatları',
                    'Profesyonel topluluk ağı'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3 text-sm text-gray-700"
                    >
                      <StarIcon className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Koç Olarak Başla</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Auth Card Component
interface AuthCardProps {
  mode: AuthMode;
  formData: any;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
  onModeChange: (mode: AuthMode) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onDemoLogin: (userType: 'coach' | 'student') => Promise<void>;
}

function AuthCard({
  mode,
  formData,
  showPassword,
  showConfirmPassword,
  isLoading,
  onModeChange,
  onInputChange,
  onSubmit,
  onTogglePassword,
  onToggleConfirmPassword,
  onDemoLogin
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full max-w-lg mx-auto`}
    >
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-pink-50/50"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-[#8fdbd6]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-pink-200/20 to-transparent rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-[#349e97] to-[#2a7f77] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <span className="text-white font-bold text-2xl">E</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              {mode === 'login' ? 'Tekrar Hoş Geldiniz!' : 'Aramıza Katılın!'}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-gray-600"
            >
              {mode === 'login' 
                ? 'Tıp yolculuğunuza kaldığınız yerden devam edin'
                : 'Tıp dünyasında başarıya giden yolculuğa başlayın'
              }
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onInputChange}
                  className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent outline-none transition-all duration-300"
                  placeholder="Adınız ve soyadınız"
                  required
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: mode === 'register' ? 0.6 : 0.5, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent outline-none transition-all duration-300"
                placeholder="ornek@email.com"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: mode === 'register' ? 0.7 : 0.6, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={onInputChange}
                  className="w-full px-4 py-3 pr-12 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent outline-none transition-all duration-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şifre Tekrar
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 pr-12 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent outline-none transition-all duration-300"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={onToggleConfirmPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mode === 'register' ? 0.9 : 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#349e97] to-[#2a7f77] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-[#349e97]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Mini Feature Cards - Only show in register mode */}
          {mode === 'register' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="mt-8"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#349e97]/10 to-[#2a7f77]/10 backdrop-blur-lg rounded-full px-4 py-2"
                >
                  <SparklesIcon className="h-4 w-4 text-[#349e97]" />
                  <span className="text-sm font-medium text-gray-700">Size Sunduğumuz Avantajlar</span>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {miniFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 hover:shadow-md transition-all duration-300">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 truncate">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Toggle Mode */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: mode === 'register' ? 1.0 : (mode === 'login' ? 1.4 : 0.8), duration: 0.5 }}
            className="mt-6 text-center"
          >
            <span className="text-gray-600">
              {mode === 'login' ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?'}
            </span>
            <button
              type="button"
              onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
              className="ml-2 text-[#349e97] font-semibold hover:text-[#2a7f77] transition-colors"
            >
              {mode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </motion.div>

          {/* Demo Login Section - Only for Login Mode */}
          {mode === 'login' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100/80 to-orange-100/80 backdrop-blur-lg rounded-full px-4 py-2 border border-amber-200/50"
                >
                  <StarIcon className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">Demo Hesaplarıyla Hızlı Giriş</span>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Demo Coach Login */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onDemoLogin('coach')}
                  disabled={isLoading}
                  className="group relative p-4 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-xl border border-purple-200/50 hover:border-purple-300/50 transition-all duration-300 disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <FaUserMd className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                        Demo Koç Girişi
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Koç panelini keşfedin
                      </p>
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                {/* Demo Student Login */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onDemoLogin('student')}
                  disabled={isLoading}
                  className="group relative p-4 bg-gradient-to-br from-blue-50 to-teal-50 hover:from-blue-100 hover:to-teal-100 rounded-xl border border-blue-200/50 hover:border-blue-300/50 transition-all duration-300 disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      <FaGraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                        Demo Öğrenci Girişi
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Öğrenci panelini keşfedin
                      </p>
                    </div>
                    <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex items-center my-6"
              >
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <span className="px-3 text-xs text-gray-500 bg-white rounded-full">veya kendi hesabınızla</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </motion.div>
            </motion.div>
          )}

          {/* Forgot Password for Login */}
          {mode === 'login' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="mt-4 text-center"
            >
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-[#349e97] transition-colors"
              >
                Şifrenizi mi unuttunuz?
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 