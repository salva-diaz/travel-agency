import { FormEvent, useState } from "react";
import { format } from "date-fns";

import { City, Flight } from "~/api/api.types";
import { updateFlight } from "~/api/flights";
import type { ModalProps } from "~/shared.types";
import { AirlineDropdown } from "~/shared/components/airlines/AirlineDropdown";
import { CitiesDropdown } from "~/shared/components/cities/CitiesDropdown";
import { useGetAirlines } from "~/shared/hooks/useGetAirlines";
import { Button, errorToast, Modal, useToastStore } from "~/ui";

interface EditFlightModalProps extends ModalProps {
  cities: City[];
  flight: Flight | null;
}

export const EditFlightModal = ({
  show,
  onClose,
  cities,
  flight,
}: EditFlightModalProps) => {
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

      if (!flight?.id) throw Error("id is not defined");

      await updateFlight(flight.id, {
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
        message: "Flight updated successfully!",
      });

      onClose();
    } catch (error: any) {
      errorToast(error);
    }
  }

  const airlinesResponse = useGetAirlines(selectedCities);

  return (
    <Modal
      show={show}
      title="Edit Flight"
      description="Please fill in the new details for the flight."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <CitiesDropdown
          cities={cities}
          flight={flight}
          setParentCities={setSelectedCities}
        />

        <AirlineDropdown
          airlines={airlinesResponse?.data ?? []}
          flight={flight}
        />

        <label htmlFor="departure-time">Departure time: </label>
        <input
          required
          id="departure-time"
          name="departure-time"
          type="datetime-local"
          className="text-black"
          defaultValue={
            flight?.departureTime
              ? format(
                  new Date(flight.departureTime.replace(" ", "T")),
                  "yyyy-MM-dd'T'HH:mm",
                )
              : ""
          }
        />

        <label htmlFor="arrival-time">Arrival time: </label>
        <input
          required
          id="arrival-time"
          name="arrival-time"
          type="datetime-local"
          className="text-black"
          defaultValue={
            flight?.arrivalTime
              ? format(
                  new Date(flight.arrivalTime.replace(" ", "T")),
                  "yyyy-MM-dd'T'HH:mm",
                )
              : ""
          }
        />
        <Button type="submit">Create</Button>
      </form>
    </Modal>
  );
};
