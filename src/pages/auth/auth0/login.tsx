import { useCallback, useEffect } from 'react';
import type { AuthContextType } from 'src/contexts/auth/auth0-context';
import { useAuth } from 'src/hooks/use-auth';
import { paths } from 'src/paths';
import type { Page as PageType } from 'src/types/page';

const Page: PageType = () => {
  const { loginWithRedirect } = useAuth<AuthContextType>();

  const handle = useCallback(
    async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const returnTo = searchParams.get('returnTo');
      await loginWithRedirect({
        returnTo: returnTo || paths.dashboard.index
      });
    },
    [loginWithRedirect]
  );

  useEffect(
    () => {
      handle();
    },
    // eslint-disable-next-line 
    []
  );

  return null;
};

export default Page;
