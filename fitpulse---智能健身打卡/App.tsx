import React, { useState, useEffect } from 'react';
import { AppView, WorkoutLog, UserStats } from './types';
import { getLogs, saveLog, calculateStats } from './services/storageService';
import HomeView from './components/views/HomeView';
import CalendarView from './components/views/CalendarView';
import StatsView from './components/views/StatsView';
import SettingsView from './components/views/SettingsView';
import BottomNav from './components/BottomNav';
import CheckInModal from './components/CheckInModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [stats, setStats] = useState<UserStats>({ totalWorkouts: 0, currentStreak: 0, totalMinutes: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initial Data Load
  useEffect(() => {
    const loadedLogs = getLogs();
    setLogs(loadedLogs);
    setStats(calculateStats(loadedLogs));
  }, []);

  const handleSaveLog = (log: WorkoutLog) => {
    const updatedLogs = saveLog(log);
    setLogs(updatedLogs);
    setStats(calculateStats(updatedLogs));
    
    // Simple Notification Trigger if permissions allowed
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification("打卡成功！", {
        body: `你刚刚完成了 ${log.durationMinutes} 分钟的 ${log.type} 训练。`,
        icon: '/favicon.ico'
      });
    }
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView stats={stats} logs={logs} onCheckIn={() => setIsModalOpen(true)} />;
      case AppView.CALENDAR:
        return <CalendarView logs={logs} />;
      case AppView.STATS:
        return <StatsView logs={logs} />;
      case AppView.SETTINGS:
        return <SettingsView />;
      default:
        return <HomeView stats={stats} logs={logs} onCheckIn={() => setIsModalOpen(true)} />;
    }
  };

  return (
    // Outer container to simulate mobile app on desktop
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-4">
      <div className="w-full h-full md:h-[850px] md:max-w-[400px] bg-gray-50 md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-gray-900 md:border-gray-800">
        
        {/* Fake Status Bar (Visual only for 'App' feel) */}
        <div className="h-8 bg-white w-full flex items-center justify-between px-6 select-none sticky top-0 z-50 border-b border-gray-50">
           <span className="text-[10px] font-bold text-gray-900">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
           <div className="flex gap-1.5">
             <div className="w-3 h-3 bg-black rounded-full"></div>
             <div className="w-3 h-3 bg-black rounded-full opacity-20"></div>
             <div className="w-3 h-3 bg-black rounded-full opacity-20"></div>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden bg-gray-50">
          {renderView()}
        </div>

        {/* Bottom Navigation */}
        <BottomNav currentView={currentView} onChange={setCurrentView} />

        {/* Modals */}
        {isModalOpen && (
          <CheckInModal 
            onClose={() => setIsModalOpen(false)} 
            onSave={handleSaveLog} 
          />
        )}
      </div>
    </div>
  );
};

export default App;