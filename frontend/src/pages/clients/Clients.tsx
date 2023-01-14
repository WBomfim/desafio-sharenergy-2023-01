import { useState, useEffect } from "react";
import { requestData, setToken, requestDelete } from "../../helpers/handleRequests";
import ClientCard, { Client } from "../../components/clientCard/ClientCard";
import Modal from "../../components/modal/Modal";
import RegisterCard from "../../components/registerCard/RegisterCard";
import Header from "../../components/header/Header";

export default function Clients(): JSX.Element {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientToUpdate, setClientToUpdate] = useState<Client>();
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [isUpdate, setUpdate] = useState(false);

  const filteredClients = clients.filter((client) => {
    return client.name.toLowerCase().includes(search.toLowerCase());
  });

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

  const updateClient = async (clientId: string) => {
    setToken();
    const client = await requestData<Client>(`/clients/${clientId}`);
    setClientToUpdate(client);
    setUpdate(true);
  };

  const deleteClient = async (clientId: string) => {
    setToken();
    await requestDelete(`/clients/${clientId}`);
    getClients();
  };

  return (
    <>
      <Header />
      <main>
        <div>
          <input
            type="text"
            placeholder="Pesquisar cliente"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setRegister(true)}
          >
            Adicionar
          </button>
        </div>
        {isLoading ? (
          <div>
            <p>Carregando...</p>
          </div>
        ) : (
          <div>
            <section>
              {search.length > 0 ? (
                filteredClients.map((client) => (
                  <ClientCard
                    key={client._id}
                    client={client}
                    updateClient={updateClient}
                    deleteClient={deleteClient}
                  />
                ))
              ) : (
                clients.map((client) => (
                  <ClientCard
                    key={client._id}
                    client={client}
                    updateClient={updateClient}
                    deleteClient={deleteClient}
                  />
                ))
              )}
            </section>
            <div>
              {isRegister && (
                <Modal setShow={setRegister}>
                  <RegisterCard
                    closeModal={setRegister}
                    reloadClients={getClients}
                  />
                </Modal>
              )}
            </div>
            <div>
            {isUpdate && (
              <Modal setShow={setUpdate}>
                <RegisterCard
                  closeModal={setUpdate}
                  reloadClients={getClients}
                  client={clientToUpdate}
                />
              </Modal>
            )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
