import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { requestRegister, setToken, requestUpdate } from '../../helpers/handleRequests';
import { Client } from '../clientCard/ClientCard';

type CardProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  reloadClients: () => Promise<void>;
  client?: Client;
};

export default function RegisterCard(
  { closeModal, reloadClients, client }: CardProps
): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [failedTryRegister, setFailedTryRegister] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(client.email);
      setPhone(client.phone);
      setAddress(client.address);
      setCpf(client.cpf);
    }
  }, []);

  const registerClient = async () => {
    try {
      setToken();
      await requestRegister('/clients', {
        name,
        email,
        phone,
        address,
        cpf,
      });
      reloadClients();
      closeModal(false);
    } catch (error: any) {
      setFailedTryRegister(true);
      setErrorMessage(error.response.data.message)
    }
  };

  const updateClient = async () => {
    try {
      setToken();
      await requestUpdate(`/clients/${client?._id}`, {
        name,
        email,
        phone,
        address,
        cpf,
      });
      reloadClients();
      closeModal(false);
    } catch (error: any) {
      setFailedTryRegister(true);
      setErrorMessage(error.response.data.message)
    }
  };

  const handleRequest = async () => {
    if (client) {
      await updateClient();
    } else {
      await registerClient();
    }
  };

  return (
    <section>
      <form
        className='flex flex-col gap-8'
      >
        <label
          className='flex flex-col text-gray-500 text-xl font-bold'
          htmlFor="name"
        >
          
          Nome:
          <TextField
            variant='standard'
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label
          className='flex flex-col text-gray-500 text-xl font-bold'
          htmlFor="email"
        >
          Email:
          <TextField
            variant='standard'
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label
          className='flex flex-col text-gray-500 text-xl font-bold'
          htmlFor="phone"
        >
          Telefone:
          <TextField
            variant='standard'
            type="text"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>

        <label
          className='flex flex-col text-gray-500 text-xl font-bold'
          htmlFor="address"
        >
          Endereço:
          <TextField
            variant='standard'
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>

        <label
          className='flex flex-col text-gray-500 text-xl font-bold'
          htmlFor="cpf"
        >
          CPF:
          <TextField
            variant='standard'
            type="text"
            id="cpf"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
        </label>

        <Button
          className='bg-teal-600 hover:bg-teal-700 font-bold shadow-xl text-white h-12'
          variant="contained"
          type="button"
          onClick={handleRequest}
        >
          Salvar
        </Button>
      </form>
      <div>
        {failedTryRegister && (
          <p>{errorMessage}</p>
        )}
      </div>
    </section>
  );
}
