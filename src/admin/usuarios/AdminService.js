// Aquí irán las funciones para interactuar con la API de administradores

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1/admins';

export async function fetchAdmins() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener administradores');
  return res.json();
}

// export async function createAdmin(data) { ... }
// export async function updateAdmin(id, data) { ... }
// export async function deleteAdmin(id) { ... }
