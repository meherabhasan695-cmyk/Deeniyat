import React from 'react';
import { Gamepad2, Trophy, Coffee, Moon } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: "Shouhardo Mahmud",
      role: "Founder & CEO",
      uni: "KUET — Electrical & Electronic Engineering (EEE)",
      hobbies: ["Sleeping", "Adda"],
      image: "/images/shouhardo.jpg",
      icons: [<Moon className="w-3.5 h-3.5" />, <Coffee className="w-3.5 h-3.5" />]
    },
    {
      name: "Meherab Hasan",
      role: "Co-Founder",
      uni: "BUET — Urban & Regional Planning (URP)",
      hobbies: ["Gaming", "Football", "Adda"],
      image: "/images/meherab.jpg",
      icons: [<Gamepad2 className="w-3.5 h-3.5" />, <Trophy className="w-3.5 h-3.5" />, <Coffee className="w-3.5 h-3.5" />]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 font-sans">
      <h2 className="font-serif text-3xl font-bold text-zinc-850 mb-2 border-b border-gray-200/60 pb-3">
        Our Story
      </h2>
      
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-10 mt-6 shadow-xs max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full">
            🤝 The Brotherhood
          </span>
          
          {/* এই যে ভাই, আপনার কাঙ্ক্ষিত গ্র্যান্ড হেডিং পারফেক্টলি আপডেট করে দেওয়া হলো */}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-850 tracking-wide">
            From Backbenches to The Founders of a Halal Dream
          </h3>
          
          <div className="space-y-4 text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto text-justify sm:text-center">
            <p>
              We started as two childhood friends, sharing the very same school benches and walking through the 
              exact same dreamy Notre Dame College corridors. As time moved on, life took us down different paths—one 
              heading to engineering and the other to urban planning.
            </p>
            <p>
              Now as adults, despite the distance between our campuses, our shared core values brought us back 
              together. Driven by a deep passion for premium fragrances and an unwavering commitment to purity, we 
              united to materialize our ultimate dream: establishing a 100% transparent, premium, and halal lifestyle 
              brand—<strong className="text-emerald-700 font-bold">DEENIYAT ESSENCE</strong>.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-gray-100">
          {team.map((member, idx) => (
            <div key={idx} className="flex items-center space-x-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <div className="w-16 h-16 rounded-xl bg-zinc-200 overflow-hidden shrink-0 shadow-3xs">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold text-xs">Pic</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-serif text-sm font-bold text-zinc-800 truncate">{member.name}</h4>
                <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">{member.role}</p>
                <p className="text-[10px] text-gray-400 truncate mt-0.5">🎓 {member.uni}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-gray-400">
                  {member.icons.map((icon, i) => (
                    <span key={i} className="bg-white p-1 rounded-md border border-gray-100 shadow-3xs text-zinc-500">{icon}</span>
                  ))}
                  <span className="text-[9px] font-medium text-gray-500 ml-0.5 truncate">{member.hobbies.join(' • ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}