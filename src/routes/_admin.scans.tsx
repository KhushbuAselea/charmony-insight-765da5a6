import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { ALL_VALUE, FilterDropdown } from "@/components/admin/FilterDropdown";
import { PageHeader } from "@/components/admin/PageHeader";
import { Panel } from "@/components/admin/Panel";
import { SearchInput } from "@/components/admin/SearchInput";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { scanService } from "@/services/scanService";
import type { Scan } from "@/types";

export const Route = createFileRoute("/_admin/scans")({
  head: () => ({
    meta: [
      { title: "Room Scans — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Review LiDAR room scans captured in the app, including wall measurements, blueprints and capture galleries.",
      },
      { property: "og:title", content: "Room Scans — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Wall measurements, blueprint notes and capture galleries for every scan.",
      },
    ],
  }),
  component: ScansPage,
});

function ScansPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(ALL_VALUE);
  const [active, setActive] = useState<Scan | null>(null);
  const scans = useQuery({ queryKey: ["scans"], queryFn: scanService.list });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (scans.data ?? []).filter((scan) => {
      const matchesStatus = status === ALL_VALUE || scan.status === status;
      const matchesTerm =
        !term || [scan.id, scan.customerName, scan.roomType].join(" ").toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [scans.data, search, status]);

  const columns: Column<Scan>[] = [
    { key: "id", header: "Scan", render: (row) => row.id },
    {
      key: "customer",
      header: "Customer",
      render: (row) => <span className="font-medium text-foreground">{row.customerName}</span>,
    },
    { key: "room", header: "Room", render: (row) => row.roomType },
    { key: "date", header: "Scan date", render: (row) => row.scanDate },
    {
      key: "measurements",
      header: "Measurements",
      render: (row) => `${row.measurements.length} values`,
    },
    { key: "status", header: "Status", render: (row) => <StatusBadge label={row.status} /> },
    {
      key: "action",
      header: "",
      className: "text-right",
      render: (row) => (
        <Button variant="ghost" size="sm" onClick={() => setActive(row)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Room Scans"
        description="Scan data streamed from the Charmony mobile app."
      />

      <Panel bodyClassName="p-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search scan or customer…"
            className="w-full sm:w-80"
          />
          <FilterDropdown
            value={status}
            onChange={setStatus}
            options={["Processed", "Processing", "Failed"]}
            placeholder="Status"
            allLabel="All statuses"
          />
        </div>
        <div className="px-2 pb-2">
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(row) => row.id}
            loading={scans.isLoading}
            emptyTitle="No scans found"
          />
        </div>
      </Panel>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{active ? `${active.id} · ${active.roomType}` : "Scan"}</DialogTitle>
            <DialogDescription>
              {active ? `${active.customerName} · scanned ${active.scanDate}` : ""}
            </DialogDescription>
          </DialogHeader>
          {active && (
            <div className="space-y-5">
              <dl className="grid gap-4 sm:grid-cols-3">
                {active.measurements.map((measurement) => (
                  <div key={measurement.label} className="space-y-1">
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      {measurement.label}
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {measurement.value} {measurement.unit}
                    </dd>
                  </div>
                ))}
              </dl>
              {active.blueprintNote && (
                <p className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {active.blueprintNote}
                </p>
              )}
              <div className="grid grid-cols-3 gap-3">
                {active.images.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt={`Capture ${index + 1} of scan ${active.id}`}
                    loading="lazy"
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
