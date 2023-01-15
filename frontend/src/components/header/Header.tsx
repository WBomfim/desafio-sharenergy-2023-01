import { Link, Button } from '@mui/material';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { clearStorage } from "../../helpers/handleStorage";
import { getToken } from "../../helpers/handleStorage";

export default function Header(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getName = () => {
      const token = getToken();
      const decodedToken = decodeToken(token) as { username: string };
      setUsername(decodedToken.username);
    };

    getName();
  }, []);

  const logout = () => {
    clearStorage();
    navigate("/login");
  };

  return (
    <header
      className={`flex flex-wrap justify-between items-center
        bg-slate-200 p-8 rounded-b-xl shadow-md`}
    >
      <div
        className="flex pl-10"
      >
        <h1
          className="text-2xl font-bold"
        >
          {`Olá, ${username}!`}
        </h1>
      </div>
      <div
        className="flex gap-10"
      >
        <Link
          className="font-bold text-lg hover:text-teal-600"
          underline="none"
          color="inherit"
          href='/main'
        >
          Usuários
        </Link>
        <Link
          className="font-bold text-lg hover:text-teal-600"
          underline="none"
          color="inherit"
          href='/clients'
        >
          Clientes
        </Link>
        <Link
          className="font-bold text-lg hover:text-teal-600"
          underline="none"
          color="inherit"
          href='/cat-images'
        >
          Gatos
        </Link>
        <Link
          className="font-bold text-lg hover:text-teal-600"
          underline="none"
          color="inherit"
          href='/dog-images'
        >
          Cachorros
        </Link>
      </div>
      <div>
        <Button
          className='bg-teal-600 hover:bg-teal-700 padd font-bold px-10 py-2'
          variant='contained'
          type="button"
          onClick={logout}
        >
          Sair
        </Button>
      </div>
    </header>
  );
}
