import { UseFormRegister } from "react-hook-form";

import { Airline } from "~/api/api.types";
import { FlightFormValues } from "~/shared.types";

interface AirlinesProps {
  airlines: Airline[];
  register: UseFormRegister<FlightFormValues>;
}

export const AirlineDropdown: React.FC<AirlinesProps> = ({
  airlines,
  register,
}) => {
  return (
    <>
      <label htmlFor="airline">Airline: </label>
      <select
        required
        id="airline"
        className="text-black"
        {...register("airlineId")}
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
