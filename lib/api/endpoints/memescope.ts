import api from '../client';

export type MemescopeStatusType = 'new' | 'completing' | 'completed';

export type MemescopeType = {
  id: number;
  name: string;
  ticker: string;
  marketCap: number;
  volume: number;
  tx: string;
  growth: number;
  watchers: number;
  holders: number;
  status: MemescopeStatusType;
};

export async function getMemescopeOverview() {
  return api.get<MemescopeType[]>('/memescope');
}
