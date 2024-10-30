import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useConfirmPageLeave = (shouldConfirm: boolean) => {
  const router = useRouter();
  const [isBlockingNavigation, setIsBlockingNavigation] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldConfirm) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldConfirm]);

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      if (shouldConfirm && isBlockingNavigation) {
        event.preventDefault();
      }
    };

    window.addEventListener('click', handleNavigation);
    window.addEventListener('submit', handleNavigation);

    return () => {
      window.removeEventListener('click', handleNavigation);
      window.removeEventListener('submit', handleNavigation);
    };
  }, [shouldConfirm, isBlockingNavigation]);

  useEffect(() => {
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      if (shouldConfirm) {
        const userConfirmed = window.confirm(
          'You have unsaved changes. Are you sure you want to leave this page?'
        );
        if (!userConfirmed) {
          setIsBlockingNavigation(true);
          return;
        }
      }
      setIsBlockingNavigation(false);
      return originalPush(...args);
    };

    router.replace = (...args) => {
      if (shouldConfirm) {
        const userConfirmed = window.confirm(
          'You have unsaved changes. Are you sure you want to leave this page?'
        );
        if (!userConfirmed) {
          setIsBlockingNavigation(true);
          return;
        }
      }
      setIsBlockingNavigation(false);
      return originalReplace(...args);
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [shouldConfirm, router]);
};

export default useConfirmPageLeave;
