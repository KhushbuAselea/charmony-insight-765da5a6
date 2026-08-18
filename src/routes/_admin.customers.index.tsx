import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { ALL_VALUE, FilterDropdown } from "@/components/admin/FilterDropdown";
import { PageHeader } from "@/components/admin/PageHeader";
import { Panel } from "@/components/admin/Panel";
import { SearchInput } from "@/components/admin/SearchInput";
import { Button } from "@/components/ui/button";
import { customerService } from "@/services/customerService";
import type { Customer } from "@/types";

export const Route = createFileRoute("/_admin/customers/")({
  head: () => ({
    meta: [
      { title: "Customers — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Browse and search every WETWALLPANEL2GO customer, with room type, enquiry count and last activity.",
      },
      { property: "og:title", content: "Customers — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Search customers by name, email, mobile or room type.",
      },
    ],
  }),
  component: CustomersPage,
});

function CustomersPage() {
  const [search, setSearch] = useState("");
  const [roomType, setRoomType] = useState(ALL_VALUE);
  const customers = useQuery({ queryKey: ["customers"], queryFn: customerService.list });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (customers.data ?? []).filter((customer) => {
      const matchesRoom = roomType === ALL_VALUE || customer.roomType === roomType;
      const matchesTerm =
        !term ||
        [customer.name, customer.email, customer.mobile, customer.address]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesRoom && matchesTerm;
    });
  }, [customers.data, search, roomType]);

  const columns: Column<Customer>[] = [
    {
      key: "name",
      header: "Customer",
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.id}</p>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (row) => (
        <div>
          <p>{row.mobile}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    { key: "address", header: "Address", render: (row) => row.address },
    { key: "room", header: "Room", render: (row) => row.roomType },
    { key: "count", header: "Enquiries", render: (row) => row.enquiryCount },
    { key: "activity", header: "Last activity", render: (row) => row.lastActivity },
    {
      key: "action",
      header: "",
      className: "text-right",
      render: (row) => (
        <Button asChild variant="ghost" size="sm">
          <Link to="/customers/$customerId" params={{ customerId: row.id }}>
            View
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Customers"
        description={`${rows.length} customer${rows.length === 1 ? "" : "s"} matching your filters.`}
      />
      <Panel bodyClassName="p-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search name, email, mobile…"
            className="w-full sm:w-80"
          />
          <FilterDropdown
            value={roomType}
            onChange={setRoomType}
            options={["Bathroom", "Kitchen"]}
            placeholder="Room type"
            allLabel="All room types"
          />
        </div>
        <div className="px-2 pb-2">
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(row) => row.id}
            loading={customers.isLoading}
            emptyTitle="No customers found"
            emptyDescription="Try clearing the search or room type filter."
          />
        </div>
      </Panel>
    </>
  );
}
