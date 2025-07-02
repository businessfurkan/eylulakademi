'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  level: 'Başlangıç' | 'Orta' | 'İleri';
  category: string;
  price: number;
  image: string;
  lessons: number;
  startDate: string;
  featured: boolean;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
}

interface CoursesContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'students' | 'rating' | 'createdAt'>) => void;
  updateCourse: (id: number, course: Partial<Course>) => void;
  deleteCourse: (id: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

// Initial sample data - kurslar sayfasındaki veriler
const initialCourses: Course[] = [
  {
    id: 1,
    title: "Temel Anatomi ve Fizyoloji",
    description: "İnsan vücudunun temel yapı ve fonksiyonlarını öğrenin. Bu kapsamlı kurs ile tıp eğitiminizin temellerini sağlam bir şekilde atın.",
    instructor: "Dr. Mehmet Özkan",
    duration: "12 Hafta",
    students: 1250,
    rating: 4.9,
    level: 'Başlangıç',
    category: "Temel Tıp",
    price: 899,
    image: "/api/placeholder/400/250",
    lessons: 48,
    startDate: "15 Şubat 2024",
    featured: true,
    status: 'active',
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Kardiyovasküler Sistem",
    description: "Kalp ve damar sistemi hakkında derinlemesine bilgi edinin. EKG okuma, hastalık tanıları ve tedavi yöntemleri.",
    instructor: "Prof. Dr. Ayşe Demir",
    duration: "8 Hafta",
    students: 856,
    rating: 4.8,
    level: 'Orta',
    category: "Kardiyoloji",
    price: 1299,
    image: "/api/placeholder/400/250",
    lessons: 32,
    startDate: "1 Mart 2024",
    featured: true,
    status: 'active',
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    title: "Nöroloji ve Beyin Hastalıkları",
    description: "Sinir sistemi hastalıkları, nörolojik muayene teknikleri ve modern tedavi yaklaşımlarını öğrenin.",
    instructor: "Dr. Fatma Kaya",
    duration: "10 Hafta",
    students: 642,
    rating: 4.7,
    level: 'İleri',
    category: "Nöroloji",
    price: 1599,
    image: "/api/placeholder/400/250",
    lessons: 40,
    startDate: "10 Mart 2024",
    featured: false,
    status: 'active',
    createdAt: "2024-01-25"
  },
  {
    id: 4,
    title: "Pediatri ve Çocuk Sağlığı",
    description: "Bebek ve çocuklarda görülen hastalıklar, gelişim takibi ve pediatrik acil durumlar.",
    instructor: "Dr. Ahmet Yılmaz",
    duration: "6 Hafta",
    students: 423,
    rating: 4.6,
    level: 'Orta',
    category: "Pediatri",
    price: 999,
    image: "/api/placeholder/400/250",
    lessons: 24,
    startDate: "20 Mart 2024",
    featured: false,
    status: 'active',
    createdAt: "2024-02-01"
  },
  {
    id: 5,
    title: "Radyoloji ve Görüntüleme",
    description: "X-ray, MR, BT görüntülerini okuma ve yorumlama teknikleri. Pratik örnekler ile öğrenin.",
    instructor: "Dr. Zeynep Şen",
    duration: "14 Hafta",
    students: 789,
    rating: 4.8,
    level: 'İleri',
    category: "Radyoloji",
    price: 1799,
    image: "/api/placeholder/400/250",
    lessons: 56,
    startDate: "5 Nisan 2024",
    featured: true,
    status: 'active',
    createdAt: "2024-02-05"
  },
  {
    id: 6,
    title: "Acil Tıp ve İlk Yardım",
    description: "Acil durumlar karşısında hızlı ve etkili müdahale teknikleri. Yaşam kurtarıcı bilgiler.",
    instructor: "Dr. Can Özdemir",
    duration: "4 Hafta",
    students: 1100,
    rating: 4.9,
    level: 'Başlangıç',
    category: "Acil Tıp",
    price: 599,
    image: "/api/placeholder/400/250",
    lessons: 16,
    startDate: "12 Nisan 2024",
    featured: false,
    status: 'active',
    createdAt: "2024-02-10"
  }
];

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isLoading, setIsLoading] = useState(false);

  const addCourse = (courseData: Omit<Course, 'id' | 'students' | 'rating' | 'createdAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Math.max(...courses.map(c => c.id), 0) + 1,
      students: 0,
      rating: 0,
      createdAt: new Date().toISOString().split('T')[0],
      image: "/api/placeholder/400/250"
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const updateCourse = (id: number, courseData: Partial<Course>) => {
    setCourses(prev => prev.map(course => 
      course.id === id ? { ...course, ...courseData } : course
    ));
  };

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  return (
    <CoursesContext.Provider value={{
      courses,
      addCourse,
      updateCourse,
      deleteCourse,
      isLoading,
      setIsLoading
    }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
} 