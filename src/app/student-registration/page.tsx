'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  UserCheck,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  field: string;
};

export default function StudentRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    field: ''
  });

  const studyFields = [
    { id: 'yks', label: 'YKS HAZIRLIĞI', icon: '🎓' },
    { id: 'lgs', label: 'LGS HAZIRLIĞI', icon: '📚' },
    { id: 'preklinik', label: 'PRE KLİNİK ÖĞRENCİLERİ', icon: '🩺' },
    { id: 'klinik', label: 'KLİNİK ÖĞRENCİLERİ', icon: '🏥' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleFieldChange = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      field: fieldId
    }));
    setError('');
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.field) {
      setError('Lütfen tüm alanları doldurun.');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Geçerli bir e-posta adresi girin.');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in students list
      const studentData = {
        email: formData.email,
        password: formData.password, // Store password for login verification
        field: formData.field, // Store selected field
        studentId: 'student-' + Date.now(),
        registrationDate: new Date().toISOString(),
        userType: 'student',
        isActive: true,
        fullName: '', // Will be filled later if needed
        phone: '',
        profileCompleted: false
      };

      // Get existing students or initialize empty array
      const existingStudents = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
      
      // Check if email already exists
      const emailExists = existingStudents.some((student: any) => student.email === formData.email);
      
      if (emailExists) {
        setError('Bu e-posta adresi ile zaten kayıt yapılmış.');
        setIsSubmitting(false);
        return;
      }
      
      // Add new student to the list
      existingStudents.push(studentData);
      localStorage.setItem('registeredStudents', JSON.stringify(existingStudents));
      setIsSubmitted(true);
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        window.location.href = '/auth?mode=login&message=registration-success';
      }, 2000);

    } catch (error) {
      setError('Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}>
        {/* Background Elements */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(175, 46, 61, 0.4), rgba(175, 46, 61, 0.3), rgba(201, 75, 90, 0.2))'
          }}
        ></div>
        
        <div className="relative z-10 flex items-center justify-center px-4 py-12 min-h-screen">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 max-w-md w-full text-center"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}>
              <CheckCircle size={40} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Kayıt Başarılı!
            </h2>
            
            <p className="text-gray-600 text-lg mb-6">
              Hoşgeldiniz! Kayıt işleminiz başarıyla tamamlandı.
            </p>
            
            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-center justify-center gap-2">
                <Mail size={16} className="text-gray-500" />
                E-posta: {formData.email}
              </p>
              <p className="flex items-center justify-center gap-2">
                <BookOpen size={16} className="text-gray-500" />
                Alan: {studyFields.find(f => f.id === formData.field)?.label}
              </p>
              <p className="text-gray-500">
                Giriş sayfasına yönlendiriliyorsunuz...
              </p>
            </div>
            
            <motion.div
              className="mt-6 w-full bg-gray-200 rounded-full h-2"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
            >
              <div className="h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}></div>
          </motion.div>
        </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}>
      {/* Background Elements */}
      <div 
        className="absolute inset-0"
            style={{ 
          background: 'radial-gradient(ellipse at top, rgba(175, 46, 61, 0.4), rgba(175, 46, 61, 0.3), rgba(201, 75, 90, 0.2))'
            }}
          ></div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl" style={{ background: 'linear-gradient(45deg, rgba(175, 46, 61, 0.35), rgba(201, 75, 90, 0.20))' }}></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'linear-gradient(135deg, rgba(175, 46, 61, 0.4), rgba(201, 75, 90, 0.25))' }}></div>
      
      {/* Header */}
      <div className="relative z-10 bg-white/20 backdrop-blur-sm border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/auth" className="flex items-center gap-3 text-white hover:text-white/80 transition-all duration-300 group">
              <div className="flex items-center gap-2">
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-lg font-semibold">Geri</span>
                </div>
            </Link>
            
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}>
                <span className="text-white font-bold text-sm">E</span>
                  </div>
              <h1 className="text-2xl font-bold text-white">Öğrenci Kayıt</h1>
                </div>

            <div className="w-32"></div>
                </div>
              </div>
          </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)' }}>
                <GraduationCap size={40} className="text-white" />
                </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Öğrenci Kayıt
              </h2>
              <p className="text-gray-600 text-lg">
                Hızlı ve kolay kayıt işlemi
              </p>
              </div>
              
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3">
                  E-posta Adresi
                  </label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              {/* Study Field Selection */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3">
                  Çalışma Alanı
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {studyFields.map((field) => (
                    <motion.button
                      key={field.id}
                      type="button"
                      onClick={() => handleFieldChange(field.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        formData.field === field.id
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-2xl mb-2">{field.icon}</div>
                      <div className="text-sm font-medium">{field.label}</div>
                    </motion.button>
                  ))}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                    placeholder="En az 6 karakter"
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

              {/* Confirm Password Field */}
              <div>
                <label className="block text-gray-800 font-semibold mb-3">
                  Şifre Tekrar
                  </label>
                    <div className="relative">
                  <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                    placeholder="Şifrenizi tekrar girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                      <p className="font-semibold text-sm" style={{ color: '#af2e3d' }}>Kayıt Hatası</p>
                      <p className="text-sm" style={{ color: '#af2e3d' }}>{error}</p>
                       </div>
                     </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden text-white shadow-lg ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:-translate-y-1'
                   }`}
                   style={{
                  background: 'linear-gradient(135deg, #af2e3d 0%, #c94b5a 100%)'
                }}
              >
                <div className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Kayıt yapılıyor...
                    </>
                  ) : (
                    <>
                      <UserCheck size={20} />
                      Kayıt Ol
                           </>
                         )}
                </div>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-3">
                  Zaten hesabınız var mı?
                </p>
                <Link
                  href="/auth?mode=login"
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
                  Giriş Yap
                </Link>
                </div>
              </div>
                  </motion.div>
                  </div>
      </div>
    </div>
  );
} 