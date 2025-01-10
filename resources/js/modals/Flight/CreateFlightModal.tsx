import { FormEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { City } from "~/api/api.types";
import { createFlight } from "~/api/flights";
import type { ModalProps } from "~/shared.types";
import { AirlineDropdown } from "~/shared/components/airlines/AirlineDropdown";
import { CitiesDropdown } from "~/shared/components/cities/CitiesDropdown";
import { useGetAirlines } from "~/shared/hooks/useGetAirlines";
import { Button, errorToast, Modal, useToastStore } from "~/ui";

interface CreateFlightModalProps extends ModalProps {
  cities: City[];
}

const createFormSchema = z.object({
  departureId: z.string(),
  arrivalId: z.string(),
  airlineId: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
});
export type CreateFlightFormValues = z.infer<typeof createFormSchema>;

export const CreateFlightModal = ({
  show,
  onClose,
  cities,
}: CreateFlightModalProps) => {
  const { pushToast } = useToastStore();

  const {
    handleSubmit,
    register,
    getValues,
    resetField,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateFlightFormValues>({
    resolver: zodResolver(createFormSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (data: CreateFlightFormValues) =>
      createFlight({
        airline_id: parseInt(data.airlineId),
        departure_city_id: parseInt(data.departureId),
        arrival_city_id: parseInt(data.arrivalId),
        departure_time: format(data.departureTime, "yyyy-MM-dd HH:mm:ss"),
        arrival_time: format(data.arrivalTime, "yyyy-MM-dd HH:mm:ss"),
      }),
    mutationKey: ["createFlights"],
    onError: errorToast,
    onSuccess: () => {
      onClose();
      reset();
    },
  });

  const createFlightSubmit = (data: CreateFlightFormValues) => {
    if (new Date(data.departureTime) >= new Date(data.arrivalTime)) {
      pushToast({
        type: "error",
        title: "Error",
        message: "Departure time must be before arrival time",
      });
      return;
    }

    mutate(data);
  };

  const airlinesResponse = useGetAirlines({
    departure: getValues("departureId")
      ? parseInt(getValues("departureId"))
      : null,
    arrival: getValues("arrivalId") ? parseInt(getValues("arrivalId")) : null,
  });

  return (
    <Modal
      show={show}
      title="Create Flight"
      description="Please fill in the details for the new flight."
      onClose={onClose}
    >
      <form
        onSubmit={handleSubmit(createFlightSubmit)}
        className="flex flex-col space-y-4"
      >
        <CitiesDropdown
          cities={cities}
          reset={(fieldName: keyof CreateFlightFormValues) =>
            resetField(fieldName)
          }
          register={register}
          watch={watch}
        />

        <AirlineDropdown
          airlines={airlinesResponse.useGetAirlines?.data?.data ?? []}
          flight={undefined}
          register={register}
        />

        <label htmlFor="departure-time">Departure time: </label>
        <input
          required
          id="departure-time"
          type="datetime-local"
          className="text-black"
          {...register("departureTime")}
        />

        <label htmlFor="arrival-time">Arrival time: </label>
        <input
          required
          id="arrival-time"
          type="datetime-local"
          className="text-black"
          {...register("arrivalTime")}
        />
        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
};
