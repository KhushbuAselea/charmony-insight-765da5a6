/**
 * API layer stub.
 *
 * Every service in this folder resolves mock data through `mockRequest`.
 * When the real backend is available, replace `mockRequest` usage with the
 * `request` helper below (or an Axios instance) — no component changes needed.
 */

export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "/api";

export const MOCK_LATENCY_MS = 350;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Simulates a network round trip against the mock data layer. */
export function mockRequest<T>(data: T, latency = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), latency);
  });
}

/** Real HTTP helper — unused until the backend is connected. */
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!response.ok) {
    throw new ApiError(`Request failed: ${path}`, response.status);
  }
  return (await response.json()) as T;
}
