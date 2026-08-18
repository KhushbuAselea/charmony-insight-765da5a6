import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { ALL_VALUE, FilterDropdown } from "@/components/admin/FilterDropdown";
import { PageHeader } from "@/components/admin/PageHeader";
import { Panel } from "@/components/admin/Panel";
import { SearchInput } from "@/components/admin/SearchInput";
import { EmptyState, LoadingState } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { designService } from "@/services/designService";
import type { Design } from "@/types";

export const Route = createFileRoute("/_admin/designs")({
  head: () => ({
    meta: [
      { title: "Design Library — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Manage the bathroom and kitchen design catalogue customers browse inside the Charmony visualiser.",
      },
      { property: "og:title", content: "Design Library — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Create, edit and retire visualiser designs by room type and category.",
      },
    ],
  }),
  component: DesignsPage,
});

function DesignsPage() {
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState(ALL_VALUE);
  const [status, setStatus] = useState(ALL_VALUE);
  const designs = useQuery({ queryKey: ["designs"], queryFn: designService.list });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (designs.data ?? []).filter((design) => {
      const matchesRoom = roomType === ALL_VALUE || design.roomType === roomType;
      const matchesStatus = status === ALL_VALUE || design.status === status;
      const matchesTerm =
        !term ||
        [design.name, design.category, design.description].join(" ").toLowerCase().includes(term);
      return matchesRoom && matchesStatus && matchesTerm;
    });
  }, [designs.data, search, roomType, status]);

  return (
    <>
      <PageHeader
        title="Design Library"
        description="Designs available in the customer visualiser."
        actions={
          <Button onClick={() => toast.info("Design editor connects once the API is live.")}>
            <Plus className="mr-2 size-4" />
            Add design
          </Button>
        }
      />

      <Panel bodyClassName="p-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search designs…"
            className="w-full sm:w-80"
          />
          <FilterDropdown
            value={roomType}
            onChange={setRoomType}
            options={["Bathroom", "Kitchen"]}
            placeholder="Room type"
            allLabel="All room types"
          />
          <FilterDropdown
            value={status}
            onChange={setStatus}
            options={["Active", "Inactive"]}
            placeholder="Status"
            allLabel="All statuses"
          />
        </div>

        <div className="p-5">
          {designs.isLoading ? (
            <LoadingState rows={4} />
          ) : rows.length === 0 ? (
            <EmptyState title="No designs found" description="Try a different search or filter." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {rows.map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>
          )}
        </div>
      </Panel>
    </>
  );
}

function DesignCard({ design }: { design: Design }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <img
        src={design.image}
        alt={`${design.name} ${design.roomType.toLowerCase()} design preview`}
        loading="lazy"
        className="h-40 w-full object-cover"
      />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">{design.name}</h3>
            <p className="text-xs text-muted-foreground">
              {design.roomType} · {design.category}
            </p>
          </div>
          <StatusBadge label={design.status} />
        </div>
        <p className="text-sm text-muted-foreground">{design.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">Updated {design.updatedAt}</span>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Edit ${design.name}`}
              onClick={() => toast.info("Editing is available once the API is connected.")}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Delete ${design.name}`}
              onClick={() => toast.info("Deleting is available once the API is connected.")}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
