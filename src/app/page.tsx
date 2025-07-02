import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeatureCards from '@/components/FeatureCards';
import TargetAudience from '@/components/TargetAudience';
import SuccessStories from '@/components/SuccessStories';
import Footer from '@/components/Footer';

export default function Home() {
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
