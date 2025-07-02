'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users,
  DollarSign,
  Shield,
  BarChart3,
  Settings,
  Eye,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Crown,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Lock,
  Unlock,
  Star,
  Calendar,
  Clock,
  Mail,
  Bell,
  Globe,
  Database,
  Server,
  Activity,
  UserCheck,
  UserX,
  Briefcase,
  Target,
  Zap,
  FileText,
  Video,
  BookOpen,
  Award,
  Monitor,
  UserPlus
} from 'lucide-react';

// Type Definitions
type Coach = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  title: string;
  joinDate: Date;
  lastActive: Date;
  totalStudents: number;
  totalEarnings: number;
  rating: number;
  completedSessions: number;
  status: 'active' | 'inactive' | 'suspended';
  specialties: string[];
  totalCourses: number;
  averageSessionDuration: number; // dakika
};

type CoachApplication = {
  id: string;
  fullName: string;
  email: string;
  password: string; // Encrypted in real app
  phone: string;
  specialization: string;
  experienceYears: number;
  education: string;
  certificates: string;
  biography: string;
  motivationLetter: string;
  applicationDate: Date;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
};

type FinancialData = {
  coachId: number;
  coachName: string;
  monthlyEarnings: number;
  totalEarnings: number;
  commission: number; // yüzde
  pendingPayments: number;
  lastPayment: Date;
  paymentMethod: string;
};

type SecurityEvent = {
  id: string;
  type: 'login' | 'failed_login' | 'permission_change' | 'data_access' | 'system_change';
  userId: number;
  userName: string;
  timestamp: Date;
  ip: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
};



type SystemSettings = {
  platformName: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  maxStudentsPerCoach: number;
  commissionRate: number;
  autoApproveContent: boolean;
  emailNotifications: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
};

type GlobalMessage = {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'maintenance' | 'urgent';
  targetAudience: 'all' | 'coaches' | 'students';
  sentDate: Date;
  sentBy: string;
  readCount: number;
  totalRecipients: number;
};

