'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  CogIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { useCourses, Course } from '../../contexts/CoursesContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  joinDate: string;
  lastActivity: string;
  coursesEnrolled: number;
  status: 'active' | 'inactive';
}

export default function AdminPage() {
  const { courses, addCourse, updateCourse, deleteCourse, isLoading } = useCourses();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const sampleUsers: User[] = [
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet@example.com",
      role: 'student',
      joinDate: "2024-01-15",
      lastActivity: "2024-01-30",
      coursesEnrolled: 3,
      status: 'active'
    },
    {
      id: 2,
      name: "Dr. Mehmet Özkan",
      email: "mehmet@example.com",
      role: 'instructor',
      joinDate: "2024-01-10",
      lastActivity: "2024-01-30",
      coursesEnrolled: 0,
      status: 'active'
    }
  ];

  useEffect(() => {
    // Simulate API calls for users only
    setTimeout(() => {
      setUsers(sampleUsers);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
    { id: 'courses', name: 'Kurslar', icon: BookOpenIcon },
    { id: 'users', name: 'Kullanıcılar', icon: UserGroupIcon },
    { id: 'settings', name: 'Ayarlar', icon: CogIcon }
  ];

  const handleDeleteCourse = (id: number) => {
    deleteCourse(id);
    setShowDeleteConfirm(null);
  };

  const handleSaveCourse = (courseData: any) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, courseData);
    } else {
      addCourse(courseData);
    }
    setShowCourseModal(false);
    setEditingCourse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8fdbd6] via-[#a8e6e3] to-[#b8ebe8] pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Paneli</h1>
                <p className="text-gray-600">Eylül Büyükkaya Akademisi yönetim paneli</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Hoş geldiniz</p>
                  <p className="font-semibold text-gray-900">Admin User</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-2 shadow-xl">
            <div className="flex space-x-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#349e97] to-[#2a7f77] text-white shadow-lg'
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <DashboardContent courses={courses} users={users} isLoading={isLoading} />}
          {activeTab === 'courses' && (
            <CoursesContent 
              courses={courses} 
              onEdit={(course) => {
                setEditingCourse(course);
                setShowCourseModal(true);
              }}
              onDelete={(id) => setShowDeleteConfirm(id)}
              onAdd={() => setShowCourseModal(true)}
              isLoading={isLoading}
            />
          )}
          {activeTab === 'users' && <UsersContent users={users} isLoading={isLoading} />}
          {activeTab === 'settings' && <SettingsContent />}
        </AnimatePresence>

        {/* Course Modal */}
        <CourseModal
          isOpen={showCourseModal}
          onClose={() => {
            setShowCourseModal(false);
            setEditingCourse(null);
          }}
          onSave={handleSaveCourse}
          course={editingCourse}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteConfirm !== null}
          onClose={() => setShowDeleteConfirm(null)}
          onConfirm={() => showDeleteConfirm && handleDeleteCourse(showDeleteConfirm)}
          courseName={courses.find(c => c.id === showDeleteConfirm)?.title || ''}
        />
      </div>
    </div>
  );
}

