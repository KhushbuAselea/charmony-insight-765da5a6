import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/admin/PageHeader";
import { Field, Panel } from "@/components/admin/Panel";
import { EmptyState, LoadingState } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { enquiryService } from "@/services/enquiryService";
import type { EnquiryStatus } from "@/types";

export const Route = createFileRoute("/_admin/enquiries/$enquiryId")({
  head: () => ({
    meta: [
      { title: "Enquiry detail — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Full enquiry view: room scan measurements, gallery, chosen design, accessories and quotation management.",
      },
      { property: "og:title", content: "Enquiry detail — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Scan measurements, chosen design, accessories and quotation in one view.",
      },
    ],
  }),
  component: EnquiryDetailPage,
});

const statusOptions: EnquiryStatus[] = ["New", "Contacted", "Quoted", "Closed"];

function EnquiryDetailPage() {
  const { enquiryId } = Route.useParams();
  const queryClient = useQueryClient();
  const enquiry = useQuery({
    queryKey: ["enquiry", enquiryId],
    queryFn: () => enquiryService.getById(enquiryId),
  });

  const [status, setStatus] = useState<EnquiryStatus>("New");
  const [amount, setAmount] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (enquiry.data) {
      setStatus(enquiry.data.status);
      setAmount(enquiry.data.quotationAmount ? String(enquiry.data.quotationAmount) : "");
      setFeedback(enquiry.data.feedback ?? "");
    }
  }, [enquiry.data]);

  const statusMutation = useMutation({
    mutationFn: (next: EnquiryStatus) => enquiryService.updateStatus(enquiryId, next),
    onSuccess: (_data, next) => {
      toast.success(`Status updated to ${next}`);
      void queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
    onError: () => toast.error("Could not update the status"),
  });

  const quotationMutation = useMutation({
    mutationFn: () => enquiryService.saveQuotation(enquiryId, Number(amount || 0), feedback),
    onSuccess: () => toast.success("Quotation saved"),
    onError: () => toast.error("Could not save the quotation"),
  });

  if (enquiry.isLoading) return <LoadingState rows={5} />;
  if (!enquiry.data)
    return (
      <EmptyState
        title="Enquiry not found"
        description="This enquiry may have been removed."
        action={
          <Button asChild variant="outline">
            <Link to="/enquiries">Back to enquiries</Link>
          </Button>
        }
      />
    );

  const record = enquiry.data;

  return (
    <>
      <PageHeader
        title={`Enquiry ${record.id}`}
        description={`${record.customerName} · created ${record.createdAt}`}
        actions={
          <>
            <StatusBadge label={record.status} />
            <Button asChild variant="outline">
              <Link to="/enquiries">
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Customer details">
            <dl className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Name"
                value={
                  <Link
                    to="/customers/$customerId"
                    params={{ customerId: record.customerId }}
                    className="text-brand hover:underline"
                  >
                    {record.customerName}
                  </Link>
                }
              />
              <Field label="Mobile" value={record.mobile} />
              <Field label="Email" value={record.email} />
              <Field label="Room type" value={record.roomType} />
              <Field label="Address" value={record.address} className="sm:col-span-2" />
            </dl>
          </Panel>

          <Panel
            title="Room scan"
            description={`${record.scanId} · scanned ${record.scanDate}`}
          >
            <dl className="grid gap-4 sm:grid-cols-3">
              {record.measurements.map((measurement) => (
                <Field
                  key={measurement.label}
                  label={measurement.label}
                  value={`${measurement.value} ${measurement.unit}`}
                />
              ))}
            </dl>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {record.images.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`Scan capture ${index + 1} for ${record.id}`}
                  loading="lazy"
                  className="aspect-square w-full rounded-lg object-cover"
                />
              ))}
            </div>
          </Panel>

          <Panel title="Selected design & accessories">
            <div className="flex flex-wrap items-center gap-4">
              <img
                src={record.designImage}
                alt={`${record.designName} panel design`}
                loading="lazy"
                className="h-24 w-32 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{record.designName}</p>
                <p className="text-sm text-muted-foreground">{record.panelName}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {record.designCategory} · {record.designId}
                </p>
              </div>
            </div>

            <ul className="mt-5 divide-y divide-border rounded-lg border border-border">
              {record.accessories.length === 0 && (
                <li className="px-4 py-3 text-sm text-muted-foreground">
                  No accessories selected.
                </li>
              )}
              {record.accessories.map((accessory) => (
                <li key={accessory.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{accessory.name}</p>
                    <p className="text-xs text-muted-foreground">{accessory.category}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">× {accessory.quantity}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-muted-foreground">{record.notes}</p>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Status">
            <div className="space-y-3">
              <Label htmlFor="status">Enquiry status</Label>
              <Select
                value={status}
                onValueChange={(next) => {
                  setStatus(next as EnquiryStatus);
                  statusMutation.mutate(next as EnquiryStatus);
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Status changes sync back to the mobile app timeline.
              </p>
            </div>
          </Panel>

          <Panel title="Quotation">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                quotationMutation.mutate();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (£)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Admin feedback</Label>
                <Textarea
                  id="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(event) => setFeedback(event.target.value)}
                  placeholder="Notes shared with the customer…"
                />
              </div>
              <Button type="submit" className="w-full" disabled={quotationMutation.isPending}>
                Save quotation
              </Button>
            </form>
          </Panel>
        </div>
      </div>
    </>
  );
}
