import minimongo from 'minimongo';

const localDB = new minimongo.MemoryDb();

localDB.addCollection('userClient');

type User = {
  username: string;
  password: string;
}

export const saveUser = async (user: User): Promise<void> => {
  await localDB.collections["userClient"].remove({_id: "login"});

  const { username, password } = user;
  const login = {
    _id: 'login',
    username,
    password,
  }

  localDB.collections["userClient"].upsert(login);
}

export const getUser = (): unknown => {
  return localDB.collections["userClient"].findOne({_id: "login"});
}

export const removeUser = (): void => {
  localDB.collections["userClient"].remove({_id: "login"});
}

export const saveToken = async (token: string): Promise<void> => {
  await localDB.collections["userClient"].remove({_id: "token"});

  const tokenLogin = {
    _id: 'token',
    token,
  }

  localDB.collections["userClient"].upsert(tokenLogin);
}

export const getToken = (): unknown => {
  return localDB.collections["userClient"].findOne({_id: "token"});
}

export const removeToken = (): void => {
  localDB.collections["userClient"].remove({_id: "token"});
}
