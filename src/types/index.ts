/**
 * Domain models for the WETWALLPANEL2GO admin panel.
 * These mirror the expected backend API shapes and are the single place to
 * adjust once the real API contract is available.
 */

export type RoomType = "Bathroom" | "Kitchen";

export type EnquiryStatus = "New" | "Contacted" | "Quoted" | "Closed";

export type QuotationStatus = "Draft" | "Sent" | "Accepted" | "Rejected";

export type ScanStatus = "Processed" | "Processing" | "Failed";

export type RecordStatus = "Active" | "Inactive";

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  roomType: RoomType;
  enquiryCount: number;
  lastActivity: string;
  createdAt: string;
}

export interface Measurement {
  label: string;
  value: number;
  unit: "mm" | "m²" | "m";
}

export interface Scan {
  id: string;
  customerId: string;
  customerName: string;
  roomType: RoomType;
  scanDate: string;
  status: ScanStatus;
  measurements: Measurement[];
  images: string[];
  blueprintNote?: string;
}

export interface SelectedAccessory {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

export interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  mobile: string;
  email: string;
  address: string;
  roomType: RoomType;
  designId: string;
  designName: string;
  panelName: string;
  designCategory: string;
  designImage: string;
  status: EnquiryStatus;
  createdAt: string;
  scanId: string;
  scanDate: string;
  measurements: Measurement[];
  images: string[];
  accessories: SelectedAccessory[];
  notes: string;
  quotationAmount?: number;
  feedback?: string;
}

export interface Design {
  id: string;
  name: string;
  description: string;
  roomType: RoomType;
  category: string;
  image: string;
  status: RecordStatus;
  updatedAt: string;
}

export interface WetWallPanel {
  id: string;
  name: string;
  description: string;
  finish: string;
  dimensions: string;
  image: string;
  status: RecordStatus;
}

export interface Tile {
  id: string;
  name: string;
  category: string;
  size: string;
  finish: string;
  pricePerSqm: number;
  image: string;
  status: RecordStatus;
}

export interface Accessory {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  status: RecordStatus;
}

export interface Quotation {
  id: string;
  enquiryId: string;
  customerName: string;
  amount: number;
  status: QuotationStatus;
  createdAt: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: "customers" | "enquiries" | "pending" | "designs";
}

export interface EnquiryStatusSlice {
  status: EnquiryStatus;
  count: number;
}

export interface MonthlyEnquiryPoint {
  month: string;
  enquiries: number;
}
