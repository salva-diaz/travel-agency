import { useState } from "react";

import { Airline, Flight } from "~/api/api.types";

interface AirlinesProps {
  airlines: Airline[];
  flight: Flight | null;
}

export const AirlineDropdown: React.FC<AirlinesProps> = ({
  airlines,
  flight,
}) => {
  const [selectedAirline, setSelectedAirline] = useState(
    flight?.airline.id ?? null,
  );

  return (
    <>
      <label htmlFor="airline">Airline: </label>
      <select
        required
        id="airline"
        name="airline-id"
        value={selectedAirline ?? ""}
        className="text-black"
        onChange={(e) => setSelectedAirline(parseInt(e.target.value))}
      >
        <option value="">Select airline</option>
        {airlines?.map((airline) => (
          <option key={airline.id} value={airline.id}>
            {airline.name}
          </option>
        ))}
      </select>
    </>
  );
};
