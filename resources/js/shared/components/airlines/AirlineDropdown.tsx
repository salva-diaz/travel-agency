import { UseFormRegister } from "react-hook-form";

import { Airline, Flight } from "~/api/api.types";
import { EditFlightFormValues } from "~/modals/Flight/EditFlightModal";

interface AirlinesProps {
  airlines: Airline[];
  flight: Flight | undefined;
  register: UseFormRegister<EditFlightFormValues>;
}

export const AirlineDropdown: React.FC<AirlinesProps> = ({
  airlines,
  flight,
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
