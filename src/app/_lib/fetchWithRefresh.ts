// lib/fetchWithRefresh.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL!;
let refreshPromise: Promise<Response> | null = null;

class UnauthorizedError extends Error {
  constructor(msg = "Unauthorized") {
    super(msg);
    this.name = "UnauthorizedError";
  }
}

async function callRefresh() {
  return fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
}

/** 401이면 refresh 후 원요청 한 번만 재시도 */
export async function fetchWithRefresh(
  input: RequestInfo | URL,
  init: RequestInit & { next?: NextFetchRequestConfig } = {},
  _retry = false
): Promise<Response> {
  const res = await fetch(input, {
    credentials: "include",
    ...init,
  });

  // 정상 or 401 아님 → 그대로 반환
  if (res.status !== 401) return res;

  // 이미 한 번 재시도했다면 더는 안 함(무한 루프 방지)
  if (_retry) throw new UnauthorizedError();

  // refresh 자신 호출 중 401이면 중단
  const urlStr = typeof input === "string" ? input : input.toString();
  if (urlStr.includes("/auth/refresh")) throw new UnauthorizedError();

  // 동시 401 → refresh 1회만
  if (!refreshPromise) {
    refreshPromise = callRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  const r = await refreshPromise;

  if (!r.ok) throw new UnauthorizedError("Token refresh failed");

  // 재발급 성공 → 원요청 재시도(1회)
  return fetchWithRefresh(input, init, true);
}
