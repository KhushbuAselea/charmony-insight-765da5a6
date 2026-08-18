import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — WETWALLPANEL2GO" },
      {
        name: "description",
        content:
          "Sign in to the Charmony WETWALLPANEL2GO admin panel to manage customers, enquiries and catalogue.",
      },
      { property: "og:title", content: "Admin Login — WETWALLPANEL2GO" },
      {
        property: "og:description",
        content: "Secure sign in for the Charmony WETWALLPANEL2GO admin team.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login, admin, ready } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (ready && admin) void navigate({ to: "/dashboard" });
  }, [ready, admin, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      await login({ email, password });
      await navigate({ to: "/dashboard" });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-sidebar p-12 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-sidebar-primary font-bold text-sidebar-primary-foreground">
            C
          </span>
          <span className="text-sm font-semibold text-white">Charmony · WETWALLPANEL2GO</span>
        </div>
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-semibold leading-tight text-white">
            Room scans, designs and quotations in one admin workspace.
          </h1>
          <p className="text-sm text-sidebar-foreground/70">
            Track every bathroom and kitchen enquiry from the first LiDAR scan through to the
            accepted quotation.
          </p>
        </div>
        <p className="text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} WETWALLPANEL2GO. Internal use only.
        </p>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Admin sign in</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Use admin@example.com / password for the demo.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
