import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/admin/PageHeader";
import { Panel } from "@/components/admin/Panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Update your admin profile, change your password and choose which enquiry notifications you receive.",
      },
      { property: "og:title", content: "Settings — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Admin profile, password and notification preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { admin, updateAdmin } = useAuth();
  const [name, setName] = useState(admin?.name ?? "");
  const [email, setEmail] = useState(admin?.email ?? "");
  const [newEnquiries, setNewEnquiries] = useState(true);
  const [quotationUpdates, setQuotationUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <>
      <PageHeader title="Settings" description="Manage your admin account and notifications." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Profile" description="Shown across the admin panel">
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              updateAdmin({ name, email });
              toast.success("Profile updated");
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={admin?.role ?? "Administrator"} readOnly disabled />
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </Panel>

        <div className="space-y-6">
          <Panel title="Password" description="Use at least 8 characters">
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                toast.success("Password change request sent");
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" autoComplete="current-password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="next">New password</Label>
                <Input id="next" type="password" autoComplete="new-password" />
              </div>
              <Button type="submit" variant="outline">
                Update password
              </Button>
            </form>
          </Panel>

          <Panel title="Notifications" description="Email alerts for pipeline activity">
            <div className="space-y-4">
              <ToggleRow
                id="notify-new"
                label="New enquiries"
                description="Alert me when a customer submits a new enquiry."
                checked={newEnquiries}
                onChange={setNewEnquiries}
              />
              <ToggleRow
                id="notify-quotes"
                label="Quotation updates"
                description="Alert me when a quotation is accepted or rejected."
                checked={quotationUpdates}
                onChange={setQuotationUpdates}
              />
              <ToggleRow
                id="notify-digest"
                label="Weekly digest"
                description="Send a Monday summary of pipeline performance."
                checked={weeklyDigest}
                onChange={setWeeklyDigest}
              />
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
      <div>
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
