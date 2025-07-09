'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  BookOpen,
  Target,
  MessageCircle,
  CheckCircle,
  ArrowLeft,
  Instagram,
  Clock,
  Lightbulb,
  Users,
  Heart,
  Award,
  Brain,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

type CoachApplicationData = {
  // 📌 Kişisel Bilgiler
  fullName: string;
  birthDate: string;
  country: string;
  city: string;
  district: string;
  email: string;
  phone: string;
  instagram: string;
  currentJobSchool: string;
  gradeOrGraduationYear: string;

  // 🎯 Eğitim ve Deneyim Bilgileri
  currentStudyField: string;
  coachingExperience: string;
  coachingAreas: string[];

  // 🧠 Koçluk Vizyonun
  goodCoachDefinition: string;
  tipkomMeaning: string;
  timeAvailability: string;
  platformUsage: string;

  // 💬 Ekstra Sorular
  threeWords: string;
  threeQualities: string;
  innovationIdea: string;
  studentExample: string;
  interviewAvailability: string;

  // ✅ Onay Kutusu
  confirmationChecked: boolean;
};

export default function CoachApplication() {
  const [formData, setFormData] = useState<CoachApplicationData>({
    // 📌 Kişisel Bilgiler
    fullName: '',
    birthDate: '',
    country: '',
    city: '',
    district: '',
    email: '',
    phone: '',
    instagram: '',
    currentJobSchool: '',
    gradeOrGraduationYear: '',

    // 🎯 Eğitim ve Deneyim Bilgileri
    currentStudyField: '',
    coachingExperience: '',
    coachingAreas: [],

    // 🧠 Koçluk Vizyonun
    goodCoachDefinition: '',
    tipkomMeaning: '',
    timeAvailability: '',
    platformUsage: '',

    // 💬 Ekstra Sorular
    threeWords: '',
    threeQualities: '',
    innovationIdea: '',
    studentExample: '',
    interviewAvailability: '',

    // ✅ Onay Kutusu
    confirmationChecked: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 📌 Kişisel Bilgiler Validasyonu
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad Soyad zorunludur';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Doğum tarihi zorunludur';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Ülke bilgisi zorunludur';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Şehir bilgisi zorunludur';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'İlçe bilgisi zorunludur';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası zorunludur';
    } else if (!/^0\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz (05xx xxx xx xx)';
    }

    if (!formData.currentJobSchool.trim()) {
      newErrors.currentJobSchool = 'Mevcut meslek/okul bilgisi zorunludur';
    }

    if (!formData.gradeOrGraduationYear.trim()) {
      newErrors.gradeOrGraduationYear = 'Sınıf/Mezuniyet yılı zorunludur';
    }

    // 🎯 Eğitim ve Deneyim Validasyonu
    if (!formData.currentStudyField.trim()) {
      newErrors.currentStudyField = 'Şu anki eğitim durumu zorunludur';
    }

    if (!formData.coachingExperience.trim()) {
      newErrors.coachingExperience = 'Koçluk deneyimi alanı zorunludur';
    }

    if (formData.coachingAreas.length === 0) {
      newErrors.coachingAreas = 'En az bir koçluk alanı seçmelisiniz';
    }

    // 🧠 Koçluk Vizyonu Validasyonu
    if (!formData.goodCoachDefinition.trim()) {
      newErrors.goodCoachDefinition = 'İyi koç tanımı zorunludur';
    } else if (formData.goodCoachDefinition.length < 50) {
      newErrors.goodCoachDefinition = 'En az 50 karakter yazmalısınız';
    }

    if (!formData.tipkomMeaning.trim()) {
      newErrors.tipkomMeaning = 'Tıpkom Koçluk ailesi anlamı zorunludur';
    } else if (formData.tipkomMeaning.length < 50) {
      newErrors.tipkomMeaning = 'En az 50 karakter yazmalısınız';
    }

    if (!formData.timeAvailability.trim()) {
      newErrors.timeAvailability = 'Zaman durumu zorunludur';
    }

    if (!formData.platformUsage.trim()) {
      newErrors.platformUsage = 'Platform kullanımı zorunludur';
    }

    // 💬 Ekstra Sorular Validasyonu
    if (!formData.threeWords.trim()) {
      newErrors.threeWords = '3 kelime ile tanımlama zorunludur';
    }

    if (!formData.threeQualities.trim()) {
      newErrors.threeQualities = '3 özellik belirtmek zorunludur';
    } else if (formData.threeQualities.length < 30) {
      newErrors.threeQualities = 'En az 30 karakter yazmalısınız';
    }

    if (!formData.studentExample.trim()) {
      newErrors.studentExample = 'Öğrenci örneği zorunludur';
    } else if (formData.studentExample.length < 100) {
      newErrors.studentExample = 'En az 100 karakter yazmalısınız';
    }

    if (!formData.interviewAvailability.trim()) {
      newErrors.interviewAvailability = 'Mülakat zamanları zorunludur';
    }

    // ✅ Onay Kutusu Validasyonu
    if (!formData.confirmationChecked) {
      newErrors.confirmationChecked = 'Onay kutusunu işaretlemelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof CoachApplicationData, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (field: 'coachingAreas', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const coachingAreasOptions = [
    'LGS',
    'YKS',
    'Tıp PreKlinik',
    'Tıp Klinik',
    'TUS',
    'USMLE',
    'Diğer'
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
            Koç başvurunuz başarıyla alındı! 🌟
            <br />
            <span className="font-semibold text-green-700">Admin ekibimiz</span> en kısa sürede değerlendirip size dönüş yapacak.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
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
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
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
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"
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
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-bl from-cyan-400/15 to-blue-400/15 rounded-full blur-2xl"
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
                  Koç Başvurusu
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent mb-6">
            Koç Başvuru Formu
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Eylül Büyükkaya Akademi ailesine katılarak öğrencilerin başarı yolculuğunda rehberlik yapmak istiyorsanız, lütfen formu eksiksiz doldurun.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* 📌 Kişisel Bilgiler */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">📌 Kişisel Bilgiler</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Adınız ve soyadınız"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doğum Tarihi *
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bulunduğun Ülke *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ülke"
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Şehir *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Şehir"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    İlçe *
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="İlçe"
                  />
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="ornek@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon Numarası *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="05xx xxx xx xx"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instagram Kullanıcı Adı (İsteğe Bağlı)
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="@kullaniciadi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mevcut Meslek/Okul *
                  </label>
                  <input
                    type="text"
                    value={formData.currentJobSchool}
                    onChange={(e) => handleChange('currentJobSchool', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Meslek veya okul adı"
                  />
                  {errors.currentJobSchool && <p className="text-red-500 text-sm mt-1">{errors.currentJobSchool}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sınıf/Mezuniyet Yılı *
                  </label>
                  <input
                    type="text"
                    value={formData.gradeOrGraduationYear}
                    onChange={(e) => handleChange('gradeOrGraduationYear', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Örn: 3. Sınıf veya 2023"
                  />
                  {errors.gradeOrGraduationYear && <p className="text-red-500 text-sm mt-1">{errors.gradeOrGraduationYear}</p>}
                </div>
              </div>
            </div>

            {/* 🎯 Eğitim ve Deneyim Bilgileri */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <GraduationCap size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">🎯 Eğitim ve Deneyim Bilgileri</h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Şu anda hangi bölümü/sınıfı okuyorsun? *
                </label>
                <textarea
                  value={formData.currentStudyField}
                  onChange={(e) => handleChange('currentStudyField', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={3}
                  placeholder="Mevcut eğitim durumunuzu detaylı olarak açıklayın"
                />
                {errors.currentStudyField && <p className="text-red-500 text-sm mt-1">{errors.currentStudyField}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Koçluk/Özel Ders/Mentorluk Deneyimin *
                </label>
                <textarea
                  value={formData.coachingExperience}
                  onChange={(e) => handleChange('coachingExperience', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="Koçluk, özel ders veya mentorluk deneyimlerinizi detaylı olarak paylaşın"
                />
                {errors.coachingExperience && <p className="text-red-500 text-sm mt-1">{errors.coachingExperience}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Koçluk Alanları *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {coachingAreasOptions.map((area) => (
                    <label key={area} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.coachingAreas.includes(area)}
                        onChange={(e) => handleArrayChange('coachingAreas', area, e.target.checked)}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                      />
                      <span className="text-sm text-gray-700">{area}</span>
                    </label>
                  ))}
                </div>
                {errors.coachingAreas && <p className="text-red-500 text-sm mt-1">{errors.coachingAreas}</p>}
              </div>
            </div>

            {/* 🧠 Koçluk Vizyonun */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">🧠 Koçluk Vizyonun</h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sence iyi bir koç nasıl olmalı? *
                </label>
                <textarea
                  value={formData.goodCoachDefinition}
                  onChange={(e) => handleChange('goodCoachDefinition', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="İyi bir koçun sahip olması gereken özellikler hakkında görüşlerinizi paylaşın (minimum 50 karakter)"
                />
                {errors.goodCoachDefinition && <p className="text-red-500 text-sm mt-1">{errors.goodCoachDefinition}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tıpkom Koçluk ailesi senin için ne anlama geliyor? *
                </label>
                <textarea
                  value={formData.tipkomMeaning}
                  onChange={(e) => handleChange('tipkomMeaning', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="Tıpkom Koçluk ailesinin sizin için anlamını açıklayın (minimum 50 karakter)"
                />
                {errors.tipkomMeaning && <p className="text-red-500 text-sm mt-1">{errors.tipkomMeaning}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Zaman Durumun *
                </label>
                <textarea
                  value={formData.timeAvailability}
                  onChange={(e) => handleChange('timeAvailability', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={3}
                  placeholder="Koçluk için ayırabileceğiniz zaman dilimlerini belirtin"
                />
                {errors.timeAvailability && <p className="text-red-500 text-sm mt-1">{errors.timeAvailability}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Platform Kullanımı *
                </label>
                <textarea
                  value={formData.platformUsage}
                  onChange={(e) => handleChange('platformUsage', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={3}
                  placeholder="Hangi platformları kullanarak koçluk yapmayı planlıyorsunuz?"
                />
                {errors.platformUsage && <p className="text-red-500 text-sm mt-1">{errors.platformUsage}</p>}
              </div>
            </div>

            {/* 💬 Ekstra Sorular */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">💬 Ekstra Sorular</h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kendini 3 kelime ile nasıl tanımlarsın? *
                </label>
                <input
                  type="text"
                  value={formData.threeWords}
                  onChange={(e) => handleChange('threeWords', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Örn: Sabırlı, Motivasyonlu, Çözüm Odaklı"
                />
                {errors.threeWords && <p className="text-red-500 text-sm mt-1">{errors.threeWords}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bir koç olarak en güçlü 3 özelliğin nedir? *
                </label>
                <textarea
                  value={formData.threeQualities}
                  onChange={(e) => handleChange('threeQualities', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={3}
                  placeholder="En güçlü 3 özelliğinizi açıklayın (minimum 30 karakter)"
                />
                {errors.threeQualities && <p className="text-red-500 text-sm mt-1">{errors.threeQualities}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Eğitim sürecine dair bir yenilik/fikir önerebilir misin?
                </label>
                <textarea
                  value={formData.innovationIdea}
                  onChange={(e) => handleChange('innovationIdea', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="Eğitim sürecini iyileştirmek için önerilerinizi paylaşın"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Koçluk yaptığın bir öğrenci örneği verebilir misin? *
                </label>
                <textarea
                  value={formData.studentExample}
                  onChange={(e) => handleChange('studentExample', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="Koçluk deneyiminizden bir örnek paylaşın (minimum 100 karakter)"
                />
                {errors.studentExample && <p className="text-red-500 text-sm mt-1">{errors.studentExample}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mülakat için hangi zaman dilimlerinde müsaitsin? *
                </label>
                <textarea
                  value={formData.interviewAvailability}
                  onChange={(e) => handleChange('interviewAvailability', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  rows={3}
                  placeholder="Mülakat için uygun olduğunuz gün ve saatleri belirtin"
                />
                {errors.interviewAvailability && <p className="text-red-500 text-sm mt-1">{errors.interviewAvailability}</p>}
              </div>
            </div>

            {/* ✅ Onay Kutusu */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">✅ Onay Kutusu</h3>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.confirmationChecked}
                    onChange={(e) => handleChange('confirmationChecked', e.target.checked)}
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Verdiğim bilgilerin doğru olduğunu, koçluk sürecinde kurallara uyacağımı ve Eylül Büyükkaya Akademi değerlerini benimseyen bir yaklaşım sergileyeceğimi beyan ederim. Başvuru sürecinde gerekli değerlendirmelerin yapılacağını ve sonucunun tarafıma bildirileceğini kabul ediyorum.
                  </span>
                </label>
                {errors.confirmationChecked && <p className="text-red-500 text-sm mt-2">{errors.confirmationChecked}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
                }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Gönderiliyor...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles size={20} />
                    Başvuruyu Gönder
                  </div>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 