import * as React from 'react';
import type User from '../types/user';

export const UserContext = React.createContext({});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}
