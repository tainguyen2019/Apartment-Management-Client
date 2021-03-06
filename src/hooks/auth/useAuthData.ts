import authService from 'services/auth';
import useStorage from 'hooks/useStorage';

const useAuthData = () => {
  const [encryptedToken] = useStorage<string>(authService.storageKey);
  return (
    (typeof encryptedToken === 'string' &&
      authService.parseEncryptedToken(encryptedToken)) ||
    undefined
  );
};

export default useAuthData;
