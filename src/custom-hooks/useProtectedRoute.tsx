import { useAuthContext } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useProtectedRoute = (authMode: boolean) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const authStatus = user;

      if (authMode && !authStatus && pathname.toString() !== '/register') {
        router.push('/login');
      }

      if (!authMode && authStatus) {
        router.push('/dashboard');
      }
    }
  }, [router, user, loading, authMode, pathname]);
};

export default useProtectedRoute;
