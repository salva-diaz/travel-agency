import { useQuery } from "@tanstack/react-query";

import { getAirlines } from "~/api/airlines";
import { useToastStore } from "~/ui";

export const useGetAirlines = (selectedCities: {
  departure: number | null;
  arrival: number | null;
}) => {
  const { pushToast } = useToastStore();

  const useGetAirlines = useQuery({
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
    queryKey: ["inCities", selectedCities.departure, selectedCities.arrival],
    staleTime: 20000,
    enabled:
      selectedCities.departure !== null && selectedCities.arrival !== null,
  });

  return { useGetAirlines };
};
