import { mockDesigns, mockPanels } from "@/data/mockDesigns";
import { mockRequest } from "@/services/api";
import type { Design, WetWallPanel } from "@/types";

export const designService = {
  list: () => mockRequest<Design[]>(mockDesigns),
  /** Mock create — replace with POST /designs */
  create: (design: Omit<Design, "id" | "updatedAt">) =>
    mockRequest<Design>(
      { ...design, id: `DSN-${Math.floor(Math.random() * 900 + 100)}`, updatedAt: "2026-08-18" },
      400,
    ),
  /** Mock update — replace with PUT /designs/:id */
  update: (design: Design) => mockRequest<Design>(design, 400),
  /** Mock delete — replace with DELETE /designs/:id */
  remove: (id: string) => mockRequest({ id }, 400),

  listPanels: () => mockRequest<WetWallPanel[]>(mockPanels),
  createPanel: (panel: Omit<WetWallPanel, "id">) =>
    mockRequest<WetWallPanel>({ ...panel, id: `PNL-${Math.floor(Math.random() * 900 + 100)}` }, 400),
  updatePanel: (panel: WetWallPanel) => mockRequest<WetWallPanel>(panel, 400),
  removePanel: (id: string) => mockRequest({ id }, 400),
};
