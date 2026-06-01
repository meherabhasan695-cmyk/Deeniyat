import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 font-sans mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-lg w-fit">
              <img src="/logo.jpg" alt="Deeniyat Logo" className="h-10 bg-white p-1 rounded" />
              <div className="flex flex-col pr-2">
                <span className="font-serif text-xl font-bold tracking-wider leading-none text-white">DEENIYAT</span>
                <span className="text-[10px] text-brand-accent tracking-widest uppercase mt-1">Essence</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
              One of the largest Islamic Lifestyle fragrance brands in Bangladesh. Elevate your presence with pure, non-alcoholic premium ators.
            </p>
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.facebook.com/DEENIYAT.Official.25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                aria-label="Visit our Facebook Page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Account Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide text-white">Account</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-brand-accent transition-colors">My Account</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Track My Order</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Join As Affiliate</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Complain Box</a></li>
            </ul>
          </div>

          {/* Column 3: Information Links */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide text-white">Information</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Our Showrooms</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Refund & Returned</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 4: Talk To Us */}
          <div>
            <h4 className="font-bold text-sm mb-4 tracking-wide text-white">Talk To Us</h4>
            <div className="space-y-4 text-xs text-gray-400">
              <p>Got Questions? Reach us</p>

              {/* Number 1 */}
              <div className="space-y-1.5">
                <p className="text-white font-semibold">01522123642</p>
                <div className="flex gap-2">
                  <a 
                    href="https://wa.me/8801522123642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 transition-colors text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.532 5.862L.057 23.446a.5.5 0 0 0 .497.554h.056l5.736-1.503A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 0 1-5.017-1.378l-.36-.214-3.733.979.995-3.628-.235-.374A9.794 9.794 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a 
                    href="tel:+8801522123642"
                    className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 transition-colors text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Call
                  </a>
                </div>
              </div>

              {/* Number 2 */}
              <div className="space-y-1.5">
                <p className="text-white font-semibold">01711308962</p>
                <div className="flex gap-2">
                  <a 
                    href="https://wa.me/8801711308962"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 transition-colors text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.126 1.532 5.862L.057 23.446a.5.5 0 0 0 .497.554h.056l5.736-1.503A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.794 9.794 0 0 1-5.017-1.378l-.36-.214-3.733.979.995-3.628-.235-.374A9.794 9.794 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a 
                    href="tel:+8801711308962"
                    className="flex items-center gap-1.5 bg-gray-700 hover:bg-gray-600 transition-colors text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    Call
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center items-center text-[10px] text-gray-500">
          <p>&copy; {new Date().getFullYear()} Deeniyat. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}