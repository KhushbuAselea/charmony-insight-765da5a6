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
import type { Quotation } from "@/types";

export const Route = createFileRoute("/_admin/quotations")({
  head: () => ({
    meta: [
      { title: "Quotations — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Monitor draft, sent, accepted and rejected quotations with totals for every bathroom and kitchen enquiry.",
      },
      { property: "og:title", content: "Quotations — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Quotation pipeline totals and status tracking across all enquiries.",
      },
    ],
  }),
  component: QuotationsPage,
});

function QuotationsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(ALL_VALUE);
  const quotations = useQuery({ queryKey: ["quotations"], queryFn: enquiryService.quotations });

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (quotations.data ?? []).filter((quotation) => {
      const matchesStatus = status === ALL_VALUE || quotation.status === status;
      const matchesTerm =
        !term ||
        [quotation.id, quotation.customerName, quotation.enquiryId]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesStatus && matchesTerm;
    });
  }, [quotations.data, search, status]);

  const totals = useMemo(() => {
    const all = quotations.data ?? [];
    const sum = (list: Quotation[]) => list.reduce((acc, item) => acc + item.amount, 0);
    return {
      pipeline: sum(all.filter((q) => q.status === "Sent")),
      accepted: sum(all.filter((q) => q.status === "Accepted")),
      count: all.length,
    };
  }, [quotations.data]);

  const columns: Column<Quotation>[] = [
    { key: "id", header: "Quotation", render: (row) => row.id },
    {
      key: "customer",
      header: "Customer",
      render: (row) => <span className="font-medium text-foreground">{row.customerName}</span>,
    },
    {
      key: "enquiry",
      header: "Enquiry",
      render: (row) => (
        <Link
          to="/enquiries/$enquiryId"
          params={{ enquiryId: row.enquiryId }}
          className="text-brand hover:underline"
        >
          {row.enquiryId}
        </Link>
      ),
    },
    { key: "created", header: "Created", render: (row) => row.createdAt },
    {
      key: "amount",
      header: "Amount",
      render: (row) => (row.amount ? `£${row.amount.toLocaleString()}` : "—"),
    },
    { key: "status", header: "Status", render: (row) => <StatusBadge label={row.status} /> },
    {
      key: "action",
      header: "",
      className: "text-right",
      render: (row) => (
        <Button asChild variant="ghost" size="sm">
          <Link to="/enquiries/$enquiryId" params={{ enquiryId: row.enquiryId }}>
            Open
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Quotations" description="Quotation pipeline across all enquiries." />

      <div className="grid gap-4 sm:grid-cols-3">
        <Panel>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Awaiting decision</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            £{totals.pipeline.toLocaleString()}
          </p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Accepted value</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            £{totals.accepted.toLocaleString()}
          </p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Total quotations</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{totals.count}</p>
        </Panel>
      </div>

      <Panel bodyClassName="p-0">
        <div className="flex flex-wrap items-center gap-3 border-b border-border px-5 py-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search quotations…"
            className="w-full sm:w-80"
          />
          <FilterDropdown
            value={status}
            onChange={setStatus}
            options={["Draft", "Sent", "Accepted", "Rejected"]}
            placeholder="Status"
            allLabel="All statuses"
          />
        </div>
        <div className="px-2 pb-2">
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(row) => row.id}
            loading={quotations.isLoading}
            emptyTitle="No quotations found"
          />
        </div>
      </Panel>
    </>
  );
}
