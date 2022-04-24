import * as React from 'react';

export const UserContext = React.createContext({
  user: {
    token: '',
    isAuthenticating: false,
    isAuthenticated: false,
  },
  setUser: () => {},
});
