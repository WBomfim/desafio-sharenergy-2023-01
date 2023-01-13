type User = {
  username: string;
  password: string;
}

export const saveLogin = (user: User): void => {
  localStorage.setItem('login', JSON.stringify(user));
};

export const getLogin = (): User => {
  const user = localStorage.getItem('login');
  return JSON.parse(user as string);
};

export const saveToken = (token: string): void => {
  localStorage.setItem('token', token);
}

export const getToken = (): string => {
  return localStorage.getItem('token') as string
}

export const clearStorage = (): void => {
  localStorage.removeItem('login');
  localStorage.removeItem('token');
}
