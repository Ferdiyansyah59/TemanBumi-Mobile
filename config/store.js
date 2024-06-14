import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token, data) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();

  function authenticate(token, data) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('data', JSON.stringify(data));
  }

  function logout(m) {
    setAuthToken(m);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('data');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
