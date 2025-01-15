import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { City, Flight } from "~/api/api.types";
import { updateFlight } from "~/api/flights";
import type { ModalProps } from "~/shared.types";
import { AirlineDropdown } from "~/shared/components/airlines/AirlineDropdown";
import { CitiesDropdown } from "~/shared/components/cities/CitiesDropdown";
import { useGetAirlines } from "~/shared/hooks/useGetAirlines";
import { Button, errorToast, Modal, useToastStore } from "~/ui";

interface EditFlightModalProps extends ModalProps {
  cities: City[];
  flight: Flight | undefined;
}
const editFormSchema = z.object({
  departureId: z.string(),
  arrivalId: z.string(),
  airlineId: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
});
export type EditFlightFormValues = z.infer<typeof editFormSchema>;

export const EditFlightModal = ({
  show,
  onClose,
  cities,
  flight,
}: EditFlightModalProps) => {
  const { pushToast } = useToastStore();

  const { handleSubmit, register, getValues, resetField, reset, watch } =
    useForm<EditFlightFormValues>({
      resolver: zodResolver(editFormSchema),
    });

  const { data: airlinesResponse } = useGetAirlines({
    departure: getValues("departureId")
      ? parseInt(getValues("departureId"))
      : null,
    arrival: getValues("arrivalId") ? parseInt(getValues("arrivalId")) : null,
  }).useGetAirlines;

  useEffect(() => {
    reset(
      {
        departureId: flight?.departureCity.id.toString(),
        arrivalId: flight?.arrivalCity.id.toString(),
        airlineId: flight?.airline.id.toString(),
        departureTime: flight?.departureTime,
        arrivalTime: flight?.arrivalTime,
      },
      { keepDirtyValues: true },
    );
  }, [flight, airlinesResponse]);

  const { mutate } = useMutation({
    mutationFn: (data: EditFlightFormValues & { flightId: number }) =>
      updateFlight(data.flightId, {
        airline_id: parseInt(data.airlineId),
        departure_city_id: parseInt(data.departureId),
        arrival_city_id: parseInt(data.arrivalId),
        departure_time: format(data.departureTime, "yyyy-MM-dd HH:mm:ss"),
        arrival_time: format(data.arrivalTime, "yyyy-MM-dd HH:mm:ss"),
      }),
    mutationKey: ["editFlights", flight?.id],
    onError: errorToast,
    onSuccess: () => {
      onClose();
      reset();
      pushToast({
        type: "success",
        title: "Success",
        message: "Flight updated successfully!",
      });
    },
  });

  const editFlightSubmit = (data: EditFlightFormValues) => {
    if (new Date(data.departureTime) >= new Date(data.arrivalTime)) {
      pushToast({
        type: "error",
        title: "Error",
        message: "Departure time must be before arrival time",
      });
      return;
    }

    if (flight?.id) mutate({ ...data, flightId: flight.id });
  };

  return (
    <Modal
      show={show}
      title="Edit Flight"
      description="Please fill in the new details for the flight."
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(editFlightSubmit)}
        className="flex flex-col space-y-4"
      >
        <CitiesDropdown
          cities={cities}
          register={register}
          reset={resetField}
          watch={watch}
        />

        <AirlineDropdown
          airlines={airlinesResponse?.data ?? []}
          register={register}
        />

        <label htmlFor="departure-time">Departure time: </label>
        <input
          required
          id="departure-time"
          type="datetime-local"
          className="text-black"
          defaultValue={flight?.departureTime ?? ""}
          {...register("departureTime")}
        />

        <label htmlFor="arrival-time">Arrival time: </label>
        <input
          required
          id="arrival-time"
          type="datetime-local"
          className="text-black"
          defaultValue={flight?.arrivalTime ?? ""}
          {...register("arrivalTime")}
        />
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};
