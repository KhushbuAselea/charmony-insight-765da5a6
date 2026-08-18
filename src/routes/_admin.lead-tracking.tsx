import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/admin/PageHeader";
import { Panel } from "@/components/admin/Panel";
import { CardsLoadingState } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { enquiryService } from "@/services/enquiryService";
import type { Enquiry, EnquiryStatus } from "@/types";

export const Route = createFileRoute("/_admin/lead-tracking")({
  head: () => ({
    meta: [
      { title: "Lead Tracking — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Kanban view of every lead moving from New through Contacted and Quoted to Closed, with quotation values.",
      },
      { property: "og:title", content: "Lead Tracking — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Pipeline board of leads by stage with values and room types.",
      },
    ],
  }),
  component: LeadTrackingPage,
});

const stages: EnquiryStatus[] = ["New", "Contacted", "Quoted", "Closed"];

function LeadTrackingPage() {
  const enquiries = useQuery({ queryKey: ["enquiries"], queryFn: enquiryService.list });

  return (
    <>
      <PageHeader
        title="Lead Tracking"
        description="Follow every lead through the sales pipeline."
      />

      {enquiries.isLoading ? (
        <CardsLoadingState cards={4} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-4">
          {stages.map((stage) => {
            const items = (enquiries.data ?? []).filter((enquiry) => enquiry.status === stage);
            const value = items.reduce((acc, item) => acc + (item.quotationAmount ?? 0), 0);
            return (
              <Panel
                key={stage}
                title={stage}
                description={`${items.length} lead${items.length === 1 ? "" : "s"} · £${value.toLocaleString()}`}
                bodyClassName="space-y-3 p-4"
              >
                {items.length === 0 && (
                  <p className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                    No leads in this stage
                  </p>
                )}
                {items.map((enquiry) => (
                  <LeadCard key={enquiry.id} enquiry={enquiry} />
                ))}
              </Panel>
            );
          })}
        </div>
      )}
    </>
  );
}

function LeadCard({ enquiry }: { enquiry: Enquiry }) {
  return (
    <Link
      to="/enquiries/$enquiryId"
      params={{ enquiryId: enquiry.id }}
      className="block rounded-lg border border-border bg-background p-3 transition-colors hover:border-brand/50 hover:bg-accent"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-foreground">{enquiry.customerName}</p>
        <StatusBadge label={enquiry.roomType} tone="neutral" />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {enquiry.designName} · {enquiry.id}
      </p>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{enquiry.createdAt}</span>
        <span className="font-semibold text-foreground">
          {enquiry.quotationAmount ? `£${enquiry.quotationAmount.toLocaleString()}` : "No quote"}
        </span>
      </div>
    </Link>
  );
}
