import { Link } from "react-router-dom";
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
    <header>
      <div>
        <h1>
          {`Olá, ${username}!`}
        </h1>
      </div>
      <div>
        <Link
          to="/main"
        >
          Usuários
        </Link>
        <Link
          to="/clients"
        >
          Clientes
        </Link>
        <Link
          to="/cat-images"
        >
          Gatos
        </Link>
        <Link
          to="/dog-images"
        >
          Cachorros
        </Link>
      </div>
      <div>
        <button
          type="button"
          onClick={logout}
        >
          Sair
        </button>
      </div>
    </header>
  );
}
