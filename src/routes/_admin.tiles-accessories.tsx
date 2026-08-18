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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { productService } from "@/services/productService";
import type { Accessory, Tile } from "@/types";

export const Route = createFileRoute("/_admin/tiles-accessories")({
  head: () => ({
    meta: [
      { title: "Tiles & Accessories — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Manage tile ranges and fitting accessories, including pricing per square metre and stock availability.",
      },
      { property: "og:title", content: "Tiles & Accessories — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Tile ranges, trims, showering and lighting accessories with pricing.",
      },
    ],
  }),
  component: TilesAccessoriesPage,
});

function TilesAccessoriesPage() {
  return (
    <>
      <PageHeader
        title="Tiles & Accessories"
        description="Everything customers can add on top of a panel selection."
        actions={
          <Button onClick={() => toast.info("Product editor connects once the API is live.")}>
            <Plus className="mr-2 size-4" />
            Add product
          </Button>
        }
      />
      <Tabs defaultValue="tiles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tiles">Tiles</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>
        <TabsContent value="tiles">
          <TilesTable />
        </TabsContent>
        <TabsContent value="accessories">
          <AccessoriesTable />
        </TabsContent>
      </Tabs>
    </>
  );
}

function TilesTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(ALL_VALUE);
  const tiles = useQuery({ queryKey: ["tiles"], queryFn: productService.listTiles });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (tiles.data ?? []).filter((tile) => {
      const matchesStatus = status === ALL_VALUE || tile.status === status;
      const matchesTerm =
        !term || [tile.name, tile.category, tile.finish].join(" ").toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [tiles.data, search, status]);

  const columns: Column<Tile>[] = [
    {
      key: "tile",
      header: "Tile",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={`${row.name} tile`}
            loading="lazy"
            className="size-11 rounded-md object-cover"
          />
          <div>
            <p className="font-medium text-foreground">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.category}</p>
          </div>
        </div>
      ),
    },
    { key: "size", header: "Size", render: (row) => row.size },
    { key: "finish", header: "Finish", render: (row) => row.finish },
    { key: "price", header: "Price / m²", render: (row) => `£${row.pricePerSqm.toFixed(2)}` },
    { key: "status", header: "Status", render: (row) => <StatusBadge label={row.status} /> },
  ];

  return (
    <Panel bodyClassName="p-0">
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search tiles…"
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
          loading={tiles.isLoading}
          emptyTitle="No tiles found"
        />
      </div>
    </Panel>
  );
}

function AccessoriesTable() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(ALL_VALUE);
  const accessories = useQuery({
    queryKey: ["accessories"],
    queryFn: productService.listAccessories,
  });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (accessories.data ?? []).filter((accessory) => {
      const matchesStatus = status === ALL_VALUE || accessory.status === status;
      const matchesTerm =
        !term || [accessory.name, accessory.category].join(" ").toLowerCase().includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [accessories.data, search, status]);

  const columns: Column<Accessory>[] = [
    {
      key: "accessory",
      header: "Accessory",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={`${row.name}`}
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
    { key: "category", header: "Category", render: (row) => row.category },
    { key: "price", header: "Price", render: (row) => `£${row.price.toFixed(2)}` },
    { key: "status", header: "Status", render: (row) => <StatusBadge label={row.status} /> },
  ];

  return (
    <Panel bodyClassName="p-0">
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search accessories…"
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
          loading={accessories.isLoading}
          emptyTitle="No accessories found"
        />
      </div>
    </Panel>
  );
}
