'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import TargetAudience from '@/components/TargetAudience';
import SuccessStories from '@/components/SuccessStories';
import Footer from '@/components/Footer';

export default function Home() {
  // Check if user is already logged in and redirect to appropriate panel
  useEffect(() => {
    const currentStudent = localStorage.getItem('currentStudent');
    const currentCoach = localStorage.getItem('currentCoach');
    
    if (currentStudent) {
      try {
        const student = JSON.parse(currentStudent);
        if (student.loggedIn && student.userType === 'student') {
          window.location.href = '/student-panel';
          return;
        }
      } catch (error) {
        localStorage.removeItem('currentStudent');
      }
    }
    
    if (currentCoach) {
      try {
        const coach = JSON.parse(currentCoach);
        if (coach.loggedIn && coach.userType === 'coach') {
          window.location.href = '/panel';
          return;
        }
      } catch (error) {
        localStorage.removeItem('currentCoach');
      }
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeatureCards />
      <TargetAudience />
      <SuccessStories />
      <Footer />
    </main>
  );
}
