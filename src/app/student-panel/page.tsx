'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Calendar, MessageCircle, FileText, User, Award,
  Bell, ChevronLeft, ChevronRight, Plus, Download, Clock,
  Star, TrendingUp, Target, CheckCircle, AlertCircle,
  Play, Pause, RotateCcw, Send, Paperclip, Search,
  Filter, Grid, List, Eye, X, Menu, Home, Users,
  GraduationCap, Library, Trophy, Settings, Video,
  Bookmark, Heart, Share2, RefreshCw, BarChart3,
  Zap, Brain, Coffee, Sparkles, Check, Trash2
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
  | 'lessons' 
  | 'calendar' 
  | 'materials' 
  | 'messages' 
  | 'exams' 
  | 'aiflashcards'
  | 'notifications'
  | 'profile';

export default function StudentPanel() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Örnek öğrenci verisi
  const studentData: StudentData = {
    id: 1,
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@email.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    class: '3. Sınıf',
    department: 'Tıp Fakültesi',
    coach: 'Dr. Eylül Büyükkaya',
    enrollmentDate: new Date(2022, 8, 15),
    completedLessons: 28,
    totalLessons: 35,
    averageGrade: 87.5,
    nextMeeting: new Date(2024, 11, 18, 14, 0)
  };

  // Bildirim state'i ekle
  const [notifications, setNotifications] = useState(0);

  // Bildirim sayısını kontrol et (sadece öğrenciye gelen bildirimler)
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

  // Navigation items
  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'text-cyan-400', badge: 0 },
    { id: 'lessons', name: 'Derslerim', icon: BookOpen, color: 'text-emerald-400', badge: 3 },
    { id: 'calendar', name: 'Takvim', icon: Calendar, color: 'text-violet-400', badge: 0 },
    { id: 'materials', name: 'Materyaller', icon: Library, color: 'text-orange-400', badge: 5 },
    { id: 'messages', name: 'Mesajlar', icon: MessageCircle, color: 'text-pink-400', badge: 2 },
    { id: 'exams', name: 'Sınavlarım', icon: Trophy, color: 'text-yellow-400', badge: 1 },
    { id: 'aiflashcards', name: 'AI Flashcard', icon: Brain, color: 'text-indigo-400', badge: 0 },
    { id: 'notifications', name: 'Bildirimler', icon: Bell, color: 'text-red-400', badge: notifications },
    { id: 'profile', name: 'Profil', icon: User, color: 'text-gray-400', badge: 0 }
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
      case 'lessons':
        return <LessonsModule studentData={studentData} />;
      case 'calendar':
        return <CalendarModule />;
      case 'materials':
        return <MaterialsModule />;
      case 'messages':
        return <MessagesModule studentData={studentData} />;
      case 'exams':
        return <ExamsModule />;
      case 'aiflashcards':
        return <AIFlashcardsModule />;
      case 'notifications':
        return <NotificationsModule setNotifications={setNotifications} />;
      case 'profile':
        return <ProfileModule studentData={studentData} />;
      default:
        return <DashboardModule studentData={studentData} setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
             {/* Modern Background Elements */}
       <div 
         className="absolute inset-0"
         style={{
           background: 'radial-gradient(ellipse at top, rgba(168, 85, 247, 0.2), rgba(88, 28, 135, 0.1), transparent)'
         }}
       ></div>
       <div 
         className="absolute inset-0 opacity-30"
         style={{
           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
         }}
       ></div>
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="flex h-screen relative">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -288 }}
          animate={{ x: sidebarOpen ? 0 : -288 }}
          transition={{ duration: 0.3 }}
          className={`${sidebarOpen ? 'fixed lg:relative' : 'fixed'} bg-black/20 backdrop-blur-xl border-r border-white/10 h-screen top-0 z-50 w-72`}
        >
          {/* Sidebar Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-white/[0.02] rounded-r-3xl"></div>
          
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10 relative">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Öğrenci Paneli
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">Eylül Akademi</p>
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
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white shadow-lg'
                    : 'hover:bg-white/5 text-gray-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  activeModule === item.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
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
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Student Info in Sidebar */}
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={studentData.photo}
                      alt={studentData.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400/50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black/20"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">
                      {studentData.name}
                    </p>
                    <p className="text-sm text-gray-300 truncate">
                      {studentData.class}
                    </p>
                    <p className="text-xs text-cyan-400 font-medium">
                      Koç: {studentData.coach}
                    </p>
                  </div>
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
          <header className="bg-black/10 backdrop-blur-xl border-b border-white/10 p-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Sidebar Toggle Button - Visible when sidebar is closed */}
                {!sidebarOpen && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSidebarOpen(true)}
                    className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex-shrink-0 border border-white/20"
                    title="Navigasyon Menüsünü Aç"
                  >
                    <Menu size={20} />
                  </motion.button>
                )}
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {navigationItems.find(item => item.id === activeModule)?.name || 'Dashboard'}
                  </h1>
                </div>
              </div>

              {/* Notification Button */}
              <div className="relative">
                <button className="relative p-3 hover:bg-white/10 rounded-xl transition-colors">
                  <Bell size={20} className="text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="p-6 lg:p-8">
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
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10 p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-white/5 to-transparent rounded-full blur-3xl"></div>
        
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
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock size={16} className="text-cyan-400" />
                <span className="text-white">
                  Sonraki ders: {studentData.nextMeeting?.toLocaleDateString('tr-TR')} - {studentData.nextMeeting?.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star size={16} className="text-yellow-400" />
                <span className="text-white">Ortalama: {studentData.averageGrade}/100</span>
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
            title: 'Tamamlanan Dersler',
            value: `${studentData.completedLessons}/${studentData.totalLessons}`,
            subtitle: `%${progressPercentage.toFixed(1)} tamamlandı`,
            icon: BookOpen,
            gradient: 'from-emerald-400 to-cyan-600',
            bgGradient: 'from-emerald-500/20 to-cyan-500/20',
            progress: progressPercentage
          },
          {
            title: 'Ortalama Not',
            value: `${studentData.averageGrade}/100`,
            subtitle: 'Son 30 gün',
            icon: Star,
            gradient: 'from-yellow-400 to-orange-500',
            bgGradient: 'from-yellow-500/20 to-orange-500/20'
          },
          {
            title: 'Bu Hafta',
            value: '3',
            subtitle: 'Yaklaşan dersler',
            icon: Calendar,
            gradient: 'from-violet-400 to-purple-600',
            bgGradient: 'from-violet-500/20 to-purple-500/20'
          },
          {
            title: 'Başarı Rozetleri',
            value: '12',
            subtitle: 'Toplamda kazanılan',
            icon: Trophy,
            gradient: 'from-pink-400 to-red-500',
            bgGradient: 'from-pink-500/20 to-red-500/20'
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
            <div className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden`}>
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <TrendingUp size={20} className="text-emerald-400" />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-1 relative z-10">
                {stat.value}
              </h3>
              <p className="text-gray-300 font-medium mb-1 relative z-10">{stat.title}</p>
              <p className="text-sm text-gray-400 relative z-10">{stat.subtitle}</p>
              
              {stat.progress && (
                <div className="w-full bg-white/10 rounded-full h-2 mt-4 relative z-10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full`}
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
          className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="text-yellow-400" size={24} />
            </motion.div>
            Hızlı İşlemler
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { 
                icon: MessageCircle, 
                label: 'Koçla İletişim', 
                action: () => setActiveModule('messages'),
                bgColor: 'from-cyan-500/15 to-blue-500/15',
                hoverColor: 'from-cyan-500/25 to-blue-500/25',
                iconColor: 'text-cyan-400',
                description: 'Koçunuzla sohbet edin',
                activeColor: 'cyan'
              },
              { 
                icon: Plus, 
                label: 'Ders Planla', 
                action: () => setActiveModule('calendar'),
                bgColor: 'from-emerald-500/15 to-teal-500/15',
                hoverColor: 'from-emerald-500/25 to-teal-500/25',
                iconColor: 'text-emerald-400',
                description: 'Yeni ders programlayın',
                activeColor: 'emerald'
              },
              { 
                icon: Library, 
                label: 'Materyaller', 
                action: () => setActiveModule('materials'),
                bgColor: 'from-violet-500/15 to-purple-500/15',
                hoverColor: 'from-violet-500/25 to-purple-500/25',
                iconColor: 'text-violet-400',
                description: 'Ders materyallerinize erişin',
                activeColor: 'violet'
              },
              { 
                icon: Trophy, 
                label: 'Sınavlarım', 
                action: () => setActiveModule('exams'),
                bgColor: 'from-orange-500/15 to-red-500/15',
                hoverColor: 'from-orange-500/25 to-red-500/25',
                iconColor: 'text-orange-400',
                description: 'Sınav programınızı görün',
                activeColor: 'orange'
              }
            ].map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`relative p-6 bg-gradient-to-br ${action.bgColor} hover:${action.hoverColor} rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 group overflow-hidden min-h-[120px] flex flex-col justify-center items-center text-center`}
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
                    className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300"
                  >
                    <action.icon 
                      size={24} 
                      className={`${action.iconColor} group-hover:text-white transition-colors duration-300`} 
                    />
                  </motion.div>
                  
                  {/* Text Content - Centered */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {action.label}
                    </h4>
                    <p className="text-xs text-gray-300 group-hover:text-gray-100 transition-colors duration-300 opacity-90 leading-relaxed">
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

        {/* Modern Upcoming Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="text-violet-400" size={24} />
              Yaklaşan Dersler
            </h3>
            <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">
              Tümünü Gör
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 8, scale: 1.01 }}
                className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/5 hover:border-white/10 group"
              >
                <div className={`p-3 rounded-xl ${
                  lesson.type === 'lesson' ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' :
                  lesson.type === 'consultation' ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30' :
                  'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                } group-hover:scale-110 transition-transform duration-300`}>
                  {lesson.type === 'lesson' ? <BookOpen size={20} className="text-cyan-400" /> :
                   lesson.type === 'consultation' ? <MessageCircle size={20} className="text-emerald-400" /> :
                   <Target size={20} className="text-orange-400" />}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{lesson.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {lesson.date.toLocaleDateString('tr-TR')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {lesson.date.toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {lesson.duration}
                    </span>
                  </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 text-sm font-medium"
                >
                  Katıl
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modern Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="text-emerald-400" size={24} />
          Son Aktiviteler
        </h3>
        
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ x: 8, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-white/10"
            >
              <div className="p-2 bg-white/5 rounded-lg">
                <activity.icon size={16} className={activity.color} />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-white">{activity.title}</p>
                <p className="text-sm text-gray-400">
                  {activity.timestamp.toLocaleDateString('tr-TR')} - {activity.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              
              <ChevronRight size={16} className="text-gray-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>
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
  completed: boolean;
  createdAt: Date;
};

function CalendarModule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Form states
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('09:00');
  
  // Türkçe ay ve gün isimleri
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  const daysOfWeek = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

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
      completed: false,
      createdAt: new Date()
    };

    setTasks(prev => [...prev, newTask]);
    
    // Form'u temizle
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskTime('09:00');
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Calendar className="text-cyan-400" size={28} />
              </motion.div>
              Görev Takvimi
            </h2>
            <p className="text-gray-300">
              Kişisel görevlerinizi planlayın ve takip edin
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Bu Ay</div>
            <div className="text-lg font-bold text-white">
              {tasks.filter(t => t.date.getMonth() === selectedDate.getMonth()).length} Görev
            </div>
          </div>
        </div>

        {/* Açıklama */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <Plus size={20} className="text-cyan-400" />
            <div>
              <p className="text-white font-medium">Görev Ekleme</p>
              <p className="text-gray-300 text-sm">Takvimde herhangi bir tarihe tıklayarak yeni görev ekleyebilirsiniz</p>
            </div>
          </div>
        </div>
      </motion.div>

             {/* Calendar */}
       <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="bg-black/20 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
       >
         {/* Month Navigation */}
         <div className="flex items-center justify-between mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-400" />
          </motion.button>
          
          <h3 className="text-xl font-semibold text-white">
            {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h3>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ChevronRight size={20} className="text-gray-400" />
          </motion.button>
        </div>

                 {/* Calendar Grid */}
         <div className="space-y-2">
                      {/* Days Header */}
           <div className="grid grid-cols-7 gap-0">
             {daysOfWeek.map((day) => (
               <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
                 {day}
               </div>
             ))}
           </div>

           {/* Calendar Days */}
           <div className="grid grid-cols-7 gap-0">
             {generateCalendarDays().map((day, index) => {
               const dayTasks = getTasksForDay(day.date);
               const dayStyle = getDayTaskStyle(day.date);
               const todayClass = isToday(day.date) ? 'ring-1 ring-cyan-400' : '';
               
               return (
                 <motion.div
                   key={index}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: index * 0.01 }}
                   className={`
                     relative min-h-[92px] p-1 rounded-sm border transition-all duration-200 cursor-pointer
                     ${day.isCurrentMonth 
                       ? 'border-white/20 hover:border-white/40 bg-white/5' 
                       : 'border-white/10 bg-white/2 opacity-50'
                     }
                     ${dayStyle || ''}
                     ${todayClass}
                   `}
                  onClick={() => {
                    if (dayTasks.length > 0) {
                      setSelectedTask(dayTasks[0]);
                      setShowTaskDetail(true);
                    } else {
                      // Yeni görev ekleme modalını aç
                      setClickedDate(day.date);
                      setShowAddTask(true);
                    }
                  }}
                >
                   {/* Day Number */}
                   <div className={`
                     text-xs font-medium mb-1
                     ${day.isCurrentMonth ? 'text-white' : 'text-gray-500'}
                     ${isToday(day.date) ? 'text-cyan-400 font-bold' : ''}
                   `}>
                     {day.date.getDate()}
                   </div>

                   {/* Today Indicator */}
                   {isToday(day.date) && (
                     <div className="absolute top-0.5 right-0.5">
                       <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                     </div>
                   )}

                   {/* Tasks */}
                   <div className="space-y-0.5">
                     {dayTasks.slice(0, 2).map((task, idx) => (
                       <motion.div
                         key={task.id}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: idx * 0.1 }}
                         className={`
                           text-[10px] p-0.5 rounded border cursor-pointer transition-all
                           ${task.completed 
                             ? 'bg-emerald-500/20 border-emerald-400/30 opacity-70' 
                             : 'bg-blue-500/20 border-blue-400/30 hover:scale-105'
                           }
                         `}
                         onClick={(e) => {
                           e.stopPropagation();
                           setSelectedTask(task);
                           setShowTaskDetail(true);
                         }}
                       >
                         <div className="flex items-center gap-0.5">
                           {task.completed ? (
                             <CheckCircle size={8} className="text-emerald-400" />
                           ) : (
                             <Clock size={8} className="text-blue-400" />
                           )}
                           <span className={`font-medium truncate text-[10px] ${
                             task.completed ? 'text-emerald-300 line-through' : 'text-white'
                           }`}>
                             {task.title}
                           </span>
                         </div>
                         <div className="text-gray-300 text-[8px]">
                           {task.time}
                         </div>
                       </motion.div>
                     ))}
                                         
                     {dayTasks.length > 2 && (
                       <div className="text-[8px] text-gray-400 text-center">
                         +{dayTasks.length - 2} daha
                       </div>
                     )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Görev Ekleme Modal */}
      <AnimatePresence>
        {showAddTask && clickedDate && (
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
              className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Plus size={28} className="text-cyan-400" />
                  Yeni Görev
                </h2>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                  <p className="text-cyan-300 font-medium">
                    {clickedDate.toLocaleDateString('tr-TR', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Görev Başlığı</label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    placeholder="Görev başlığını girin..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Açıklama (İsteğe bağlı)</label>
                  <textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none h-20"
                    placeholder="Görev açıklamasını girin..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Saat</label>
                  <input
                    type="time"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300"
                  >
                    İptal
                  </button>
                  <button
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    Görev Ekle
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Görev Detay Modal */}
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
              className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-lg w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  {selectedTask.completed ? (
                    <CheckCircle size={28} className="text-emerald-400" />
                  ) : (
                    <Clock size={28} className="text-blue-400" />
                  )}
                  {selectedTask.title}
                </h2>
                <button
                  onClick={() => setShowTaskDetail(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <Calendar size={20} className="text-cyan-400" />
                  <div>
                    <p className="text-white font-medium">
                      {selectedTask.date.toLocaleDateString('tr-TR', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {selectedTask.time}
                    </p>
                  </div>
                </div>

                {selectedTask.description && (
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                      <FileText size={16} className="text-purple-400" />
                      Açıklama
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedTask.description}
                    </p>
                  </div>
                )}

                <div className={`
                  p-4 rounded-xl border
                  ${selectedTask.completed 
                    ? 'bg-emerald-500/20 border-emerald-400/30' 
                    : 'bg-blue-500/20 border-blue-400/30'
                  }
                `}>
                  <div className="flex items-center gap-2">
                    {selectedTask.completed ? (
                      <CheckCircle size={16} className="text-emerald-400" />
                    ) : (
                      <Clock size={16} className="text-blue-400" />
                    )}
                    <span className={`
                      font-medium
                      ${selectedTask.completed ? 'text-emerald-400' : 'text-blue-400'}
                    `}>
                      {selectedTask.completed ? 'Tamamlandı' : 'Beklemede'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => deleteTask(selectedTask.id)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Sil
                  </button>
                  <button
                    onClick={() => toggleTaskComplete(selectedTask.id)}
                    className={`
                      flex-1 font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                      ${selectedTask.completed 
                        ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-300' 
                        : 'bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300'
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
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Materyaller</h2>
      <p className="text-gray-400">Materyaller modülü yakında eklenecek...</p>
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
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
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

function NotificationsModule({ setNotifications }: { setNotifications: (count: number) => void }) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="text-red-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Bildirimler</h2>
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
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-xl border border-red-500/30 transition-colors text-sm"
          >
            Tümünü Temizle
          </motion.button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="mx-auto text-gray-500 mb-4" size={48} />
            <p className="text-gray-400 text-lg">Henüz bildirim yok</p>
            <p className="text-gray-500 text-sm mt-2">Koçunuzdan gelen bildirimler burada görünecek</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                notification.isRead 
                  ? 'bg-white/5 border-white/10' 
                  : 'bg-blue-500/10 border-blue-500/30 shadow-lg'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                                 <div className={`p-2 rounded-lg ${
                   notification.type === 'appointment_request' 
                     ? 'bg-yellow-500/20 text-yellow-400' 
                     : notification.type === 'appointment_confirmed'
                     ? 'bg-emerald-500/20 text-emerald-400'
                     : 'bg-blue-500/20 text-blue-400'
                 }`}>
                   {notification.type === 'appointment_request' ? (
                     <Calendar size={16} />
                   ) : notification.type === 'appointment_confirmed' ? (
                     <CheckCircle size={16} />
                   ) : (
                     <Bell size={16} />
                   )}
                 </div>
                
                <div className="flex-1">
                                     <div className="flex items-center justify-between mb-1">
                     <h4 className="font-semibold text-white text-sm">
                       {notification.type === 'appointment_request' 
                         ? 'Randevu Talebi' 
                         : notification.type === 'appointment_confirmed'
                         ? 'Randevu Onaylandı'
                         : 'Bildirim'}
                     </h4>
                    <span className="text-xs text-gray-400">
                      {formatNotificationTime(notification.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {notification.message}
                  </p>
                  
                  {notification.appointmentDetails && (
                    <div className="mt-2 p-2 bg-white/5 rounded-lg text-xs text-gray-400">
                      <div>📅 {notification.appointmentDetails.date}</div>
                      <div>⏰ {notification.appointmentDetails.time}</div>
                      {notification.appointmentDetails.description && (
                        <div>📝 {notification.appointmentDetails.description}</div>
                      )}
                    </div>
                  )}
                  
                  {!notification.isRead && (
                    <div className="mt-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function ExamsModule() {
  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Sınavlarım</h2>
      <p className="text-gray-400">Sınavlar modülü yakında eklenecek...</p>
    </div>
  );
}

// Akıllı Flashcard Sistemi için Type'lar
type UserProgress = {
  [termId: string]: {
    level: 'beginner' | 'intermediate' | 'advanced' | 'mastered';
    correctCount: number;
    incorrectCount: number;
    lastSeen: string;
    nextReview: string;
    difficulty: number; // 1-5 arası
    spacedRepetitionCount: number;
  }
};



type GameStats = {
  totalLearned: number;
  weeklyGoal: number;
  currentStreak: number;
  longestStreak: number;
  level: number;
  experience: number;
  achievements: string[];
  lastLoginDate: string;
};

function AIFlashcardsModule() {
  // Ana State'ler
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [showFlashcard, setShowFlashcard] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLearnedCards, setShowLearnedCards] = useState(false);
  
  // Akıllı Sistem State'leri
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [gameStats, setGameStats] = useState<GameStats>({
    totalLearned: 0,
    weeklyGoal: 50,
    currentStreak: 0,
    longestStreak: 0,
    level: 1,
    experience: 0,
    achievements: [],
    lastLoginDate: new Date().toDateString()
  });
  
  // Tıp terimleri - 200+ terim içeren kapsamlı veritabanı
  const medicalTerms = [
    // Temel Bilimler
    {
      term: "Anatomiya",
      definition: "Vücudun yapısını ve organların yerlerini inceleyen tıp dalı",
      example: "Kalbin anatomik yapısı",
      category: "Temel Bilimler"
    },
    {
      term: "Fizyoloji", 
      definition: "Vücut organlarının işlevlerini inceleyen bilim dalı",
      example: "Kalp fizyolojisi",
      category: "Temel Bilimler"
    },
    {
      term: "Patoloji",
      definition: "Hastalıkların nedenlerini ve gelişim süreçlerini inceleyen bilim",
      example: "Kanser patolojisi",
      category: "Temel Bilimler"
    },
    {
      term: "Farmakoloji",
      definition: "İlaçların etkilerini ve mekanizmalarını inceleyen bilim",
      example: "Antibiyotik farmakolojisi",
      category: "Temel Bilimler"
    },

    // Klinik Dallar
    {
      term: "Kardiyoloji",
      definition: "Kalp ve damar hastalıklarıyla ilgilenen tıp dalı",
      example: "Miyokard infarktüsü tedavisi",
      category: "Klinik Dallar"
    },
    {
      term: "Nöroloji",
      definition: "Sinir sistemi hastalıklarını inceleyen tıp dalı",
      example: "Alzheimer hastalığı",
      category: "Klinik Dallar"
    },
    {
      term: "Onkoloji",
      definition: "Kanser hastalıklarının tanı ve tedavisiyle ilgilenen dal",
      example: "Akciğer kanseri tedavisi",
      category: "Klinik Dallar"
    },
    {
      term: "Pediatri",
      definition: "Çocuk hastalıklarını inceleyen tıp dalı",
      example: "Bebek gelişim takibi",
      category: "Klinik Dallar"
    },

    // Kan ve Dolaşım Sistemi
    {
      term: "Anemi",
      definition: "Kanda yeterli sağlıklı kırmızı hücre olmaması",
      example: "Demir eksikliği anemisi",
      category: "Kan ve Dolaşım Sistemi"
    },
    {
      term: "Hipertansiyon",
      definition: "Yüksek tansiyon",
      example: "Sistolik basınç 140 mmHg üzerinde",
      category: "Kan ve Dolaşım Sistemi"
    },
    {
      term: "Aritmi",
      definition: "Kalp ritim bozukluğu",
      example: "Atriyal fibrilasyon",
      category: "Kan ve Dolaşım Sistemi"
    },
    {
      term: "DVT",
      definition: "Derin ven trombozu",
      example: "Bacak damarlarında pıhtı oluşumu",
      category: "Kan ve Dolaşım Sistemi"
    },
    {
      term: "İnme",
      definition: "Beyin kan akışının kesilmesi",
      example: "İskemik inme tedavisi",
      category: "Kan ve Dolaşım Sistemi"
    },
    {
      term: "Varis",
      definition: "Toplardamar genişlemesi",
      example: "Bacak varis cerrahisi",
      category: "Kan ve Dolaşım Sistemi"
    },
    {
      term: "Aneurizma",
      definition: "Damar genişlemesi",
      example: "Aort anevrizması",
      category: "Kan ve Dolaşım Sistemi"
    },
    {
      term: "Tromboz",
      definition: "Damar içinde pıhtı oluşması",
      example: "Pulmoner emboli riski",
      category: "Kan ve Dolaşım Sistemi"
    },

    // Endokrin Sistem
    {
      term: "Diabet",
      definition: "Kan şekeri seviyesinin yüksek olması",
      example: "Tip 2 diabetes mellitus",
      category: "Endokrin Sistem"
    },
    {
      term: "Hipoglisemi",
      definition: "Düşük kan şekeri",
      example: "İnsülin dozajı fazlalığı",
      category: "Endokrin Sistem"
    },
    {
      term: "Hipotiroidi",
      definition: "Tiroid bezinin az çalışması",
      example: "Hashimoto tiroiditi",
      category: "Endokrin Sistem"
    },
    {
      term: "Graves Hastalığı",
      definition: "Tiroid hormon fazlalığı",
      example: "Hipertiroidinin yaygın nedeni",
      category: "Endokrin Sistem"
    },
    {
      term: "Guatr",
      definition: "Tiroid bezinin büyümesi",
      example: "İyot eksikliği guatrı",
      category: "Endokrin Sistem"
    },
    {
      term: "Addison Hastalığı",
      definition: "Adrenal bez yetmezliği",
      example: "Kortizol eksikliği sendromu",
      category: "Endokrin Sistem"
    },
    {
      term: "Cushing Sendromu",
      definition: "Kortizol fazlalığı",
      example: "Adrenal korteks hiperfonksiyonu",
      category: "Endokrin Sistem"
    },
    {
      term: "Akromegali",
      definition: "Büyüme hormonu fazlalığı",
      example: "Hipofiz adenomu sonucu",
      category: "Endokrin Sistem"
    },

    // Kas-İskelet Sistemi
    {
      term: "Osteoporoz",
      definition: "Kemik yoğunluğunun azalması",
      example: "Menopoz sonrası kadınlarda",
      category: "Kas-İskelet Sistemi"
    },
    {
      term: "Fibromiyalji",
      definition: "Kaslarda yaygın ağrı ve hassasiyet",
      example: "Kronik kas ağrısı sendromu",
      category: "Kas-İskelet Sistemi"
    },
    {
      term: "Skolyoz",
      definition: "Omurganın yana eğilmesi",
      example: "S şeklinde omurga deformitesi",
      category: "Kas-İskelet Sistemi"
    },
    {
      term: "Osteoartrit",
      definition: "Eklemlerde aşınma",
      example: "Diz osteoartriti",
      category: "Kas-İskelet Sistemi"
    },
    {
      term: "Romatoid Artrit",
      definition: "İltihaplı eklem hastalığı",
      example: "Otoimmün eklem iltihabı",
      category: "Kas-İskelet Sistemi"
    },
    {
      term: "Osteomiyelit",
      definition: "Kemik iltihabı",
      example: "Staphylococcus enfeksiyonu",
      category: "Kas-İskelet Sistemi"
    },
    {
      term: "Kifoz",
      definition: "Omurgada öne eğilme",
      example: "Kambur duruş deformitesi",
      category: "Kas-İskelet Sistemi"
    },
    {
      term: "Tendinit",
      definition: "Tendon iltihabı",
      example: "Aşil tendonu iltihabı",
      category: "Kas-İskelet Sistemi"
    },

    // Solunum Sistemi
    {
      term: "Astım",
      definition: "Solunum yollarının daralması",
      example: "Bronkospazm atakları",
      category: "Solunum Sistemi"
    },
    {
      term: "Bronşit",
      definition: "Bronş iltihabı",
      example: "Kronik obstrüktif bronşit",
      category: "Solunum Sistemi"
    },
    {
      term: "Pnömoni",
      definition: "Zatürre, akciğer enfeksiyonu",
      example: "Streptokokal pnömoni",
      category: "Solunum Sistemi"
    },
    {
      term: "Tüberküloz",
      definition: "Verem hastalığı",
      example: "Mycobacterium tuberculosis",
      category: "Solunum Sistemi"
    },
    {
      term: "Atelektazi",
      definition: "Akciğerin bir kısmının sönmesi",
      example: "Postoperatif atelektazi",
      category: "Solunum Sistemi"
    },
    {
      term: "Plörezi",
      definition: "Akciğer zarı iltihabı",
      example: "Plevral effüzyon",
      category: "Solunum Sistemi"
    },
    {
      term: "Zatürre",
      definition: "Akciğer enfeksiyonu",
      example: "Toplum kökenli pnömoni",
      category: "Solunum Sistemi"
    },
    {
      term: "Trakeit",
      definition: "Soluk borusu iltihabı",
      example: "Viral trakeobronşit",
      category: "Solunum Sistemi"
    },

    // Sindirim Sistemi
    {
      term: "Gastrit",
      definition: "Mide iltihabı",
      example: "H. pylori gastriti",
      category: "Sindirim Sistemi"
    },
    {
      term: "Ülser",
      definition: "Mide veya bağırsakta yara",
      example: "Peptik ülser hastalığı",
      category: "Sindirim Sistemi"
    },
    {
      term: "Hepatit",
      definition: "Karaciğer iltihabı",
      example: "Viral hepatit B",
      category: "Sindirim Sistemi"
    },
    {
      term: "Kolit",
      definition: "Kalın bağırsak iltihabı",
      example: "Ülseratif kolit",
      category: "Sindirim Sistemi"
    },
    {
      term: "Pankreatit",
      definition: "Pankreas iltihabı",
      example: "Akut pankreatit atağı",
      category: "Sindirim Sistemi"
    },
    {
      term: "Kolesistit",
      definition: "Safra kesesi iltihabı",
      example: "Akut kolesistit",
      category: "Sindirim Sistemi"
    },
    {
      term: "İrritabl Bağırsak Sendromu",
      definition: "Hassas bağırsak hastalığı",
      example: "Fonksiyonel bağırsak bozukluğu",
      category: "Sindirim Sistemi"
    },
    {
      term: "Diyare",
      definition: "İshal",
      example: "Sulu dışkı artışı",
      category: "Sindirim Sistemi"
    },

    // Sinir Sistemi
    {
      term: "Migren",
      definition: "Şiddetli baş ağrısı",
      example: "Hemigraniyal baş ağrısı",
      category: "Sinir Sistemi"
    },
    {
      term: "Epilepsi",
      definition: "Sinir hücrelerinin ani boşalması",
      example: "Nöbet bozukluğu",
      category: "Sinir Sistemi"
    },
    {
      term: "Parkinson Hastalığı",
      definition: "Hareketlerde yavaşlama ve titreme",
      example: "Bradykinezi ve tremor",
      category: "Sinir Sistemi"
    },
    {
      term: "Multipl Skleroz",
      definition: "Sinir sistemini etkileyen hastalık",
      example: "Demiyelinizan hastalık",
      category: "Sinir Sistemi"
    },
    {
      term: "Menenjit",
      definition: "Beyin zarı iltihabı",
      example: "Bakteriyel menenjit",
      category: "Sinir Sistemi"
    },
    {
      term: "Vertigo",
      definition: "Baş dönmesi hissi",
      example: "Vestibüler sistem bozukluğu",
      category: "Sinir Sistemi"
    },
    {
      term: "Nevralji",
      definition: "Sinir ağrısı",
      example: "Trigeminal nevralji",
      category: "Sinir Sistemi"
    },
    {
      term: "Tremor",
      definition: "Titreme",
      example: "Essansiyel tremor",
      category: "Sinir Sistemi"
    },

    // Enfeksiyon Hastalıkları
    {
      term: "Enfeksiyon",
      definition: "Mikroorganizmaların vücuda girmesi",
      example: "Bakteriyel enfeksiyon",
      category: "Enfeksiyon Hastalıkları"
    },
    {
      term: "Antibiyotik",
      definition: "Bakterilere karşı ilaç",
      example: "Penisilin tedavisi",
      category: "Enfeksiyon Hastalıkları"
    },
    {
      term: "Sepsis",
      definition: "Vücutta yaygın enfeksiyon yanıtı",
      example: "Septik şok tablosu",
      category: "Enfeksiyon Hastalıkları"
    },
    {
      term: "Bruselloz",
      definition: "Hayvansal kaynaklı enfeksiyon",
      example: "Zoonotik enfeksiyon",
      category: "Enfeksiyon Hastalıkları"
    },
    {
      term: "Toksoplazmozis",
      definition: "Parazitik enfeksiyon",
      example: "Toxoplasma gondii",
      category: "Enfeksiyon Hastalıkları"
    },

    // Kanser ve Tümörler
    {
      term: "Kanser",
      definition: "Kontrolsüz hücre çoğalması",
      example: "Malign neoplazm",
      category: "Kanser ve Tümörler"
    },
    {
      term: "Lösemi",
      definition: "Kan kanseri",
      example: "Akut lenfoblastik lösemi",
      category: "Kanser ve Tümörler"
    },
    {
      term: "Tümör",
      definition: "Anormal hücre yığını",
      example: "Benign beyin tümörü",
      category: "Kanser ve Tümörler"
    },
    {
      term: "Melanom",
      definition: "Cilt kanseri türü",
      example: "Malign melanom",
      category: "Kanser ve Tümörler"
    },
    {
      term: "Lipom",
      definition: "Yağ dokusundan oluşan iyi huylu tümör",
      example: "Subkutan lipom",
      category: "Kanser ve Tümörler"
    },

    // Ruh Sağlığı
    {
      term: "Psikoz",
      definition: "Gerçeklikten kopma durumu",
      example: "Akut psikotik bozukluk",
      category: "Ruh Sağlığı"
    },
    {
      term: "Nevroz",
      definition: "Kaygı bozukluğu",
      example: "Nevrotik bozukluk",
      category: "Ruh Sağlığı"
    },
    {
      term: "Depresyon",
      definition: "Sürekli mutsuzluk hali",
      example: "Major depresif bozukluk",
      category: "Ruh Sağlığı"
    },
    {
      term: "Kaygı",
      definition: "Aşırı endişe",
      example: "Generalize kaygı bozukluğu",
      category: "Ruh Sağlığı"
    },
    {
      term: "Şizofreni",
      definition: "Gerçeklikten kopma ve sanrılar",
      example: "Paranoid şizofreni",
      category: "Ruh Sağlığı"
    },
    {
      term: "Otizm",
      definition: "Gelişimsel iletişim bozukluğu",
      example: "Otizm spektrum bozukluğu",
      category: "Ruh Sağlığı"
    },

    // Göz Hastalıkları
    {
      term: "Katarakt",
      definition: "Göz merceğinin bulanması",
      example: "Senil katarakt",
      category: "Göz Hastalıkları"
    },
    {
      term: "Glakom",
      definition: "Göz içi basıncının artması",
      example: "Primer açık açılı glakom",
      category: "Göz Hastalıkları"
    },
    {
      term: "Retinopati",
      definition: "Göz retinası hastalığı",
      example: "Diyabetik retinopati",
      category: "Göz Hastalıkları"
    },
    {
      term: "Konjonktivit",
      definition: "Gözün dış zarının iltihabı",
      example: "Viral konjonktivit",
      category: "Göz Hastalıkları"
    },

    // Cilt Hastalıkları
    {
      term: "Dermatit",
      definition: "Cilt iltihabı",
      example: "Atopik dermatit",
      category: "Cilt Hastalıkları"
    },
    {
      term: "Sedef Hastalığı",
      definition: "Kronik cilt hastalığı",
      example: "Psoriazis vulgaris",
      category: "Cilt Hastalıkları"
    },
    {
      term: "Vitiligo",
      definition: "Ciltte renk kaybı",
      example: "Depigmentasyon hastalığı",
      category: "Cilt Hastalıkları"
    },
    {
      term: "Alopesi",
      definition: "Saç dökülmesi",
      example: "Androgenetik alopesi",
      category: "Cilt Hastalıkları"
    },

    // Genel Tıp
    {
      term: "Alerji",
      definition: "Bağışıklık sisteminin aşırı tepkisi",
      example: "Polen alerjisi",
      category: "Genel Tıp"
    },
    {
      term: "Anestezi",
      definition: "Hissizlik durumu",
      example: "Genel anestezi",
      category: "Genel Tıp"
    },
    {
      term: "Obezite",
      definition: "Aşırı kilolu olma",
      example: "Morbid obezite",
      category: "Genel Tıp"
    },
    {
      term: "Tetani",
      definition: "Kaslarda istemsiz kasılma",
      example: "Tetanoz enfeksiyonu",
      category: "Genel Tıp"
    },
    {
      term: "Travma",
      definition: "Fiziksel ya da psikolojik darbe",
      example: "Kafa travması",
      category: "Genel Tıp"
    },
    {
      term: "Hemofili",
      definition: "Kanın pıhtılaşamaması",
      example: "Hemofili A eksikliği",
      category: "Genel Tıp"
    },

    // Kulak Burun Boğaz
    {
      term: "Otitis Media",
      definition: "Orta kulak iltihabı",
      example: "Çocuklarda yaygın kulak enfeksiyonu",
      category: "Kulak Burun Boğaz"
    },
    {
      term: "Laringit",
      definition: "Gırtlak iltihabı",
      example: "Ses kısıklığı nedeni",
      category: "Kulak Burun Boğaz"
    },
    {
      term: "Faringit",
      definition: "Boğaz iltihabı",
      example: "Streptokokal boğaz enfeksiyonu",
      category: "Kulak Burun Boğaz"
    },
    {
      term: "Tinnitus",
      definition: "Kulakta çınlama",
      example: "Sürekli kulak çınlaması",
      category: "Kulak Burun Boğaz"
    },
    {
      term: "Parotit",
      definition: "Tükrük bezi iltihabı",
      example: "Kabakulak hastalığı",
      category: "Kulak Burun Boğaz"
    },
    {
      term: "Alerjik Rinit",
      definition: "Burun alerjisi",
      example: "Mevsimsel polen alerjisi",
      category: "Kulak Burun Boğaz"
    },
    {
      term: "Rinore",
      definition: "Burun akıntısı",
      example: "Viral üst solunum yolu enfeksiyonu",
      category: "Kulak Burun Boğaz"
    },

    // Üroloji
    {
      term: "Prostatit",
      definition: "Prostat iltihabı",
      example: "Bakteriyel prostat enfeksiyonu",
      category: "Üroloji"
    },
    {
      term: "Üretrit",
      definition: "İdrar kanalı iltihabı",
      example: "Gonokokal üretrit",
      category: "Üroloji"
    },
    {
      term: "İdrar Kaçırma",
      definition: "İdrarı kontrol edememe",
      example: "Stress inkontinansı",
      category: "Üroloji"
    },
    {
      term: "İnkontinans",
      definition: "İdrar tutamama",
      example: "Nörojenik mesane",
      category: "Üroloji"
    },
    {
      term: "Nefrolitiyazis",
      definition: "Böbrek taşı hastalığı",
      example: "Kalsiyum oksalat taşları",
      category: "Üroloji"
    },
    {
      term: "Nefrit",
      definition: "Böbrek iltihabı",
      example: "Glomerülonefrit",
      category: "Üroloji"
    },
    {
      term: "Piyelonefrit",
      definition: "Böbrek enfeksiyonu",
      example: "Akut piyelonefrit",
      category: "Üroloji"
    },
    {
      term: "Varikosel",
      definition: "Testis damarlarının genişlemesi",
      example: "Skrotal venöz genişleme",
      category: "Üroloji"
    },
    {
      term: "Fimosis",
      definition: "Sünnet derisinin dar olması",
      example: "Preputyal darlık",
      category: "Üroloji"
    },

    // Kadın Hastalıkları
    {
      term: "Endometriozis",
      definition: "Rahim içi dokunun dışarıda büyümesi",
      example: "Pelvik endometriozis",
      category: "Kadın Hastalıkları"
    },
    {
      term: "Polikistik Over",
      definition: "Yumurtalıklarda kist oluşumu",
      example: "PCOS sendromu",
      category: "Kadın Hastalıkları"
    },
    {
      term: "Eklampsi",
      definition: "Hamilelikte şiddetli nöbetlerle seyreden durum",
      example: "Preeklampsi komplikasyonu",
      category: "Kadın Hastalıkları"
    },
    {
      term: "Jinekomasti",
      definition: "Erkeklerde meme büyümesi",
      example: "Hormonal dengesizlik",
      category: "Kadın Hastalıkları"
    },

    // Spesifik Hastalıklar
    {
      term: "Anosmi",
      definition: "Koku alma duyusunun kaybı",
      example: "COVID-19 sonrası anosmi",
      category: "Spesifik Hastalıklar"
    },
    {
      term: "Cachexia",
      definition: "Aşırı zayıflık ve kas kaybı",
      example: "Kanser kaşeksisi",
      category: "Spesifik Hastalıklar"
    },
    {
      term: "Buerger Hastalığı",
      definition: "Damar iltihabı ve tıkanıklığı",
      example: "Tromboangiitis obliterans",
      category: "Spesifik Hastalıklar"
    },
    {
      term: "Fenilketonüri",
      definition: "Protein metabolizması bozukluğu",
      example: "PKU genetik hastalığı",
      category: "Spesifik Hastalıklar"
    },
    {
      term: "Raynaud Fenomeni",
      definition: "Soğuğa bağlı parmak beyazlaması",
      example: "Vazospastik fenomen",
      category: "Spesifik Hastalıklar"
    },
    {
      term: "Sarkoidoz",
      definition: "Organlarda granülom oluşumu",
      example: "Akciğer sarkoidozu",
      category: "Spesifik Hastalıklar"
    },
    {
      term: "Barotrauma",
      definition: "Basınç değişikliğiyle oluşan doku zedelenmesi",
      example: "Dalış barotravması",
      category: "Spesifik Hastalıklar"
    },
    {
      term: "Hidrosefali",
      definition: "Beyinde sıvı birikmesi",
      example: "Kongenital hidrosefali",
      category: "Spesifik Hastalıklar"
    },

    // Ek Sistem Hastalıkları
    {
      term: "Eozinofili",
      definition: "Kanda eozinofil hücrelerinin artışı",
      example: "Paraziter enfeksiyon göstergesi",
      category: "Kan Hastalıkları"
    },
    {
      term: "İmmün Yetmezlik",
      definition: "Bağışıklık sisteminin zayıf olması",
      example: "Primer immün yetmezlik",
      category: "İmmün Sistem"
    },
    {
      term: "Hematom",
      definition: "Kan birikmesi",
      example: "Subdural hematom",
      category: "Genel Tıp"
    },
    {
      term: "Hemoroid",
      definition: "Basur",
      example: "Eksternal hemoroid",
      category: "Genel Tıp"
    },
    {
      term: "İkter",
      definition: "Sarılık",
      example: "Bilirubin yüksekliği",
      category: "Genel Tıp"
    },
    {
      term: "Hiperhidroz",
      definition: "Aşırı terleme",
      example: "Primer hiperhidroz",
      category: "Genel Tıp"
    },
    {
      term: "Siyanoz",
      definition: "Morarma",
      example: "Santral siyanoz",
      category: "Genel Tıp"
    },
    {
      term: "Gangren",
      definition: "Doku ölümü",
      example: "Diyabetik gangren",
      category: "Genel Tıp"
    },

    // Ek Tıbbi Durumlar
    {
      term: "Amnezi",
      definition: "Hafıza kaybı",
      example: "Travmatik amnezi",
      category: "Sinir Sistemi"
    },
    {
      term: "Agnozi",
      definition: "Tanıma yetisinin kaybı",
      example: "Görsel agnozi",
      category: "Sinir Sistemi"
    },
    {
      term: "Ataksi",
      definition: "Koordinasyon bozukluğu",
      example: "Serebellar ataksi",
      category: "Sinir Sistemi"
    },
    {
      term: "Dizartri",
      definition: "Konuşma bozukluğu",
      example: "Motor dizartri",
      category: "Sinir Sistemi"
    },
    {
      term: "Disleksi",
      definition: "Okuma güçlüğü bozukluğu",
      example: "Gelişimsel disleksi",
      category: "Sinir Sistemi"
    },
    {
      term: "Nistagmus",
      definition: "Göz titremesi",
      example: "Horizontal nistagmus",
      category: "Göz Hastalıkları"
    },
    {
      term: "Serebral Palsi",
      definition: "Beyin felcine bağlı hareket bozukluğu",
      example: "Spastik serebral palsi",
      category: "Sinir Sistemi"
    },
    {
      term: "Spina Bifida",
      definition: "Doğumsal omurga açıklığı",
      example: "Meningomyelosel",
      category: "Doğumsal Hastalıklar"
    },

    // Son Eklenen Terimler
    {
      term: "Celülit",
      definition: "Cilt altı dokunun enfeksiyonu",
      example: "Bakteriyel selülit",
      category: "Cilt Hastalıkları"
    },
    {
      term: "İmpetigo",
      definition: "Yüzeysel cilt enfeksiyonu",
      example: "Streptokok impetigo",
      category: "Cilt Hastalıkları"
    },
    {
      term: "Nevüs",
      definition: "Ben, doğum lekesi",
      example: "Pigmente nevüs",
      category: "Cilt Hastalıkları"
    },
    {
      term: "Eritema",
      definition: "Ciltte kızarıklık",
      example: "Eritema migrans",
      category: "Cilt Hastalıkları"
    },
    {
      term: "Ürtiker",
      definition: "Kurdeşen",
      example: "Akut ürtiker",
      category: "Cilt Hastalıkları"
    },
    {
      term: "Xerostomi",
      definition: "Ağız kuruluğu",
      example: "İlaç yan etkisi",
      category: "Genel Tıp"
    },
    {
      term: "Stomatit",
      definition: "Ağız içi iltihap",
      example: "Aftöz stomatit",
      category: "Genel Tıp"
    },
    {
      term: "Zoonoz",
      definition: "Hayvandan insana geçen hastalık",
      example: "Brucella enfeksiyonu",
      category: "Enfeksiyon Hastalıkları"
    },

    // Tıbbi Araç ve Gereçler
    {
      term: "Stetoskop",
      definition: "Kalp ve akciğer seslerini dinlemek için kullanılır",
      example: "Auskültasyon için temel araç",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Tansiyon Aleti",
      definition: "Kan basıncını ölçmek için kullanılır",
      example: "Sfigmomanometre",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Termometre",
      definition: "Vücut ısısını ölçmek için kullanılır",
      example: "Dijital termometre",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Otoskop",
      definition: "Kulak içini muayene etmek için kullanılır",
      example: "Otitis media tanısında",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Oftalmoskop",
      definition: "Göz dibi muayenesi için kullanılır",
      example: "Retina muayenesi",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "EKG (Elektrokardiyogram)",
      definition: "Kalp ritmini ve elektriksel aktivitesini ölçer",
      example: "Miyokard infarktüsü tanısı",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "EEG (Elektroensefalogram)",
      definition: "Beyin dalgalarını ölçer",
      example: "Epilepsi tanısında kullanılır",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Pulse Oksimetre",
      definition: "Kan oksijen doygunluğunu ölçer",
      example: "SpO2 ölçümü",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Defibrilatör",
      definition: "Kalp durmasında elektriksel şokla müdahale eder",
      example: "Acil resüsitasyon",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Ventilatör",
      definition: "Solunumu destekleyen cihaz",
      example: "Yoğun bakım solunumu",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Nebülizatör",
      definition: "İlaçları buhar haline getirerek akciğerlere iletir",
      example: "Astım tedavisinde",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Laringoskop",
      definition: "Boğaz ve ses tellerini incelemek için kullanılır",
      example: "Entübasyon işleminde",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "CPAP Cihazı",
      definition: "Uyku apnesinde solunumu destekler",
      example: "Obstrüktif sleep apne tedavisi",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "Monitör",
      definition: "Hayati değerleri izleyen cihaz",
      example: "Hasta takip monitörü",
      category: "Tıbbi Araç ve Gereçler"
    },
    {
      term: "İnfüzyon Pompası",
      definition: "Belirli hızda sıvı veren cihaz",
      example: "İntravenöz ilaç infüzyonu",
      category: "Tıbbi Araç ve Gereçler"
    },

    // Tıbbi Malzemeler
    {
      term: "Spekulum",
      definition: "Vajinal muayenede kullanılan alettir",
      example: "Jinekolojik muayene",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Nazogastrik Sonda",
      definition: "Mideye sıvı ulaştırmak için kullanılır",
      example: "Enteral beslenme",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Kateter",
      definition: "Vücuda sıvı vermek veya sıvı çekmek için kullanılan tüp",
      example: "Üriner kateter",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Enjektör",
      definition: "İlaç enjekte etmek veya sıvı çekmek için kullanılır",
      example: "İntramusküler enjeksiyon",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Skalp El",
      definition: "Cerrahi kesilerde kullanılır",
      example: "Cerrahi operasyon",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Yara Bandı",
      definition: "Küçük yaraları kapatmak için kullanılır",
      example: "Kesi sonrası örtü",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Turnike",
      definition: "Kan akışını durdurmak için kullanılır",
      example: "Kanama kontrolü",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Maske",
      definition: "Solunum yollarını korumak için kullanılır",
      example: "Enfeksiyon kontrolü",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Eldiven",
      definition: "Steril çalışma sağlar",
      example: "Cerrahi eldiven",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Kanül",
      definition: "Damar içine yerleştirilen küçük tüp",
      example: "İntravenöz kanül",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Elektrot",
      definition: "Elektriksel sinyalleri algılayan parça",
      example: "EKG elektrotları",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Serum",
      definition: "Damar yoluyla verilen sıvı",
      example: "Serum fizyolojik",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Alçı",
      definition: "Kırıkları sabitlemek için kullanılır",
      example: "Kol kırığı alçısı",
      category: "Tıbbi Malzemeler"
    },
    {
      term: "Atel",
      definition: "Eklem sabitleyici",
      example: "Bilek ateli",
      category: "Tıbbi Malzemeler"
    },

    // Tıbbi İşlemler
    {
      term: "Sterilizasyon",
      definition: "Mikroplardan arındırma işlemi",
      example: "Cerrahi alet sterilizasyonu",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Antiseptik",
      definition: "Mikropları yok eden madde",
      example: "Cilt antisepsisi",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Aspirasyon",
      definition: "Sıvı veya hava çekme işlemi",
      example: "Solunum yolu aspirasyonu",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Biyopsi",
      definition: "Doku örneği alma işlemi",
      example: "Cilt biyopsisi",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Anamnez",
      definition: "Hastanın hikayesinin alınması",
      example: "Tıbbi öykü alma",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Palpasyon",
      definition: "Elle muayene etme",
      example: "Karın palpasyonu",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Perküsyon",
      definition: "Vücuda vurularak iç organların muayenesi",
      example: "Göğüs perküsyonu",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Auskültasyon",
      definition: "Dinleme ile muayene",
      example: "Kalp auskültasyonu",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Rektal Tuşe",
      definition: "Parmakla makattan muayene",
      example: "Prostat muayenesi",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Lavman",
      definition: "Bağırsakları boşaltmak için verilen sıvı",
      example: "Konstipasyon tedavisi",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Trakeostomi",
      definition: "Soluk borusuna delik açılması işlemi",
      example: "Uzun süreli solunum desteği",
      category: "Tıbbi İşlemler"
    },
    {
      term: "İntubasyon",
      definition: "Solunum yoluna tüp yerleştirme işlemi",
      example: "Anestezi entübasyonu",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Torasentez",
      definition: "Göğüs boşluğundan sıvı alma işlemi",
      example: "Plevral efüzyon tedavisi",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Lumbal Ponksiyon",
      definition: "Belden sıvı örneği alma işlemi",
      example: "BOS analizi",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Triaj",
      definition: "Acilde hastaların önceliklendirilmesi",
      example: "Acil servis triajı",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Pansuman",
      definition: "Yaranın temizlenip kapatılması",
      example: "Cerrahi yara bakımı",
      category: "Tıbbi İşlemler"
    },
    {
      term: "Dekontaminasyon",
      definition: "Zararlı maddelerin uzaklaştırılması",
      example: "Kimyasal dekontaminasyon",
      category: "Tıbbi İşlemler"
    },

    // İlaç Uygulama Yolları
    {
      term: "Parenteral",
      definition: "Sindirim sistemi dışı ilaç uygulaması",
      example: "İntravenöz ilaç verme",
      category: "İlaç Uygulama Yolları"
    },
    {
      term: "İntramüsküler",
      definition: "Kas içine ilaç enjeksiyonu",
      example: "Aşı uygulaması",
      category: "İlaç Uygulama Yolları"
    },
    {
      term: "İntravenöz",
      definition: "Damar içine ilaç verilmesi",
      example: "IV antibiyotik",
      category: "İlaç Uygulama Yolları"
    },
    {
      term: "Subkutan",
      definition: "Deri altına enjeksiyon",
      example: "İnsülin enjeksiyonu",
      category: "İlaç Uygulama Yolları"
    },
    {
      term: "Topikal",
      definition: "Cilt üzerine uygulama",
      example: "Topikal anestezi",
      category: "İlaç Uygulama Yolları"
    },

    // Anatomik Terimler
    {
      term: "Distal",
      definition: "Vücut merkezinden uzak olan",
      example: "Distal phalanx",
      category: "Anatomik Terimler"
    },
    {
      term: "Proksimal",
      definition: "Vücut merkezine yakın olan",
      example: "Proksimal femur",
      category: "Anatomik Terimler"
    },
    {
      term: "Anterior",
      definition: "Vücudun ön tarafı",
      example: "Anterior göğüs duvarı",
      category: "Anatomik Terimler"
    },
    {
      term: "Posterior",
      definition: "Vücudun arka tarafı",
      example: "Posterior vertebra",
      category: "Anatomik Terimler"
    },
    {
      term: "Medial",
      definition: "Orta hatta yakın",
      example: "Medial kondil",
      category: "Anatomik Terimler"
    },
    {
      term: "Lateral",
      definition: "Orta hattan uzak",
      example: "Lateral epikondil",
      category: "Anatomik Terimler"
    },
    {
      term: "Superior",
      definition: "Üstte yer alan",
      example: "Superior vena kava",
      category: "Anatomik Terimler"
    },
    {
      term: "Inferior",
      definition: "Altta yer alan",
      example: "Inferior vena kava",
      category: "Anatomik Terimler"
    },
    {
      term: "İnterkostal",
      definition: "Kaburgalar arası",
      example: "İnterkostal kas",
      category: "Anatomik Terimler"
    },

    // Fizyolojik Terimler
    {
      term: "Ekspiryum",
      definition: "Nefes verme",
      example: "Ekspiratuar volüm",
      category: "Fizyolojik Terimler"
    },
    {
      term: "İnspiryum",
      definition: "Nefes alma",
      example: "İnspiratuar kapasite",
      category: "Fizyolojik Terimler"
    },
    {
      term: "Bradikardi",
      definition: "Yavaş kalp atımı",
      example: "60/dk altında kalp hızı",
      category: "Fizyolojik Terimler"
    },
    {
      term: "Taşipne",
      definition: "Hızlı solunum",
      example: "20/dk üzeri solunum",
      category: "Fizyolojik Terimler"
    },
    {
      term: "Bradipne",
      definition: "Yavaş solunum",
      example: "12/dk altı solunum",
      category: "Fizyolojik Terimler"
    },
    {
      term: "Hipertermi",
      definition: "Vücut sıcaklığının artması",
      example: "38°C üzeri ateş",
      category: "Fizyolojik Terimler"
    },
    {
      term: "Hipotermi",
      definition: "Vücut sıcaklığının düşmesi",
      example: "35°C altı vücut ısısı",
      category: "Fizyolojik Terimler"
    },
    {
      term: "Saturasyon",
      definition: "Oksijen doygunluk oranı",
      example: "SpO2 %95-100",
      category: "Fizyolojik Terimler"
    },

    // İdrar Sistem Terimleri
    {
      term: "Oligüri",
      definition: "Az idrar üretimi",
      example: "400 ml/gün altı idrar",
      category: "İdrar Sistem Terimleri"
    },
    {
      term: "Poliüri",
      definition: "Aşırı idrar üretimi",
      example: "3000 ml/gün üzeri",
      category: "İdrar Sistem Terimleri"
    },
    {
      term: "Disüri",
      definition: "Ağrılı idrar yapma",
      example: "İdrar yolu enfeksiyonu",
      category: "İdrar Sistem Terimleri"
    },
    {
      term: "Anüri",
      definition: "İdrar üretiminin durması",
      example: "100 ml/gün altı",
      category: "İdrar Sistem Terimleri"
    },
    {
      term: "Hematüri",
      definition: "İdrarda kan bulunması",
      example: "Gross hematüri",
      category: "İdrar Sistem Terimleri"
    },

    // Sindirim Sistem Terimleri
    {
      term: "Hemoptizi",
      definition: "Ağızdan kan gelmesi",
      example: "Akciğer kaynaklı kanama",
      category: "Sindirim Sistem Terimleri"
    },
    {
      term: "Melena",
      definition: "Siyah dışkı (kanlı)",
      example: "Üst GIS kanaması",
      category: "Sindirim Sistem Terimleri"
    },
    {
      term: "Hematemez",
      definition: "Kanlı kusma",
      example: "Özofagus varis kanaması",
      category: "Sindirim Sistem Terimleri"
    },
    {
      term: "Dekübit",
      definition: "Uzun süre yatmaya bağlı yara",
      example: "Yatak yarası",
      category: "Sindirim Sistem Terimleri"
    },

    // Kan Hücreleri
    {
      term: "Trombosit",
      definition: "Pıhtılaşmayı sağlayan kan hücresi",
      example: "Platelet sayısı",
      category: "Kan Hücreleri"
    },
    {
      term: "Lökosit",
      definition: "Bağışıklık hücresi",
      example: "Beyaz kan hücresi",
      category: "Kan Hücreleri"
    },
    {
      term: "Eritrosit",
      definition: "Oksijen taşıyan kırmızı kan hücresi",
      example: "RBC sayısı",
      category: "Kan Hücreleri"
    },

    // Laboratuvar ve Tanı
    {
      term: "Seroloji",
      definition: "Kandaki antikorların incelenmesi",
      example: "Hepatit serolojisi",
      category: "Laboratuvar ve Tanı"
    },
    {
      term: "Biyokimya",
      definition: "Vücuttaki kimyasal maddelerin analizi",
      example: "Glukoz, üre analizi",
      category: "Laboratuvar ve Tanı"
    },
    {
      term: "Mikrobiyoloji",
      definition: "Mikroorganizmaların incelenmesi",
      example: "Bakteri kültürü",
      category: "Laboratuvar ve Tanı"
    },

    // Tıp Dalları (Güncellenmiş)
    {
      term: "Histoloji",
      definition: "Mikroskobik doku bilimi",
      example: "Hücre ve doku incelemesi",
      category: "Tıp Dalları"
    },
    {
      term: "Embriyoloji",
      definition: "Gelişimsel biyoloji dalı",
      example: "Fetal gelişim çalışması",
      category: "Tıp Dalları"
    },
    {
      term: "Nefroloji",
      definition: "Böbrek hastalıkları bilimi",
      example: "Böbrek yetmezliği tedavisi",
      category: "Tıp Dalları"
    },
    {
      term: "Gastroenteroloji",
      definition: "Sindirim sistemi hastalıkları",
      example: "Mide-bağırsak hastalıkları",
      category: "Tıp Dalları"
    },
    {
      term: "Endokrinoloji",
      definition: "Hormon sistemi hastalıkları",
      example: "Diabet tedavisi",
      category: "Tıp Dalları"
    },
    {
      term: "Pulmonoloji",
      definition: "Akciğer ve solunum sistemi hastalıkları",
      example: "Astım tedavisi",
      category: "Tıp Dalları"
    },
    {
      term: "Hematoloji",
      definition: "Kan hastalıkları bilimi",
      example: "Lösemi tedavisi",
      category: "Tıp Dalları"
    },
    {
      term: "Dermatoloji",
      definition: "Cilt hastalıkları bilimi",
      example: "Egzama tedavisi",
      category: "Tıp Dalları"
    },
    {
      term: "Psikiyatri",
      definition: "Zihinsel hastalıklarla ilgilenir",
      example: "Depresyon tedavisi",
      category: "Tıp Dalları"
    },
    {
      term: "Geriatri",
      definition: "Yaşlı sağlığıyla ilgilenir",
      example: "Yaşlılık hastalıkları",
      category: "Tıp Dalları"
    }
  ];

  const categories = [...new Set(medicalTerms.map(term => term.category))];
  
  const filteredTerms = medicalTerms.filter(term => 
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Bugünkü tarih kontrolü
  const today = new Date().toDateString();

  // LocalStorage'dan veri yükleme
  useEffect(() => {
    // Eski yanlış XP verilerini tamamen temizle (geçici kod)
    localStorage.removeItem('flashcard_stats'); // Yanlış hesaplanmış XP verilerini temizle
    
    const savedProgress = localStorage.getItem('flashcard_progress');
    
    // Her zaman doğru hesaplama yap
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUserProgress(progress);
      
      // Öğrenilen kart sayısını ve XP'yi her zaman doğru hesapla
      const learnedCount = Object.values(progress).filter((p: any) => p.level === 'mastered').length;
      const correctXP = (learnedCount * 100) / medicalTerms.length; // Doğru XP hesaplaması
      const correctLevel = Math.floor(correctXP / 10) + 1; // Her 10 XP'de 1 level (0-9.9=Lv1, 10-19.9=Lv2, etc.)
      
      // Her zaman fresh hesaplama yap, savedStats'i ignore et
      setGameStats({
        totalLearned: learnedCount,
        weeklyGoal: 50,
        currentStreak: 0,
        longestStreak: 0,
        level: correctLevel,
        experience: correctXP,
        achievements: [],
        lastLoginDate: new Date().toDateString()
      });
    }
  }, []);

  // Veri kaydetme
  useEffect(() => {
    localStorage.setItem('flashcard_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('flashcard_stats', JSON.stringify(gameStats));
  }, [gameStats]);

  

  // Spaced Repetition - Tekrar edilmesi gereken kartları belirleme
  const shouldReview = (progress: any) => {
    const lastSeen = new Date(progress.lastSeen);
    const nextReview = new Date(progress.nextReview);
    const now = new Date();
    return now >= nextReview;
  };

  // Spaced Repetition sürelerini hesaplama
  const calculateNextReview = (level: string, spacedRepetitionCount: number) => {
    const intervals = {
      'beginner': [1, 3, 7],      // 1 gün, 3 gün, 1 hafta
      'intermediate': [3, 7, 14], // 3 gün, 1 hafta, 2 hafta  
      'advanced': [7, 14, 30],    // 1 hafta, 2 hafta, 1 ay
      'mastered': [30, 90, 180]   // 1 ay, 3 ay, 6 ay
    };

    const levelIntervals = intervals[level as keyof typeof intervals] || intervals.beginner;
    const intervalIndex = Math.min(spacedRepetitionCount, levelIntervals.length - 1);
    const daysToAdd = levelIntervals[intervalIndex];

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + daysToAdd);
    return nextReview.toISOString();
  };

  // Progress güncelleme
  const updateProgress = (termName: string, isCorrect: boolean) => {
    setUserProgress(prev => {
      const current = prev[termName] || {
        level: 'beginner' as const,
        correctCount: 0,
        incorrectCount: 0,
        lastSeen: new Date().toISOString(),
        nextReview: calculateNextReview('beginner', 0),
        difficulty: 3,
        spacedRepetitionCount: 0
      };

      const updated = {
        ...current,
        correctCount: isCorrect ? current.correctCount + 1 : current.correctCount,
        incorrectCount: isCorrect ? current.incorrectCount : current.incorrectCount + 1,
        lastSeen: new Date().toISOString(),
        spacedRepetitionCount: isCorrect ? current.spacedRepetitionCount + 1 : 0
      };

      // Level up sistemi - Öğrendim butonuna basınca direkt mastered yap
      if (isCorrect) {
        updated.level = 'mastered';
      } else {
        // Bilmiyorum butonuna basınca geri beginner yap
        updated.level = 'beginner';
      }

      // Zorluk seviyesi güncelleme
      if (isCorrect) {
        updated.difficulty = Math.max(1, updated.difficulty - 0.5);
      } else {
        updated.difficulty = Math.min(5, updated.difficulty + 1);
      }

      // Next review hesaplama
      updated.nextReview = calculateNextReview(updated.level, updated.spacedRepetitionCount);

      const newProgress = { ...prev, [termName]: updated };
      
      // XP ve level güncelleme - Her zaman doğru hesaplama yap
      setGameStats(prevStats => {
        // Öğrenilen kart sayısını güncelle
        const newLearned = Object.values(newProgress).filter(p => p.level === 'mastered').length;
        
        // XP'yi her zaman toplam öğrenilen kart sayısına göre hesapla
        const correctXP = (newLearned * 100) / medicalTerms.length;
        const newLevel = Math.floor(correctXP / 10) + 1; // Her 10 XP'de 1 level artış
        
        return {
          ...prevStats,
          experience: correctXP,
          level: newLevel,
          totalLearned: newLearned
        };
      });

      return newProgress;
    });
  };



  // Akıllı kart seçimi - zorluk seviyesine göre
  const getSmartCardSelection = () => {
    const reviewDue = medicalTerms.filter(term => {
      const progress = userProgress[term.term];
      return progress && shouldReview(progress);
    });

    if (reviewDue.length > 0) return reviewDue;

    const difficultCards = medicalTerms.filter(term => {
      const progress = userProgress[term.term];
      return progress && progress.difficulty >= 4;
    });

    if (difficultCards.length > 0) return difficultCards;

    return medicalTerms.filter(term => {
      const progress = userProgress[term.term];
      return !progress || progress.level === 'beginner';
    });
  };

  const handleStartStudy = (termName: string) => {
    const smartCards = getSmartCardSelection();
    const termIndex = smartCards.findIndex(term => term.term === termName) || 0;
    setCurrentCardIndex(termIndex);
    setShowFlashcard(true);
    setFlipped(false);
  };

  const startSmartStudy = () => {
    const smartCards = getSmartCardSelection();
    const randomIndex = Math.floor(Math.random() * smartCards.length);
    setCurrentCardIndex(randomIndex);
    setShowFlashcard(true);
    setFlipped(false);
  };

  const nextCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % medicalTerms.length);
  };

  const prevCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + medicalTerms.length) % medicalTerms.length);
  };

  // Challenge sistemi kaldırıldı - direkt flashcard erişimi

  if (showFlashcard) {
    const currentTerm = medicalTerms[currentCardIndex];
    
    return (
      <div className="p-8 text-white min-h-screen">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowFlashcard(false)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
          >
            <ChevronLeft size={20} />
            <span>Geri Dön</span>
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">AI Flashcard Çalışması</h2>
            <p className="text-gray-300">{currentCardIndex + 1} / {medicalTerms.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">İlerleme:</span>
            <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
                style={{ width: `${((currentCardIndex + 1) / medicalTerms.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[500px]">
          <div className="relative w-full max-w-2xl h-96">
            <motion.div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setFlipped(!flipped)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Ön yüz - Terim */}
                <div 
                  className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col justify-center items-center text-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="mb-4">
                    <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                      {currentTerm.category}
                    </span>
                  </div>
                  <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {currentTerm.term}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    Bu terimi biliyor musunuz?
                  </p>
                  <div className="mt-6">
                    <p className="text-sm text-gray-400 mb-4">Cevabı görmek için kartı çevirin</p>
                    <RotateCcw size={24} className="text-gray-400 animate-pulse" />
                  </div>
                </div>

                {/* Arka yüz - Tanım */}
                <div 
                  className="absolute inset-0 backface-hidden bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8 flex flex-col justify-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <div className="text-center">
                    <h4 className="text-2xl font-bold mb-6 text-emerald-300">
                      {currentTerm.term}
                    </h4>
                    <p className="text-lg text-white mb-6 leading-relaxed">
                      {currentTerm.definition}
                    </p>
                    <div className="bg-white/10 rounded-xl p-4">
                      <p className="text-sm text-gray-300 mb-2">Örnek:</p>
                      <p className="text-emerald-300 font-medium">
                        {currentTerm.example}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Akıllı Öğrenme Butonları - Her zaman görünür */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mt-6"
        >
          <motion.button
            onClick={() => {
              // Bilmiyorum - XP eklenmez, sadece geç
              nextCard();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={20} className="text-red-400" />
            <span className="text-red-300">Bilmiyorum</span>
          </motion.button>

          <motion.button
            onClick={() => {
              // Öğrendim - XP ekle ve öğrenilen listesine ekle
              updateProgress(currentTerm.term, true);
              nextCard();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 border border-emerald-500/30 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Check size={20} className="text-emerald-400" />
            <span className="text-emerald-300">Öğrendim</span>
          </motion.button>
        </motion.div>

        <div className="flex justify-center gap-6 mt-8">
          <motion.button
            onClick={prevCard}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} />
            <span>Önceki</span>
          </motion.button>

          <motion.button
            onClick={() => setFlipped(!flipped)}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-xl transition-all duration-300 font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
            <span>Kartı Çevir</span>
          </motion.button>

          <motion.button
            onClick={nextCard}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Sonraki</span>
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Progress Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
            <p className="text-gray-400 text-sm mb-2">Bu kartın durumu:</p>
            <div className="flex justify-center gap-4">
              {userProgress[currentTerm.term] ? (
                <>
                  <span className="text-emerald-400 text-sm">
                    ✓ {userProgress[currentTerm.term].correctCount} Doğru
                  </span>
                  <span className="text-red-400 text-sm">
                    ✗ {userProgress[currentTerm.term].incorrectCount} Yanlış
                  </span>
                  <span className="text-purple-400 text-sm">
                    📊 {userProgress[currentTerm.term].level}
                  </span>
                </>
              ) : (
                <span className="text-gray-400 text-sm">Henüz çalışılmadı</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white min-h-screen flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          AI Flashcard Üretici
        </h2>
        <p className="text-gray-300 text-lg">
          Tıp terimlerini etkileşimli kartlarla öğrenin ve pratiği yapın.
        </p>
      </div>

      {/* Akıllı İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-cyan-400/20 rounded-lg">
              <Brain size={24} className="text-cyan-400" />
            </div>
            <span className="text-cyan-300 font-semibold">Toplam Terim</span>
          </div>
          <p className="text-3xl font-bold text-white">{medicalTerms.length}</p>
        </div>

        <motion.div 
          className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 cursor-pointer hover:from-emerald-500/30 hover:to-green-600/30 transition-all duration-300"
          onClick={() => setShowLearnedCards(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-400/20 rounded-lg">
              <CheckCircle size={24} className="text-emerald-400" />
            </div>
            <span className="text-emerald-300 font-semibold">Öğrenilen</span>
          </div>
          <p className="text-3xl font-bold text-white">{gameStats.totalLearned}</p>
          <p className="text-xs text-emerald-300 mt-2">Listesini görmek için tıklayın</p>
        </motion.div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-400/20 rounded-lg">
              <Zap size={24} className="text-purple-400" />
            </div>
            <span className="text-purple-300 font-semibold">Seviye</span>
          </div>
          <p className="text-3xl font-bold text-white">{gameStats.level}</p>
          <div className="mt-2">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full"
                style={{ 
                  width: `${(() => {
                    // Şu anki level için progress hesapla
                    const currentLevelMinXP = (gameStats.level - 1) * 10;
                    const nextLevelXP = gameStats.level * 10;
                    const progressInLevel = ((gameStats.experience - currentLevelMinXP) / 10) * 100;
                    return Math.max(0, Math.min(100, progressInLevel));
                  })()}%` 
                }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {gameStats.experience.toFixed(1)}/100 XP | Level {gameStats.level} ({gameStats.totalLearned} kart öğrenildi)
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Sonraki seviye: {(gameStats.level * 10).toFixed(1)} XP
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-400/20 rounded-lg">
              <Target size={24} className="text-orange-400" />
            </div>
            <span className="text-orange-300 font-semibold">Streak</span>
          </div>
          <p className="text-3xl font-bold text-white">{gameStats.currentStreak} gün</p>
          <p className="text-xs text-gray-400 mt-1">En uzun: {gameStats.longestStreak} gün</p>
        </div>
      </div>

      {/* Ana Başlatma Bölümü */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 text-center lg:text-left -mt-25">
        {/* Sol Taraf - Ana Kart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-lg w-full"
        >
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-3">
              <Brain size={32} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {medicalTerms.length} Tıp Terimi Hazır
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Anatomiyeden fizyolojiye, klinik terimlerden tıbbi araçlara kadar 
              kapsamlı tıp sözlüğünüzle interaktif flashcard çalışması yapın.
            </p>
          </div>

          {/* Kategori Özeti */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            {categories.slice(0, 6).map((category, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-2 border border-white/10"
              >
                <p className="text-xs text-gray-300 font-medium truncate">
                  {category}
                </p>
              </div>
            ))}
            {categories.length > 6 && (
              <div className="bg-white/5 rounded-xl p-2 border border-white/10 flex items-center justify-center">
                <p className="text-xs text-gray-400">
                  +{categories.length - 6} daha
                </p>
              </div>
            )}
          </div>

          {/* Akıllı Başlatma Butonu */}
          <motion.button
            onClick={startSmartStudy}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 mb-3"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-3">
              <Brain size={20} />
              <span>Akıllı Flashcard Başlat</span>
              <Sparkles size={20} />
            </div>
          </motion.button>

          <p className="text-gray-400 text-xs">
            Akıllı algoritmayla en uygun kartları seçip öğrenin
          </p>
        </motion.div>

        {/* Sağ Taraf - Özellik Kartları */}
        <div className="flex flex-col gap-4 max-w-sm w-full">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <RotateCcw size={20} className="text-blue-400" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-white text-base">Akıllı Kart Seçimi</h4>
                <p className="text-gray-400 text-xs">
                  Önce tekrar edilmesi gerekenleri gösterir
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Target size={20} className="text-emerald-400" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-white text-base">Spaced Repetition</h4>
                <p className="text-gray-400 text-xs">
                  Bilimsel tekrar algoritmasıyla kalıcı öğrenme
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Brain size={20} className="text-purple-400" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-white text-base">Gamification</h4>
                <p className="text-gray-400 text-xs">
                  XP, seviye ve streak sistemiyle motivasyonu artırın
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Öğrenilen Kartlar Modal */}
      <AnimatePresence>
        {showLearnedCards && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLearnedCards(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <CheckCircle size={28} className="text-emerald-400" />
                    Öğrenilen Kartlar
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Toplam {Object.values(userProgress).filter(p => p.level === 'mastered').length} kart öğrendiniz
                  </p>
                </div>
                <button
                  onClick={() => setShowLearnedCards(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Progress Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 text-center">
                  <p className="text-emerald-300 text-sm font-medium">Öğrenilen</p>
                  <p className="text-white text-2xl font-bold">
                    {Object.values(userProgress).filter(p => p.level === 'mastered').length}
                  </p>
                </div>
                <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-4 text-center">
                  <p className="text-blue-300 text-sm font-medium">Toplam Kart</p>
                  <p className="text-white text-2xl font-bold">{medicalTerms.length}</p>
                </div>
                <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 text-center">
                  <p className="text-purple-300 text-sm font-medium">Tamamlanma</p>
                  <p className="text-white text-2xl font-bold">
                    {Math.round((Object.values(userProgress).filter(p => p.level === 'mastered').length / medicalTerms.length) * 100)}%
                  </p>
                </div>
              </div>

              {/* Learned Cards List */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {medicalTerms.filter(term => {
                    const progress = userProgress[term.term];
                    return progress && progress.level === 'mastered';
                  }).map((term, index) => (
                    <motion.div
                      key={term.term}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                          {term.term}
                        </h4>
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full">
                          {term.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {term.definition}
                      </p>
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-xs text-gray-400 mb-1">Örnek:</p>
                        <p className="text-emerald-300 text-sm">{term.example}</p>
                      </div>
                      
                      {/* Progress Info */}
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-emerald-400">
                            ✓ {userProgress[term.term]?.correctCount || 0} doğru
                          </span>
                          <span className="text-gray-400">
                            Son görülme: {new Date(userProgress[term.term]?.lastSeen || '').toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Empty State */}
                {Object.values(userProgress).filter(p => p.level === 'mastered').length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={48} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-400 mb-2">
                      Henüz Öğrenilen Kart Yok
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Flashcard çalışmasına başlayarak kartları "Öğrendim" olarak işaretleyin
                    </p>
                    <motion.button
                      onClick={() => {
                        setShowLearnedCards(false);
                        startSmartStudy();
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Çalışmaya Başla
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-center pt-6 border-t border-white/10">
                <motion.button
                  onClick={() => setShowLearnedCards(false)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Kapat
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileModule({ studentData }: { studentData: StudentData }) {
  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Profil</h2>
      <p className="text-gray-400">Profil modülü yakında eklenecek...</p>
    </div>
  );
}
