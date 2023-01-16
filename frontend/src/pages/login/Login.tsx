import { Button, TextField, Checkbox } from '@mui/material';
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
      navigate('/main');

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
    <main
      className="flex flex-col justify-center items-center h-screen bg-gray-300"
    >
      <section
        className='flex flex-col items-center gap-8 p-8 bg-white rounded-xl shadow-xl'
      >
        <h1 className='text-4xl font-bold text-gray-700'>Bem Vindo!</h1>
        <form
          className='flex flex-col gap-8'
        >
          <label
          className='flex flex-col text-gray-500 text-xl font-bold'
            htmlFor='name-input'
          >
            Nome:
            <TextField
              id='name-input'
              type='text'
              onChange={({ target: { value } }) => {
                setUsername(value);
              }}
              placeholder='Seu nome aqui!'
            />
          </label>

          <label
            className='flex flex-col text-gray-500 text-xl font-bold'
            htmlFor='password-input'
          >
            Senha:
            <TextField
              id='password-input'
              type='password'
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
              placeholder='**********'
            />
          </label>

          <label
            className='text-gray-600 font-bold'
            htmlFor='remember-me'
          >
            <Checkbox
              id='remember-me'
              onChange={({ target: { checked } }) => setRememberMe(checked)}
            />
            Lembrar-me
          </label>
  
          <Button
            className='bg-teal-600 hover:bg-teal-700 font-bold shadow-xl text-white h-12'
            type='submit'
            disabled={disabledButton}
            onClick={(event) => {
              event.preventDefault();
              login(username, password);
            }}
          >
            ENTRAR
          </Button>

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
