'use client';

import { useState, Suspense } from 'react';
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

function AuthContent() {
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
        // Student login logic - check against registered students
        const registeredStudents = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
        
        // Find student with matching email and password
        const student = registeredStudents.find((s: any) => 
          s.email === email && s.password === password && s.isActive
        );
        
        if (student) {
          // Student login successful - redirect to student panel
          localStorage.setItem('currentStudent', JSON.stringify({
            email: student.email,
            studentId: student.studentId,
            loggedIn: true,
            userType: 'student',
            fullName: student.fullName,
            profileCompleted: student.profileCompleted
          }));
          window.location.href = '/student-panel';
        } else {
          // Check if email exists but password is wrong
          const emailExists = registeredStudents.some((s: any) => s.email === email);
          
          if (emailExists) {
            setError('Şifre hatalı. Lütfen doğru şifrenizi girin.');
          } else {
            setError('Bu e-posta adresi ile kayıtlı öğrenci bulunamadı. Önce kayıt olmanız gerekiyor.');
          }
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoStudentLogin = () => {
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      // Create demo student data
      const demoStudentData = {
        email: 'demo@student.com',
        password: 'demo123',
        studentId: 'demo-student-001',
        registrationDate: new Date().toISOString(),
        userType: 'student',
        isActive: true,
        fullName: 'Demo Öğrenci',
        phone: '',
        profileCompleted: true
      };
      
      // Add demo student to registered students if not exists
      const registeredStudents = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
      const demoExists = registeredStudents.some((s: any) => s.email === 'demo@student.com');
      
      if (!demoExists) {
        registeredStudents.push(demoStudentData);
        localStorage.setItem('registeredStudents', JSON.stringify(registeredStudents));
      }
      
      // Set current student session
      localStorage.setItem('currentStudent', JSON.stringify({
        email: 'demo@student.com',
        studentId: 'demo-student-001',
        loggedIn: true,
        userType: 'student',
        fullName: 'Demo Öğrenci',
        profileCompleted: true,
        isDemo: true
      }));
      
      window.location.href = '/student-panel';
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}>
      {/* Modern Background Elements */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(175, 46, 61, 0.4), rgba(175, 46, 61, 0.3), rgba(201, 75, 90, 0.2))'
        }}
      ></div>
      
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23af2e3d' fill-opacity='0.12'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl" style={{ background: 'linear-gradient(45deg, rgba(175, 46, 61, 0.35), rgba(201, 75, 90, 0.20))' }}></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, rgba(175, 46, 61, 0.4), rgba(201, 75, 90, 0.25))' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl" style={{ background: 'linear-gradient(90deg, rgba(175, 46, 61, 0.3), rgba(201, 75, 90, 0.2))' }}></div>

      {/* Header */}
      <div className="relative z-10 bg-white/20 backdrop-blur-sm border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-white hover:text-white/80 transition-all duration-300 group">
              <div className="flex items-center gap-2">
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-lg font-semibold">Ana Sayfa</span>
              </div>
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}>
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Eylül Büyükkaya Akademi</h1>
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
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}>
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
                      ? 'shadow-lg'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
                     }`}
                     style={userType === 'student' ? { 
                       borderColor: '#af2e3d', 
                       backgroundColor: 'rgba(175, 46, 61, 0.1)', 
                       color: '#af2e3d' 
                     } : {}}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <GraduationCap size={24} />
                      <span className="font-semibold">Öğrenci</span>
                    </div>
                </button>
                  
                <div
                    className="relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                    title="Koç girişi yakında açılacak!"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users size={24} />
                      <span className="font-semibold">Koç</span>
                    </div>
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
                </div>
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
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300"
                    style={{ 
                      boxShadow: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#af2e3d';
                      e.target.style.boxShadow = '0 0 0 3px rgba(175, 46, 61, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
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
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300"
                    style={{ 
                      boxShadow: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#af2e3d';
                      e.target.style.boxShadow = '0 0 0 3px rgba(175, 46, 61, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = 'none';
                    }}
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
                    className="rounded-2xl p-4 flex items-start gap-3"
                    style={{ 
                      backgroundColor: 'rgba(175, 46, 61, 0.1)',
                      borderColor: '#af2e3d',
                      border: '1px solid'
                    }}
                    >
                    <AlertCircle size={20} className="mt-0.5 flex-shrink-0" style={{ color: '#af2e3d' }} />
                      <div>
                      <p className="font-semibold text-sm" style={{ color: '#af2e3d' }}>Giriş Hatası</p>
                      <p className="text-sm" style={{ color: '#af2e3d' }}>{error}</p>
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
                }`}
                style={userType === 'student' ? { 
                  background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)'
                } : { 
                  background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
                }}
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

              {/* Demo Student Login Button */}
            <div className="mt-6">
              <button
                onClick={handleDemoStudentLogin}
                disabled={isLoading}
                className={`relative w-full py-3 rounded-2xl font-semibold text-base transition-all duration-300 overflow-hidden border-2 ${
                  isLoading 
                    ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'border-cyan-300 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 hover:border-cyan-400 hover:shadow-lg hover:-translate-y-0.5'
                }`}
                title="Demo öğrenci hesabı ile sistemi test edin"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <GraduationCap size={18} />
                  🎓 Demo Öğrenci Girişi
                </div>
                <div className="absolute -top-1 -right-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-sm opacity-75 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-cyan-300/50 backdrop-blur-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] animate-bounce">🎓</span>
                        <span className="font-semibold tracking-wide">Demo</span>
                      </div>
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping"></div>
                  </div>
                </div>
              </button>
                
              <p className="text-center text-xs text-gray-500 mt-2">
                <span className="font-semibold">Email:</span> demo@student.com <span className="font-semibold ml-3">Şifre:</span> demo123
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
                    className="px-6 py-3 border text-sm font-semibold rounded-2xl transition-all duration-300"
                    style={{ 
                      backgroundColor: 'rgba(175, 46, 61, 0.1)',
                      borderColor: '#af2e3d',
                      color: '#af2e3d'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(175, 46, 61, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.backgroundColor = 'rgba(175, 46, 61, 0.1)';
                    }}
                  >
                    Öğrenci olarak kayıt ol
                  </Link>
                      <div
                        className="relative px-6 py-3 bg-gray-100 border border-gray-300 text-sm font-semibold text-gray-500 rounded-2xl cursor-not-allowed"
                        title="Koç kayıtları yakında açılacak!"
                      >
                        Koç olarak kayıt ol
                        <div className="absolute -top-1 -right-1">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full blur-sm opacity-75 animate-pulse"></div>
                            <div className="relative bg-gradient-to-r from-green-400 via-teal-400 to-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-green-300/50 backdrop-blur-sm">
                              <div className="flex items-center gap-1">
                                <span className="text-[8px] animate-bounce">📝</span>
                                <span className="font-semibold tracking-wide">Yakında</span>
                              </div>
                            </div>
                            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Yükleniyor...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}