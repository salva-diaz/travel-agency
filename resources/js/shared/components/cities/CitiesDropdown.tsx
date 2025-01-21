import { useEffect } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

import { City } from "~/api/api.types";
import { FlightFormValues } from "~/shared.types";

interface CitiesProps {
  cities: City[];
  register: UseFormRegister<FlightFormValues>;
  reset: (fieldName: keyof FlightFormValues) => void;
  watch: UseFormWatch<{
    departureId: string;
    arrivalId: string;
    airlineId: string;
    departureTime: string;
    arrivalTime: string;
  }>;
}

export const CitiesDropdown: React.FC<CitiesProps> = ({
  cities,
  register,
  reset,
  watch,
}) => {
  const [departureId, arrivalId] = watch(["departureId", "arrivalId"]);

  const filteredCities = departureId
    ? cities.filter((city) => city.id !== parseInt(departureId ?? "0"))
    : cities;

  useEffect(() => {
    if (departureId === arrivalId) {
      reset("arrivalId");
    }
  }, [watch]);

  return (
    <>
      <label htmlFor="departure">Departure: </label>
      <select
        required
        id="departure"
        className="text-black"
        {...register("departureId")}
      >
        <option value="">Select departure</option>
        {cities?.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <label htmlFor="arrival">Arrival: </label>
      <select
        required
        id="arrival"
        className="text-black"
        disabled={!departureId}
        {...register("arrivalId")}
      >
        <option value="">Select arrival</option>
        {filteredCities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  );
};
