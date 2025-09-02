// utils/jwt.js
// Decodifica un JWT y retorna el payload (sin validar firma)
export function decodeJWT(token) {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}
