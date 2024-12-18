import { useEffect, useState } from "react";

import { deleteCity, getCities } from "~/api/cities";
import { CreateCityModal } from "~/modals/City/CreateCityModal";
import { EditCityModal } from "~/modals/City/EditCityModal";
import { Button } from "~/ui";

interface Pagination {
  count: number;
  total: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  links: {
    next: string;
    previous: string;
  };
}
interface Filters {
  [key: string]: string;
}

export const CitiesTable = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cities, setCities] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [order, setOrder] = useState<string>("asc");
  const [filters, setFilters] = useState<Filters>({});
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isCreateModalVisible, setIsCreateModalVisible] =
    useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<any | null>(null);

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      params.append(`filter[${key}]`, filters[key]);
    });

    if (sort) params.append("sort", order === "asc" ? sort : `-${sort}`);

    return params.toString();
  };

  const loadCities = async (url: string | null = null) => {
    try {
      const queryParams = buildQueryParams();
      const res = url
        ? await getCities(url, queryParams)
        : await getCities(null, queryParams);
      setCities(res.data);
      setPagination(res.pagination);
    } catch (error: any) {
      console.error("Error obtaining cities:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (e: any) => {
    const [key, order] = e.target.value.split(":");
    setSort(key);
    setOrder(order);
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
    <div>
      <CreateCityModal
        show={isCreateModalVisible}
        onClose={handleCreateModalClose}
      />
      <EditCityModal
        show={isEditModalVisible}
        onClose={handleEditModalClose}
        city={selectedCity}
      />
      <div>
        <div className="gap-3 text-black sm:flex-col md:flex-col lg:flex">
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
          <div>
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
            onClick={() => loadCities(pagination.links.previous)}
            disabled={pagination?.links.previous ? false : true}
          >
            Previous
          </Button>
        )}
        {pagination && (
          <Button
            variant="primary"
            onClick={() => loadCities(pagination.links.next)}
            disabled={pagination?.links.next ? false : true}
          >
            Next
          </Button>
        )}
        {pagination && (
          <div className="text-black">
            <span className="text-sm">
              showing {pagination.count} of {pagination.total} cities. Page{" "}
              {pagination.currentPage} of {pagination.totalPages}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
