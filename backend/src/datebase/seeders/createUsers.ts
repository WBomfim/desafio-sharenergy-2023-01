import mongoose from 'mongoose';
import { userSchema } from '../models/User';
import { MONGO_DB_URL } from '../config/connection';

mongoose.connect(MONGO_DB_URL);

const User = mongoose.model('User', userSchema);

const users = [
  {
    userName: "desafiosharenergy",
    password: "sh@r3n3rgy",
  }
];

const createUsers = async (): Promise<void> => {
  User.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });

  for (const user of users) {
    await User.create(user);
  }
};

createUsers().then(() => {
  console.log('Users created successfully');
  mongoose.connection.close();
}).catch((error) => {
  console.log('Error executing seeders', error);
  mongoose.connection.close();
});