export default function AdminPanel() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [coachApplications, setCoachApplications] = useState<CoachApplication[]>([]);

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    platformName: 'Eylül Akademi',
    maintenanceMode: false,
    registrationEnabled: true,
    maxStudentsPerCoach: 200,
    commissionRate: 15,
    autoApproveContent: false,
    emailNotifications: true,
    backupFrequency: 'daily'
  });
  const [globalMessages, setGlobalMessages] = useState<GlobalMessage[]>([]);

  // Sample data initialization
  useEffect(() => {
    // Sample coaches
    const sampleCoaches: Coach[] = [
    {
      id: 1,
        name: 'Dr. Eylül Büyükkaya',
        email: 'eylul@akademi.com',
        avatar: 'EB',
        title: 'Tıp Eğitimi Uzmanı',
        joinDate: new Date('2024-01-01'),
        lastActive: new Date(),
        totalStudents: 156,
        totalEarnings: 45000,
        rating: 4.9,
        completedSessions: 342,
        status: 'active',
        specialties: ['Anatomi', 'Fizyoloji', 'Patoloji'],
        totalCourses: 12,
        averageSessionDuration: 45
    },
    {
      id: 2,
        name: 'Dr. Mehmet Özkan',
        email: 'mehmet@akademi.com',
        avatar: 'MÖ',
        title: 'Kimya Uzmanı',
        joinDate: new Date('2024-02-15'),
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        totalStudents: 89,
        totalEarnings: 28000,
        rating: 4.7,
        completedSessions: 201,
        status: 'active',
        specialties: ['Organik Kimya', 'Biyokimya'],
        totalCourses: 8,
        averageSessionDuration: 40
      },
      {
        id: 3,
        name: 'Dr. Ayşe Demir',
        email: 'ayse@akademi.com',
        avatar: 'AD',
        title: 'Matematik Uzmanı',
        joinDate: new Date('2024-03-01'),
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
        totalStudents: 67,
        totalEarnings: 19500,
        rating: 4.8,
        completedSessions: 145,
        status: 'inactive',
        specialties: ['Calculus', 'İstatistik'],
        totalCourses: 6,
        averageSessionDuration: 50
      }
    ];

    // Sample financial data
    const sampleFinancialData: FinancialData[] = [
      {
        coachId: 1,
        coachName: 'Dr. Eylül Büyükkaya',
        monthlyEarnings: 12500,
        totalEarnings: 45000,
        commission: 15,
        pendingPayments: 2100,
        lastPayment: new Date('2024-01-25'),
        paymentMethod: 'Banka Havalesi'
      },
      {
        coachId: 2,
        coachName: 'Dr. Mehmet Özkan',
        monthlyEarnings: 8200,
        totalEarnings: 28000,
        commission: 15,
        pendingPayments: 1400,
        lastPayment: new Date('2024-01-23'),
        paymentMethod: 'PayPal'
      },
      {
        coachId: 3,
        coachName: 'Dr. Ayşe Demir',
        monthlyEarnings: 5800,
        totalEarnings: 19500,
        commission: 15,
        pendingPayments: 980,
        lastPayment: new Date('2024-01-20'),
        paymentMethod: 'Banka Havalesi'
      }
    ];

    // Sample security events
    const sampleSecurityEvents: SecurityEvent[] = [
      {
        id: '1',
        type: 'login',
        userId: 1,
        userName: 'Dr. Eylül Büyükkaya',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        ip: '192.168.1.100',
        description: 'Başarılı giriş',
        severity: 'low'
      },
      {
        id: '2',
        type: 'failed_login',
        userId: 2,
        userName: 'Dr. Mehmet Özkan',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        ip: '192.168.1.105',
        description: '3 başarısız giriş denemesi',
        severity: 'medium'
      },
      {
        id: '3',
        type: 'permission_change',
        userId: 1,
        userName: 'Admin',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        ip: '192.168.1.1',
        description: 'Kullanıcı izinleri güncellendi',
        severity: 'high'
      }
    ];



    // Sample global messages
    const sampleGlobalMessages: GlobalMessage[] = [
      {
        id: '1',
        title: 'Sistem Bakımı Duyurusu',
        content: 'Sistem bakımı 15 Şubat 2024 tarihinde yapılacaktır.',
        type: 'maintenance',
        targetAudience: 'all',
        sentDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
        sentBy: 'Admin',
        readCount: 234,
        totalRecipients: 312
      },
      {
        id: '2',
        title: 'Yeni Özellikler',
        content: 'Video oynatıcı sistemi güncellendi. Yeni özellikler eklendi.',
        type: 'announcement',
        targetAudience: 'coaches',
        sentDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
        sentBy: 'Admin',
        readCount: 8,
        totalRecipients: 12
      }
    ];

    // Sample coach applications
    const sampleApplications: CoachApplication[] = [
      {
        id: '1',
        fullName: 'Dr. Can Yılmaz',
        email: 'can.yilmaz@gmail.com',
        password: 'encrypted_password_123',
        phone: '0532 123 45 67',
        specialization: 'Tıp Fakültesi Hazırlık, TUS Koçluğu',
        experienceYears: 5,
        education: 'İstanbul Üniversitesi Tıp Fakültesi - Doktor',
        certificates: 'TUS Birincisi 2019, Eğitmen Sertifikası',
        biography: '5 yıllık tıp eğitimi ve koçluk deneyimi ile öğrencilerin hedeflerine ulaşmalarında yardımcı olmaktayım. Anatomi ve fizyoloji alanlarında uzmanım.',
        motivationLetter: 'Tıp eğitimindeki deneyimimi genç nesille paylaşarak onların başarıya ulaşmalarına katkı sağlamak istiyorum. Öğrencilerin bireysel ihtiyaçlarına göre özelleştirilmiş eğitim planları hazırlayarak maksimum verim almalarını hedefliyorum.',
        applicationDate: new Date('2024-01-28'),
        status: 'pending'
      },
      {
        id: '2',
        fullName: 'Dr. Elif Konak',
        email: 'elif.konak@hotmail.com',
        password: 'encrypted_password_456',
        phone: '0533 987 65 43',
        specialization: 'Kimya Olimpiyatları, YKS Kimya',
        experienceYears: 7,
        education: 'ODTÜ Kimya Mühendisliği - Yüksek Lisans',
        certificates: 'Kimya Olimpiyatları Milli Takım Antrenörü, Pedagojik Formasyon',
        biography: 'Kimya olympiyatlarında milli takım antrenörü olarak çalıştım. Öğrencilerin kimya sevgisini artırmak ve başarıya ulaşmalarını sağlamak en büyük motivasyonum.',
        motivationLetter: 'Kimyayı sadece bir ders olarak değil, hayatın her alanında karşımıza çıkan eğlenceli bir bilim dalı olarak öğretmeyi hedefliyorum. Öğrencilerin analitik düşünme becerilerini geliştirerek hem akademik hem de kişisel gelişimlerine katkı sağlamak istiyorum.',
        applicationDate: new Date('2024-01-27'),
        status: 'pending'
      },
      {
        id: '3',
        fullName: 'Dr. Ahmet Kaya',
        email: 'ahmet.kaya@outlook.com',
        password: 'encrypted_password_789',
        phone: '0534 555 44 33',
        specialization: 'Matematik, YKS AYT Matematik',
        experienceYears: 3,
        education: 'Boğaziçi Üniversitesi Matematik - Lisans',
        certificates: 'Online Eğitim Uzmanlığı Sertifikası',
        biography: 'Matematik alanında 3 yıllık koçluk deneyimim var. Öğrencilerin matematik korkusunu yenmelerine ve konuları etkili şekilde öğrenmelerine yardımcı oluyorum.',
        motivationLetter: 'Matematiğin sadece formüllerden ibaret olmadığını, mantık ve problem çözme becerisi geliştiren güzel bir alan olduğunu öğrencilere göstermek istiyorum. Her öğrencinin kendi hızında öğrenebileceğine inanıyorum.',
        applicationDate: new Date('2024-01-25'),
        status: 'approved'
      }
    ];

    // Load real applications from localStorage
    const savedApplications = localStorage.getItem('coachApplications');
    const realApplications = savedApplications ? JSON.parse(savedApplications) : sampleApplications;

    setCoaches(sampleCoaches);
    setFinancialData(sampleFinancialData);
    setSecurityEvents(sampleSecurityEvents);
    setGlobalMessages(sampleGlobalMessages);
    setCoachApplications(realApplications);
  }, []);

  // Navigation items
  const navigationItems = [
    { 
      id: 'dashboard', 
      name: 'Süper Dashboard', 
      icon: Monitor, 
      color: 'from-purple-500 to-indigo-600' 
    },
    { 
      id: 'applications', 
      name: 'Koç Başvuruları', 
      icon: UserCheck, 
      color: 'from-orange-500 to-red-600' 
    },
    { 
      id: 'coaches', 
      name: 'Koç Yönetimi', 
      icon: Users, 
      color: 'from-blue-500 to-cyan-600' 
    },
    { 
      id: 'finance', 
      name: 'Platform Finansal', 
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-600' 
    },
    { 
      id: 'security', 
      name: 'Sistem Güvenliği', 
      icon: Shield, 
      color: 'from-red-500 to-pink-600' 
    },
    { 
      id: 'analytics', 
      name: 'Platform Analytics', 
      icon: BarChart3, 
      color: 'from-yellow-500 to-orange-600' 
    },
    { 
      id: 'messaging', 
      name: 'Global Mesajlaşma', 
      icon: MessageSquare, 
      color: 'from-indigo-500 to-purple-600' 
    },
    { 
      id: 'settings', 
      name: 'Sistem Ayarları', 
      icon: Settings, 
      color: 'from-gray-500 to-slate-600' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Crown size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Süper Admin Panel</h1>
                <p className="text-gray-600">Eylül Akademi Platform Yönetimi</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Hoş geldiniz</p>
                <p className="font-semibold text-gray-900">Platform Admin</p>
                </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">PA</span>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveModule(item.id)}
                  className={`relative p-4 rounded-xl transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon size={24} className="mx-auto mb-2" />
                  <p className="text-xs font-medium text-center">{item.name}</p>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 rounded-xl"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeModule === 'dashboard' && (
            <DashboardModule 
              coaches={coaches} 
              financialData={financialData} 
              securityEvents={securityEvents}
            />
          )}
          {activeModule === 'applications' && (
            <CoachApplicationsModule 
              applications={coachApplications} 
              setApplications={setCoachApplications} 
            />
          )}
          {activeModule === 'coaches' && (
            <CoachManagementModule 
              coaches={coaches} 
              setCoaches={setCoaches}
              applications={coachApplications}
              setApplications={setCoachApplications}
            />
          )}
          {activeModule === 'finance' && (
            <FinanceModule financialData={financialData} setFinancialData={setFinancialData} />
          )}
          {activeModule === 'security' && (
            <SecurityModule securityEvents={securityEvents} setSecurityEvents={setSecurityEvents} />
          )}
          {activeModule === 'analytics' && (
            <AnalyticsModule coaches={coaches} />
          )}
          {activeModule === 'messaging' && (
            <GlobalMessagingModule globalMessages={globalMessages} setGlobalMessages={setGlobalMessages} />
          )}
          {activeModule === 'settings' && (
            <SystemSettingsModule systemSettings={systemSettings} setSystemSettings={setSystemSettings} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Dashboard Module
function DashboardModule({ 
  coaches, 
  financialData, 
  securityEvents
}: { 
  coaches: Coach[]; 
  financialData: FinancialData[];
  securityEvents: SecurityEvent[];
}) {
  const totalEarnings = financialData.reduce((sum, item) => sum + item.totalEarnings, 0);
  const totalStudents = coaches.reduce((sum, coach) => sum + coach.totalStudents, 0);
  const averageRating = coaches.reduce((sum, coach) => sum + coach.rating, 0) / coaches.length;

  const stats = [
    { 
      title: 'Toplam Koç', 
      value: coaches.length, 
      change: '+2', 
      trend: 'up', 
      icon: Users, 
      color: 'from-blue-500 to-cyan-600' 
    },
    { 
      title: 'Toplam Öğrenci', 
      value: totalStudents, 
      change: '+12', 
      trend: 'up', 
      icon: Target, 
      color: 'from-green-500 to-emerald-600' 
    },
    { 
      title: 'Platform Geliri', 
      value: `₺${totalEarnings.toLocaleString()}`, 
      change: '+8.2%', 
      trend: 'up', 
      icon: DollarSign, 
      color: 'from-yellow-500 to-orange-600' 
    },
    { 
      title: 'Ortalama Rating', 
      value: averageRating.toFixed(1), 
      change: '+0.1', 
      trend: 'up', 
      icon: Star, 
      color: 'from-purple-500 to-indigo-600' 
    }
  ];

  const recentActivities = [
    { 
      type: 'coach_joined', 
      message: 'Dr. Mehmet Özkan platforma katıldı', 
      time: '2 saat önce',
      icon: UserCheck,
      color: 'text-green-600'
    },
    { 
      type: 'payment', 
      message: '₺2,500 komisyon ödemesi alındı', 
      time: '4 saat önce',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    { 
      type: 'system', 
      message: 'Sistem performansı optimize edildi', 
      time: '6 saat önce',
      icon: Zap,
      color: 'text-orange-600'
    },
    { 
      type: 'security', 
      message: 'Güvenlik taraması tamamlandı', 
      time: '8 saat önce',
      icon: Shield,
      color: 'text-purple-600'
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
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
          <motion.div
              key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon size={24} className="text-white" />
              </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon size={16} />
                  <span>{stat.change}</span>
              </div>
            </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
          </motion.div>
          );
        })}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Son Aktiviteler</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
                    <Icon size={16} />
                </div>
                <div className="flex-1">
                    <p className="text-gray-900 text-sm">{activity.message}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                </div>
              </div>
              );
            })}
          </div>
        </motion.div>

        {/* Platform Health */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Platform Durumu</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <div className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <span className="text-gray-900">Sistem Durumu</span>
                </div>
              <span className="text-green-600 font-medium">Online</span>
                </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-yellow-600" />
                <span className="text-gray-900">Platform Uptime</span>
              </div>
              <span className="text-yellow-600 font-medium">99.9%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <div className="flex items-center gap-3">
                <Activity size={20} className="text-blue-600" />
                <span className="text-gray-900">Server Load</span>
              </div>
              <span className="text-blue-600 font-medium">23%</span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
              <div className="flex items-center gap-3">
                <Database size={20} className="text-purple-600" />
                <span className="text-gray-900">Veritabanı</span>
              </div>
              <span className="text-purple-600 font-medium">Sağlıklı</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Coach Management Module
function CoachManagementModule({ 
  coaches, 
  setCoaches, 
  applications, 
  setApplications 
}: { 
  coaches: Coach[]; 
  setCoaches: (coaches: Coach[]) => void;
  applications: CoachApplication[];
  setApplications: (applications: CoachApplication[]) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [showPendingApplications, setShowPendingApplications] = useState(false);
  const [selectedApplicationForDetails, setSelectedApplicationForDetails] = useState<CoachApplication | null>(null);

  const filteredCoaches = coaches.filter(coach => {
    const matchesSearch = coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coach.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || coach.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateCoachStatus = (coachId: number, newStatus: 'active' | 'inactive' | 'suspended') => {
    setCoaches(coaches.map(coach => 
      coach.id === coachId ? { ...coach, status: newStatus } : coach
    ));
  };

  const handleApproveApplication = (applicationId: string) => {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;

    // Create new coach from approved application
    const newCoach: Coach = {
      id: Date.now(),
      name: application.fullName,
      email: application.email,
      avatar: application.fullName.split(' ').map(n => n[0]).join('').slice(0, 2),
      title: application.specialization || 'Uzman Koç',
      joinDate: new Date(),
      lastActive: new Date(),
      totalStudents: 0,
      totalEarnings: 0,
      rating: 5.0,
      completedSessions: 0,
      status: 'active',
      specialties: application.specialization ? [application.specialization] : [],
      totalCourses: 0,
      averageSessionDuration: 45
    };

    // Add coach to coaches list
    setCoaches([...coaches, newCoach]);

    // Update application status
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status: 'approved' as const } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('coachApplications', JSON.stringify(updatedApplications));

    // Save coach credentials for login (mock auth system)
    const savedCredentials = JSON.parse(localStorage.getItem('coachCredentials') || '{}');
    savedCredentials[application.email] = {
      password: application.password,
      coachId: newCoach.id,
      approved: true
    };
    localStorage.setItem('coachCredentials', JSON.stringify(savedCredentials));
  };

  const handleRejectApplication = (applicationId: string, reason: string) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status: 'rejected' as const, rejectionReason: reason } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('coachApplications', JSON.stringify(updatedApplications));
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header & Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Koç Yönetimi</h2>
            <p className="text-gray-600">{coaches.length} koç kayıtlı • {pendingApplications.length} başvuru bekliyor</p>
          </div>
          
          {pendingApplications.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPendingApplications(true)}
              className="relative px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="font-semibold">Onayda Bekleyen Koçlar ({pendingApplications.length})</span>
              </div>
            </motion.button>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Koç ara..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">İnaktif</option>
            <option value="suspended">Askıya Alınmış</option>
          </select>
          </div>
        </div>



      {/* Coaches List */}
            <div className="space-y-4">
        {filteredCoaches.map(coach => (
                <motion.div
            key={coach.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{coach.avatar}</span>
                      </div>
                      <div>
                  <h3 className="text-lg font-bold text-gray-900">{coach.name}</h3>
                  <p className="text-gray-600">{coach.title}</p>
                  <p className="text-sm text-gray-500">{coach.email}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-500">{coach.totalStudents} öğrenci</span>
                    <span className="text-sm text-gray-500">₺{coach.totalEarnings.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">⭐ {coach.rating}</span>
                        </div>
                      </div>
                    </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={coach.status}
                  onChange={(e) => updateCoachStatus(coach.id, e.target.value as any)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    coach.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' :
                    coach.status === 'inactive' ? 'bg-gray-50 text-gray-700 border-gray-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">İnaktif</option>
                  <option value="suspended">Askıya Al</option>
                </select>
                
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                  <Edit size={16} />
                        </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pending Applications Modal */}
      <AnimatePresence>
        {showPendingApplications && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPendingApplications(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Onayda Bekleyen Koç Başvuruları</h3>
                <button
                  onClick={() => setShowPendingApplications(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {pendingApplications.map(application => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">
                              {application.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{application.fullName}</h4>
                            <p className="text-gray-600">{application.email}</p>
                            <p className="text-sm text-gray-500">{application.specialization}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Deneyim</p>
                            <p className="font-semibold text-gray-900">{application.experienceYears} yıl</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Telefon</p>
                            <p className="font-semibold text-gray-900">{application.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Başvuru Tarihi</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(application.applicationDate).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Eğitim Durumu</p>
                          <p className="text-gray-900 bg-white p-3 rounded-lg text-sm border">
                            {application.education}
                          </p>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Motivasyon Mektubu</p>
                          <p className="text-gray-900 bg-white p-3 rounded-lg text-sm border max-h-24 overflow-y-auto">
                            {application.motivationLetter}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setSelectedApplicationForDetails(application)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                        >
                          📋 Detaylar
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            handleApproveApplication(application.id);
                            if (pendingApplications.length === 1) {
                              setShowPendingApplications(false);
                            }
                          }}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                        >
                          ✅ Onayla
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => {
                            const reason = prompt('Reddetme sebebi:');
                            if (reason) {
                              handleRejectApplication(application.id, reason);
                              if (pendingApplications.length === 1) {
                                setShowPendingApplications(false);
                              }
                            }
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                        >
                          ❌ Reddet
                        </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

                {pendingApplications.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <p className="text-gray-500">Tüm başvurular değerlendirildi!</p>
            </div>
          )}
      </div>
    </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Details Modal */}
      <AnimatePresence>
        {selectedApplicationForDetails && (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedApplicationForDetails(null)}
          >
                <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">
                        {selectedApplicationForDetails.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                      </div>
                      <div>
                      <h3 className="text-2xl font-bold text-gray-900">Koç Başvuru Detayları</h3>
                      <p className="text-gray-600">{selectedApplicationForDetails.fullName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedApplicationForDetails(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    Kişisel Bilgiler
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Ad Soyad</label>
                      <p className="text-gray-900 font-semibold">{selectedApplicationForDetails.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">E-posta</label>
                      <p className="text-gray-900 font-semibold">{selectedApplicationForDetails.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Telefon</label>
                      <p className="text-gray-900 font-semibold">{selectedApplicationForDetails.phone || 'Belirtilmemiş'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Başvuru Tarihi</label>
                      <p className="text-gray-900 font-semibold">
                        {new Date(selectedApplicationForDetails.applicationDate).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                        </p>
                      </div>
                    </div>
                    </div>

                {/* Professional Information */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">💼</span>
                  </div>
                    Mesleki Bilgiler
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Uzmanlık Alanı</label>
                      <p className="text-gray-900 font-semibold">{selectedApplicationForDetails.specialization}</p>
            </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Deneyim Yılı</label>
                      <p className="text-gray-900 font-semibold">{selectedApplicationForDetails.experienceYears} yıl</p>
                    </div>
                  </div>
                </div>

                {/* Education Information */}
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">🎓</span>
                    </div>
                    Eğitim Bilgileri
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Eğitim Durumu</label>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-900 leading-relaxed">{selectedApplicationForDetails.education}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Sertifikalar</label>
                      <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-900 leading-relaxed">
                          {selectedApplicationForDetails.certificates || 'Sertifika bilgisi belirtilmemiş'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Statement */}
                <div className="bg-orange-50 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">✍️</span>
                    </div>
                    Kişisel Açıklamalar
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Kısa Biyografi</label>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 max-h-32 overflow-y-auto">
                        <p className="text-gray-900 leading-relaxed">{selectedApplicationForDetails.biography}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Motivasyon Mektubu</label>
                      <div className="bg-white p-4 rounded-lg border border-orange-200 max-h-40 overflow-y-auto">
                        <p className="text-gray-900 leading-relaxed">{selectedApplicationForDetails.motivationLetter}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      handleApproveApplication(selectedApplicationForDetails.id);
                      setSelectedApplicationForDetails(null);
                      if (pendingApplications.length === 1) {
                        setShowPendingApplications(false);
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={20} />
                    Başvuruyu Onayla
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      const reason = prompt('Reddetme sebebi:');
                      if (reason) {
                        handleRejectApplication(selectedApplicationForDetails.id, reason);
                        setSelectedApplicationForDetails(null);
                        if (pendingApplications.length === 1) {
                          setShowPendingApplications(false);
                        }
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <X size={20} />
                    Başvuruyu Reddet
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedApplicationForDetails(null)}
                    className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Kapat
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

// Finance Module
function FinanceModule({ financialData, setFinancialData }: { financialData: FinancialData[]; setFinancialData: (data: FinancialData[]) => void }) {
  const totalEarnings = financialData.reduce((sum, item) => sum + item.totalEarnings, 0);
  const totalPending = financialData.reduce((sum, item) => sum + item.pendingPayments, 0);
  const totalCommission = financialData.reduce((sum, item) => sum + (item.totalEarnings * item.commission / 100), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <DollarSign size={24} className="text-green-600" />
          </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Toplam Gelir</h3>
              <p className="text-2xl font-bold text-green-600">₺{totalEarnings.toLocaleString()}</p>
          </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-100 rounded-xl">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Bekleyen Ödemeler</h3>
              <p className="text-2xl font-bold text-yellow-600">₺{totalPending.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Komisyon Geliri</h3>
              <p className="text-2xl font-bold text-purple-600">₺{totalCommission.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Koç Finansal Durumu</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Koç</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Aylık Kazanç</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Toplam Kazanç</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Komisyon</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Bekleyen</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {financialData.map(item => (
                <tr key={item.coachId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{item.coachName}</td>
                  <td className="py-3 px-4 text-gray-600">₺{item.monthlyEarnings.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">₺{item.totalEarnings.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">%{item.commission}</td>
                  <td className="py-3 px-4 text-yellow-600 font-medium">₺{item.pendingPayments.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                    >
                      Ödeme Yap
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// Coach Applications Module
function CoachApplicationsModule({ 
  applications, 
  setApplications 
}: { 
  applications: CoachApplication[]; 
  setApplications: (applications: CoachApplication[]) => void 
}) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<CoachApplication | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const filteredApplications = applications.filter(app => 
    statusFilter === 'all' || app.status === statusFilter
  );

  const handleApprove = (id: string) => {
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, status: 'approved' as const } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('coachApplications', JSON.stringify(updatedApplications));
  };

  const handleReject = (id: string, reason: string) => {
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, status: 'rejected' as const, rejectionReason: reason } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem('coachApplications', JSON.stringify(updatedApplications));
    setRejectionReason('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Beklemede';
      case 'approved': return 'Onaylandı';
      case 'rejected': return 'Reddedildi';
      default: return status;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Koç Başvuruları</h2>
            <p className="text-gray-600">Platformumuza koç olmak isteyen adayların başvuruları</p>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="all">Tüm Başvurular</option>
            <option value="pending">Beklemede</option>
            <option value="approved">Onaylandı</option>
            <option value="rejected">Reddedildi</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-yellow-600" />
              <div>
                <p className="text-sm text-yellow-600">Bekleyen</p>
                <p className="text-lg font-bold text-yellow-700">
                  {applications.filter(a => a.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
              <div>
                <p className="text-sm text-green-600">Onaylanan</p>
                <p className="text-lg font-bold text-green-700">
                  {applications.filter(a => a.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-center gap-3">
              <X size={20} className="text-red-600" />
              <div>
                <p className="text-sm text-red-600">Reddedilen</p>
                <p className="text-lg font-bold text-red-700">
                  {applications.filter(a => a.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map(application => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">
                      {application.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{application.fullName}</h3>
                    <p className="text-gray-600">{application.email}</p>
                    <p className="text-sm text-gray-500">{application.specialization}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                    {getStatusText(application.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Deneyim</p>
                    <p className="font-semibold text-gray-900">{application.experienceYears} yıl</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telefon</p>
                    <p className="font-semibold text-gray-900">{application.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Başvuru Tarihi</p>
                    <p className="font-semibold text-gray-900">
                      {application.applicationDate.toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Eğitim Durumu</p>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg text-sm">
                    {application.education}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedApplication(application);
                    setShowDetailModal(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Detayları Gör
                </motion.button>

                {application.status === 'pending' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleApprove(application.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                    >
                      Onayla
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => {
                        const reason = prompt('Reddetme sebebi:');
                        if (reason) handleReject(application.id, reason);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                    >
                      Reddet
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedApplication && (
          <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Başvuru Detayları</h2>
            <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
            >
                  <X size={24} />
            </button>
        </div>

              <div className="space-y-6">
                {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{selectedApplication.fullName}</p>
            </div>
            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deneyim</label>
                    <p className="p-3 bg-gray-50 rounded-lg">{selectedApplication.experienceYears} yıl</p>
            </div>
          </div>

          <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Uzmanlık Alanı</label>
                  <p className="p-3 bg-gray-50 rounded-lg">{selectedApplication.specialization}</p>
          </div>

            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eğitim Durumu</label>
                  <p className="p-3 bg-gray-50 rounded-lg">{selectedApplication.education}</p>
            </div>

            <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sertifikalar</label>
                  <p className="p-3 bg-gray-50 rounded-lg">{selectedApplication.certificates}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kısa Özgeçmiş</label>
                  <p className="p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">{selectedApplication.biography}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Motivasyon Mektubu</label>
                  <p className="p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">{selectedApplication.motivationLetter}</p>
                </div>

                {selectedApplication.status === 'rejected' && selectedApplication.rejectionReason && (
                  <div>
                    <label className="block text-sm font-medium text-red-700 mb-2">Reddetme Sebebi</label>
                    <p className="p-3 bg-red-50 rounded-lg text-red-700">{selectedApplication.rejectionReason}</p>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedApplication.status === 'pending' && (
                  <div className="flex gap-4 pt-4 border-t">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        handleApprove(selectedApplication.id);
                        setShowDetailModal(false);
                      }}
                      className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                    >
                      Başvuruyu Onayla
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        const reason = prompt('Reddetme sebebi:');
                        if (reason) {
                          handleReject(selectedApplication.id, reason);
                          setShowDetailModal(false);
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                    >
                      Başvuruyu Reddet
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

// Security Module
function SecurityModule({ securityEvents, setSecurityEvents }: { securityEvents: SecurityEvent[]; setSecurityEvents: (events: SecurityEvent[]) => void }) {
  const [severityFilter, setSeverityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredEvents = securityEvents.filter(event => 
    severityFilter === 'all' || event.severity === severityFilter
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return UserCheck;
      case 'failed_login': return UserX;
      case 'permission_change': return Shield;
      case 'data_access': return Database;
      case 'system_change': return Settings;
      default: return AlertTriangle;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Security Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center justify-between mb-6">
            <div>
            <h2 className="text-2xl font-bold text-gray-900">Sistem Güvenliği</h2>
            <p className="text-gray-600">Güvenlik olayları ve sistem logları</p>
          </div>
          
              <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Tüm Seviyeler</option>
            <option value="high">Yüksek Risk</option>
            <option value="medium">Orta Risk</option>
            <option value="low">Düşük Risk</option>
              </select>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-red-600" />
              <div>
                <p className="text-sm text-red-600">Yüksek Risk</p>
                <p className="text-lg font-bold text-red-700">
                  {securityEvents.filter(e => e.severity === 'high').length}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-yellow-600" />
            <div>
                <p className="text-sm text-yellow-600">Orta Risk</p>
                <p className="text-lg font-bold text-yellow-700">
                  {securityEvents.filter(e => e.severity === 'medium').length}
                </p>
            </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
            <div>
                <p className="text-sm text-green-600">Düşük Risk</p>
                <p className="text-lg font-bold text-green-700">
                  {securityEvents.filter(e => e.severity === 'low').length}
                </p>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Events */}
      <div className="space-y-3">
        {filteredEvents.map(event => {
          const Icon = getEventIcon(event.type);
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Icon size={20} className="text-gray-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
            <div>
                      <h4 className="font-semibold text-gray-900">{event.userName}</h4>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{event.ip}</span>
                        <span className="text-xs text-gray-500">
                          {event.timestamp.toLocaleString('tr-TR')}
                        </span>
            </div>
          </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(event.severity)}`}>
                      {event.severity === 'high' ? 'Yüksek' : event.severity === 'medium' ? 'Orta' : 'Düşük'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Analytics Module
function AnalyticsModule({ coaches }: { coaches: Coach[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Analytics</h2>
        
        {/* Coach Performance */}
        <div className="space-y-4">
          {coaches.map(coach => (
            <div key={coach.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{coach.avatar}</span>
                  </div>
          <div>
                    <h4 className="font-semibold text-gray-900">{coach.name}</h4>
                    <p className="text-sm text-gray-600">{coach.title}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">⭐ {coach.rating}</p>
                  <p className="text-sm text-gray-600">{coach.completedSessions} seans</p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Öğrenci</p>
                  <p className="text-lg font-bold text-blue-600">{coach.totalStudents}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kazanç</p>
                  <p className="text-lg font-bold text-green-600">₺{coach.totalEarnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kurs</p>
                  <p className="text-lg font-bold text-purple-600">{coach.totalCourses}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ort. Süre</p>
                  <p className="text-lg font-bold text-orange-600">{coach.averageSessionDuration}dk</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}



// Global Messaging Module
function GlobalMessagingModule({ globalMessages, setGlobalMessages }: { globalMessages: GlobalMessage[]; setGlobalMessages: (messages: GlobalMessage[]) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: '',
    content: '',
    type: 'announcement' as 'announcement' | 'maintenance' | 'urgent',
    targetAudience: 'all' as 'all' | 'coaches' | 'students'
  });

  const sendMessage = () => {
    const message: GlobalMessage = {
      id: Date.now().toString(),
      ...newMessage,
      sentDate: new Date(),
      sentBy: 'Admin',
      readCount: 0,
      totalRecipients: newMessage.targetAudience === 'all' ? 312 : 
                      newMessage.targetAudience === 'coaches' ? 12 : 300
    };
    
    setGlobalMessages([message, ...globalMessages]);
    setShowModal(false);
    setNewMessage({ title: '', content: '', type: 'announcement', targetAudience: 'all' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Global Mesajlaşma</h2>
            <p className="text-gray-600">Tüm kullanıcılara duyuru gönder</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <MessageSquare size={20} className="inline mr-2" />
            Yeni Duyuru
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-4">
        {globalMessages.map(message => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{message.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    message.type === 'urgent' ? 'bg-red-100 text-red-700' :
                    message.type === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {message.type === 'urgent' ? 'Acil' :
                     message.type === 'maintenance' ? 'Bakım' : 'Duyuru'}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{message.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{message.sentDate.toLocaleDateString('tr-TR')}</span>
                  <span>{message.targetAudience === 'all' ? 'Tüm Kullanıcılar' : 
                        message.targetAudience === 'coaches' ? 'Koçlar' : 'Öğrenciler'}</span>
                  <span>{message.readCount}/{message.totalRecipients} okundu</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Message Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Yeni Duyuru Gönder</h3>
            
            <div className="space-y-4">
            <input
              type="text"
                value={newMessage.title}
                onChange={(e) => setNewMessage({...newMessage, title: e.target.value})}
                placeholder="Başlık"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
              
              <textarea
                value={newMessage.content}
                onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                placeholder="Mesaj içeriği"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newMessage.type}
                  onChange={(e) => setNewMessage({...newMessage, type: e.target.value as any})}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                >
                  <option value="announcement">Duyuru</option>
                  <option value="maintenance">Bakım</option>
                  <option value="urgent">Acil</option>
                </select>
                
                <select
                  value={newMessage.targetAudience}
                  onChange={(e) => setNewMessage({...newMessage, targetAudience: e.target.value as any})}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Tüm Kullanıcılar</option>
                  <option value="coaches">Sadece Koçlar</option>
                  <option value="students">Sadece Öğrenciler</option>
                </select>
              </div>
          </div>

            <div className="flex gap-3 mt-6">
            <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
            >
              İptal
            </button>
            <button
                onClick={sendMessage}
                className="flex-1 px-4 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
            >
                Gönder
            </button>
          </div>
      </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

// System Settings Module
function SystemSettingsModule({ systemSettings, setSystemSettings }: { systemSettings: SystemSettings; setSystemSettings: (settings: SystemSettings) => void }) {
  const updateSetting = (key: keyof SystemSettings, value: any) => {
    setSystemSettings({
      ...systemSettings,
      [key]: value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sistem Ayarları</h2>
        
        <div className="space-y-6">
          {/* Platform Settings */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Ayarları</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Platform Adı</label>
                <input
                  type="text"
                  value={systemSettings.platformName}
                  onChange={(e) => updateSetting('platformName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
            </div>
              
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Koç Başına Max Öğrenci</label>
                <input
                  type="number"
                  value={systemSettings.maxStudentsPerCoach}
                  onChange={(e) => updateSetting('maxStudentsPerCoach', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Komisyon Oranı (%)</label>
                <input
                  type="number"
                  value={systemSettings.commissionRate}
                  onChange={(e) => updateSetting('commissionRate', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Toggle Settings */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sistem Kontrolleri</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Bakım Modu</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.maintenanceMode}
                    onChange={(e) => updateSetting('maintenanceMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Yeni Kayıtlar</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.registrationEnabled}
                    onChange={(e) => updateSetting('registrationEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Otomatik İçerik Onayı</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.autoApproveContent}
                    onChange={(e) => updateSetting('autoApproveContent', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">E-posta Bildirimleri</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={systemSettings.emailNotifications}
                    onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Backup Settings */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yedekleme Ayarları</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yedekleme Sıklığı</label>
              <select
                value={systemSettings.backupFrequency}
                onChange={(e) => updateSetting('backupFrequency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Günlük</option>
                <option value="weekly">Haftalık</option>
                <option value="monthly">Aylık</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Ayarları Kaydet
          </motion.button>
          </div>
        </div>
    </motion.div>
  );
} 