'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail,
  Lock,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check if coach is approved and credentials match
      const savedCredentials = JSON.parse(localStorage.getItem('coachCredentials') || '{}');
      
      if (savedCredentials[email] && savedCredentials[email].password === password && savedCredentials[email].approved) {
        // Login successful - redirect to coach panel
        localStorage.setItem('currentCoach', JSON.stringify({
          email: email,
          coachId: savedCredentials[email].coachId,
          loggedIn: true
        }));
        window.location.href = '/panel';
      } else if (savedCredentials[email] && !savedCredentials[email].approved) {
        setError('Başvurunuz henüz onaylanmamıştır. Lütfen admin onayını bekleyin.');
      } else {
        setError('E-posta veya şifre hatalı. Başvuru yapmadıysanız önce koç başvurusu yapmanız gerekiyor.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <ArrowLeft size={20} />
                <span>Ana Sayfa</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">Koç Girişi</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/50 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserCheck size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Koç Girişi</h2>
            <p className="text-gray-600">
              Onaylanan koçlar başvuru sırasında belirledikleri email ve şifre ile giriş yapabilir.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="koç@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Şifrenizi girin"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
              >
                <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-800 text-sm font-medium">Giriş Hatası</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Giriş Yap
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-4">
              <p className="text-gray-600 text-sm">
                Henüz koç başvurusu yapmadınız mı?
              </p>
              <Link
                href="/coach-application"
                className="inline-block px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-sm font-medium"
              >
                Koç Başvurusu Yap
              </Link>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">ℹ</span>
              </div>
              <div>
                <p className="text-blue-800 text-sm font-medium">Önemli Bilgi</p>
                <p className="text-blue-700 text-xs">
                  Sadece başvurusu onaylanan koçlar giriş yapabilir. Başvuru durumunuzu öğrenmek için admin ile iletişime geçebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 