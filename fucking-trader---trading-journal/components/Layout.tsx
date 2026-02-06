
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/30">
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 apple-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">FT.</div>
          <div className="flex gap-6 text-sm text-zinc-400">
            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Telegram</span>
          </div>
        </div>
      </nav>
      <main className="pt-24 pb-12">
        {children}
      </main>
      <footer className="border-t border-white/5 py-12 text-center text-zinc-600 text-sm">
        &copy; {new Date().getFullYear()} FUCKING TRADER. ALL RIGHS RESERVED.
      </footer>
    </div>
  );
};
