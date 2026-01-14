const API_BASE_URL = 'http://localhost:5009/api';

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : undefined as T;
}

export const api = {
  auth: {
    login: (token: string) =>
      request<{ message: string }>('/Auth/login', { method: 'POST', body: JSON.stringify({ token }) }),
    logout: () =>
      request<{ message: string }>('/Auth/logout', { method: 'POST' }),
    check: () =>
      request<{ authenticated: boolean }>('/Auth/check'),
  },
  events: {
    getAll: (page = 1, pageSize = 10) =>
      request<PaginatedResponse<any>>(`/Events?page=${page}&pageSize=${pageSize}`),
    getById: (id: string) => request<any>(`/Events/${id}`),
    create: (data: any) => request<any>('/Events', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) =>
      request<any>(`/Events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/Events/${id}`, { method: 'DELETE' }),
  },
  reviews: {
    getAll: (page = 1, pageSize = 10, isApproved?: boolean) => {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (isApproved !== undefined) params.append('isApproved', String(isApproved));
      return request<PaginatedResponse<any>>(`/Reviews?${params}`);
    },
    create: (data: any) => request<any>('/Reviews', { method: 'POST', body: JSON.stringify(data) }),
    approve: (id: string) => request<any>(`/Reviews/${id}/approve`, { method: 'PATCH' }),
    delete: (id: string) => request<void>(`/Reviews/${id}`, { method: 'DELETE' }),
  },
  teamMembers: {
    getAll: (page = 1, pageSize = 10) =>
      request<PaginatedResponse<any>>(`/TeamMembers?page=${page}&pageSize=${pageSize}`),
    create: (data: any) =>
      request<any>('/TeamMembers', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) =>
      request<any>(`/TeamMembers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/TeamMembers/${id}`, { method: 'DELETE' }),
  },
  applications: {
    getAll: (page = 1, pageSize = 10) =>
      request<PaginatedResponse<any>>(`/Applications?page=${page}&pageSize=${pageSize}`),
    create: (data: any) => request<any>('/Applications', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) =>
      request<any>(`/Applications/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  },
};
