import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { EXERCISE_TYPES, WorkoutLog } from '../types';
import { getMotivationalQuote } from '../services/geminiService';
import { v4 as uuidv4 } from 'uuid';

interface CheckInModalProps {
  onClose: () => void;
  onSave: (log: WorkoutLog) => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ onClose, onSave }) => {
  const [type, setType] = useState(EXERCISE_TYPES[0]);
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Get AI encouragement
    const motivation = await getMotivationalQuote(type, duration);

    const newLog: WorkoutLog = {
      id: uuidv4(), // In real app, import uuid or generate random string
      date: new Date().toISOString().split('T')[0],
      timestamp: Date.now(),
      type,
      durationMinutes: duration,
      notes,
      aiMotivation: motivation
    };

    onSave(newLog);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">记录运动</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">运动类型</label>
            <div className="flex flex-wrap gap-2">
              {EXERCISE_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    type === t 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">时长 (分钟): {duration}</label>
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5m</span>
              <span>180m</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">备注 (可选)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
              rows={3}
              placeholder="感觉如何？"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="animate-pulse">生成AI鼓励中...</span>
            ) : (
              <>
                <Check size={20} />
                完成打卡
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;