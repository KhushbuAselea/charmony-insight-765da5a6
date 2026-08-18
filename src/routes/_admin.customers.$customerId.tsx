import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { Field, Panel } from "@/components/admin/Panel";
import { EmptyState, LoadingState } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { customerService } from "@/services/customerService";
import { enquiryService } from "@/services/enquiryService";
import { scanService } from "@/services/scanService";
import type { Enquiry, Scan } from "@/types";

export const Route = createFileRoute("/_admin/customers/$customerId")({
  head: () => ({
    meta: [
      { title: "Customer profile — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Customer profile with contact details, room scan history and every enquiry raised in the app.",
      },
      { property: "og:title", content: "Customer profile — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Contact details, scans and enquiry history for a single customer.",
      },
    ],
  }),
  component: CustomerDetailPage,
});

function CustomerDetailPage() {
  const { customerId } = Route.useParams();
  const customer = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => customerService.getById(customerId),
  });
  const enquiries = useQuery({
    queryKey: ["customer-enquiries", customerId],
    queryFn: () => enquiryService.listByCustomer(customerId),
  });
  const scans = useQuery({
    queryKey: ["customer-scans", customerId],
    queryFn: () => scanService.listByCustomer(customerId),
  });

  const enquiryColumns: Column<Enquiry>[] = [
    { key: "id", header: "Enquiry", render: (row) => row.id },
    { key: "design", header: "Design", render: (row) => row.designName },
    { key: "room", header: "Room", render: (row) => row.roomType },
    { key: "created", header: "Created", render: (row) => row.createdAt },
    { key: "status", header: "Status", render: (row) => <StatusBadge label={row.status} /> },
    {
      key: "action",
      header: "",
      className: "text-right",
      render: (row) => (
        <Button asChild variant="ghost" size="sm">
          <Link to="/enquiries/$enquiryId" params={{ enquiryId: row.id }}>
            Open
          </Link>
        </Button>
      ),
    },
  ];

  const scanColumns: Column<Scan>[] = [
    { key: "id", header: "Scan", render: (row) => row.id },
    { key: "room", header: "Room", render: (row) => row.roomType },
    { key: "date", header: "Scan date", render: (row) => row.scanDate },
    { key: "status", header: "Status", render: (row) => <StatusBadge label={row.status} /> },
    {
      key: "measurements",
      header: "Measurements",
      render: (row) => `${row.measurements.length} recorded`,
    },
  ];

  if (customer.isLoading) return <LoadingState rows={4} />;
  if (!customer.data)
    return (
      <EmptyState
        title="Customer not found"
        description="This customer may have been removed."
        action={
          <Button asChild variant="outline">
            <Link to="/customers">Back to customers</Link>
          </Button>
        }
      />
    );

  const record = customer.data;

  return (
    <>
      <PageHeader
        title={record.name}
        description={`${record.id} · joined ${record.createdAt}`}
        actions={
          <Button asChild variant="outline">
            <Link to="/customers">
              <ArrowLeft className="mr-2 size-4" />
              Back
            </Link>
          </Button>
        }
      />

      <Panel title="Contact details">
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Mobile" value={record.mobile} />
          <Field label="Email" value={record.email} />
          <Field label="Preferred room" value={record.roomType} />
          <Field label="Last activity" value={record.lastActivity} />
          <Field label="Address" value={record.address} className="sm:col-span-2" />
          <Field label="Total enquiries" value={record.enquiryCount} />
        </dl>
      </Panel>

      <Panel title="Enquiries" description="Every enquiry raised by this customer" bodyClassName="p-0">
        <div className="px-2 pb-2">
          <DataTable
            columns={enquiryColumns}
            rows={enquiries.data ?? []}
            rowKey={(row) => row.id}
            loading={enquiries.isLoading}
            emptyTitle="No enquiries yet"
          />
        </div>
      </Panel>

      <Panel title="Room scans" description="Scans captured in the mobile app" bodyClassName="p-0">
        <div className="px-2 pb-2">
          <DataTable
            columns={scanColumns}
            rows={scans.data ?? []}
            rowKey={(row) => row.id}
            loading={scans.isLoading}
            emptyTitle="No scans yet"
          />
        </div>
      </Panel>
    </>
  );
}
