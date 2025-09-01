// Aquí puedes centralizar tus llamadas a la API

const API_BASE = 'https://xf5dnqgvpe.execute-api.us-east-2.amazonaws.com/dev';

export async function fetchProducts() {
  // return fetch(`${API_BASE}/products`).then(res => res.json());
}

export async function loginAdmin(username, password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Error al iniciar sesión');
  }
  return res.json();
}
