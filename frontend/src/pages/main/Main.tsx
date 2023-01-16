import { Button, Pagination, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
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
    <>
      <Header/>
      <main
        className="flex flex-col items-center"
      >
        <div
          className="flex gap-5 mt-5"
        >
          <TextField
            type="text"
            id="search-user"
            placeholder="Search a user"
            value={search}
            onChange={(e) => verifyInput(e)}
          />
          <Button
            className="bg-teal-600 hover:bg-teal-700 font-bold px-8 shadow-lg text-white"
            type="button"
            onClick={onSearch}
          >
            Buscar
          </Button>
        </div>
        <div
          className="flex flex-col items-center gap-10 mt-5 w-4/5"
        >
          <div
            className="flex justify-around gap-5 mt-5"
          >
            <Button
              className="font-bold"
              variant="outlined"
              type="button"
              onClick={prevPage}
            >
              anterior
            </Button>
            <Button
              className="font-bold"
              variant="outlined"
              type="button"
              onClick={nextPage}
            >
              próximo
            </Button>
          </div>
          <section
            className="flex flex-col items-center gap-10 w-3/4"
          >
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
    </>
  );
}
