import React from 'react';
import { Home, Calendar, BarChart2, Settings } from 'lucide-react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  onChange: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChange }) => {
  const navItems = [
    { view: AppView.HOME, icon: Home, label: '首页' },
    { view: AppView.CALENDAR, icon: Calendar, label: '日历' },
    { view: AppView.STATS, icon: BarChart2, label: '统计' },
    { view: AppView.SETTINGS, icon: Settings, label: '设置' },
  ];

  return (
    <div className="bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50 md:absolute md:rounded-b-[2rem]">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => onChange(item.view)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${
              isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;