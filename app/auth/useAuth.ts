import { useContext } from 'react';
import { removeToken, storeToken } from './storage';
import jwtDecode from 'jwt-decode';
import { AuthContext, AuthContextType } from './context';

const useAuth = () => {
  const { user, setUser } = useContext<AuthContextType>(AuthContext);

  const login = async (token: string) => {
    setUser(jwtDecode(token));
    await storeToken(token);
  };

  const logout = () => {
    setUser(null);
    removeToken();
  };

  return { user, login, logout };
};

export default useAuth;
