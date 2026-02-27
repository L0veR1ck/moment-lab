const API_BASE_URL = 'http://localhost:5009/api';

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class ApiError extends Error {
  status: number;
  details: string;

  constructor(status: number, message: string, details: string) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

// Перевод технических названий полей в понятные
const FIELD_NAMES: Record<string, string> = {
  Title: 'Название',
  UrlSlug: 'URL slug',
  Description: 'Описание',
  ProgramDescription: 'Программа',
  KeyValues: 'Ключевые ценности',
  MainPhotoUrl: 'Фото превью',
  IsActive: 'Статус активности',
  DisplayOrder: 'Порядок отображения',
  PhotoUrl: 'Фото',
  FirstName: 'Имя',
  LastName: 'Фамилия',
  Position: 'Должность',
  Text: 'Текст',
  AuthorName: 'Автор',
  Token: 'Токен',
};

// Перевод типовых сообщений об ошибках
const ERROR_MESSAGES: Record<string, string> = {
  'required': 'обязательное поле',
  'is required': 'обязательное поле',
  'must not be empty': 'не может быть пустым',
  'must be unique': 'уже используется, укажите другое значение',
  'invalid format': 'неверный формат',
  'too long': 'слишком длинное значение',
  'too short': 'слишком короткое значение',
};

function translateError(field: string, messages: string[]): string {
  const fieldRu = FIELD_NAMES[field] || field;
  const msgsRu = messages.map((msg) => {
    const lower = msg.toLowerCase();
    for (const [en, ru] of Object.entries(ERROR_MESSAGES)) {
      if (lower.includes(en)) return ru;
    }
    return msg; // оставляем как есть если нет перевода
  });
  return `• ${fieldRu}: ${msgsRu.join(', ')}`;
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
    let details = '';
    try {
      const errBody = await response.json();
      if (errBody.errors) {
        const lines = Object.entries(errBody.errors).map(([field, msgs]) =>
          translateError(field, msgs as string[]),
        );
        details = `Не удалось сохранить. Проверьте поля:\n${lines.join('\n')}`;
      } else if (errBody.title) {
        details = errBody.title;
      }
    } catch {
      // ignore parse errors
    }
    if (!details) {
      if (response.status === 400) details = 'Ошибка в данных формы. Проверьте заполненные поля.';
      else if (response.status === 401) details = 'Нет доступа. Войдите заново.';
      else if (response.status === 404) details = 'Запись не найдена.';
      else if (response.status >= 500) details = 'Ошибка сервера. Попробуйте позже.';
      else details = `Ошибка ${response.status}. Попробуйте ещё раз.`;
    }
    throw new ApiError(response.status, `HTTP error! status: ${response.status}`, details);
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
    getAll: (page = 1, pageSize = 10, isActive?: boolean) => {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (isActive !== undefined) params.append('isActive', String(isActive));
      return request<PaginatedResponse<any>>(`/Events?${params}`);
    },
    getById: (id: string) => request<any>(`/Events/${id}`),
    getBySlug: (slug: string) => request<any>(`/Events/by-slug/${slug}`),
    create: (data: any) => request<any>('/Events', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) =>
      request<any>(`/Events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/Events/${id}`, { method: 'DELETE' }),
    addPhoto: (eventId: string, data: { photoUrl: string; displayOrder: number }) =>
      request<any>(`/Events/${eventId}/photos`, { method: 'POST', body: JSON.stringify(data) }),
    deletePhoto: (eventId: string, photoId: string) =>
      request<void>(`/Events/${eventId}/photos/${photoId}`, { method: 'DELETE' }),
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
  notificationSettings: {
    get: () => request<any>('/NotificationSettings'),
    update: (data: any) => request<any>('/NotificationSettings', { method: 'PUT', body: JSON.stringify(data) }),
  },
  portfolio: {
    getAll: () => request<any[]>('/Portfolio'),
    getById: (id: string) => request<any>(`/Portfolio/${id}`),
    create: (data: { title: string; displayOrder: number }) =>
      request<any>('/Portfolio', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: { title: string; displayOrder: number }) =>
      request<any>(`/Portfolio/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/Portfolio/${id}`, { method: 'DELETE' }),
    addPhoto: (projectId: string, data: { photoUrl: string; displayOrder: number }) =>
      request<any>(`/Portfolio/${projectId}/photos`, { method: 'POST', body: JSON.stringify(data) }),
    deletePhoto: (projectId: string, photoId: string) =>
      request<void>(`/Portfolio/${projectId}/photos/${photoId}`, { method: 'DELETE' }),
  },
  files: {
    upload: async (file: File, folder?: string) => {
      const formData = new FormData();
      formData.append('file', file);
      if (folder) formData.append('folder', folder);

      const response = await fetch(`${API_BASE_URL}/Files/upload`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    delete: (fileUrl: string) =>
      request<void>(`/Files?fileUrl=${encodeURIComponent(fileUrl)}`, { method: 'DELETE' }),
  },
};
