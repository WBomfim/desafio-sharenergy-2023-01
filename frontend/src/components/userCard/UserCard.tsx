export type User = {
  fullName: string;
  age: number;
  email: string;
  username: string;
  picture: string;
};

export default function UserCard({ user }: { user: User}): JSX.Element {
  return (
    <section>
      <img src={user.picture} alt={`Foto de ${user.fullName}`} />
      <h1>{user.fullName}</h1>
      <p>{user.age}</p>
      <p>{user.email}</p>
      <p>{user.username}</p>
    </section>
  );
}
