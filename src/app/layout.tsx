import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CoursesProvider } from '../contexts/CoursesContext';
// Medical Icons from React Icons
import { 
  FaStethoscope, 
  FaHeartbeat, 
  FaSyringe, 
  FaPills, 
  FaThermometerHalf,
  FaMicroscope,
  FaUserMd,
  FaAmbulance,
  FaBrain,
  FaDna,
  FaVial,
  FaXRay,
  FaHospital,
  FaCapsules,
  FaFirstAid
} from 'react-icons/fa';
import { GiMedicines, GiDna2, GiHeartOrgan } from 'react-icons/gi';
import { MdLocalHospital, MdBloodtype, MdMonitorHeart } from 'react-icons/md';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eylül Büyükkaya Akademisi | Tıpta Başarıya Giden Yolda Yapay Zeka Yanında",
  description: "YKS'den tıp fakültesine, tıp fakültesinden başarılı bir hekimliğe kadar yapay zeka destekli eğitim çözümleriyle yanınızdayız.",
  keywords: ["YKS hazırlık", "tıp fakültesi", "yapay zeka", "eğitim", "TYT", "AYT", "flashcard", "podcast"],
  authors: [{ name: "Eylül Büyükkaya Akademisi" }],
  openGraph: {
    title: "Eylül Büyükkaya Akademisi",
    description: "Tıpta Başarıya Giden Yolda Yapay Zeka Yanında",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=TT+Forms+Pro:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased min-h-screen relative overflow-x-hidden`}
        style={{ backgroundColor: '#8fdbd6' }}
      >
        {/* Medical Background Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Main medical pattern background */}
          <div className="absolute inset-0 medical-pattern"></div>
          
          {/* Sadece Köşelerde Strategik Medical Icons - Az Sayıda */}
          
          {/* Steteskop - Top Left Corner */}
          <div className="absolute top-24 left-8 text-pink-400 opacity-30 animate-bounce" style={{ animationDuration: '4s' }}>
            <FaStethoscope size={35} />
          </div>

          {/* Kalp - Top Right Corner */}
          <div className="absolute top-20 right-8 text-rose-400 opacity-25 animate-pulse" style={{ animationDuration: '3s' }}>
            <FaHeartbeat size={32} />
          </div>

          {/* DNA - Top Center (hafif) */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-pink-300 opacity-20" style={{ animation: 'spin 15s linear infinite' }}>
            <FaDna size={28} />
          </div>

          {/* Mikroskop - Bottom Left Corner */}
          <div className="absolute bottom-24 left-8 text-purple-400 opacity-25" style={{ animation: 'pulse 5s ease-in-out infinite' }}>
            <FaMicroscope size={30} />
          </div>

          {/* Ambulans - Bottom Right Corner */}
          <div className="absolute bottom-20 right-8 text-rose-300 opacity-30" style={{ animation: 'moveLeftRight 10s ease-in-out infinite' }}>
            <FaAmbulance size={33} />
          </div>

          {/* Beyin - Middle Right (çok hafif) */}
          <div className="absolute top-1/2 right-4 text-purple-300 opacity-15" style={{ animation: 'pulse 6s ease-in-out infinite' }}>
            <FaBrain size={25} />
          </div>

          {/* Hastane Cross - Bottom Center (çok hafif) */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-pink-300 opacity-20" style={{ animation: 'glow 4s ease-in-out infinite alternate' }}>
            <MdLocalHospital size={26} />
          </div>

          {/* Gradient overlays for depth */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-200/40 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-200/40 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-50">
          <CoursesProvider>
            {children}
          </CoursesProvider>
        </div>
      </body>
    </html>
  );
}
