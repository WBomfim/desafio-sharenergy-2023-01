import { useState, useEffect } from "react";
import { requestData, setToken, requestDelete } from "../../helpers/handleRequests";
import ClientCard, { Client } from "../../components/clientCard/ClientCard";
import Modal from "../../components/modal/Modal";
import RegisterCard from "../../components/registerCard/RegisterCard";
import Header from "../../components/header/Header";
import { Button, CircularProgress, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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
      <main
        className="flex flex-col items-center"
      >
        <div
          className="flex gap-10 mt-5"
        >
          <TextField
            type="text"
            placeholder="Pesquisar cliente"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="bg-teal-600 hover:bg-teal-700 font-bold px-8 shadow-lg text-white"
            type="button"
            onClick={() => setRegister(true)}
          >
            <AddIcon />
            Cadastrar
          </Button>
        </div>
        {isLoading ? (
          <div>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <>
            <section
              className="flex flex-col items-center gap-10 w-full"
            >
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
            <section>
            {isUpdate && (
              <Modal setShow={setUpdate}>
                <RegisterCard
                  closeModal={setUpdate}
                  reloadClients={getClients}
                  client={clientToUpdate}
                />
              </Modal>
            )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
