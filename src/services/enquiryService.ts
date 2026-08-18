import { mockEnquiries, mockQuotations, monthlyEnquiries } from "@/data/mockEnquiries";
import { mockCustomers } from "@/data/mockCustomers";
import { mockDesigns } from "@/data/mockDesigns";
import { mockRequest } from "@/services/api";
import type {
  DashboardStat,
  Enquiry,
  EnquiryStatus,
  EnquiryStatusSlice,
  MonthlyEnquiryPoint,
  Quotation,
} from "@/types";

const statuses: EnquiryStatus[] = ["New", "Contacted", "Quoted", "Closed"];

export const enquiryService = {
  list: () => mockRequest<Enquiry[]>(mockEnquiries),

  getById: (id: string) =>
    mockRequest<Enquiry | undefined>(mockEnquiries.find((enquiry) => enquiry.id === id)),

  listByCustomer: (customerId: string) =>
    mockRequest<Enquiry[]>(mockEnquiries.filter((e) => e.customerId === customerId)),

  /** Mock update — replace with PATCH /enquiries/:id */
  updateStatus: (id: string, status: EnquiryStatus) => mockRequest({ id, status }, 400),

  /** Mock update — replace with PUT /enquiries/:id/quotation */
  saveQuotation: (id: string, amount: number, feedback: string) =>
    mockRequest({ id, amount, feedback }, 400),

  statusBreakdown: () =>
    mockRequest<EnquiryStatusSlice[]>(
      statuses.map((status) => ({
        status,
        count: mockEnquiries.filter((e) => e.status === status).length * 27 + 12,
      })),
    ),

  monthlyTrend: () => mockRequest<MonthlyEnquiryPoint[]>(monthlyEnquiries),

  quotations: () => mockRequest<Quotation[]>(mockQuotations),

  dashboardStats: () =>
    mockRequest<DashboardStat[]>([
      {
        label: "Total Customers",
        value: "1,246",
        change: 8.2,
        changeLabel: "this month",
        icon: "customers",
      },
      {
        label: "Total Enquiries",
        value: "324",
        change: 12.4,
        changeLabel: "this month",
        icon: "enquiries",
      },
      {
        label: "Pending Enquiries",
        value: "48",
        change: -4.2,
        changeLabel: "this month",
        icon: "pending",
      },
      {
        label: "Active Designs",
        value: "86",
        change: 6.5,
        changeLabel: "this month",
        icon: "designs",
      },
    ]),

  /** Convenience counts used by the lead tracking board. */
  counts: () =>
    mockRequest({
      customers: mockCustomers.length,
      designs: mockDesigns.length,
      enquiries: mockEnquiries.length,
    }),
};
