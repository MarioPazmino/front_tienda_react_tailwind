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
  const token = localStorage.getItem('admin_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${ADMIN_BASE}/register`, { method: 'POST', headers, body: JSON.stringify(data) });
  // Try to read as text (covers non-json error bodies), then parse if possible
  const text = await res.text().catch(() => '');
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch (err) { json = {}; }

  if (!res.ok) {
    // Map common backend messages to friendly Spanish messages
    const raw = (json && json.error) ? json.error : (text || `HTTP ${res.status}`);
    // Duplicate key from Mongo
    if (raw && typeof raw === 'string' && raw.includes('E11000')) {
      throw new Error('El usuario ya existe (nombre de usuario duplicado)');
    }
    // If backend returned validation or custom message
    if (raw && typeof raw === 'string') throw new Error(raw);
    if (json && json.message) throw new Error(json.message);
    throw new Error('Error al crear admin');
  }

  return json;
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
