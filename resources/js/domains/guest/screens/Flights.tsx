import { FlightsTable } from "~/shared/components/flights/FlightsTable";

export const Flights = () => {
  return (
    <div className="prose p-10 text-white lg:prose-xl">
      <h1>Flights</h1>

      <FlightsTable />
    </div>
  );
};
