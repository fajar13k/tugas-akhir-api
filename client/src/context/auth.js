import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';
import { api, unauthenticateAPI } from '../utils/API';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [restrict, setRestrict] = useState(true);

  const authenticate = async () => {
    await api.get('auth/user')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err?.response);
      })
  };

  const hasRestrictAccess = () => {
    setRestrict(false);
  };

  const logout = async () => {
    await Cookies.remove('heavyrotation');

    unauthenticateAPI();
    setUser(null);
    window.location.reload();
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return;

    authenticate(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticate, isAuthenticated: !!user, token: Cookies.get('heavyrotation'), restrict, hasRestrictAccess, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);
