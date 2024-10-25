'use client';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import { useAuthContext } from '@/context/AuthContext';
import useProtectedRoute from '@/custom-hooks/useProtectedRoute';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { loading } = useAuthContext();
  const router = useRouter();
  useProtectedRoute(false);

  if (loading) {
    return (
      <div className='h-screen w-full grid place-content-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='grid place-content-center h-screen w-full space-y-4'>
      <h1>Welcome to the App</h1>
      <p>Discover the features of our app!</p>
      <Button className='md:w-fit' onClick={() => router.push('/register')}>
        Get Started
      </Button>

      <Button className='md:w-fit' onClick={() => router.push('/login')}>
        Log In
      </Button>
    </div>
  );
};

export default Home;
