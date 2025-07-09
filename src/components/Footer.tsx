'use client';

import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const navigation = {
  products: [
    { name: 'YKS Öğrencileri', href: '/student-registration' },
    { name: 'Tıp Öğrencileri', href: '/student-registration' },
    { name: 'AI Flashcard', href: '/student-registration' },
    { name: 'Podcast Üretici (Yakında)', href: '/student-registration' },
    { name: 'Uzman Koç Görüşmeleri', href: '/student-registration' },
    { name: 'Ortak Ders Çalışma', href: '/student-registration' }
  ],
  support: [
    { name: 'Yardım Merkezi', href: '/faq' },
    { name: 'İletişim', href: '/contact' },
    { name: 'KVKK', href: '/privacy-policy' },
    { name: 'Kullanım Şartları', href: '/terms-of-service' },
    { name: 'Gizlilik Politikası', href: '/privacy-policy' }
  ],
  social: [
    {
      name: 'Instagram',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.017 0C8.396 0 7.896.011 6.689.058 5.484.104 4.632.291 3.892.558c-.785.306-1.45.717-2.114 1.381C1.114 2.603.703 3.268.397 4.053.129 4.793-.058 5.645-.009 6.851c.047 1.207.058 1.707.058 5.328s-.011 4.121-.058 5.328c-.049 1.206.138 2.058.406 2.798.306.785.717 1.45 1.381 2.114C2.603 22.886 3.268 23.297 4.053 23.603c.74.268 1.592.455 2.798.406 1.207-.047 1.707-.058 5.328-.058s4.121.011 5.328.058c1.206.049 2.058-.138 2.798-.406.785-.306 1.45-.717 2.114-1.381.664-.664 1.075-1.329 1.381-2.114.268-.74.455-1.592.406-2.798-.047-1.207-.058-1.707-.058-5.328s.011-4.121.058-5.328c.049-1.206-.138-2.058-.406-2.798-.306-.785-.717-1.45-1.381-2.114C21.397 1.114 20.732.703 19.947.397 19.207.129 18.355-.058 17.149-.009 15.942.038 15.442.049zm0 2.163c3.259 0 3.667.011 4.947.055 1.206.055 1.86.244 2.297.406.578.225.99.494 1.423.927.433.433.702.845.927 1.423.162.437.351 1.091.406 2.297.044 1.28.055 1.688.055 4.947s-.011 3.667-.055 4.947c-.055 1.206-.244 1.86-.406 2.297-.225.578-.494.99-.927 1.423-.433.433-.845.702-1.423.927-.437.162-1.091.351-2.297.406-1.28.044-1.688.055-4.947.055s-3.667-.011-4.947-.055c-1.206-.055-1.86-.244-2.297-.406-.578-.225-.99-.494-1.423-.927-.433-.433-.702-.845-.927-1.423-.162-.437-.351-1.091-.406-2.297-.044-1.28-.055-1.688-.055-4.947s.011-3.667.055-4.947c.055-1.206.244-1.86.406-2.297.225-.578.494-.99.927-1.423.433-.433.845-.702 1.423-.927.437-.162 1.091-.351 2.297-.406 1.28-.044 1.688-.055 4.947-.055zm0 3.678c-3.405 0-6.162 2.757-6.162 6.162S8.612 18.162 12.017 18.162s6.162-2.757 6.162-6.162S15.422 5.838 12.017 5.838zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'TikTok',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
        </svg>
      ),
    }
  ]
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-20">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          <div className="space-y-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#af2e3d] to-[#d63384] flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-lg sm:text-xl font-['Inter']">E</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#af2e3d] to-[#d63384] rounded-full opacity-80 animate-pulse"></div>
              </div>
              <div>
                <span className="font-['Inter'] font-bold text-xl sm:text-2xl text-white leading-tight">
                  Eylül Büyükkaya Akademisi
                </span>
                <div className="text-sm text-gray-400 font-medium mt-1">Tıp Eğitimi Platformu</div>
              </div>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-gray-300 max-w-md mx-auto sm:mx-0">
              Yapay zeka destekli eğitim çözümleriyle YKS'den tıp fakültesine, 
              tıp fakültesinden başarılı bir hekimliğe kadar yanınızdayız.
            </p>
            <div className="flex justify-center sm:justify-start space-x-6">
              {navigation.social.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-400 hover:text-[#af2e3d] transition-all duration-300 hover:scale-110 group"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6 group-hover:drop-shadow-lg" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-16 sm:mt-20 lg:mt-0 xl:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-12">
              <div>
                <h3 className="text-base font-bold leading-6 text-white mb-6 tracking-wide">ÜRÜNLER</h3>
                <ul role="list" className="space-y-4">
                  {navigation.products.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-300 block hover:translate-x-1">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base font-bold leading-6 text-white mb-6 tracking-wide">DESTEK</h3>
                <ul role="list" className="space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-300 block hover:translate-x-1">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-12 sm:mt-16 lg:mt-0 xl:mt-0">
              <div>
                <h3 className="text-base font-bold leading-6 text-white mb-6 tracking-wide">İLETİŞİM</h3>
                <ul role="list" className="space-y-4">
                  <li className="flex items-center justify-center sm:justify-start group">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3 group-hover:text-[#af2e3d] transition-colors flex-shrink-0" />
                    <a href="mailto:info@eylulakademi.com" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-300">
                      info@eylulakademi.com
                    </a>
                  </li>
                  <li className="flex items-center justify-center sm:justify-start group">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-3 group-hover:text-[#af2e3d] transition-colors flex-shrink-0" />
                    <a href="tel:+905551234567" className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-300">
                      +90 555 123 45 67
                    </a>
                  </li>
                  <li className="flex items-center justify-center sm:justify-start group">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 group-hover:text-[#af2e3d] transition-colors flex-shrink-0" />
                    <span className="text-sm leading-6 text-gray-300">
                      İstanbul, Türkiye
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 sm:mt-20 border-t border-gray-800 pt-8 sm:pt-10">
          <div className="bg-gradient-to-r from-[#af2e3d] via-white to-[#d63384] rounded-xl p-4 sm:p-6">
            <p className="text-xs leading-5 text-[#af2e3d] text-center font-semibold">
              &copy; 2025 Eylül Büyükkaya Akademisi. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 