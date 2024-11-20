import { useAuthContext } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Custom hook to protect routes based on authentication mode and user status.
 *
 * @param authMode - A boolean value indicating whether the route requires authentication (true) or not (false).
 * @returns An object with loading state and redirect function
 */
const useProtectedRoute = (authMode: boolean) => {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isRouteLoading, setIsRouteLoading] = useState(true);

  useEffect(() => {
    // If authentication is still loading, keep the loading state
    if (authLoading) {
      return;
    }

    // Determine the appropriate redirect based on auth mode and user status
    const handleRouteProtection = () => {
      // Authenticated users trying to access non-auth routes (login/register)
      if (!authMode && user) {
        router.replace("/admin");
        return;
      }

      // Non-authenticated users trying to access protected routes
      if (authMode && !user && pathname !== "/register") {
        router.replace("/login");
        return;
      }

      // If no redirect is needed, the route is accessible
      setIsRouteLoading(false);
    };

    handleRouteProtection();
  }, [router, user, authLoading, authMode, pathname]);

  return {
    isRouteLoading,
  };
};

export default useProtectedRoute;
