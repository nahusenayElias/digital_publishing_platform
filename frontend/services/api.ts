const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!endpoint.startsWith('/')) {
    throw new Error(`apiFetch endpoint must start with '/': received "${endpoint}"`);
  }

  // Get token from localStorage if it exists (client-side only)
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  console.log(`Fetching: ${API_URL}${endpoint}`, { method: options.method || 'GET' });

  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: 'include',
    headers,
    ...options,
  });

  // Handle response
  const contentType = res.headers.get('content-type');
  let responseData;

  if (contentType && contentType.includes('application/json')) {
    responseData = await res.json();
  } else {
    responseData = await res.text();
  }

  if (!res.ok) {
    // Enhanced error handling
    const errorMessage = typeof responseData === 'object' 
      ? responseData.message || responseData.error || JSON.stringify(responseData)
      : responseData;
    
    // Handle specific status codes
    if (res.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Optionally redirect to login
        // window.location.href = '/login';
      }
      throw new Error('Unauthorized. Please login again.');
    }
    
    if (res.status === 403) {
      throw new Error('Access denied. Insufficient permissions.');
    }
    
    if (res.status === 422) {
      // Validation error
      const validationErrors = responseData.errors || {};
      throw new Error(JSON.stringify(validationErrors));
    }
    
    throw new Error(`API ${res.status}: ${errorMessage}`);
  }

  return responseData as T;
}

// Convenience methods
export const api = {
  get: <T = any>(endpoint: string, options?: RequestInit) => 
    apiFetch<T>(endpoint, { method: 'GET', ...options }),
  
  post: <T = any>(endpoint: string, data?: any, options?: RequestInit) => 
    apiFetch<T>(endpoint, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  put: <T = any>(endpoint: string, data?: any, options?: RequestInit) => 
    apiFetch<T>(endpoint, { 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  patch: <T = any>(endpoint: string, data?: any, options?: RequestInit) => 
    apiFetch<T>(endpoint, { 
      method: 'PATCH', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
  
  delete: <T = any>(endpoint: string, options?: RequestInit) => 
    apiFetch<T>(endpoint, { method: 'DELETE', ...options }),
};