import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const requestRegister = async <T>(rota: string, body: unknown): Promise<T> => {
  const { data } = await api.post(rota, body);
  return data;
};

export const requestData = async <T>(rota: string): Promise<T> => {
  const { data } = await api.get(rota);
  return data;
};
