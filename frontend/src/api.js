/**
 * Centralized API client.
 *
 * The previous frontend (a converted static-HTML template) never actually
 * called the backend — all data fetching lived in `original_script.js`,
 * a file that is not imported anywhere in the React app. This module
 * replaces that dead code with a real client used by the React pages.
 *
 * Configure the backend location with VITE_API_BASE in a .env file.
 * Defaults to the path used by backend/config/constants.php (APP_URL)
 * for a typical XAMPP/Apache setup where the repo lives at /school.
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE || 'http://localhost/school/backend/public';

const TOKEN_KEY = 'schoolAdminToken';
const NAME_KEY = 'schoolAdminName';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setSession(token, name) {
  localStorage.setItem(TOKEN_KEY, token);
  if (name) localStorage.setItem(NAME_KEY, name);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
}

export function getAdminName() {
  return localStorage.getItem(NAME_KEY) || 'Administrator';
}

export function isLoggedIn() {
  return !!getToken();
}

/** Build a full URL for an image path returned by the backend (e.g. "uploads/gallery/x.jpg"). */
export function imageUrl(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}/${path.replace(/^\//, '')}`;
}

/**
 * Core request helper. Talks to the single PHP entry point at
 * backend/public/index.php, which always responds with
 * { status, message, data }.
 */
async function request(path, { method = 'GET', body, isForm = false, auth = false } = {}) {
  const headers = {};
  if (!isForm && body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}/${path.replace(/^\//, '')}`, {
      method,
      headers,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
  } catch (e) {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }

  let json;
  try {
    json = await res.json();
  } catch (e) {
    throw new Error(`Unexpected server response (HTTP ${res.status}).`);
  }

  if (!json.status) {
    if (res.status === 401) {
      clearSession();
      window.location.href = '/admin/login';
    }
    throw new Error(json.message || 'Something went wrong.');
  }
  return json.data;
}

/** Like request(), but resolves with the full { message, data } envelope (some endpoints carry useful info in `message`, e.g. contact form confirmation). */
async function requestFull(path, opts) {
  const headers = {};
  const { method = 'GET', body, isForm = false, auth: useAuth = false } = opts || {};
  if (!isForm && body !== undefined) headers['Content-Type'] = 'application/json';
  if (useAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  let res;
  try {
    res = await fetch(`${API_BASE}/${path.replace(/^\//, '')}`, {
      method,
      headers,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
  } catch (e) {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }
  let json;
  try {
    json = await res.json();
  } catch (e) {
    throw new Error(`Unexpected server response (HTTP ${res.status}).`);
  }
  if (!json.status) {
    throw new Error(json.message || 'Something went wrong.');
  }
  return { message: json.message, data: json.data };
}

/* ===== Auth ===== */
export const auth = {
  login: (email, password) => request('api/auth/login', { method: 'POST', body: { email, password } }),
  logout: () => request('api/auth/logout', { method: 'POST', auth: true }).catch(() => { }),
  me: () => request('api/auth/me', { auth: true }),
};

/* ===== Gallery ===== */
export const gallery = {
  list: (category = 'all') => request(`api/gallery?category=${encodeURIComponent(category)}`),
  create: (formData) => request('api/gallery', { method: 'POST', body: formData, isForm: true, auth: true }),
  update: (id, formData) => request(`api/gallery/update/${id}`, { method: 'POST', body: formData, isForm: true, auth: true }),
  remove: (id) => request(`api/gallery/delete/${id}`, { method: 'POST', auth: true }),
};

/* ===== News & Events ===== */
export const news = {
  list: (type = 'all') => request(`api/news?type=${encodeURIComponent(type)}`),
  get: (id) => request(`api/news/${id}`),
  create: (formData) => request('api/news', { method: 'POST', body: formData, isForm: true, auth: true }),
  update: (id, formData) => request(`api/news/update/${id}`, { method: 'POST', body: formData, isForm: true, auth: true }),
  remove: (id) => request(`api/news/delete/${id}`, { method: 'POST', auth: true }),
};

/* ===== Achievements ===== */
export const achievements = {
  list: () => request('api/achievements'),
  create: (formData) => request('api/achievements', { method: 'POST', body: formData, isForm: true, auth: true }),
  update: (id, formData) => request(`api/achievements/update/${id}`, { method: 'POST', body: formData, isForm: true, auth: true }),
  remove: (id) => request(`api/achievements/delete/${id}`, { method: 'POST', auth: true }),
};

/* ===== Content (vision/mission/leadership/school info) ===== */
export const content = {
  all: () => request('api/content'),
  schoolInfo: () => request('api/content/school-info'),
  leadership: () => request('api/content/leadership'),
  update: (fields) => request('api/content/update', { method: 'POST', body: fields, auth: true }),
};

/* ===== Contact ===== */
export const contact = {
  send: (payload) => requestFull('api/contact', { method: 'POST', body: payload }),
  list: () => request('api/contact/messages', { auth: true }),
};

/* ===== Admissions ===== */
export const admissions = {
  list: () => request('api/admissions', { auth: true }),
  get: (id) => request(`api/admissions/${id}`, { auth: true }),
  create: (formData) => request('api/admissions', { method: 'POST', body: formData, isForm: true }),
  updateStatus: (id, formData) => request(`api/admissions/update/${id}`, { method: 'POST', body: formData, isForm: true, auth: true }),
  remove: (id) => request(`api/admissions/delete/${id}`, { method: 'POST', auth: true }),
};

/* ===== Dashboard ===== */
export const dashboard = {
  stats: () => request('api/dashboard/stats', { auth: true }),
};
