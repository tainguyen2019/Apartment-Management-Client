import { useEffect } from 'react';
import { useHistory } from 'react-router';
import useAuthData from 'hooks/auth/useAuthData';

const useLoginWatcher = () => {
  const authData = useAuthData();
  const history = useHistory();

  useEffect(() => {
    if (authData) {
      const redirectTo =
        new URLSearchParams(window.location.search).get('redirect') || '/';
      history.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);
};

export default useLoginWatcher;
