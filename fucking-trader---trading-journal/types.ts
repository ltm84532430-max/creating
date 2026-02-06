
export enum TradeType {
  LONG = 'LONG',
  SHORT = 'SHORT'
}

export interface TradeLog {
  id: string;
  date: string;
  pair: string;
  type: TradeType;
  pnl: number;
  notes: string;
  insight: string;
}

export interface MarketInsight {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Strategy' | 'Psychology' | 'Market';
}
