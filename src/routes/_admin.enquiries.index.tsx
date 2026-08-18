import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { ALL_VALUE, FilterDropdown } from "@/components/admin/FilterDropdown";
import { PageHeader } from "@/components/admin/PageHeader";
import { Panel } from "@/components/admin/Panel";
import { SearchInput } from "@/components/admin/SearchInput";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { enquiryService } from "@/services/enquiryService";
import type { Enquiry } from "@/types";

export const Route = createFileRoute("/_admin/enquiries/")({
  head: () => ({
    meta: [
      { title: "Enquiries — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Filter bathroom and kitchen enquiries by status, room type and design, then open any lead for full scan detail.",
      },
      { property: "og:title", content: "Enquiries — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Track New, Contacted, Quoted and Closed enquiries in one list.",
      },
    ],
  }),
  component: EnquiriesPage,
});

function EnquiriesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(ALL_VALUE);
  const [roomType, setRoomType] = useState(ALL_VALUE);
  const enquiries = useQuery({ queryKey: ["enquiries"], queryFn: enquiryService.list });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (enquiries.data ?? []).filter((enquiry) => {
      const matchesStatus = status === ALL_VALUE || enquiry.status === status;
      const matchesRoom = roomType === ALL_VALUE || enquiry.roomType === roomType;
      const matchesTerm =
        !term ||
        [enquiry.id, enquiry.customerName, enquiry.email, enquiry.designName]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesStatus && matchesRoom && matchesTerm;
    });
  }, [enquiries.data, search, status, roomType]);

  const columns: Column<Enquiry>[] = [
    {
      key: "id",
      header: "Enquiry",
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.id}</p>
          <p className="text-xs text-muted-foreground">{row.createdAt}</p>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.customerName}</p>
          <p className="text-xs text-muted-foreground">{row.mobile}</p>
        </div>
      ),
    },
    { key: "room", header: "Room", render: (row) => row.roomType },
    {
      key: "design",
      header: "Design",
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img
            src={row.designImage}
            alt={`${row.designName} design`}
            loading="lazy"
            className="size-9 rounded-md object-cover"
          />
          <div>
            <p className="font-medium text-foreground">{row.designName}</p>
            <p className="text-xs text-muted-foreground">{row.designCategory}</p>
          </div>
        </div>
      ),
    },
    {
      key: "quote",
      header: "Quotation",
      render: (row) => (row.quotationAmount ? `£${row.quotationAmount.toLocaleString()}` : "—"),
    },
    { key: "status", header: "Status", render: (row) => <StatusBadge label={row.status} /> },
    {
      key: "action",
      header: "",
      className: "text-right",
      render: (row) => (
        <Button asChild variant="ghost" size="sm">
          <Link to="/enquiries/$enquiryId" params={{ enquiryId: row.id }}>
            View
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Enquiries"
        description={`${rows.length} enquir${rows.length === 1 ? "y" : "ies"} matching your filters.`}
      />
      <Panel bodyClassName="p-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search customer, design, ID…"
            className="w-full sm:w-80"
          />
          <FilterDropdown
            value={status}
            onChange={setStatus}
            options={["New", "Contacted", "Quoted", "Closed"]}
            placeholder="Status"
            allLabel="All statuses"
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
            loading={enquiries.isLoading}
            emptyTitle="No enquiries found"
            emptyDescription="Adjust the filters to see more results."
          />
        </div>
      </Panel>
    </>
  );
}
