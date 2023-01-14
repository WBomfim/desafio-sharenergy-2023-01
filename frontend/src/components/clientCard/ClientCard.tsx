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
};

export default function ClientCard({ client, deleteClient}: ClientCardProps): JSX.Element {

  return (
    <section>
      <h1>{client.name}</h1>
      <p>{client.email}</p>
      <p>{client.phone}</p>
      <p>{client.address}</p>
      <p>{client.cpf}</p>
      <div>
        <button>Editar</button>
        <button
          type="button"
          onClick={() => deleteClient(client._id)}
        >
          Excluir
        </button>
      </div>
    </section>
  );
}
