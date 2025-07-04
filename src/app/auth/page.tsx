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
  EyeOff
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
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#9cdcd7' }}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/20 backdrop-blur-sm border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-gray-800 hover:text-gray-600 transition-all duration-300 group">
              <div className="flex items-center gap-2">
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-lg font-semibold">Ana Sayfa</span>
              </div>
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Eylül Büyükkaya Akademi</h1>
            </div>
            
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md">
          {/* Modern Card */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <UserCheck size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Eylül Büyükkaya Akademi
              </h2>
              <p className="text-gray-600 text-lg">
                ile hayallerine bir adım daha yaklaş
              </p>
            </div>

            {/* User Type Selection */}
            <div className="mb-8">
              <label className="block text-gray-800 font-semibold mb-4 text-center">
                Giriş Tipi Seçin
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('student')}
                  className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 ${
                    userType === 'student'
                      ? 'border-teal-400 bg-teal-50 text-teal-700 shadow-lg'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <GraduationCap size={24} />
                    <span className="font-semibold">Öğrenci</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setUserType('coach')}
                  className={`relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 ${
                    userType === 'coach'
                      ? 'border-green-400 bg-green-50 text-green-700 shadow-lg'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Users size={24} />
                    <span className="font-semibold">Koç</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300"
                    placeholder={userType === 'coach' ? 'koç@email.com' : 'öğrenci@email.com'}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3">
                  Şifre
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300"
                    placeholder="Şifrenizi girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
                  >
                    <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-800 font-semibold text-sm">Giriş Hatası</p>
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`relative w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden text-white shadow-lg ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'
                } ${
                  userType === 'coach' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : 'bg-gradient-to-r from-teal-500 to-teal-600'
                }`}
              >
                <div className="relative flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Giriş yapılıyor...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      {userType === 'coach' ? 'Koç Girişi' : 'Öğrenci Girişi'}
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Demo Coach Login Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleDemoCoachLogin}
                disabled={isLoading}
                className={`relative w-full py-3 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden border-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
              >
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                      Demo koç girişi...
                    </>
                  ) : (
                    <>
                      <UserCheck size={18} />
                      🎯 Demo Koç Girişi (Geliştirme)
                    </>
                  )}
                </div>
              </button>
              
              <p className="text-center text-xs text-amber-600 mt-2">
                Geliştirme ve test amaçlı demo koç paneli
              </p>
            </div>

            {/* Additional Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center space-y-4">
                <p className="text-gray-600 text-sm">
                  Kaydınız yoksa
                </p>
                <div className="flex gap-3 justify-center">
                  <Link
                    href="/student-registration"
                    className="px-6 py-3 bg-teal-50 border border-teal-200 text-sm font-semibold text-teal-700 rounded-2xl hover:bg-teal-100 transition-all duration-300"
                  >
                    Öğrenci olarak kayıt ol
                  </Link>
                  <Link
                    href="/coach-application"
                    className="px-6 py-3 bg-green-50 border border-green-200 text-sm font-semibold text-green-700 rounded-2xl hover:bg-green-100 transition-all duration-300"
                  >
                    Koç olarak kayıt ol
                  </Link>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
} 