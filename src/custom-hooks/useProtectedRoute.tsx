import { useAuthContext } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Custom hook to protect routes based on authentication mode and user status.
 *
 * @param authMode - A boolean value indicating whether the route requires authentication (true) or not (false).
 * @returns A function that will redirect the user to the appropriate page based on the authentication mode and user status.
 */
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
        router.push('/admin');
      }
    }
  }, [router, user, loading, authMode, pathname]);

  return useProtectedRoute;
};

export default useProtectedRoute;

