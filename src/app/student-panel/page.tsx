'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComingSoon from '../../components/ComingSoon';
import { prepareStudentProfileForFirebase, sendStudentProfileToFirebase, debugFirebaseData } from '@/utils/firebaseSync';
import { generateFlashcardsWithOpenAI, logApiUsage, getApiUsageStats } from '@/utils/openaiApi';
  import {
  BookOpen, Calendar, MessageCircle, FileText, User, Bell,
  ChevronLeft, ChevronRight, Plus, Download, Clock,
  Star, Target, CheckCircle, AlertCircle,
  RotateCcw, Send, Paperclip, Search,
  List, X, Menu, Home, Users,
  GraduationCap, Library, Trophy, Video,
  BarChart3, CreditCard,
  Zap, Coffee, Sparkles, Check, Trash2, LogOut
} from 'lucide-react';

// Types
type StudentData = {
  id: number;
  name: string;
  email: string;
  photo?: string;
  class: string;
  department: string;
  coach: string;
  enrollmentDate: Date;
  completedLessons: number;
  totalLessons: number;
  averageGrade: number;
  nextMeeting?: Date;
  // Profil detayları
  goal?: string;
  targetExam?: string;
  studyHabits?: string;
  communicationStyle?: string;
  coachExpectations?: string;
  emotionalSupport?: string;
  programAdaptability?: string;
  examHistory?: string;
  preferredPlatforms?: string;
  learningType?: string;
  previousCoachingExperience?: string;
};

type NavigationItem = {
  id: string;
  name: string;
  icon: any;
  color: string;
  badge?: number;
};

type ActiveModule = 
  | 'dashboard' 
  | 'calendar' 
  | 'materials' 
  | 'messages'
  | 'studyroom'
  | 'flashcard';

