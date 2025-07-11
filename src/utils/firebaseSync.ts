// Firebase entegrasyonu için yardımcı fonksiyonlar

export interface StudentRegistrationData {
  email: string;
  studentId: string;
  selectedField: string;
  selectedFieldDisplay: string;
  registrationDate: string;
  userType: 'student';
  isActive: boolean;
  fullName?: string;
  phone?: string;
  profileCompleted: boolean;
}

export interface StudentProfileData {
  email: string;
  studentId: string;
  lastUpdated: string;
  personalInfo: {
    name: string;
    email: string;
    photo: string;
  };
  academicInfo: {
    targetExam: string; // Kayıt sırasında seçilen alan - değiştirilemez
    goal: string;
    examHistory: string;
    learningType: string;
  };
  preferences: {
    studyHabits: string;
    communicationStyle: string;
    preferredPlatforms: string;
    programAdaptability: string;
  };
  coachingInfo: {
    coachExpectations: string;
    emotionalSupport: string;
    previousCoachingExperience: string;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    version: string;
  };
}

/**
 * Öğrenci kayıt verilerini Firebase formatına çevir
 */
export const prepareStudentRegistrationForFirebase = (
  email: string,
  selectedField: string,
  studentId: string
): StudentRegistrationData => {
  const fieldDisplayMap: { [key: string]: string } = {
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

  return {
    email,
    studentId,
    selectedField,
    selectedFieldDisplay: fieldDisplayMap[selectedField] || selectedField,
    registrationDate: new Date().toISOString(),
    userType: 'student',
    isActive: true,
    profileCompleted: false
  };
};

/**
 * Öğrenci profil verilerini Firebase formatına çevir
 */
export const prepareStudentProfileForFirebase = (
  profileData: any,
  studentData: any
): StudentProfileData => {
  return {
    email: profileData.email,
    studentId: studentData.id?.toString() || 'unknown',
    lastUpdated: new Date().toISOString(),
    personalInfo: {
      name: profileData.name || '',
      email: profileData.email || '',
      photo: profileData.photo || ''
    },
    academicInfo: {
      targetExam: studentData.targetExam || profileData.targetExam || '', // Kayıt sırasında seçilen alan
      goal: profileData.goal || '',
      examHistory: profileData.examHistory || '',
      learningType: profileData.learningType || ''
    },
    preferences: {
      studyHabits: profileData.studyHabits || '',
      communicationStyle: profileData.communicationStyle || '',
      preferredPlatforms: profileData.preferredPlatforms || '',
      programAdaptability: profileData.programAdaptability || ''
    },
    coachingInfo: {
      coachExpectations: profileData.coachExpectations || '',
      emotionalSupport: profileData.emotionalSupport || '',
      previousCoachingExperience: profileData.previousCoachingExperience || ''
    },
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: '1.0'
    }
  };
};

/**
 * Firebase'e öğrenci kayıt verilerini gönder
 */
export const sendStudentRegistrationToFirebase = async (
  studentData: StudentRegistrationData
): Promise<boolean> => {
  try {
    // Firebase SDK burada entegre edilecek
    // Şimdilik localStorage'a kaydet ve console'da bilgi ver
    
    const firebaseData = {
      collection: 'student_registrations',
      document: studentData.email,
      data: studentData,
      timestamp: new Date().toISOString()
    };
    
    // Geçici olarak localStorage'a Firebase verisi kaydedelim
    const existingFirebaseData = JSON.parse(localStorage.getItem('firebase_student_registrations') || '[]');
    existingFirebaseData.push(firebaseData);
    localStorage.setItem('firebase_student_registrations', JSON.stringify(existingFirebaseData));
    
    console.log('🔥 Firebase\'e gönderildi (simüle edildi):', firebaseData);
    return true;
  } catch (error) {
    console.error('❌ Firebase\'e gönderim hatası:', error);
    return false;
  }
};

/**
 * Firebase'e öğrenci profil verilerini gönder
 */
export const sendStudentProfileToFirebase = async (
  profileData: StudentProfileData
): Promise<boolean> => {
  try {
    const firebaseData = {
      collection: 'student_profiles',
      document: profileData.email,
      data: profileData,
      timestamp: new Date().toISOString()
    };
    
    // Geçici olarak localStorage'a Firebase verisi kaydedelim
    const existingFirebaseProfiles = JSON.parse(localStorage.getItem('firebase_student_profiles') || '[]');
    
    // Var olan profili güncelle veya yeni ekle
    const existingIndex = existingFirebaseProfiles.findIndex((p: any) => p.document === profileData.email);
    if (existingIndex >= 0) {
      existingFirebaseProfiles[existingIndex] = firebaseData;
    } else {
      existingFirebaseProfiles.push(firebaseData);
    }
    
    localStorage.setItem('firebase_student_profiles', JSON.stringify(existingFirebaseProfiles));
    
    console.log('🔥 Firebase profil güncellendi (simüle edildi):', firebaseData);
    return true;
  } catch (error) {
    console.error('❌ Firebase profil güncellemesi hatası:', error);
    return false;
  }
};

/**
 * Firebase'den öğrenci verilerini çek
 */
export const getStudentDataFromFirebase = async (email: string): Promise<any> => {
  try {
    // Geçici olarak localStorage'dan Firebase verisini oku
    const firebaseRegistrations = JSON.parse(localStorage.getItem('firebase_student_registrations') || '[]');
    const firebaseProfiles = JSON.parse(localStorage.getItem('firebase_student_profiles') || '[]');
    
    const registration = firebaseRegistrations.find((r: any) => r.document === email);
    const profile = firebaseProfiles.find((p: any) => p.document === email);
    
    return {
      registration: registration?.data || null,
      profile: profile?.data || null
    };
  } catch (error) {
    console.error('❌ Firebase\'den veri çekme hatası:', error);
    return { registration: null, profile: null };
  }
};

/**
 * Tüm Firebase verilerini debug için göster
 */
export const debugFirebaseData = () => {
  if (typeof window !== 'undefined') {
    const registrations = JSON.parse(localStorage.getItem('firebase_student_registrations') || '[]');
    const profiles = JSON.parse(localStorage.getItem('firebase_student_profiles') || '[]');
    
    console.log('🔥 Firebase Student Registrations:', registrations);
    console.log('🔥 Firebase Student Profiles:', profiles);
    
    return { registrations, profiles };
  }
  return { registrations: [], profiles: [] };
}; 