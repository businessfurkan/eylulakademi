'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Calendar,
  FileText,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  Star
} from 'lucide-react';
import Link from 'next/link';
import { cities, getDistrictsByCity } from '@/data/cities';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  district: string;
  school: string;
  grade: string;
  targetExam: string;
  tytNet: string;
  aytNet: string;
  previousEducation: string;
  goals: string;
  selectedPackage: string;
};

type Package = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  color: string;
  icon: string;
  popular?: boolean;
};

export default function StudentRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isYearlyPricing, setIsYearlyPricing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    city: '',
    district: '',
    school: '',
    grade: '',
    targetExam: 'TUS',
    tytNet: '',
    aytNet: '',
    previousEducation: '',
    goals: '',
    selectedPackage: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePackageSelect = (packageId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPackage: packageId
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      setError('');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setError('');
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.city || !formData.district) {
          setError('Lütfen tüm zorunlu alanları doldurun.');
          return false;
        }
        if (!formData.email.includes('@')) {
          setError('Geçerli bir e-posta adresi girin.');
          return false;
        }
        return true;
      case 2:
        if (!formData.school || !formData.grade || !formData.targetExam) {
          setError('Lütfen tüm eğitim bilgilerini doldurun.');
          return false;
        }
        return true;
      case 3:
        if (!formData.selectedPackage) {
          setError('Lütfen bir paket seçin.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save student registration data
      const registrationData = {
        ...formData,
        registrationDate: new Date().toISOString(),
        status: 'pending',
        id: Date.now()
      };
      
      const existingRegistrations = JSON.parse(localStorage.getItem('studentRegistrations') || '[]');
      existingRegistrations.push(registrationData);
      localStorage.setItem('studentRegistrations', JSON.stringify(existingRegistrations));
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Kişisel Bilgiler', icon: User },
    { number: 2, title: 'Eğitim Bilgileri', icon: GraduationCap },
    { number: 3, title: 'Paket Seçimi', icon: Star },
    { number: 4, title: 'Bilgileri Kontrol Et', icon: CheckCircle }
  ];

  const packages: Package[] = [
    {
      id: 'tyt-coaching',
      name: 'TYT KOÇLUĞU',
      description: 'Temel Yeterlilik Testi için kapsamlı koçluk programı',
      price: isYearlyPricing ? '₺25.000' : '₺2.500',
      duration: isYearlyPricing ? '1 Yıllık' : '1 Aylık',
      features: [
        'Haftalık 2 birebir görüşme',
        'TYT konularında özel ders',
        'Deneme sınavları ve analiz',
        'Motivasyon ve strateji koçluğu',
        '7/24 WhatsApp desteği'
      ],
      color: 'from-blue-500 to-cyan-500',
      icon: '📚'
    },
    {
      id: 'ayt-coaching',
      name: 'AYT KOÇLUĞU',
      description: 'Alan Yeterlilik Testi için uzman koçluk desteği',
      price: isYearlyPricing ? '₺35.000' : '₺3.500',
      duration: isYearlyPricing ? '1 Yıllık' : '1 Aylık',
      features: [
        'Haftalık 3 birebir görüşme',
        'AYT konularında derinlemesine ders',
        'Sayısal/Sözel alan odaklı program',
        'Üniversite tercih danışmanlığı',
        'Özel çalışma materyalleri'
      ],
      color: 'from-purple-500 to-pink-500',
      icon: '🎯',
      popular: true
    },
    {
      id: 'lgs-coaching',
      name: 'LGS KOÇLUĞU',
      description: 'Liselere Geçiş Sınavı için özel hazırlık programı',
      price: isYearlyPricing ? '₺20.000' : '₺2.000',
      duration: isYearlyPricing ? '1 Yıllık' : '1 Aylık',
      features: [
        'Haftalık 2 birebir görüşme',
        'LGS konularında tekrar',
        'Sınav stratejileri',
        'Lise tercih danışmanlığı',
        'Aile danışmanlığı dahil'
      ],
      color: 'from-green-500 to-emerald-500',
      icon: '🌟'
    },
    {
      id: 'medical-coaching',
      name: 'TIP KOÇLUĞU',
      description: 'Tıp fakültesi öğrencileri için akademik koçluk',
      price: isYearlyPricing ? '₺40.000' : '₺4.000',
      duration: isYearlyPricing ? '1 Yıllık' : '1 Aylık',
      features: [
        'Haftalık 2 birebir görüşme',
        'Tıp konularında özel ders',
        'TUS hazırlık stratejileri',
        'Akademik gelişim planı',
        'Mesleki yönlendirme'
      ],
      color: 'from-red-500 to-orange-500',
      icon: '🏥'
    },
    {
      id: 'university-coaching',
      name: 'ÜNİVERSİTE KOÇLUĞU',
      description: 'Üniversite öğrencileri için genel akademik destek',
      price: isYearlyPricing ? '₺28.000' : '₺2.800',
      duration: isYearlyPricing ? '1 Yıllık' : '1 Aylık',
      features: [
        'Haftalık 1 birebir görüşme',
        'Ders çalışma teknikleri',
        'Motivasyon desteği',
        'Kariyer planlaması',
        'Stres yönetimi'
      ],
      color: 'from-indigo-500 to-blue-500',
      icon: '🎓'
    },
    {
      id: 'custom-coaching',
      name: 'ÖZEL KOÇLUK',
      description: 'Kişiye özel tasarlanmış koçluk programı',
      price: 'Özel Fiyat',
      duration: 'Esnek',
      features: [
        'Tamamen kişiselleştirilmiş program',
        'İhtiyaca göre görüşme sıklığı',
        'Özel konu odaklı dersler',
        'Esnek zamanlama',
        'Premium destek hattı'
      ],
      color: 'from-yellow-500 to-orange-500',
      icon: '⭐'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" style={{
        background: 'linear-gradient(to bottom right, #f8fafc, #e0f2fe, #ecfdf5)'
      }}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="relative z-10 bg-white/40 backdrop-blur-xl rounded-3xl p-12 max-w-lg w-full shadow-2xl border border-white/60 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CheckCircle size={40} className="text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-6"
          >
            🎉 Başvuru Gönderildi!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-gray-700 mb-8 leading-relaxed"
          >
            Öğrenci kaydınız başarıyla alındı! 🌟
            <br />
            <span className="font-semibold text-green-700">Eğitim ekibimiz</span> en kısa sürede değerlendirip size dönüş yapacak.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-xl"
                style={{
                  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.4)'
                }}
              >
                <ArrowLeft size={20} />
                Ana Sayfaya Dön
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/auth"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/70 backdrop-blur-sm border border-white/60 text-gray-700 rounded-xl hover:bg-white/90 transition-all duration-300 font-semibold shadow-lg"
              >
                Giriş Yap
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(to bottom right, #f8fafc, #e0f2fe, #ecfdf5)'
    }}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-cyan-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-bl from-cyan-400/8 to-teal-400/8 rounded-full blur-2xl"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md shadow-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700 transition-all duration-300 group">
                <motion.div
                  whileHover={{ x: -5 }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg group-hover:bg-white/30 transition-colors"
                >
                  <ArrowLeft size={20} />
                </motion.div>
                <span className="font-semibold">Ana Sayfa</span>
              </Link>
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-400 to-transparent"></div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap size={16} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  Öğrenci Olarak Kayıt Ol
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Academy Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl px-8 py-4 mb-10 border border-indigo-200/50 shadow-xl"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <GraduationCap size={16} className="text-white" />
            </motion.div>
            <span className="text-indigo-800 font-bold text-lg">🎓 Eylül Büyükkaya Akademi Ailesi</span>
          </motion.div>
          
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-black mb-8 leading-tight"
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
              Öğrenci
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
              Olarak Kayıt Ol
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Tıp eğitiminde hedeflerinize ulaşmak için{" "}
            <span className="font-bold text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text">
              Eylül Büyükkaya Akademi ailesinin
            </span>{" "}
            bir parçası olun.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {[
              { 
                icon: User, 
                title: "Kişisel Takip", 
                description: "Bireysel gelişim planı",
                color: "from-blue-500 to-cyan-500",
                bgColor: "from-blue-50 to-cyan-50"
              },
              { 
                icon: GraduationCap, 
                title: "Uzman Eğitim", 
                description: "Profesyonel rehberlik",
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50"
              },
              { 
                icon: FileText, 
                title: "Detaylı Analiz", 
                description: "Performans raporları",
                color: "from-indigo-500 to-purple-500",
                bgColor: "from-indigo-50 to-purple-50"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className={`relative overflow-hidden bg-gradient-to-br ${item.bgColor} backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-xl group cursor-pointer text-center`}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon - Centered */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <item.icon size={28} className="text-white" />
                </motion.div>
                
                {/* Content - Centered */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium group-hover:text-gray-700 transition-colors leading-relaxed">
                  {item.description}
                </p>
                
                {/* Decorative Elements */}
                <div className={`absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br ${item.color} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="relative">
          {/* Background Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-2 bg-gray-200 bg-opacity-30 rounded-full"></div>
          <div 
            className="absolute top-8 left-0 h-2 rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ 
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              backgroundColor: '#17997f'
            }}
          ></div>

          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center group">
                {/* Step Circle */}
                <div className={`relative w-16 h-16 rounded-full transition-all duration-500 transform ${
                  currentStep >= step.number 
                    ? 'shadow-xl scale-110' 
                    : currentStep === step.number - 1
                    ? 'shadow-lg scale-105'
                    : 'shadow-md'
                }`} style={{
                  backgroundColor: currentStep >= step.number ? '#17997f' : 
                                 currentStep === step.number - 1 ? '#1fa892' : 
                                 '#94a3b8'
                }}>
                  {/* Inner Circle with Icon */}
                  <div className={`absolute inset-1 rounded-full flex items-center justify-center transition-all duration-500 ${
                    currentStep >= step.number 
                      ? 'text-white' 
                      : currentStep === step.number - 1
                      ? 'text-white'
                      : 'text-white'
                  }`} style={{
                    backgroundColor: currentStep >= step.number ? '#17997f' : 
                                   currentStep === step.number - 1 ? '#1fa892' : 
                                   '#94a3b8'
                  }}>
                    {currentStep > step.number ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <step.icon size={22} />
                    )}
                  </div>

                  {/* Pulse Animation for Current Step */}
                  {currentStep === step.number && (
                    <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{
                      backgroundColor: '#17997f'
                    }}></div>
                  )}
                </div>

                {/* Step Text */}
                <div className={`mt-4 text-center transition-all duration-300 max-w-32 ${
                  currentStep >= step.number 
                    ? 'text-gray-800' 
                    : 'text-gray-600'
                }`}>
                  <div className={`text-sm font-bold mb-1 ${
                    currentStep === step.number ? 'text-gray-900' : ''
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs opacity-90 font-medium">
                    {step.number}. Adım
                  </div>
                  {currentStep === step.number && (
                    <div className="mt-1 text-xs text-white px-2 py-1 rounded-full" style={{
                      backgroundColor: '#17997f'
                    }}>
                      Aktif
                    </div>
                  )}
                </div>

                {/* Step Number Badge */}
                <div className={`absolute -top-2 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'text-white shadow-lg' 
                    : currentStep === step.number
                    ? 'text-white shadow-md animate-pulse'
                    : 'bg-gray-400 text-white'
                }`} style={{
                  backgroundColor: currentStep >= step.number ? '#17997f' : 
                                 currentStep === step.number ? '#17997f' : 
                                 '#94a3b8'
                }}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Percentage Text */}
          <div className="text-center mt-8">
            <div className="text-gray-800 text-sm font-semibold mb-1">
              İlerleme: {Math.round((currentStep / steps.length) * 100)}%
            </div>
            <div className="w-48 mx-auto bg-gray-200 bg-opacity-40 rounded-full h-3">
              <div 
                className="h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ 
                  width: `${(currentStep / steps.length) * 100}%`,
                  backgroundColor: '#17997f'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)'
          }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <FileText size={32} className="text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-4">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-4">
              {currentStep === 1 && "Kişisel bilgilerinizi eksiksiz doldurunuz. Tüm bilgiler gizli tutulacaktır."}
              {currentStep === 2 && "Eğitim durumunuz ve hedeflerinizi belirtiniz. Bu bilgiler sizin için özel eğitim planı hazırlanmasında kullanılacaktır."}
              {currentStep === 3 && "Size en uygun koçluk paketini seçiniz. Her paket farklı avantajlar sunar."}
              {currentStep === 4 && "Bilgilerinizi kontrol edin ve başvurunuzu tamamlayın. Başvurunuz değerlendirildikten sonra size dönüş yapılacaktır."}
            </p>
            <Link 
              href="/auth"
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors font-semibold bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/40"
            >
              Hesabınız varsa giriş yap
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Header Section */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: '#17997f' }}
                >
                  <User size={28} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Kişisel Bilgiler</h3>
                  <p className="text-gray-600 mt-1">Temel iletişim bilgilerinizi eksiksiz doldurunuz</p>
                </div>
              </div>
              
              {/* Form Fields */}
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Ad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#17997f';
                        e.target.style.boxShadow = '0 0 0 3px rgba(23, 153, 127, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Adınızı girin"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
                      onFocus={(e) => {
                        e.target.style.borderColor = '#17997f';
                        e.target.style.boxShadow = '0 0 0 3px rgba(23, 153, 127, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Soyadınızı girin"
                    />
                  </div>
                </div>
                
                {/* Contact Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      E-posta <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Mail size={20} style={{ color: '#17997f' }} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#17997f';
                          e.target.style.boxShadow = '0 0 0 3px rgba(23, 153, 127, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Phone size={20} style={{ color: '#17997f' }} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:border-transparent transition-all duration-300 hover:bg-gray-100 text-gray-900 placeholder-gray-500"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#17997f';
                          e.target.style.boxShadow = '0 0 0 3px rgba(23, 153, 127, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="0555 123 45 67"
                      />
                                      </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500" />
                    Doğum Tarihi
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative">
                      <select
                        name="birthDay"
                        value={formData.birthDate ? formData.birthDate.split('-')[2] : ''}
                        onChange={(e) => {
                          const day = e.target.value;
                          const month = formData.birthDate ? formData.birthDate.split('-')[1] : '';
                          const year = formData.birthDate ? formData.birthDate.split('-')[0] : '';
                          const newDate = day && month && year ? `${year}-${month}-${day}` : '';
                          setFormData(prev => ({ ...prev, birthDate: newDate }));
                        }}
                        className="w-full px-3 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60 text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Gün</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day.toString().padStart(2, '0')}>
                            {day}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        name="birthMonth"
                        value={formData.birthDate ? formData.birthDate.split('-')[1] : ''}
                        onChange={(e) => {
                          const month = e.target.value;
                          const day = formData.birthDate ? formData.birthDate.split('-')[2] : '';
                          const year = formData.birthDate ? formData.birthDate.split('-')[0] : '';
                          const newDate = day && month && year ? `${year}-${month}-${day}` : '';
                          setFormData(prev => ({ ...prev, birthDate: newDate }));
                        }}
                        className="w-full px-3 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60 text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Ay</option>
                        <option value="01">Ocak</option>
                        <option value="02">Şubat</option>
                        <option value="03">Mart</option>
                        <option value="04">Nisan</option>
                        <option value="05">Mayıs</option>
                        <option value="06">Haziran</option>
                        <option value="07">Temmuz</option>
                        <option value="08">Ağustos</option>
                        <option value="09">Eylül</option>
                        <option value="10">Ekim</option>
                        <option value="11">Kasım</option>
                        <option value="12">Aralık</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        name="birthYear"
                        value={formData.birthDate ? formData.birthDate.split('-')[0] : ''}
                        onChange={(e) => {
                          const year = e.target.value;
                          const day = formData.birthDate ? formData.birthDate.split('-')[2] : '';
                          const month = formData.birthDate ? formData.birthDate.split('-')[1] : '';
                          const newDate = day && month && year ? `${year}-${month}-${day}` : '';
                          setFormData(prev => ({ ...prev, birthDate: newDate }));
                        }}
                        className="w-full px-3 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60 text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Yıl</option>
                        {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - 15 - i).map(year => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-500" />
                    İl <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={(e) => {
                        handleChange(e);
                        // Reset district when city changes
                        setFormData(prev => ({ ...prev, district: '' }));
                      }}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60 appearance-none cursor-pointer"
                    >
                      <option value="">İl seçiniz</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-indigo-500" />
                    İlçe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      disabled={!formData.city}
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60 disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
                    >
                      <option value="">
                        {!formData.city ? 'Önce il seçiniz' : 'İlçe seçiniz'}
                      </option>
                      {formData.city && getDistrictsByCity(formData.city).map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className={`w-5 h-5 transition-colors ${formData.city ? 'text-gray-400' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </motion.div>
          )}

          {/* Step 2: Education Information */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <GraduationCap size={20} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Eğitim Bilgileri</h3>
                  <p className="text-sm text-gray-600">Akademik durumunuz ve hedefleriniz</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Okul/Üniversite <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60"
                    placeholder="Öğrenim gördüğünüz kurum"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sınıf/Dönem <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60"
                  >
                    <option value="">Seçiniz</option>
                    <option value="1">1. Sınıf</option>
                    <option value="2">2. Sınıf</option>
                    <option value="3">3. Sınıf</option>
                    <option value="4">4. Sınıf</option>
                    <option value="5">5. Sınıf</option>
                    <option value="6">6. Sınıf</option>
                    <option value="mezun">Mezun</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hedef Sınav <span className="text-red-500">*</span>
                </label>
                <select
                  name="targetExam"
                  value={formData.targetExam}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60"
                >
                  <option value="TUS">TUS (Tıpta Uzmanlık Sınavı)</option>
                  <option value="STS">STS (Sağlık Bilimleri Uzmanlık Sınavı)</option>
                  <option value="DUS">DUS (Diş Hekimliği Uzmanlık Sınavı)</option>
                  <option value="YKS">YKS (Yükseköğretim Kurumları Sınavı)</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 mt-6">
                <h4 className="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
                  <GraduationCap size={20} />
                  Mevcut Başarınız
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TYT Net Puan
                    </label>
                    <input
                      type="number"
                      name="tytNet"
                      value={formData.tytNet}
                      onChange={handleChange}
                      min="0"
                      max="120"
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60"
                      placeholder="TYT net puanınız (varsa)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AYT Net Puan
                    </label>
                    <input
                      type="number"
                      name="aytNet"
                      value={formData.aytNet}
                      onChange={handleChange}
                      min="0"
                      max="80"
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60"
                      placeholder="AYT net puanınız (varsa)"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Önceki Eğitim Deneyimi
                </label>
                <textarea
                  name="previousEducation"
                  value={formData.previousEducation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60"
                  placeholder="Daha önce aldığınız kurs veya eğitimler varsa belirtiniz"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hedefleriniz ve Beklentileriniz
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:bg-white/90 border-white/60"
                  placeholder="Bu eğitimden beklentilerinizi ve hedeflerinizi açıklayınız"
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Package Selection */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <Star size={28} className="text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Paket Seçimi</h3>
                <p className="text-gray-600 text-lg mb-8">Size en uygun koçluk paketini seçin</p>
                
                {/* Pricing Toggle Switch */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className={`text-lg font-semibold transition-colors duration-300 ${!isYearlyPricing ? 'text-gray-900' : 'text-gray-500'}`}>
                    Aylık
                  </span>
                  
                  <motion.div
                    className="relative inline-flex h-8 w-16 cursor-pointer"
                    onClick={() => setIsYearlyPricing(!isYearlyPricing)}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                    <motion.div
                      className="absolute w-6 h-6 bg-white rounded-full shadow-md top-1 left-1"
                      animate={{
                        x: isYearlyPricing ? 32 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  </motion.div>
                  
                  <span className={`text-lg font-semibold transition-colors duration-300 ${isYearlyPricing ? 'text-gray-900' : 'text-gray-500'}`}>
                    Yıllık
                  </span>
                </div>
                
                {/* Discount Badge */}
                {isYearlyPricing && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-emerald-200"
                  >
                    <span className="text-emerald-600">🎉</span>
                    Yıllık ödemede %17 indirim!
                  </motion.div>
                )}
              </div>

              {/* Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative bg-white rounded-3xl p-6 shadow-xl border-2 transition-all duration-300 cursor-pointer ${
                      formData.selectedPackage === pkg.id 
                        ? 'border-emerald-500 ring-4 ring-emerald-500/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePackageSelect(pkg.id)}
                  >
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          ⭐ Popüler
                        </div>
                      </div>
                    )}

                    {/* Selected Badge */}
                    {formData.selectedPackage === pkg.id && (
                      <div className="absolute -top-3 right-4">
                        <div className="bg-emerald-500 text-white p-2 rounded-full">
                          <CheckCircle size={16} />
                        </div>
                      </div>
                    )}

                    {/* Package Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${pkg.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-3xl">{pkg.icon}</span>
                    </div>

                    {/* Package Info */}
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                      <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-600">{pkg.price}</div>
                          <div className="text-sm text-gray-500">{pkg.duration}</div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={12} className="text-emerald-600" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Select Button */}
                    <button
                      onClick={() => handlePackageSelect(pkg.id)}
                      className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        formData.selectedPackage === pkg.id
                          ? 'bg-emerald-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {formData.selectedPackage === pkg.id ? '✓ Seçildi' : 'Seç'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Information Review */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <CheckCircle size={20} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Bilgileri Kontrol Et</h3>
                  <p className="text-sm text-gray-600">Son kontrol ve onay</p>
                </div>
              </div>

              {/* Selected Package Info */}
              {formData.selectedPackage && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200 mb-8">
                  <h4 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
                    <Star size={24} />
                    Seçilen Paket
                  </h4>
                  {(() => {
                    const selectedPkg = packages.find(p => p.id === formData.selectedPackage);
                    return selectedPkg ? (
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${selectedPkg.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <span className="text-2xl">{selectedPkg.icon}</span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900">{selectedPkg.name}</div>
                          <div className="text-emerald-700">{selectedPkg.price} • {selectedPkg.duration}</div>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <FileText size={24} className="text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Başvuru Özeti</h3>
                    <p className="text-gray-600">Girdiğiniz bilgileri kontrol edin</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-3">
                      <User size={20} className="text-blue-600" />
                      Kişisel Bilgiler
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Ad Soyad</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.firstName} {formData.lastName}</div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">E-posta</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.email}</div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Telefon</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.phone}</div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Şehir</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.city} / {formData.district}</div>
                      </div>
                    </div>
                  </div>

                  {/* Education Information Section */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-3">
                      <GraduationCap size={20} className="text-purple-600" />
                      Eğitim Bilgileri
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Okul</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.school}</div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Sınıf</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.grade}</div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm text-gray-600 mb-1">Hedef Sınav</div>
                        <div className="text-lg font-semibold text-gray-900">{formData.targetExam}</div>
                      </div>
                      {(formData.tytNet || formData.aytNet) && (
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                          <div className="text-sm text-gray-600 mb-1">Net Puanlar</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {formData.tytNet && `TYT: ${formData.tytNet}`}
                            {formData.tytNet && formData.aytNet && ' | '}
                            {formData.aytNet && `AYT: ${formData.aytNet}`}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Information */}
                  {(formData.previousEducation || formData.goals) && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                      <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-3">
                        <FileText size={20} className="text-green-600" />
                        Ek Bilgiler
                      </h4>
                      <div className="space-y-4">
                        {formData.previousEducation && (
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-sm text-gray-600 mb-1">Önceki Eğitim</div>
                            <div className="text-lg font-semibold text-gray-900">{formData.previousEducation}</div>
                          </div>
                        )}
                        {formData.goals && (
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-sm text-gray-600 mb-1">Hedefler ve Beklentiler</div>
                            <div className="text-lg font-semibold text-gray-900">{formData.goals}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-6 rounded-3xl mt-8">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <AlertCircle size={24} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-amber-800 font-bold text-lg mb-2">Önemli Bilgilendirme</h4>
                    <p className="text-amber-700">
                      Başvurunuzu gönderdikten sonra, başvuru durumunuz değerlendirmeye alınacaktır. 
                      Sonuç hakkında <strong>48 saat içinde</strong> e-posta ile bilgilendirileceksiniz.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-semibold text-sm">Hata</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-sm"
            >
              ← Önceki
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {currentStep === 3 ? 'İlerle →' : 'Sonraki →'}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Başvuruyu Tamamla
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 