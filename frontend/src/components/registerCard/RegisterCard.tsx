import { useState } from 'react';
import { requestRegister, setToken } from '../../helpers/handleRequests';

type CardProps = {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  reloadClients: () => Promise<void>;
};

export default function RegisterCard(
  { closeModal, reloadClients }: CardProps
): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [failedTryRegister, setFailedTryRegister] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  return (
    <section>
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label htmlFor="phone">
          Telefone
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>

        <label htmlFor="address">
          Endereço
          <input
            type="text"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>

        <label htmlFor="cpf">
          CPF
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
        </label>

        <button
          type="button"
          onClick={registerClient}
        >
          Salvar
        </button>
      </form>
      <div>
        {failedTryRegister && (
          <p>{errorMessage}</p>
        )}
      </div>
    </section>
  );
}
