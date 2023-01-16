import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

export type Client = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
};

type ClientCardProps = {
  client: Client;
  deleteClient: (clientId: string) => void;
  updateClient: (clientId: string) => void;
};

export default function ClientCard(
  { client, deleteClient, updateClient}: ClientCardProps
): JSX.Element {

  return (
    <section
      className="flex flex-wrap gap-10 items-center mt-5"
    >
      <AccountCircleIcon className='text-9xl text-gray-800 ' />
      <div
        className="flex flex-wrap gap-5 max-w-4xl border-b-2 border-gray-300"
      >
        <div
          className="flex flex-col justify-between"
        >
          <h1
            className="text-2xl font-bold"
          >
            {client.name}
          </h1>
          <p
            className="text-gray-400 text-lg"
          >
            {client.cpf}
          </p>
        </div>
        <div
          className="flex flex-col gap-2"
        >
          <p className="text-lg">{client.email}</p>
          <p className="text-lg">{client.phone}</p>
          <p className="text-lg">{client.address}</p>
        </div>
      </div>
      <div
        className="flex flex-col gap-7"
      >
        <Button
          className='bg-teal-600 hover:bg-teal-700 font-bold px-8 shadow-lg text-white'
          type="button"
          variant='contained'
          onClick={() => updateClient(client._id)}
        >
          Editar
        </Button>
        <Button
          className='font-bold'
          type="button"
          variant='outlined'
          color='error'
          onClick={() => deleteClient(client._id)}
        >
          Excluir
        </Button>
      </div>
    </section>
  );
}
