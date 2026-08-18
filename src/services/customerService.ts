import { mockCustomers } from "@/data/mockCustomers";
import { mockRequest } from "@/services/api";
import type { Customer } from "@/types";

export const customerService = {
  list: () => mockRequest<Customer[]>(mockCustomers),
  getById: (id: string) =>
    mockRequest<Customer | undefined>(mockCustomers.find((customer) => customer.id === id)),
};
