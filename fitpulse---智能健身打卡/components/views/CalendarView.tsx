import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WorkoutLog } from '../../types';

interface CalendarViewProps {
  logs: WorkoutLog[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ logs }) => {
  // viewDate controls the month currently being viewed
  const [viewDate, setViewDate] = useState(new Date());
  // selectedDate controls the specific day clicked for details
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(viewDate);
  const monthName = viewDate.toLocaleString('zh-CN', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const getDateString = (date: Date) => {
    // Construct local YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDateStringFromParts = (year: number, month: number, day: number) => {
     return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  const handleDayClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const hasLogsForDay = (day: number) => {
    const dateStr = getDateStringFromParts(viewDate.getFullYear(), viewDate.getMonth(), day);
    return logs.some(log => log.date === dateStr);
  };

  const selectedDateStr = getDateString(selectedDate);
  const selectedDateLogs = logs.filter(log => log.date === selectedDateStr);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto no-scrollbar">
      <h2 className="text-xl font-bold text-gray-900 mb-6">历史记录</h2>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="text-lg font-bold text-gray-800 select-none">{monthName}</span>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 mb-4">
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <div key={d} className="text-center text-xs font-medium text-gray-400">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-y-2 gap-x-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {Array.from({ length: days }).map((_, i) => {
            const day = i + 1;
            const hasWorkout = hasLogsForDay(day);
            
            const currentDayDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
            const isDayToday = isToday(currentDayDate);
            
            const isSelected = 
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === viewDate.getMonth() &&
                selectedDate.getFullYear() === viewDate.getFullYear();

            return (
              <button 
                key={day}
                onClick={() => handleDayClick(day)}
                className="flex flex-col items-center justify-center p-1 relative rounded-xl transition-all"
              >
                <div 
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300
                    ${isSelected 
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-200 scale-105' 
                        : isDayToday 
                            ? 'bg-indigo-50 text-indigo-600 font-bold border border-indigo-100' 
                            : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {day}
                </div>
                
                {/* Dots */}
                <div className="h-1.5 mt-1">
                   {hasWorkout && (
                     <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-gray-400' : 'bg-green-500'}`}></div>
                   )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details */}
      <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-end justify-between px-1">
           <h3 className="font-bold text-gray-800 text-xl">
              {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
           </h3>
           <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
              {isToday(selectedDate) ? '今天' : `周${['日', '一', '二', '三', '四', '五', '六'][selectedDate.getDay()]}`}
           </span>
        </div>

        {selectedDateLogs.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-12 text-gray-400 bg-white rounded-3xl border border-gray-100/50 border-dashed">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-2xl grayscale opacity-50">
                    📅
                </div>
                <p className="text-sm font-medium text-gray-500">本日暂无运动记录</p>
                {isToday(selectedDate) && (
                    <p className="text-xs text-indigo-500 mt-1">今天是个好日子，动起来吧！</p>
                )}
           </div>
        ) : (
           <div className="space-y-3">
             {selectedDateLogs
                .sort((a, b) => b.timestamp - a.timestamp)
                .map(log => (
                <div key={log.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group transition-transform active:scale-95">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-lg shrink-0 shadow-sm shadow-indigo-100">
                            {log.type.slice(0, 1)}
                        </div>
                        <div>
                            <div className="font-bold text-gray-800 text-base group-hover:text-indigo-600 transition-colors">{log.type}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">{log.durationMinutes} 分钟</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span>{new Date(log.timestamp).toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                        </div>
                    </div>
                    {log.notes && (
                        <div className="text-xs text-gray-400 max-w-[80px] md:max-w-[120px] truncate text-right bg-gray-50 px-2 py-1 rounded-lg">
                            {log.notes}
                        </div>
                    )}
                </div>
            ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;