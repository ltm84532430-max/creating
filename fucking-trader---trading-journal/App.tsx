
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { MastersSection } from './components/MastersSection';
import { TradeJournal } from './components/TradeJournal';
import { InsightsList } from './components/InsightsList';
import { NewLogModal } from './components/NewLogModal';
import { TradeLog, TradeType, MarketInsight } from './types';

const App: React.FC = () => {
  const [logs, setLogs] = useState<TradeLog[]>([]);
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'journal' | 'insights'>('journal');

  // Load initial data
  useEffect(() => {
    const savedLogs = localStorage.getItem('ft_logs');
    const savedInsights = localStorage.getItem('ft_insights');

    if (savedLogs) setLogs(JSON.parse(savedLogs));
    else {
      const initialLogs: TradeLog[] = [
        {
          id: '1',
          date: new Date().toISOString(),
          pair: 'BTC/USDT',
          type: TradeType.LONG,
          pnl: 1250,
          notes: 'Strong bounce from 60k support. Volume confirmed the reversal.',
          insight: "Don't fight the trend on high timeframes."
        },
        {
          id: '2',
          date: new Date(Date.now() - 86400000).toISOString(),
          pair: 'ETH/USDT',
          type: TradeType.SHORT,
          pnl: -400,
          notes: 'Attempted to short the local top. Stopped out quickly.',
          insight: 'Respect the local momentum even if HTF is bearish.'
        }
      ];
      setLogs(initialLogs);
      localStorage.setItem('ft_logs', JSON.stringify(initialLogs));
    }

    if (savedInsights) setInsights(JSON.parse(savedInsights));
    else {
      const initialInsights: MarketInsight[] = [
        {
          id: 'i1',
          title: 'The Discipline of Doing Nothing',
          content: 'Sometimes the best trade is the one you don\'t take. Patience is the ultimate edge in this volatile market.',
          date: new Date().toISOString(),
          category: 'Psychology'
        },
        {
          id: 'i2',
          title: 'Liquidity Grab Mechanics',
          content: 'Watch the previous day highs and lows. Market usually hunts these stops before making the real move.',
          date: new Date().toISOString(),
          category: 'Strategy'
        }
      ];
      setInsights(initialInsights);
      localStorage.setItem('ft_insights', JSON.stringify(initialInsights));
    }
  }, []);

  const addLog = (log: Omit<TradeLog, 'id'>) => {
    const newLog = { ...log, id: Math.random().toString(36).substr(2, 9) };
    const updated = [newLog, ...logs];
    setLogs(updated);
    localStorage.setItem('ft_logs', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <Hero />
      
      <MastersSection />
      
      <div className="max-w-4xl mx-auto px-6 mb-24">
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveTab('journal')}
              className={`text-lg font-medium transition-all ${activeTab === 'journal' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Daily Journal
            </button>
            <button 
              onClick={() => setActiveTab('insights')}
              className={`text-lg font-medium transition-all ${activeTab === 'insights' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Insights
            </button>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors"
          >
            New Entry
          </button>
        </div>

        {activeTab === 'journal' ? (
          <TradeJournal logs={logs} />
        ) : (
          <InsightsList insights={insights} />
        )}
      </div>

      {isModalOpen && (
        <NewLogModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addLog} 
        />
      )}
    </Layout>
  );
};

export default App;
