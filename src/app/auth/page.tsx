'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail,
  Lock,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  UserCheck,
  GraduationCap,
  Users,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'student' | 'coach'>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (userType === 'coach') {
        // Demo Coach login check
        if (email === 'demo@coach.com' && password === 'demo123') {
          localStorage.setItem('currentCoach', JSON.stringify({
            email: email,
            coachId: 'demo-coach-001',
            loggedIn: true,
            userType: 'coach',
            isDemo: true
          }));
          window.location.href = '/panel?demo=true';
          return;
        }
        
        // Coach login logic
        const savedCredentials = JSON.parse(localStorage.getItem('coachCredentials') || '{}');
        
        if (savedCredentials[email] && savedCredentials[email].password === password && savedCredentials[email].approved) {
          // Coach login successful - redirect to coach panel
          localStorage.setItem('currentCoach', JSON.stringify({
            email: email,
            coachId: savedCredentials[email].coachId,
            loggedIn: true,
            userType: 'coach'
          }));
          window.location.href = '/panel';
        } else if (savedCredentials[email] && !savedCredentials[email].approved) {
          setError('Koç başvurunuz henüz onaylanmamıştır. Lütfen admin onayını bekleyin.');
        } else {
          setError('E-posta veya şifre hatalı. Koç başvurusu yapmadıysanız önce başvuru yapmanız gerekiyor.');
        }
      } else {
        // Student login logic (simulated for now)
        // For now, accept any email/password combination for students
        if (email && password) {
          localStorage.setItem('currentStudent', JSON.stringify({
            email: email,
            loggedIn: true,
            userType: 'student'
          }));
          window.location.href = '/student-panel';
        } else {
          setError('Lütfen e-posta ve şifre alanlarını doldurun.');
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoCoachLogin = () => {
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem('currentCoach', JSON.stringify({
        email: 'demo@coach.com',
        coachId: 'demo-coach-001',
        loggedIn: true,
        userType: 'coach',
        isDemo: true
      }));
      window.location.href = '/panel?demo=true';
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom right, #1e293b, #374151, #0f172a)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: 'linear-gradient(to right, #9cdcd740, #67b5af40)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'linear-gradient(to right, #9cdcd730, #67b5af30)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'linear-gradient(to right, #9cdcd720, #67b5af35)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${(i * 5) % 100}%`,
            top: `${(i * 7) % 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Modern Header */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-white hover:opacity-80 transition-all duration-300 group">
              <motion.div
                whileHover={{ x: -5 }}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={24} className="group-hover:opacity-80" />
                <span className="text-lg font-semibold">Ana Sayfa</span>
              </motion.div>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3"
            >
              <Sparkles className="text-yellow-300" size={24} />
              <h1 className="text-2xl font-bold text-white">Eylül Büyükkaya Akademi</h1>
            </motion.div>
            
            <div className="w-32"></div> {/* Spacer to balance the layout */}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-120px)]">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Card */}
          <div className="relative">
            {/* Card glow effect */}
            <div className="absolute -inset-1 rounded-3xl blur opacity-30" style={{
              background: 'linear-gradient(to right, #9cdcd7, #67b5af, #9cdcd7)'
            }}></div>
            
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <UserCheck size={40} className="text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-3 bg-clip-text text-transparent" style={{
                  background: 'linear-gradient(to right, #9cdcd7, #67b5af)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Hoş Geldiniz
                </h2>
                <p className="text-blue-100/80 text-lg">
                  Eğitim yolculuğunuza devam edin
                </p>
              </motion.div>

              {/* User Type Selection */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <label className="block text-white/90 font-semibold mb-4 text-center">
                  Giriş Tipi Seçin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    onClick={() => setUserType('student')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                                         className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 ${
                       userType === 'student'
                         ? 'text-white shadow-lg'
                         : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'
                     }`}
                     style={userType === 'student' ? {
                       borderColor: '#9cdcd7',
                       backgroundColor: '#9cdcd720',
                       boxShadow: '0 10px 15px -3px #9cdcd740'
                     } : {}}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <GraduationCap size={24} />
                      <span className="font-semibold">Öğrenci</span>
                    </div>
                                         {userType === 'student' && (
                       <motion.div
                         layoutId="activeSelection"
                         className="absolute inset-0 rounded-2xl -z-10"
                         style={{
                           background: 'linear-gradient(to right, #9cdcd730, #67b5af30)'
                         }}
                       />
                     )}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={() => setUserType('coach')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 ${
                      userType === 'coach'
                        ? 'border-green-400 bg-green-500/20 text-green-200 shadow-lg shadow-green-500/25'
                        : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users size={24} />
                      <span className="font-semibold">Koç</span>
                    </div>
                    {userType === 'coach' && (
                      <motion.div
                        layoutId="activeSelection"
                        className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-2xl -z-10"
                      />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Form */}
              <motion.form 
                onSubmit={handleLogin} 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Email Field */}
                <div>
                  <label className="block text-white/90 font-semibold mb-3">
                    E-posta Adresi
                  </label>
                                     <div className="relative group">
                     <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 transition-colors" style={{
                       color: userType === 'student' ? '#9cdcd7' : '#67b5af'
                     }} />
                     <input
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                       className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300"
                       style={{
                         '--tw-ring-color': '#9cdcd780'
                       } as React.CSSProperties}
                       placeholder={userType === 'coach' ? 'koç@email.com' : 'öğrenci@email.com'}
                     />
                     <div className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none" style={{
                       background: 'linear-gradient(to right, #9cdcd700, #67b5af00, #9cdcd700)'
                     }}></div>
                   </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-white/90 font-semibold mb-3">
                    Şifre
                  </label>
                                     <div className="relative group">
                     <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 transition-colors" style={{
                       color: userType === 'student' ? '#9cdcd7' : '#67b5af'
                     }} />
                     <input
                       type={showPassword ? 'text' : 'password'}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                       className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300"
                       style={{
                         '--tw-ring-color': '#9cdcd780'
                       } as React.CSSProperties}
                       placeholder="Şifrenizi girin"
                     />
                     <motion.button
                       type="button"
                       onClick={() => setShowPassword(!showPassword)}
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                       className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                     >
                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                     </motion.button>
                     <div className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none" style={{
                       background: 'linear-gradient(to right, #9cdcd700, #67b5af00, #9cdcd700)'
                     }}></div>
                   </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-2xl p-4 flex items-start gap-3"
                    >
                      <AlertCircle size={20} className="text-red-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-red-200 font-semibold text-sm">Giriş Hatası</p>
                        <p className="text-red-200/80 text-sm">{error}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.05, y: isLoading ? 0 : -2 }}
                  whileTap={{ scale: isLoading ? 1 : 0.95 }}
                                     className={`relative w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden group text-white shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                   style={userType === 'coach' 
                     ? {
                         background: 'linear-gradient(to right, #10b981, #059669)',
                         boxShadow: '0 10px 15px -3px #10b98140'
                       }
                     : {
                         background: 'linear-gradient(to right, #9cdcd7, #67b5af)',
                         boxShadow: '0 10px 15px -3px #9cdcd740'
                       }
                   }
                >
                                     {/* Button glow effect */}
                   <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                     background: userType === 'coach' 
                       ? 'linear-gradient(to right, #34d39930, #10b98130)'
                       : 'linear-gradient(to right, #9cdcd730, #67b5af30)'
                   }}></div>
                  
                  <div className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        Giriş yapılıyor...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={20} />
                        {userType === 'coach' ? 'Koç Girişi' : 'Öğrenci Girişi'}
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.form>

              {/* Demo Coach Login Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <motion.button
                  type="button"
                  onClick={handleDemoCoachLogin}
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`relative w-full py-3 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden group border-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  style={{
                    background: 'linear-gradient(to right, #f59e0b20, #d97706020)',
                    borderColor: '#f59e0b60',
                    color: '#fbbf24'
                  }}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    background: 'linear-gradient(to right, #f59e0b30, #d9770630)'
                  }}></div>
                  
                  <div className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full"
                        />
                        Demo koç girişi...
                      </>
                    ) : (
                      <>
                        <UserCheck size={18} />
                        🎯 Demo Koç Girişi (Geliştirme)
                      </>
                    )}
                  </div>
                </motion.button>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-center text-xs text-amber-300/70 mt-2"
                >
                  Geliştirme ve test amaçlı demo koç paneli
                </motion.p>
              </motion.div>

              {/* Additional Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-6 border-t border-white/10"
              >
                {userType === 'coach' ? (
                  <div className="text-center space-y-4">
                    <p className="text-white/70 text-sm">
                      Henüz koç başvurusu yapmadınız mı?
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/coach-application"
                        className="inline-block px-6 py-3 backdrop-blur-sm text-sm font-semibold rounded-2xl transition-all duration-300"
                        style={{
                          background: 'linear-gradient(to right, #10b98120, #05966920)',
                          color: '#34d399',
                          border: '1px solid #10b98130'
                        }}
                      >
                        Koç Başvurusu Yap
                      </Link>
                    </motion.div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-white/70 text-sm">
                      Henüz hesabınız yok mu?
                    </p>
                    <div className="text-sm text-white/60">
                      Öğrenci kaydı için{' '}
                                             <Link href="/contact" className="font-semibold transition-colors" style={{
                         color: '#9cdcd7'
                       }}>
                        iletişime geçin
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Info Box */}
                             <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.7 }}
                 className="mt-6 p-4 backdrop-blur-sm rounded-2xl"
                 style={{
                   backgroundColor: '#9cdcd710',
                   border: '1px solid #9cdcd720'
                 }}
               >
                 <div className="flex items-start gap-3">
                   <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                     background: 'linear-gradient(to right, #9cdcd7, #67b5af)'
                   }}>
                     <span className="text-white text-xs font-bold">ℹ</span>
                   </div>
                   <div>
                     <p className="text-sm font-semibold" style={{ color: '#9cdcd7' }}>Bilgi</p>
                     <p className="text-xs" style={{ color: '#9cdcd7CC' }}>
                       {userType === 'coach' 
                         ? 'Sadece başvurusu onaylanan koçlar giriş yapabilir.' 
                         : 'Öğrenci girişi için kayıt olmanız gerekmektedir.'
                       }
                     </p>
                   </div>
                 </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 