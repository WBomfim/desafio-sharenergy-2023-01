import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { requestRegister } from '../../helpers/handleRequests';
import { saveToken, saveLogin, getLogin, clearStorage } from '../../helpers/handleStorage';

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
});

type Token = {
  token: string;
};

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [failedTryLogin, setFailedTryLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyRememberMe = async (): Promise<void> => {
      const { username, password } = getLogin();
      if (!username || !password) return;
      login(username, password);
    };
    verifyRememberMe();
  }, []);

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

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setFailedTryLogin(false);

    try {
      const { token } = await requestRegister<Token>("/login", {
        username,
        password
      });

      if (rememberMe) {
        saveLogin({ username, password });
      }

      saveToken(token);
      navigate('/home');

    } catch (error) {
      setIsLoading(false);
      setFailedTryLogin(true);
      clearStorage();
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
  
          <label htmlFor='remember-me'>
            <input
              id='remember-me'
              type='checkbox'
              onChange={({ target: { checked } }) => setRememberMe(checked)}
            />
            Lembrar-me
          </label>
  
          <button
            type='submit'
            disabled={disabledButton}
            onClick={(event) => {
              event.preventDefault();
              login(username, password);
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