// Dashboard Content Component
function DashboardContent({ courses, users, isLoading }: { courses: Course[]; users: User[]; isLoading: boolean }) {
  const stats = [
    { name: 'Toplam Kurs', value: courses.length, icon: BookOpenIcon, color: 'from-blue-500 to-cyan-600' },
    { name: 'Aktif Öğrenci', value: users.filter(u => u.role === 'student').length, icon: UserGroupIcon, color: 'from-green-500 to-emerald-600' },
    { name: 'Eğitmen', value: users.filter(u => u.role === 'instructor').length, icon: UserGroupIcon, color: 'from-purple-500 to-indigo-600' },
    { name: 'Toplam Gelir', value: '₺125.450', icon: ChartBarIcon, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? '...' : stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Son Eklenen Kurslar</h3>
          <div className="space-y-4">
            {courses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-[#349e97] to-[#2a7f77] rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{course.title}</p>
                  <p className="text-sm text-gray-600">{course.instructor}</p>
                </div>
                <span className="text-[#349e97] font-semibold">₺{course.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Yeni Kullanıcılar</h3>
          <div className="space-y-4">
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.role === 'student' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'instructor' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Courses Content Component
function CoursesContent({ 
  courses, 
  onEdit, 
  onDelete, 
  onAdd, 
  isLoading 
}: { 
  courses: Course[]; 
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Kurs Yönetimi</h2>
            <motion.button
              onClick={onAdd}
              className="flex items-center gap-2 bg-gradient-to-r from-[#349e97] to-[#2a7f77] text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="h-5 w-5" />
              Yeni Kurs Ekle
            </motion.button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white/50 h-20 rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  className="bg-white/50 rounded-xl p-4 border border-white/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#349e97] to-[#2a7f77] rounded-lg flex items-center justify-center">
                        <BookOpenIcon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                        <p className="text-gray-600">{course.instructor} • {course.category}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">{course.students} öğrenci</span>
                          <span className="text-sm text-gray-500">{course.lessons} ders</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.status === 'active' ? 'bg-green-100 text-green-800' :
                            course.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-[#349e97]">₺{course.price}</span>
                      <div className="flex items-center gap-1 ml-4">
                        <motion.button
                          onClick={() => onEdit(course)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <EyeIcon className="h-5 w-5" />
                        </motion.button>
                        <motion.button
                          onClick={() => onDelete(course.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Users Content Component
function UsersContent({ users, isLoading }: { users: User[]; isLoading: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h2>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white/50 h-16 rounded-xl"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  className="bg-white/50 rounded-xl p-4 border border-white/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">
                          Katılım: {user.joinDate} • Son aktivite: {user.lastActivity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === 'student' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'instructor' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {user.role}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Settings Content Component
function SettingsContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sistem Ayarları</h2>
        <div className="space-y-6">
          <div className="bg-white/50 rounded-xl p-4 border border-white/30">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Genel Ayarlar</h3>
            <p className="text-gray-600">Site genelindeki ayarları yönetin.</p>
          </div>
          <div className="bg-white/50 rounded-xl p-4 border border-white/30">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ödeme Ayarları</h3>
            <p className="text-gray-600">Ödeme yöntemlerini ve fiyatlandırmayı ayarlayın.</p>
          </div>
          <div className="bg-white/50 rounded-xl p-4 border border-white/30">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">E-posta Ayarları</h3>
            <p className="text-gray-600">Bildirim e-postalarını yapılandırın.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Course Modal Component
function CourseModal({ 
  isOpen, 
  onClose, 
  onSave, 
  course 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (data: any) => void; 
  course: Course | null;
}) {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    instructor: string;
    duration: string;
    level: 'Başlangıç' | 'Orta' | 'İleri';
    category: string;
    price: number;
    lessons: number;
    startDate: string;
    featured: boolean;
    status: 'active' | 'draft' | 'archived';
  }>({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Başlangıç',
    category: '',
    price: 0,
    lessons: 0,
    startDate: '',
    featured: false,
    status: 'draft'
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        duration: course.duration,
        level: course.level,
        category: course.category,
        price: course.price,
        lessons: course.lessons,
        startDate: course.startDate,
        featured: course.featured,
        status: course.status
      });
    } else {
      setFormData({
        title: '',
        description: '',
        instructor: '',
        duration: '',
        level: 'Başlangıç',
        category: '',
        price: 0,
        lessons: 0,
        startDate: '',
        featured: false,
        status: 'draft'
      });
    }
  }, [course, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {course ? 'Kursu Düzenle' : 'Yeni Kurs Ekle'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kurs Başlığı</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Eğitmen</label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seviye</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as 'Başlangıç' | 'Orta' | 'İleri' })}
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
              >
                <option value="Başlangıç">Başlangıç</option>
                <option value="Orta">Orta</option>
                <option value="İleri">İleri</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'draft' | 'archived' })}
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
              >
                <option value="draft">Taslak</option>
                <option value="active">Aktif</option>
                <option value="archived">Arşivlenmiş</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Süre</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="örn: 8 Hafta"
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ders Sayısı</label>
              <input
                type="number"
                value={formData.lessons}
                onChange={(e) => setFormData({ ...formData, lessons: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat (₺)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Başlangıç Tarihi</label>
            <input
              type="text"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              placeholder="örn: 15 Şubat 2024"
              className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 text-[#349e97] border-gray-300 rounded focus:ring-[#349e97]"
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Öne çıkan kurs olarak işaretle
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-colors duration-300"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#349e97] to-[#2a7f77] text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              {course ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  courseName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  courseName: string;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Kursu Sil</h3>
              <p className="text-gray-600">Bu işlem geri alınamaz</p>
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">
            <span className="font-semibold">"{courseName}"</span> kursunu silmek istediğinizden emin misiniz?
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              İptal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Sil
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 