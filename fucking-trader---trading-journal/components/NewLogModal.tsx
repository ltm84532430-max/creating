
import React, { useState } from 'react';
import { TradeType, TradeLog } from '../types';

interface NewLogModalProps {
  onClose: () => void;
  onSubmit: (log: Omit<TradeLog, 'id'>) => void;
}

export const NewLogModal: React.FC<NewLogModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    pair: '',
    type: TradeType.LONG,
    pnl: '',
    notes: '',
    insight: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      pnl: parseFloat(formData.pnl) || 0,
      date: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-2xl font-bold mb-6">New Trading Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Ticker / Pair</label>
              <input 
                required
                type="text" 
                placeholder="e.g. BTC/USDT"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
                value={formData.pair}
                onChange={e => setFormData({...formData, pair: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Direction</label>
              <select 
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors appearance-none"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as TradeType})}
              >
                <option value={TradeType.LONG}>LONG</option>
                <option value={TradeType.SHORT}>SHORT</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Net P&L ($)</label>
            <input 
              required
              type="number" 
              placeholder="0.00"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors"
              value={formData.pnl}
              onChange={e => setFormData({...formData, pnl: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">Trade Context</label>
            <textarea 
              rows={3}
              placeholder="What happened in the market?"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase">The Ultimate Lesson</label>
            <input 
              type="text" 
              placeholder="Distill the trade into one sentence"
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors italic"
              value={formData.insight}
              onChange={e => setFormData({...formData, insight: e.target.value})}
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-zinc-800 text-white rounded-xl font-semibold hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors"
            >
              Log Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
