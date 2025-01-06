import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { getAirlines } from "~/api/airlines";
import { City } from "~/api/api.types";
import { createFlight } from "~/api/flights";
import type { ModalProps } from "~/shared.types";
import { AirlineDropdown } from "~/shared/components/airlines/AirlineDropdown";
import { CitiesDropdown } from "~/shared/components/cities/CitiesDropdown";
import { Button, errorToast, Modal, useToastStore } from "~/ui";

interface CreateFlightModalProps extends ModalProps {
  cities: City[];
}

export const CreateFlightModal = ({
  show,
  onClose,
  cities,
}: CreateFlightModalProps) => {
  const { pushToast } = useToastStore();
  const [selectedCities, setSelectedCities] = useState<{
    departure: number | null;
    arrival: number | null;
  }>({ departure: null, arrival: null });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const [departureDate, arrivalDate] = [
        new Date(formData.get("departure-time") as string),
        new Date(formData.get("arrival-time") as string),
      ];
      if (departureDate >= arrivalDate) {
        pushToast({
          type: "error",
          title: "Error",
          message: "Departure time must be before arrival time",
        });
        return;
      }

      await createFlight({
        airline_id: parseInt(formData.get("airline-id") as string),
        departure_city_id: parseInt(
          formData.get("departure-city-id") as string,
        ),
        arrival_city_id: parseInt(formData.get("arrival-city-id") as string),
        departure_time: format(departureDate, "yyyy-MM-dd HH:mm:ss"),
        arrival_time: format(arrivalDate, "yyyy-MM-dd HH:mm:ss"),
      });

      pushToast({
        type: "success",
        title: "Success",
        message: "Flight created successfully!",
      });

      onClose();
    } catch (error: any) {
      errorToast(error);
    }
  }

  const { data: airlinesResponse } = useQuery({
    queryFn: async () => {
      const res = await getAirlines(
        undefined,
        `filter[inCities]=${selectedCities.departure},${selectedCities.arrival}&pageSize=50`,
      );
      if (res.data.length === 0)
        pushToast({
          type: "warning",
          title: "Warning",
          message:
            "No airlines available for the selected city pair. Please select another departure or arrival city.",
          duration: 8000,
        });
      return res;
    },
    queryKey: ["inCities", selectedCities],
    staleTime: 20000,
    enabled:
      selectedCities.departure !== null && selectedCities.arrival !== null,
  });

  return (
    <Modal
      show={show}
      title="Create Flight"
      description="Please fill in the details for the new flight."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <CitiesDropdown
          cities={cities}
          flight={null}
          setParentCities={setSelectedCities}
        />

        <AirlineDropdown
          airlines={airlinesResponse?.data ?? []}
          flight={null}
        />

        <label htmlFor="departure-time">Departure time: </label>
        <input
          required
          id="departure-time"
          name="departure-time"
          type="datetime-local"
          className="text-black"
        />

        <label htmlFor="arrival-time">Arrival time: </label>
        <input
          required
          id="arrival-time"
          name="arrival-time"
          type="datetime-local"
          className="text-black"
        />
        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
};