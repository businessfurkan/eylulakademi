'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Calendar, MessageCircle, FileText, User, Award,
  Bell, ChevronLeft, ChevronRight, Plus, Download, Clock,
  Star, TrendingUp, Target, CheckCircle, AlertCircle,
  Play, Pause, RotateCcw, Send, Paperclip, Search,
  Filter, Grid, List, Eye, X, Menu, Home, Users,
  GraduationCap, Library, Trophy, Settings, Video,
  Bookmark, Heart, Share2, RefreshCw, BarChart3,
  Zap, Brain, Coffee, Sparkles, Check
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

  // Navigation items
  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, color: 'text-cyan-400', badge: 0 },
    { id: 'lessons', name: 'Derslerim', icon: BookOpen, color: 'text-emerald-400', badge: 3 },
    { id: 'calendar', name: 'Takvim', icon: Calendar, color: 'text-violet-400', badge: 0 },
    { id: 'materials', name: 'Materyaller', icon: Library, color: 'text-orange-400', badge: 5 },
    { id: 'messages', name: 'Mesajlar', icon: MessageCircle, color: 'text-pink-400', badge: 2 },
    { id: 'exams', name: 'Sınavlarım', icon: Trophy, color: 'text-yellow-400', badge: 1 },
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

function CalendarModule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  
  // Türkçe ay ve gün isimleri
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  const daysOfWeek = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // Koç tarafından atanan görüşmeler
  const meetings = [
    {
      id: 1,
      title: 'Biyokimya Danışmanlığı',
      date: new Date(2024, 11, 20, 14, 0),
      duration: 60,
      type: 'consultation',
      coach: 'Dr. Eylül Büyükkaya',
      status: 'scheduled',
      description: 'Biyokimya dersi ile ilgili konuları gözden geçireceğiz ve sorularınızı yanıtlayacağım.',
      meetingLink: 'https://meet.google.com/abc-def-ghi'
    },
    {
      id: 2,
      title: 'Anatomi Birebir Ders',
      date: new Date(2024, 11, 22, 10, 30),
      duration: 90,
      type: 'lesson',
      coach: 'Dr. Eylül Büyükkaya',
      status: 'scheduled',
      description: 'Kas sistemi ve iskelet sistemi detaylı anlatım.',
      meetingLink: 'https://meet.google.com/xyz-uvw-rst'
    },
    {
      id: 3,
      title: 'TUS Sınav Hazırlık',
      date: new Date(2024, 11, 25, 16, 0),
      duration: 120,
      type: 'exam_prep',
      coach: 'Dr. Eylül Büyükkaya',
      status: 'scheduled',
      description: 'TUS sınavı için pratik soru çözümü ve taktik geliştirme.',
      meetingLink: 'https://meet.google.com/lmn-opq-tuv'
    },
    {
      id: 4,
      title: 'Haftalık Değerlendirme',
      date: new Date(2024, 11, 27, 15, 30),
      duration: 45,
      type: 'review',
      coach: 'Dr. Eylül Büyükkaya',
      status: 'scheduled',
      description: 'Bu haftaki çalışmaları değerlendirip önümüzdeki hafta planı yapacağız.',
      meetingLink: 'https://meet.google.com/def-ghi-jkl'
    },
    {
      id: 5,
      title: 'Fizyoloji Grup Çalışması',
      date: new Date(2024, 11, 18, 13, 0),
      duration: 90,
      type: 'group',
      coach: 'Dr. Eylül Büyükkaya',
      status: 'completed',
      description: 'Diğer öğrencilerle birlikte fizyoloji konularını pekiştirdik.',
      meetingLink: 'https://meet.google.com/mno-pqr-stu'
    }
  ];

  // Etkinlik tiplerinin renkleri
  const eventTypeColors = {
    lesson: 'from-blue-500/20 to-cyan-500/20 border-blue-400/30',
    consultation: 'from-emerald-500/20 to-teal-500/20 border-emerald-400/30',
    exam_prep: 'from-red-500/20 to-pink-500/20 border-red-400/30',
    group: 'from-purple-500/20 to-violet-500/20 border-purple-400/30',
    review: 'from-yellow-500/20 to-amber-500/20 border-yellow-400/30'
  };

  const eventTypeLabels = {
    lesson: 'Birebir Ders',
    consultation: 'Danışmanlık',
    exam_prep: 'Sınav Hazırlık',
    group: 'Grup Çalışması',
    review: 'Değerlendirme'
  };

  const eventTypeIcons = {
    lesson: BookOpen,
    consultation: MessageCircle,
    exam_prep: Target,
    group: Users,
    review: CheckCircle
  };

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

  // Belirli bir güne ait görüşmeleri getir
  const getMeetingsForDay = (date: Date) => {
    return meetings.filter(meeting => 
      meeting.date.toDateString() === date.toDateString()
    );
  };

  // Günün dominant etkinlik türünü ve rengini belirle
  const getDayEventStyle = (date: Date) => {
    const dayMeetings = getMeetingsForDay(date);
    if (dayMeetings.length === 0) return null;

    // Öncelik sırası: exam_prep > lesson > consultation > group > review
    const eventPriority = {
      'exam_prep': 1,
      'lesson': 2, 
      'consultation': 3,
      'group': 4,
      'review': 5
    };

    // En yüksek öncelikli etkinlik türünü bul
    const dominantEvent = dayMeetings.reduce((prev, current) => {
      const prevPriority = eventPriority[prev.type as keyof typeof eventPriority] || 999;
      const currentPriority = eventPriority[current.type as keyof typeof eventPriority] || 999;
      return currentPriority < prevPriority ? current : prev;
    });

    // Etkinlik türüne göre hafif arka plan renkleri
    const dayColors = {
      'lesson': 'bg-blue-500/10 border-blue-400/20 hover:bg-blue-500/20',
      'consultation': 'bg-emerald-500/10 border-emerald-400/20 hover:bg-emerald-500/20',
      'exam_prep': 'bg-red-500/10 border-red-400/20 hover:bg-red-500/20', 
      'group': 'bg-purple-500/10 border-purple-400/20 hover:bg-purple-500/20',
      'review': 'bg-yellow-500/10 border-yellow-400/20 hover:bg-yellow-500/20'
    };

    return dayColors[dominantEvent.type as keyof typeof dayColors] || null;
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
              Görüşme Takvimi
            </h2>
            <p className="text-gray-300">
              Koçunuz <span className="text-cyan-400 font-semibold">Dr. Eylül Büyükkaya</span> tarafından planlanan görüşmeleriniz
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Bu Ay</div>
            <div className="text-lg font-bold text-white">
              {meetings.filter(m => m.date.getMonth() === selectedDate.getMonth()).length} Görüşme
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Birebir Dersler</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-gray-300">Danışmanlık</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Sınav Hazırlık</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-300">Grup Çalışması</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Değerlendirme</span>
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
               const dayMeetings = getMeetingsForDay(day.date);
               const dayStyle = getDayEventStyle(day.date);
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
                    if (dayMeetings.length > 0) {
                      setSelectedEvent(dayMeetings[0]);
                      setShowEventDetail(true);
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

                   {/* Events */}
                   <div className="space-y-0.5">
                     {dayMeetings.slice(0, 2).map((meeting, idx) => {
                      const IconComponent = eventTypeIcons[meeting.type as keyof typeof eventTypeIcons];
                      return (
                                                 <motion.div
                           key={meeting.id}
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: idx * 0.1 }}
                           className={`
                             text-[10px] p-0.5 rounded border cursor-pointer
                             ${eventTypeColors[meeting.type as keyof typeof eventTypeColors]}
                             hover:scale-105 transition-transform
                             ${meeting.status === 'completed' ? 'opacity-60' : ''}
                           `}
                           onClick={(e) => {
                             e.stopPropagation();
                             setSelectedEvent(meeting);
                             setShowEventDetail(true);
                           }}
                         >
                           <div className="flex items-center gap-0.5">
                             <IconComponent size={8} className="text-white" />
                             <span className="text-white font-medium truncate text-[9px]">
                               {meeting.title}
                             </span>
                           </div>
                           <div className="text-gray-300 text-[8px]">
                             {meeting.date.toLocaleTimeString('tr-TR', { 
                               hour: '2-digit', 
                               minute: '2-digit' 
                             })}
                           </div>
                         </motion.div>
                      );
                    })}
                                         
                     {dayMeetings.length > 2 && (
                       <div className="text-[8px] text-gray-400 text-center">
                         +{dayMeetings.length - 2} daha
                       </div>
                     )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {showEventDetail && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEventDetail(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-lg w-full"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    {(() => {
                      const IconComponent = eventTypeIcons[selectedEvent.type as keyof typeof eventTypeIcons];
                      return <IconComponent size={28} className="text-cyan-400" />;
                    })()}
                    {selectedEvent.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {eventTypeLabels[selectedEvent.type as keyof typeof eventTypeLabels]}
                  </p>
                </div>
                <button
                  onClick={() => setShowEventDetail(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                {/* Date & Time */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <Clock size={20} className="text-cyan-400" />
                  <div>
                    <p className="text-white font-medium">
                      {selectedEvent.date.toLocaleDateString('tr-TR', { 
                        weekday: 'long',
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {selectedEvent.date.toLocaleTimeString('tr-TR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })} - {selectedEvent.duration} dakika
                    </p>
                  </div>
                </div>

                {/* Coach Info */}
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                  <User size={20} className="text-emerald-400" />
                  <div>
                    <p className="text-white font-medium">{selectedEvent.coach}</p>
                    <p className="text-gray-400 text-sm">Koçunuz</p>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-purple-400" />
                    Açıklama
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Status */}
                <div className={`
                  p-4 rounded-xl border
                  ${selectedEvent.status === 'completed' 
                    ? 'bg-emerald-500/20 border-emerald-400/30' 
                    : 'bg-blue-500/20 border-blue-400/30'
                  }
                `}>
                  <div className="flex items-center gap-2">
                    {selectedEvent.status === 'completed' ? (
                      <CheckCircle size={16} className="text-emerald-400" />
                    ) : (
                      <Clock size={16} className="text-blue-400" />
                    )}
                    <span className={`
                      font-medium
                      ${selectedEvent.status === 'completed' ? 'text-emerald-400' : 'text-blue-400'}
                    `}>
                      {selectedEvent.status === 'completed' ? 'Tamamlandı' : 'Planlandı'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedEvent.status !== 'completed' && (
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => window.open(selectedEvent.meetingLink, '_blank')}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Video size={16} />
                      Görüşmeye Katıl
                    </motion.button>
                  </div>
                )}
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

function MessagesModule({ studentData }: { studentData: StudentData }) {
  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Mesajlar</h2>
      <p className="text-gray-400">Mesajlar modülü yakında eklenecek...</p>
    </div>
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

function ProfileModule({ studentData }: { studentData: StudentData }) {
  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Profil</h2>
      <p className="text-gray-400">Profil modülü yakında eklenecek...</p>
    </div>
  );
}
