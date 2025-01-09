import { ChangeEvent, useEffect, useState } from "react";

import { deleteAirline, getAirlines } from "~/api/airlines";
import {
  Airline,
  AirlineFilters,
  ServicePagination,
  SortDirection,
  SortDirectionType,
} from "~/api/api.types";
import { CreateAirlineModal } from "~/modals/Airline/CreateAirlineModal";
import { EditAirlineModal } from "~/modals/Airline/EditAirlineModal";
import { Button } from "~/ui";

type FilterName = keyof AirlineFilters;

export const AirlinesTable = () => {
  const [loading, setLoading] = useState(true);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [pagination, setPagination] = useState<ServicePagination | null>(null);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState<SortDirectionType>(SortDirection.asc);
  const [filters, setFilters] = useState<AirlineFilters>({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState<any | null>(null);

  function isFilter(propertyName: string): propertyName is FilterName {
    return propertyName in filters;
  }

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (isFilter(key)) {
        params.append(`filter[${key}]`, filters[key] ? `${filters[key]}` : "");
      }
    });

    if (sort) params.append("sort", order === "asc" ? sort : `-${sort}`);

    return params.toString();
  };

  const loadAirlines = async (url: string | undefined = undefined) => {
    try {
      const res = await getAirlines(url, buildQueryParams());

      setAirlines(res.data);
      setPagination(res.pagination);
    } catch (error: any) {
      console.error("Error obtaining airlines:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [key, order] = e.target.value.split(":");
    setSort(key);

    if (order in SortDirection) setOrder(order as SortDirectionType);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleEditClick = (airline: any) => {
    setIsEditModalVisible(true);
    setSelectedAirline(airline);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    loadAirlines();
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
    loadAirlines();
  };

  const handleDeleteClick = async (airline: any) => {
    if (confirm(`Are you sure you want to delete ${airline.name}?`)) {
      try {
        await deleteAirline(airline.id);
        alert("Airline deleted successfully");
        loadAirlines();
      } catch (error: any) {
        alert("Error deleting airline");
      }
    }
  };

  useEffect(() => {
    loadAirlines();
  }, [sort, order, filters]);

  if (loading) {
    return <p>Loading airlines...</p>;
  }

  return (
    <>
      <CreateAirlineModal
        show={isCreateModalVisible}
        onClose={handleCreateModalClose}
      />
      <EditAirlineModal
        show={isEditModalVisible}
        onClose={handleEditModalClose}
        airline={selectedAirline}
      />
      <div className="flex flex-col gap-3 text-black">
        <input
          placeholder="Filter by name"
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <input
          placeholder="Filter by description"
          onChange={(e) => handleFilterChange("description", e.target.value)}
        />
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium">
            Sort By:
          </label>
          <select
            id="sort"
            value={`${sort}:${order}`}
            onChange={handleSortChange}
            className="rounded-md border border-gray-300 px-6 py-2 text-sm"
          >
            <option value="">Select an option</option>
            <option value="id:asc">ID (smallest)</option>
            <option value="id:desc">ID (biggest)</option>
            <option value="name:asc">Name (A-Z)</option>
            <option value="name:desc">Name (Z-A)</option>
            <option value="description:asc">Description (A-Z)</option>
            <option value="description:desc">Description (Z-A)</option>
            <option value="active_flights_count:asc">
              Active Flights (smallest)
            </option>
            <option value="active_flights_count:desc">
              Active Flights (biggest)
            </option>
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
        <thead className="border-b border-white/10 text-sm leading-6 text-black">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Active Flights</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {airlines.map((airline) => (
            <tr key={airline.id} className="text-black">
              <td>{airline.id}</td>
              <td>{airline.name}</td>
              <td className="whitespace-normal">{airline.description}</td>
              <td>{airline.activeFlightsCount}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleEditClick(airline)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteClick(airline)}
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
            onClick={() => loadAirlines(pagination.links.previous)}
            disabled={!pagination?.links.previous}
          >
            Previous
          </Button>
        )}
        {pagination && (
          <Button
            variant="primary"
            onClick={() => loadAirlines(pagination.links.next)}
            disabled={!pagination?.links.next}
          >
            Next
          </Button>
        )}
        {pagination && (
          <div className="text-black">
            <span className="text-sm">
              showing {pagination.count} of {pagination.total} airlines. Page{" "}
              {pagination.currentPage} of {pagination.totalPages}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
