import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { WorkoutLog } from '../../types';

interface StatsViewProps {
  logs: WorkoutLog[];
}

const StatsView: React.FC<StatsViewProps> = ({ logs }) => {
  // Process data for last 7 days
  const getLast7DaysData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('zh-CN', { weekday: 'short' }).replace('周', ''); // Mon, Tue...
      
      const dayLogs = logs.filter(l => l.date === dateStr);
      const minutes = dayLogs.reduce((acc, curr) => acc + curr.durationMinutes, 0);
      
      data.push({
        name: dayLabel,
        minutes: minutes,
        fullDate: dateStr
      });
    }
    return data;
  };

  const data = getLast7DaysData();

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto no-scrollbar">
      <h2 className="text-xl font-bold text-gray-900 mb-6">运动统计</h2>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
        <h3 className="text-sm font-bold text-gray-500 mb-6">近7天运动时长 (分钟)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: '#F3F4F6' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="minutes" radius={[4, 4, 4, 4]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.minutes > 0 ? '#4F46E5' : '#E5E7EB'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Type Distribution - Simple visual */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
         <h3 className="text-sm font-bold text-gray-500 mb-4">偏好分析</h3>
         <div className="space-y-4">
            {Array.from(new Set(logs.map(l => l.type))).slice(0, 5).map(type => {
                const count = logs.filter(l => l.type === type).length;
                const total = logs.length;
                const percentage = Math.round((count / total) * 100);
                return (
                    <div key={type}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-gray-700">{type}</span>
                            <span className="text-gray-400">{count} 次 ({percentage}%)</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                style={{ width: `${percentage}%` }} 
                                className="h-full bg-indigo-500 rounded-full"
                            ></div>
                        </div>
                    </div>
                )
            })}
            {logs.length === 0 && <div className="text-gray-400 text-sm">暂无数据</div>}
         </div>
      </div>
    </div>
  );
};

export default StatsView;