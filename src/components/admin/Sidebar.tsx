import { Link } from "@tanstack/react-router";
import {
  Blocks,
  FileText,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  ScanLine,
  Settings,
  Target,
  Users,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const navSections = [
  {
    title: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/lead-tracking", label: "Lead Tracking", icon: Target },
    ],
  },
  {
    title: "Operations",
    items: [
      { to: "/customers", label: "Customers", icon: Users },
      { to: "/enquiries", label: "Enquiries", icon: MessageSquare },
      { to: "/scans", label: "Room Scans", icon: ScanLine },
      { to: "/quotations", label: "Quotations", icon: FileText },
    ],
  },
  {
    title: "Catalogue",
    items: [
      { to: "/designs", label: "Designs", icon: LayoutGrid },
      { to: "/wet-wall-panels", label: "Wet Wall Panels", icon: Blocks },
      { to: "/tiles-accessories", label: "Tiles & Accessories", icon: Blocks },
    ],
  },
  {
    title: "Account",
    items: [{ to: "/settings", label: "Settings", icon: Settings }],
  },
] as const;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 py-5">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
              C
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-white">Charmony</span>
              <span className="block text-[11px] tracking-wide text-sidebar-foreground/70">
                WETWALLPANEL2GO
              </span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-sidebar-foreground/70 hover:bg-sidebar-accent lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
          {navSections.map((section) => (
            <div key={section.title}>
              <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-white"
                      activeProps={{
                        className:
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary",
                      }}
                    >
                      <item.icon className="size-4" aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
