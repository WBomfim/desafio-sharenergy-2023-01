import axios from 'axios';
import { getToken } from './handleStorage';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const setToken = (): void => {
  const token  = getToken();
  if (token) {
    api.defaults.headers.common.Authorization = token;
  }
};

export const requestRegister = async <T>(rota: string, body: unknown): Promise<T> => {
  const { data } = await api.post(rota, body);
  return data;
};

export const requestData = async <T>(rota: string): Promise<T> => {
  const { data } = await api.get(rota);
  return data;
};

export const requestUpdate = async <T>(rota: string, body: unknown): Promise<T> => {
  const { data } = await api.put(rota, body);
  return data;
};

export const requestDelete = async <T>(rota: string): Promise<T> => {
  const { data } = await api.delete(rota);
  return data;
}
