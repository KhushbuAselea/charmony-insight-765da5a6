import { images } from "@/data/images";
import type { Accessory, Tile } from "@/types";

export const mockTiles: Tile[] = [
  {
    id: "TIL-001",
    name: "Metro Bevel White",
    category: "Ceramic",
    size: "200 × 100 mm",
    finish: "Gloss",
    pricePerSqm: 28.5,
    image: images.nordicWhite,
    status: "Active",
  },
  {
    id: "TIL-002",
    name: "Carrara Hexagon",
    category: "Porcelain",
    size: "230 × 200 mm",
    finish: "Matte",
    pricePerSqm: 42,
    image: images.marbleGrey,
    status: "Active",
  },
  {
    id: "TIL-003",
    name: "Slate Riven",
    category: "Natural Stone",
    size: "600 × 300 mm",
    finish: "Textured",
    pricePerSqm: 56.75,
    image: images.slateNoir,
    status: "Active",
  },
  {
    id: "TIL-004",
    name: "Terrazzo Sand",
    category: "Porcelain",
    size: "600 × 600 mm",
    finish: "Satin",
    pricePerSqm: 49.9,
    image: images.nordicWhite,
    status: "Inactive",
  },
];

export const mockAccessories: Accessory[] = [
  {
    id: "ACC-001",
    name: "Chrome Internal Corner Trim",
    category: "Trims",
    price: 14.5,
    image: images.marbleGrey,
    status: "Active",
  },
  {
    id: "ACC-002",
    name: "Brushed Brass End Cap",
    category: "Trims",
    price: 11.25,
    image: images.slateNoir,
    status: "Active",
  },
  {
    id: "ACC-003",
    name: "Rainfall Shower Head 250mm",
    category: "Showering",
    price: 129,
    image: images.marbleGrey,
    status: "Active",
  },
  {
    id: "ACC-004",
    name: "Panel Adhesive 290ml",
    category: "Fixings",
    price: 8.95,
    image: images.nordicWhite,
    status: "Active",
  },
  {
    id: "ACC-005",
    name: "LED Mirror 600 × 800",
    category: "Lighting",
    price: 189,
    image: images.slateNoir,
    status: "Inactive",
  },
];