export default function StudentPanel() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(0);

  // Dropdown'ları kapatmak için outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showNotifications && !target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
      if (showProfile && !target.closest('.profile-modal')) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showProfile]);

  // Bildirim sayısını kontrol et
  useEffect(() => {
    const checkNotifications = () => {
      const studentNotifications = JSON.parse(localStorage.getItem('student_notifications') || '[]');
      const unreadCount = studentNotifications.filter((notif: any) => !notif.isRead).length;
      setNotifications(unreadCount);
    };
    
    checkNotifications();
    
    // Event listener ekle
    const handleNotificationUpdate = () => {
      checkNotifications();
    };
    window.addEventListener('studentNotificationUpdate', handleNotificationUpdate);
    
    // Her 5 saniyede bir kontrol et
    const interval = setInterval(checkNotifications, 5000);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('studentNotificationUpdate', handleNotificationUpdate);
    };
  }, []);

  // Authentication check
  useEffect(() => {
    const currentStudent = localStorage.getItem('currentStudent');
    
    if (!currentStudent) {
      // Not logged in, redirect to auth page
      window.location.href = '/auth?mode=login&message=login-required';
      return;
    }
    
    try {
      const student = JSON.parse(currentStudent);
      
      if (!student.loggedIn || student.userType !== 'student') {
        // Invalid session, redirect to auth
        localStorage.removeItem('currentStudent');
        window.location.href = '/auth?mode=login&message=session-expired';
        return;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('currentStudent');
      window.location.href = '/auth?mode=login&message=session-error';
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('currentStudent');
    window.location.href = '/auth?mode=login&message=logged-out';
  };

  // Gerçek öğrenci verisi - localStorage'dan al
  const [studentData, setStudentData] = useState<StudentData>({
    id: 1,
    name: 'Demo Öğrenci',
    email: 'demo@eylulakademi.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    class: '3. Sınıf',
    department: 'Tıp Fakültesi',
    coach: 'Henüz eşleşmedi',
    enrollmentDate: new Date(),
    completedLessons: 0,
    totalLessons: 35,
    averageGrade: 0,
    nextMeeting: undefined,
    targetExam: 'PRE KLİNİK ÖĞRENCİLERİ' // Demo için Preklinik alanı
  });

  // Component mount olduğunda kullanıcı verilerini yükle
  useEffect(() => {
    const currentStudent = localStorage.getItem('currentStudent');
    console.log('🔍 useEffect çalıştı, currentStudent:', currentStudent);
    
    if (currentStudent) {
      try {
        const student = JSON.parse(currentStudent);
        console.log('🔍 Parsed student:', student);
        
        // Demo öğrenci kontrolü - demo@eylulakademi.com veya demo@student.com ise demo verilerini koru
        if (student.email === 'demo@eylulakademi.com' || student.email === 'demo@student.com') {
          console.log('🔍 Demo öğrenci tespit edildi, preklinik veriler ayarlanıyor');
          setStudentData(prev => ({
            ...prev,
            name: 'Demo Öğrenci',
            email: 'demo@eylulakademi.com',
            targetExam: 'PRE KLİNİK ÖĞRENCİLERİ' // Demo için preklinik alanını zorla ayarla
          }));
          return;
        }
        
        // Registered students'dan detaylı bilgileri al
        const registeredStudents = JSON.parse(localStorage.getItem('registeredStudents') || '[]');
        const studentDetail = registeredStudents.find((s: any) => s.email === student.email);
        
        if (studentDetail) {
          // Field ID'sini human readable name'e çevir
          const getFieldDisplayName = (fieldId: string) => {
            const fieldMap: { [key: string]: string } = {
              'tyt': 'TYT HAZIRLIĞI',
              'ayt': 'AYT HAZIRLIĞI',
              'tyt_ayt': 'TYT ve AYT HAZIRLIĞI',
              'lgs': 'LGS HAZIRLIĞI',
              'tip': 'TIP ÖĞRENCİLERİ',
              'preklinik': 'PRE KLİNİK ÖĞRENCİLERİ',
              'klinik': 'KLİNİK ÖĞRENCİLERİ',
              'usmle': 'USMLE HAZIRLIĞI',
              'tus': 'TUS HAZIRLIĞI'
            };
            return fieldMap[fieldId] || fieldId;
          };

          console.log('🔍 StudentDetail bulundu:', studentDetail);
          setStudentData(prev => ({
            ...prev,
            name: student.fullName || studentDetail.fullName || 'Öğrenci',
            email: student.email,
            targetExam: getFieldDisplayName(studentDetail.field), // Kayıt sırasında seçilen alan
            enrollmentDate: new Date(studentDetail.registrationDate)
          }));
        } else {
          console.log('⚠️ StudentDetail bulunamadı, localStorage temizleniyor');
          // Kayıtlı öğrenci bulunamadı, demo moda geç
          localStorage.removeItem('currentStudent');
          setStudentData(prev => ({
            ...prev,
            name: 'Demo Öğrenci',
            email: 'demo@eylulakademi.com',
            targetExam: 'PRE KLİNİK ÖĞRENCİLERİ'
          }));
        }
      } catch (error) {
        console.error('❌ Öğrenci verileri yüklenirken hata:', error);
        console.log('🔧 localStorage temizleniyor, demo mode aktif');
        localStorage.removeItem('currentStudent');
        setStudentData(prev => ({
          ...prev,
          name: 'Demo Öğrenci',
          email: 'demo@eylulakademi.com',
          targetExam: 'PRE KLİNİK ÖĞRENCİLERİ'
        }));
      }
    } else {
      console.log('✅ localStorage\'da currentStudent bulunamadı, demo veriler kullanılıyor');
      console.log('✅ Demo öğrenci targetExam:', studentData.targetExam);
    }
  }, []);



  // Navigation items
  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'text-cyan-400', badge: 0 },
    { id: 'calendar', name: 'Takvim', icon: Calendar, color: 'text-violet-400', badge: 0 },
    { id: 'materials', name: 'Koçtan Gelenler', icon: Library, color: 'text-orange-400', badge: 0 },
    { id: 'messages', name: 'Koç Mesajları', icon: MessageCircle, color: 'text-pink-400', badge: 0 },
    { id: 'studyroom', name: 'Çalışma Odası', icon: Users, color: 'text-purple-400', badge: 0 },
    { id: 'flashcard', name: 'Flashcard', icon: CreditCard, color: 'text-indigo-400', badge: 0 }
  ];

  // Responsive sidebar handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render active module
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule studentData={studentData} setActiveModule={setActiveModule} />;
      case 'calendar':
        return <CalendarModule />;
      case 'materials':
        return <MaterialsModule />;
      case 'messages':
        return <MessagesModule studentData={studentData} />;
      case 'studyroom':
        return <StudyRoomModule studentData={studentData} />;
      case 'flashcard':
        return <FlashcardModule studentData={studentData} />;
      default:
        return <DashboardModule studentData={studentData} setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">{/* Clean white background */}

      <div className="flex h-screen relative">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -288 }}
          animate={{ x: sidebarOpen ? 0 : -288 }}
          transition={{ duration: 0.3 }}
          className={`${sidebarOpen ? 'fixed lg:relative' : 'fixed'} border-r h-screen top-0 z-50 w-72 bg-gradient-to-b from-slate-800 to-slate-900 shadow-xl`}
          style={{ 
            borderRightColor: 'rgba(148, 163, 184, 0.2)'
          }}
        >
          {/* Sidebar Glass Effect */}
          <div className="absolute inset-0 rounded-r-3xl bg-gradient-to-br from-slate-700/20 to-slate-800/10"></div>
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10 relative">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-clip-text text-transparent">
                    Öğrenci Paneli
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">Eylül Büyükkaya Akademi</p>
                </motion.div>
              )}
              
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                {sidebarOpen ? (
                  <ChevronLeft size={20} className="text-gray-400" />
                ) : (
                  <Menu size={20} className="text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2 relative">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => {
                  setActiveModule(item.id as ActiveModule);
                  setSidebarOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${
                  activeModule === item.id
                    ? 'text-white shadow-lg bg-gradient-to-r from-slate-600 to-slate-700'
                    : 'hover:bg-slate-700/50 text-slate-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeModule === item.id ? 'bg-white/20' : 'bg-slate-700/30 group-hover:bg-slate-600/30'
                }`}>
                  <item.icon 
                    size={20} 
                    className={activeModule === item.id ? 'text-white' : item.color}
                  />
                </div>
                
                {sidebarOpen && (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    {item.badge && item.badge > 0 && (
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        activeModule === item.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Coming Soon for Coach Features */}
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/20 backdrop-blur-md rounded-2xl p-4 border border-slate-600/30">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎓</div>
                  <p className="text-sm text-slate-300 font-medium">
                    Koç Eşleştirme Sistemi
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Yakında açılacak
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 transition-all duration-300">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 p-6 relative shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Sidebar Toggle Button - Visible when sidebar is closed */}
                {!sidebarOpen && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSidebarOpen(true)}
                    className="p-3 text-slate-600 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex-shrink-0 border border-slate-200 bg-slate-50 hover:bg-slate-100"
                    title="Navigasyon Menüsünü Aç"
                  >
                    <Menu size={20} />
                  </motion.button>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 mb-1">
                    {navigationItems.find(item => item.id === activeModule)?.name || 'Dashboard'}
                  </h1>
                </div>
              </div>

              {/* Right Side - Notification and Profile */}
              <div className="flex items-center gap-4">
                {/* Notification Button */}
                <div className="relative">
                  <motion.button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-3 hover:bg-slate-100 rounded-xl transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Bell size={20} className="text-slate-600" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </motion.button>
                </div>

                {/* Profile Button */}
                <motion.button
                  onClick={() => setShowProfile(!showProfile)}
                  className="relative flex items-center gap-3 p-2 hover:bg-slate-100 rounded-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative">
                    <img
                      src={studentData.photo}
                      alt={studentData.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-300 group-hover:ring-slate-400 transition-all duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-slate-800 font-medium text-sm">
                      {studentData.name}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {studentData.class}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                </motion.button>

                {/* Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 rounded-xl transition-all duration-300 group border border-red-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Çıkış Yap"
                >
                  <LogOut size={20} className="text-red-500 group-hover:text-red-600" />
                </motion.button>
              </div>
            </div>
          </header>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-16 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden notification-dropdown">
              <NotificationsDropdown 
                setNotifications={setNotifications} 
                onClose={() => setShowNotifications(false)} 
              />
            </div>
          )}

          {/* Profile Modal */}
          {showProfile && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto profile-modal">
                <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Profil</h2>
                  <motion.button
                    onClick={() => setShowProfile(false)}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} className="text-slate-600" />
                  </motion.button>
                </div>
                <div className="p-6">
                  <ProfileModule studentData={studentData} />
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <main className="p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-120px)] bg-slate-50">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderActiveModule()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Dashboard Module
function DashboardModule({ studentData, setActiveModule }: { studentData: StudentData; setActiveModule: (module: ActiveModule) => void }) {
  const today = new Date();
  
  // Progress calculation
  const progressPercentage = (studentData.completedLessons / studentData.totalLessons) * 100;

  // Upcoming lessons
  const upcomingLessons = [
    {
      id: 1,
      title: 'Anatomi Dersi',
      date: new Date(2024, 11, 18, 14, 0),
      type: 'lesson',
      coach: 'Dr. Eylül Büyükkaya',
      duration: '60 dk'
    },
    {
      id: 2,
      title: 'Biyokimya Danışmanlık',
      date: new Date(2024, 11, 20, 16, 0),
      type: 'consultation',
      coach: 'Dr. Eylül Büyükkaya',
      duration: '45 dk'
    },
    {
      id: 3,
      title: 'Final Sınavı Hazırlık',
      date: new Date(2024, 11, 22, 10, 0),
      type: 'exam_prep',
      coach: 'Dr. Eylül Büyükkaya',
      duration: '90 dk'
    }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Fizyoloji dersi tamamlandı',
      timestamp: new Date(2024, 11, 15, 14, 0),
      icon: CheckCircle,
      color: 'text-emerald-400'
    },
    {
      id: 2,
      type: 'material_received',
      title: 'Yeni ders materyali alındı',
      timestamp: new Date(2024, 11, 14, 10, 30),
      icon: Download,
      color: 'text-cyan-400'
    },
    {
      id: 3,
      type: 'exam_scheduled',
      title: 'Anatomi sınavı planlandı',
      timestamp: new Date(2024, 11, 13, 16, 15),
      icon: Calendar,
      color: 'text-violet-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Modern Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-8 shadow-2xl border border-cyan-200"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/90 via-purple-600/90 to-pink-600/90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-white/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-5xl font-bold text-white mb-2"
            >
              Hoş geldin, {studentData.name.split(' ')[0]}! 
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="inline-block ml-2"
              >
                👋
              </motion.span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-6"
            >
              {today.toLocaleDateString('tr-TR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6 text-sm"
            >
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <GraduationCap size={16} className="text-yellow-300" />
                <span className="text-white font-medium">
                  Koç eşleştirme yakında
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
                <Star size={16} className="text-yellow-300" />
                <span className="text-white font-medium">Tüm özellikler aktif olacak</span>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 lg:mt-0"
          >
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 p-1">
              <img
                src={studentData.photo}
                alt={studentData.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Kişisel Gelişim',
            value: '0/35',
            subtitle: 'Koç eşleştirmesi sonrası',
            icon: BookOpen,
            gradient: 'from-emerald-400 to-emerald-600',
            bgGradient: 'from-emerald-100 to-emerald-200',
            borderColor: 'border-emerald-300',
            shadowColor: 'shadow-emerald-200/50',
            progress: 0
          },
          {
            title: 'Hedef Takibi',
            value: 'Yakında',
            subtitle: 'Koçunuzla birlikte',
            icon: Star,
            gradient: 'from-yellow-400 to-amber-500',
            bgGradient: 'from-yellow-100 to-amber-200',
            borderColor: 'border-amber-300',
            shadowColor: 'shadow-amber-200/50'
          },
          {
            title: 'Ders Programı',
            value: 'Planlama',
            subtitle: 'Koç eşleştirme sonrası',
            icon: Calendar,
            gradient: 'from-violet-400 to-purple-600',
            bgGradient: 'from-violet-100 to-purple-200',
            borderColor: 'border-purple-300',
            shadowColor: 'shadow-purple-200/50'
          },
          {
            title: 'Motivasyon',
            value: '💪',
            subtitle: 'Başlamaya hazır!',
            icon: Trophy,
            gradient: 'from-pink-400 to-rose-500',
            bgGradient: 'from-pink-100 to-rose-200',
            borderColor: 'border-rose-300',
            shadowColor: 'shadow-rose-200/50'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group"
          >
            <div className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 border-2 ${stat.borderColor} ${stat.shadowColor} shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden bg-white`}>
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <Sparkles size={20} className={stat.gradient.includes('emerald') ? 'text-emerald-500' : 
                                              stat.gradient.includes('yellow') ? 'text-amber-500' :
                                              stat.gradient.includes('violet') ? 'text-purple-500' : 'text-rose-500'} />
              </div>
              
              <h3 className="text-3xl font-bold text-slate-800 mb-1 relative z-10">
                {stat.value}
              </h3>
              <p className="text-slate-700 font-medium mb-1 relative z-10">{stat.title}</p>
              <p className="text-sm text-slate-500 relative z-10">{stat.subtitle}</p>
              
              {stat.progress !== undefined && (
                <div className="w-full bg-slate-200 rounded-full h-3 mt-4 relative z-10 shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`bg-gradient-to-r ${stat.gradient} h-3 rounded-full shadow-sm`}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Upcoming Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Modern Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="text-yellow-500" size={24} />
            </motion.div>
            Hızlı İşlemler
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                icon: MessageCircle, 
                label: 'Koç Mesajları', 
                action: () => setActiveModule('messages'),
                bgColor: 'from-cyan-100 to-blue-200',
                hoverColor: 'from-cyan-200 to-blue-300',
                iconColor: 'text-cyan-600',
                description: 'Koç eşleştirme sonrası',
                borderColor: 'border-cyan-300',
                shadowColor: 'shadow-cyan-200/50',
                activeColor: 'cyan'
              },
              { 
                icon: Plus, 
                label: 'Takvim', 
                action: () => setActiveModule('calendar'),
                bgColor: 'from-emerald-100 to-teal-200',
                hoverColor: 'from-emerald-200 to-teal-300',
                iconColor: 'text-emerald-600',
                description: 'Kişisel takvim yönetimi',
                borderColor: 'border-emerald-300',
                shadowColor: 'shadow-emerald-200/50',
                activeColor: 'emerald'
              },
              { 
                icon: Library, 
                label: 'Koçtan Gelenler', 
                action: () => setActiveModule('materials'),
                bgColor: 'from-violet-100 to-purple-200',
                hoverColor: 'from-violet-200 to-purple-300',
                iconColor: 'text-violet-600',
                description: 'Koçtan gelen materyaller',
                borderColor: 'border-violet-300',
                shadowColor: 'shadow-violet-200/50',
                activeColor: 'violet'
              },

            ].map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`relative p-6 bg-gradient-to-br ${action.bgColor} hover:${action.hoverColor} rounded-2xl border-2 ${action.borderColor} ${action.shadowColor} shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden min-h-[120px] flex flex-col justify-center items-center text-center`}
              >
                {/* Enhanced background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.hoverColor} opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl`} />
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-white/20 rounded-full`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.2, 0.8, 0.2],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
                
                                  {/* Content Container */}
                <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
                  {/* Icon Container - Perfectly Centered */}
                  <motion.div
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1 
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex items-center justify-center w-12 h-12 bg-white/50 rounded-xl group-hover:bg-white/70 transition-all duration-300 shadow-sm"
                  >
                    <action.icon 
                      size={24} 
                      className={`${action.iconColor} transition-colors duration-300`} 
                    />
                  </motion.div>
                  
                  {/* Text Content - Centered */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 tracking-wide">
                      {action.label}
                    </h4>
                    <p className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors duration-300 opacity-90 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Active state indicator */}
                <motion.div
                  className="absolute top-3 right-3 w-2 h-2 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Modern Coming Soon Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="text-violet-500" size={24} />
              Koç Eşleştirme Sonrası
            </h3>
            <span className="px-3 py-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-medium rounded-full border border-violet-200">
              Yakında
            </span>
          </div>
          
          <div className="space-y-4">
            {[
              {
                icon: BookOpen,
                title: 'Kişiselleştirilmiş Ders Programı',
                description: 'Koçunuz sizin ihtiyaçlarınıza göre özel ders programı hazırlayacak',
                color: 'from-cyan-100 to-blue-100',
                borderColor: 'border-cyan-200',
                iconColor: 'text-cyan-600'
              },
              {
                icon: MessageCircle,
                title: 'Birebir Mentorluk Seansları',
                description: 'Hedeflerinize ulaşmak için koçunuzla özel görüşmeler',
                color: 'from-emerald-100 to-teal-100',
                borderColor: 'border-emerald-200',
                iconColor: 'text-emerald-600'
              },
              {
                icon: Target,
                title: 'Hedef Odaklı Çalışma Planı',
                description: 'Başarı için adım adım takip edilebilir hedefler',
                color: 'from-orange-100 to-red-100',
                borderColor: 'border-orange-200',
                iconColor: 'text-orange-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 8, scale: 1.01 }}
                className={`flex items-center gap-4 p-4 bg-gradient-to-r ${feature.color} rounded-xl transition-all duration-300 border-2 ${feature.borderColor} group shadow-sm hover:shadow-md`}
              >
                <div className={`p-3 rounded-xl bg-white/60 group-hover:bg-white/80 transition-all duration-300 shadow-sm`}>
                  <feature.icon size={20} className={feature.iconColor} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">{feature.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
                </div>
                
                <div className="px-3 py-1 bg-white/60 text-slate-600 rounded-lg text-xs font-medium">
                  Yakında
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </div>
  );
}

// Lesson Type
type Lesson = {
  id: number;
  time: string;
  subject: string;
  coach: string;
  type: string;
  color: string;
  borderColor: string;
  completed: boolean;
  description: string;
  topics: string[];
};

// Lessons Module with Weekly Schedule
function LessonsModule({ studentData }: { studentData: StudentData }) {
  return (
    <ComingSoon
      title="Koç Dersleri"
      description="Koçunuzla birebir dersler, canlı eğitim seansları ve kişiselleştirilmiş ders programları yakında başlayacak!"
      icon={<BookOpen size={40} className="text-emerald-600" />}
      theme="coach"
    />
  );
}

function OriginalLessonsModule({ studentData }: { studentData: StudentData }) {
  // Haftalık ders programı verisi
  const [weeklySchedule, setWeeklySchedule] = useState({
    'Pazartesi': [
      { id: 1, time: '09:00-10:30', subject: 'Anatomi', coach: 'Dr. Eylül Büyükkaya', type: 'lesson', color: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-400/30', completed: false, description: 'İnsan vücudunun temel yapıları ve organları hakkında detaylı bilgi', topics: ['Kemik sistemi', 'Kas sistemi', 'Sinir sistemi temel yapıları'] },
      { id: 2, time: '14:00-15:30', subject: 'Fizyoloji', coach: 'Dr. Eylül Büyükkaya', type: 'lesson', color: 'from-emerald-500/20 to-teal-500/20', borderColor: 'border-emerald-400/30', completed: true, description: 'Vücut fonksiyonları ve yaşam süreçlerinin incelenmesi', topics: ['Solunum sistemi fizyolojisi', 'Kardiyovasküler sistem', 'Böbrek fonksiyonları'] },
    ],
    'Salı': [
      { id: 3, time: '10:00-11:30', subject: 'Biyokimya', coach: 'Dr. Eylül Büyükkaya', type: 'lesson', color: 'from-purple-500/20 to-violet-500/20', borderColor: 'border-purple-400/30', completed: false, description: 'Moleküler düzeyde yaşam süreçleri ve metabolizma', topics: ['Protein yapısı ve fonksiyonu', 'Enzim kinetikleri', 'Metabolik yollar'] },
      { id: 4, time: '15:00-16:00', subject: 'Danışmanlık', coach: 'Dr. Eylül Büyükkaya', type: 'consultation', color: 'from-orange-500/20 to-red-500/20', borderColor: 'border-orange-400/30', completed: false, description: 'Kişisel gelişim ve akademik performans danışmanlığı', topics: ['Çalışma teknikleri', 'Zaman yönetimi', 'Motivasyon artırma'] },
    ],
    'Çarşamba': [
      { id: 5, time: '09:00-10:30', subject: 'Histoloji', coach: 'Dr. Eylül Büyükkaya', type: 'lesson', color: 'from-pink-500/20 to-rose-500/20', borderColor: 'border-pink-400/30', completed: true, description: 'Doku yapıları ve mikroskobik anatomi', topics: ['Epitel dokular', 'Bağ dokuları', 'Kas doku tipleri'] },
      { id: 6, time: '13:00-14:30', subject: 'Embriologi', coach: 'Dr. Eylül Büyükkaya', type: 'lesson', color: 'from-indigo-500/20 to-blue-500/20', borderColor: 'border-indigo-400/30', completed: false, description: 'İnsan gelişimi ve embriyo oluşum süreçleri', topics: ['Gastrulasyon', 'Organogenez', 'Konjenital anomaliler'] },
    ],
    'Perşembe': [
      { id: 7, time: '11:00-12:30', subject: 'Patoloji', coach: 'Dr. Eylül Büyükkaya', type: 'lesson', color: 'from-yellow-500/20 to-amber-500/20', borderColor: 'border-yellow-400/30', completed: false, description: 'Hastalık süreçleri ve tanı yöntemleri', topics: ['İnflamasyon', 'Tümör patolojisi', 'Dejeneratif hastalıklar'] },
      { id: 8, time: '16:00-17:00', subject: 'Sınav Hazırlık', coach: 'Dr. Eylül Büyükkaya', type: 'exam_prep', color: 'from-red-500/20 to-pink-500/20', borderColor: 'border-red-400/30', completed: true, description: 'TUS ve dönem sınavları için özel hazırlık', topics: ['Soru çözme teknikleri', 'Zaman yönetimi', 'Stres kontrolü'] },
    ],
    'Cuma': [
      { id: 9, time: '09:30-11:00', subject: 'Farmakoloji', coach: 'Dr. Eylül Büyükkaya', type: 'lesson', color: 'from-green-500/20 to-emerald-500/20', borderColor: 'border-green-400/30', completed: false, description: 'İlaç etki mekanizmaları ve tedavi protokolleri', topics: ['Farmakokinetik', 'Farmakodinamik', 'İlaç etkileşimleri'] },
      { id: 10, time: '14:00-15:00', subject: 'Kişisel Danışmanlık', coach: 'Dr. Eylül Büyükkaya', type: 'consultation', color: 'from-cyan-500/20 to-blue-500/20', borderColor: 'border-cyan-400/30', completed: false, description: 'Bireysel akademik ve kişisel gelişim görüşmesi', topics: ['Hedef belirleme', 'Kariyer planlama', 'Kişisel sorunlar'] },
    ],
    'Cumartesi': [
      { id: 11, time: '10:00-12:00', subject: 'Soru Çözümü', coach: 'Dr. Eylül Büyükkaya', type: 'practice', color: 'from-violet-500/20 to-purple-500/20', borderColor: 'border-violet-400/30', completed: false, description: 'Interaktif soru çözümü ve pratik uygulamalar', topics: ['TUS tarzı sorular', 'Vaka analizleri', 'Hızlı çözüm teknikleri'] },
    ],
    'Pazar': [
      { id: 12, time: '15:00-16:30', subject: 'Haftalık Değerlendirme', coach: 'Dr. Eylül Büyükkaya', type: 'review', color: 'from-slate-500/20 to-gray-500/20', borderColor: 'border-slate-400/30', completed: false, description: 'Haftalık performans değerlendirmesi ve geribildirim', topics: ['İlerleme raporu', 'Eksik konular', 'Önümüzdeki hafta planı'] },
    ],
  });

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showModal, setShowModal] = useState(false);

  const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long' });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return BookOpen;
      case 'consultation': return MessageCircle;
      case 'exam_prep': return Target;
      case 'practice': return Trophy;
      case 'review': return CheckCircle;
      default: return BookOpen;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson': return 'Ders';
      case 'consultation': return 'Danışmanlık';
      case 'exam_prep': return 'Sınav Hazırlık';
      case 'practice': return 'Soru Çözümü';
      case 'review': return 'Değerlendirme';
      default: return 'Ders';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Calendar className="text-cyan-400" size={28} />
              </motion.div>
              Haftalık Ders Programım
            </h2>
            <p className="text-gray-300">
              Koçunuz <span className="text-cyan-400 font-semibold">{studentData.coach}</span> tarafından hazırlanan özel programınız
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Bu Hafta</div>
            <div className="text-lg font-bold text-white">{studentData.completedLessons}/{studentData.totalLessons} Ders</div>
          </div>
        </div>
      </motion.div>

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {days.map((day, dayIndex) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.1 }}
            className={`bg-black/20 backdrop-blur-xl rounded-2xl p-5 border transition-all duration-300 ${
              today === day 
                ? 'border-cyan-400/50 bg-cyan-500/10 shadow-lg shadow-cyan-500/10' 
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Day Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${
                today === day ? 'text-cyan-400' : 'text-white'
              }`}>
                {day}
              </h3>
              {today === day && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-cyan-400 rounded-full"
                />
              )}
            </div>

            {/* Lessons for the day */}
            <div className="space-y-3">
              {weeklySchedule[day as keyof typeof weeklySchedule]?.length > 0 ? (
                weeklySchedule[day as keyof typeof weeklySchedule].map((lesson, index) => {
                  const IconComponent = getTypeIcon(lesson.type);
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={() => {
                        setSelectedLesson(lesson);
                        setShowModal(true);
                      }}
                      className={`relative p-4 bg-gradient-to-r ${lesson.color} rounded-xl border ${lesson.borderColor} hover:border-opacity-60 transition-all duration-300 group cursor-pointer overflow-hidden ${
                        lesson.completed ? 'ring-2 ring-emerald-400/50' : ''
                      }`}
                    >
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-8 translate-x-8" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-6 -translate-x-6" />
                      </div>

                      <div className="relative z-10">
                        {/* Time and Type */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-300 bg-black/20 px-2 py-1 rounded-full">
                            {lesson.time}
                          </span>
                          <div className="flex items-center gap-1">
                            <IconComponent size={14} className="text-white/80" />
                            <span className="text-xs text-white/80">{getTypeLabel(lesson.type)}</span>
                          </div>
                        </div>

                        {/* Subject */}
                        <h4 className="font-bold text-white mb-1 group-hover:text-white transition-colors flex items-center gap-2">
                          {lesson.subject}
                          {lesson.completed && (
                            <motion.div
                              initial={{ scale: 0, rotate: 0 }}
                              animate={{ scale: 1, rotate: 360 }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center"
                            >
                              <Check size={12} className="text-white" />
                            </motion.div>
                          )}
                        </h4>

                        {/* Coach */}
                        <p className="text-xs text-gray-300 flex items-center gap-1">
                          <User size={12} />
                          {lesson.coach}
                        </p>
                      </div>

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Coffee className="mx-auto text-gray-500 mb-2" size={24} />
                  <p className="text-sm text-gray-500">Bugün ders yok</p>
                  <p className="text-xs text-gray-600">Dinlenme günü</p>
                </div>
              )}
            </div>

            {/* Day stats */}
            {weeklySchedule[day as keyof typeof weeklySchedule]?.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">
                    {weeklySchedule[day as keyof typeof weeklySchedule].length} ders
                  </span>
                  <span className="text-gray-400">
                    {weeklySchedule[day as keyof typeof weeklySchedule].reduce((total, lesson) => {
                      const [start, end] = lesson.time.split('-');
                      const startTime = new Date(`2000-01-01 ${start}`);
                      const endTime = new Date(`2000-01-01 ${end}`);
                      return total + (endTime.getTime() - startTime.getTime()) / (1000 * 60);
                    }, 0)} dk
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lesson Details Modal */}
      <AnimatePresence>
        {showModal && selectedLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    {(() => {
                      const IconComponent = getTypeIcon(selectedLesson.type);
                      return <IconComponent size={28} className="text-cyan-400" />;
                    })()}
                    {selectedLesson.subject}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {selectedLesson.time} • {getTypeLabel(selectedLesson.type)}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Lesson Info */}
              <div className="space-y-6">
                {/* Coach Info */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <User size={20} className="text-cyan-400" />
                  <div>
                    <p className="text-white font-medium">{selectedLesson.coach}</p>
                    <p className="text-gray-400 text-sm">Koçunuz</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <FileText size={20} className="text-purple-400" />
                    Ders Açıklaması
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedLesson.description}
                  </p>
                </div>

                {/* Topics */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <List size={20} className="text-emerald-400" />
                    Konular
                  </h3>
                  <div className="space-y-2">
                    {selectedLesson.topics.map((topic, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">{topic}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Completion Status */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-4 border border-emerald-400/30">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLesson.completed}
                      onChange={(e) => {
                        const updatedSchedule = { ...weeklySchedule };
                        Object.keys(updatedSchedule).forEach(day => {
                          updatedSchedule[day as keyof typeof updatedSchedule] = updatedSchedule[day as keyof typeof updatedSchedule].map(lesson => 
                            lesson.id === selectedLesson.id 
                              ? { ...lesson, completed: e.target.checked }
                              : lesson
                          );
                        });
                        setWeeklySchedule(updatedSchedule);
                        setSelectedLesson({ ...selectedLesson, completed: e.target.checked });
                      }}
                      className="w-5 h-5 rounded bg-white/10 border-2 border-emerald-400 checked:bg-emerald-400 checked:border-emerald-400 transition-colors"
                    />
                    <div>
                      <p className="text-white font-medium">
                        {selectedLesson.completed ? 'Ders Tamamlandı ✓' : 'Dersi Tamamladım'}
                      </p>
                      <p className="text-gray-400 text-sm">
                        Bu dersi tamamladığınızı işaretleyin
                      </p>
                    </div>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    Tamam
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Görev tipi
type Task = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  endTime?: string;
  completed: boolean;
  createdAt: Date;
  category: 'study' | 'meeting' | 'reminder' | 'exam' | 'assignment' | 'personal' | 'break';
  color: string;
  priority: 'low' | 'medium' | 'high';
  link?: string;
  isRecurring?: boolean;
};

function CalendarModule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  
  // Form states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('09:00');
  const [newTaskEndTime, setNewTaskEndTime] = useState('10:00');
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('study');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  const [newTaskLink, setNewTaskLink] = useState('');
  const [newTaskRecurring, setNewTaskRecurring] = useState(false);
  
  // Türkçe ay ve gün isimleri
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  const daysOfWeek = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // Event kategorisi için renk döndür
  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'study': return '#3B82F6'; // Blue
      case 'meeting': return '#10B981'; // Green
      case 'reminder': return '#F59E0B'; // Yellow
      case 'exam': return '#EF4444'; // Red
      case 'assignment': return '#8B5CF6'; // Purple
      case 'personal': return '#EC4899'; // Pink
      case 'break': return '#6B7280'; // Gray
      default: return '#3B82F6';
    }
  };

  // Kategori Türkçe isimler
  const getCategoryLabel = (category: Task['category']) => {
    switch (category) {
      case 'study': return 'Çalışma';
      case 'meeting': return 'Toplantı';
      case 'reminder': return 'Hatırlatma';
      case 'exam': return 'Sınav';
      case 'assignment': return 'Ödev';
      case 'personal': return 'Kişisel';
      case 'break': return 'Mola';
      default: return 'Çalışma';
    }
  };

  // Kategori ikonu
  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'study': return BookOpen;
      case 'meeting': return Users;
      case 'reminder': return Bell;
      case 'exam': return Target;
      case 'assignment': return FileText;
      case 'personal': return User;
      case 'break': return Coffee;
      default: return BookOpen;
    }
  };

  // LocalStorage'dan görevleri yükle
  useEffect(() => {
    const savedTasks = localStorage.getItem('calendar_tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        date: new Date(task.date),
        createdAt: new Date(task.createdAt)
      }));
      setTasks(parsedTasks);
    }
  }, []);

  // Görevleri localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('calendar_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Takvim günlerini oluştur
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Pazartesi başlangıç
    
    const days = [];
    
    // Önceki ayın günleri
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Mevcut ayın günleri
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Sonraki ayın günleri (42 güne tamamla)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  };

  // Belirli bir güne ait görevleri getir
  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => 
      task.date.toDateString() === date.toDateString()
    );
  };

  // Günün görev durumuna göre stil belirle
  const getDayTaskStyle = (date: Date) => {
    const dayTasks = getTasksForDay(date);
    if (dayTasks.length === 0) return null;

    const hasCompletedTasks = dayTasks.some(task => task.completed);
    const hasPendingTasks = dayTasks.some(task => !task.completed);

    if (hasPendingTasks) {
      return 'bg-blue-500/10 border-blue-400/20 hover:bg-blue-500/20';
    } else if (hasCompletedTasks) {
      return 'bg-emerald-500/10 border-emerald-400/20 hover:bg-emerald-500/20';
    }
    
    return null;
  };

  // Yeni görev ekle
  const addTask = () => {
    if (!newTaskTitle.trim() || !clickedDate) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      date: clickedDate,
      time: newTaskTime,
      endTime: newTaskEndTime,
      completed: false,
      createdAt: new Date(),
      category: newTaskCategory,
      color: getCategoryColor(newTaskCategory),
      priority: newTaskPriority,
      link: newTaskLink.trim() || undefined,
      isRecurring: newTaskRecurring
    };

    setTasks(prev => [...prev, newTask]);
    
    // Form'u temizle
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskTime('09:00');
    setNewTaskEndTime('10:00');
    setNewTaskCategory('study');
    setNewTaskPriority('medium');
    setNewTaskLink('');
    setNewTaskRecurring(false);
    setShowAddTask(false);
    setClickedDate(null);
  };

  // Görev durumunu değiştir
  const toggleTaskComplete = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Görev sil
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setShowTaskDetail(false);
  };

  // Ay değiştir
  const changeMonth = (direction: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1));
  };

  // Bugünün tarihini kontrol et
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Modern Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Calendar className="text-white" size={28} />
              </motion.div>
              Kişisel Takvim
            </h2>
            <p className="text-blue-100">
              Google Calendar benzeri akıllı planlama sistemi
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-blue-100">Bu Ay</div>
              <div className="text-lg font-bold text-white">
                {tasks.filter(t => t.date.getMonth() === selectedDate.getMonth()).length} Etkinlik
              </div>
            </div>

          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
          {(['month', 'week', 'day'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === mode
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {mode === 'month' ? 'Ay' : mode === 'week' ? 'Hafta' : 'Gün'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Modern Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-200"
      >
        {/* Month Navigation */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </motion.button>
            
            <h3 className="text-xl font-bold text-gray-800">
              {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h3>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </motion.button>
          </div>

          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Bugün
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="p-6">
          {/* Days Header */}
          <div className="grid grid-cols-7 gap-0 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => {
              const dayTasks = getTasksForDay(day.date);
              const todayClass = isToday(day.date) ? 'ring-2 ring-blue-500' : '';
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.01 }}
                  className={`
                    relative min-h-[100px] p-2 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50
                    ${day.isCurrentMonth 
                      ? 'text-gray-900' 
                      : 'text-gray-400 bg-gray-50'
                    }
                    ${todayClass}
                  `}
                  onClick={() => {
                    setClickedDate(day.date);
                    setShowAddTask(true);
                  }}
                >
                  {/* Day Number */}
                  <div className={`
                    text-sm font-medium mb-1 flex items-center justify-between
                    ${isToday(day.date) ? 'text-blue-600 font-bold' : ''}
                  `}>
                    <span>{day.date.getDate()}</span>
                    {isToday(day.date) && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  {/* Tasks */}
                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map((task, idx) => {
                      const IconComponent = getCategoryIcon(task.category);
                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-xs p-1 rounded-md cursor-pointer transition-all hover:scale-105"
                          style={{ backgroundColor: task.color + '20', borderLeft: `3px solid ${task.color}` }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTask(task);
                            setShowTaskDetail(true);
                          }}
                        >
                          <div className="flex items-center gap-1">
                            <IconComponent size={10} style={{ color: task.color }} />
                            <span className="font-medium truncate" style={{ color: task.color }}>
                              {task.title}
                            </span>
                          </div>
                          <div className="text-gray-500 text-xs mt-0.5">
                            {task.time} {task.endTime && `- ${task.endTime}`}
                          </div>
                        </motion.div>
                      );
                    })}
                    
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-gray-500 text-center py-1">
                        +{dayTasks.length - 3} daha
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Modern Add Task Modal */}
      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddTask(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <Plus size={28} className="text-blue-500" />
                  Yeni Etkinlik
                </h2>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {clickedDate && (
                <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                  <p className="text-blue-700 font-medium">
                    {clickedDate.toLocaleDateString('tr-TR', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Etkinlik Başlığı</label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="Etkinlik başlığını girin..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Kategori</label>
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value as Task['category'])}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="study">🎓 Çalışma</option>
                      <option value="meeting">👥 Toplantı</option>
                      <option value="reminder">🔔 Hatırlatma</option>
                      <option value="exam">🎯 Sınav</option>
                      <option value="assignment">📝 Ödev</option>
                      <option value="personal">👤 Kişisel</option>
                      <option value="break">☕ Mola</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Öncelik</label>
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="low">🟢 Düşük</option>
                      <option value="medium">🟡 Orta</option>
                      <option value="high">🔴 Yüksek</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Başlangıç Saati</label>
                    <input
                      type="time"
                      value={newTaskTime}
                      onChange={(e) => setNewTaskTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Bitiş Saati</label>
                    <input
                      type="time"
                      value={newTaskEndTime}
                      onChange={(e) => setNewTaskEndTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Link (İsteğe bağlı)</label>
                  <input
                    type="text"
                    value={newTaskLink}
                    onChange={(e) => setNewTaskLink(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="Link belirtin..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Açıklama (İsteğe bağlı)</label>
                  <textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none h-20"
                    placeholder="Etkinlik açıklamasını girin..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={newTaskRecurring}
                    onChange={(e) => setNewTaskRecurring(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="recurring" className="text-gray-700 font-medium">
                    Tekrarlanan etkinlik
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                  >
                    İptal
                  </button>
                  <button
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    Etkinlik Ekle
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Task Detail Modal */}
      <AnimatePresence>
        {showTaskDetail && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTaskDetail(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  {selectedTask.completed ? (
                    <CheckCircle size={28} className="text-green-500" />
                  ) : (
                    <Clock size={28} style={{ color: selectedTask.color }} />
                  )}
                  {selectedTask.title}
                </h2>
                <button
                  onClick={() => setShowTaskDetail(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Calendar size={20} className="text-gray-600" />
                  <div>
                    <p className="text-gray-800 font-medium">
                      {selectedTask.date.toLocaleDateString('tr-TR', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedTask.time} {selectedTask.endTime && `- ${selectedTask.endTime}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: selectedTask.color }}
                    ></div>
                    <span className="text-gray-800 font-medium">
                      {getCategoryLabel(selectedTask.category)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      selectedTask.priority === 'high' ? 'bg-red-500' :
                      selectedTask.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="text-gray-600 text-sm">
                      {selectedTask.priority === 'high' ? 'Yüksek' :
                       selectedTask.priority === 'medium' ? 'Orta' : 'Düşük'} Öncelik
                    </span>
                  </div>
                </div>

                {selectedTask.link && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Target size={20} className="text-gray-600" />
                    <span className="text-gray-800">{selectedTask.link}</span>
                  </div>
                )}

                {selectedTask.description && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-gray-800 font-medium mb-2 flex items-center gap-2">
                      <FileText size={16} className="text-gray-600" />
                      Açıklama
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {selectedTask.description}
                    </p>
                  </div>
                )}

                <div className={`
                  p-4 rounded-lg border-2
                  ${selectedTask.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-blue-50 border-blue-200'
                  }
                `}>
                  <div className="flex items-center gap-2">
                    {selectedTask.completed ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <Clock size={16} className="text-blue-600" />
                    )}
                    <span className={`
                      font-medium
                      ${selectedTask.completed ? 'text-green-600' : 'text-blue-600'}
                    `}>
                      {selectedTask.completed ? 'Tamamlandı' : 'Beklemede'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => deleteTask(selectedTask.id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Sil
                  </button>
                  <button
                    onClick={() => toggleTaskComplete(selectedTask.id)}
                    className={`
                      flex-1 font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2
                      ${selectedTask.completed 
                        ? 'bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-600' 
                        : 'bg-green-50 hover:bg-green-100 border border-green-200 text-green-600'
                      }
                    `}
                  >
                    {selectedTask.completed ? (
                      <>
                        <RotateCcw size={16} />
                        Geri Al
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Tamamla
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MaterialsModule() {
  return (
    <ComingSoon
      title="Koçtan Gelenler"
      description="Koç eşleştirmesi sonrasında koçunuzun size özel hazırladığı video dersler, çalışma materyalleri, ders programları ve kişiselleştirilmiş içerikler burada yer alacak!"
      icon={<Library size={40} className="text-emerald-600" />}
      theme="coach"
    />
  );
}

function OriginalMaterialsModule() {
  const [activeTab, setActiveTab] = useState<'materials' | 'videos'>('materials');
  
  // Koçtan gelen örnek materyaller
  const coachMaterials = [
    {
      id: 1,
      name: 'Anatomi Ders Notları - Kas Sistemi.pdf',
      type: 'pdf',
      size: '2.3 MB',
      uploadDate: new Date(2024, 10, 15),
      coach: 'Dr. Eylül Büyükkaya',
      description: 'Kas sistemi anatomisi ve fizyolojisi detaylı ders notları',
      category: 'Anatomi'
    },
    {
      id: 2,
      name: 'Biyokimya Metabolizma Şemaları.png',
      type: 'image',
      size: '1.8 MB',
      uploadDate: new Date(2024, 10, 14),
      coach: 'Dr. Eylül Büyükkaya',
      description: 'Metabolik yolakların görsel şemaları',
      category: 'Biyokimya'
    },
    {
      id: 3,
      name: 'Fizyoloji Çalışma Rehberi.docx',
      type: 'document',
      size: '956 KB',
      uploadDate: new Date(2024, 10, 12),
      coach: 'Dr. Eylül Büyükkaya',
      description: 'Fizyoloji dersi için kapsamlı çalışma rehberi',
      category: 'Fizyoloji'
    },
    {
      id: 4,
      name: 'Sınav Öncesi Kontrol Listesi.xlsx',
      type: 'spreadsheet',
      size: '245 KB',
      uploadDate: new Date(2024, 10, 10),
      coach: 'Dr. Eylül Büyükkaya',
      description: 'Sınav hazırlığı için önemli konular listesi',
      category: 'Sınav Hazırlığı'
    },
    {
      id: 5,
      name: 'Patoloji Atlas.pdf',
      type: 'pdf',
      size: '15.2 MB',
      uploadDate: new Date(2024, 10, 8),
      coach: 'Dr. Eylül Büyükkaya',
      description: 'Görsel patoloji atlası ve vaka örnekleri',
      category: 'Patoloji'
    }
  ];

  // Koçtan gelen örnek video dersler
  const coachVideos = [
    {
      id: 1,
      title: 'Kas Kontraksiyon Mekanizması',
      description: 'Kas liflerinin moleküler düzeyde çalışma prensibi',
      duration: '24:35',
      uploadDate: new Date(2024, 10, 16),
      coach: 'Dr. Eylül Büyükkaya',
      category: 'Anatomi',
      thumbnail: '/api/placeholder/300/200',
      views: 45
    },
    {
      id: 2,
      title: 'Glikoliz ve Krebs Döngüsü',
      description: 'Enerji metabolizmasının temel yolakları',
      duration: '32:18',
      uploadDate: new Date(2024, 10, 14),
      coach: 'Dr. Eylül Büyükkaya',
      category: 'Biyokimya',
      thumbnail: '/api/placeholder/300/200',
      views: 67
    },
    {
      id: 3,
      title: 'Kalp Fizyolojisi ve EKG',
      description: 'Kardiyovasküler sistem ve elektrokardiyografi',
      duration: '41:22',
      uploadDate: new Date(2024, 10, 12),
      coach: 'Dr. Eylül Büyükkaya',
      category: 'Fizyoloji',
      thumbnail: '/api/placeholder/300/200',
      views: 89
    },
    {
      id: 4,
      title: 'Hücresel Patoloji Temelleri',
      description: 'Hücre hasarı ve adaptasyon mekanizmaları',
      duration: '28:47',
      uploadDate: new Date(2024, 10, 9),
      coach: 'Dr. Eylül Büyükkaya',
      category: 'Patoloji',
      thumbnail: '/api/placeholder/300/200',
      views: 52
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'document': return '📝';
      case 'image': return '🖼️';
      case 'spreadsheet': return '📊';
      default: return '📁';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Anatomi': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Biyokimya': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Fizyoloji': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Patoloji': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Sınav Hazırlığı': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Koçtan Gelenler</h2>
            <p className="text-gray-300">Koçunuzun size özel hazırladığı materyaller ve video dersler</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Toplam İçerik</div>
            <div className="text-2xl font-bold text-white">{coachMaterials.length + coachVideos.length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'materials'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            📚 Materyaller ({coachMaterials.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            🎥 Video Dersler ({coachVideos.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'materials' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {coachMaterials.map((material) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-black/20 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:border-red-400/30 transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center mb-3">
                <div className="text-2xl mb-2">{getFileIcon(material.type)}</div>
                <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2 leading-tight">
                  {material.name}
                </h3>
                <p className="text-xs text-gray-400 mb-2">{material.size}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(material.category)}`}>
                  {material.category}
                </span>
              </div>
              
              <p className="text-xs text-gray-300 mb-3 line-clamp-2 leading-relaxed">
                {material.description}
              </p>
              
              <div className="text-xs text-gray-500 mb-3 space-y-1">
                <div className="truncate">👩‍⚕️ {material.coach}</div>
                <div>{formatDate(material.uploadDate)}</div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button className="w-full bg-gradient-to-r from-red-400 to-rose-400 text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                  📥 İndir
                </button>
                <button className="w-full py-1.5 px-3 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors text-xs">
                  👁️ Görüntüle
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {coachVideos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-black/20 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 hover:border-red-400/30 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-full h-24 bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl mb-1">🎥</div>
                    <div className="text-xs">Video</div>
                  </div>
                </div>
                <div className="absolute top-1 right-1 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                  {video.duration}
                </div>
                <div className="absolute bottom-1 left-1 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs">
                  👁️ {video.views}
                </div>
              </div>
              
              <div className="p-3">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mb-2 ${getCategoryColor(video.category)}`}>
                  {video.category}
                </span>
                
                <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 leading-tight">
                  {video.title}
                </h3>
                
                <p className="text-xs text-gray-300 mb-3 line-clamp-2 leading-relaxed">
                  {video.description}
                </p>
                
                <div className="text-xs text-gray-500 mb-3 space-y-1">
                  <div className="truncate">👩‍⚕️ {video.coach}</div>
                  <div>{formatDate(video.uploadDate)}</div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-red-400 to-rose-400 text-white py-2 px-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1">
                  <span>▶️</span>
                  <span>İzle</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Message */}
      <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
        <div className="flex items-start space-x-4">
          <div className="text-2xl">💡</div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Bilgi</h3>
            <p className="text-gray-300 text-sm">
              Bu bölümde koçunuzun size özel hazırladığı tüm materyaller ve video dersler yer almaktadır. 
              Yeni içerikler eklendiğinde bildirim alacaksınız. İndirdiğiniz materyalleri offline olarak da kullanabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mesaj tipi
type Message = {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'student' | 'coach';
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
};

function MessagesModule({ studentData }: { studentData: StudentData }) {
  return (
    <ComingSoon
      title="Koç Mesajları"
      description="Koçunuzla birebir mesajlaşma, randevu talepleri ve özel danışmanlık hizmetleri yakında aktif olacak!"
      icon={<MessageCircle size={40} className="text-emerald-600" />}
      theme="coach"
    />
  );
}

function OriginalMessagesModule({ studentData }: { studentData: StudentData }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    description: ''
  });
  
  // LocalStorage'dan mesajları yükle
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_messages');
    
    // Koçtan gelen toplu mesajları yükle
    const studentMessages = JSON.parse(localStorage.getItem('studentMessages') || '{}');
    const studentPersonalMessages = studentMessages[studentData.id] || [];
    
    let allMessages: Message[] = [];
    
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      allMessages = [...parsedMessages];
    } else {
      // Başlangıç mesajları
      const initialMessages: Message[] = [
        {
          id: '1',
          senderId: 'coach_eylul',
          senderName: 'Dr. Eylül Büyükkaya',
          senderRole: 'coach',
          content: 'Merhaba Ahmet! Hoş geldin. Sınavın nasıl geçti? Bugün hangi konularda çalışmayı planlıyorsun?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 saat önce
          isRead: true
        },
        {
          id: '2',
          senderId: studentData.id.toString(),
          senderName: studentData.name,
          senderRole: 'student',
          content: 'Merhaba hocam! Sınav iyi geçti sanırım. Bugün anatomi ve fizyoloji çalışmayı planlıyorum. Özellikle kas sistemi konusunda zorlanıyorum.',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 saat önce
          isRead: true
        },
        {
          id: '3',
          senderId: 'coach_eylul',
          senderName: 'Dr. Eylül Büyükkaya',
          senderRole: 'coach',
          content: 'Harika! Kas sistemi gerçekten önemli bir konu. Önce temel kas türlerini öğrenip sonra fonksiyonlarına geçelim. Sana özel çalışma materyalleri hazırladım. 💪',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 saat önce
          isRead: true
        },
        {
          id: '4',
          senderId: 'coach_eylul',
          senderName: 'Dr. Eylül Büyükkaya',
          senderRole: 'coach',
          content: 'Bu akşam 19:00\'da online ders yapabilir miyiz? Kas kontraksiyonu mekanizmasını detaylı anlatalım.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 dakika önce
          isRead: false
        }
      ];
      allMessages = [...initialMessages];
    }
    
    // Koçtan gelen toplu mesajları Message formatına çevir ve ekle
    const bulkMessages: Message[] = studentPersonalMessages.map((msg: any) => ({
      id: msg.id.toString(),
      senderId: 'coach_eylul',
      senderName: msg.senderName,
      senderRole: 'coach' as const,
      content: msg.message,
      timestamp: new Date(msg.timestamp),
      isRead: msg.read
    }));
    
    // Tüm mesajları birleştir ve zamana göre sırala
    allMessages = [...allMessages, ...bulkMessages].sort((a, b) => 
      a.timestamp.getTime() - b.timestamp.getTime()
    );
    
    setMessages(allMessages);
  }, [studentData]);

  // Mesajları localStorage'a kaydet (sadece normal chat mesajlarını)
  useEffect(() => {
    // Toplu mesajlar hariç, sadece normal chat mesajlarını kaydet
    const chatMessages = messages.filter(msg => {
      // Koçtan gelen toplu mesajları filtrele (bunlar ayrı kaydediliyor)
      const studentMessages = JSON.parse(localStorage.getItem('studentMessages') || '{}');
      const studentPersonalMessages = studentMessages[studentData.id] || [];
      return !studentPersonalMessages.some((pm: any) => pm.id.toString() === msg.id);
    });
    localStorage.setItem('chat_messages', JSON.stringify(chatMessages));
  }, [messages, studentData.id]);

  // Toplu mesajların okunma durumunu güncelle
  const markBulkMessageAsRead = (messageId: string) => {
    const studentMessages = JSON.parse(localStorage.getItem('studentMessages') || '{}');
    if (studentMessages[studentData.id]) {
      const messageIndex = studentMessages[studentData.id].findIndex((msg: any) => msg.id.toString() === messageId);
      if (messageIndex !== -1) {
        studentMessages[studentData.id][messageIndex].read = true;
        localStorage.setItem('studentMessages', JSON.stringify(studentMessages));
      }
    }
  };

  // Mesaj gönder
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: studentData.id.toString(),
      senderName: studentData.name,
      senderRole: 'student',
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Koçun otomatik yanıtını simüle et (5 saniye sonra)
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'coach_eylul',
        senderName: 'Dr. Eylül Büyükkaya',
        senderRole: 'coach',
        content: getAutoReply(newMessage.trim()),
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, autoReply]);
    }, 3000 + Math.random() * 4000); // 3-7 saniye arası random yanıt
  };

  // Otomatik yanıt üretici
  const getAutoReply = (userMessage: string) => {
    const responses = [
      'Anlıyorum, bu konuyu daha detaylı açıklayayım. Yarın bir video ders hazırlayabilirim.',
      'Harika bir soru! Bu konuda sana özel kaynak göndereceğim.',
      'Bu konu gerçekten önemli. Hadi bu akşam birlikte çalışalım.',
      'Çok iyi ilerliyorsun! Devam et böyle. 👏',
      'Bu soruyu anlaman çok önemli. Sana detaylı açıklama gönderiyorum.',
      'Mükemmel! Bu konuyu kavradığını görmek güzel. Sıradaki konuya geçebiliriz.',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Randevu gönder
  const sendAppointmentRequest = () => {
    if (!appointmentData.date || !appointmentData.time) {
      alert('Lütfen tarih ve saat seçiniz!');
      return;
    }

    const appointmentMessage: Message = {
      id: Date.now().toString(),
      senderId: studentData.id.toString(),
      senderName: studentData.name,
      senderRole: 'student',
      content: `🗓️ Randevu Talebi\n\n📅 Tarih: ${appointmentData.date}\n⏰ Saat: ${appointmentData.time}\n📝 Açıklama: ${appointmentData.description || 'Açıklama eklenmedi'}`,
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, appointmentMessage]);
    
    // Koça bildirim gönder
    sendNotificationToCoach();
    
    // Koçun otomatik yanıtı
    setTimeout(() => {
      const coachReply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'coach_eylul',
        senderName: 'Dr. Eylül Büyükkaya',
        senderRole: 'coach',
        content: `Randevu talebiniz alındı! ${appointmentData.date} tarihinde ${appointmentData.time} saatinde görüşelim. Takvimime ekliyorum. 📅✅`,
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, coachReply]);
      
      // Öğrenciye randevu onay bildirimi gönder
      sendNotificationToStudent({
        message: `Dr. Eylül Büyükkaya randevunuzu onayladı`,
        type: 'appointment_confirmed',
        appointmentDetails: appointmentData
      });
    }, 2000);

    // Modal'ı kapat ve formu temizle
    setShowAppointmentModal(false);
    setAppointmentData({ date: '', time: '', description: '' });
  };

  // Koça bildirim gönder (sadece koç paneli için)
  const sendNotificationToCoach = () => {
    const existingNotifications = JSON.parse(localStorage.getItem('coach_notifications') || '[]');
    const newNotification = {
      id: Date.now().toString(),
      studentName: studentData.name,
      message: `${studentData.name} adlı öğrenci sizden randevu talep etti`,
      type: 'appointment_request',
      timestamp: new Date(),
      isRead: false,
      appointmentDetails: appointmentData
    };
    
    existingNotifications.push(newNotification);
    localStorage.setItem('coach_notifications', JSON.stringify(existingNotifications));
    
    // NOT: Bu bildirim koça gider, öğrenci panelinde görünmez
    console.log('Randevu talebi koça gönderildi:', newNotification);
  };

  // Öğrenciye bildirim gönder (öğrenci panelinde görünür)
  const sendNotificationToStudent = (notificationData: any) => {
    const existingNotifications = JSON.parse(localStorage.getItem('student_notifications') || '[]');
    const newNotification = {
      id: Date.now().toString(),
      coachName: 'Dr. Eylül Büyükkaya',
      message: notificationData.message,
      type: notificationData.type,
      timestamp: new Date(),
      isRead: false,
      appointmentDetails: notificationData.appointmentDetails
    };
    
    existingNotifications.push(newNotification);
    localStorage.setItem('student_notifications', JSON.stringify(existingNotifications));
    
    // Öğrenci panelindeki bildirim sayısını güncelle
    window.dispatchEvent(new CustomEvent('studentNotificationUpdate'));
  };

  // Mesaj zamanını formatla
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} gün önce`;
    if (hours > 0) return `${hours} saat önce`;
    if (minutes > 0) return `${minutes} dakika önce`;
    return 'Az önce';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col lg:flex-row gap-6"
    >
      {/* Sol Panel - Koç Bilgileri */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full lg:w-80 bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-fit"
      >
        {/* Koç Profili */}
        <div className="text-center mb-6">
          <div className="relative mx-auto mb-4">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=120&h=120&fit=crop&crop=face"
              alt="Dr. Eylül Büyükkaya"
              className="w-20 h-20 rounded-full mx-auto border-2 border-emerald-400"
            />
            <div className="absolute -bottom-1 -right-1">
              <div className="w-4 h-4 bg-emerald-400 rounded-full border-2 border-black animate-pulse"></div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-1">{studentData.coach}</h3>
          <p className="text-emerald-400 text-sm font-medium mb-2">Tıp Koçunuz</p>
          <p className="text-gray-400 text-xs">Çevrimiçi</p>
        </div>

        {/* İstatistikler */}
        <div className="space-y-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle size={16} className="text-blue-400" />
              <span className="text-white font-medium text-sm">Mesajlaşma</span>
            </div>
            <p className="text-2xl font-bold text-white">{messages.length}</p>
            <p className="text-gray-400 text-xs">Toplam mesaj</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Video size={16} className="text-emerald-400" />
              <span className="text-white font-medium text-sm">Görüşmeler</span>
            </div>
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-gray-400 text-xs">Bu ay</p>
          </div>
        </div>

                 {/* Hızlı Eylemler */}
         <div className="space-y-3">
           <motion.button
             whileHover={{ scale: 1.02 }}
             whileTap={{ scale: 0.98 }}
             onClick={() => setShowAppointmentModal(true)}
             className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
           >
             <Calendar size={16} />
             Randevu Al
           </motion.button>
         </div>
      </motion.div>

      {/* Sağ Panel - Chat Alanı */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex-1 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col h-[600px]"
      >
        {/* Chat Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face"
                alt="Dr. Eylül Büyükkaya"
                className="w-12 h-12 rounded-full border-2 border-emerald-400"
              />
              <div>
                <h3 className="text-white font-semibold">{studentData.coach}</h3>
                <p className="text-emerald-400 text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full block"></span>
                  Aktif
                </p>
              </div>
            </div>
            
                         <div className="flex gap-2">
               <motion.button
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="p-2 hover:bg-white/10 rounded-xl transition-colors"
               >
                 <Search size={18} className="text-gray-400" />
               </motion.button>
             </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.senderRole === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md ${message.senderRole === 'student' ? 'order-2' : 'order-1'}`}>
                {/* Avatar */}
                <div className={`flex items-end gap-2 ${message.senderRole === 'student' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <img
                    src={message.senderRole === 'student' 
                      ? (studentData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face')
                      : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face'
                    }
                    alt={message.senderName}
                    className="w-8 h-8 rounded-full"
                  />
                  
                  {/* Message Bubble */}
                  <div 
                    onClick={() => {
                      if (message.senderRole === 'coach' && !message.isRead) {
                        markBulkMessageAsRead(message.id);
                        // State'i güncelle
                        setMessages(prev => prev.map(msg => 
                          msg.id === message.id ? { ...msg, isRead: true } : msg
                        ));
                      }
                    }}
                    className={`relative p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] ${
                    message.senderRole === 'student'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : `bg-white/10 backdrop-blur-sm border border-white/20 text-white ${!message.isRead ? 'ring-2 ring-yellow-400/50' : ''}`
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Message Time */}
                    <p className={`text-xs mt-2 ${
                      message.senderRole === 'student' ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                    
                    {/* Read Status */}
                    {message.senderRole === 'student' && (
                      <div className="absolute -bottom-1 -right-1">
                        <div className={`w-3 h-3 rounded-full ${
                          message.isRead ? 'bg-emerald-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-end gap-2">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face"
                  alt="Dr. Eylül Büyükkaya"
                  className="w-8 h-8 rounded-full"
                />
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-end gap-3">
            {/* Attachment Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowAttachments(!showAttachments)}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              <Paperclip size={18} className="text-gray-400" />
            </motion.button>

            {/* Text Input */}
            <div className="flex-1 bg-white/10 border border-white/20 rounded-xl overflow-hidden">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Mesajınızı yazın..."
                className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none resize-none"
                rows={1}
                style={{ maxHeight: '120px' }}
              />
            </div>

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 disabled:from-gray-500 disabled:to-gray-600 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
            >
              <Send size={18} className="text-white" />
            </motion.button>
          </div>

          {/* Quick Responses */}
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {['Teşekkürler!', 'Anladım', 'Evet, uygun', 'Daha detaylı anlatabilir misiniz?'].map((response, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setNewMessage(response)}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 whitespace-nowrap transition-all"
              >
                {response}
              </motion.button>
            ))}
          </div>
                 </div>
       </motion.div>

       {/* Randevu Modal */}
       <AnimatePresence>
         {showAppointmentModal && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
             onClick={() => setShowAppointmentModal(false)}
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               onClick={(e) => e.stopPropagation()}
               className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md"
             >
               {/* Modal Header */}
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-white">Randevu Talep Et</h3>
                 <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => setShowAppointmentModal(false)}
                   className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                 >
                   <X size={20} className="text-gray-400" />
                 </motion.button>
               </div>

               {/* Form Fields */}
               <div className="space-y-4">
                 {/* Tarih Seçici */}
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">
                     Randevu Tarihi
                   </label>
                   <input
                     type="date"
                     value={appointmentData.date}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))}
                     min={new Date().toISOString().split('T')[0]}
                     className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                   />
                 </div>

                 {/* Saat Seçici */}
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">
                     Randevu Saati
                   </label>
                   <select
                     value={appointmentData.time}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, time: e.target.value }))}
                     className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                   >
                     <option value="" className="bg-gray-800">Saat seçiniz</option>
                     <option value="09:00" className="bg-gray-800">09:00</option>
                     <option value="10:00" className="bg-gray-800">10:00</option>
                     <option value="11:00" className="bg-gray-800">11:00</option>
                     <option value="13:00" className="bg-gray-800">13:00</option>
                     <option value="14:00" className="bg-gray-800">14:00</option>
                     <option value="15:00" className="bg-gray-800">15:00</option>
                     <option value="16:00" className="bg-gray-800">16:00</option>
                     <option value="17:00" className="bg-gray-800">17:00</option>
                     <option value="18:00" className="bg-gray-800">18:00</option>
                     <option value="19:00" className="bg-gray-800">19:00</option>
                     <option value="20:00" className="bg-gray-800">20:00</option>
                   </select>
                 </div>

                 {/* Açıklama */}
                 <div>
                   <label className="block text-sm font-medium text-gray-300 mb-2">
                     Açıklama (Opsiyonel)
                   </label>
                   <textarea
                     value={appointmentData.description}
                     onChange={(e) => setAppointmentData(prev => ({ ...prev, description: e.target.value }))}
                     placeholder="Randevu konusunu kısaca açıklayın..."
                     rows={3}
                     className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                   />
                 </div>
               </div>

               {/* Modal Buttons */}
               <div className="flex gap-3 mt-6">
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setShowAppointmentModal(false)}
                   className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300"
                 >
                   İptal
                 </motion.button>
                 
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={sendAppointmentRequest}
                   className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg"
                 >
                   Onayla
                 </motion.button>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     </motion.div>
   );
}








type StudyRoom = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  onlineCount: number;
};

type ChatMessage = {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  message: string;
  timestamp: Date;
  roomId: string;
};

// StudyRoomModule Component - Modern ve responsive tasarım
function StudyRoomModule({ studentData }: { studentData: StudentData }) {
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Öğrencinin alanını normalize et (field ID'ye çevir)
  const normalizeStudentField = (targetExam: string): string => {
    if (!targetExam) return '';
    
    const fieldLower = targetExam.toLowerCase();
    console.log('🔍 normalizeStudentField çalıştı:', { targetExam, fieldLower });
    
    if (fieldLower.includes('tyt ve ayt') || fieldLower.includes('tyt_ayt')) {
      console.log('✅ Match: tyt_ayt');
      return 'tyt_ayt';
    } else if (fieldLower.includes('preklinik') || fieldLower.includes('pre klinik') || fieldLower.includes('pre kli̇ni̇k')) {
      console.log('✅ Match: preklinik');
      return 'preklinik';
    } else if (fieldLower.includes('klinik') && !fieldLower.includes('pre')) {
      console.log('✅ Match: klinik');
      return 'klinik';
    } else if (fieldLower.includes('tyt')) {
      console.log('✅ Match: tyt');
      return 'tyt';
    } else if (fieldLower.includes('ayt')) {
      console.log('✅ Match: ayt');
      return 'ayt';
    } else if (fieldLower.includes('lgs')) {
      console.log('✅ Match: lgs');
      return 'lgs';
    } else if (fieldLower.includes('tip')) {
      console.log('✅ Match: tip');
      return 'tip';
    } else if (fieldLower.includes('usmle')) {
      console.log('✅ Match: usmle');
      return 'usmle';
    } else if (fieldLower.includes('tus')) {
      console.log('✅ Match: tus');
      return 'tus';
    }
    
    console.log('❌ No match found for:', fieldLower);
    return '';
  };

  // Oda erişim kontrolü
  const checkRoomAccess = (roomId: string): boolean => {
    const studentField = normalizeStudentField(studentData.targetExam || '');
    console.log('🔍 Oda erişim kontrolü:', {
      studentField,
      roomId,
      studentTargetExam: studentData.targetExam,
      studentEmail: studentData.email,
      accessGranted: studentField === roomId
    });
    
    return studentField === roomId;
  };

  // Oda seçim fonksiyonu (erişim kontrolü ile)
  const handleRoomSelection = (roomId: string) => {
    if (!checkRoomAccess(roomId)) {
      const room = studyRooms.find(r => r.id === roomId);
      alert(`⚠️ Bu alanda olmadığınız için "${room?.name}" odasına katılamazsınız.\n\n🎯 Sizin alanınız: ${studentData.targetExam}\n🚪 Bu oda: ${room?.name} alanı için\n\n💡 Sadece kendi alanınızdaki çalışma odasına katılabilirsiniz.`);
      return;
    }
    
    setSelectedRoom(roomId);
  };

  const studyRooms: StudyRoom[] = [
    {
      id: 'tyt',
      name: 'TYT',
      description: 'TYT sınavına hazırlanan öğrenciler',
      icon: '📝',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      onlineCount: 24
    },
    {
      id: 'ayt',
      name: 'AYT',
      description: 'AYT sınavına hazırlanan öğrenciler',
      icon: '🎓',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      onlineCount: 18
    },
    {
      id: 'tyt_ayt',
      name: 'TYT ve AYT',
      description: 'TYT ve AYT sınavlarına hazırlanan öğrenciler',
      icon: '📚',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      onlineCount: 31
    },
    {
      id: 'lgs',
      name: 'LGS',
      description: 'LGS sınavına hazırlanan öğrenciler',
      icon: '📖',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      onlineCount: 15
    },
    {
      id: 'tip',
      name: 'TIP',
      description: 'Tıp fakültesi öğrencileri',
      icon: '⚕️',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      onlineCount: 12
    },
    {
      id: 'preklinik',
      name: 'PRE KLİNİK',
      description: 'Preklinik dönem tıp öğrencileri',
      icon: '🩺',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      onlineCount: 8
    },
    {
      id: 'klinik',
      name: 'KLİNİK',
      description: 'Klinik dönem tıp öğrencileri',
      icon: '🏥',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      onlineCount: 6
    },
    {
      id: 'usmle',
      name: 'USMLE',
      description: 'USMLE sınavına hazırlanan doktorlar',
      icon: '🇺🇸',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      onlineCount: 4
    },
    {
      id: 'tus',
      name: 'TUS',
      description: 'TUS sınavına hazırlanan doktorlar',
      icon: '📋',
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      onlineCount: 7
    }
  ];

  // Mesajları localStorage'dan yükle
  useEffect(() => {
    if (selectedRoom) {
      const savedMessages = localStorage.getItem(`chat_messages_${selectedRoom}`);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } else {
        setMessages([]);
      }
    }
  }, [selectedRoom]);

  // Mesajları localStorage'a kaydet
  useEffect(() => {
    if (selectedRoom && messages.length > 0) {
      localStorage.setItem(`chat_messages_${selectedRoom}`, JSON.stringify(messages));
    }
  }, [messages, selectedRoom]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: studentData.id.toString(),
      userName: studentData.name,
      userPhoto: studentData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      message: newMessage.trim(),
      timestamp: new Date(),
      roomId: selectedRoom
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simüle edilmiş otomatik yanıt
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: 'bot',
        userName: 'Çalışma Asistanı',
        userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        message: getAutoReply(newMessage),
        timestamp: new Date(),
        roomId: selectedRoom
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1500);
  };

  const getAutoReply = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    if (message.includes('merhaba') || message.includes('selam')) {
      return 'Merhaba! Çalışma odamıza hoş geldin! 👋';
    } else if (message.includes('soru') || message.includes('yardım')) {
      return 'Tabii ki yardım edebilirim! Hangi konuda desteğe ihtiyacın var? 🤔';
    } else if (message.includes('sınav') || message.includes('test')) {
      return 'Sınav hazırlığı konusunda deneyimli arkadaşlarımız var. Hangi ders için çalışıyorsun? 📖';
    } else if (message.includes('teşekkür')) {
      return 'Rica ederim! Birlikte daha güçlüyüz! 💪';
    } else {
      return 'Harika bir soru! Diğer arkadaşların da fikrini alalım. 💭';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Bugün';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Dün';
    } else {
      return date.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'short' 
      });
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-white via-gray-50 to-white flex flex-col overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header - Discord Style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 p-4 shadow-lg z-10 flex-shrink-0 relative"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl shadow-xl">
                <Users className="text-white" size={24} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Çalışma Odaları
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-gray-600 text-sm">Topluluk • Canlı</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30 shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">
                {studyRooms.reduce((total, room) => total + room.onlineCount, 0)} çevrimiçi
              </span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
              <User className="text-white" size={18} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Flexible */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0 overflow-hidden">
        {/* Sidebar - Discord Style */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 p-1 flex flex-col min-h-0 relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none"></div>
          
          <div className="relative z-10 p-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white" size={16} />
              </div>
              <h2 className="text-gray-800 font-bold text-sm">ÇALIŞMA KANALLARI</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1 min-h-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
              {studyRooms.map((room, index) => {
                const isActive = selectedRoom === room.id;
                const canAccess = checkRoomAccess(room.id);
                
                return (
                  <motion.button
                    key={room.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleRoomSelection(room.id)}
                    disabled={!canAccess}
                    className={`w-full p-3 rounded-lg transition-all duration-300 text-left group relative overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-100 to-purple-200 shadow-lg border border-purple-400'
                        : canAccess 
                        ? 'hover:bg-gray-100 hover:shadow-md'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-cyan-400"></div>
                    )}
                    
                    {/* Hover glow */}
                    <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity ${
                      room.bgColor.replace('bg-', 'from-').replace('-50', '-500')
                    } to-transparent pointer-events-none`}></div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`text-lg flex-shrink-0 ${isActive ? 'scale-110' : ''} transition-transform`}>
                        {room.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-bold text-sm ${
                            isActive ? 'text-gray-800' : canAccess ? 'text-gray-700' : 'text-gray-400'
                          }`}>
                            {room.name}
                          </h3>
                          {!canAccess && (
                            <div className="w-4 h-4 bg-red-500/20 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <p className={`text-xs truncate ${
                          isActive ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {room.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className={`flex items-center gap-1 ${
                            isActive ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium">{room.onlineCount}</span>
                          </div>
                          {canAccess && (
                            <div className="text-xs text-emerald-600 font-medium">✓</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Rules Section - Discord Style */}
            <div className="mt-4 p-3 bg-amber-50/80 rounded-lg border border-amber-200/50 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-amber-500/20 rounded flex items-center justify-center">
                  <AlertCircle className="text-amber-600" size={12} />
                </div>
                <h4 className="text-amber-700 text-xs font-bold">TOPLULUK KURALLARI</h4>
              </div>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Saygılı olun</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Konuyla ilgili kalın</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Spam yapmayın</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Birbirinize yardım edin</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Chat Area - Discord Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 flex flex-col min-h-0 relative overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-cyan-100/20 pointer-events-none"></div>
          
          {selectedRoom ? (
            <>
              {/* Chat Header - Discord Style */}
              <div className="p-4 border-b border-gray-200/50 flex-shrink-0 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="text-3xl drop-shadow-lg">
                        {studyRooms.find(room => room.id === selectedRoom)?.icon}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        {studyRooms.find(room => room.id === selectedRoom)?.name}
                        <div className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-700 border border-purple-500/30">
                          CANLI
                        </div>
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <p className="text-gray-600 text-sm">
                          {studyRooms.find(room => room.id === selectedRoom)?.onlineCount} üye çevrimiçi
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Bell className="text-gray-600" size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Search className="text-gray-600" size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages - Discord Style */}
              <div className="flex-1 p-4 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent relative z-10">
                {messages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center min-h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <MessageCircle className="text-gray-500" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">#{studyRooms.find(room => room.id === selectedRoom)?.name} Odası</h3>
                      <p className="text-gray-600 text-sm max-w-md">
                        Bu odada çalışma yolculuğunuzun başlangıcı. Merhaba diyerek başlayın!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {messages.map((message, index) => {
                      const showDateHeader = index === 0 || 
                        formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
                      const showUserInfo = index === 0 || 
                        messages[index - 1].userId !== message.userId ||
                        showDateHeader;
                      
                      return (
                        <div key={message.id}>
                          {showDateHeader && (
                            <div className="flex items-center justify-center my-6">
                              <div className="flex-1 h-px bg-gray-300"></div>
                              <span className="px-4 text-xs text-gray-500 bg-gray-100 rounded-full py-1 border border-gray-200">
                                {formatDate(message.timestamp)}
                              </span>
                              <div className="flex-1 h-px bg-gray-300"></div>
                            </div>
                          )}
                          
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group hover:bg-gray-100/50 px-3 py-1 rounded-lg transition-colors"
                          >
                            {showUserInfo ? (
                              <div className="flex items-start gap-3">
                                <div className="relative">
                                  <img
                                    src={message.userPhoto}
                                    alt={message.userName}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                                  />
                                  {message.userId === studentData.id.toString() && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-baseline gap-2 mb-1">
                                    <span className={`font-bold text-sm ${
                                      message.userId === studentData.id.toString() ? 'text-purple-600' : 'text-gray-800'
                                    }`}>
                                      {message.userName}
                                    </span>
                                    {message.userId === studentData.id.toString() && (
                                      <span className="text-xs text-purple-600 bg-purple-500/20 px-2 py-0.5 rounded-full">SEN</span>
                                    )}
                                    <span className="text-xs text-gray-500">
                                      {formatTime(message.timestamp)}
                                    </span>
                                  </div>
                                  <div className="text-gray-700 text-sm leading-relaxed">
                                    {message.message}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex gap-3">
                                <div className="w-10 flex justify-center">
                                  <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {formatTime(message.timestamp).split(':')[0]}:{formatTime(message.timestamp).split(':')[1]}
                                  </span>
                                </div>
                                <div className="flex-1 text-gray-700 text-sm leading-relaxed">
                                  {message.message}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Message Input - Discord Style */}
              <div className="p-4 flex-shrink-0 relative z-10">
                <div className="relative">
                  <div className="flex items-end gap-3 bg-gray-100 rounded-xl p-3 border border-gray-200">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={`#${studyRooms.find(room => room.id === selectedRoom)?.name?.toLowerCase() || 'odası'} kanalına mesaj yazın`}
                        className="w-full bg-transparent text-gray-700 placeholder-gray-500 border-none outline-none text-sm resize-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                        <Paperclip className="text-gray-600" size={18} />
                      </button>
                      <motion.button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-lg transition-all ${
                          newMessage.trim() 
                            ? 'bg-purple-500 hover:bg-purple-600 text-white shadow-lg' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <Send size={18} />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-3"
                    >
                      <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-lg">
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-700">Birisi yazıyor...</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </>
                      ) : (
              <div className="flex-1 flex items-center justify-center relative z-10">
                <div className="text-center max-w-md">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Users className="text-gray-500" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Çalışma Odalarına Hoş Geldiniz
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Alanınızdaki diğer öğrencilerle iş birliği yapmak için kenar çubuğundan bir çalışma odası seçin.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Bağlanmaya hazır</span>
                  </div>
                </div>
              </div>
            )}
        </motion.div>
      </div>
    </div>
  );
}

function NotificationsDropdown({ setNotifications, onClose }: { setNotifications: (count: number) => void; onClose: () => void }) {
  const [notifications, setLocalNotifications] = useState<any[]>([]);

  useEffect(() => {
    const studentNotifications = JSON.parse(localStorage.getItem('student_notifications') || '[]');
    setLocalNotifications(studentNotifications);
  }, []);

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    );
    setLocalNotifications(updatedNotifications);
    localStorage.setItem('student_notifications', JSON.stringify(updatedNotifications));
    
    // Ana badge sayısını güncelle
    const unreadCount = updatedNotifications.filter(notif => !notif.isRead).length;
    setNotifications(unreadCount);
  };

  const clearAllNotifications = () => {
    localStorage.removeItem('student_notifications');
    setLocalNotifications([]);
    setNotifications(0);
  };

  const formatNotificationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) return `${hours} saat önce`;
    if (minutes > 0) return `${minutes} dakika önce`;
    return 'Az önce';
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="text-slate-600" size={20} />
            <h3 className="text-lg font-semibold text-slate-800">Bildirimler</h3>
            {notifications.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </div>
          
          {notifications.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearAllNotifications}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >
              Tümünü Temizle
            </motion.button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="mx-auto text-slate-300 mb-3" size={32} />
            <p className="text-slate-500 text-sm">Henüz bildirim yok</p>
            <p className="text-slate-400 text-xs mt-1">Koçunuzdan gelen bildirimler burada görünecek</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  notification.isRead 
                    ? 'bg-slate-50 border-slate-200' 
                    : 'bg-blue-50 border-blue-200 shadow-sm'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'appointment_request' 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : notification.type === 'appointment_confirmed'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.type === 'appointment_request' ? (
                      <Calendar size={14} />
                    ) : notification.type === 'appointment_confirmed' ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Bell size={14} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-800 text-sm">
                        {notification.type === 'appointment_request' 
                          ? 'Randevu Talebi' 
                          : notification.type === 'appointment_confirmed'
                          ? 'Randevu Onaylandı'
                          : 'Bildirim'}
                      </h4>
                      <span className="text-xs text-slate-500">
                        {formatNotificationTime(notification.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {notification.message}
                    </p>
                    
                    {notification.appointmentDetails && (
                      <div className="mt-2 p-2 bg-slate-100 rounded-md text-xs text-slate-600">
                        <div>📅 {notification.appointmentDetails.date}</div>
                        <div>⏰ {notification.appointmentDetails.time}</div>
                        {notification.appointmentDetails.description && (
                          <div>📝 {notification.appointmentDetails.description}</div>
                        )}
                      </div>
                    )}
                    
                    {!notification.isRead && (
                      <div className="mt-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileModule({ studentData }: { studentData: StudentData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: studentData.name,
    email: studentData.email,
    photo: studentData.photo || '',
    goal: studentData.goal || '',
    targetExam: studentData.targetExam || '',
    studyHabits: studentData.studyHabits || '',
    communicationStyle: studentData.communicationStyle || '',
    coachExpectations: studentData.coachExpectations || '',
    emotionalSupport: studentData.emotionalSupport || '',
    programAdaptability: studentData.programAdaptability || '',
    examHistory: studentData.examHistory || '',
    preferredPlatforms: studentData.preferredPlatforms || '',
    learningType: studentData.learningType || '',
    previousCoachingExperience: studentData.previousCoachingExperience || ''
  });

  // Debug: profil yüklendiğinde targetExam değerini kontrol et
  console.log('🔍 ProfileModule - studentData.targetExam:', studentData.targetExam);
  console.log('🔍 ProfileModule - profileData.targetExam:', profileData.targetExam);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Komponenet mount olduğunda kaydedilmiş profil verilerini yükle
  useEffect(() => {
    const loadProfileData = () => {
      try {
        // Email ile kaydedilmiş profil verilerini yükle
        const savedProfile = localStorage.getItem(`student_profile_${studentData.email}`);
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          if (parsedProfile.profileData) {
            // Hedef sınavı kayıt sırasında seçilen alan ile güncelle (override etmesin)
            const updatedProfileData = {
              ...parsedProfile.profileData,
              targetExam: studentData.targetExam || parsedProfile.profileData.targetExam
            };
            setProfileData(updatedProfileData);
            console.log('✅ Kaydedilmiş profil yüklendi:', studentData.email);
          }
        } else {
          // Eski localStorage key'ini kontrol et
          const oldProfile = localStorage.getItem('studentProfile');
          if (oldProfile) {
            const parsedOldProfile = JSON.parse(oldProfile);
            if (parsedOldProfile.email === studentData.email) {
              const updatedOldProfile = {
                ...parsedOldProfile,
                targetExam: studentData.targetExam || parsedOldProfile.targetExam
              };
              setProfileData(updatedOldProfile);
              console.log('✅ Eski profil formatı yüklendi ve güncellenecek:', studentData.email);
            }
          } else {
            // İlk kez profil açılıyorsa, kayıt sırasında seçilen hedef sınavı ayarla
            setProfileData(prev => ({
              ...prev,
              targetExam: studentData.targetExam || ''
            }));
            console.log('🔍 İlk kez profil açılıyor, targetExam ayarlandı:', studentData.targetExam);
          }
        }
      } catch (error) {
        console.error('❌ Profil yüklenirken hata:', error);
      }
    };

    if (studentData.email) {
      loadProfileData();
    }
    
    // Her zaman targetExam field'ını studentData'dan al (güvenlik için)
    if (studentData.targetExam && profileData.targetExam !== studentData.targetExam) {
      setProfileData(prev => ({
        ...prev,
        targetExam: studentData.targetExam || ''
      }));
      console.log('🔍 targetExam güncellendi:', studentData.targetExam);
    }
  }, [studentData.email, studentData.targetExam, profileData.targetExam]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Email ile birlikte profil verilerini kaydet
      const studentProfileData = {
        email: profileData.email,
        studentId: studentData.id,
        lastUpdated: new Date().toISOString(),
        profileData: profileData
      };
      
      // LocalStorage'a email key'i ile kaydet
      localStorage.setItem(`student_profile_${profileData.email}`, JSON.stringify(studentProfileData));
      
      // Tüm öğrenci profillerini tutan ana yapı
      const allStudentProfiles = JSON.parse(localStorage.getItem('all_student_profiles') || '{}');
      allStudentProfiles[profileData.email] = studentProfileData;
      localStorage.setItem('all_student_profiles', JSON.stringify(allStudentProfiles));
      
      // Koç paneli için erişim kolaylığı
      const coachAccessData = {
        email: profileData.email,
        name: profileData.name,
        lastUpdated: new Date().toISOString(),
        profileComplete: true
      };
      
      const coachStudentList = JSON.parse(localStorage.getItem('coach_student_list') || '[]');
      const existingIndex = coachStudentList.findIndex((student: any) => student.email === profileData.email);
      
      if (existingIndex >= 0) {
        coachStudentList[existingIndex] = coachAccessData;
      } else {
        coachStudentList.push(coachAccessData);
      }
      
      localStorage.setItem('coach_student_list', JSON.stringify(coachStudentList));
      
      // Eski localStorage key'ini temizle
      localStorage.removeItem('studentProfile');
      
      // Firebase'e profil verilerini gönder
      try {
        const firebaseProfileData = prepareStudentProfileForFirebase(profileData, studentData);
        const firebaseSuccess = await sendStudentProfileToFirebase(firebaseProfileData);
        
        if (firebaseSuccess) {
          console.log('✅ Profil verileri Firebase\'e başarıyla gönderildi');
        } else {
          console.log('⚠️ Firebase\'e profil gönderimi başarısız oldu, sadece localStorage\'a kaydedildi');
        }
      } catch (firebaseError) {
        console.error('❌ Firebase profil gönderim hatası:', firebaseError);
        // Firebase hatası olsa da profil kaydetmeyi devam ettir
      }
      
      console.log('✅ Profil başarıyla kaydedildi:', profileData.email);
      
    } catch (error) {
      console.error('❌ Profil kaydedilirken hata:', error);
      alert('Profil kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
    
    setIsSaving(false);
    setIsEditing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show a toast notification here if needed
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Dosya boyutu kontrolü (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5MB\'dan küçük olmalıdır.');
      return;
    }

    // Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
      alert('Lütfen sadece resim dosyası seçiniz.');
      return;
    }

    setIsUploadingPhoto(true);

    try {
      // FileReader ile dosyayı base64'e çevir
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setProfileData(prev => ({
          ...prev,
          photo: base64
        }));
        setIsUploadingPhoto(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      setIsUploadingPhoto(false);
      alert('Dosya yüklenirken bir hata oluştu.');
    }
  };

  const handleChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <User size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Profil Detayları</h1>
                <p className="text-gray-600 text-lg">
                  Bu bilgiler koç eşleşmesinde kullanılacak ve koçunuz tarafından görülebilecek.
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isSaving}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Kaydediliyor...
                </>
              ) : isEditing ? (
                <>
                  <CheckCircle size={20} />
                  Kaydet
                </>
              ) : (
                <>
                  <User size={20} />
                  Düzenle
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Photo & Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
            <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-md">
                <User size={28} className="text-white" />
              </div>
              <div>
              <h2 className="text-2xl font-bold text-gray-900">Temel Bilgiler</h2>
              <p className="text-gray-600">Kişisel bilgileriniz</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Photo Section */}
              <div className="lg:col-span-2">
              <label className="block text-gray-700 font-semibold mb-4 text-lg">
                  📸 Profil Fotoğrafı
                </label>
                <div className="flex items-center gap-6">
                  <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-gray-200 shadow-lg">
                      <img
                        src={profileData.photo || studentData.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face'}
                        alt="Profil"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isUploadingPhoto && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-8 h-8 border-3 border-white border-t-transparent rounded-full"
                        />
                      </div>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="flex-1 space-y-4">
                      <div>
                      <label className="block text-gray-600 text-sm mb-2">
                          💻 Bilgisayardan Yükle
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={isUploadingPhoto}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                          />
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3 cursor-pointer hover:shadow-lg transition-all duration-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            {isUploadingPhoto ? 'Yükleniyor...' : 'Dosya Seç'}
                          </motion.div>
                        </div>
                      <p className="text-gray-500 text-sm mt-2">
                          JPG, PNG, GIF - Maksimum 5MB
                        </p>
                      </div>
                      
                      <div>
                      <label className="block text-gray-600 text-sm mb-2">
                          🌐 Veya URL Girin
                        </label>
                        <input
                          type="url"
                          value={profileData.photo.startsWith('data:') ? '' : profileData.photo}
                          onChange={(e) => handleChange('photo', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://example.com/photo.jpg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  👤 Ad Soyad
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                    placeholder="Adınızı ve soyadınızı girin"
                  />
                ) : (
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-gray-900 font-medium text-lg">{profileData.name}</p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                  📧 E-posta Adresi
                </label>
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    className="flex-1 px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                      placeholder="email@example.com"
                    />
                  ) : (
                  <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-gray-900 font-medium text-lg">{profileData.email}</p>
                    </div>
                  )}
                  <motion.button
                    onClick={() => copyToClipboard(profileData.email)}
                  className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl text-white hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="E-posta adresini kopyala"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Student Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
        >
            <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-md">
                <Target size={28} className="text-white" />
              </div>
              <div>
              <h2 className="text-2xl font-bold text-gray-900">Öğrenci Detayları</h2>
              <p className="text-gray-600">Koç eşleşmesinde kullanılacak önemli bilgiler</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Goal */}
              <div className="lg:col-span-2">
              <label className="block text-gray-700 font-semibold mb-4 text-lg">
                  🎯 Hedefim ve Motivasyonum
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.goal}
                    onChange={(e) => handleChange('goal', e.target.value)}
                    rows={4}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Hedeflerinizi ve motivasyonunuzu detaylı olarak açıklayın..."
                  />
                ) : (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                  <p className="text-gray-900 text-lg leading-relaxed">
                      {profileData.goal || 'Henüz belirtilmemiş'}
                    </p>
                  </div>
                )}
              </div>

              {/* Target Exam - Not Editable */}
              <div>
              <label className="block text-gray-700 font-semibold mb-4 text-lg">
                  📚 Hedef Sınav (Kayıt Sırasında Seçildi)
                </label>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200 relative">
                  <p className="text-gray-900 font-medium text-lg">
                    {studentData.targetExam || profileData.targetExam || 'Henüz belirtilmemiş'}
                  </p>
                  <div className="absolute top-2 right-2">
                    <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Sabit
                    </div>
                  </div>
                  <p className="text-emerald-700 text-sm mt-2 font-medium">
                    💡 Bu alan kayıt sırasında seçilmiştir ve değiştirilemez
                  </p>
                </div>
              </div>

              {/* Study Habits */}
              <div>
              <label className="block text-gray-700 font-semibold mb-4 text-lg">
                  ⏰ Çalışma Alışkanlıkları
                </label>
                {isEditing ? (
                  <textarea
                    value={profileData.studyHabits}
                    onChange={(e) => handleChange('studyHabits', e.target.value)}
                    rows={3}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Günlük çalışma rutininizi açıklayın..."
                  />
                ) : (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                  <p className="text-gray-900 text-lg">
                      {profileData.studyHabits || 'Henüz belirtilmemiş'}
                    </p>
                  </div>
                )}
              </div>

              {/* Communication Style */}
              <div>
              <label className="block text-gray-700 font-semibold mb-4 text-lg">
                  💬 İletişim Tarzı
                </label>
                {isEditing ? (
                  <select
                    value={profileData.communicationStyle}
                    onChange={(e) => handleChange('communicationStyle', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  <option value="">Seçiniz</option>
                  <option value="Resmi">Resmi</option>
                  <option value="Eğlenceli">Eğlenceli</option>
                  <option value="Samimi">Samimi</option>
                  <option value="Profesyonel">Profesyonel</option>
                  </select>
                ) : (
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                  <p className="text-gray-900 font-medium text-lg">
                      {profileData.communicationStyle || 'Henüz belirtilmemiş'}
                    </p>
                  </div>
                )}
              </div>

              {/* Learning Type */}
              <div>
              <label className="block text-gray-700 font-semibold mb-4 text-lg">
                  🧠 Öğrenme Tipi
                </label>
                {isEditing ? (
                  <select
                    value={profileData.learningType}
                    onChange={(e) => handleChange('learningType', e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                >
                  <option value="">Seçiniz</option>
                  <option value="Görsel">Görsel</option>
                  <option value="İşitsel">İşitsel</option>
                  <option value="Deneyimsel">Deneyimsel</option>
                  <option value="Karma">Karma</option>
                  </select>
                ) : (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
                  <p className="text-gray-900 font-medium text-lg">
                      {profileData.learningType || 'Henüz belirtilmemiş'}
                    </p>
                  </div>
                )}
              </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Flashcard Types
type Flashcard = {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
};

// FlashcardModule Component - Tam özellikli flashcard sistemi
function FlashcardModule({ studentData }: { studentData: StudentData }) {
  // ✅ TÜM HOOK'LAR EN BAŞTA
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(0);
  const [apiUsageStats, setApiUsageStats] = useState(getApiUsageStats());
  
  // Flashcard görüntüleme için hook'lar
  const [generatedCards, setGeneratedCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<number[]>([]);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0 });
  const [showStudyMode, setShowStudyMode] = useState(false);

  // useEffect her zaman çağrılmalı
  useEffect(() => {
    const today = new Date().toDateString();
    const limitData = JSON.parse(localStorage.getItem('flashcard_daily_limit') || '{}');
    
    if (limitData.date === today) {
      setDailyLimit(limitData.count || 0);
    } else {
      setDailyLimit(0);
      localStorage.setItem('flashcard_daily_limit', JSON.stringify({ date: today, count: 0 }));
    }

    // Kaydedilmiş flashcard'ları yükle
    loadSavedFlashcards();
  }, []);

  // Kaydedilmiş flashcard'ları yükle
  const loadSavedFlashcards = () => {
    try {
      const savedCards = localStorage.getItem('user_flashcards');
      if (savedCards) {
        const cards = JSON.parse(savedCards);
        setGeneratedCards(cards);
        if (cards.length > 0) {
          setShowStudyMode(true);
        }
      }
    } catch (error) {
      console.error('Flashcard yükleme hatası:', error);
    }
  };

  // Günlük limit güncelleme
  const updateDailyLimit = () => {
    const today = new Date().toDateString();
    const newCount = dailyLimit + 1;
    setDailyLimit(newCount);
    localStorage.setItem('flashcard_daily_limit', JSON.stringify({ date: today, count: newCount }));
  };

  // AI ile flashcard oluşturma
  const generateFlashcardsWithAI = async (topic: string) => {
    if (dailyLimit >= 10) {
      alert('❌ Günlük konu oluşturma limitiniz dolmuş! (10/10)\n🕐 Yarın tekrar deneyebilirsiniz.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Debug: studentData'yı kontrol et
      console.log('🔍 DEBUG: studentData object:', studentData);
      console.log('🔍 DEBUG: studentData.targetExam:', studentData.targetExam);
      
      // Kullanıcının kayıt sırasında seçtiği alan otomatik kullanılır
      const userField = studentData.targetExam || 'Genel';
      console.log('🔍 DEBUG: userField after || operator:', userField);
      
      // Subject field'ını normalize et
      const normalizeSubject = (field: string) => {
        const fieldLower = field.toLowerCase();
        console.log('🔍 Original field:', field);
        console.log('🔍 Normalized field:', fieldLower);
        
        if (fieldLower.includes('preklinik') || fieldLower.includes('pre klinik') || fieldLower.includes('pre kli̇ni̇k')) {
          console.log('✅ Matched: preklinik');
          return 'preklinik';
        } else if (fieldLower.includes('klinik') && !fieldLower.includes('pre')) {
          console.log('✅ Matched: klinik');
          return 'klinik';
        } else if (fieldLower.includes('tyt ve ayt') || fieldLower.includes('tyt_ayt')) {
          console.log('✅ Matched: tyt_ayt');
          return 'tyt_ayt';
        } else if (fieldLower.includes('tyt')) {
          console.log('✅ Matched: tyt');
          return 'tyt';
        } else if (fieldLower.includes('ayt')) {
          console.log('✅ Matched: ayt');
          return 'ayt';
        } else if (fieldLower.includes('lgs')) {
          console.log('✅ Matched: lgs');
          return 'lgs';
        } else if (fieldLower.includes('tip')) {
          console.log('✅ Matched: tip');
          return 'tip';
        } else if (fieldLower.includes('usmle')) {
          console.log('✅ Matched: usmle');
          return 'usmle';
        } else if (fieldLower.includes('tus')) {
          console.log('✅ Matched: tus');
          return 'tus';
        }
        console.log('❌ No match found, using:', fieldLower);
        return fieldLower;
      };
      
      const normalizedSubject = normalizeSubject(userField);
      
      const flashcardRequest = {
        subject: normalizedSubject,
        topic: topic,
        count: 5 // En az 5 kart
      };

      console.log(`🚀 Original Field: ${userField}`);
      console.log(`🚀 Normalized Subject: ${normalizedSubject}`);
      console.log(`🚀 Final Request:`, flashcardRequest);
      console.log(`🚀 "${topic}" konusu için AI flashcard oluşturuluyor...`);
      
      const newCards = await generateFlashcardsWithOpenAI(flashcardRequest);
      
      // Kartları kaydet ve görüntüle
      const updatedCards = [...generatedCards, ...newCards];
      setGeneratedCards(updatedCards);
      localStorage.setItem('user_flashcards', JSON.stringify(updatedCards));
      
      // Çalışma modunu aç
      setShowStudyMode(true);
      setCurrentCardIndex(generatedCards.length); // Yeni kartlardan başla
      setIsFlipped(false);
      
      updateDailyLimit();
      logApiUsage();
      setApiUsageStats(getApiUsageStats());
      
      alert(`✅ ${userField} alanında "${topic}" konusu için ${newCards.length} flashcard başarıyla oluşturuldu! Artık çalışmaya başlayabilirsiniz.`);
      
    } catch (error) {
      console.error('❌ OpenAI Flashcard Generation Error:', error);
      alert('❌ Flashcard oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddTopic = async () => {
    if (newTopicInput.trim()) {
      await generateFlashcardsWithAI(newTopicInput.trim());
      setNewTopicInput('');
      setShowAddTopic(false);
    }
  };

  // Flashcard etkileşim fonksiyonları
  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    const currentCard = generatedCards[currentCardIndex];
    if (currentCard && !knownCards.includes(currentCard.id)) {
      setKnownCards([...knownCards, currentCard.id]);
      setSessionStats(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
    nextCard();
  };

  const handleUnknown = () => {
    const currentCard = generatedCards[currentCardIndex];
    if (currentCard && !studiedCards.includes(currentCard.id)) {
      setStudiedCards([...studiedCards, currentCard.id]);
      setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentCardIndex < generatedCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Son karta ulaşıldı
      setCurrentCardIndex(0);
      alert(`🎉 Tüm kartları tamamladınız!\n✅ Bildiğiniz: ${sessionStats.correct + (knownCards.includes(generatedCards[currentCardIndex]?.id) ? 1 : 0)}\n❌ Tekrar edilecek: ${sessionStats.incorrect + (!knownCards.includes(generatedCards[currentCardIndex]?.id) ? 1 : 0)}`);
    }
  };

  const resetSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setStudiedCards([]);
    setKnownCards([]);
    setSessionStats({ correct: 0, incorrect: 0 });
  };

  const clearAllCards = () => {
    if (confirm('Tüm flashcard\'ları silmek istediğinizden emin misiniz?')) {
      setGeneratedCards([]);
      localStorage.removeItem('user_flashcards');
      setShowStudyMode(false);
      resetSession();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Flashcard Studio</h1>
            {studentData.targetExam ? (
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-xl font-semibold">
                  🎯 {studentData.targetExam} Alanı
                </div>
                <p className="text-gray-600">
                  {studentData.targetExam} sınavınız için özelleştirilmiş AI flashcard'lar
                </p>
              </div>
            ) : (
              <p className="text-gray-600 mb-8">AI destekli flashcard oluşturun</p>
            )}

            {/* API Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{apiUsageStats.todayUsage}</div>
                <div className="text-sm text-purple-700">Bugün AI Kullanım</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{dailyLimit}/10</div>
                <div className="text-sm text-blue-700">Günlük Limit</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-600">{apiUsageStats.totalUsage}</div>
                <div className="text-sm text-green-700">Toplam Kullanım</div>
              </div>
            </div>

            {/* Add Topic Controls */}
            {!showAddTopic ? (
              <motion.button
                onClick={() => setShowAddTopic(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium mx-auto"
                disabled={dailyLimit >= 10}
              >
                <span className="text-lg">🚀</span>
                {dailyLimit >= 10 ? 'Günlük Limit Doldu' : 'Yeni Konu Oluştur'}
              </motion.button>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <input
                  type="text"
                  value={newTopicInput}
                  onChange={(e) => setNewTopicInput(e.target.value)}
                  placeholder={
                    studentData.targetExam 
                      ? `${studentData.targetExam} konusu girin (örn: Kalp Fizyolojisi, Türkçe Yazım Kuralları...)` 
                      : "Konu başlığı girin..."
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
                  disabled={isGenerating}
                  maxLength={50}
                />
                <motion.button
                  onClick={handleAddTopic}
                  disabled={isGenerating || !newTopicInput.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      AI Çalışıyor...
                    </>
                  ) : (
                    <>
                      <span className="text-lg">✨</span>
                      Oluştur
                    </>
                  )}
                </motion.button>
                <button
                  onClick={() => {
                    setShowAddTopic(false);
                    setNewTopicInput('');
                  }}
                  className="p-3 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  disabled={isGenerating}
                >
                  ✕
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="mt-8 bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-6 h-6 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-emerald-700 font-medium">AI flashcard oluşturuyor...</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-emerald-600">ChatGPT API'ye bağlanılıyor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-300"></div>
                    <span className="text-sm text-emerald-600">Konu analiz ediliyor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-700"></div>
                    <span className="text-sm text-emerald-600">Flashcard'lar oluşturuluyor</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Flashcard Çalışma Modu veya Boş Durum */}
        {showStudyMode && generatedCards.length > 0 ? (
          <div className="space-y-6">
            {/* Çalışma İstatistikleri */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentCardIndex + 1}/{generatedCards.length}</div>
                  <div className="text-sm text-gray-600">Kart İlerlemesi</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{sessionStats.correct}</div>
                  <div className="text-sm text-gray-600">Biliyorum</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{sessionStats.incorrect}</div>
                  <div className="text-sm text-gray-600">Tekrar Edilecek</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{generatedCards.length}</div>
                  <div className="text-sm text-gray-600">Toplam Kart</div>
                </div>
              </div>
            </div>

            {/* Flashcard Gösterimi */}
            <div className="flex justify-center">
              <div className="w-full max-w-2xl h-96 relative" style={{ perspective: '1000px' }}>
                <motion.div
                  key={generatedCards[currentCardIndex]?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative cursor-pointer"
                  onClick={handleCardFlip}
                >
                  <motion.div
                    className="w-full h-full relative"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Ön Yüz (Soru) */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col" style={{ backfaceVisibility: 'hidden' }}>
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                          {generatedCards[currentCardIndex]?.category || 'Konu'}
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                          {generatedCards[currentCardIndex]?.difficulty === 'easy' ? 'Kolay' : 
                           generatedCards[currentCardIndex]?.difficulty === 'medium' ? 'Orta' : 'Zor'}
                        </span>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-4">🤔</div>
                          <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                            {generatedCards[currentCardIndex]?.question}
                          </h2>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Cevabı görmek için kartı çevirin</span>
                      </div>
                    </div>

                    {/* Arka Yüz (Cevap) */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-lg border border-green-200 p-8 flex flex-col"
                      style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-medium">
                          {generatedCards[currentCardIndex]?.category || 'Konu'}
                        </span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                          {generatedCards[currentCardIndex]?.subject}
                        </span>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-4">💡</div>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {generatedCards[currentCardIndex]?.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex gap-4 justify-center max-w-md mx-auto">
              <motion.button
                onClick={handleUnknown}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Bilmiyorum
              </motion.button>
              
              <motion.button
                onClick={handleKnown}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Biliyorum
              </motion.button>
            </div>

            {/* Kontrol Butonları */}
            <div className="flex justify-center gap-4">
              <button
                onClick={resetSession}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                🔄 Oturumu Sıfırla
              </button>
              <button
                onClick={clearAllCards}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                🗑️ Tüm Kartları Sil
              </button>
              <button
                onClick={() => setShowStudyMode(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ➕ Yeni Kart Ekle
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-lg mb-2">
                {generatedCards.length > 0 ? 'Kartlarınız hazır!' : 'Henüz flashcard bulunmuyor'}
              </p>
              <p className="text-sm">
                {generatedCards.length > 0 ? 'Çalışmaya başlamak için butonları kullanın' : 'Yeni bir konu oluşturun ve çalışmaya başlayın'}
              </p>
              {generatedCards.length > 0 && (
                <button
                  onClick={() => setShowStudyMode(true)}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  📖 Çalışmaya Başla ({generatedCards.length} kart)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




