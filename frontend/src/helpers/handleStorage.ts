import minimongo from 'minimongo';

const localDB = new minimongo.LocalStorageDb({namespace: 'Minimongo'}, true);

type User = {
  username: string;
  password: string;
}

type Token = {
  token: string;
}

const validateCollection = (user: User): void => {
  if (!user.password || !user.username) {
    throw new Error('Invalid user');
  }
}

const createUser = (user: User): User => user;

localDB.addCollection('userClient', validateCollection, createUser);
    

/* type User = {
  username: string;
  password: string;
}

type Token = {
  token: string;
}

export const saveUser = async (user: User): Promise<void> => {
  await localDB.collections["userClient"].remove("login");

  const { username, password } = user;
  const login = {
    _id: 'login',
    username,
    password,
  }

  localDB.collections["userClient"].upsert(login);
}

export const getUser = async (): Promise<User> => {
  return await localDB.collections["userClient"].findOne({_id: "login"});
}

export const removeUser = (): void => {
  localDB.collections["userClient"].remove("login");
}

export const saveToken = async (token: string): Promise<void> => {
  await localDB.collections["userClient"].remove("token");

  const tokenLogin = {
    _id: 'token',
    token,
  }

  localDB.collections["userClient"].upsert(tokenLogin);
}

export const getToken = (): Promise<Token> => {
  return localDB.collections["userClient"].findOne("token");
}

export const removeToken = (): void => {
  localDB.collections["userClient"].remove("token");
} */
