import type { ComponentPropsWithoutRef, ReactElement } from "react";
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

export interface ColumnProps<T> {
  key: string;
  title: string;
  // render?: (column: ColumnProps<T>, item: T) => ReactElement;
}
