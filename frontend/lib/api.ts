import { GetServerSidePropsContext } from "next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions extends RequestInit {
  token?: string | null;
  // userId should only be used for task-related endpoints, not authentication
  // For auth, the path is relative to API_BASE_URL directly, e.g., /auth/login
  // For tasks, it's /api/{userId}/tasks
  userId?: string | null; 
}

async function apiFetch<T>(
  endpoint: string, // endpoint starts with / for auth, or no / for task paths (handled by userId logic)
  options: RequestOptions = {}
): Promise<T> {
  const { token, userId, headers, ...rest } = options;
  let url: string;

  if (endpoint.startsWith("/auth/")) { // Special handling for authentication endpoints
    url = `${API_BASE_URL}${endpoint}`;
  } else if (userId) { // Task-related endpoints with userId
    url = `${API_BASE_URL}/api/${userId}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  } else { // Other endpoints relative to API_BASE_URL
    url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  }
  
  const fetchOptions: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (token) {
    fetchOptions.headers = {
      ...fetchOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({})); // Try to parse error response
    throw new Error(errorData.detail || `API request failed: ${response.statusText}`);
  }

  // Handle 204 No Content for DELETE requests
  if (response.status === 204) {
    return null as T; // Return null for no content
  }

  return response.json();
}

// --- Auth Endpoints ---
export const authApi = {
  register: (data: any) => apiFetch("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data: string) => // data should be URLSearchParams for form-urlencoded
    apiFetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data,
    }),
};

// --- Task Endpoints ---
export const tasksApi = {
  getTasks: (userId: string, token: string) =>
    apiFetch(`/tasks`, { method: "GET", token, userId }),
  createTask: (userId: string, token: string, data: any) =>
    apiFetch(`/tasks`, { method: "POST", token, userId, body: JSON.stringify(data) }),
  getTask: (userId: string, taskId: number, token: string) =>
    apiFetch(`/tasks/${taskId}`, { method: "GET", token, userId }),
  updateTask: (userId: string, taskId: number, token: string, data: any) =>
    apiFetch(`/tasks/${taskId}`, { method: "PUT", token, userId, body: JSON.stringify(data) }),
  deleteTask: (userId: string, taskId: number, token: string) =>
    apiFetch(`/tasks/${taskId}`, { method: "DELETE", token, userId }),
  toggleTaskCompletion: (userId: string, taskId: number, token: string, completed: boolean) =>
    apiFetch(`/tasks/${taskId}/complete`, {
      method: "PATCH",
      token,
      userId,
      body: JSON.stringify({ completed }),
    }),
};

// Helper to get token from context or cookies for SSR/Server Components
export function getAuthTokenFromContext(context: GetServerSidePropsContext) {
  // In Next.js App Router, typically you'd read cookies directly in Server Components
  // or pass from middleware. This is a placeholder for context-aware token retrieval.
  // For client components, localStorage is used.
  // For SSR/Server components, you'd parse from `context.req.headers.cookie` or similar.
  // This function might be more relevant for Pages Router's GetServerSideProps
  // For App Router, you'd typically use `cookies()` from 'next/headers' in a server component.
  // Here, we return null, assuming client-side fetching will rely on localStorage.
  return null; 
}
