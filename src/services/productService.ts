import { mockAccessories, mockTiles } from "@/data/mockProducts";
import { mockRequest } from "@/services/api";
import type { Accessory, Tile } from "@/types";

export const productService = {
  listTiles: () => mockRequest<Tile[]>(mockTiles),
  createTile: (tile: Omit<Tile, "id">) =>
    mockRequest<Tile>({ ...tile, id: `TIL-${Math.floor(Math.random() * 900 + 100)}` }, 400),
  updateTile: (tile: Tile) => mockRequest<Tile>(tile, 400),
  removeTile: (id: string) => mockRequest({ id }, 400),

  listAccessories: () => mockRequest<Accessory[]>(mockAccessories),
  createAccessory: (accessory: Omit<Accessory, "id">) =>
    mockRequest<Accessory>(
      { ...accessory, id: `ACC-${Math.floor(Math.random() * 900 + 100)}` },
      400,
    ),
  updateAccessory: (accessory: Accessory) => mockRequest<Accessory>(accessory, 400),
  removeAccessory: (id: string) => mockRequest({ id }, 400),
};
