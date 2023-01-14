import { useState, useEffect } from "react";
import UserCard, { User } from "../../components/userCard/UserCard";
import { requestData, setToken } from "../../helpers/handleRequests";

export default function Main() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getUsersPage = async (page: number) => {
      setIsLoading(true);
      try {
        setToken();
        const users = await requestData<User[]>(`/users/page/${page}`);
        setUsers(users);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getUsersPage(page);
  }, [page]);

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
        />
        <button
          type="button"
        >
          Search
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
              <UserCard
                key={user.username}
                user={user}
              />
            ))
          )}
        </section>
      </div>
    </main>
  );
}
