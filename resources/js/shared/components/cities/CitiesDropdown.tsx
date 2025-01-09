import { useEffect, useState } from "react";

import { City, Flight } from "~/api/api.types";

interface CitiesProps {
  cities: City[];
  flight: Flight | null;
  setParentCities: React.Dispatch<
    React.SetStateAction<{ departure: number | null; arrival: number | null }>
  >;
}

export const CitiesDropdown: React.FC<CitiesProps> = ({
  cities,
  flight,
  setParentCities,
}) => {
  const [departure, setDeparture] = useState(flight?.departureCity.id ?? null);
  const [arrival, setArrival] = useState(flight?.arrivalCity.id ?? null);
  const filteredCities = departure
    ? cities.filter((city) => city.id !== departure)
    : cities;

  useEffect(() => {
    setParentCities({
      departure: flight?.departureCity.id ?? null,
      arrival: flight?.arrivalCity.id ?? null,
    });
  }, [flight]);

  return (
    <>
      <label htmlFor="departure">Departure: </label>
      <select
        required
        id="departure"
        name="departure-city-id"
        value={departure ?? flight?.departureCity.id ?? ""}
        className="text-black"
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          setDeparture(selectedId);
          if (selectedId === arrival) setArrival(null);
          setParentCities({ departure: selectedId, arrival: arrival });
        }}
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
        name="arrival-city-id"
        value={arrival ?? flight?.arrivalCity.id ?? ""}
        className="text-black"
        onChange={(e) => {
          const selectedId = parseInt(e.target.value);
          setArrival(selectedId);
          setParentCities({ departure: departure, arrival: selectedId });
        }}
        disabled={!departure}
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
