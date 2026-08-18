import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DataTable, type Column } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { Panel } from "@/components/admin/Panel";
import { StatCard } from "@/components/admin/StatCard";
import { CardsLoadingState } from "@/components/admin/States";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { enquiryService } from "@/services/enquiryService";
import type { Enquiry } from "@/types";

export const Route = createFileRoute("/_admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — WETWALLPANEL2GO Admin" },
      {
        name: "description",
        content:
          "Live overview of customers, enquiries, quotations and design activity across WETWALLPANEL2GO.",
      },
      { property: "og:title", content: "Dashboard — WETWALLPANEL2GO Admin" },
      {
        property: "og:description",
        content: "Live overview of customers, enquiries and quotations.",
      },
    ],
  }),
  component: DashboardPage,
});

const sliceColors = ["var(--brand)", "var(--info)", "var(--warning)", "var(--neutral-soft)"];

function DashboardPage() {
  const stats = useQuery({ queryKey: ["dashboard-stats"], queryFn: enquiryService.dashboardStats });
  const trend = useQuery({ queryKey: ["monthly-trend"], queryFn: enquiryService.monthlyTrend });
  const breakdown = useQuery({
    queryKey: ["status-breakdown"],
    queryFn: enquiryService.statusBreakdown,
  });
  const enquiries = useQuery({ queryKey: ["enquiries"], queryFn: enquiryService.list });

  const columns: Column<Enquiry>[] = [
    {
      key: "customer",
      header: "Customer",
      render: (row) => (
        <div>
          <p className="font-medium text-foreground">{row.customerName}</p>
          <p className="text-xs text-muted-foreground">{row.id}</p>
        </div>
      ),
    },
    { key: "room", header: "Room", render: (row) => row.roomType },
    { key: "design", header: "Design", render: (row) => row.designName },
    { key: "date", header: "Created", render: (row) => row.createdAt },
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
        title="Dashboard"
        description="Performance across scans, enquiries and quotations."
        actions={
          <Button asChild>
            <Link to="/enquiries">View all enquiries</Link>
          </Button>
        }
      />

      {stats.isLoading ? (
        <CardsLoadingState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.data?.map((stat) => <StatCard key={stat.label} stat={stat} />)}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel
          title="Enquiries per month"
          description="Last 12 months"
          className="lg:col-span-2"
          bodyClassName="p-5 pt-2"
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend.data ?? []}>
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="enquiries" fill="var(--brand)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Enquiry status" description="Current pipeline split" bodyClassName="p-5 pt-2">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdown.data ?? []}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {(breakdown.data ?? []).map((slice, index) => (
                    <Cell key={slice.status} fill={sliceColors[index % sliceColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "var(--card)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-4 space-y-2">
            {(breakdown.data ?? []).map((slice, index) => (
              <li key={slice.status} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: sliceColors[index % sliceColors.length] }}
                  />
                  {slice.status}
                </span>
                <span className="font-medium text-foreground">{slice.count}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Recent enquiries" description="Latest activity from the mobile app" bodyClassName="p-0">
        <div className="px-2 pb-2">
          <DataTable
            columns={columns}
            rows={(enquiries.data ?? []).slice(0, 6)}
            rowKey={(row) => row.id}
            loading={enquiries.isLoading}
            emptyTitle="No enquiries yet"
          />
        </div>
      </Panel>
    </>
  );
}
