import { ChangeEvent, useEffect, useState } from "react";

import {
  City,
  CityFilters,
  ServicePagination,
  SortDirection,
  SortDirectionType,
} from "~/api/api.types";
import { deleteCity, getCities } from "~/api/cities";
import { CreateCityModal } from "~/modals/City/CreateCityModal";
import { EditCityModal } from "~/modals/City/EditCityModal";
import { Button } from "~/ui";

const FIRST_PAGE = 1;
type FilterName = keyof CityFilters;

export const CitiesTable = () => {
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState<any[]>([]);
  const [pagination, setPagination] = useState<ServicePagination | null>(null);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState<SortDirectionType>(SortDirection.asc);
  const [filters, setFilters] = useState<CityFilters>({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [pageNumber, setPageNumber] = useState(FIRST_PAGE);

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

    params.append("page", pageNumber.toString());

    return params.toString();
  };

  const loadCities = async () => {
    try {
      const queryParams = buildQueryParams();
      const res = await getCities(queryParams);
      setCities(res.data);
      setPagination(res.pagination);
    } catch (error: any) {
      console.error("Error obtaining cities:", error.message);
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

  const handleEditClick = (city: any) => {
    setIsEditModalVisible(true);
    setSelectedCity(city);
  };

  const handleEditModalClose = () => {
    setIsEditModalVisible(false);
    loadCities();
  };

  const handleCreateModalClose = () => {
    setIsCreateModalVisible(false);
    loadCities();
  };

  const handleDeleteClick = async (city: any) => {
    if (confirm(`Are you sure you want to delete ${city.name}?`)) {
      try {
        await deleteCity(city.id);
        alert("City deleted successfully");
        loadCities();
      } catch (error: any) {
        alert("Error deleting city");
      }
    }
  };

  useEffect(() => {
    loadCities();
  }, [sort, order, filters]);

  if (loading) {
    return <p>Loading cities...</p>;
  }

  return (
    <>
      <CreateCityModal
        show={isCreateModalVisible}
        onClose={handleCreateModalClose}
      />
      <EditCityModal
        show={isEditModalVisible}
        onClose={handleEditModalClose}
        city={selectedCity}
      />
      <div className="flex flex-col gap-3 text-black">
        <input
          type="text"
          placeholder="Filter by name"
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by airline"
          onChange={(e) => handleFilterChange("airline_id", e.target.value)}
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
            <th>Arrival Flights</th>
            <th>Departure Flights</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city) => (
            <tr key={city.id} className="text-black">
              <td>{city.id}</td>
              <td>{city.name}</td>
              <td>{city.arrival_flights_count}</td>
              <td>{city.departure_flights_count}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleEditClick(city)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleDeleteClick(city)}
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
            onClick={() => {
              setPageNumber((prev) => prev - 1);
              loadCities();
            }}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>
        )}
        {pagination && (
          <>
            <Button
              variant="primary"
              onClick={() => {
                setPageNumber((prev) => prev + 1);
                loadCities();
              }}
              disabled={pageNumber === pagination.totalPages}
            >
              Next
            </Button>
            <div className="text-black">
              <span className="text-sm">
                showing {pagination.count} of {pagination.total} cities. Page{" "}
                {pageNumber} of {pagination.totalPages}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};
