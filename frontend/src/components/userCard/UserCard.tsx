export type User = {
  fullName: string;
  age: number;
  email: string;
  username: string;
  picture: string;
};

export default function UserCard({ user }: { user: User}): JSX.Element {
  return (
    <section
      className={`flex flex-wrap gap-5 items-center w-4/5 mt-5`}
    >
      <img 
        className="w-30 h-30 rounded-full"
        src={user.picture}
        alt={`Foto de ${user.fullName}`}
      />
      <div
        className="flex flex-wrap gap-5 max-w-4xl border-b-2 border-gray-300"
      >
        <div
          className="flex flex-col gap-5"
        >
          <h1
            className="text-2xl font-bold"
          >
            {user.fullName}
          </h1>
          <p
            className="text-gray-400 text-lg"
          >
            {user.username}
          </p>
        </div>
        <div
          className="flex flex-col gap-5"
        >
          <p
            className="text-lg"
            >
            {`${user.age} anos`}
          </p>
          <p
            className="text-lg"
          >
            {user.email}
          </p>
        </div>
      </div>
    </section>
  );
}
