import type { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const STATUSES = ['new', 'completing', 'completed'];

const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const response = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  name: 'NOTAIMAGCOIN',
  ticker: 'NMC',
  marketCap: randInt(1_000, 100_000_000),
  volume: randInt(100, 1_000_000),
  tx: '234/249',
  growth: randInt(0, 99),
  watchers: randInt(0, 99),
  holders: randInt(0, 99),
  status: STATUSES[randInt(0, STATUSES.length - 1)],
}));

export const init = (apiInstance: AxiosInstance) => {
  const apiMock = new MockAdapter(apiInstance, { onNoMatch: 'passthrough', delayResponse: 1000 });
  apiMock.onGet('/memescope').reply(() => {
    return [200, response];
  });
};
