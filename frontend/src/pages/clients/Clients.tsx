import { useState, useEffect } from "react";
import { requestData, setToken, requestDelete } from "../../helpers/handleRequests";
import ClientCard, { Client } from "../../components/clientCard/ClientCard";
import Modal from "../../components/modal/Modal";
import RegisterCard from "../../components/registerCard/RegisterCard";

export default function Clients(): JSX.Element {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setRegister] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    setIsLoading(true);

    try {
      setToken();
      const response = await requestData<Client[]>("/clients");
      setClients(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

  };

  const deleteClient = async (clientId: string) => {
    setToken();
    await requestDelete(`/clients/${clientId}`);
    getClients();
  };

  if (isLoading) {
    return (
      <main>
        <section>
          <h1>Carregando...</h1>
        </section>
      </main>
    )
  }

  return (
    <main>
      <div>
        <input type="text" />
        <button
          type="button"
          onClick={() => setRegister(true)}
        >
          Adicionar
        </button>
      </div>
      <section>
        {clients.map((client) => (
          <ClientCard
            key={client._id}
            client={client}
            deleteClient={deleteClient}
          />
        ))}
      </section>
      {isRegister && (
        <Modal setShow={setRegister}>
          <RegisterCard
            closeModal={setRegister}
            reloadClients={getClients}
          />
        </Modal>
      )}
    </main>
  );
}
