// src/lib/api.js
export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

// Convenience wrappers (paths are relative to API_BASE)
export const login    = (identifier, password) => postJSON('/login', { identifier, password });
export const register = (payload) => postJSON('/register', payload);
export const getMe    = () => getJSON('/me');
export const getHealth = () => getJSON('/health'); // optional if route exists
// Optional if you referenced it anywhere:
export const getStatus  = () => getJSON('/status'); // only if you actually have this route

function toUrl(path) {
  return path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
}

function authHeaders() {
  try {
    const t = localStorage.getItem('token');
    return t ? { Authorization: `Bearer ${t}` } : {};
  } catch {
    return {};
  }
}

async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export async function getJSON(path, init = {}) {
  const res = await fetch(toUrl(path), {
    method: 'GET',
    headers: { Accept: 'application/json', ...authHeaders(), ...(init.headers || {}) },
    credentials: init.credentials ?? 'omit',
    ...init,
  });
  return handle(res);
}

export async function postJSON(path, body, init = {}) {
  const res = await fetch(toUrl(path), {
    method: init.method ?? 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...authHeaders(), ...(init.headers || {}) },
    body: body != null ? JSON.stringify(body) : undefined,
    credentials: init.credentials ?? 'omit',
    ...init,
  });
  return handle(res);
}

export async function putJSON(path, body, init = {}) {
  return postJSON(path, body, { ...init, method: 'PUT' });
}

export async function delJSON(path, init = {}) {
  const res = await fetch(toUrl(path), {
    method: 'DELETE',
    headers: { Accept: 'application/json', ...authHeaders(), ...(init.headers || {}) },
    credentials: init.credentials ?? 'omit',
    ...init,
  });
  return handle(res);
}
