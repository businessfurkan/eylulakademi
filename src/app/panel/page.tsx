'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar,
  Users,
  MessageCircle,
  FileText,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  Clock,
  TrendingUp,
  BookOpen,
  Star,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  Send,
  Filter,
  Search,
  MoreVertical,
  Menu,
  X,
  Save
} from 'lucide-react';

// Type Definitions
type Student = {
  id: number;
  name: string;
  email: string;
};

type ChatMessage = {
  id: number;
  text: string;
  sender: 'coach' | 'student' | 'system';
  timestamp: Date;
  type: 'text' | 'link' | 'system';
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
  | 'meetings' 
  | 'students' 
  | 'materials' 
  | 'reports' 
  | 'notifications';

export default function CoachPanel() {
  const searchParams = useSearchParams();
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [userType, setUserType] = useState<'student' | 'coach'>('coach');
  const [isDemo, setIsDemo] = useState(false);

  // URL parametrelerini oku
  useEffect(() => {
    const type = searchParams.get('type');
    const demo = searchParams.get('demo');
    
    if (type === 'coach' || type === 'student') {
      setUserType(type);
    }
    
    if (demo === 'true') {
      setIsDemo(true);
    }
  }, [searchParams]);

  // Koç bilgileri
  const coachData = {
    name: isDemo ? "Dr. Eylül Büyükkaya (Demo)" : "Dr. Eylül Büyükkaya",
    email: "eylul@example.com",
    avatar: "EB",
    title: "Tıp Eğitimi Uzmanı",
    totalStudents: 156,
    totalEarnings: 24750,
    rating: 4.9,
    completedSessions: 342,
    upcomingMeetings: 8,
    newMessages: 12,
    pendingRequests: 3
  };

  // Navigasyon menüsü
  const navigationItems: NavigationItem[] = [
    { 
      id: 'dashboard', 
      name: 'Ana Panel', 
      icon: BarChart3, 
      color: 'from-blue-500 to-purple-600' 
    },
    { 
      id: 'calendar', 
      name: 'Takvim & Etkinlikler', 
      icon: Calendar, 
      color: 'from-green-500 to-emerald-600',
      badge: coachData.upcomingMeetings 
    },
    { 
      id: 'meetings', 
      name: 'Birebir Görüşmeler', 
      icon: Video, 
      color: 'from-purple-500 to-pink-600',
      badge: coachData.pendingRequests 
    },
    { 
      id: 'students', 
      name: 'Öğrenci Yönetimi', 
      icon: Users, 
      color: 'from-orange-500 to-red-600' 
    },
    { 
      id: 'materials', 
      name: 'Materyaller', 
      icon: FileText, 
      color: 'from-teal-500 to-cyan-600' 
    },
    { 
      id: 'reports', 
      name: 'İlerleme & Raporlar', 
      icon: TrendingUp, 
      color: 'from-indigo-500 to-blue-600' 
    },
    { 
      id: 'notifications', 
      name: 'Bildirimler', 
      icon: Bell, 
      color: 'from-yellow-500 to-orange-600',
      badge: coachData.newMessages 
    }
  ];

  // Öğrenci paneli için yönlendirme kontrolü
  if (userType !== 'coach') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8fdbd6] via-[#a8e6e3] to-[#b8ebe8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Bu panel sadece koçlar içindir</h1>
          <p className="text-gray-600 mb-6">Öğrenci paneline yönlendiriliyorsunuz...</p>
          <button 
            onClick={() => window.location.href = '/student-panel'}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Öğrenci Paneline Git
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl shadow-2xl z-50 ${
          sidebarOpen ? 'w-80' : 'w-20'
        } transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{coachData.avatar}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{coachData.name.split(' ')[0]}</h3>
                  <p className="text-sm text-gray-600">{coachData.title}</p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveModule(item.id as ActiveModule)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${
                activeModule === item.id
                  ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`p-2 rounded-lg ${
                activeModule === item.id ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-white'
              }`}>
                <item.icon size={20} className={activeModule === item.id ? 'text-white' : 'text-gray-600'} />
              </div>
              
              {sidebarOpen && (
                <div className="flex-1 flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      activeModule === item.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 left-4 right-4 space-y-2"
          >
            <button className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              <Settings size={20} />
              <span>Ayarlar</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut size={20} />
              <span>Çıkış Yap</span>
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Sidebar Toggle Button - Visible when sidebar is closed */}
              {!sidebarOpen && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSidebarOpen(true)}
                  className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 flex-shrink-0"
                  title="Navigasyon Menüsünü Aç"
                >
                  <Menu size={20} />
                </motion.button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {navigationItems.find(item => item.id === activeModule)?.name || 'Ana Panel'}
                </h1>
                {isDemo && (
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Star size={16} />
                    <span>Demo Koç Hesabı</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold">{coachData.avatar}</span>
                </div>
                <div className="text-left hidden md:block">
                  <p className="font-medium text-gray-900">{coachData.name.split(' ')[0]}</p>
                  <p className="text-sm text-gray-600">{coachData.title}</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{coachData.avatar}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{coachData.name}</p>
                          <p className="text-sm text-gray-600">{coachData.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <User size={18} />
                        <span>Profil Ayarları</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        <Settings size={18} />
                        <span>Hesap Ayarları</span>
                      </button>
                      <hr className="my-2 border-gray-200" />
                      <button className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={18} />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            {activeModule === 'dashboard' && <DashboardModule coachData={coachData} />}
            {activeModule === 'calendar' && <CalendarModule />}
            {activeModule === 'meetings' && <MeetingsModule />}
            {activeModule === 'students' && <StudentsModule />}
            {activeModule === 'materials' && <MaterialsModule />}
            {activeModule === 'reports' && <ReportsModule />}
            {activeModule === 'notifications' && <NotificationsModule />}
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// Dashboard Module
function DashboardModule({ coachData }: { coachData: any }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('bu-ay');
  
  // Performance metrics
  const performanceData = [
    { label: 'Öğrenci Memnuniyeti', value: 94, color: 'from-green-400 to-emerald-500' }
  ];

  const stats = [
    { 
      title: 'Toplam Öğrenci', 
      value: coachData.totalStudents, 
      icon: Users, 
      color: 'from-blue-500 to-purple-600',
      change: '+12%',
      desc: 'Bu ay 18 yeni öğrenci'
    },
    { 
      title: 'Bu Ay Kazanç', 
      value: `₺${coachData.totalEarnings.toLocaleString()}`, 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-600',
      change: '+8%',
      desc: 'Geçen ay: ₺22,890'
    },
    { 
      title: 'Tamamlanan Seans', 
      value: coachData.completedSessions, 
      icon: CheckCircle, 
      color: 'from-orange-500 to-red-600',
      change: '+5%',
      desc: 'Bu hafta 28 seans'
    },
    { 
      title: 'Memnuniyet Oranı', 
      value: '%94', 
      icon: Star, 
      color: 'from-yellow-500 to-orange-600',
      change: '+2%',
      desc: '128 değerlendirmeden'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Header with Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl"
      >
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-2"
              >
                Hoş geldin, Dr. Eylül! 👋
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/90 text-lg"
              >
                Bugün {new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 mt-4"
              >
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span className="text-sm">Sonraki toplantı: 14:30</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span className="text-sm">{coachData.upcomingMeetings} bekleyen görüşme</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">{coachData.rating}</div>
                <div className="text-sm text-white/80">Ortalama Puan</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(coachData.rating) ? 'fill-yellow-300 text-yellow-300' : 'text-white/50'} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                  <TrendingUp size={12} className="text-green-600" />
                  <span className="text-green-600 text-xs font-semibold">{stat.change}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Performance & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Performans Metrikleri</h3>
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="bu-hafta">Bu Hafta</option>
                <option value="bu-ay">Bu Ay</option>
                <option value="son-3-ay">Son 3 Ay</option>
              </select>
            </div>
            <div className="max-w-md mx-auto">
              {performanceData.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}%</span>
                    <p className="text-lg font-medium text-gray-700 mt-1">{metric.label}</p>
                    <p className="text-sm text-gray-500 mt-1">128 değerlendirmeden</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 1.5 }}
                      className={`h-full bg-gradient-to-r ${metric.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Düşük</span>
                    <span>Orta</span>
                    <span>Yüksek</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group p-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Yeni Görüşme Planla</div>
                    <div className="text-sm text-white/80">Öğrenciyle randevu oluştur</div>
                  </div>
                </div>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Upload size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Materyal Yükle</div>
                    <div className="text-sm text-white/80">Yeni eğitim materyali ekle</div>
                  </div>
                </div>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Toplu Mesaj Gönder</div>
                    <div className="text-sm text-white/80">Tüm öğrencilere bildirim</div>
                  </div>
                </div>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">Rapor Oluştur</div>
                    <div className="text-sm text-white/80">Detaylı analiz raporu</div>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Activities & Schedule */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-blue-500" />
              Bugünün Programı
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">14:30 - 15:30</div>
                  <div className="text-gray-600">Ahmet Yılmaz - Anatomi</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-l-4 border-green-500">
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">16:00 - 17:00</div>
                  <div className="text-gray-600">Zeynep Kaya - Fizyoloji</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">17:30 - 18:30</div>
                  <div className="text-gray-600">Grup Çalışması - Biyokimya</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Bell size={20} className="text-orange-500" />
              Son Aktiviteler
            </h3>
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                  <Video size={16} className="text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm">Ahmet Yılmaz ile görüşme tamamlandı</p>
                  <p className="text-xs text-gray-500">2 saat önce</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <div className="p-2 bg-green-100 rounded-lg shrink-0">
                  <FileText size={16} className="text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm">Yeni materyal yüklendi: Anatomi Kılavuzu</p>
                  <p className="text-xs text-gray-500">4 saat önce</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                  <MessageCircle size={16} className="text-purple-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm">Zeynep Kaya'dan yeni mesaj</p>
                  <p className="text-xs text-gray-500">6 saat önce</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 cursor-pointer"
              >
                <div className="p-2 bg-orange-100 rounded-lg shrink-0">
                  <BarChart3 size={16} className="text-orange-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 text-sm">Haftalık rapor oluşturuldu</p>
                  <p className="text-xs text-gray-500">1 gün önce</p>
                </div>
              </motion.div>
            </div>
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="w-full mt-4 py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Tüm aktiviteleri görüntüle
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Calendar Module
function CalendarModule() {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showEventDetail, setShowEventDetail] = useState(false);
  
  // Türkçe ay ve gün isimleri
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  const daysOfWeek = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  // Öğrenci listesi
  const students = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com' },
    { id: 2, name: 'Zeynep Kaya', email: 'zeynep@example.com' },
    { id: 3, name: 'Murat Öztürk', email: 'murat@example.com' },
    { id: 4, name: 'Elif Demir', email: 'elif@example.com' },
    { id: 5, name: 'Burak Şahin', email: 'burak@example.com' },
    { id: 6, name: 'Ayşe Çelik', email: 'ayse@example.com' }
  ];

  // Etkinlik ekleme form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    type: 'lesson',
    student: '',
    status: 'scheduled',
    description: ''
  });

  // Öğrenci arama state'leri
  const [studentSearch, setStudentSearch] = useState('');
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState(students);

  // Birebir görüşme state'leri
  const [selectedStudentForMeeting, setSelectedStudentForMeeting] = useState<any>(null);
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentMeetingLink, setCurrentMeetingLink] = useState('');

  // Etkinlik türleri
  const eventTypes = [
    { value: 'lesson', label: 'Birebir Ders', icon: '🔵' },
    { value: 'exam', label: 'Sınav', icon: '🔴' },
    { value: 'consultation', label: 'Danışmanlık', icon: '🟢' },
    { value: 'group', label: 'Grup Çalışması', icon: '🟣' },
    { value: 'online', label: 'Online Ders', icon: '🟠' }
  ];

  // Form reset
  const resetForm = () => {
    setNewEvent({
      title: '',
      date: '',
      time: '',
      duration: 60,
      type: 'lesson',
      student: '',
      status: 'scheduled',
      description: ''
    });
    setStudentSearch('');
    setShowStudentDropdown(false);
    setFilteredStudents(students);
  };

  // Öğrenci arama
  const handleStudentSearch = (searchTerm: string) => {
    setStudentSearch(searchTerm);
    const filtered = students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
    setShowStudentDropdown(searchTerm.length > 0);
  };

  // Öğrenci seçimi
  const selectStudent = (student: any) => {
    setNewEvent({...newEvent, student: student.name});
    setStudentSearch(student.name);
    setShowStudentDropdown(false);
  };

  // Bugünün tarihini al (minimum tarih için)
  const today = new Date().toISOString().split('T')[0];

  // Tarih seçimi için etkinlik ekleme
  const handleDateClick = (selectedDate: Date) => {
    // Timezone sorununu önlemek için manuel format
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    setNewEvent({
      ...newEvent,
      date: dateString,
      title: '' // Başlığı temizle, kullanıcı kendisi yazacak
    });
    setShowEventModal(true);
  };

  // Birebir görüşme fonksiyonları
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'coach',
      timestamp: new Date(),
      type: 'text'
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleSendLink = () => {
    if (!currentMeetingLink.trim()) return;
    
    const linkMessage = {
      id: Date.now(),
      text: currentMeetingLink,
      sender: 'coach',
      timestamp: new Date(),
      type: 'link'
    };
    
    setChatMessages(prev => [...prev, linkMessage]);
    
    // Örnek öğrenci yanıtı
    setTimeout(() => {
      const studentReply = {
        id: Date.now() + 1,
        text: "Teşekkürler! Linke katılıyorum.",
        sender: 'student',
        timestamp: new Date(),
        type: 'text'
      };
      setChatMessages(prev => [...prev, studentReply]);
    }, 2000);
  };

  const startMeeting = () => {
    setMeetingStarted(true);
    
    // Otomatik karşılama mesajı
    const welcomeMessage = {
      id: Date.now(),
      text: `${selectedStudentForMeeting.name} ile görüşme başlatıldı. Meeting linki oluşturuluyor...`,
      sender: 'system',
      timestamp: new Date(),
      type: 'system'
    };
    
    setChatMessages([welcomeMessage]);
    
    // Örnek meeting linki oluştur
    setTimeout(() => {
      setCurrentMeetingLink('https://meet.google.com/abc-defg-hij');
      const linkMessage = {
        id: Date.now() + 1,
        text: 'Meeting linki oluşturuldu! Aşağıdaki linki öğrencinizle paylaşabilirsiniz.',
        sender: 'system',
        timestamp: new Date(),
        type: 'system'
      };
      setChatMessages(prev => [...prev, linkMessage]);
    }, 1500);
  };

  const endMeeting = () => {
    setMeetingStarted(false);
    setSelectedStudentForMeeting(null);
    setChatMessages([]);
    setCurrentMeetingLink('');
  };

  // Örnek etkinlikler (başlangıç state)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Ahmet Yılmaz - Birebir Ders',
      date: new Date(2024, 11, 15, 10, 0),
      duration: 60,
      type: 'lesson',
      student: 'Ahmet Yılmaz',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Anatomi Sınavı',
      date: new Date(2024, 11, 18, 14, 0),
      duration: 120,
      type: 'exam',
      student: null,
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Zeynep Kaya - Danışmanlık',
      date: new Date(2024, 11, 20, 16, 0),
      duration: 45,
      type: 'consultation',
      student: 'Zeynep Kaya',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Grup Çalışması - Fizyoloji',
      date: new Date(2024, 11, 22, 11, 0),
      duration: 90,
      type: 'group',
      student: null,
      status: 'confirmed'
    },
    {
      id: 5,
      title: 'Murat Öztürk - Online Ders',
      date: new Date(2024, 11, 25, 13, 0),
      duration: 60,
      type: 'online',
      student: 'Murat Öztürk',
      status: 'confirmed'
    }
  ]);

  // Etkinlik ekleme fonksiyonu
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time) {
      alert('Lütfen etkinlik başlığı ve saati giriniz!');
      return;
    }
    
    if (!newEvent.date) {
      alert('Lütfen önce takvimden bir tarih seçiniz!');
      return;
    }

    // Yeni etkinlik objesi oluştur
    const [hours, minutes] = newEvent.time.split(':').map(Number);
    const eventDate = new Date(newEvent.date);
    eventDate.setHours(hours, minutes, 0, 0);

    const newEventData = {
      id: Date.now(), // Benzersiz ID
      title: newEvent.title,
      date: eventDate,
      duration: newEvent.duration,
      type: newEvent.type,
      student: newEvent.student,
      status: newEvent.status,
      description: newEvent.description
    };

    // Etkinlikleri güncelle
    setEvents(prevEvents => [...prevEvents, newEventData]);
    
    // Başarı mesajı
    alert('Etkinlik başarıyla eklendi!');
    
    // Form'u temizle ve modal'ı kapat
    resetForm();
    setShowEventModal(false);
  };

  // Etkinlik tiplerinin renkleri
  const eventTypeColors = {
    lesson: 'from-blue-500 to-blue-600',
    exam: 'from-red-500 to-red-600',
    consultation: 'from-green-500 to-green-600',
    group: 'from-purple-500 to-purple-600',
    online: 'from-orange-500 to-orange-600',
    personal: 'from-gray-500 to-gray-600'
  };

  const eventTypeIcons = {
    lesson: BookOpen,
    exam: FileText,
    consultation: MessageCircle,
    group: Users,
    online: Video,
    personal: User
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

  // Belirli bir güne ait etkinlikleri getir
  const getEventsForDay = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  // Günün dominant etkinlik türünü ve rengini belirle
  const getDayEventStyle = (date: Date) => {
    const dayEvents = getEventsForDay(date);
    if (dayEvents.length === 0) return null;

    // Öncelik sırası: exam > lesson > consultation > group > online
    const eventPriority = {
      'exam': 1,
      'lesson': 2, 
      'consultation': 3,
      'group': 4,
      'online': 5
    };

    // En yüksek öncelikli etkinlik türünü bul
    const dominantEvent = dayEvents.reduce((prev, current) => {
      const prevPriority = eventPriority[prev.type as keyof typeof eventPriority] || 999;
      const currentPriority = eventPriority[current.type as keyof typeof eventPriority] || 999;
      return currentPriority < prevPriority ? current : prev;
    });

    // Etkinlik türüne göre hafif arka plan renkleri
    const dayColors = {
      'lesson': 'bg-blue-50/80 border-blue-200/60 hover:bg-blue-100/80',
      'exam': 'bg-red-50/80 border-red-200/60 hover:bg-red-100/80',
      'consultation': 'bg-green-50/80 border-green-200/60 hover:bg-green-100/80', 
      'group': 'bg-purple-50/80 border-purple-200/60 hover:bg-purple-100/80',
      'online': 'bg-orange-50/80 border-orange-200/60 hover:bg-orange-100/80'
    };

    return dayColors[dominantEvent.type as keyof typeof dayColors] || null;
  };

  // Ay değiştir
  const changeMonth = (direction: number) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Calendar Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Takvim & Etkinlikler</h2>
                         <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
               <div className="flex items-center gap-1">
                 <span>🔵</span>
                 <span>Birebir Dersler</span>
               </div>
               <div className="flex items-center gap-1">
                 <span>🔴</span>
                 <span>Sınavlar</span>
               </div>
               <div className="flex items-center gap-1">
                 <span>🟢</span>
                 <span>Danışmanlık</span>
               </div>
               <div className="flex items-center gap-1">
                 <span>🟣</span>
                 <span>Grup Çalışmaları</span>
               </div>
               <div className="flex items-center gap-1">
                 <span>🟠</span>
                 <span>Online Dersler</span>
               </div>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'month' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ay
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'week' 
                    ? 'bg-white shadow-sm text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Hafta
              </button>
            </div>
            <button 
              onClick={() => {
                // Eğer tarih seçilmemişse bugünü varsayılan yap
                if (!newEvent.date) {
                  setNewEvent({...newEvent, date: today});
                }
                setShowEventModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Etkinlik Ekle</span>
            </button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h3 className="text-xl font-semibold text-gray-900">
            {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

                        {/* Calendar Grid */}
        {viewMode === 'month' && (
          <div className="space-y-3">
            {/* Bilgilendirme */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-xl border border-blue-200">
              <Plus size={16} className="text-blue-500" />
              <span>
                <strong>İpucu:</strong> Takvim günlerine tıklayarak o tarih için hızlıca etkinlik ekleyebilirsiniz
              </span>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Day Headers */}
              {daysOfWeek.map(day => (
                <div key={day} className="p-3 text-center font-medium text-gray-600 bg-gray-50 rounded-lg">
                  {day}
                </div>
              ))}
            
            {/* Calendar Days */}
            {generateCalendarDays().map((day, index) => {
              const dayEvents = getEventsForDay(day.date);
              const isToday = day.date.toDateString() === new Date().toDateString();
              const dayEventStyle = getDayEventStyle(day.date);
              
              return (
                <div
                  key={index}
                  onClick={() => day.isCurrentMonth && handleDateClick(day.date)}
                  className={`min-h-[100px] p-2 border rounded-lg transition-all duration-200 relative group ${
                    day.isCurrentMonth 
                      ? dayEventStyle || 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                      : 'bg-gray-50 border-gray-100 text-gray-400'
                  } ${day.isCurrentMonth ? 'cursor-pointer hover:shadow-md' : ''} ${
                    isToday ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className={`flex items-center justify-between mb-1 ${
                    isToday ? 'text-blue-600' : day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    <span className="text-sm font-medium">
                      {day.date.getDate()}
                    </span>
                    {day.isCurrentMonth && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Plus size={14} className="text-blue-500 bg-white rounded-full p-1 shadow-sm" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => {
                      const Icon = eventTypeIcons[event.type as keyof typeof eventTypeIcons];
                      return (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(event);
                            setShowEventDetail(true);
                          }}
                          className={`p-1 rounded text-xs text-white cursor-pointer hover:scale-105 transition-all duration-200 bg-gradient-to-r ${
                            eventTypeColors[event.type as keyof typeof eventTypeColors]
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Icon size={10} />
                            <span className="truncate font-medium">
                              {event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title}
                            </span>
                          </div>
                          <div className="text-xs opacity-80">
                            {event.date.getHours().toString().padStart(2, '0')}:
                            {event.date.getMinutes().toString().padStart(2, '0')}
                          </div>
                        </div>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayEvents.length - 3} daha
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-center py-8">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 font-medium">Haftalık Görünüm</p>
              <p className="text-sm text-gray-500 mt-2">Haftalık görünüm yakında kullanıma sunulacak!</p>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Events Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Yaklaşan Etkinlikler</h3>
        <div className="space-y-3">
          {events
            .filter(event => event.date >= new Date())
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 5)
            .map((event) => {
              const Icon = eventTypeIcons[event.type as keyof typeof eventTypeIcons];
              return (
                <div
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventDetail(true);
                  }}
                  className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${
                    eventTypeColors[event.type as keyof typeof eventTypeColors]
                  }`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {event.date.toLocaleDateString('tr-TR')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.date.getHours().toString().padStart(2, '0')}:
                        {event.date.getMinutes().toString().padStart(2, '0')} 
                        ({event.duration} dk)
                      </span>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    event.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {event.status === 'confirmed' ? 'Onaylandı' :
                     event.status === 'pending' ? 'Beklemede' : 'Planlandı'}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {showEventDetail && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEventDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Etkinlik Detayları</h3>
                <button
                  onClick={() => setShowEventDetail(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Başlık</label>
                  <p className="text-gray-900 font-medium">{selectedEvent.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tarih</label>
                    <p className="text-gray-900">{selectedEvent.date.toLocaleDateString('tr-TR')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Saat</label>
                    <p className="text-gray-900">
                      {selectedEvent.date.getHours().toString().padStart(2, '0')}:
                      {selectedEvent.date.getMinutes().toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Süre</label>
                    <p className="text-gray-900">{selectedEvent.duration} dakika</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Durum</label>
                    <p className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      selectedEvent.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      selectedEvent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedEvent.status === 'confirmed' ? 'Onaylandı' :
                       selectedEvent.status === 'pending' ? 'Beklemede' : 'Planlandı'}
                    </p>
                  </div>
                </div>
                
                {selectedEvent.student && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Öğrenci</label>
                    <p className="text-gray-900">{selectedEvent.student}</p>
                  </div>
                )}
                
                <div className="flex gap-3 pt-4 border-t">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <Edit size={16} />
                    Düzenle
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    <Trash2 size={16} />
                    Sil
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showEventModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowEventModal(false);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Calendar size={24} />
                    </div>
                                         <div>
                       <h3 className="text-2xl font-bold">Yeni Etkinlik Ekle</h3>
                       <p className="text-green-100 text-sm">
                         {newEvent.date 
                           ? (() => {
                               const [year, month, day] = newEvent.date.split('-').map(Number);
                               const dateObj = new Date(year, month - 1, day);
                               return `${dateObj.toLocaleDateString('tr-TR', { 
                                 weekday: 'long', 
                                 year: 'numeric', 
                                 month: 'long', 
                                 day: 'numeric' 
                               })} için etkinlik oluşturun`;
                             })()
                           : 'Detayları doldurun ve etkinliğinizi oluşturun'
                         }
                       </p>
                     </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowEventModal(false);
                      resetForm();
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-8 px-6 pb-6">
                {/* Etkinlik Başlığı */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Edit size={16} />
                    Etkinlik Başlığı *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Örn: Ahmet Yılmaz - Birebir Ders"
                    autoFocus
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Etkinlik Türü */}
                <div className="space-y-4">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <BookOpen size={16} />
                    Etkinlik Türü *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {eventTypes.map((type) => (
                      <motion.button
                        key={type.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setNewEvent({...newEvent, type: type.value})}
                        className={`p-4 border-2 rounded-2xl transition-all duration-300 flex items-center gap-3 ${
                          newEvent.type === type.value
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-xl">{type.icon}</span>
                        <span className="font-medium text-left">{type.label}</span>
                        {newEvent.type === type.value && (
                          <CheckCircle size={18} className="ml-auto text-blue-500" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Saat */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock size={16} />
                    Saat *
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Süre */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock size={16} />
                    Süre
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[30, 45, 60, 90, 120].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setNewEvent({...newEvent, duration})}
                        className={`p-3 border-2 rounded-xl transition-all duration-300 font-medium ${
                          newEvent.duration === duration
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                        }`}
                      >
                        {duration < 60 ? `${duration} dk` : `${duration / 60} saat`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Öğrenci Seçimi */}
                {(newEvent.type === 'lesson' || newEvent.type === 'consultation' || newEvent.type === 'online') && (
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Users size={16} />
                      Öğrenci Seçimi
                    </label>
                    <div className="relative">
                      <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={studentSearch}
                          onChange={(e) => handleStudentSearch(e.target.value)}
                          onFocus={() => setShowStudentDropdown(true)}
                          placeholder="Öğrenci ara (isim veya email)..."
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white"
                        />
                      </div>
                      
                      {/* Öğrenci Dropdown */}
                      <AnimatePresence>
                        {showStudentDropdown && filteredStudents.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-60 overflow-y-auto"
                          >
                            {filteredStudents.map((student) => (
                              <button
                                key={student.id}
                                onClick={() => selectStudent(student)}
                                className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 first:rounded-t-2xl last:rounded-b-2xl flex items-center gap-3"
                              >
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">{student.name}</p>
                                  <p className="text-sm text-gray-500">{student.email}</p>
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {showStudentDropdown && filteredStudents.length === 0 && studentSearch && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4 text-center text-gray-500"
                        >
                          Öğrenci bulunamadı
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Durum */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <AlertCircle size={16} />
                    Durum
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { value: 'scheduled', label: 'Planlandı', color: 'blue' },
                      { value: 'confirmed', label: 'Onaylandı', color: 'green' },
                      { value: 'pending', label: 'Beklemede', color: 'yellow' }
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => setNewEvent({...newEvent, status: status.value})}
                        className={`p-4 border-2 rounded-xl transition-all duration-300 font-medium ${
                          newEvent.status === status.value
                            ? `border-${status.color}-500 bg-${status.color}-50 text-${status.color}-700`
                            : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Açıklama */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <FileText size={16} />
                    Açıklama (İsteğe bağlı)
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Etkinlik hakkında ek bilgiler, özel notlar veya gereksinimler..."
                    rows={4}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 bg-gray-50 focus:bg-white resize-none"
                  />
                </div>

                {/* Butonlar */}
                <div className="flex gap-4 pt-6 border-t-2 border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowEventModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                  >
                    <X size={18} />
                    İptal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddEvent}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Etkinlik Ekle
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Meetings Module
function MeetingsModule() {
  // Öğrenci listesi - normalde props'tan gelir veya context'ten alınır
  const students: Student[] = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com' },
    { id: 2, name: 'Zeynep Kaya', email: 'zeynep@example.com' },
    { id: 3, name: 'Murat Öztürk', email: 'murat@example.com' },
    { id: 4, name: 'Elif Demir', email: 'elif@example.com' },
    { id: 5, name: 'Burak Şahin', email: 'burak@example.com' },
    { id: 6, name: 'Ayşe Çelik', email: 'ayse@example.com' }
  ];

  // State'ler
  const [selectedStudentForMeeting, setSelectedStudentForMeeting] = useState<Student | null>(null);
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Birebir görüşme fonksiyonları
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'coach',
      timestamp: new Date(),
      type: 'text'
    };
    
    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };



  const startMeeting = () => {
    setMeetingStarted(true);
    
    // Basit karşılama mesajı
    const welcomeMessage: ChatMessage = {
      id: Date.now(),
      text: `${selectedStudentForMeeting?.name} ile chat başlatıldı.`,
      sender: 'system',
      timestamp: new Date(),
      type: 'system'
    };
    
    setChatMessages([welcomeMessage]);
  };

  const endMeeting = () => {
    setMeetingStarted(false);
    setSelectedStudentForMeeting(null);
    setChatMessages([]);
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
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
              <Video size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Birebir Görüşmeler</h2>
              <p className="text-gray-600">Öğrencilerinizle canlı görüşme yapın</p>
            </div>
          </div>
          {meetingStarted && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Görüşme Aktif</span>
            </div>
          )}
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Sol Panel - Öğrenci Listesi */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={20} />
              Öğrenci Listesi
            </h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {students.map((student: Student) => (
                <div
                  key={student.id}
                  className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                    selectedStudentForMeeting?.id === student.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedStudentForMeeting(student)}
                      disabled={meetingStarted}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        meetingStarted 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                      }`}
                    >
                      <Plus size={18} />
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Panel - Görüşme Başlatma */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Video size={20} />
              {meetingStarted ? 'Aktif Görüşme' : 'Görüşme Başlat'}
            </h3>

            {!selectedStudentForMeeting ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Users size={64} className="mx-auto text-gray-300 mb-4" />
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">Öğrenci Seçin</h4>
                  <p className="text-gray-500">Sol panelden bir öğrenci seçerek görüşme başlatın</p>
                </div>
              </div>
            ) : !meetingStarted ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {selectedStudentForMeeting.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedStudentForMeeting.name}</h4>
                  <p className="text-gray-600 mb-2">{selectedStudentForMeeting.email}</p>
                  <p className="text-sm text-gray-500 mb-6">Bu öğrenci ile birebir görüşme başlatmak üzeresiniz</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startMeeting}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-3 mx-auto"
                  >
                    <Video size={24} />
                    Görüşme Başlat
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold">
                        {selectedStudentForMeeting.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold">{selectedStudentForMeeting.name} ile Görüşme</h4>
                        <p className="text-green-100 text-sm">Aktif görüşme devam ediyor</p>
                      </div>
                    </div>
                    <button
                      onClick={endMeeting}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <X size={16} />
                      Bitir
                    </button>
                  </div>
                </div>

                

                <div className="text-center text-gray-500 py-8">
                  <Video size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>Görüşme ekranı burada görünecek</p>
                  <p className="text-sm">Zoom/Meet entegrasyonu aktif edilecek</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alt Panel - Chat (Sadece görüşme başladığında) */}
      {meetingStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle size={20} />
            Chat & Mesajlaşma
          </h3>

          {/* Chat Mesajları */}
          <div className="bg-gray-50 rounded-xl p-4 h-64 overflow-y-auto mb-4 space-y-3">
            {chatMessages.map((message: ChatMessage) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'coach' ? 'justify-end' : 
                  message.sender === 'system' ? 'justify-center' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === 'coach' 
                      ? 'bg-blue-500 text-white' 
                      : message.sender === 'system'
                      ? 'bg-gray-200 text-gray-700 text-sm'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  {message.type === 'link' ? (
                    <div>
                      <p className="text-xs opacity-75 mb-1">Meeting Linki:</p>
                      <a 
                        href={message.text} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline break-all"
                      >
                        {message.text}
                      </a>
                    </div>
                  ) : (
                    <p>{message.text}</p>
                  )}
                  <p className={`text-xs mt-1 opacity-75 ${
                    message.sender === 'coach' ? 'text-blue-100' : 
                    message.sender === 'system' ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('tr-TR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mesaj Gönderme */}
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Mesajınızı yazın..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={18} />
              Gönder
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Students Module
function StudentsModule() {
  // Extended Student type for this module
  type ExtendedStudent = {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo?: string;
    class: string;
    department: string;
    registrationDate: Date;
    coach: string;
    status: 'active' | 'inactive' | 'suspended';
    tags: string[];
    notes: string;
    lastMeeting?: Date;
    totalMeetings: number;
    meetingHistory: MeetingHistory[];
  };

  type MeetingHistory = {
    id: number;
    date: Date;
    duration: number; // dakika
    type: 'consultation' | 'lesson' | 'exam_prep';
    notes: string;
    status: 'completed' | 'cancelled' | 'no_show';
  };

  // State'ler
  const [students, setStudents] = useState<ExtendedStudent[]>([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '+90 532 123 4567',
      class: '4. Sınıf',
      department: 'Tıp Fakültesi',
      registrationDate: new Date(2024, 8, 15),
      coach: 'Dr. Eylül Büyükkaya',
      status: 'active',
      tags: ['sınava hazır', 'motivasyonlu'],
      notes: 'Çok çalışkan bir öğrenci. Anatomide güçlü, fizyolojide destekle ihtiyacı var.',
      lastMeeting: new Date(2024, 11, 10),
      totalMeetings: 12,
      meetingHistory: [
        {
          id: 1,
          date: new Date(2024, 11, 10),
          duration: 60,
          type: 'consultation',
          notes: 'Sınav stratejisi konuşuldu. Güven problemi çözüldü.',
          status: 'completed'
        },
        {
          id: 2,
          date: new Date(2024, 11, 5),
          duration: 45,
          type: 'lesson',
          notes: 'Anatomi dersi. Kas sistemi tekrarı yapıldı.',
          status: 'completed'
        }
      ]
    },
    {
      id: 2,
      name: 'Zeynep Kaya',
      email: 'zeynep@example.com',
      phone: '+90 533 234 5678',
      class: '3. Sınıf',
      department: 'Tıp Fakültesi',
      registrationDate: new Date(2024, 9, 20),
      coach: 'Dr. Eylül Büyükkaya',
      status: 'active',
      tags: ['yeni', 'kararsız'],
      notes: 'Yeni katıldı. Henüz hedeflerini net belirleyemedi. Motivasyon desteği gerekli.',
      lastMeeting: new Date(2024, 11, 8),
      totalMeetings: 3,
      meetingHistory: [
        {
          id: 3,
          date: new Date(2024, 11, 8),
          duration: 60,
          type: 'consultation',
          notes: 'İlk görüşme. Hedef belirleme konuşması.',
          status: 'completed'
        }
      ]
    },
    {
      id: 3,
      name: 'Murat Öztürk',
      email: 'murat@example.com',
      phone: '+90 534 345 6789',
      class: '5. Sınıf',
      department: 'Tıp Fakültesi',
      registrationDate: new Date(2024, 6, 10),
      coach: 'Dr. Eylül Büyükkaya',
      status: 'active',
      tags: ['düşük motivasyon', 'potansiyel yüksek'],
      notes: 'Çok yetenekli ama motivasyon sorunu yaşıyor. Ailevşi destek gerekli.',
      totalMeetings: 8,
      meetingHistory: []
    },
    {
      id: 4,
      name: 'Elif Demir',
      email: 'elif@example.com',
      phone: '+90 535 456 7890',
      class: '2. Sınıf',
      department: 'Tıp Fakültesi',
      registrationDate: new Date(2024, 10, 5),
      coach: 'Dr. Eylül Büyükkaya',
      status: 'suspended',
      tags: ['ödeme sorunu'],
      notes: 'Geçici olarak askıya alındı. Ödeme planı görüşülecek.',
      totalMeetings: 1,
      meetingHistory: []
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<ExtendedStudent | null>(null);
  const [showStudentDetail, setShowStudentDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [tagFilter, setTagFilter] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<ExtendedStudent | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatStudent, setChatStudent] = useState<ExtendedStudent | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [showFileSend, setShowFileSend] = useState<ExtendedStudent | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  // Materials data (from MaterialsModule)
  const materials = [
    {
      id: 1,
      name: 'Anatomi Ders Notları.pdf',
      type: 'pdf',
      size: '2.4 MB',
      category: 'Ders Notları',
      uploadDate: new Date(2024, 10, 15),
      downloads: 156,
      description: 'İnsan anatomisi temel konuları'
    },
    {
      id: 2,
      name: 'Kalp Anatomisi Videosu.mp4',
      type: 'video',
      size: '15.7 MB',
      category: 'Videolar',
      uploadDate: new Date(2024, 10, 20),
      downloads: 89,
      description: 'Kalp anatomisi detaylı görsel anlatım'
    },
    {
      id: 3,
      name: 'Sınav Soruları 2024.xlsx',
      type: 'excel',
      size: '1.2 MB',
      category: 'Sınavlar',
      uploadDate: new Date(2024, 10, 25),
      downloads: 234,
      description: 'Genel tıp sınav soruları'
    },
    {
      id: 4,
      name: 'Tıbbi Terimler Sözlüğü.docx',
      type: 'word',
      size: '856 KB',
      category: 'Kaynaklar',
      uploadDate: new Date(2024, 11, 1),
      downloads: 67,
      description: 'Tıp fakültesi terim sözlüğü'
    },
    {
      id: 5,
      name: 'Fizyoloji Sunumu.pptx',
      type: 'powerpoint',
      size: '4.2 MB',
      category: 'Sunumlar',
      uploadDate: new Date(2024, 11, 5),
      downloads: 42,
      description: 'Temel fizyoloji konuları sunumu'
    },
    {
      id: 6,
      name: 'Hücre Biyolojisi Videosu.mp4',
      type: 'video',
      size: '12.8 MB',
      category: 'Videolar',
      uploadDate: new Date(2024, 11, 8),
      downloads: 78,
      description: 'Hücre yapısı ve işlevleri'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'word': return '📝';
      case 'excel': return '📊';
      case 'powerpoint': return '📋';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      case 'audio': return '🎵';
      default: return '📎';
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-50 text-red-600 border-red-200';
      case 'word': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'excel': return 'bg-green-50 text-green-600 border-green-200';
      case 'powerpoint': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'video': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'image': return 'bg-pink-50 text-pink-600 border-pink-200';
      case 'audio': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Available tags
  const availableTags = [
    'yeni', 'sınava hazır', 'motivasyonlu', 'düşük motivasyon', 
    'kararsız', 'potansiyel yüksek', 'ödeme sorunu', 'düzenli'
  ];

  // Status colors
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800', 
    suspended: 'bg-red-100 text-red-800'
  };

  const statusLabels = {
    active: 'Aktif',
    inactive: 'Pasif',
    suspended: 'Askıya Alındı'
  };

  // Tag colors
  const tagColors = {
    'yeni': 'bg-blue-100 text-blue-800',
    'sınava hazır': 'bg-green-100 text-green-800',
    'motivasyonlu': 'bg-purple-100 text-purple-800',
    'düşük motivasyon': 'bg-orange-100 text-orange-800',
    'kararsız': 'bg-yellow-100 text-yellow-800',
    'potansiyel yüksek': 'bg-indigo-100 text-indigo-800',
    'ödeme sorunu': 'bg-red-100 text-red-800',
    'düzenli': 'bg-teal-100 text-teal-800'
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesTag = !tagFilter || student.tags.includes(tagFilter);
    
    return matchesSearch && matchesStatus && matchesTag;
  });

  // Add note function
  const handleAddNote = () => {
    if (!selectedStudent || !newNote.trim()) return;

    const updatedStudents = students.map(student => 
      student.id === selectedStudent.id 
        ? { ...student, notes: student.notes + '\n\n' + new Date().toLocaleDateString('tr-TR') + ': ' + newNote }
        : student
    );
    
    setStudents(updatedStudents);
    const updatedStudent = updatedStudents.find(s => s.id === selectedStudent.id);
    setSelectedStudent(updatedStudent || null);
    setNewNote('');
    setShowAddNote(false);
  };

  // Update student status
  const updateStudentStatus = (studentId: number, newStatus: 'active' | 'inactive' | 'suspended') => {
    const updatedStudents = students.map(student =>
      student.id === studentId ? { ...student, status: newStatus } : student
    );
    setStudents(updatedStudents);
    
    if (selectedStudent?.id === studentId) {
      setSelectedStudent({ ...selectedStudent, status: newStatus });
    }
  };

  // Edit mode functions
  const handleEditMode = () => {
    if (selectedStudent) {
      setEditData({ ...selectedStudent });
      setEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (editData && selectedStudent) {
      setStudents(students.map(student => 
        student.id === selectedStudent.id ? editData : student
      ));
      setSelectedStudent(editData);
      setEditMode(false);
      setEditData(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData(null);
  };

  // Chat functions
  const openChat = (student: ExtendedStudent) => {
    setChatStudent(student);
    setShowChat(true);
    // Load existing messages for this student (mock data for now)
    const existingMessages: ChatMessage[] = [
      {
        id: 1,
        text: `Merhaba ${student.name}! Size nasıl yardımcı olabilirim?`,
        sender: 'coach',
        timestamp: new Date(Date.now() - 3600000),
        type: 'text'
      },
      {
        id: 2,
        text: 'Merhaba hocam! Sınav konularında biraz kafam karışık.',
        sender: 'student',
        timestamp: new Date(Date.now() - 3000000),
        type: 'text'
      }
    ];
    setChatMessages(existingMessages);
  };

  const sendChatMessage = () => {
    if (!newChatMessage.trim() || !chatStudent) return;

    const newMessage: ChatMessage = {
      id: chatMessages.length + 1,
      text: newChatMessage,
      sender: 'coach',
      timestamp: new Date(),
      type: 'text'
    };

    setChatMessages([...chatMessages, newMessage]);
    setNewChatMessage('');

    // Simulate student response after 2 seconds
    setTimeout(() => {
      const studentResponse: ChatMessage = {
        id: chatMessages.length + 2,
        text: 'Teşekkür ederim hocam, çok yardımcı oldu!',
        sender: 'student',
        timestamp: new Date(),
        type: 'text'
      };
      setChatMessages(prev => [...prev, studentResponse]);
    }, 2000);
  };

  const closeChat = () => {
    setShowChat(false);
    setChatStudent(null);
    setChatMessages([]);
    setNewChatMessage('');
  };

  // File send functions
  const openFileSend = (student: ExtendedStudent) => {
    setShowFileSend(student);
    setSelectedFiles([]);
  };

  const closeFileSend = () => {
    setShowFileSend(null);
    setSelectedFiles([]);
  };

  const toggleFileSelection = (file: any) => {
    setSelectedFiles(prev => {
      const isSelected = prev.some(f => f.id === file.id);
      if (isSelected) {
        return prev.filter(f => f.id !== file.id);
      } else {
        return [...prev, file];
      }
    });
  };

  const sendSelectedFiles = () => {
    if (selectedFiles.length === 0 || !showFileSend) return;
    
    // Simulate sending files
    const fileNames = selectedFiles.map(file => file.name).join(', ');
    
    // Here you would implement the actual file sending logic
    alert(`${fileNames} dosyaları ${showFileSend.name} adlı öğrenciye gönderildi!`);
    
    closeFileSend();
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
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-xl backdrop-blur-sm">
                <Users size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Öğrenci Yönetimi
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-gray-600 font-medium">
                    Toplam <span className="text-blue-600 font-bold">{students.length}</span> öğrenci • 
                    <span className="text-purple-600 font-bold"> {filteredStudents.length}</span> gösteriliyor
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-500 flex items-center gap-3 font-semibold"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Yeni Öğrenci</span>
              </motion.button>
            </div>
          </div>

          {/* Modern Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Öğrenci ara (isim, email)..."
                  className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="relative w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-900 shadow-lg hover:shadow-xl cursor-pointer appearance-none"
              >
                <option value="all">🎯 Tüm Durumlar</option>
                <option value="active">✅ Aktif</option>
                <option value="inactive">⏸️ Pasif</option>
                <option value="suspended">🚫 Askıya Alındı</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Tag Filter */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="relative w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-300 text-gray-900 shadow-lg hover:shadow-xl cursor-pointer appearance-none"
              >
                <option value="">🏷️ Tüm Etiketler</option>
                {availableTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'yeni' ? '🆕' : 
                     tag === 'sınava hazır' ? '📚' :
                     tag === 'motivasyonlu' ? '💪' :
                     tag === 'düşük motivasyon' ? '📉' :
                     tag === 'kararsız' ? '🤔' :
                     tag === 'potansiyel yüksek' ? '⭐' :
                     tag === 'ödeme sorunu' ? '💳' :
                     tag === 'düzenli' ? '📅' : '🏷️'} {tag}
                  </option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Students List */}
      <div className="space-y-3">
        {filteredStudents.map((student: ExtendedStudent, index: number) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            whileHover={{ scale: 1.005, y: -1 }}
            className="group bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-200/60 hover:shadow-md hover:border-blue-200/80 transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-4">
              {/* Sol Taraf - Öğrenci Bilgileri */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                    {student.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  {/* Status Indicator */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    student.status === 'active' ? 'bg-green-500' :
                    student.status === 'inactive' ? 'bg-gray-400' :
                    'bg-red-500'
                  }`}></div>
                </div>

                {/* Öğrenci Detayları */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{student.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${statusColors[student.status]}`}>
                      {student.status === 'active' ? 'Aktif' :
                       student.status === 'inactive' ? 'Pasif' : 'Askıda'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <span>📧</span>
                      <span className="truncate">{student.email}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🏫</span>
                      <span>{student.department}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📚</span>
                      <span>{student.class}</span>
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {student.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-800'}`}>
                        {tag === 'yeni' ? '🆕' : 
                         tag === 'sınava hazır' ? '📚' :
                         tag === 'motivasyonlu' ? '💪' :
                         tag === 'düşük motivasyon' ? '📉' :
                         tag === 'kararsız' ? '🤔' :
                         tag === 'potansiyel yüksek' ? '⭐' :
                         tag === 'ödeme sorunu' ? '💳' :
                         tag === 'düzenli' ? '📅' : '🏷️'} {tag}
                      </span>
                    ))}
                    {student.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                        +{student.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Orta - İstatistikler */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-center bg-blue-50 rounded-lg p-3 min-w-[70px]">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar size={12} className="text-blue-500" />
                    <span className="text-xs text-blue-700 font-medium">Son</span>
                  </div>
                  {student.lastMeeting ? (
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {student.lastMeeting.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.floor((new Date().getTime() - student.lastMeeting.getTime()) / (1000 * 60 * 60 * 24))}g
                      </p>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">-</span>
                  )}
                </div>
                
                <div className="text-center bg-purple-50 rounded-lg p-3 min-w-[70px]">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BarChart3 size={12} className="text-purple-500" />
                    <span className="text-xs text-purple-700 font-medium">Total</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{student.totalMeetings}</p>
                </div>
              </div>

                             {/* Sağ - Aksiyonlar */}
               <div className="flex items-center gap-2 flex-shrink-0">
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => {
                     setSelectedStudent(student);
                     setShowStudentDetail(true);
                   }}
                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
                 >
                   <Eye size={14} />
                   Detay
                 </motion.button>
                 <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => openChat(student)}
                   className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                   title="Mesaj Gönder"
                 >
                   <MessageCircle size={14} />
                 </motion.button>
                 <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={() => openFileSend(student)}
                   className="p-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors"
                   title="Dosya Gönder"
                 >
                   <FileText size={14} />
                 </motion.button>
               </div>
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users size={32} className="text-gray-400" />
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Öğrenci bulunamadı</h3>
            <p className="text-gray-500 mb-4">Arama kriterlerinizi değiştirmeyi deneyin</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTagFilter('');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-medium"
            >
              Filtreleri Temizle
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {showStudentDetail && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowStudentDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-lg border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modern Modal Header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 border-b border-gray-100">
                {/* Subtle background elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-500/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Modern Avatar */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        {/* Status dot */}
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-white shadow-lg ${
                          selectedStudent.status === 'active' ? 'bg-green-500' :
                          selectedStudent.status === 'inactive' ? 'bg-gray-400' :
                          'bg-red-500'
                        }`}></div>
                      </div>
                      
                      {/* Student Info */}
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{selectedStudent.name}</h3>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm text-gray-600 font-medium">{selectedStudent.department}</span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span className="text-sm text-gray-600 font-medium">{selectedStudent.class}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{selectedStudent.email}</p>
                      </div>
                    </div>
                    
                    {/* Close button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowStudentDetail(false)}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <X size={20} className="text-gray-400" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Modern Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] bg-gray-50/30">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-4">
                    {/* İletişim Bilgileri */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/60">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <User size={16} className="text-blue-500" />
                        İletişim Bilgileri
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📧</span>
                          <div className="min-w-0 flex-1">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">E-posta</label>
                            {editMode ? (
                              <input
                                type="email"
                                value={editData?.email || ''}
                                onChange={(e) => setEditData(prev => prev ? {...prev, email: e.target.value} : null)}
                                className="w-full text-gray-900 font-medium text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <p className="text-gray-900 font-medium text-sm truncate">{selectedStudent.email}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📱</span>
                          <div className="min-w-0 flex-1">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Telefon</label>
                            {editMode ? (
                              <input
                                type="tel"
                                value={editData?.phone || ''}
                                onChange={(e) => setEditData(prev => prev ? {...prev, phone: e.target.value} : null)}
                                className="w-full text-gray-900 font-medium text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <p className="text-gray-900 font-medium text-sm">{selectedStudent.phone}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">🏫</span>
                          <div className="min-w-0 flex-1">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bölüm</label>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData?.department || ''}
                                onChange={(e) => setEditData(prev => prev ? {...prev, department: e.target.value} : null)}
                                className="w-full text-gray-900 font-medium text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <p className="text-gray-900 font-medium text-sm">{selectedStudent.department}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg">📚</span>
                          <div className="min-w-0 flex-1">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sınıf</label>
                            {editMode ? (
                              <input
                                type="text"
                                value={editData?.class || ''}
                                onChange={(e) => setEditData(prev => prev ? {...prev, class: e.target.value} : null)}
                                className="w-full text-gray-900 font-medium text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            ) : (
                              <p className="text-gray-900 font-medium text-sm">{selectedStudent.class}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Durum */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/60">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertCircle size={16} className="text-green-500" />
                        Durum Yönetimi
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Mevcut Durum</label>
                          <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${statusColors[selectedStudent.status]}`}>
                            {selectedStudent.status === 'active' ? 'Aktif' :
                             selectedStudent.status === 'inactive' ? 'Pasif' : 'Askıda'}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateStudentStatus(selectedStudent.id, 'active')}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              selectedStudent.status === 'active' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-green-50'
                            }`}
                          >
                            Aktif
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateStudentStatus(selectedStudent.id, 'inactive')}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              selectedStudent.status === 'inactive' 
                                ? 'bg-gray-500 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            Pasif
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateStudentStatus(selectedStudent.id, 'suspended')}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                              selectedStudent.status === 'suspended' 
                                ? 'bg-red-500 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-red-50'
                            }`}
                          >
                            Askıya Al
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Etiketler */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/60">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-purple-500">🏷️</span>
                        Etiketler
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.tags.map((tag: string) => (
                          <span 
                            key={tag} 
                            className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${tagColors[tag as keyof typeof tagColors] || 'bg-gray-100 text-gray-800'}`}
                          >
                            {tag === 'yeni' ? '🆕' : 
                             tag === 'sınava hazır' ? '📚' :
                             tag === 'motivasyonlu' ? '💪' :
                             tag === 'düşük motivasyon' ? '📉' :
                             tag === 'kararsız' ? '🤔' :
                             tag === 'potansiyel yüksek' ? '⭐' :
                             tag === 'ödeme sorunu' ? '💳' :
                             tag === 'düzenli' ? '📅' : '🏷️'} {tag}
                          </span>
                        ))}
                        {selectedStudent.tags.length === 0 && (
                          <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <span>🏷️</span>
                            <span>Henüz etiket eklenmemiş</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Notes & History */}
                  <div className="space-y-4">
                    {/* Görüşme İstatistikleri */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/60">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart3 size={16} className="text-indigo-500" />
                        Görüşme İstatistikleri
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center gap-1 mb-2">
                            <span className="text-lg">📊</span>
                            <span className="text-xs font-medium text-blue-700">TOPLAM</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{selectedStudent.totalMeetings}</p>
                          <p className="text-blue-600 text-xs">Görüşme</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center gap-1 mb-2">
                            <span className="text-lg">✅</span>
                            <span className="text-xs font-medium text-green-700">BAŞARILI</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">{selectedStudent.meetingHistory.filter(m => m.status === 'completed').length}</p>
                          <p className="text-green-600 text-xs">Tamamlanan</p>
                        </div>
                      </div>
                    </div>

                    {/* Notlar */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/60">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <FileText size={16} className="text-orange-500" />
                          Koç Notları
                        </h4>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowAddNote(true)}
                          className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs flex items-center gap-1 font-medium"
                        >
                          <Plus size={12} />
                          Not Ekle
                        </motion.button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 min-h-[100px] max-h-[150px] overflow-y-auto">
                        {selectedStudent.notes ? (
                          <p className="text-gray-700 text-sm leading-relaxed">{selectedStudent.notes}</p>
                        ) : (
                          <div className="flex items-center gap-2 text-gray-500">
                            <span>📝</span>
                            <span className="text-sm">Henüz not eklenmemiş</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Son Görüşmeler */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200/60">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock size={16} className="text-teal-500" />
                        Görüşme Geçmişi
                      </h4>
                      <div className="space-y-3 max-h-[200px] overflow-y-auto">
                        {selectedStudent.meetingHistory.length > 0 ? (
                          selectedStudent.meetingHistory.map((meeting: MeetingHistory) => (
                            <div 
                              key={meeting.id} 
                              className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                                    {meeting.date.getDate()}
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900 text-sm">
                                      {meeting.date.toLocaleDateString('tr-TR')}
                                    </span>
                                    <p className="text-xs text-gray-500">
                                      {meeting.date.toLocaleDateString('tr-TR', { weekday: 'long' })}
                                    </p>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                  meeting.status === 'completed' ? 'bg-green-100 text-green-700' :
                                  meeting.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {meeting.status === 'completed' ? 'Tamamlandı' :
                                   meeting.status === 'cancelled' ? 'İptal' : 'Gelmedi'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm">
                                  {meeting.type === 'consultation' ? '💬' :
                                   meeting.type === 'lesson' ? '📚' : '📝'}
                                </span>
                                <span className="text-xs text-gray-700">
                                  {meeting.type === 'consultation' ? 'Danışmanlık' :
                                   meeting.type === 'lesson' ? 'Ders' : 'Sınav Hazırlığı'}
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{meeting.duration} dk</span>
                              </div>
                              {meeting.notes && (
                                <div className="mt-2 p-2 bg-white rounded-lg">
                                  <p className="text-xs text-gray-600">{meeting.notes}</p>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-500 text-sm">
                            <span>📅</span>
                            <span>Henüz görüşme geçmişi yok</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer - Edit Buttons */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
                  <div className="flex items-center justify-end gap-3">
                    {!editMode ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleEditMode}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
                      >
                        <Edit size={14} />
                        Düzenle
                      </motion.button>
                    ) : (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCancelEdit}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          İptal
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleSaveEdit}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                          <Save size={14} />
                          Kaydet
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Note Modal */}
      <AnimatePresence>
        {showAddNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddNote(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Yeni Not Ekle</h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Not içeriğini yazın..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowAddNote(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Kaydet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && chatStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeChat}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-xl max-w-lg w-full h-[600px] shadow-xl border border-gray-200 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                    {chatStudent.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{chatStudent.name}</h3>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Çevrimiçi</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeChat}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </motion.button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'coach' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-xl px-4 py-2 ${
                      message.sender === 'coach'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'coach' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('tr-TR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Mesajınızı yazın..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendChatMessage}
                    disabled={!newChatMessage.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={16} />
                    Gönder
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Send Modal */}
      <AnimatePresence>
        {showFileSend && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeFileSend}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] shadow-xl border border-gray-200 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Dosya Gönder</h3>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{showFileSend?.name}</span> adlı öğrenciye materyal gönder
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeFileSend}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </motion.button>
              </div>

              {/* File Selection */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Materyal Kütüphanesi 
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({selectedFiles.length} dosya seçildi)
                    </span>
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Göndermek istediğiniz dosyaları seçin. Birden fazla dosya seçebilirsiniz.
                  </p>
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materials.map((material) => {
                    const isSelected = selectedFiles.some(f => f.id === material.id);
                    return (
                      <motion.div
                        key={material.id}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleFileSelection(material)}
                        className={`relative bg-white rounded-xl p-4 border-2 cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'border-teal-500 bg-teal-50 shadow-lg' 
                            : 'border-gray-200 hover:border-teal-300 hover:shadow-md'
                        }`}
                      >
                        {/* Selection Indicator */}
                        <div className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                          isSelected 
                            ? 'bg-teal-500 border-teal-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-full h-full flex items-center justify-center"
                            >
                              <CheckCircle size={12} className="text-white" />
                            </motion.div>
                          )}
                        </div>

                        {/* File Icon */}
                        <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center mb-3 ${getFileColor(material.type)}`}>
                          <span className="text-2xl">{getFileIcon(material.type)}</span>
                        </div>

                        {/* File Info */}
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                            {material.name}
                          </h5>
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                            {material.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>{material.size}</span>
                            <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-600 font-medium">
                              {material.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Empty State */}
                {materials.length === 0 && (
                  <div className="text-center py-12">
                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Henüz materyal bulunmuyor</h3>
                    <p className="text-gray-500">Önce materyal kütüphanesine dosya yükleyin</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{selectedFiles.length}</span> dosya seçildi
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeFileSend}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    İptal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendSelectedFiles}
                    disabled={selectedFiles.length === 0}
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
                  >
                    <Send size={16} />
                    Dosyaları Gönder ({selectedFiles.length})
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Materials Module
function MaterialsModule() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: 'Anatomi Ders Notları.pdf',
      type: 'pdf',
      size: '2.4 MB',
      category: 'Ders Notları',
      uploadDate: new Date(2024, 10, 15),
      downloads: 156,
      description: 'İnsan anatomisi temel konuları'
    },
    {
      id: 2,
      name: 'Kalp Anatomisi Videosu.mp4',
      type: 'video',
      size: '15.7 MB',
      category: 'Videolar',
      uploadDate: new Date(2024, 10, 20),
      downloads: 89,
      description: 'Kalp anatomisi detaylı görsel anlatım'
    },
    {
      id: 3,
      name: 'Sınav Soruları 2024.xlsx',
      type: 'excel',
      size: '1.2 MB',
      category: 'Sınavlar',
      uploadDate: new Date(2024, 10, 25),
      downloads: 234,
      description: 'Genel tıp sınav soruları'
    },
    {
      id: 4,
      name: 'Tıbbi Terimler Sözlüğü.docx',
      type: 'word',
      size: '856 KB',
      category: 'Kaynaklar',
      uploadDate: new Date(2024, 11, 1),
      downloads: 67,
      description: 'Tıp fakültesi terim sözlüğü'
    }
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const categories = ['Ders Notları', 'Videolar', 'Sınavlar', 'Kaynaklar', 'Sunumlar', 'Resimler'];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'word': return '📝';
      case 'excel': return '📊';
      case 'powerpoint': return '📋';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      case 'audio': return '🎵';
      default: return '📎';
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-50 text-red-600 border-red-200';
      case 'word': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'excel': return 'bg-green-50 text-green-600 border-green-200';
      case 'powerpoint': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'video': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'image': return 'bg-pink-50 text-pink-600 border-pink-200';
      case 'audio': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files: File[]) => {
    files.forEach(file => {
      const newMaterial = {
        id: materials.length + Math.random(),
        name: file.name,
        type: getFileTypeFromExtension(file.name),
        size: formatFileSize(file.size),
        category: 'Ders Notları',
        uploadDate: new Date(),
        downloads: 0,
        description: 'Yeni yüklenen dosya'
      };
      setMaterials(prev => [newMaterial, ...prev]);
    });
  };

  const getFileTypeFromExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'pdf';
      case 'doc':
      case 'docx': return 'word';
      case 'xls':
      case 'xlsx': return 'excel';
      case 'ppt':
      case 'pptx': return 'powerpoint';
      case 'mp4':
      case 'avi':
      case 'mov': return 'video';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return 'image';
      case 'mp3':
      case 'wav': return 'audio';
      default: return 'file';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/50 to-purple-50/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-xl">
                <FileText size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                  Materyal Kütüphanesi
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-gray-600 font-medium">
                    Toplam <span className="text-indigo-600 font-bold">{materials.length}</span> dosya • 
                    <span className="text-purple-600 font-bold"> {filteredMaterials.length}</span> gösteriliyor
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:shadow-2xl transition-all duration-500 flex items-center gap-3 font-semibold"
              >
                <Upload size={20} />
                <span className="hidden sm:inline">Dosya Yükle</span>
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative group">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Materyal ara..."
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl"
              />
            </div>

            {/* Category Filter */}
            <div className="relative group">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-gray-900 shadow-lg hover:shadow-xl cursor-pointer appearance-none"
              >
                <option value="all">📚 Tüm Kategoriler</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-50/50' 
            : 'border-gray-300 bg-gray-50/50 hover:border-indigo-400 hover:bg-indigo-50/30'
        }`}
      >
        <div className="text-center">
          <Upload size={48} className={`mx-auto mb-4 ${isDragging ? 'text-indigo-500' : 'text-gray-400'}`} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Dosyalarınızı buraya sürükleyin
          </h3>
          <p className="text-gray-500 mb-4">
            veya{' '}
            <button 
              onClick={() => setShowUploadModal(true)}
              className="text-indigo-500 hover:text-indigo-600 font-medium"
            >
              dosya seçin
            </button>
          </p>
          <p className="text-sm text-gray-400">
            PDF, Word, Excel, PowerPoint, Resim, Video ve daha fazlası desteklenir
          </p>
        </div>
      </motion.div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMaterials.map((material, index) => (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 hover:shadow-lg transition-all duration-300 group"
          >
            {/* File Type Icon */}
            <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center mb-4 ${getFileColor(material.type)}`}>
              <span className="text-2xl">{getFileIcon(material.type)}</span>
            </div>

            {/* File Info */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {material.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                {material.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{material.size}</span>
                <span>{material.downloads} indirme</span>
              </div>
            </div>

            {/* Category & Date */}
            <div className="mb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-700 mb-2">
                {material.category}
              </span>
              <p className="text-xs text-gray-500">
                {material.uploadDate.toLocaleDateString('tr-TR')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-xs font-medium flex items-center justify-center gap-1"
              >
                <Download size={12} />
                İndir
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <Trash2 size={12} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-white rounded-2xl border border-gray-200"
        >
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Materyal bulunamadı</h3>
          <p className="text-gray-500 mb-4">Arama kriterlerinizi değiştirmeyi deneyin</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
          >
            Filtreleri Temizle
          </motion.button>
        </motion.div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Upload size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dosya Yükle</h3>
                <p className="text-gray-500">Materyal kütüphanesine yeni dosya ekleyin</p>
              </div>

              {/* File Input */}
              <div className="mb-6">
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(Array.from(e.target.files));
                      setShowUploadModal(false);
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.mp3,.wav"
                />
                <label
                  htmlFor="file-upload"
                  className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer text-center"
                >
                  <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 font-medium mb-1">Dosya seçmek için tıklayın</p>
                  <p className="text-sm text-gray-400">veya dosyaları buraya sürükleyin</p>
                </label>
              </div>

              {/* Supported Formats */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Desteklenen Formatlar:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">📄</span>
                    <span>PDF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">📝</span>
                    <span>Word (DOC, DOCX)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">📊</span>
                    <span>Excel (XLS, XLSX)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">📋</span>
                    <span>PowerPoint (PPT, PPTX)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pink-500">🖼️</span>
                    <span>Resim (JPG, PNG, GIF)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">🎥</span>
                    <span>Video (MP4, AVI, MOV)</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  İptal
                </button>
                <label
                  htmlFor="file-upload"
                  className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium text-center cursor-pointer"
                >
                  Dosya Seç
                </label>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Reports Module  
function ReportsModule() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h2 className="text-xl font-bold text-gray-900 mb-4">İlerleme & Raporlar</h2>
        <div className="text-center py-8">
          <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Raporlama modülü geliştiriliyor...</p>
          <p className="text-sm text-gray-500 mt-2">Grafikler ve ilerleme takibi yakında!</p>
        </div>
      </div>
    </motion.div>
  );
}

// Notifications Module
function NotificationsModule() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Bildirimler</h2>
        <div className="text-center py-8">
          <Bell size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Bildirim sistemi geliştiriliyor...</p>
          <p className="text-sm text-gray-500 mt-2">Mesaj bildirimleri ve hatırlatmalar yakında!</p>
        </div>
      </div>
    </motion.div>
  );
} 