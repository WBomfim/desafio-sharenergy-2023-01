import mongoose from 'mongoose';
import { clientSchema } from '../models/Client';
import { MONGO_DB_URL } from '../config/connection';

mongoose.connect(MONGO_DB_URL);

const Client = mongoose.model('Client', clientSchema);

const clients = [
  {
    name: "Cliente 1",
    email: "cliente1@client.com" ,
    phone: "4111111111",
    address: "Rua dos clientes, nº 1",
    cpf: "11111111111",
  },
  {
    name: "Cliente 2",
    email: "cliente2@client.com" ,
    phone: "4122222222",
    address: "Rua dos clientes, nº 2",
    cpf: "22222222222",
  },
  {
    name: "Cliente 3",
    email: "cliente3@client.com" ,
    phone: "4133333333",
    address: "Rua dos clientes, nº 3",
    cpf: "33333333333",
  },
  {
    name: "Cliente 4",
    email: "cliente4@client.com" ,
    phone: "4144444444",
    address: "Rua dos clientes, nº 4",
    cpf: "44444444444",
  }
];

const createClients = async (): Promise<void> => {
  Client.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
  });

  for (const client of clients) {
    await Client.create(client);
  }
};

createClients().then(() => {
  console.log('Clients created successfully');
  mongoose.connection.close();
}).catch((error) => {
  console.log('Error executing seeders', error);
  mongoose.connection.close();
});
