
import React from 'react';

interface Master {
  name: string;
  title: string;
  quote: string;
  image: string;
}

const masters: Master[] = [
  {
    name: "Warren Buffett",
    title: "The Oracle of Omaha",
    quote: "Be fearful when others are greedy and greedy when others are fearful.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "George Soros",
    title: "The Reflexivity Master",
    quote: "It's not whether you're right or wrong, but how much money you make when you're right.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Peter Lynch",
    title: "The Growth Legend",
    quote: "Know what you own, and know why you own it.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Paul Tudor Jones",
    title: "The Macro Wizard",
    quote: "The secret to being successful from a trading perspective is to have an indefatigable and undying and unquenchable thirst for information and knowledge.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  }
];

export const MastersSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 mb-24">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase mb-4">The Pantheon</h2>
        <div className="h-[1px] w-12 bg-zinc-800"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {masters.map((master) => (
          <div key={master.name} className="group relative flex flex-col items-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all duration-700 group-hover:border-white/20">
              <img 
                src={master.image} 
                alt={master.name}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{master.title}</p>
                <h3 className="text-xl font-bold text-white mb-2">{master.name}</h3>
              </div>
            </div>
            <div className="mt-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0">
              <p className="text-sm text-zinc-500 italic leading-relaxed px-4">
                "{master.quote}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
