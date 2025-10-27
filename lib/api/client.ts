import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.memescope.local/v1';

const createInstance = (baseURL?: string) =>
  axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json',
    },
    timeout: 10_000,
    withCredentials: true,
    validateStatus: (status) => status === 200,
  });

export const apiInstance = createInstance(API_BASE_URL);
apiInstance.interceptors.response.use((res) => res);

const get =
  (instance: AxiosInstance) =>
  async <T>(
    url: Parameters<typeof apiInstance.get>[0],
    params?: Parameters<typeof apiInstance.get>[1]
  ) => {
    const response = await instance.get<T>(url, { ...params });
    return response.data;
  };

try {
  import('./mocks').then((mod) => {
    if (typeof mod.init === 'function') {
      mod.init(apiInstance);
    }
  });
} catch {
  // empty
}

const api = {
  get: get(apiInstance),
};

export default api;
