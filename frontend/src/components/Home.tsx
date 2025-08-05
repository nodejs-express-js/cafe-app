import { useUser } from '../hooks/useUser';

const Home = () => {
  const { state: user, dispatch } = useUser();

  if (!user) return <p>Please log in.</p>;

  return (
    <div>
      <h1>Welcome, {user.email}</h1>

    </div>
  );
};

export default Home;
