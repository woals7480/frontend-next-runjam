export const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

export class HttpError extends Error {
  status: number;
  body?: string;
  constructor(status: number, message: string, body?: string) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
  _retry = false
): Promise<Response> {
  const res = await fetch(resolveUrl(input), {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (res.status !== 401) return res;
  if (_retry) return res;

  const r = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!r.ok) return res; // refresh 실패
  return apiFetch(input, init, true); // 1회 재시도
}

function resolveUrl(input: RequestInfo | URL) {
  if (typeof input === "string") {
    if (input.startsWith("http")) return input;
    return `${API_BASE}${input.startsWith("/") ? input : "/" + input}`;
  }
  return input;
}

export async function getJSON<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await apiFetch(path, { method: "GET", ...(init || {}) });
  if (!res.ok)
    throw new HttpError(res.status, res.statusText, await safeText(res));
  return res.json() as Promise<T>;
}

export async function postJSON<T>(
  path: string,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const res = await apiFetch(path, {
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
    ...(init || {}),
  });
  if (!res.ok)
    throw new HttpError(res.status, res.statusText, await safeText(res));
  return res.json() as Promise<T>;
}

export async function post(
  path: string,
  init?: RequestInit
): Promise<Response> {
  return apiFetch(path, { method: "POST", ...(init || {}) });
}

async function safeText(res: Response) {
  try {
    return await res.text();
  } catch {
    return `${res.status} ${res.statusText}`;
  }
}
