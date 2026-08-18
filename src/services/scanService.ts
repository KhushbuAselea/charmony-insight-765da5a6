import { mockScans } from "@/data/mockScans";
import { mockRequest } from "@/services/api";
import type { Scan } from "@/types";

export const scanService = {
  list: () => mockRequest<Scan[]>(mockScans),
  getById: (id: string) => mockRequest<Scan | undefined>(mockScans.find((scan) => scan.id === id)),
  listByCustomer: (customerId: string) =>
    mockRequest<Scan[]>(mockScans.filter((scan) => scan.customerId === customerId)),
};
