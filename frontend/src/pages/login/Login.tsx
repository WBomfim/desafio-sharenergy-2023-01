import { useState, useEffect } from 'react';
import { z } from 'zod';

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
});

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [failedTryRegister, setFailedTryRegister] = useState<boolean>(false);

  useEffect(() => {
    const verifyRegisterData = (): void => {
      const { success } = userSchema.safeParse({
        username,
        password
      })
      
      setDisabledButton(!success);
    };
    verifyRegisterData();
  }, [username, password]);

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
           className='btnlogin'
            type='submit'
            disabled={disabledButton}
          >
            ENTRAR
          </button>
          <div className='failedLogin'>
            {failedTryRegister && (
              <p>Usuário ou senha invalido</p>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};
