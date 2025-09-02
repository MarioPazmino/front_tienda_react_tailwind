// Servicio centralizado para administradores (usable desde cualquier componente)
import { API_BASE } from '../utils/api';

// Rutas del backend para admins
const ADMIN_BASE = `${API_BASE}/admin`;
// list endpoint según serverless.yml
const ADMINS_LIST_URL = `${ADMIN_BASE}/list`;

export async function fetchAdmins() {
  const res = await fetch(ADMINS_LIST_URL, { method: 'GET' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al obtener administradores: ${res.status} ${text}`);
  }
  return res.json();
}

export async function fetchAdmin(id) {
  const res = await fetch(`${ADMIN_BASE}/${id}`);
  if (!res.ok) throw new Error('Error al obtener admin');
  return res.json();
}

export async function createAdmin(data) {
  // registro de admin en backend: /admin/register
  const res = await fetch(`${ADMIN_BASE}/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Error al crear admin');
  return res.json();
}

export async function updateAdmin(id, data) {
  const res = await fetch(`${ADMIN_BASE}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Error al actualizar admin');
  return res.json();
}

export async function deleteAdmin(id) {
  const res = await fetch(`${ADMIN_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar admin');
  return res.json();
}
