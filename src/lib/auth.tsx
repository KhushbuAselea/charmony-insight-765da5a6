import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import { authService, type LoginPayload } from "@/services/authService";
import type { Admin } from "@/types";

interface AuthContextValue {
  admin: Admin | null;
  ready: boolean;
  login: (payload: LoginPayload) => Promise<Admin>;
  logout: () => void;
  updateAdmin: (patch: Partial<Admin>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAdmin(authService.getStoredAdmin());
    setReady(true);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const next = await authService.login(payload);
    setAdmin(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setAdmin(null);
  }, []);

  const updateAdmin = useCallback((patch: Partial<Admin>) => {
    setAdmin((current) => {
      if (!current) return current;
      const next = { ...current, ...patch };
      authService.saveAdmin(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ admin, ready, login, logout, updateAdmin }),
    [admin, ready, login, logout, updateAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
