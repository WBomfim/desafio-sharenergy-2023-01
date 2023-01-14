export type Client = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  cpf?: string;
};

export default function ClientCard({ client }: { client: Client }): JSX.Element {
  return (
    <section>
      <h1>{client.name}</h1>
      <p>{client.email}</p>
      <p>{client.phone}</p>
      <p>{client.address}</p>
      <p>{client.cpf}</p>
      <div>
        <button>Editar</button>
        <button>Excluir</button>
      </div>
    </section>
  );
}
