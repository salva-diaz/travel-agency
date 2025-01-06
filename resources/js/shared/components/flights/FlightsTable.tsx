import { ChangeEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Flight,
  FlightFilters,
  ServicePagination,
  SortDirection,
  SortDirectionType,
} from "~/api/api.types";
import { getCities } from "~/api/cities";
import { deleteFlight, getFlights } from "~/api/flights";
import { CreateFlightModal } from "~/modals/Flight/CreateFlightModal";
import { EditFlightModal } from "~/modals/Flight/EditFlightModal";
import { Button, errorToast, useToastStore } from "~/ui";

type FilterName = keyof FlightFilters;

export const FlightsTable = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useToastStore();

  const [sort, setSort] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortDirectionType>(
    SortDirection.asc,
  );
  const [filters, setFilters] = useState<FlightFilters>({});
  const [pagination, setPagination] = useState<ServicePagination | null>(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    params.append("page", pageNumber.toString());

    Object.keys(filters).forEach((key) => {
      if (isFilter(key)) {
        params.append(
          `filter[${key}.name]`,
          filters[key] ? `${filters[key]}` : "",
        );
      }
    });

    if (sort) params.append("sort", sortOrder === "asc" ? sort : `-${sort}`);

    return params.toString();
  };

  function isFilter(propertyName: string): propertyName is FilterName {
    return propertyName in filters;
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { data: flightsResponse } = useQuery({
    queryFn: async () => {
      const res = await getFlights(buildQueryParams());
      setPagination(res?.data.pagination);
      return res;
    },
    queryKey: [pageNumber, buildQueryParams()],
    staleTime: 20000,
  });

  const { data: citiesResponse } = useQuery({
    queryFn: () => getCities("pageSize=50"),
    queryKey: ["cities"],
    staleTime: 20000,
  });

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [key, order] = e.target.value.split(":");
    setSort(key);

    if (order in SortDirection) setSortOrder(order as SortDirectionType);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
    queryClient.invalidateQueries({
      queryKey: [pageNumber, buildQueryParams()],
    });
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    queryClient.invalidateQueries({
      queryKey: [pageNumber, buildQueryParams()],
    });
  };

  const deleteFlightMutation = useMutation({
    mutationFn: (flightId: number) => {
      return deleteFlight(flightId);
    },
    onSuccess: () => {
      pushToast({
        type: "success",
        title: "Success",
        message: "Flight deleted successfully!",
      });
      queryClient.invalidateQueries({
        queryKey: [pageNumber, buildQueryParams()],
      });
    },
    onError: errorToast,
  });

  return (
    <>
      <CreateFlightModal
        show={isCreateModalVisible}
        onClose={handleCreateModalClose}
        cities={citiesResponse?.data ?? []}
      />
      <EditFlightModal
        show={isEditModalVisible}
        onClose={handleEditModalClose}
        cities={citiesResponse?.data ?? []}
        flight={selectedFlight}
      />
      <div className="flex flex-col gap-3 text-black">
        <input
          placeholder="Filter by departure city"
          onChange={(e) => handleFilterChange("departureCity", e.target.value)}
        />
        <input
          placeholder="Filter by arrival city"
          onChange={(e) => handleFilterChange("arrivalCity", e.target.value)}
        />
        <input
          placeholder="Filter by airline"
          onChange={(e) => handleFilterChange("airline", e.target.value)}
        />
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort By:
          </label>
          <select
            id="sort"
            value={`${sort}:${sortOrder}`}
            onChange={handleSortChange}
            className="rounded-md border border-gray-300 px-6 py-2 text-sm"
          >
            <option value="">Select an option</option>
            <option value="id:asc">ID (smallest)</option>
            <option value="id:desc">ID (biggest)</option>
            <option value="departure_time:asc">
              Departure time (Ascending)
            </option>
            <option value="departure_time:desc">
              Departure time (Descending)
            </option>
            <option value="arrival_time:asc">Arrival time (Ascending)</option>
            <option value="arrival_time:desc">Arrival time (Descending)</option>
          </select>
        </div>
        <Button
          variant="secondary"
          onClick={() => setIsCreateModalVisible(true)}
        >
          Create new
        </Button>
      </div>
      <table className="w-full whitespace-nowrap text-left">
        <thead>
          <tr>
            <th>ID</th>
            <th>Departure city</th>
            <th>Arrival city</th>
            <th>Airline</th>
            <th>Departure time</th>
            <th>Arrival time</th>
          </tr>
        </thead>
        <tbody>
          {flightsResponse?.data.data.map((flight) => (
            <tr key={flight.id} className="text-black">
              <td>{flight.id}</td>
              <td>{flight.departureCity.name}</td>
              <td>{flight.arrivalCity.name}</td>
              <td>{flight.airline.name}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalTime}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedFlight(flight);
                    setIsEditModalVisible(true);
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (
                      confirm(
                        `Are you sure you want to delete flight ${flight.id}?`,
                      )
                    )
                      deleteFlightMutation.mutate(flight.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2">
        {pagination && (
          <Button
            variant="primary"
            onClick={() => setPageNumber((prev) => prev - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
        )}
        {pagination && (
          <Button
            variant="primary"
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={pageNumber === pagination.totalPages}
          >
            Next
          </Button>
        )}
        {pagination && (
          <div className="text-black">
            <span className="text-sm">
              showing {pagination.count} of {pagination.total} flights. Page{" "}
              {pageNumber} of {pagination.totalPages}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
