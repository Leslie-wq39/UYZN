// src/api/auth.js
import { getJSON, postJSON } from "../lib/api";

/**
 * Register a new user (applicant or employer/sponsor).
 * Sends both password_confirmation and confirm_password for backend compatibility.
 */
export async function registerUser(payload) {
  const body = {
    ...payload,
    confirm_password:
      payload.confirm_password ?? payload.password_confirmation,
    password_confirmation:
      payload.password_confirmation ?? payload.confirm_password,
  };

  const data = await postJSON("/register", body);

  if (data.token) localStorage.setItem("token", data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function login(payload) {
  const data = await postJSON("/login", payload);
  if (data.token) localStorage.setItem("token", data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function me() {
  return getJSON("/me");
}

export async function logout() {
  try {
    await postJSON("/logout", {});
  } catch {
    /* ignore */
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
