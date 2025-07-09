// ====================
// KOÇ PANELİ İÇİN YARDIMCI FONKSİYONLAR
// ====================

/**
 * Koç panelinde belirli bir öğrencinin profil verilerini getir
 * @param studentEmail - Öğrencinin email adresi
 * @returns Öğrencinin profil verileri veya null
 */
export const getStudentProfileByEmail = (studentEmail: string) => {
  try {
    const profileData = localStorage.getItem(`student_profile_${studentEmail}`);
    if (profileData) {
      return JSON.parse(profileData);
    }
    return null;
  } catch (error) {
    console.error('❌ Öğrenci profili getirilirken hata:', error);
    return null;
  }
};

/**
 * Koç panelinde tüm öğrencilerin listesini getir
 * @returns Öğrenci listesi
 */
export const getAllStudentsForCoach = () => {
  try {
    const studentList = localStorage.getItem('coach_student_list');
    if (studentList) {
      return JSON.parse(studentList);
    }
    return [];
  } catch (error) {
    console.error('❌ Öğrenci listesi getirilirken hata:', error);
    return [];
  }
};

/**
 * Koç panelinde öğrenci profil verilerini detaylı olarak getir
 * @param studentEmail - Öğrencinin email adresi
 * @returns Detaylı profil verileri
 */
export const getStudentDetailedProfile = (studentEmail: string) => {
  try {
    const allProfiles = localStorage.getItem('all_student_profiles');
    if (allProfiles) {
      const profiles = JSON.parse(allProfiles);
      return profiles[studentEmail] || null;
    }
    return null;
  } catch (error) {
    console.error('❌ Detaylı profil getirilirken hata:', error);
    return null;
  }
};

/**
 * Koçun bir öğrenciyi sistemine eklemesi
 * @param studentEmail - Öğrencinin email adresi
 * @param coachEmail - Koçun email adresi
 * @returns Başarılı olup olmadığı
 */
export const addStudentToCoach = (studentEmail: string, coachEmail: string) => {
  try {
    const studentProfile = getStudentProfileByEmail(studentEmail);
    if (!studentProfile) {
      console.error('❌ Öğrenci profili bulunamadı:', studentEmail);
      return false;
    }

    // Koçun öğrenci listesini güncelle
    const coachStudents = JSON.parse(localStorage.getItem(`coach_${coachEmail}_students`) || '[]');
    const isAlreadyAdded = coachStudents.some((student: any) => student.email === studentEmail);
    
    if (!isAlreadyAdded) {
      coachStudents.push({
        email: studentEmail,
        name: studentProfile.profileData.name,
        addedDate: new Date().toISOString(),
        status: 'active'
      });
      localStorage.setItem(`coach_${coachEmail}_students`, JSON.stringify(coachStudents));
      
      console.log('✅ Öğrenci koça eklendi:', studentEmail, 'Koç:', coachEmail);
      return true;
    }
    
    console.log('ℹ️ Öğrenci zaten koçun listesinde:', studentEmail);
    return true;
  } catch (error) {
    console.error('❌ Öğrenci koça eklenirken hata:', error);
    return false;
  }
};

/**
 * Belirli bir koçun öğrenci listesini getir
 * @param coachEmail - Koçun email adresi
 * @returns Koçun öğrenci listesi
 */
export const getCoachStudents = (coachEmail: string) => {
  try {
    const coachStudents = localStorage.getItem(`coach_${coachEmail}_students`);
    if (coachStudents) {
      return JSON.parse(coachStudents);
    }
    return [];
  } catch (error) {
    console.error('❌ Koç öğrenci listesi getirilirken hata:', error);
    return [];
  }
};

// ====================
// FİREBASE İÇİN HAZIR VERİ YAPISI
// ====================

/**
 * Firebase'e gönderilecek formatta profil verilerini hazırla
 * @param email - Öğrencinin email adresi
 * @returns Firebase için hazır veri yapısı
 */
