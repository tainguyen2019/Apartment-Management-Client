import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useAuthData from 'hooks/auth/useAuthData';
import { authPaths } from 'routes/paths';

const useLogoutWatcher = () => {
  const authData = useAuthData();
  const { push } = useHistory();

  useEffect(() => {
    if (!authData) {
      let redirectTo = encodeURIComponent(
        window.location.pathname + window.location.search,
      );
      if (redirectTo.localeCompare('login') === 0) redirectTo = '/';
      push(authPaths.login(redirectTo).path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);
};

export default useLogoutWatcher;
