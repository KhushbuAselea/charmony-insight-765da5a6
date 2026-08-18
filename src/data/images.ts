import marbleGrey from "@/assets/design-marble-grey.jpg";
import nordicWhite from "@/assets/design-nordic-white.jpg";
import slateNoir from "@/assets/design-slate-noir.jpg";
import scanBathroom from "@/assets/scan-bathroom-1.jpg";

/** Central image registry — swap for backend-hosted URLs later. */
export const images = {
  marbleGrey,
  nordicWhite,
  slateNoir,
  scanBathroom,
} as const;

export const galleryImages = [marbleGrey, scanBathroom, slateNoir, nordicWhite, marbleGrey];