export const prepareProfileForFirebase = (email: string) => {
  try {
    const profileData = getStudentProfileByEmail(email);
    if (!profileData) {
      return null;
    }

    // Firebase için optimize edilmiş veri yapısı
    const firebaseData = {
      studentProfile: {
        email: profileData.email,
        studentId: profileData.studentId,
        lastUpdated: profileData.lastUpdated,
        personalInfo: {
          name: profileData.profileData.name,
          photo: profileData.profileData.photo,
          email: profileData.profileData.email
        },
        academicInfo: {
          goal: profileData.profileData.goal,
          targetExam: profileData.profileData.targetExam,
          examHistory: profileData.profileData.examHistory,
          learningType: profileData.profileData.learningType
        },
        preferences: {
          studyHabits: profileData.profileData.studyHabits,
          communicationStyle: profileData.profileData.communicationStyle,
          preferredPlatforms: profileData.profileData.preferredPlatforms,
          programAdaptability: profileData.profileData.programAdaptability
        },
        coachingInfo: {
          coachExpectations: profileData.profileData.coachExpectations,
          emotionalSupport: profileData.profileData.emotionalSupport,
          previousCoachingExperience: profileData.profileData.previousCoachingExperience
        },
        metadata: {
          createdAt: profileData.lastUpdated,
          updatedAt: profileData.lastUpdated,
          version: '1.0'
        }
      }
    };

    return firebaseData;
  } catch (error) {
    console.error('❌ Firebase verisi hazırlanırken hata:', error);
    return null;
  }
};

/**
 * Firebase'e toplu profil verilerini gönder
 * @returns Firebase için hazır tüm profil verileri
 */
export const prepareAllProfilesForFirebase = () => {
  try {
    const allProfiles = localStorage.getItem('all_student_profiles');
    if (!allProfiles) {
      return [];
    }

    const profiles = JSON.parse(allProfiles);
    const firebaseProfiles = [];

    for (const email in profiles) {
      const firebaseData = prepareProfileForFirebase(email);
      if (firebaseData) {
        firebaseProfiles.push(firebaseData);
      }
    }

    return firebaseProfiles;
  } catch (error) {
    console.error('❌ Toplu Firebase verisi hazırlanırken hata:', error);
    return [];
  }
};

/**
 * Profil verilerini localStorage'dan temizle (Firebase'e aktarım sonrası)
 * @param email - Temizlenecek öğrencinin email adresi
 */
export const clearProfileFromLocalStorage = (email: string) => {
  try {
    localStorage.removeItem(`student_profile_${email}`);
    
    // all_student_profiles'den de kaldır
    const allProfiles = JSON.parse(localStorage.getItem('all_student_profiles') || '{}');
    delete allProfiles[email];
    localStorage.setItem('all_student_profiles', JSON.stringify(allProfiles));
    
    // coach_student_list'den de kaldır
    const coachList = JSON.parse(localStorage.getItem('coach_student_list') || '[]');
    const filteredList = coachList.filter((student: any) => student.email !== email);
    localStorage.setItem('coach_student_list', JSON.stringify(filteredList));
    
    console.log('✅ Profil localStorage\'dan temizlendi:', email);
  } catch (error) {
    console.error('❌ Profil temizlenirken hata:', error);
  }
};

// ====================
// DEV MOD İÇİN DEBUG FONKSİYONLARI
// ====================

/**
 * Geliştirme modunda tüm profil verilerini konsola yazdır
 */
export const debugAllProfiles = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('=== TÜM PROFİL VERİLERİ ===');
    console.log('All Student Profiles:', JSON.parse(localStorage.getItem('all_student_profiles') || '{}'));
    console.log('Coach Student List:', JSON.parse(localStorage.getItem('coach_student_list') || '[]'));
    console.log('========================');
  }
};

// ====================
// KOÇLAR İÇİN ÖRNEK KULLANIM
// ====================

/**
 * Koç panelinde kullanılacak örnek fonksiyon
 * @param coachEmail - Koçun email adresi
 * @example
 * const coachEmail = 'coach@example.com';
 * const students = getStudentsForCoachDashboard(coachEmail);
 * students.forEach(student => {
 *   console.log(`Öğrenci: ${student.name}, Profil: ${student.profileComplete ? 'Tamamlanmış' : 'Eksik'}`);
 * });
 */
export const getStudentsForCoachDashboard = (coachEmail: string) => {
  try {
    const coachStudents = getCoachStudents(coachEmail);
    return coachStudents.map((student: any) => {
      const profileData = getStudentDetailedProfile(student.email);
      return {
        ...student,
        profileData: profileData?.profileData || null,
        profileComplete: !!profileData?.profileData
      };
    });
  } catch (error) {
    console.error('❌ Koç dashboard verisi hazırlanırken hata:', error);
    return [];
  }
}; 