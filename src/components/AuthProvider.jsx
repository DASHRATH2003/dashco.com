import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';

export const AuthContext = createContext({ user: null, loading: true });
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}