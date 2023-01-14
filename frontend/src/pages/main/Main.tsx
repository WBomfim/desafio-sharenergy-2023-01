import { useState, useEffect } from "react";
import UserCard, { User } from "../../components/userCard/UserCard";
import { requestData, setToken } from "../../helpers/handleRequests";

export default function Main(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isRestore, setIsRestore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUsersPage(page);
  }, [page, isRestore]);

  const getUsersPage = async (param: unknown) => {
    setIsLoading(true);
    let users: User[];
    try {
      setToken();
      if (typeof param === "string") {
        users = await requestData<User[]>(`/users/search?q=${param}`);
      } else {
        users = await requestData<User[]>(`/users/page/${page}`);
      }
      setUsers(users);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const verifyInput = (event: { target: { value: string}}) => {
    const { value } = event.target;
    if (value === "" && users.length !== 10) {
      setIsRestore(!isRestore);
    }
    setSearch(value);
  };

  const onSearch = () => {
    if (search) {
      getUsersPage(search);
    } else {
      getUsersPage(page);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < 10) {
      setPage(page + 1);
    }
  };

  return (
    <main>
      <div>
        <input
          type="text"
          id="search-user"
          placeholder="Search a user"
          value={search}
          onChange={(e) => verifyInput(e)}
        />
        <button
          type="button"
          onClick={onSearch}
        >
          Buscar
        </button>
      </div>
      <div>
        <div>
          <button
            type="button"
            onClick={prevPage}
          >
            anterior
          </button>
          <button
            type="button"
            onClick={nextPage}
          >
            próximo
          </button>
        </div>
        <section>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            users.map((user) => (
              <UserCard key={user.username} user={user} />
            ))
          )}
        </section>
      </div>
    </main>
  );
}
