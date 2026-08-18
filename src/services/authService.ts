import { mockRequest, ApiError } from "@/services/api";
import type { Admin } from "@/types";

const STORAGE_KEY = "wwp2g.admin.session";

const MOCK_ADMIN: Admin = {
  id: "ADM-001",
  name: "Alex Morgan",
  email: "admin@example.com",
  role: "Administrator",
};

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export const authService = {
  async login({ email, password }: LoginPayload): Promise<Admin> {
    await mockRequest(null, 500);
    if (email.trim().toLowerCase() !== "admin@example.com" || password !== "password") {
      throw new ApiError("Invalid email or password", 401);
    }
    const admin = { ...MOCK_ADMIN, email: email.trim().toLowerCase() };
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
    }
    return admin;
  },

  logout(): void {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },

  getStoredAdmin(): Admin | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Admin;
    } catch {
      return null;
    }
  },

  saveAdmin(admin: Admin): void {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(admin));
    }
  },
};
