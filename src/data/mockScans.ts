import { galleryImages } from "@/data/images";
import type { Measurement, Scan } from "@/types";

export const bathroomMeasurements: Measurement[] = [
  { label: "Wall 1", value: 2400, unit: "mm" },
  { label: "Wall 2", value: 1800, unit: "mm" },
  { label: "Wall 3", value: 2400, unit: "mm" },
  { label: "Wall 4", value: 1800, unit: "mm" },
  { label: "Ceiling Height", value: 2400, unit: "mm" },
  { label: "Floor Area", value: 4.32, unit: "m²" },
];

export const kitchenMeasurements: Measurement[] = [
  { label: "Wall 1", value: 3600, unit: "mm" },
  { label: "Wall 2", value: 2700, unit: "mm" },
  { label: "Splashback Run", value: 4200, unit: "mm" },
  { label: "Ceiling Height", value: 2500, unit: "mm" },
  { label: "Floor Area", value: 9.72, unit: "m²" },
  { label: "Panel Coverage", value: 10.5, unit: "m²" },
];

export const mockScans: Scan[] = [
  {
    id: "SCAN-001",
    customerId: "CUS-001",
    customerName: "John Smith",
    roomType: "Bathroom",
    scanDate: "2026-08-18",
    status: "Processed",
    measurements: bathroomMeasurements,
    images: galleryImages.slice(0, 5),
    blueprintNote: "Room plan captured with 4 walls, 1 window, 1 door recess.",
  },
  {
    id: "SCAN-002",
    customerId: "CUS-002",
    customerName: "Priya Nair",
    roomType: "Kitchen",
    scanDate: "2026-08-17",
    status: "Processed",
    measurements: kitchenMeasurements,
    images: galleryImages.slice(0, 4),
    blueprintNote: "L-shaped layout, splashback run along two walls.",
  },
  {
    id: "SCAN-003",
    customerId: "CUS-003",
    customerName: "Daniel O'Connor",
    roomType: "Bathroom",
    scanDate: "2026-08-15",
    status: "Processing",
    measurements: bathroomMeasurements.slice(0, 4),
    images: galleryImages.slice(0, 2),
  },
  {
    id: "SCAN-004",
    customerId: "CUS-004",
    customerName: "Amelia Clarke",
    roomType: "Kitchen",
    scanDate: "2026-08-14",
    status: "Processed",
    measurements: kitchenMeasurements,
    images: galleryImages.slice(1, 5),
  },
  {
    id: "SCAN-005",
    customerId: "CUS-005",
    customerName: "Tom Ashworth",
    roomType: "Bathroom",
    scanDate: "2026-08-12",
    status: "Failed",
    measurements: [],
    images: [],
  },
  {
    id: "SCAN-006",
    customerId: "CUS-006",
    customerName: "Sofia Rossi",
    roomType: "Kitchen",
    scanDate: "2026-08-11",
    status: "Processed",
    measurements: kitchenMeasurements.slice(0, 5),
    images: galleryImages.slice(0, 3),
  },
];
