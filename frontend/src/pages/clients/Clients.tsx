import { useState, useEffect } from "react";
import { requestData, setToken } from "../../helpers/handleRequests";
import ClientCard, { Client } from "../../components/clientCard/ClientCard";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const getClients = async () => {
      setToken();
      const response = await requestData<Client[]>("/clients");
      setClients(response);
    };
    getClients();
  }, []);

  return (
    <main>
      <section>
        {clients.map((client) => (
          <ClientCard key={client._id} client={client} />
        ))}
      </section>
    </main>
  );
}
