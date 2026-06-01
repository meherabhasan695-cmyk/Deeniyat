import React from 'react';
import { Gamepad2, Trophy, Coffee, Moon, Sparkles } from 'lucide-react';

export default function OurStory() {
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
    <section id="story" className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-12 font-sans">
      <h2 className="font-serif text-3xl font-bold text-brand-primary mb-2 border-b border-gray-200/60 pb-3">Our Story</h2>
      
      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-10 shadow-xs space-y-10 mt-6">
        {/* Narrative Section */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center space-x-1.5 bg-brand-light text-brand-accent text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gray-100 shadow-3xs">
            <Sparkles className="w-3 h-3" />
            <span>The Brotherhood</span>
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark tracking-wide">
            From Backbenches to Founder a Halal Dream
          </h3>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
            We started as two childhood friends, sharing the very same school benches and walking through the exact same dreamy Notre Dame College corridors. As time moved on, life took us down different paths—one heading to engineering and the other to urban planning. 
          </p>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
            Now as adults, despite the distance between our campuses, our shared core values brought us back together. Driven by a deep passion for premium fragrances and an unwavering commitment to purity, we united to materialize our ultimate dream: establishing a 100% transparent, premium, and halal lifestyle brand—<span className="text-brand-primary font-bold">DEENIYAT ESSENCE</span>.
          </p>
        </div>

        {/* Co-founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-6 border-t border-gray-50">
          {team.map((member, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 bg-gray-50/40 p-5 rounded-xl border border-gray-100/70 shadow-3xs hover:shadow-2xs transition-all">
              {/* Picture Frame */}
              <div className="w-28 h-28 rounded-xl bg-gray-200 overflow-hidden shrink-0 border border-gray-200/60 shadow-3xs">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250"; // fallback if image fails
                  }}
                />
              </div>

              {/* Bio Details */}
              <div className="space-y-2 flex-1">
                <div>
                  <h4 className="font-serif text-lg font-bold text-brand-dark">{member.name}</h4>
                  <p className="text-xs uppercase tracking-wider font-bold text-brand-accent">{member.role}</p>
                </div>
                
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  🎓 {member.uni}
                </p>

                {/* Hobbies Slots */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-1">
                  {member.hobbies.map((hobby, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-white border border-gray-200/80 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-3xs">
                      {member.icons[i]}
                      <span>{hobby}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}