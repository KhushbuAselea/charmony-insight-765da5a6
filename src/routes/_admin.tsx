import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Sidebar } from "@/components/admin/Sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { admin, ready, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !admin) void navigate({ to: "/login" });
  }, [ready, admin, navigate]);

  const initials = (admin?.name ?? "AD")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              className="h-9 pl-9"
              placeholder="Search customers, enquiries…"
              aria-label="Global search"
            />
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              className="relative rounded-md p-2 text-muted-foreground hover:bg-accent"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-brand" />
            </button>
            <div className="flex items-center gap-2.5">
              <Avatar className="size-9">
                <AvatarFallback className="bg-brand-soft text-xs font-semibold text-brand">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-medium text-foreground">{admin?.name ?? "Admin"}</p>
                <p className="text-xs text-muted-foreground">{admin?.role ?? "Administrator"}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout();
                void navigate({ to: "/login" });
              }}
              aria-label="Log out"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
