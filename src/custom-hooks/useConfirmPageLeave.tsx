import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const useConfirmPageLeave = (shouldConfirm: boolean) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Handle the browser/tab close scenario
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldConfirm) {
        event.preventDefault();
        event.returnValue = ''; // This triggers the confirmation dialog
      }
    };

    // Attach the event listener for browser/tab close
    if (shouldConfirm) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldConfirm]);

  useEffect(() => {
    // Handle the route change interception
    const handleRouteChange = (url: string) => {
      if (shouldConfirm) {
        const userConfirmed = window.confirm(
          'You have unsaved changes. Are you sure you want to leave this page?'
        );
        if (!userConfirmed) {
          throw new Error('Route change aborted due to unsaved changes.');
        }
      }
    };

    // Listen for the `push` or `replace` methods for route change
    const originalPush = router.push;
    const originalReplace = router.replace;

    // Intercept `push`
    router.push = (...args) => {
      handleRouteChange(args[0]);
      return originalPush(...args);
    };

    // Intercept `replace`
    router.replace = (...args) => {
      handleRouteChange(args[0]);
      return originalReplace(...args);
    };

    // Cleanup the method overrides on unmount
    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [pathname, shouldConfirm, router]);
};

export default useConfirmPageLeave;
