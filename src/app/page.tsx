'use client';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { useAuthContext } from '@/context/AuthContext';
import useProtectedRoute from '@/custom-hooks/useProtectedRoute';

const Home = () => {
  const { loading } = useAuthContext();
  useProtectedRoute(false);

  if (loading) {
    return (
      <div className='h-screen w-full grid place-content-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>Discover the features of our app!</p>
      <Button>Get Started</Button>
      <Button>Log In</Button>
    </div>
  );
};

export default Home;
