import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { ALL_VALUE, FilterDropdown } from "@/components/admin/FilterDropdown";
import { PageHeader } from "@/components/admin/PageHeader";
import { Panel } from "@/components/admin/Panel";
import { SearchInput } from "@/components/admin/SearchInput";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { designService } from "@/services/designService";
import type { WetWallPanel } from "@/types";

export const Route = createFileRoute("/_admin/wet-wall-panels")({
  head: () => ({
    meta: [
      { title: "Wet Wall Panels — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Maintain the wet wall panel catalogue: finishes, panel dimensions and availability for the visualiser.",
      },
      { property: "og:title", content: "Wet Wall Panels — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Panel finishes, dimensions and availability in one catalogue.",
      },
    ],
  }),
  component: PanelsPage,
});

function PanelsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(ALL_VALUE);
  const panels = useQuery({ queryKey: ["panels"], queryFn: designService.listPanels });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (panels.data ?? []).filter((panel) => {
      const matchesStatus = status === ALL_VALUE || panel.status === status;
      const matchesTerm =
        !term || [panel.name, panel.finish, panel.dimensions].join(" ").toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [panels.data, search, status]);

  const columns: Column<WetWallPanel>[] = [
    {
      key: "panel",
      header: "Panel",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={`${row.name} panel`}
            loading="lazy"
            className="size-11 rounded-md object-cover"
          />
          <div>
            <p className="font-medium text-foreground">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.id}</p>
          </div>
        </div>
      ),
    },
    { key: "finish", header: "Finish", render: (row) => row.finish },
    { key: "dimensions", header: "Dimensions", render: (row) => row.dimensions },
    {
      key: "description",
      header: "Description",
      render: (row) => <span className="text-muted-foreground">{row.description}</span>,
    },
    { key: "status", header: "Status", render: (row) => <StatusBadge label={row.status} /> },
    {
      key: "action",
      header: "",
      className: "text-right",
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toast.info(`Editing ${row.name} connects once the API is live.`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Wet Wall Panels"
        description="Panel range offered across bathroom and kitchen projects."
        actions={
          <Button onClick={() => toast.info("Panel editor connects once the API is live.")}>
            <Plus className="mr-2 size-4" />
            Add panel
          </Button>
        }
      />
      <Panel bodyClassName="p-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search panels…"
            className="w-full sm:w-80"
          />
          <FilterDropdown
            value={status}
            onChange={setStatus}
            options={["Active", "Inactive"]}
            placeholder="Status"
            allLabel="All statuses"
          />
        </div>
        <div className="px-2 pb-2">
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(row) => row.id}
            loading={panels.isLoading}
            emptyTitle="No panels found"
          />
        </div>
      </Panel>
    </>
  );
}
