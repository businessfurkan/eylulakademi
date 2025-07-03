'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  ClockIcon, 
  UserGroupIcon, 
  StarIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import { useCourses, Course } from '../../contexts/CoursesContext';
import Link from 'next/link';

export default function CoursesPage() {
  const { courses, isLoading } = useCourses();
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedLevel, setSelectedLevel] = useState('Tümü');

  // Sadece active statuslu kursları göster - useMemo ile optimize et
  const activeCourses = useMemo(() => {
    return courses.filter(course => course.status === 'active');
  }, [courses]);
  
  const categories = ['Tümü', 'Temel Tıp', 'Kardiyoloji', 'Nöroloji', 'Pediatri', 'Radyoloji', 'Acil Tıp'];
  const levels = ['Tümü', 'Başlangıç', 'Orta', 'İleri'];

  // Filtreleme işlemini useMemo ile optimize et
  const filteredCourses = useMemo(() => {
    let filtered = activeCourses;
    
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    if (selectedLevel !== 'Tümü') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }
    
    return filtered;
  }, [activeCourses, selectedCategory, selectedLevel]);

  const featuredCourses = useMemo(() => 
    filteredCourses.filter(course => course.featured), 
    [filteredCourses]
  );
  
  const regularCourses = useMemo(() => 
    filteredCourses.filter(course => !course.featured), 
    [filteredCourses]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8fdbd6] via-[#a8e6e3] to-[#b8ebe8] pt-20 sm:pt-24">
      {/* Hero Section - mobile responsive */}
      <motion.section 
        className="relative py-12 sm:py-16 lg:py-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AcademicCapIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#349e97]" />
            <span className="text-[#349e97] font-medium text-sm sm:text-base">Profesyonel Eğitim Programları</span>
          </motion.div>

          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Tıp <span className="bg-gradient-to-r from-[#349e97] to-[#2a7f77] bg-clip-text text-transparent">Kursları</span>
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Uzman doktorlar tarafından hazırlanmış, kapsamlı ve güncel tıp eğitimi kursları ile kariyerinizi ileriye taşıyın.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 bg-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl">
              <BookOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#349e97]" />
              <span className="text-gray-800">{activeCourses.length}+ Kurs</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl">
              <UserGroupIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#349e97]" />
              <span className="text-gray-800">5000+ Öğrenci</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-xl">
              <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#349e97]" />
              <span className="text-gray-800">4.8 Ortalama Puan</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Filters - mobile responsive */}
      <motion.section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-white/40 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <AdjustmentsHorizontalIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#349e97]" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Filtrele</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/60 border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seviye</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/60 border border-white/30 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#349e97] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                <div className="space-y-3">
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-300 h-3 rounded w-full"></div>
                  <div className="bg-gray-300 h-3 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Courses */}
      {!isLoading && featuredCourses.length > 0 && (
        <motion.section 
          className="max-w-7xl mx-auto px-6 lg:px-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <StarIcon className="h-6 w-6 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">Öne Çıkan Kurslar</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <AnimatePresence>
              {featuredCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} featured={true} />
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      )}

      {/* All Courses */}
      {!isLoading && (
        <motion.section 
          className="max-w-7xl mx-auto px-6 lg:px-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <BookOpenIcon className="h-6 w-6 text-[#349e97]" />
            <h2 className="text-3xl font-bold text-gray-900">Tüm Kurslar</h2>
            <span className="text-lg text-gray-600">({filteredCourses.length})</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {regularCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} featured={false} />
              ))}
            </AnimatePresence>
          </div>
        </motion.section>
      )}

      {/* No Results */}
      {!isLoading && filteredCourses.length === 0 && (
        <motion.div 
          className="max-w-7xl mx-auto px-6 lg:px-8 text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-12">
            <BookOpenIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Kurs Bulunamadı</h3>
            <p className="text-gray-600 mb-6">Seçilen filtrelere uygun kurs bulunmuyor. Lütfen farklı filtreler deneyin.</p>
            <button 
              onClick={() => {
                setSelectedCategory('Tümü');
                setSelectedLevel('Tümü');
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#349e97] to-[#2a7f77] text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Filtreleri Temizle
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Course Card Component
function CourseCard({ course, index, featured }: { course: Course; index: number; featured: boolean }) {
  return (
    <motion.div
      className={`relative group bg-white/40 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ${
        featured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            ✨ Öne Çıkan
          </span>
        </div>
      )}

      <div className="relative h-48 bg-gradient-to-br from-[#349e97] to-[#2a7f77] overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
            {course.category}
          </span>
        </div>
        <motion.div 
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <PlayIcon className="h-5 w-5 text-white" />
        </motion.div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            course.level === 'Başlangıç' ? 'bg-green-100 text-green-800' :
            course.level === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.level}
          </span>
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#349e97] transition-colors duration-300">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <AcademicCapIcon className="h-4 w-4" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <UserGroupIcon className="h-4 w-4" />
              <span>{course.students} öğrenci</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4" />
            <span>Başlangıç: {course.startDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#349e97]">
            ₺{course.price.toLocaleString()}
          </div>
          <Link href={`/courses/${course.id}`}>
            <motion.button
              className="flex items-center gap-2 bg-gradient-to-r from-[#349e97] to-[#2a7f77] text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-medium">Detaylar</span>
              <ChevronRightIcon className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 