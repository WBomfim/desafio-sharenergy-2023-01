import { useState, useEffect } from "react";
import UserCard, { User } from "../../components/userCard/UserCard";
import { requestData, setToken } from "../../helpers/handleRequests";

export default function Main() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      setToken();
      const users = await requestData<User[]>("/users/page/1");
      setUsers(users);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
        <button
          type="button"
        >
          anterior
        </button>
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
        <button
          type="button"
        >
          próximo
        </button>
      </div>
    </main>
  );
}
