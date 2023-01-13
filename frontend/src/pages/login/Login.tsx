import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { requestRegister } from '../../helpers/handleRequests';
import { saveToken } from '../../helpers/handleStorage';

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
});

type token = {
  token: string;
};

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failedTryLogin, setFailedTryLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyData = (): void => {
      const { success } = userSchema.safeParse({
        username,
        password
      })
      
      setDisabledButton(!success);
    };
    verifyData();
  }, [username, password]);

  const login = async () => {
    setIsLoading(true);
    setFailedTryLogin(false);

    try {
      const { token } = await requestRegister<token>("/login", {
        username,
        password
      });

      saveToken(token);
      navigate('/home');

    } catch (error) {
      setIsLoading(false);
      setFailedTryLogin(true);
    }
  };

  if (isLoading) {
    return (
      <main>
        <section>
          <h1>Carregando...</h1>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section>
        <h1>Bem Vindo!</h1>
        <form>
          <label htmlFor='name-input'>
            Nome:
            <input
              id='name-input'
              type='text'
              onChange={({ target: { value } }) => {
                setUsername(value);
              }}
              placeholder='Seu nome aqui!'
            />
          </label>
          <label htmlFor='password-input'>
            Senha:
            <input
              id='password-input'
              type='password'
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
              placeholder='**********'
            />
          </label>
          <button
            type='submit'
            disabled={disabledButton}
            onClick={(event) => {
              event.preventDefault();
              login();
            }}
          >
            ENTRAR
          </button>
          <div>
            {failedTryLogin && (
              <p>Usuário ou senha invalido</p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};
