
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="pt-24 pb-16 px-6 text-center">
      <h1 className="text-7xl md:text-[120px] font-extrabold tracking-tighter gradient-text leading-none mb-6">
        FUCKING<br />TRADER
      </h1>
      <p className="max-w-2xl mx-auto text-zinc-500 text-lg md:text-xl font-light tracking-wide leading-relaxed">
        High conviction. High stakes. Minimalist journal for the aggressive market participant. 
        Track every win, learn from every loss.
      </p>
    </section>
  );
};
