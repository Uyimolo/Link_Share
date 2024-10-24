'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Button from '@/components/Button';

const Home = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    // If the user is already logged in, redirect to dashboard
    if (user) {
      console.log(user)
      router.replace('/dashboard');
    }
  }, [user, router]);

  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>Discover the features of our app!</p>
      <Button onClick={() => router.push('/register')}>Get Started</Button>
      <Button onClick={() => router.push('/login')}>Log In</Button>
    </div>
  );
};

export default Home;
