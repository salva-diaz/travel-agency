import type { ComponentPropsWithoutRef } from "react";
import { z } from "zod";

export type SVGProps = ComponentPropsWithoutRef<"svg">;

export interface ModalProps {
  show: boolean;
  onClose: () => void;
}

export const flightFormSchema = z.object({
  departureId: z.string(),
  arrivalId: z.string(),
  airlineId: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
});
export type FlightFormValues = z.infer<typeof flightFormSchema>;
