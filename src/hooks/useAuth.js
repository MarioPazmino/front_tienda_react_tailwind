import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  // lógica de autenticación aquí
  return { user, setUser };
}
