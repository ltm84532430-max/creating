
import React from 'react';
import { TradeLog, TradeType } from '../types';

interface TradeJournalProps {
  logs: TradeLog[];
}

export const TradeJournal: React.FC<TradeJournalProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      {logs.map((log) => (
        <div key={log.id} className="group p-6 rounded-2xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-900/80 transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                log.type === TradeType.LONG ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {log.type}
              </span>
              <h3 className="text-xl font-semibold">{log.pair}</h3>
              <span className="text-zinc-600 text-sm">{new Date(log.date).toLocaleDateString()}</span>
            </div>
            <div className={`text-2xl font-bold ${log.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {log.pnl >= 0 ? '+' : ''}${Math.abs(log.pnl).toLocaleString()}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-zinc-400 text-sm leading-relaxed">{log.notes}</p>
            <div className="pt-3 border-t border-white/5">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">Key Insight</p>
              <p className="text-white text-sm font-medium italic">"{log.insight}"</p>
            </div>
          </div>
        </div>
      ))}
      {logs.length === 0 && (
        <div className="text-center py-12 text-zinc-600">No trades recorded yet. Start grinding.</div>
      )}
    </div>
  );
};
