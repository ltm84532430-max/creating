
import React from 'react';
import { MarketInsight } from '../types';

interface InsightsListProps {
  insights: MarketInsight[];
}

export const InsightsList: React.FC<InsightsListProps> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {insights.map((insight) => (
        <div key={insight.id} className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 hover:border-white/20 transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-2 py-1 bg-white/5 rounded">
              {insight.category}
            </span>
            <span className="text-[10px] text-zinc-600 font-medium">
              {new Date(insight.date).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-4 group-hover:text-zinc-200 transition-colors">
            {insight.title}
          </h3>
          <p className="text-zinc-500 leading-relaxed text-sm">
            {insight.content}
          </p>
        </div>
      ))}
    </div>
  );
};
