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
  X
} from 'lucide-react';
import Link from 'next/link';

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
  documents: File[];
};

export default function StudentRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

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
    documents: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(e.target.files!)]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
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
    { number: 3, title: 'Belge Yükleme & Onay', icon: FileText }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Başvurunuz Alındı!
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Öğrenci kaydınız başarıyla alınmıştır. Başvurunuz değerlendirildikten sonra 
            size geri dönüş yapılacaktır.
          </p>
          
          <div className="space-y-3">
            <Link 
              href="/"
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
            >
              Ana Sayfaya Dön
            </Link>
            <Link 
              href="/auth"
              className="block w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
            >
              Giriş Yap
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#9cdcd7' }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 animate-pulse"
          style={{ 
            background: 'linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
            animationDuration: '4s'
          }}
        ></div>
        <div 
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full opacity-15 animate-bounce"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
            animationDuration: '6s'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full opacity-25 animate-pulse"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
            animationDelay: '2s',
            animationDuration: '5s'
          }}
        ></div>
        <div 
          className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full opacity-10 animate-bounce"
          style={{ 
            background: 'linear-gradient(45deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))',
            animationDuration: '7s',
            animationDelay: '3s'
          }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-20 border-b border-gray-200 shadow-lg" style={{ backgroundColor: '#9cdcd7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-gray-800 hover:text-gray-600 transition-colors group">
              <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-lg">Ana Sayfa</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Eylül Büyükkaya Akademi
              <div className="text-sm font-normal opacity-80 mt-1">Öğrenci Kaydı</div>
            </h1>
            <div className="w-24"></div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="relative">
          {/* Background Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-white bg-opacity-20 rounded-full"></div>
          <div 
            className="absolute top-8 left-0 h-1 bg-gradient-to-r from-white to-white rounded-full transition-all duration-700 ease-out shadow-lg"
            style={{ 
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
            }}
          ></div>

          <div className="flex justify-between relative">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center group">
                {/* Step Circle */}
                <div className={`relative w-16 h-16 rounded-full transition-all duration-500 transform ${
                  currentStep >= step.number 
                    ? 'bg-white shadow-xl scale-110' 
                    : currentStep === step.number - 1
                    ? 'bg-white bg-opacity-60 shadow-lg scale-105'
                    : 'bg-white bg-opacity-30 shadow-md'
                }`}>
                  {/* Inner Circle with Icon */}
                  <div className={`absolute inset-1 rounded-full flex items-center justify-center transition-all duration-500 ${
                    currentStep >= step.number 
                      ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white' 
                      : currentStep === step.number - 1
                      ? 'bg-gradient-to-br from-teal-400 to-teal-500 text-white'
                      : 'bg-transparent text-white'
                  }`}>
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
                    <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20"></div>
                  )}
                </div>

                {/* Step Text */}
                <div className={`mt-4 text-center transition-all duration-300 max-w-32 ${
                  currentStep >= step.number 
                    ? 'text-white' 
                    : 'text-white text-opacity-70'
                }`}>
                  <div className={`text-sm font-bold mb-1 ${
                    currentStep === step.number ? 'text-white' : ''
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs opacity-90 font-medium">
                    {step.number}. Adım
                  </div>
                  {currentStep === step.number && (
                    <div className="mt-1 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      Aktif
                    </div>
                  )}
                </div>

                {/* Step Number Badge */}
                <div className={`absolute -top-2 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : currentStep === step.number
                    ? 'bg-yellow-400 text-gray-800 shadow-md animate-pulse'
                    : 'bg-gray-400 text-white'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Percentage Text */}
          <div className="text-center mt-8">
            <div className="text-white text-sm font-semibold mb-1">
              İlerleme: {Math.round((currentStep / steps.length) * 100)}%
            </div>
            <div className="w-48 mx-auto bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-white to-gray-100 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
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
          className="bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white border-opacity-30"
          style={{ 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
          }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 text-sm">
              {currentStep === 1 && "Kişisel bilgilerinizi eksiksiz doldurunuz"}
              {currentStep === 2 && "Eğitim durumunuz ve hedeflerinizi belirtiniz"}
              {currentStep === 3 && "Son adımda belgelerinizi yükleyip kaydınızı tamamlayınız"}
            </p>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Ad *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="Adınızı girin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="Soyadınızı girin"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="0555 123 45 67"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Doğum Tarihi
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    İl *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="İl seçiniz"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    İlçe *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="İlçe seçiniz"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education Information */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Okul/Üniversite *
                  </label>
                  <input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                    placeholder="Öğrenim gördüğünüz kurum"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Sınıf/Dönem *
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
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

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Hedef Sınav *
                </label>
                <select
                  name="targetExam"
                  value={formData.targetExam}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                >
                  <option value="TUS">TUS (Tıpta Uzmanlık Sınavı)</option>
                  <option value="STS">STS (Sağlık Bilimleri Uzmanlık Sınavı)</option>
                  <option value="DUS">DUS (Diş Hekimliği Uzmanlık Sınavı)</option>
                  <option value="YKS">YKS (Yükseköğretim Kurumları Sınavı)</option>
                  <option value="other">Diğer</option>
                </select>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-2xl border border-teal-100">
                <h4 className="text-lg font-semibold text-teal-800 mb-4 flex items-center gap-2">
                  <GraduationCap size={20} />
                  Mevcut Başarınız
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      TYT Net Puan
                    </label>
                    <input
                      type="number"
                      name="tytNet"
                      value={formData.tytNet}
                      onChange={handleChange}
                      min="0"
                      max="120"
                      className="w-full px-5 py-4 border-2 border-teal-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-white hover:border-teal-300"
                      placeholder="TYT net puanınız (varsa)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      AYT Net Puan
                    </label>
                    <input
                      type="number"
                      name="aytNet"
                      value={formData.aytNet}
                      onChange={handleChange}
                      min="0"
                      max="80"
                      className="w-full px-5 py-4 border-2 border-teal-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-white hover:border-teal-300"
                      placeholder="AYT net puanınız (varsa)"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Önceki Eğitim Deneyimi
                </label>
                <textarea
                  name="previousEducation"
                  value={formData.previousEducation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                  placeholder="Daha önce aldığınız kurs veya eğitimler varsa belirtiniz"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Hedefleriniz ve Beklentileriniz
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-3 focus:ring-teal-200 focus:border-teal-400 transition-all duration-300 bg-gray-50 hover:bg-white hover:border-gray-300"
                  placeholder="Bu eğitimden beklentilerinizi ve hedeflerinizi açıklayınız"
                />
              </div>
            </div>
          )}

          {/* Step 3: Document Upload & Confirmation */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-4">
                  Belgeler (Opsiyonel)
                </label>
                <div className="border-2 border-dashed border-teal-200 rounded-3xl p-8 text-center bg-gradient-to-br from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300">
                  <Upload size={48} className="mx-auto text-teal-400 mb-4" />
                  <p className="text-gray-700 mb-6 text-lg">
                    Öğrenci belgesi, kimlik fotokopisi veya diğer dökümanları yükleyebilirsiniz
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl hover:from-teal-600 hover:to-teal-700 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Upload size={20} />
                    <span className="font-semibold">Dosya Seç</span>
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="font-semibold text-gray-800 text-lg">Yüklenen Dosyalar:</h4>
                    {formData.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                        <span className="text-gray-700 font-medium">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-3xl border border-teal-100 shadow-lg">
                <h3 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
                  <FileText size={24} />
                  Başvuru Özeti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-teal-200 border-opacity-50">
                      <span className="text-gray-600 font-medium">Ad Soyad:</span>
                      <span className="text-gray-800 font-semibold">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-teal-200 border-opacity-50">
                      <span className="text-gray-600 font-medium">E-posta:</span>
                      <span className="text-gray-800 font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-teal-200 border-opacity-50">
                      <span className="text-gray-600 font-medium">Telefon:</span>
                      <span className="text-gray-800 font-semibold">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Şehir:</span>
                      <span className="text-gray-800 font-semibold">{formData.city} / {formData.district}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-teal-200 border-opacity-50">
                      <span className="text-gray-600 font-medium">Okul:</span>
                      <span className="text-gray-800 font-semibold">{formData.school}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-teal-200 border-opacity-50">
                      <span className="text-gray-600 font-medium">Sınıf:</span>
                      <span className="text-gray-800 font-semibold">{formData.grade}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-teal-200 border-opacity-50">
                      <span className="text-gray-600 font-medium">Hedef Sınav:</span>
                      <span className="text-gray-800 font-semibold">{formData.targetExam}</span>
                    </div>
                    {(formData.tytNet || formData.aytNet) && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 font-medium">Net Puanlar:</span>
                        <span className="text-gray-800 font-semibold">
                          {formData.tytNet && `TYT: ${formData.tytNet}`}
                          {formData.tytNet && formData.aytNet && ' | '}
                          {formData.aytNet && `AYT: ${formData.aytNet}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-6 rounded-3xl">
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
            </div>
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

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sonraki →
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